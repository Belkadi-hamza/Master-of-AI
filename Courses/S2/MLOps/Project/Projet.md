# Plan de Projet — Prédiction des Interactions Molécule-Protéine
## Module MLOps & DataOps — BindingDB

**Équipe :** 7 à 10 étudiants
**Durée :** 3 sprints (minimum)
**Dataset :** BindingDB (https://www.bindingdb.org/)
**Type de tâche :** Classification binaire (interaction / non-interaction)

---

## Sommaire

1. [Vision du projet](#1-vision-du-projet)
2. [Gestion Agile](#2-gestion-agile)
3. [Architecture technique détaillée](#3-architecture-technique-détaillée)
4. [Pipeline DataOps (dlt → DuckDB → dbt → Dagster)](#4-pipeline-dataops)
5. [Qualité des données](#5-qualité-des-données)
6. [Composant Machine Learning](#6-composant-machine-learning)
7. [MLflow](#7-mlflow)
8. [Déploiement (FastAPI + Docker)](#8-déploiement)
9. [CI/CD (GitHub Actions)](#9-cicd)
10. [Monitoring & Observabilité](#10-monitoring--observabilité)
11. [Documentation GitHub](#11-documentation-github)
12. [Plan de présentation finale](#12-plan-de-présentation-finale)

---

## 1. Vision du projet

### 1.1 Problématique

La découverte de nouveaux médicaments repose en grande partie sur l'identification d'interactions entre des **molécules candidates** (ligands) et des **protéines cibles**. Les tests expérimentaux (in vitro / in vivo) sont coûteux, lents (des mois) et ne peuvent tester qu'un sous-ensemble infime de l'espace chimique possible (~$10^{60}$ molécules théoriquement synthétisables).

**Problème métier :** Comment prioriser, parmi des millions de paires molécule-protéine candidates, celles qui ont la plus forte probabilité d'interagir, afin de réduire le coût et le temps des campagnes de criblage expérimental (screening) ?

### 1.2 Objectifs du projet

| Objectif                 | Description                                                            | Critère de succès                                              |
| ------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| O1 - Ingestion fiable    | Automatiser la récupération et le versionnement des données BindingDB  | Pipeline dlt reproductible, idempotent, journalisé             |
| O2 - Qualité des données | Garantir des données propres, cohérentes et contractualisées           | 0 test dbt critique en échec, Data Contract validé             |
| O3 - Modèle prédictif    | Prédire l'interaction molécule-protéine avec une performance mesurable | AUC-ROC ≥ 0.80, F1 ≥ 0.75 sur le jeu de test                   |
| O4 - Industrialisation   | Exposer le modèle comme un service versionné, traçable, déployable     | API FastAPI conteneurisée, MLflow Registry en "Production"     |
| O5 - Observabilité       | Surveiller la dérive des données et la dégradation du modèle           | Dashboard Grafana + rapport Evidently automatisé               |
| O6 - Reproductibilité    | Tout le pipeline doit être rejouable de bout en bout                   | `docker compose up` + `dagster job execute` = pipeline complet |

### 1.3 Utilisateurs cibles (personas)

- **Chercheur en chimie médicinale** : veut soumettre une paire (SMILES, séquence protéique) et obtenir un score de probabilité d'interaction pour prioriser ses expériences.
- **Data Scientist / MLOps Engineer** : veut suivre les expériences, comparer les modèles, déclencher un ré-entraînement.
- **Ingénieur Plateforme / DevOps** : veut surveiller la santé du service, les temps de réponse, la dérive des données.
- **Product Owner / Manager R&D** : veut un tableau de bord de la performance métier (nombre de prédictions, taux d'usage, ROI potentiel du criblage in silico).

### 1.4 Valeur métier (Business Value)

- **Réduction des coûts de criblage expérimental** : en filtrant les candidats les moins prometteurs avant les tests en laboratoire.
- **Accélération du cycle de découverte** : passage d'un criblage exhaustif à un criblage guidé par le score prédictif.
- **Traçabilité réglementaire** : chaque prédiction est reliée à une version de modèle et à un jeu de données figé (exigence clé en environnement pharmaceutique / R&D).
- **Capitalisation des connaissances** : le pipeline DataOps devient réutilisable pour d'autres cibles thérapeutiques.

### 1.5 Data Strategy

| Dimension | Décision |
|---|---|
| **Source de vérité** | BindingDB (fichier TSV téléchargé, versionné par date d'extraction) |
| **Fréquence d'ingestion** | Batch mensuel (BindingDB est mis à jour périodiquement, pas en temps réel) |
| **Granularité de stockage** | Table brute (raw) → table nettoyée (staging) → table de features (marts) dans DuckDB |
| **Gouvernance** | Data Contract formel (schéma, types, contraintes de nullabilité, domaines de valeurs) validé à chaque run Dagster |
| **Traçabilité (lineage)** | dbt `docs generate` + métadonnées Dagster (asset lineage graph) |
| **Politique de conservation** | Chaque extraction BindingDB est archivée avec un `load_id` et un timestamp (append-only sur la table raw) |
| **Sécurité / Éthique** | Données publiques et anonymisées (pas de données personnelles) ; licence BindingDB (CC BY 3.0) doit être citée |
| **Gestion du déséquilibre de classes** | Stratégie définie en amont : seuil d'affinité (voir §4.5) + rééquilibrage (class_weight, SMOTE optionnel) documenté dans le Data Contract ML |

---

## 2. Gestion Agile

### 2.1 Rôles de l'équipe (7 à 10 étudiants)

| Rôle | Effectif suggéré | Responsabilités |
|---|---|---|
| Product Owner | 1 | Backlog, priorisation, relation "métier" |
| Scrum Master | 1 (tournant possible) | Facilitation des cérémonies, suivi du board |
| Data Engineers | 2 | dlt, DuckDB, dbt |
| Orchestration/Platform Engineer | 1 | Dagster, Docker, CI/CD |
| ML Engineers / Data Scientists | 2 | Feature engineering, modèle, MLflow |
| Backend/API Engineer | 1 | FastAPI, conteneurisation du service |
| QA / Monitoring Engineer | 1-2 | Tests qualité, Data Contract, Evidently/Grafana |

### 2.2 Product Backlog (Epics → User Stories)

#### Epic 1 — Ingestion des données (dlt)
- **US-1.1** — En tant que Data Engineer, je veux un pipeline dlt qui télécharge et charge le TSV BindingDB dans DuckDB, afin de disposer d'une table brute versionnée.
  - *Critères d'acceptation* : le pipeline est idempotent, journalise le nombre de lignes chargées, gère les erreurs réseau.
- **US-1.2** — En tant que Data Engineer, je veux que chaque exécution d'ingestion ajoute un `load_id` et un `loaded_at`, afin de tracer l'origine de chaque ligne.
- **US-1.3** — En tant que Data Engineer, je veux limiter l'ingestion aux colonnes utiles (SMILES, séquence, affinités, métadonnées cible), afin de réduire le volume stocké.

#### Epic 2 — Transformation & Modélisation des données (dbt)
- **US-2.1** — En tant que Data Engineer, je veux un modèle `stg_bindingdb` qui nettoie les types, supprime les doublons et gère les valeurs manquantes.
- **US-2.2** — En tant que Data Engineer, je veux un modèle `int_binding_labels` qui dérive le label binaire `interaction` à partir des seuils d'affinité (Ki/IC50/Kd/EC50).
- **US-2.3** — En tant que Data Engineer, je veux un modèle `mart_ml_features` prêt pour l'entraînement ML (une ligne = une paire molécule-protéine avec ses features).
- **US-2.4** — En tant que QA Engineer, je veux des tests dbt (`not_null`, `unique`, `accepted_values`, `relationships`) sur les modèles clés.

#### Epic 3 — Orchestration (Dagster)
- **US-3.1** — En tant que Platform Engineer, je veux un job Dagster qui enchaîne ingestion → transformation → tests → entraînement, afin d'avoir un pipeline unique observable.
- **US-3.2** — En tant que Platform Engineer, je veux un schedule mensuel + un déclenchement manuel, afin de contrôler la fraîcheur des données.
- **US-3.3** — En tant que Platform Engineer, je veux des alertes Dagster en cas d'échec d'un asset critique.

#### Epic 4 — Machine Learning
- **US-4.1** — En tant que Data Scientist, je veux entraîner un modèle scikit-learn (baseline + modèle avancé) sur les features moléculaires et protéiques.
- **US-4.2** — En tant que Data Scientist, je veux évaluer le modèle avec des métriques adaptées au déséquilibre de classes (AUC-ROC, F1, PR-AUC).
- **US-4.3** — En tant que Data Scientist, je veux enregistrer chaque run (paramètres, métriques, artefacts) dans MLflow Tracking.
- **US-4.4** — En tant que Data Scientist, je veux promouvoir le meilleur modèle vers le MLflow Model Registry (stage "Production").

#### Epic 5 — Service ML (FastAPI)
- **US-5.1** — En tant qu'utilisateur métier, je veux un endpoint `/predict` qui prend un SMILES + une séquence protéique et retourne un score de probabilité.
- **US-5.2** — En tant qu'ingénieur, je veux un endpoint `/health` pour vérifier la disponibilité du service.
- **US-5.3** — En tant qu'ingénieur, je veux que l'API charge le modèle depuis le MLflow Model Registry (stage "Production") au démarrage.

#### Epic 6 — Conteneurisation & CI/CD
- **US-6.1** — En tant que DevOps, je veux un `Dockerfile` pour l'API et un `docker-compose.yml` pour l'ensemble (API + MLflow + Dagster).
- **US-6.2** — En tant que DevOps, je veux une pipeline GitHub Actions qui lint, teste, build l'image Docker et la publie sur un registre.
- **US-6.3** — En tant que DevOps, je veux que les Pull Requests déclenchent automatiquement les tests unitaires et les tests dbt.

#### Epic 7 — Monitoring & Observabilité
- **US-7.1** — En tant que QA Engineer, je veux un rapport Evidently comparant la distribution des données de référence et des nouvelles données (data drift).
- **US-7.2** — En tant que QA Engineer, je veux exposer des métriques Prometheus (latence, nombre de requêtes, erreurs) depuis FastAPI.
- **US-7.3** — En tant que Product Owner, je veux un dashboard Grafana consolidant les métriques techniques et métier.

### 2.3 Planification en 3 Sprints (2 semaines chacun)

#### Sprint 1 — Fondations Data (Ingestion + Transformation + Qualité)

**Sprint Goal :** Disposer d'un pipeline data reproductible, de BindingDB brut jusqu'à une table de features nettoyée et testée dans DuckDB.

| Jour | Activité |
|---|---|
| J1 | Sprint Planning : découpage US-1.x, US-2.x, estimation (Planning Poker) |
| J1-J3 | Setup dépôt Git, structure de projet, environnement (Poetry/venv, pre-commit) |
| J2-J6 | Développement dlt (US-1.1 à 1.3) |
| J4-J8 | Développement dbt staging + intermediate (US-2.1, US-2.2) |
| J7-J9 | Tests dbt + Data Contract v1 (US-2.4) |
| J9 | Sprint Review : démo pipeline dlt→DuckDB→dbt, revue avec Product Owner |
| J10 | Sprint Retrospective (Start/Stop/Continue) |

**Backlog Sprint 1 :** US-1.1, US-1.2, US-1.3, US-2.1, US-2.2, US-2.4 (partiel)

**Definition of Done (DoD) Sprint 1 :**
- Code revu via Pull Request (≥1 reviewer)
- Tests dbt passent en CI
- README d'installation à jour
- Données chargées dans DuckDB accessibles via `duckdb` CLI

#### Sprint 2 — Orchestration, ML & Tracking

**Sprint Goal :** Orchestrer le pipeline complet avec Dagster et obtenir un premier modèle ML tracké dans MLflow.

| Jour | Activité |
|---|---|
| J1 | Sprint Planning : découpage US-2.3, US-3.x, US-4.x |
| J1-J4 | Modèle dbt `mart_ml_features` (US-2.3) |
| J2-J7 | Assets & jobs Dagster (US-3.1, US-3.2, US-3.3) |
| J4-J9 | Feature engineering + entraînement baseline (US-4.1) |
| J6-J9 | Évaluation modèle + tracking MLflow (US-4.2, US-4.3) |
| J9 | Sprint Review : démo pipeline Dagster de bout en bout + run MLflow visible dans l'UI |
| J10 | Sprint Retrospective |

**Backlog Sprint 2 :** US-2.3, US-2.4 (fin), US-3.1, US-3.2, US-3.3, US-4.1, US-4.2, US-4.3

**Definition of Done (DoD) Sprint 2 :**
- Job Dagster exécutable de bout en bout sans intervention manuelle
- Au moins 2 runs MLflow comparables (baseline vs modèle amélioré)
- Data Contract v2 incluant les features ML

#### Sprint 3 — Déploiement, CI/CD & Monitoring

**Sprint Goal :** Déployer le modèle en tant que service API conteneurisé, automatisé par CI/CD, et surveillé.

| Jour | Activité |
|---|---|
| J1 | Sprint Planning : découpage US-4.4, US-5.x, US-6.x, US-7.x |
| J1-J2 | Promotion modèle → MLflow Registry (US-4.4) |
| J2-J6 | Développement FastAPI + intégration MLflow (US-5.1, US-5.2, US-5.3) |
| J4-J7 | Dockerfile, docker-compose (US-6.1) |
| J5-J8 | Pipeline GitHub Actions (US-6.2, US-6.3) |
| J6-J9 | Evidently + Prometheus + Grafana (US-7.1, US-7.2, US-7.3) |
| J9 | Sprint Review : démo API en conteneur + CI/CD verte + dashboard monitoring |
| J10 | Sprint Retrospective finale + rétrospective globale du projet |

**Backlog Sprint 3 :** US-4.4, US-5.1, US-5.2, US-5.3, US-6.1, US-6.2, US-6.3, US-7.1, US-7.2, US-7.3

**Definition of Done (DoD) Sprint 3 :**
- `docker compose up` lance l'ensemble du système (API + MLflow + monitoring)
- Pipeline CI/CD verte sur `main`
- Dashboard Grafana accessible avec au moins 3 métriques (latence, volumétrie, drift)
- Documentation complète (README, architecture, guide d'installation, guide utilisateur API)

### 2.4 Cérémonies Agile — Format recommandé

| Cérémonie | Fréquence | Durée | Objectif |
|---|---|---|---|
| Sprint Planning | Début de sprint | 1h30 | Sélection et estimation des US, définition du Sprint Goal |
| Daily Stand-up | Quotidien | 15 min | Synchronisation (fait / à faire / blocages) |
| Sprint Review | Fin de sprint | 45 min | Démo du travail terminé au Product Owner / parties prenantes |
| Sprint Retrospective | Fin de sprint | 45 min | Amélioration continue (Start / Stop / Continue ou 4L) |
| Backlog Refinement | Mi-sprint | 30 min | Affiner et estimer les US à venir |

**Outil de suivi recommandé :** GitHub Projects (Kanban board lié aux issues et PR), avec colonnes `Backlog / To Do / In Progress / In Review / Done`.

---

## 3. Architecture technique détaillée

### 3.1 Schéma global

```
                     ┌──────────────────────────┐
                     │   BindingDB (source)      │
                     │  TSV export / téléchargem.│
                     └────────────┬──────────────┘
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │   dlt (Ingestion)          │
                     │  - extraction TSV          │
                     │  - normalisation schéma     │
                     │  - load_id / loaded_at      │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │   DuckDB (Stockage)        │
                     │  schema: raw                │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │   dbt (Transformation)      │
                     │  staging → intermediate →   │
                     │  marts (features ML)        │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  Tests Qualité /            │
                     │  Data Contract               │
                     │ (dbt tests + Great Expect.)  │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │   Dagster (Orchestration)   │
                     │  assets, jobs, schedules,    │
                     │  sensors, alerting            │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  Machine Learning            │
                     │  (Scikit-Learn pipeline)      │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  MLflow (Tracking/Registry)  │
                     │  experiments, artefacts,      │
                     │  model versions, stages        │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  FastAPI (Service ML)        │
                     │  /predict /health /metrics    │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  Docker / docker-compose      │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │  GitHub Actions (CI/CD)       │
                     │  lint, tests, build, push,     │
                     │  déploiement                    │
                     └────────────┬──────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │ Monitoring & Observabilité    │
                     │ Prometheus + Grafana +         │
                     │ Evidently (data/model drift)   │
                     └──────────────────────────┘
```

### 3.2 Description de chaque brique

| Brique | Rôle | Technologie | Justification |
|---|---|---|---|
| **Ingestion** | Extraire les données BindingDB et les charger dans un entrepôt local, de façon idempotente et journalisée | `dlt` (data load tool) | Framework Python léger, gère nativement le schema inference, l'incrémental et l'écriture dans DuckDB |
| **Stockage** | Entrepôt analytique local, rapide, sans serveur | `DuckDB` | Base OLAP embarquée, parfaite pour un projet pédagogique (pas de serveur à gérer), performante sur données tabulaires volumineuses |
| **Transformation** | Nettoyer, dédupliquer, dériver les labels et construire les features | `dbt-duckdb` | Approche SQL déclarative, versionnée, testable, avec documentation et lineage automatiques |
| **Qualité** | Garantir la conformité du schéma et des règles métier | `dbt tests` + `Great Expectations` (optionnel) | Tests natifs dbt pour les contraintes simples, Great Expectations pour des règles statistiques avancées |
| **Orchestration** | Planifier, exécuter, surveiller les dépendances entre les étapes | `Dagster` | Modèle "asset-based" qui correspond naturellement au pipeline Data→ML, UI de lineage intégrée |
| **ML** | Entraîner et évaluer un modèle de classification | `Scikit-Learn` | Simplicité, robustesse, écosystème mature pour la classification binaire tabulaire |
| **Tracking/Registry** | Tracer les expériences et gérer le cycle de vie des modèles | `MLflow` | Standard de l'industrie pour l'expérimentation ML et la gestion de versions de modèles |
| **Service** | Exposer le modèle via une API REST | `FastAPI` | Performant, typé (Pydantic), documentation OpenAPI automatique |
| **Conteneurisation** | Isoler et rendre portable chaque composant | `Docker` / `docker-compose` | Reproductibilité de l'environnement, déploiement simplifié |
| **CI/CD** | Automatiser les tests et le déploiement | `GitHub Actions` | Intégré à GitHub, gratuit pour projets étudiants, large écosystème d'actions |
| **Monitoring** | Surveiller la performance technique et la dérive des données | `Prometheus` + `Grafana` + `Evidently` | Stack open-source standard pour métriques (Prometheus/Grafana) et ML monitoring (Evidently) |

### 3.3 Structure du dépôt Git (proposée)

```
bindingdb-mlops/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── dlt_pipeline/
│   ├── bindingdb_source.py
│   ├── pipeline.py
│   └── config.toml
├── dbt_project/
│   ├── dbt_project.yml
│   ├── models/
│   │   ├── staging/
│   │   │   └── stg_bindingdb.sql
│   │   ├── intermediate/
│   │   │   └── int_binding_labels.sql
│   │   └── marts/
│   │       └── mart_ml_features.sql
│   ├── tests/
│   └── seeds/
├── dagster_project/
│   ├── assets.py
│   ├── jobs.py
│   ├── schedules.py
│   ├── sensors.py
│   └── definitions.py
├── ml/
│   ├── features.py
│   ├── train.py
│   ├── evaluate.py
│   └── register_model.py
├── api/
│   ├── main.py
│   ├── schemas.py
│   ├── model_loader.py
│   └── requirements.txt
├── monitoring/
│   ├── evidently_report.py
│   ├── prometheus.yml
│   └── grafana/
├── tests/
│   ├── unit/
│   └── integration/
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.dagster
│   └── docker-compose.yml
├── docs/
│   ├── architecture.md
│   ├── data_contract.md
│   └── runbook.md
├── pyproject.toml
└── README.md
```

---

## 4. Pipeline DataOps

### 4.1 Accès aux données BindingDB

BindingDB propose plusieurs voies d'accès :

1. **Téléchargement en masse (recommandé pour ce projet)** : la page [Download](https://www.bindingdb.org/rwd/bind/chemsearch/marvin/Download.jsp) propose un export complet au format TSV compressé (`BindingDB_All.tsv.zip`), régulièrement mis à jour. C'est la source la plus stable pour un pipeline batch reproductible.
2. **Recherche par cible (Target)** : les URL fournies dans l'énoncé (`ByTargetNames.jsp`, `BySequence.jsp`, `ByKI.jsp`, etc.) permettent d'interroger BindingDB pour une protéine cible spécifique et d'exporter les résultats filtrés (TSV/SDF). Utile pour restreindre le scope pédagogique à une ou quelques familles de cibles (ex. kinases) si le fichier complet (plusieurs Go) est trop volumineux pour l'environnement de la classe.
3. **API REST BindingDB** (`https://bindingdb.org/axis2/services/BDBService`) : permet des requêtes programmatiques (par SMILES, par UniProt ID, par plage d'affinité) — utile pour un enrichissement incrémental ciblé plutôt que pour l'extraction initiale complète.

**Recommandation pédagogique :** démarrer avec un **sous-ensemble filtré par cible ou par organisme** (ex. Homo sapiens, une famille de protéines) via les pages `ByTargetNames` ou `BySourceOrganism`, afin de garder un volume gérable (quelques dizaines/centaines de milliers de lignes) pour l'entraînement en environnement de classe.

### 4.2 Stratégie d'ingestion avec dlt

**Principes :**
- Le fichier TSV téléchargé est traité comme une **source de fichier** (`dlt.resource` alimentée par pandas/pyarrow en chunks pour gérer le volume).
- Chaque run ajoute des colonnes techniques : `_dlt_load_id`, `loaded_at`, `source_file_name`.
- Chargement en mode `append` dans une table `raw.bindingdb_raw` (on conserve l'historique des extractions).
- Un `write_disposition="merge"` avec clé primaire (`ligand_smiles`, `target_name`, `assay_id` — à définir) peut être utilisé si l'on souhaite une table raw dédupliquée en amont ; sinon la déduplication est déléguée à dbt (recommandé, pour garder la traçabilité complète en raw).

```python
# dlt_pipeline/bindingdb_source.py
import dlt
import pandas as pd

BINDINGDB_COLUMNS = [
    "BindingDB Ligand Name",
    "Ligand SMILES",
    "Target Name",
    "Target Source Organism According to Curator or DataSource",
    "BindingDB Target Chain Sequence",
    "Ki (nM)",
    "IC50 (nM)",
    "Kd (nM)",
    "EC50 (nM)",
    "PDB ID(s) for Ligand-Target Complex",
    "PubChem CID",
    "UniProt (SwissProt) Primary ID of Target Chain",
]

@dlt.source
def bindingdb_source(file_path: str, chunksize: int = 50_000):

    @dlt.resource(
        name="bindingdb_raw",
        write_disposition="append",
        primary_key=None,  # dédup gérée en aval par dbt
    )
    def read_tsv():
        reader = pd.read_csv(
            file_path,
            sep="\t",
            usecols=lambda c: c in BINDINGDB_COLUMNS,
            chunksize=chunksize,
            low_memory=False,
            on_bad_lines="skip",
        )
        for chunk in reader:
            chunk = chunk.rename(columns={
                "Ligand SMILES": "smiles",
                "BindingDB Target Chain Sequence": "protein_sequence",
                "Target Name": "target_name",
                "Ki (nM)": "ki_nm",
                "IC50 (nM)": "ic50_nm",
                "Kd (nM)": "kd_nm",
                "EC50 (nM)": "ec50_nm",
                "UniProt (SwissProt) Primary ID of Target Chain": "uniprot_id",
                "PubChem CID": "pubchem_cid",
                "PDB ID(s) for Ligand-Target Complex": "pdb_ids",
            })
            yield chunk.to_dict(orient="records")

    return read_tsv
```

```python
# dlt_pipeline/pipeline.py
import dlt
from bindingdb_source import bindingdb_source

def run_pipeline(file_path: str):
    pipeline = dlt.pipeline(
        pipeline_name="bindingdb_ingestion",
        destination="duckdb",
        dataset_name="raw",
    )
    load_info = pipeline.run(bindingdb_source(file_path))
    print(load_info)
    return load_info

if __name__ == "__main__":
    run_pipeline("data/BindingDB_subset.tsv")
```

### 4.3 Tables cibles dans DuckDB

| Schéma | Table | Description |
|---|---|---|
| `raw` | `bindingdb_raw` | Copie brute append-only des exports BindingDB, avec métadonnées dlt (`_dlt_load_id`, `_dlt_load_time`) |
| `staging` | `stg_bindingdb` | Données typées, colonnes renommées, doublons supprimés, valeurs manquantes marquées |
| `intermediate` | `int_binding_labels` | Ajout du label binaire `interaction` dérivé des seuils d'affinité |
| `intermediate` | `int_molecule_features` | Features calculées à partir du SMILES (ex. poids moléculaire, LogP, nombre d'atomes — via RDKit optionnel) |
| `intermediate` | `int_protein_features` | Features calculées à partir de la séquence protéique (longueur, composition en acides aminés) |
| `marts` | `mart_ml_features` | Table finale prête pour l'entraînement (une ligne = une paire molécule-protéine + features + label) |
| `marts` | `mart_monitoring_reference` | Snapshot de référence utilisé par Evidently pour la détection de dérive |

### 4.4 Modèles dbt

```sql
-- models/staging/stg_bindingdb.sql
with source as (
    select * from {{ source('raw', 'bindingdb_raw') }}
),

typed as (
    select
        md5(coalesce(smiles, '') || coalesce(uniprot_id, '')
            || coalesce(cast(ki_nm as varchar), '')
            || coalesce(cast(ic50_nm as varchar), '')) as record_id,
        trim(smiles)                          as smiles,
        trim(protein_sequence)                as protein_sequence,
        trim(target_name)                     as target_name,
        nullif(trim(uniprot_id), '')          as uniprot_id,
        try_cast(ki_nm   as double)           as ki_nm,
        try_cast(ic50_nm as double)           as ic50_nm,
        try_cast(kd_nm   as double)           as kd_nm,
        try_cast(ec50_nm as double)           as ec50_nm,
        _dlt_load_id                          as load_id,
        _dlt_load_time                        as loaded_at
    from source
),

deduplicated as (
    select *,
        row_number() over (
            partition by record_id
            order by loaded_at desc
        ) as rn
    from typed
)

select
    record_id, smiles, protein_sequence, target_name, uniprot_id,
    ki_nm, ic50_nm, kd_nm, ec50_nm, load_id, loaded_at
from deduplicated
where rn = 1
  and smiles is not null
  and protein_sequence is not null
  and length(smiles) between 3 and 500
  and length(protein_sequence) between 10 and 5000
```

```sql
-- models/intermediate/int_binding_labels.sql
-- Seuil métier : une affinité (Ki/IC50/Kd/EC50) <= 1000 nM (1 µM) est
-- considérée comme une interaction significative (convention courante
-- en chémoinformatique, à ajuster selon le Data Contract validé avec
-- le "métier").
with base as (
    select * from {{ ref('stg_bindingdb') }}
),

best_affinity as (
    select
        *,
        least(
            coalesce(ki_nm, 1e12),
            coalesce(ic50_nm, 1e12),
            coalesce(kd_nm, 1e12),
            coalesce(ec50_nm, 1e12)
        ) as best_affinity_nm
    from base
    where ki_nm is not null
       or ic50_nm is not null
       or kd_nm is not null
       or ec50_nm is not null
)

select
    *,
    case when best_affinity_nm <= 1000 then 1 else 0 end as interaction
from best_affinity
```

```sql
-- models/marts/mart_ml_features.sql
select
    record_id,
    smiles,
    protein_sequence,
    target_name,
    uniprot_id,
    best_affinity_nm,
    length(smiles)           as smiles_length,
    length(protein_sequence) as sequence_length,
    interaction
from {{ ref('int_binding_labels') }}
```

```yaml
# models/marts/schema.yml — extrait Data Contract + tests
version: 2

models:
  - name: mart_ml_features
    description: "Table finale d'entraînement ML : une paire molécule-protéine par ligne"
    columns:
      - name: record_id
        description: "Identifiant unique de la paire (hash)"
        tests: [unique, not_null]
      - name: smiles
        description: "Chaîne SMILES de la molécule"
        tests: [not_null]
      - name: protein_sequence
        description: "Séquence en acides aminés de la protéine cible"
        tests: [not_null]
      - name: interaction
        description: "Label binaire : 1 = interaction, 0 = non-interaction"
        tests:
          - not_null
          - accepted_values:
              values: [0, 1]
      - name: best_affinity_nm
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 1000000000
```

### 4.5 Gestion des valeurs manquantes, doublons et déséquilibre de classes

| Problème | Stratégie | Où |
|---|---|---|
| **Valeurs manquantes** (SMILES, séquence) | Suppression des lignes sans SMILES ou séquence (non exploitables) ; les colonnes d'affinité manquantes sont gérées via `COALESCE`/`try_cast` | `stg_bindingdb.sql` |
| **Doublons** | Déduplication par `record_id` (hash SMILES + protéine + affinités) avec `row_number()` en gardant la ligne la plus récente | `stg_bindingdb.sql` |
| **Déséquilibre de classes** | 1) Mesure du ratio interaction/non-interaction en amont (asset Dagster de monitoring) ; 2) `class_weight="balanced"` dans scikit-learn ; 3) option de sur-échantillonnage (SMOTE) documentée et testée en A/B dans MLflow ; 4) métriques d'évaluation robustes au déséquilibre (PR-AUC, F1, Balanced Accuracy plutôt que l'Accuracy brute) | `ml/train.py`, `ml/evaluate.py` |
| **Seuil de définition du label** | Seuil d'affinité (≤ 1000 nM) documenté explicitement comme hypothèse métier révisable, versionné dans le Data Contract | `int_binding_labels.sql` + `docs/data_contract.md` |

### 4.6 Orchestration avec Dagster

```python
# dagster_project/assets.py
from dagster import asset, AssetExecutionContext, MaterializeResult, MetadataValue
import subprocess

@asset(group_name="ingestion")
def bindingdb_raw_ingestion(context: AssetExecutionContext) -> MaterializeResult:
    from dlt_pipeline.pipeline import run_pipeline
    load_info = run_pipeline("data/BindingDB_subset.tsv")
    return MaterializeResult(
        metadata={"load_info": MetadataValue.text(str(load_info))}
    )

@asset(group_name="transformation", deps=[bindingdb_raw_ingestion])
def dbt_transformations(context: AssetExecutionContext) -> MaterializeResult:
    result = subprocess.run(
        ["dbt", "build", "--project-dir", "dbt_project"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise Exception(f"dbt build échoué:\n{result.stdout}\n{result.stderr}")
    return MaterializeResult(metadata={"dbt_output": MetadataValue.text(result.stdout)})

@asset(group_name="ml", deps=[dbt_transformations])
def trained_model(context: AssetExecutionContext) -> MaterializeResult:
    from ml.train import train_and_log_model
    run_id, metrics = train_and_log_model()
    return MaterializeResult(
        metadata={
            "mlflow_run_id": MetadataValue.text(run_id),
            "auc_roc": MetadataValue.float(metrics["auc_roc"]),
            "f1_score": MetadataValue.float(metrics["f1"]),
        }
    )
```

```python
# dagster_project/jobs.py
from dagster import define_asset_job, AssetSelection

bindingdb_pipeline_job = define_asset_job(
    name="bindingdb_pipeline_job",
    selection=AssetSelection.all(),
)
```

```python
# dagster_project/schedules.py
from dagster import ScheduleDefinition
from dagster_project.jobs import bindingdb_pipeline_job

monthly_schedule = ScheduleDefinition(
    job=bindingdb_pipeline_job,
    cron_schedule="0 3 1 * *",  # le 1er de chaque mois à 3h
)
```

```python
# dagster_project/definitions.py
from dagster import Definitions
from dagster_project.assets import bindingdb_raw_ingestion, dbt_transformations, trained_model
from dagster_project.jobs import bindingdb_pipeline_job
from dagster_project.schedules import monthly_schedule

defs = Definitions(
    assets=[bindingdb_raw_ingestion, dbt_transformations, trained_model],
    jobs=[bindingdb_pipeline_job],
    schedules=[monthly_schedule],
)
```

---

## 5. Qualité des données

### 5.1 Niveaux de tests

| Niveau | Outil | Exemples |
|---|---|---|
| **Schéma** | dbt tests génériques | `not_null`, `unique`, `accepted_values`, `relationships` |
| **Règles métier** | dbt tests personnalisés (singular tests) | "le ratio interaction/non-interaction ne doit pas dépasser 90/10", "aucune séquence protéique ne doit contenir de caractères hors alphabet des 20 acides aminés" |
| **Statistique / distribution** | Great Expectations (optionnel) ou Evidently | Détection d'anomalies de distribution (longueur SMILES, affinité) |
| **Intégration** | Tests Dagster (asset checks) | Vérifier que le nombre de lignes de `mart_ml_features` est > seuil minimal avant de lancer l'entraînement |

```sql
-- tests/singular/test_class_balance.sql
-- Échoue si le déséquilibre de classes dépasse 90/10
with counts as (
    select
        sum(case when interaction = 1 then 1 else 0 end) as n_pos,
        sum(case when interaction = 0 then 1 else 0 end) as n_neg,
        count(*) as n_total
    from {{ ref('mart_ml_features') }}
)
select *
from counts
where (n_pos::float / n_total) < 0.05
   or (n_pos::float / n_total) > 0.95
```

```sql
-- tests/singular/test_valid_amino_acids.sql
-- Échoue s'il existe des séquences protéiques avec des caractères invalides
select record_id, protein_sequence
from {{ ref('stg_bindingdb') }}
where regexp_matches(protein_sequence, '[^ACDEFGHIKLMNPQRSTVWY]')
```

### 5.2 Data Contract

Le Data Contract formalise l'accord entre les producteurs (pipeline d'ingestion) et les consommateurs (équipe ML) sur la structure et les garanties des données.

**Extrait de `docs/data_contract.md` :**

```yaml
data_contract:
  name: mart_ml_features
  version: "1.0.0"
  owner: "equipe-data-engineering"
  consumers: ["equipe-ml", "service-api"]
  sla:
    freshness: "< 31 jours"
    completeness: "> 99% des colonnes obligatoires non nulles"
    availability: "table matérialisée à chaque run Dagster réussi"
  schema:
    - name: record_id
      type: string
      nullable: false
      unique: true
    - name: smiles
      type: string
      nullable: false
      constraints: "longueur entre 3 et 500 caractères"
    - name: protein_sequence
      type: string
      nullable: false
      constraints: "alphabet des 20 acides aminés standards"
    - name: interaction
      type: integer
      nullable: false
      domain: [0, 1]
    - name: best_affinity_nm
      type: float
      nullable: true
      constraints: ">= 0"
  business_rules:
    - "label interaction=1 si best_affinity_nm <= 1000 nM"
    - "ratio de classes surveillé, alerte si déséquilibre > 95/5"
  breaking_change_policy: >
    Toute modification du schéma (renommage, suppression de colonne,
    changement de type) doit faire l'objet d'une Pull Request revue
    par le Product Owner et d'une mise à jour de version majeure.
```

### 5.3 Data Lineage & Métadonnées

- **dbt** : `dbt docs generate && dbt docs serve` produit un graphe de dépendances (lineage) navigable entre `raw` → `staging` → `intermediate` → `marts`.
- **Dagster** : l'UI Dagster (Asset Lineage Graph) montre visuellement les dépendances `bindingdb_raw_ingestion → dbt_transformations → trained_model`, avec l'historique des matérialisations et les métadonnées associées (nombre de lignes, métriques du modèle).
- **MLflow** : chaque run enregistre le `data_version` (hash du dataset ou `load_id` dlt) en tag, permettant de relier un modèle à la version exacte des données utilisées pour l'entraîner.
- **Catalogue de métadonnées** : un fichier `docs/data_catalog.md` documente chaque table (schéma, propriétaire, fréquence de rafraîchissement, tests associés).

---

## 6. Composant Machine Learning

### 6.1 Préparation des données

**Features moléculaires (à partir du SMILES) :**
- Approche simple (baseline, sans dépendance lourde) : longueur de la chaîne SMILES, comptage d'atomes/caractères clés (C, N, O, ring closures).
- Approche avancée (optionnelle, si RDKit disponible) : descripteurs moléculaires (poids moléculaire, LogP, nombre de donneurs/accepteurs de liaisons H, TPSA) ou empreintes moléculaires (Morgan Fingerprints / ECFP4).

**Features protéiques (à partir de la séquence) :**
- Approche simple : longueur de séquence, composition en acides aminés (fréquence des 20 AA), présence de motifs.
- Approche avancée (optionnelle) : k-mers d'acides aminés, embeddings pré-entraînés (ProtBERT) — à considérer comme piste d'amélioration en fin de projet plutôt que MVP.

**Encodage recommandé pour le MVP pédagogique (scikit-learn, sans deep learning) :**
- Vectorisation `TfidfVectorizer` ou `CountVectorizer` sur les k-mers du SMILES et de la séquence protéique (n-grammes de caractères), combinée via `ColumnTransformer`/`FeatureUnion`.

```python
# ml/features.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def build_feature_pipeline():
    smiles_vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(2, 4), max_features=2000)
    protein_vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(3, 5), max_features=2000)

    preprocessor = ColumnTransformer(transformers=[
        ("smiles_tfidf", smiles_vectorizer, "smiles"),
        ("protein_tfidf", protein_vectorizer, "protein_sequence"),
    ])
    return preprocessor
```

### 6.2 Entraînement

```python
# ml/train.py
import duckdb
import mlflow
import mlflow.sklearn
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from ml.features import build_feature_pipeline
from ml.evaluate import evaluate_model

def load_training_data():
    con = duckdb.connect("bindingdb.duckdb")
    df = con.execute("select * from marts.mart_ml_features").fetchdf()
    con.close()
    return df

def train_and_log_model():
    df = load_training_data()
    X = df[["smiles", "protein_sequence"]]
    y = df["interaction"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    mlflow.set_experiment("bindingdb_interaction_classification")

    with mlflow.start_run() as run:
        preprocessor = build_feature_pipeline()
        clf = RandomForestClassifier(
            n_estimators=300,
            max_depth=None,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1,
        )
        pipeline = Pipeline([("features", preprocessor), ("clf", clf)])
        pipeline.fit(X_train, y_train)

        metrics = evaluate_model(pipeline, X_test, y_test)

        mlflow.log_params({
            "model_type": "RandomForestClassifier",
            "n_estimators": 300,
            "class_weight": "balanced",
        })
        mlflow.log_metrics(metrics)
        mlflow.set_tag("data_version", "duckdb_marts_v1")

        mlflow.sklearn.log_model(
            pipeline,
            artifact_path="model",
            registered_model_name="bindingdb_interaction_classifier",
        )

        return run.info.run_id, metrics
```

### 6.3 Évaluation

```python
# ml/evaluate.py
from sklearn.metrics import (
    roc_auc_score, f1_score, precision_score, recall_score,
    average_precision_score, confusion_matrix, balanced_accuracy_score
)

def evaluate_model(pipeline, X_test, y_test) -> dict:
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    metrics = {
        "auc_roc": roc_auc_score(y_test, y_proba),
        "pr_auc": average_precision_score(y_test, y_proba),
        "f1": f1_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "balanced_accuracy": balanced_accuracy_score(y_test, y_pred),
    }

    cm = confusion_matrix(y_test, y_pred)
    print("Matrice de confusion:\n", cm)
    return metrics
```

**Modèles à comparer (au minimum) :**
1. Baseline : `LogisticRegression` (interprétable, rapide)
2. Modèle intermédiaire : `RandomForestClassifier`
3. Modèle avancé (optionnel) : `GradientBoostingClassifier` / `XGBoost`

**Validation croisée :** `StratifiedKFold` (5 folds) recommandée pour tenir compte du déséquilibre de classes lors du tuning d'hyperparamètres (`GridSearchCV` ou `RandomizedSearchCV`), chaque combinaison étant elle-même loguée dans MLflow (nested runs).

### 6.4 Sauvegarde et versionnement

- Chaque run MLflow sauvegarde automatiquement le pipeline scikit-learn complet (`preprocessor + classifier`) via `mlflow.sklearn.log_model`, garantissant que le service de prédiction utilise exactement la même chaîne de transformation qu'à l'entraînement.
- Le modèle est enregistré dans le **MLflow Model Registry** sous le nom `bindingdb_interaction_classifier`, avec une nouvelle version à chaque entraînement significatif.
- Un tag `data_version` relie le modèle à la version exacte des données (lineage modèle ↔ données).

---

## 7. MLflow

### 7.1 Tracking

- **Backend store** : SQLite ou PostgreSQL (recommandé pour le travail d'équipe) pour stocker les métadonnées des runs.
- **Artifact store** : dossier local `./mlruns/artifacts` en développement, ou un bucket S3/MinIO en environnement conteneurisé partagé.
- **Éléments trackés par run** : paramètres (hyperparamètres), métriques (AUC-ROC, F1, PR-AUC, etc.), artefacts (modèle sérialisé, matrice de confusion en image, rapport Evidently), tags (`data_version`, `git_commit`, `sprint`).

```bash
# Lancement du serveur MLflow (local ou conteneurisé)
mlflow server \
  --backend-store-uri postgresql://mlflow:mlflow@postgres:5432/mlflow \
  --default-artifact-root s3://mlflow-artifacts/ \
  --host 0.0.0.0 --port 5000
```

### 7.2 Model Registry

**Cycle de vie d'un modèle :**

```
None → Staging → Production → Archived
```

```python
# ml/register_model.py
from mlflow.tracking import MlflowClient

def promote_to_production(model_name: str, version: int):
    client = MlflowClient()
    client.transition_model_version_stage(
        name=model_name,
        version=version,
        stage="Production",
        archive_existing_versions=True,
    )
    client.set_model_version_tag(model_name, version, "validated_by", "ml_lead")
```

**Règle de promotion (Definition of Ready pour "Production") :**
- AUC-ROC ≥ 0.80 sur le jeu de test
- F1 ≥ 0.75
- Pas de régression > 2% par rapport au modèle "Production" actuel
- Tests d'intégration API (prédiction sur des exemples connus) passés

### 7.3 Artefacts trackés

| Artefact | Description |
|---|---|
| `model/` | Pipeline scikit-learn sérialisé (format MLflow) + `conda.yaml`/`requirements.txt` |
| `confusion_matrix.png` | Visualisation de la matrice de confusion sur le jeu de test |
| `roc_curve.png` | Courbe ROC |
| `feature_importance.png` | Importance des features (pour modèles arbres) |
| `evidently_report.html` | Rapport de comparaison de distribution (data drift) au moment de l'entraînement |
| `data_contract_snapshot.yaml` | Copie du Data Contract au moment du run, pour audit |

---

## 8. Déploiement

### 8.1 API FastAPI

```python
# api/schemas.py
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    smiles: str = Field(..., example="CC(=O)Oc1ccccc1C(=O)O")
    protein_sequence: str = Field(..., example="MKTAYIAKQRQISFVKSHFSRQ...")

class PredictionResponse(BaseModel):
    interaction_probability: float
    interaction_predicted: int
    model_version: str
```

```python
# api/model_loader.py
import mlflow
import os

MODEL_NAME = os.getenv("MODEL_NAME", "bindingdb_interaction_classifier")
MODEL_STAGE = os.getenv("MODEL_STAGE", "Production")
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://mlflow:5000")

def load_production_model():
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    model_uri = f"models:/{MODEL_NAME}/{MODEL_STAGE}"
    model = mlflow.sklearn.load_model(model_uri)
    return model
```

```python
# api/main.py
import time
import pandas as pd
from fastapi import FastAPI, HTTPException
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from starlette.responses import Response

from api.schemas import PredictionRequest, PredictionResponse
from api.model_loader import load_production_model, MODEL_STAGE

app = FastAPI(
    title="BindingDB Molecule-Protein Interaction API",
    description="Prédit la probabilité d'interaction entre une molécule (SMILES) et une protéine",
    version="1.0.0",
)

model = None

REQUEST_COUNT = Counter("api_requests_total", "Nombre total de requêtes", ["endpoint", "status"])
REQUEST_LATENCY = Histogram("api_request_latency_seconds", "Latence des requêtes", ["endpoint"])

@app.on_event("startup")
def startup_event():
    global model
    model = load_production_model()

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None, "model_stage": MODEL_STAGE}

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    start = time.time()
    try:
        X = pd.DataFrame([{
            "smiles": request.smiles,
            "protein_sequence": request.protein_sequence,
        }])
        proba = model.predict_proba(X)[0, 1]
        pred = int(proba >= 0.5)

        REQUEST_COUNT.labels(endpoint="/predict", status="success").inc()
        return PredictionResponse(
            interaction_probability=round(float(proba), 4),
            interaction_predicted=pred,
            model_version=MODEL_STAGE,
        )
    except Exception as e:
        REQUEST_COUNT.labels(endpoint="/predict", status="error").inc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        REQUEST_LATENCY.labels(endpoint="/predict").observe(time.time() - start)
```

### 8.2 Endpoints exposés

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Vérifie que le service et le modèle sont chargés |
| `GET` | `/metrics` | Expose les métriques au format Prometheus |
| `POST` | `/predict` | Prédit la probabilité d'interaction pour une paire (SMILES, séquence) |
| `GET` | `/docs` | Documentation OpenAPI interactive (générée automatiquement par FastAPI) |

### 8.3 Conteneurisation

```dockerfile
# docker/Dockerfile.api
FROM python:3.11-slim

WORKDIR /app

COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY api/ ./api/

ENV MLFLOW_TRACKING_URI=http://mlflow:5000
ENV MODEL_NAME=bindingdb_interaction_classifier
ENV MODEL_STAGE=Production

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker/docker-compose.yml
version: "3.9"

services:
  mlflow:
    image: ghcr.io/mlflow/mlflow:latest
    ports: ["5000:5000"]
    environment:
      - BACKEND_STORE_URI=sqlite:///mlflow.db
    volumes:
      - mlflow_data:/mlflow
    command: >
      mlflow server --backend-store-uri sqlite:///mlflow.db
      --default-artifact-root /mlflow/artifacts
      --host 0.0.0.0 --port 5000

  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile.api
    ports: ["8000:8000"]
    depends_on: [mlflow]

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ../monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports: ["9090:9090"]

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    depends_on: [prometheus]

volumes:
  mlflow_data:
```

---

## 9. CI/CD

### 9.1 Pipeline GitHub Actions — Intégration continue

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: pip install -r requirements-dev.txt

      - name: Lint (ruff)
        run: ruff check .

      - name: Format check (black)
        run: black --check .

      - name: Unit tests
        run: pytest tests/unit --cov=ml --cov=api --cov-report=xml

      - name: dbt tests
        run: |
          cd dbt_project
          dbt deps
          dbt build --target ci

      - name: Upload coverage
        uses: codecov/codecov-action@v4
```

### 9.2 Pipeline GitHub Actions — Déploiement continu

```yaml
# .github/workflows/cd.yml
name: CD

on:
  push:
    branches: [main]
    paths:
      - "api/**"
      - "docker/**"

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push API image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile.api
          push: true
          tags: |
            ghcr.io/${{ github.repository }}/bindingdb-api:latest
            ghcr.io/${{ github.repository }}/bindingdb-api:${{ github.sha }}

      - name: Deploy (placeholder)
        run: echo "Déploiement vers l'environnement cible (staging/prod)"
```

### 9.3 Règles de branche et Pull Requests

- Branche `main` protégée : merge uniquement via Pull Request avec au moins 1 revue approuvée et CI verte.
- Convention de nommage des branches : `feature/US-x.y-description`, `fix/...`, `chore/...`.
- Convention de commits : [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `test:`).
- Chaque US du backlog correspond à une Issue GitHub, liée à sa PR (`Closes #12`).

---

## 10. Monitoring & Observabilité

### 10.1 Axes de surveillance

| Axe | Objectif | Outil |
|---|---|---|
| **Santé technique** | Disponibilité, latence, taux d'erreur de l'API | Prometheus + Grafana |
| **Dérive des données (Data Drift)** | Détecter si les nouvelles requêtes/données diffèrent statistiquement du jeu d'entraînement | Evidently |
| **Dérive du modèle (Model/Concept Drift)** | Surveiller la dégradation de performance dans le temps (quand le label réel devient disponible) | Evidently + comparaison périodique |
| **Qualité des données en production** | Vérifier la conformité des inputs reçus par l'API (SMILES valides, séquences valides) | Validation Pydantic + logs structurés |

### 10.2 Rapport Evidently

```python
# monitoring/evidently_report.py
import duckdb
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, TargetDriftPreset

def generate_drift_report(reference_table: str, current_table: str, output_path: str):
    con = duckdb.connect("bindingdb.duckdb")
    reference_df = con.execute(f"select * from {reference_table}").fetchdf()
    current_df = con.execute(f"select * from {current_table}").fetchdf()
    con.close()

    report = Report(metrics=[DataDriftPreset(), TargetDriftPreset()])
    report.run(reference_data=reference_df, current_data=current_df)
    report.save_html(output_path)
    return report
```

Ce rapport est généré :
1. **À chaque entraînement** (Dagster asset `drift_report`), comparant les nouvelles données ingérées au snapshot de référence.
2. **Périodiquement en production** (job planifié), comparant les requêtes reçues par l'API (loguées) à la distribution d'entraînement.

### 10.3 Prometheus & Grafana

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "bindingdb-api"
    static_configs:
      - targets: ["api:8000"]
```

**Dashboard Grafana — panneaux recommandés :**
- Nombre de requêtes `/predict` par minute
- Latence p50/p95/p99
- Taux d'erreur (`status="error"`)
- Distribution des probabilités prédites (histogramme)
- Statut du dernier rapport de drift (score de drift Evidently exposé en métrique custom)

### 10.4 Alerting

- Alerte Dagster (Slack/e-mail) si un asset échoue (ex. `dbt_transformations` en échec, tests qualité en échec).
- Alerte Grafana si le taux d'erreur de l'API dépasse un seuil (ex. > 5% sur 5 minutes) ou si la latence p95 dépasse 1s.
- Alerte si le score de drift Evidently dépasse un seuil critique → déclenchement recommandé d'un ré-entraînement.

---

## 11. Documentation GitHub

### 11.1 Structure de documentation recommandée

```
README.md                  # Vue d'ensemble, quickstart, architecture résumée
docs/
├── architecture.md        # Schéma détaillé + description de chaque brique
├── data_contract.md       # Data Contract complet (voir §5.2)
├── data_catalog.md        # Catalogue des tables et colonnes
├── installation.md        # Guide d'installation pas-à-pas
├── runbook.md              # Procédures opérationnelles (relancer un pipeline, réentraîner, rollback modèle)
├── api_guide.md            # Documentation d'usage de l'API (exemples curl/Python)
└── contributing.md         # Conventions de code, workflow Git, revue de PR
```

### 11.2 Contenu attendu du README principal

- Badge de statut CI/CD
- Description du projet et du problème métier
- Schéma d'architecture (image ou ASCII)
- Instructions d'installation (`docker compose up`)
- Exemple d'appel à l'API (`curl -X POST .../predict`)
- Lien vers le tableau Kanban (GitHub Projects)
- Section "Équipe & rôles"
- Section "Licence & citation BindingDB"

### 11.3 Bonnes pratiques

- Chaque module (`dlt_pipeline/`, `dbt_project/`, `ml/`, `api/`) possède son propre `README.md` court expliquant son rôle et comment l'exécuter isolément.
- Les décisions techniques importantes sont documentées via des **ADR (Architecture Decision Records)** dans `docs/adr/` (ex. "ADR-001 : choix du seuil d'affinité pour le label").
- Le Model Card du modèle final (`docs/model_card.md`) résume : données d'entraînement, métriques, limites connues, biais potentiels (ex. sur-représentation de certaines familles de protéines dans BindingDB).

---

## 12. Plan de présentation finale

### 12.1 Structure recommandée (30-40 minutes)

| Section | Durée | Contenu |
|---|---|---|
| 1. Contexte & problématique | 3 min | Enjeu métier de la prédiction d'interaction molécule-protéine |
| 2. Démarche Agile | 3 min | Backlog, sprints, rétrospectives — enseignements tirés |
| 3. Architecture technique | 5 min | Schéma global, choix technologiques justifiés |
| 4. Démo pipeline Data (dlt → DuckDB → dbt) | 5 min | Exécution live ou capture d'écran de l'UI dbt docs + Dagster |
| 5. Qualité des données & Data Contract | 3 min | Exemples de tests, présentation du contrat |
| 6. Démo Dagster (orchestration) | 3 min | Graphe d'assets, run complet |
| 7. Machine Learning & MLflow | 5 min | Comparaison de modèles, métriques, Model Registry |
| 8. Démo API + Docker | 5 min | Appel `/predict` en direct, réponse en temps réel |
| 9. CI/CD | 2 min | Pipeline GitHub Actions verte, exemple de PR |
| 10. Monitoring | 3 min | Dashboard Grafana, rapport Evidently |
| 11. Limites, pistes d'amélioration & conclusion | 3 min | RDKit/embeddings protéiques, passage à l'échelle, MLOps avancé (feature store, A/B testing) |
| Q&A | 5-10 min | Questions du jury |

### 12.2 Checklist avant présentation

- [ ] `docker compose up` fonctionne de zéro sur une machine propre
- [ ] Pipeline Dagster exécutable en direct (ou vidéo de secours enregistrée)
- [ ] MLflow UI accessible avec l'historique des runs visible
- [ ] Endpoint `/predict` testé avec au moins 2 exemples (1 positif attendu, 1 négatif attendu)
- [ ] Dashboard Grafana avec données réelles (pas de graphique vide)
- [ ] README à jour, dépôt GitHub propre (pas de branches orphelines, PR toutes mergées ou closes)
- [ ] Slides de synthèse (10-15 slides max, schéma d'architecture inclus)
- [ ] Répartition des prises de parole entre tous les membres de l'équipe

### 12.3 Livrables finaux attendus

1. Dépôt GitHub complet avec historique de commits/PR cohérent avec les 3 sprints
2. Documentation complète (`README.md` + `docs/`)
3. Pipeline Data/ML fonctionnel et reproductible (`docker compose up`)
4. Modèle enregistré dans MLflow Registry (stage Production)
5. API déployée et testable (via Docker)
6. Dashboard de monitoring fonctionnel
7. Support de présentation (slides)
8. Rétrospectives des 3 sprints (document synthétique des enseignements)

---

*Document généré comme plan de projet de référence pour le module MLOps & DataOps — à adapter selon les contraintes réelles de volumétrie BindingDB et le niveau d'avancement de l'équipe.*

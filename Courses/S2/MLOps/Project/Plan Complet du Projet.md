# 🎯 Plan Complet du Projet — Table `cobweb_bdb` Uniquement

## 📋 Vue d'ensemble

**Table utilisée** : `cobweb_bdb` (151 029 lignes, 9 colonnes)
**Tâche ML** : Classification **3 classes** (`affinity_strength` ∈ {0, 1, 2})
**Architecture** : dlt → DuckDB → dbt → Dagster → Scikit-Learn → MLflow → FastAPI → Docker → CI/CD → Monitoring

---

## 🔹 PHASE 0 — Préparation de l'environnement

### Étapes exactes

1. **Créer le dossier racine** du projet : `molecule-protein-interaction/`
2. **Initialiser Git** dans ce dossier
3. **Créer un environnement virtuel Python** (`.venv`)
4. **Créer un fichier `requirements.txt`** avec les dépendances :
   - `dlt`, `duckdb`, `dbt-duckdb`, `dagster`, `dagster-webserver`
   - `scikit-learn`, `pandas`, `numpy`, `mlflow`
   - `fastapi`, `uvicorn`, `pydantic`
   - `pytest`, `evidently`, `python-dotenv`, `requests`, `joblib`
5. **Installer les dépendances** dans le venv
6. **Créer la structure de dossiers** :
   ```
   data/raw/
   data/processed/
   ingestion/
   dbt_project/
   dagster_pipelines/
   ml/
   api/
   tests/
   monitoring/
   .github/workflows/
   docs/
   contracts/
   ```
7. **Créer un fichier `.gitignore`** (exclure `.venv/`, `data/raw/*.csv`, `mlruns/`, `*.duckdb`)
8. **Premier commit Git** : `chore: initial project structure`

---

## 🔹 PHASE 1 — Ingestion avec `dlt`

### Étapes exactes

1. **Télécharger le fichier source** `cobweb_bdb` (CSV ou Parquet) depuis BindingDB
2. **Placer le fichier** dans `data/raw/cobweb_bdb.csv`
3. **Créer le script d'ingestion** `ingestion/cobweb_bdb_pipeline.py` :
   - Définir une **ressource dlt** nommée `cobweb_bdb_raw`
   - Configurer la **pipeline dlt** avec destination `duckdb`
   - Définir le **dataset name** : `bindingdb`
   - Mode d'écriture : `replace` (ou `append` si incrémental)
4. **Exécuter le script** pour créer la base `bindingdb.duckdb`
5. **Vérifier l'ingestion** : compter les lignes dans DuckDB (attendu : 151 029)
6. **Commit Git** : `feat: dlt ingestion pipeline for cobweb_bdb`

### Points de vigilance

- Vérifier l'encodage du CSV (UTF-8)
- Gérer les valeurs manquantes dans `source_organism` et `affinity_value`
- Documenter le schéma dlt dans `docs/schema_ingestion.md`

---

## 🔹 PHASE 2 — Stockage DuckDB

### Étapes exactes

1. **Vérifier la table créée** dans `bindingdb.duckdb` (schéma `bindingdb.cobweb_bdb_raw`)
2. **Créer un script de vérification** `ingestion/check_duckdb.py` :
   - Afficher le nombre de lignes
   - Afficher le schéma (types de colonnes)
   - Afficher la distribution de `affinity_strength`
3. **Créer un fichier `docs/duckdb_schema.md`** documentant les 9 colonnes
4. **Commit Git** : `feat: DuckDB storage verification`

---

## 🔹 PHASE 3 — Transformations avec `dbt`

### Étapes exactes

1. **Initialiser le projet dbt** dans `dbt_project/` :
   - Nom : `dbt_bindingdb`
   - Profil : `duckdb` pointant vers `bindingdb.duckdb`
2. **Configurer `profiles.yml`** :
   - Type : `duckdb`
   - Path : `../bindingdb.duckdb`
   - Schema : `main`
3. **Définir la source** dans `models/staging/sources.yml` :
   - Source : `bindingdb`
   - Table : `cobweb_bdb_raw`
4. **Créer le modèle de staging** `models/staging/stg_cobweb_bdb.sql` :
   - Sélectionner les colonnes utiles
   - Renommer les colonnes (snake_case)
   - Filtrer les lignes avec `affinity_value IS NULL`
   - Filtrer les lignes avec `target_name IS NULL`
   - Filtrer les lignes avec `inhibitor_name IS NULL`
   - **Créer la colonne cible** `interaction_label` = `affinity_strength` (garder 3 classes)
5. **Créer le modèle intermédiaire** `models/intermediate/int_cobweb_clean.sql` :
   - Nettoyer `source_organism` (normaliser : "Human" vs "Homo sapiens")
   - Normaliser `affinity_type` (majuscules)
   - Supprimer les doublons sur `(target_name, inhibitor_name, affinity_type)`
6. **Créer le modèle final** `models/marts/mart_ml_features.sql` :
   - Sélectionner les features finales pour le ML
   - Colonnes : `target_name`, `inhibitor_name`, `affinity_type`, `affinity_value`, `source_organism`, `interaction_label`
7. **Créer le fichier `models/schema.yml`** avec les tests dbt :
   - `not_null` sur `target_name`, `inhibitor_name`, `interaction_label`
   - `unique` sur `reactant_set_id`
   - `accepted_values` sur `interaction_label` ∈ {0, 1, 2}
   - `accepted_values` sur `affinity_type` ∈ {IC50, Kd, Ki, EC50}
8. **Exécuter `dbt debug`** pour vérifier la connexion
9. **Exécuter `dbt run`** pour créer les modèles
10. **Exécuter `dbt test`** pour valider les tests
11. **Exécuter `dbt docs generate`** pour générer la documentation
12. **Commit Git** : `feat: dbt models for cobweb_bdb`

### Points de vigilance

- Respecter la convention de nommage : `stg_`, `int_`, `mart_`
- Documenter chaque modèle avec `description:` dans le YAML
- Ajouter des `tags` dbt (`staging`, `ml`, `quality`)

---

## 🔹 PHASE 4 — Qualité des données (Data Contracts)

### Étapes exactes

1. **Créer le Data Contract** `contracts/cobweb_bdb_contract.yml` :
   - Dataset : `bindingdb_ml`
   - Owner : `data-team`
   - Version : `1.0`
   - Colonnes avec : type, required, min/max, allowed_values, description
2. **Créer un test de qualité personnalisé** `tests/test_quality.py` :
   - Test de complétude : % de valeurs non nulles > 95%
   - Test de validité : `interaction_label` ∈ {0, 1, 2}
   - Test de cohérence : `affinity_value > 0`
   - Test d'intégrité : pas de doublons sur `reactant_set_id`
   - Test de fraîcheur : date d'ingestion < 7 jours
3. **Créer un fichier de Data Lineage** `docs/data_lineage.md` :
   - Source : BindingDB `cobweb_bdb`
   - Transformation : dlt → DuckDB → dbt
   - Destination : `mart_ml_features`
   - Format : diagramme Mermaid
4. **Créer les métadonnées** `docs/metadata.md` :
   - Nombre de lignes source / cible
   - Distribution des classes
   - Statistiques descriptives par colonne
5. **Exécuter les tests** : `pytest tests/test_quality.py`
6. **Commit Git** : `feat: data quality tests and contracts`

---

## 🔹 PHASE 5 — Orchestration avec Dagster

### Étapes exactes

1. **Créer le fichier** `dagster_pipelines/__init__.py` avec :
   - **Op `ingest_cobweb_bdb`** : exécute le script dlt
   - **Op `transform_dbt`** : exécute `dbt run`
   - **Op `test_dbt`** : exécute `dbt test`
   - **Op `test_quality`** : exécute `pytest tests/test_quality.py`
   - **Op `train_model`** : exécute `python ml/train.py`
   - **Job `cobweb_bdb_pipeline_job`** : orchestre les ops dans l'ordre
2. **Définir les dépendances** entre ops (ingest → transform → test → train)
3. **Ajouter un schedule** (optionnel) : exécution quotidienne
4. **Lancer Dagster** : `dagster dev -f dagster_pipelines/__init__.py`
5. **Vérifier l'UI** sur `http://localhost:3000`
6. **Exécuter le job manuellement** depuis l'UI
7. **Commit Git** : `feat: dagster orchestration pipeline`

---

## 🔹 PHASE 6 — Machine Learning (3 classes)

### Étapes exactes

1. **Créer le script de préparation** `ml/prepare.py` :
   - Charger `mart_ml_features` depuis DuckDB
   - Vérifier la distribution de `interaction_label` (attendu : 60/20/20)
   - Séparer features (X) et target (y)
   - Split train/test : 80/20 avec `stratify=y`
   - Sauvegarder les splits dans `data/processed/`
2. **Créer le script de feature engineering** `ml/features.py` :
   - **Encodage** de `affinity_type` (OneHotEncoder)
   - **Encodage** de `source_organism` (TargetEncoder ou OneHot)
   - **Vectorisation** de `target_name` et `inhibitor_name` (TF-IDF sur caractères, optionnel)
   - **Normalisation** de `affinity_value` (StandardScaler ou log-transform)
3. **Créer le script d'entraînement** `ml/train.py` :
   - Créer un **Pipeline Scikit-Learn** : preprocessor + classifier
   - Classifier : **RandomForestClassifier** avec `class_weight='balanced'`
   - **MLflow** : démarrer un run, logger les params, métriques, modèle
   - Métriques : `accuracy`, `f1_macro`, `f1_weighted`, `precision_macro`, `recall_macro`
   - Matrice de confusion 3×3 (logger comme artefact)
   - Sauvegarder le modèle dans MLflow Registry sous `cobweb_bdb_rf`
4. **Créer le script d'évaluation** `ml/evaluate.py` :
   - Charger le modèle depuis MLflow Registry
   - Prédire sur le test set
   - Générer le rapport de classification (3 classes)
   - Générer la matrice de confusion
   - Sauvegarder les résultats dans `docs/evaluation_report.md`
5. **Exécuter l'entraînement** : `python ml/train.py`
6. **Lancer MLflow UI** : `mlflow ui --port 5000`
7. **Vérifier les expériences** sur `http://localhost:5000`
8. **Commit Git** : `feat: ML training pipeline with 3-class classification`

### Points de vigilance

- **Gestion du déséquilibre** : `class_weight='balanced'`
- **Stratification** : obligatoire pour garder 60/20/20 dans train et test
- **Reproductibilité** : fixer `random_state=42` partout
- **Versionnement** : enregistrer le modèle dans MLflow Registry

---

## 🔹 PHASE 7 — MLflow (Tracking & Registry)

### Étapes exactes

1. **Configurer MLflow** dans `ml/config.py` :
   - Tracking URI : `./mlruns` (local) ou serveur distant
   - Experiment name : `cobweb_bdb_classification`
2. **Logger dans chaque run** :
   - **Params** : `n_estimators`, `max_depth`, `class_weight`, `random_state`
   - **Métriques** : `accuracy`, `f1_macro`, `f1_weighted`, `precision_macro`, `recall_macro`
   - **Artefacts** : matrice de confusion (PNG), rapport de classification (TXT), modèle (pickle)
   - **Tags** : `version`, `author`, `dataset_version`
3. **Enregistrer le modèle** dans le Registry :
   - Nom : `cobweb_bdb_rf`
   - Stage : `Staging` → `Production` après validation
4. **Créer un fichier** `docs/mlflow_guide.md` documentant :
   - Comment lancer MLflow UI
   - Comment comparer les runs
   - Comment promouvoir un modèle en Production
5. **Commit Git** : `feat: MLflow tracking and registry`

---

## 🔹 PHASE 8 — Déploiement FastAPI

### Étapes exactes

1. **Créer l'API** `api/main.py` :
   - **Endpoint `GET /health`** : retourne `{"status": "ok"}`
   - **Endpoint `POST /predict`** :
     - Input : `target_name`, `inhibitor_name`, `affinity_type`, `affinity_value`, `source_organism`
     - Output : `{"interaction_label": 0|1|2, "probability": [p0, p1, p2]}`
   - **Charger le modèle** depuis MLflow Registry au démarrage
   - **Validation** des inputs avec Pydantic
2. **Créer le schéma Pydantic** `api/schemas.py` :
   - `PredictionInput`
   - `PredictionOutput`
3. **Créer un fichier de test** `tests/test_api.py` :
   - Test `GET /health`
   - Test `POST /predict` avec input valide
   - Test `POST /predict` avec input invalide (doit retourner 422)
4. **Lancer l'API** : `uvicorn api.main:app --reload --port 8000`
5. **Tester avec curl** :
   - `curl http://localhost:8000/health`
   - `curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{...}'`
6. **Commit Git** : `feat: FastAPI prediction service`

---

## 🔹 PHASE 9 — Conteneurisation Docker

### Étapes exactes

1. **Créer le `Dockerfile`** :
   - Base : `python:3.11-slim`
   - Copier `requirements.txt` et installer
   - Copier le code source
   - Exposer le port 8000
   - CMD : `uvicorn api.main:app --host 0.0.0.0 --port 8000`
2. **Créer le `.dockerignore`** :
   - Exclure `.venv/`, `data/raw/`, `mlruns/`, `*.duckdb`, `.git/`
3. **Construire l'image** : `docker build -t cobweb-bdb-api .`
4. **Lancer le conteneur** : `docker run -p 8000:8000 cobweb-bdb-api`
5. **Tester l'API conteneurisée** : `curl http://localhost:8000/health`
6. **Créer un `docker-compose.yml`** (optionnel) pour orchestrer :
   - Service API
   - Service MLflow
   - Service Dagster
7. **Commit Git** : `feat: Docker containerization`

---

## 🔹 PHASE 10 — CI/CD avec GitHub Actions

### Étapes exactes

1. **Créer le workflow** `.github/workflows/ci.yml` :
   - **Trigger** : push sur `main` et pull requests
   - **Job 1 : `lint`** :
     - Installer `ruff` ou `flake8`
     - Lancer le linting sur tout le code
   - **Job 2 : `test`** :
     - Installer les dépendances
     - Lancer `pytest tests/`
   - **Job 3 : `dbt-test`** :
     - Installer dbt
     - Lancer `dbt run` et `dbt test`
   - **Job 4 : `docker-build`** :
     - Construire l'image Docker
     - Vérifier que le build passe
2. **Créer le workflow** `.github/workflows/cd.yml` :
   - **Trigger** : push sur `main` après merge
   - **Job : `deploy`** :
     - Construire et pousser l'image sur Docker Hub ou GitHub Container Registry
3. **Ajouter un badge CI** dans le README
4. **Créer des Pull Requests** pour chaque feature
5. **Commit Git** : `ci: GitHub Actions workflow`

---

## 🔹 PHASE 11 — Monitoring & Observabilité

### Étapes exactes

1. **Créer le script** `monitoring/monitor.py` :
   - **Health check** : ping `GET /health` toutes les 10 secondes
   - **Mesure du temps de réponse** : enregistrer `response_time`
   - **Métriques ML** : distribution des prédictions (`interaction_label`)
   - **Détection de dérive** : comparer la distribution des inputs en production vs entraînement
2. **Utiliser Evidently** pour la détection de dérive :
   - Créer un rapport `DataDriftPreset`
   - Sauvegarder les rapports dans `monitoring/reports/`
3. **Créer un dashboard** (optionnel) avec Streamlit ou Grafana :
   - Nombre de prédictions par classe
   - Temps de réponse moyen
   - Taux d'erreur
4. **Logger les métriques** dans un fichier `monitoring/metrics.log`
5. **Commit Git** : `feat: monitoring and observability`

---

## 🔹 PHASE 12 — Documentation

### Étapes exactes

1. **Créer le `README.md`** principal :
   - Titre du projet
   - Description
   - Architecture (diagramme Mermaid)
   - Installation
   - Utilisation
   - Structure du projet
   - Auteurs
2. **Créer `docs/architecture.md`** :
   - Diagramme de l'architecture complète
   - Description de chaque composant
   - Flux de données
3. **Créer `docs/installation.md`** :
   - Prérequis
   - Étapes d'installation pas à pas
   - Commandes à exécuter
4. **Créer `docs/usage.md`** :
   - Comment lancer le pipeline
   - Comment entraîner le modèle
   - Comment lancer l'API
   - Comment tester
5. **Créer `docs/data_dictionary.md`** :
   - Description de chaque colonne de `cobweb_bdb`
   - Types, valeurs possibles, signification
6. **Créer `docs/agile/`** :
   - `product_backlog.md`
   - `user_stories.md`
   - `sprint_planning.md`
   - `sprint_reviews.md`
   - `sprint_retrospectives.md`
7. **Commit Git** : `docs: complete documentation`

---

## 🔹 PHASE 13 — Gestion Agile (3 Sprints minimum)

### Étapes exactes

1. **Créer le Product Backlog** :
   - Liste de toutes les User Stories
   - Priorisation (MoSCoW : Must, Should, Could, Won't)
2. **Créer les User Stories** au format :
   - `En tant que [rôle], je veux [action] afin de [bénéfice]`
   - Critères d'acceptation
   - Estimation (story points)
3. **Planifier 3 Sprints** :
   - **Sprint 1** (2 semaines) : Ingestion + Stockage + dbt
   - **Sprint 2** (2 semaines) : Qualité + ML + MLflow
   - **Sprint 3** (2 semaines) : API + Docker + CI/CD + Monitoring
4. **Documenter chaque Sprint** :
   - Sprint Planning (objectifs)
   - Sprint Review (démo, feedback)
   - Sprint Retrospective (ce qui a marché, ce qui doit être amélioré)
5. **Utiliser GitHub Projects** ou Trello pour le suivi
6. **Commit Git** : `docs: agile artifacts for 3 sprints`

---

## 🔹 PHASE 14 — Présentation Finale

### Étapes exactes

1. **Créer les slides** (15 min) :
   - Slide 1 : Titre + équipe
   - Slide 2 : Problématique + objectifs
   - Slide 3 : Architecture (diagramme)
   - Slide 4 : Pipeline DataOps (dlt → DuckDB → dbt → Dagster)
   - Slide 5 : Qualité des données + Data Contract
   - Slide 6 : ML (3 classes, métriques, matrice de confusion)
   - Slide 7 : MLflow (tracking + registry)
   - Slide 8 : API + Docker
   - Slide 9 : CI/CD + Monitoring
   - Slide 10 : Résultats + perspectives
2. **Préparer la démo** (10 min) :
   - Lancer Dagster → exécuter le pipeline
   - Montrer MLflow → comparer les runs
   - Lancer FastAPI → tester `/predict`
   - Montrer Docker → `docker ps`
   - Montrer GitHub Actions → workflow vert
3. **Préparer les questions** (5 min) :
   - Anticiper : "Pourquoi 3 classes ?", "Comment gérez-vous le déséquilibre ?", "Comment détectez-vous la dérive ?"
4. **Répéter** la présentation au moins 2 fois
5. **Commit Git** : `docs: final presentation slides`

---

## 📊 RÉCAPITULATIF DES PHASES

| Phase | Tâche | Durée estimée |
|-------|-------|---------------|
| 0 | Environnement | 0.5 jour |
| 1 | Ingestion dlt | 1 jour |
| 2 | Stockage DuckDB | 0.5 jour |
| 3 | Transformations dbt | 2 jours |
| 4 | Qualité des données | 1 jour |
| 5 | Orchestration Dagster | 1.5 jours |
| 6 | Machine Learning | 3 jours |
| 7 | MLflow | 1 jour |
| 8 | FastAPI | 1.5 jours |
| 9 | Docker | 1 jour |
| 10 | CI/CD | 1.5 jours |
| 11 | Monitoring | 1.5 jours |
| 12 | Documentation | 2 jours |
| 13 | Agile (3 sprints) | En continu |
| 14 | Présentation | 2 jours |
| **TOTAL** | | **~20 jours** |

---

## ✅ CHECKLIST FINALE

- [ ] Environnement + Git + venv
- [ ] Ingestion dlt → DuckDB
- [ ] Modèles dbt (staging, intermediate, marts)
- [ ] Tests qualité + Data Contract + Data Lineage
- [ ] Pipeline Dagster
- [ ] ML 3 classes + MLflow
- [ ] API FastAPI + Docker
- [ ] CI/CD GitHub Actions
- [ ] Monitoring + Evidently
- [ ] Documentation complète
- [ ] 3 sprints Agile documentés
- [ ] Présentation finale

---

## 🎯 PROCHAINE ÉTAPE

Souhaitez-vous que je vous fournisse :

1. **Le code complet de la Phase 1** (ingestion dlt) ?
2. **Le code complet de la Phase 3** (modèles dbt) ?
3. **Le code complet de la Phase 6** (ML 3 classes) ?
4. **Tout le code, phase par phase** ?

Dites-moi par quelle phase vous voulez commencer et je vous fournis le code professionnel immédiatement.
# Fiche descriptive des outils - Pipelines agiles, versionnement et orchestration

---

## 1. Python

### Définition

Python est le langage de programmation utilisé pour écrire les scripts du pipeline.

### Rôle dans le TP

Il sert à :

- lire le fichier CSV
- charger les données
- faire une validation simple
- lancer certaines étapes du pipeline

### Pourquoi on l'utilise

Parce qu'il est simple, lisible, très utilisé en data, et bien adapté aux pipelines data/ML.

### Ce que l'étudiant doit retenir

Python est le langage d'implémentation du pipeline.

---

## 2. venv

### Définition

`venv` est l'outil standard de Python pour créer un environnement virtuel.

### Rôle dans le TP

Il permet de créer un espace isolé contenant uniquement les bibliothèques du projet.

### Pourquoi on l'utilise

Pour éviter les conflits entre projets et garantir que tous les étudiants travaillent avec un environnement cohérent.

### Ce que l'étudiant doit retenir

`venv` contribue à la reproductibilité.

---

## 3. pip

### Définition

`pip` est le gestionnaire de paquets Python.

### Rôle dans le TP

Il sert à installer les bibliothèques nécessaires :

- `dlt`
- `dbt`
- `Dagster`
- `pandas`
- `duckdb`
- etc.

### Pourquoi on l'utilise

Parce qu'il permet de construire rapidement l'environnement logiciel du projet.

### Ce que l'étudiant doit retenir

`pip` sert à installer les dépendances du pipeline.

---

## 4. requirements.txt

### Définition

`requirements.txt` est un fichier qui liste les dépendances Python du projet.

### Rôle dans le TP

Il permet de sauvegarder les bibliothèques installées et leurs versions.

### Pourquoi on l'utilise

Pour pouvoir recréer le même environnement sur une autre machine ou plus tard.

### Ce que l'étudiant doit retenir

`requirements.txt` est un outil central de reproductibilité technique.

---

## 5. Git

### Définition

Git est un système de versionnement.

### Rôle dans le TP

Il sert à :

- enregistrer les changements du projet
- garder un historique
- faire des commits à chaque étape importante
- suivre l'évolution du pipeline

### Pourquoi on l'utilise

Parce qu'un pipeline industrialisé doit être traçable et évolutif.

### Ce que l'étudiant doit retenir

Git permet de versionner le code et la structure du projet.

---

## 6. CSV

### Définition

Le CSV est un format de fichier tabulaire simple.

### Rôle dans le TP

Il représente la source brute de données du pipeline.

### Pourquoi on l'utilise

Parce qu'il est simple à lire, très courant, et parfait pour un TP pédagogique.

### Ce que l'étudiant doit retenir

Le fichier CSV est l'entrée initiale du pipeline.

---

## 7. pandas

### Définition

`pandas` est une bibliothèque Python de manipulation de données tabulaires.

### Rôle dans le TP

Elle sert à :

- lire le fichier CSV
- manipuler les données
- préparer les données avant leur chargement ou validation

### Pourquoi on l'utilise

Parce qu'elle est standard en data engineering et data science.

### Ce que l'étudiant doit retenir

`pandas` sert à manipuler les données dans Python.

---

## 8. DuckDB

### Définition

DuckDB est une base de données analytique légère embarquée.

### Rôle dans le TP

Elle sert à stocker localement les données chargées et transformées.

### Pourquoi on l'utilise

Parce qu'elle est simple, rapide, locale, et très pratique pour un TP sans infrastructure lourde.

### Ce que l'étudiant doit retenir

DuckDB joue ici le rôle de moteur de stockage et d'analyse local.

---

## 9. dlt

### Définition

`dlt` est un outil d'ingestion de données.

### Rôle dans le TP

Il est utilisé pour mettre en place la partie chargement / ingestion du pipeline.

### Pourquoi on l'utilise

Parce qu'il permet de structurer la phase d'entrée des données dans une logique DataOps moderne.

### Ce que l'étudiant doit retenir

`dlt` = outil d'ingestion. Il correspond à la première partie du pipeline.

---

## 10. dbt

### Définition

`dbt` est un outil de transformation de données basé sur SQL.

### Rôle dans le TP

Il sert à :

- nettoyer les données
- créer des modèles transformés
- agréger les données
- ajouter des tests simples

### Pourquoi on l'utilise

Parce qu'il structure la transformation de façon claire, modulaire et traçable.

### Ce que l'étudiant doit retenir

`dbt` = outil de transformation. Il correspond à la partie transformation / modélisation des données.

---

## 11. Dagster

### Définition

Dagster est un outil d'orchestration de pipelines.

### Rôle dans le TP

Il sert à :

- définir l'ordre des étapes
- relier ingestion, validation, transformation et tests
- exécuter le pipeline dans une logique structurée

### Pourquoi on l'utilise

Parce qu'un pipeline industrialisé ne doit pas être une simple suite de commandes lancées à la main.

### Ce que l'étudiant doit retenir

Dagster = outil d'orchestration. Il gère le workflow d'exécution du pipeline.

---

## 12. dbt test

### Définition

`dbt test` est une commande de dbt permettant d'exécuter des tests sur les modèles de données.

### Rôle dans le TP

Elle sert à vérifier des contraintes simples comme :

- `not_null`
- cohérence minimale de certaines colonnes

### Pourquoi on l'utilise

Pour introduire la logique de qualité des données dans le pipeline.

### Ce que l'étudiant doit retenir

`dbt test` permet d'ajouter des contrôles automatiques sur les données.

---

## 13. GitHub Actions

### Définition

GitHub Actions est un outil de Continuous Integration (CI) intégré à GitHub.

### Rôle dans le TP

Il sert à automatiser certaines vérifications du projet, par exemple :

- installation des dépendances
- vérification syntaxique
- exécution de contrôles simples

### Pourquoi on l'utilise

Pour introduire la logique de CI appliquée aux pipelines.

### Ce que l'étudiant doit retenir

GitHub Actions = outil d'automatisation de vérifications. Il prépare la logique de CI/CD.

---

## 14. .gitignore

### Définition

`.gitignore` est un fichier qui indique à Git quels fichiers ou dossiers ne pas versionner.

### Rôle dans le TP

Il sert à exclure :

- l'environnement virtuel
- les fichiers temporaires
- certains dossiers générés automatiquement

### Pourquoi on l'utilise

Pour garder un dépôt propre et éviter de versionner des fichiers inutiles.

### Ce que l'étudiant doit retenir

`.gitignore` aide à garder un projet propre et maintenable.

---

## 15. YAML

### Définition

YAML est un format de description de configuration.

### Rôle dans le TP

Il est utilisé dans :

- `dbt_project.yml`
- `profiles.yml`
- `schema.yml`
- `ci.yml`

### Pourquoi on l'utilise

Parce qu'il est lisible et très utilisé pour les configurations de pipelines.

### Ce que l'étudiant doit retenir

YAML sert à décrire la configuration du projet et des outils.

---

## Résumé global des outils par rôle

| Outil | Rôle principal dans le TP |
|-------|---------------------------|
| Python | Implémentation des scripts |
| venv | Environnement reproductible |
| pip | Installation des dépendances |
| requirements.txt | Sauvegarde des dépendances |
| Git | Versionnement du projet |
| CSV | Source brute de données |
| pandas | Manipulation des données |
| DuckDB | Stockage analytique local |
| dlt | Ingestion |
| dbt | Transformation |
| dbt test | Contrôle qualité simple |
| Dagster | Orchestration |
| GitHub Actions | CI |
| .gitignore | Nettoyage du dépôt Git |
| YAML | Configuration des outils |

---

## Synthèse du TP

On peut résumer tout le TP ainsi :

| Étape | Outil                   | Rôle                             |
| ----- | ----------------------- | -------------------------------- |
| 1     | CSV                     | La donnée de départ              |
| 2     | Python + pandas         | Lecture et manipulation          |
| 3     | dlt                     | Ingestion                        |
| 4     | DuckDB                  | Stockage local                   |
| 5     | dbt                     | Transformation                   |
| 6     | dbt test                | Contrôle qualité                 |
| 7     | Dagster                 | Orchestration                    |
| 8     | Git                     | Versionnement                    |
| 9     | venv + requirements.txt | Reproductibilité                 |
| 10    | GitHub Actions          | Automatisation des vérifications |
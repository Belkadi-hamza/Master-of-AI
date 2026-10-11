# PHASE 5 — MLOps, LLMOps, CLOUD ET PRODUCTION

# 0. OBJECTIF DE LA PHASE

Jusqu'ici, tu as appris à construire :

```text
Model
+
API
+
RAG
+
Agent
```

Mais en entreprise, une vraie question apparaît :

> Comment faire fonctionner ce système de manière fiable pendant des semaines ou des mois avec plusieurs utilisateurs ?

Il faut pouvoir :

```text
train
 ↓
test
 ↓
version
 ↓
package
 ↓
build
 ↓
deploy
 ↓
monitor
 ↓
detect problems
 ↓
rollback / update
```

C'est l'objectif de cette phase.

---

# 1. LA DIFFÉRENCE ENTRE PROJET IA ET SYSTÈME IA

## Projet étudiant

```text
Dataset
 ↓
Notebook
 ↓
Model
 ↓
Accuracy
```

## Système professionnel

```text
Data
 ↓
Training pipeline
 ↓
Experiment tracking
 ↓
Model registry
 ↓
Tests
 ↓
Docker image
 ↓
CI/CD
 ↓
Cloud
 ↓
API
 ↓
Monitoring
 ↓
Alerts
 ↓
Retraining / redeployment
```

Un AI Engineer doit comprendre cette deuxième architecture.

---

# 2. LES 10 BLOCS DE LA PHASE

```text
BLOC 1
Docker avancé
      ↓
BLOC 2
Docker Compose
      ↓
BLOC 3
MLflow
      ↓
BLOC 4
CI/CD
      ↓
BLOC 5
Container Registry
      ↓
BLOC 6
Cloud
      ↓
BLOC 7
Kubernetes
      ↓
BLOC 8
Observability
      ↓
BLOC 9
LLMOps
      ↓
BLOC 10
Production AI Platform
```

---

# 3. BLOC 1 — DOCKER

Tu as déjà rencontré Docker.

Maintenant tu dois le comprendre correctement.

Docker permet notamment de construire et exécuter une application dans un environnement isolé contenant ses dépendances, puis d'utiliser l'image comme unité de distribution et de déploiement.

---

# 4. IMAGE VS CONTAINER

Très important.

## Image

Une image est un modèle immutable servant à créer des conteneurs.

```text
Dockerfile
    ↓
docker build
    ↓
Image
```

## Container

Un container est une instance exécutable d'une image.

```text
Image
 ↓
docker run
 ↓
Container
```

Donc :

```text
Dockerfile
 ↓
Image
 ↓
Container
```

---

# 5. DOCKERFILE

Exemple pour FastAPI :

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Tu dois comprendre chaque ligne.

---

# 6. BUILD

```bash
docker build -t ml-api:1.0 .
```

Puis :

```bash
docker images
```

Tu dois voir :

```text
ml-api    1.0
```

---

# 7. RUN

```bash
docker run -p 8000:8000 ml-api:1.0
```

Puis :

```text
localhost:8000
```

---

# 8. PORT MAPPING

```text
-p 8000:8000
```

signifie conceptuellement :

```text
HOST 8000
   │
   ▼
CONTAINER 8000
```

Très important lorsque tu déploieras plusieurs services.

---

# 9. ENVIRONMENT VARIABLES

Mauvais :

```dockerfile
ENV API_KEY="secret"
```

Meilleur :

```text
Runtime environment
      ↓
API_KEY
```

Puis :

```bash
docker run \
  -e API_KEY="$API_KEY" \
  ml-api:1.0
```

Les secrets ne doivent pas être intégrés dans l'image.

---

# 10. DOCKER VOLUMES

Un container peut être temporaire.

Si tu veux conserver des données :

```text
Container
    │
    ↓
Volume
```

Exemple :

```bash
docker volume create postgres_data
```

Puis :

```bash
docker run \
  -v postgres_data:/var/lib/postgresql/data \
  postgres
```

---

# 11. NETWORKS

Dans une application réelle :

```text
API
 |
 ├── PostgreSQL
 ├── Qdrant
 └── Redis
```

Les conteneurs doivent pouvoir communiquer.

Docker fournit des réseaux permettant cette communication.

---

# 12. DOCKER COMPOSE

Dès que ton application possède plusieurs services, `docker compose` devient très utile.

Docker présente Compose comme un outil déclaratif permettant de définir plusieurs conteneurs et leur configuration dans un fichier unique.

Exemple :

```yaml
services:

  api:
    build: .
    ports:
      - "8000:8000"

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: ai
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ai_db

  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
```

---

# 13. ARCHITECTURE LOCALE

Tu dois progressivement savoir lancer :

```text
               Docker Compose
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
     FastAPI      PostgreSQL      Qdrant
```

Puis :

```text
docker compose up
```

et tout démarre ensemble.

---

# 14. BLOC 2 — MLOPS

MLOps signifie essentiellement appliquer des pratiques d'ingénierie, d'automatisation et d'exploitation au cycle de vie des modèles ML.

Ton nouveau pipeline :

```text
Data
 ↓
Training
 ↓
Evaluation
 ↓
Registry
 ↓
Deployment
 ↓
Monitoring
```

---

# 15. EXPERIMENT TRACKING

Supposons :

```text
Experiment 1
learning_rate=0.001

Experiment 2
learning_rate=0.0005

Experiment 3
learning_rate=0.0001
```

Tu dois pouvoir répondre :

> Quel modèle a été entraîné avec quel paramètre ?

C'est le rôle de l'**experiment tracking**.

---

# 16. MLFLOW

MLflow fournit notamment un système de tracking pour les expériences et un Model Registry pour gérer les versions, métadonnées et lignées des modèles.

Conceptuellement :

```text
Training
   ↓
MLflow Run
   ├── parameters
   ├── metrics
   ├── artifacts
   └── model
```

---

# 17. PARAMÈTRES À LOGUER

Exemple :

```text
learning_rate
batch_size
epochs
optimizer
model_type
dataset_version
```

---

# 18. MÉTRIQUES À LOGUER

Exemple :

```text
accuracy
precision
recall
f1
roc_auc
loss
latency
```

---

# 19. ARTIFACTS

Tu peux également enregistrer :

```text
model
confusion matrix
plots
tokenizer
configuration
evaluation report
```

Donc :

```text
MLflow Run
 ├── params
 ├── metrics
 ├── model
 └── artifacts
```

---

# 20. MODEL REGISTRY

Le Model Registry permet de gérer les modèles et leurs versions, avec notamment lineage, versioning, tags, métadonnées et alias.

Architecture :

```text
Training Run
    ↓
Model
    ↓
Registry
 ├── v1
 ├── v2
 └── v3
```

Tu peux ensuite définir :

```text
champion
challenger
```

ou une logique équivalente selon ton workflow.

---

# 21. MODEL LINEAGE

Question d'entretien :

> D'où vient le modèle actuellement en production ?

Tu dois pouvoir répondre :

```text
Production Model
 ↓
Version 7
 ↓
MLflow Run 184
 ↓
Dataset v3
 ↓
Parameters
 ↓
Code commit
```

C'est cela la traçabilité.

---

# 22. REPRODUCTIBILITY

Ton entraînement doit idéalement être reproductible.

Conserve :

```text
code version
dataset version
parameters
model version
dependencies
environment
```

Donc :

```text
Model
=
Code
+
Data
+
Parameters
+
Environment
```

---

# 23. BLOC 3 — CI

CI = Continuous Integration.

GitHub Actions permet de déclencher automatiquement des workflows à partir d'événements comme les pushes ou pull requests et d'y exécuter build, tests, linters et autres contrôles.

Pipeline :

```text
Developer
   ↓
git push
   ↓
GitHub
   ↓
CI
   ├── lint
   ├── test
   ├── security
   └── build
```

---

# 24. PREMIER WORKFLOW CI

Exemple conceptuel :

```yaml
name: CI

on:
  push:
  pull_request:

jobs:

  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install Python
        uses: actions/setup-python@v5

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest
```

---

# 25. POURQUOI CI ?

Supposons que tu modifies :

```text
prediction_service.py
```

et casses :

```text
POST /predict
```

GitHub Actions détecte le problème avant le déploiement.

---

# 26. CI POUR UN PROJET AI

Un bon pipeline peut faire :

```text
Checkout
 ↓
Install dependencies
 ↓
Lint
 ↓
Unit tests
 ↓
API tests
 ↓
Model validation
 ↓
Security scan
 ↓
Docker build
```

---

# 27. CD

CD = Continuous Deployment/Delivery selon le workflow adopté.

Un pipeline CD peut faire :

```text
Git push
 ↓
Tests
 ↓
Docker build
 ↓
Docker image
 ↓
Registry
 ↓
Deploy
```

GitHub documente le CD comme l'automatisation de publication/déploiement, généralement après build et tests réussis.

---

# 28. PIPELINE COMPLET

```text
                    Git Push
                       │
                       ▼
                      CI
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
      Tests          Lint         Security
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 Docker Build
                       │
                       ▼
                Container Registry
                       │
                       ▼
                     CD
                       │
                       ▼
                 Cloud Deployment
```

---

# 29. ENVIRONMENTS

Ne déploie pas immédiatement en production.

Utilise :

```text
dev
 ↓
staging
 ↓
production
```

GitHub Actions permet notamment de définir des environments et des règles de protection autour des déploiements.

---

# 30. PROMOTION

Architecture :

```text
Model v7
   ↓
Validation
   ↓
Staging
   ↓
Tests
   ↓
Approval
   ↓
Production
```

---

# 31. BLOC 4 — CONTAINER REGISTRY

Le registry stocke tes images Docker.

Conceptuellement :

```text
Docker build
      ↓
Image
      ↓
Registry
      ↓
Cloud / Kubernetes
```

Par exemple :

```text
myregistry.io/molecule-api:1.2.0
```

---

# 32. TAGGING

Mauvais :

```text
latest
```

uniquement.

Meilleur :

```text
1.0.0
1.1.0
1.2.0
```

ou :

```text
git-abc123
```

Tu dois pouvoir identifier précisément quelle version tourne.

---

# 33. BLOC 5 — CLOUD

Pour ton parcours, je recommande :

# Azure comme cloud principal

Tu as déjà une exposition à Azure, donc il est plus rentable pour toi de transformer cette connaissance en compétence réelle plutôt que de recommencer trois clouds simultanément.

---

# 34. LES SERVICES AZURE À APPRENDRE

Je recommande :

```text
Azure Container Registry
Azure Container Apps
Azure Storage
Azure Database for PostgreSQL
Azure Key Vault
Azure Monitor
Application Insights
```

Puis plus tard :

```text
AKS
Azure OpenAI
Azure AI Search
```

Azure Container Apps permet actuellement d'exécuter des applications conteneurisées avec gestion du scaling, des secrets, des microservices et du monitoring sans gérer directement toute l'infrastructure d'orchestration.

---

# 35. PREMIÈRE ARCHITECTURE CLOUD

Commence simplement :

```text
                    Internet
                       │
                       ▼
                Azure Container Apps
                       │
                       ▼
                    FastAPI
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
           Postgres  Qdrant    LLM API
```

Tu n'as pas besoin de Kubernetes immédiatement.

---

# 36. CONTAINER REGISTRY AZURE

Architecture :

```text
GitHub
  ↓
GitHub Actions
  ↓
Docker build
  ↓
Azure Container Registry
  ↓
Azure Container Apps
```

---

# 37. SECRETS

Ton application cloud peut nécessiter :

```text
LLM_API_KEY
DATABASE_URL
QDRANT_URL
```

Ne mets pas ces valeurs dans :

```text
Git
Dockerfile
README
source code
```

Utilise le mécanisme de secrets/configuration du cloud.

Azure Monitor collecte notamment métriques et logs des ressources Azure et fournit des capacités d'analyse et d'alerting.

---

# 38. BLOC 6 — KUBERNETES

Kubernetes arrive après Docker et cloud basics.

Kubernetes est une plateforme d'orchestration de workloads conteneurisés qui fournit notamment déploiement, scaling, service discovery, load balancing et rollouts/rollbacks.

Tu dois comprendre :

```text
Cluster
Node
Pod
Deployment
Service
ConfigMap
Secret
Ingress / Gateway
Namespace
```

---

# 39. POD

Un Pod est une unité d'exécution Kubernetes contenant un ou plusieurs conteneurs.

Conceptuellement :

```text
Pod
 └── Container
```

---

# 40. DEPLOYMENT

Le Deployment décrit l'état souhaité de ton application et permet notamment de gérer plusieurs replicas et les mises à jour.

Exemple conceptuel :

```text
Deployment
    │
    ├── Pod 1
    ├── Pod 2
    └── Pod 3
```

---

# 41. REPLICAS

Si :

```text
replicas: 3
```

tu demandes trois pods correspondant au workload.

Architecture :

```text
              Traffic
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
      Pod 1    Pod 2    Pod 3
```

---

# 42. SERVICE

Le Service fournit un point d'accès stable vers les Pods.

Architecture :

```text
Client
  ↓
Service
  ↓
Pods
```

Kubernetes utilise également les Services pour le discovery et l'exposition stable d'une application derrière un endpoint.

---

# 43. INGRESS / GATEWAY

Pour exposer ton application :

```text
Internet
 ↓
Ingress / Gateway
 ↓
Service
 ↓
Pods
```

Tu n'as pas besoin d'aller très profondément dans le Gateway API au début.

---

# 44. HORIZONTAL SCALING

Exemple :

```text
Traffic ↑
    ↓
Pods:
2 → 3 → 5 → 8
```

Tu dois comprendre le principe de l'auto-scaling.

---

# 45. HEALTH CHECKS

Kubernetes peut vérifier si ton application fonctionne.

Tu devras connaître :

```text
liveness
readiness
startup
```

Exemple :

```text
/service/health
```

Architecture :

```text
Kubernetes
    ↓
Health Check
    ↓
Application healthy?
```

---

# 46. ROLLING UPDATE

Supposons :

```text
v1
```

vers :

```text
v2
```

Le système peut progressivement remplacer les anciennes instances.

```text
v1 v1 v1

      ↓

v2 v1 v1

      ↓

v2 v2 v1

      ↓

v2 v2 v2
```

---

# 47. ROLLBACK

Si v2 est mauvaise :

```text
v2
 ↓
Problem
 ↓
Rollback
 ↓
v1
```

C'est l'un des avantages importants de l'orchestration. Kubernetes documente les mécanismes de rollout et rollback pour les Deployments.

---

# 48. BLOC 7 — OBSERVABILITY

Un service qui fonctionne mais que tu ne peux pas observer est un système difficile à exploiter.

Tu dois comprendre :

```text
Logs
Metrics
Traces
```

OpenTelemetry standardise précisément la collecte, le traitement et l'export de signaux d'observabilité tels que traces, métriques et logs.

---

# 49. LOGS

Exemple :

```text
INFO prediction_started
INFO model_loaded
INFO prediction_completed
ERROR database_timeout
```

---

# 50. METRICS

Une métrique est une mesure numérique.

Exemples :

```text
request_count
request_latency
error_count
cpu_usage
memory_usage
active_connections
```

Prometheus est un système de monitoring et d'alerting qui collecte notamment des métriques sous forme de séries temporelles et permet de les interroger avec PromQL.

---

# 51. TRACES

Une trace suit une requête à travers plusieurs composants.

Exemple :

```text
Request
 ↓
FastAPI
 ↓
Agent
 ↓
RAG
 ↓
Qdrant
 ↓
LLM
 ↓
Response
```

Tu peux alors voir où le temps a été passé.

---

# 52. LES TROIS PILIERS

Retenir :

```text
             OBSERVABILITY
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
       Logs     Metrics   Traces
```

OpenTelemetry prend en charge ces trois catégories comme signaux fondamentaux.

---

# 53. PROMETHEUS + GRAFANA

Architecture :

```text
Application
    │
    ▼
 Metrics
    │
    ▼
Prometheus
    │
    ▼
Grafana
```

Grafana permet notamment de créer des dashboards et de connecter des sources comme Prometheus afin de visualiser les métriques et faciliter le troubleshooting.

---

# 54. DASHBOARD AI ENGINEER

Ton dashboard peut afficher :

```text
Requests / minute
Error rate
p50 latency
p95 latency
p99 latency
CPU
Memory
Prediction count
Model version
```

---

# 55. P50 / P95 / P99

Très important.

Supposons :

```text
p50 = 100 ms
p95 = 300 ms
p99 = 900 ms
```

Cela signifie approximativement :

```text
50 % des requêtes < 100 ms
95 % < 300 ms
99 % < 900 ms
```

Le p95/p99 est souvent plus révélateur pour les utilisateurs qui subissent les requêtes les plus lentes.

---

# 56. ALERTING

Exemple :

```text
IF error_rate > 5%
THEN ALERT
```

Ou :

```text
IF p95_latency > 2 seconds
THEN ALERT
```

---

# 57. BLOC 8 — ML MONITORING

Il y a une différence entre :

```text
Application Monitoring
```

et :

```text
ML Monitoring
```

---

# 58. APPLICATION MONITORING

Tu surveilles :

```text
CPU
Memory
Requests
Errors
Latency
Availability
```

---

# 59. MODEL MONITORING

Tu surveilles :

```text
Prediction distribution
Input distribution
Confidence
Data drift
Concept drift
Model performance
```

---

# 60. DATA DRIFT

Supposons :

Training :

```text
Age:
mean = 40
```

Production :

```text
Age:
mean = 58
```

La distribution a changé.

Conceptuellement :

```text
P_train(X) ≠ P_prod(X)
```

C'est un signal de data drift.

---

# 61. CONCEPT DRIFT

Le monde peut changer :

```text
P(Y|X)
```

évolue.

Par exemple :

```text
Fraud patterns
Customer behavior
Market behavior
```

Le modèle peut devenir moins performant même si les données semblent similaires.

---

# 62. MODEL PERFORMANCE MONITORING

Si tu possèdes les labels en production :

```text
Prediction
+
Ground Truth
```

tu peux recalculer :

```text
Precision
Recall
F1
Accuracy
```

Mais parfois les labels arrivent des jours/semaines plus tard.

Tu dois donc aussi surveiller des métriques proxy.

---

# 63. BLOC 9 — LLMOPS

Maintenant on applique les mêmes principes aux applications LLM.

Le pipeline :

```text
Prompt
 ↓
Retrieval
 ↓
LLM
 ↓
Answer
```

doit être :

```text
Versioned
Evaluated
Monitored
Cost-controlled
Traceable
```

---

# 64. CE QU'IL FAUT MONITORER POUR UN LLM

```text
Input tokens
Output tokens
Latency
Cost
Model
Prompt version
Response quality
Errors
Tool calls
```

---

# 65. MONITORING RAG

Pour ton RAG :

```text
Retriever
 ↓
Top-K
 ↓
Reranker
 ↓
LLM
```

tu peux monitorer :

```text
retrieval latency
number of chunks
retrieval score
citation coverage
faithfulness
answer relevance
```

---

# 66. MONITORING AGENT

Pour ton agent :

```text
LLM calls
Tool calls
Tool failures
Number of steps
Handoffs
Human approvals
Execution time
Cost
Task success
```

---

# 67. TRACE D'UN AGENT

Un run peut ressembler à :

```text
TRACE
│
├── Agent start
│
├── LLM call
│
├── Tool: get_availability
│
├── Tool result
│
├── LLM call
│
├── Human approval
│
├── Tool: book_appointment
│
├── Tool result
│
└── Final answer
```

Le but est de savoir exactement ce qui s'est passé.

---

# 68. PROMPT VERSIONING

Ne change pas silencieusement un prompt en production.

Utilise :

```text
prompt_v1
prompt_v2
prompt_v3
```

et conserve :

```text
model
prompt version
retrieval version
evaluation result
```

---

# 69. EVALUATION REGRESSION

Supposons :

```text
RAG v1
Faithfulness = 91%
```

Tu modifies le prompt :

```text
RAG v2
Faithfulness = 84%
```

La nouvelle version doit être rejetée.

Donc :

```text
Code change
 ↓
Evaluation suite
 ↓
Regression detected
 ↓
Deployment blocked
```

---

# 70. LLM GATE

Un pipeline peut avoir :

```text
Build
 ↓
Unit tests
 ↓
RAG evaluation
 ↓
Agent evaluation
 ↓
Quality threshold
 ↓
Deploy
```

Exemple :

```text
faithfulness >= 0.90
task success >= 0.95
```

Les seuils réels dépendent de ton cas d'usage.

---

# 71. COST ENGINEERING

Un système LLM professionnel doit suivre :

```text
cost/request
cost/user
cost/day
cost/model
```

Tu peux avoir :

```text
Fast model
```

pour des tâches simples :

```text
classification
routing
extraction
```

et :

```text
larger model
```

pour des tâches difficiles.

---

# 72. FALLBACK

Si :

```text
Primary LLM
```

est indisponible :

```text
Primary
   ↓
Failure
   ↓
Fallback model
```

Mais attention aux différences de comportement, de coût et de format.

---

# 73. RETRIES

Pour une erreur temporaire :

```text
request
 ↓
timeout
 ↓
retry
```

Mais il faut éviter de répéter indéfiniment.

Utilise :

```text
max retries
backoff
timeout
```

---

# 74. RATE LIMITING

Si tu as :

```text
1000 users
```

ils peuvent tous envoyer des requêtes en même temps.

Il faut limiter :

```text
requests/user
requests/minute
concurrent calls
```

---

# 75. CACHING

Certaines requêtes peuvent être répétitives.

Architecture :

```text
Request
 ↓
Cache?
 ├── Yes → return
 └── No
       ↓
      LLM
```

Cela peut réduire :

```text
latency
cost
load
```

---

# 76. ASYNCHRONOUS JOBS

Certaines tâches sont longues :

```text
PDF ingestion
embedding 100k documents
model training
batch evaluation
```

Ne bloque pas inutilement une requête HTTP.

Architecture :

```text
FastAPI
 ↓
Job Queue
 ↓
Worker
 ↓
Long task
```

Tu découvriras ensuite :

```text
Celery
RQ
Kafka
RabbitMQ
```

Mais n'apprends pas les cinq en même temps.

---

# 77. ARCHITECTURE DE PRODUCTION

À la fin de cette phase, tu dois comprendre quelque chose comme :

```text
                         INTERNET
                            │
                            ▼
                     Load Balancer
                            │
                            ▼
                       API Gateway
                            │
                            ▼
                    ┌───────────────┐
                    │   FastAPI     │
                    │   AI Service  │
                    └───────┬───────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          PostgreSQL      Qdrant        LLM API
             │              │              │
             └──────────────┼──────────────┘
                            │
                         Logging
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
               Prometheus        OpenTelemetry
                   │                 │
                   ▼                 ▼
                Grafana          Trace Backend
```

---

# 78. VERSION KUBERNETES

Après maîtrise du modèle précédent :

```text
                    Kubernetes Cluster
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      API Pods         Worker Pods       Agent Pods
          │
          ▼
       Service
          │
          ▼
       Database
```

---

# 79. PROJET PRINCIPAL DE LA PHASE 5

# ⭐ Production AI Platform

Je te recommande de reprendre ton projet **Molecule Classification MLOps** plutôt que de recommencer un nouveau projet sans rapport. Cela permet de transformer ton projet existant en démonstration professionnelle.

---

# 80. ARCHITECTURE DU PROJET

```text
                        GitHub
                          │
                          ▼
                     Git Push
                          │
                          ▼
                   GitHub Actions
                          │
               ┌──────────┼──────────┐
               ▼          ▼          ▼
             Tests      Lint      Security
               │          │          │
               └──────────┼──────────┘
                          ▼
                     Docker Build
                          │
                          ▼
                Container Registry
                          │
                          ▼
                    Cloud Deploy
                          │
                          ▼
                   Production API
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          PostgreSQL    MLflow       Model
              │                       │
              └───────────┬───────────┘
                          ▼
                    Monitoring
                          │
                  ┌───────┴────────┐
                  ▼                ▼
              Prometheus         Grafana
```

---

# 81. PIPELINE ML

Ton pipeline d'entraînement :

```text
Raw Data
   ↓
Validation
   ↓
Preprocessing
   ↓
Training
   ↓
Evaluation
   ↓
MLflow
   ↓
Model Registry
   ↓
Approval
   ↓
Deployment
```

---

# 82. MODEL GATE

Avant d'accepter un modèle :

```text
F1 >= threshold
AND
Recall >= threshold
AND
No critical regression
```

Puis :

```text
PASS
 ↓
Registry
 ↓
Deploy
```

Sinon :

```text
FAIL
 ↓
Don't deploy
```

---

# 83. API

Ton API :

```text
POST /predict
GET /health
GET /model-info
GET /metrics
```

mais maintenant :

```text
/model-info
```

doit retourner :

```json
{
  "name": "MoleculeClassifier",
  "version": "7",
  "environment": "production"
}
```

---

# 84. MONITORING DU PROJET

Dashboard :

```text
Requests
Predictions
Error Rate
Latency p50
Latency p95
Latency p99
CPU
Memory
Model Version
Prediction Distribution
```

---

# 85. ALERTS

Par exemple :

```text
Error rate > 3%
        ↓
ALERT
```

```text
P95 latency > 2 sec
        ↓
ALERT
```

```text
Model performance < threshold
        ↓
ALERT
```

---

# 86. CI/CD DU PROJET

```text
Pull Request
     ↓
Tests
     ↓
Review
     ↓
Merge
     ↓
Docker Build
     ↓
Push Registry
     ↓
Deploy Staging
     ↓
Evaluation
     ↓
Approval
     ↓
Production
```

---

# 87. VERSION AVANCÉE — MACHINE LEARNING

Ajoute :

```text
Data version
Model version
Experiment version
Docker version
API version
```

Exemple :

```text
Data: v3
Model: v7
API: v2.1
Image: 2.1.0
```

Tu peux alors retracer l'ensemble du système.

---

# 88. VERSION LLMOPS

Sur ton **AI Research Assistant** de Phase 3 :

```text
Documents
 ↓
Embedding pipeline
 ↓
Qdrant
 ↓
Retriever
 ↓
Reranker
 ↓
LLM
```

Ajoute :

```text
Prompt version
Embedding version
RAG evaluation
Token usage
Cost
Latency
Trace
```

---

# 89. TON PROJET FINAL PHASE 5

Je te conseille finalement d'avoir **deux systèmes liés** :

## Projet A

### Production ML Platform

```text
Molecule Classification
+
MLflow
+
Docker
+
CI/CD
+
Cloud
+
Monitoring
```

## Projet B

### Production RAG/Agent Platform

```text
AI Research Assistant
+
RAG
+
Qdrant
+
LLM
+
Evaluation
+
Tracing
+
Cost monitoring
+
CI/CD
+
Cloud
```

Cela couvre pratiquement toute la chaîne AI Engineer moderne.

---

# 90. TECHNOLOGIES À APPRENDRE

## Niveau obligatoire

```text
Docker
Docker Compose
GitHub Actions
MLflow
Azure
Linux
Logging
Metrics
```

## Niveau important

```text
Prometheus
Grafana
OpenTelemetry
Azure Monitor
Container Registry
PostgreSQL
```

## Niveau avancé

```text
Kubernetes
Helm
Horizontal scaling
Ingress / Gateway
Secrets
Rolling deployment
```

## LLMOps

```text
LLM evaluation
Prompt versioning
Token monitoring
Cost tracking
Agent tracing
RAG monitoring
Regression evaluation
```

---

# 91. ORDRE EXACT D'APPRENTISSAGE

Ne commence pas Kubernetes immédiatement.

Suis cet ordre :

```text
1. Docker
      ↓
2. Docker Compose
      ↓
3. MLflow Tracking
      ↓
4. MLflow Model Registry
      ↓
5. GitHub Actions CI
      ↓
6. GitHub Actions CD
      ↓
7. Container Registry
      ↓
8. Azure Container Apps
      ↓
9. Azure Monitor
      ↓
10. Prometheus
      ↓
11. Grafana
      ↓
12. OpenTelemetry
      ↓
13. ML Monitoring
      ↓
14. LLMOps
      ↓
15. Kubernetes
      ↓
16. Production architecture
```

---

# 92. PLANNING SUR 10 SEMAINES

## Semaine 1

```text
Docker
Images
Containers
Dockerfile
```

Projet :

```text
Containerize FastAPI
```

---

## Semaine 2

```text
Docker Compose
Networks
Volumes
Environment variables
```

Projet :

```text
FastAPI
+
PostgreSQL
+
Qdrant
```

---

## Semaine 3

```text
MLflow
Tracking
Parameters
Metrics
Artifacts
```

Projet :

```text
Track Molecule Training
```

---

## Semaine 4

```text
Model Registry
Versioning
Lineage
Promotion
```

Projet :

```text
Molecule Model Registry
```

---

## Semaine 5

```text
GitHub Actions
CI
Testing
Lint
Build
```

Projet :

```text
Automatic CI pipeline
```

GitHub Actions est précisément conçu pour automatiser build, tests et déploiements au sein du cycle logiciel.

---

## Semaine 6

```text
CD
Docker Registry
Azure
Deployment
```

Projet :

```text
Automatic deployment
```

---

## Semaine 7

```text
Monitoring
Prometheus
Grafana
```

Projet :

```text
AI API Dashboard
```

---

## Semaine 8

```text
OpenTelemetry
Tracing
Error analysis
Performance
```

Projet :

```text
Distributed trace
```

---

## Semaine 9

```text
ML Monitoring
LLMOps
Cost monitoring
Regression evaluation
```

---

## Semaine 10

```text
Kubernetes
Deployment
Service
Scaling
Rollback
```

Projet final :

```text
Production AI Platform
```

---

# 93. KUBERNETES : CE QUE TU DOIS SAVOIR, PAS PLUS

Pour ton niveau, tu n'as pas besoin de devenir Kubernetes Administrator.

Tu dois être capable de comprendre :

```text
Cluster
 ↓
Node
 ↓
Pod
 ↓
Deployment
 ↓
Service
```

et :

```text
ConfigMap
Secret
Replica
Scaling
Health checks
Rolling update
Rollback
```

Kubernetes fournit notamment service discovery, load balancing, déploiements, scaling et rollouts/rollbacks ; c'est cette couche d'orchestration qu'il faut comprendre pour ton objectif AI Engineer.

---

# 94. CE QUE TU DOIS SAVOIR EXPLIQUER EN ENTRETIEN

### Pourquoi Docker ?

Pour rendre l'environnement de l'application reproductible et isolé.

### Image vs container ?

L'image est le template ; le container est l'instance exécutable.

### Pourquoi Docker Compose ?

Pour orchestrer facilement plusieurs services localement.

### Pourquoi MLflow ?

Pour suivre les expériences et gérer les modèles/versions de manière traçable.

### Pourquoi Model Registry ?

Pour gérer les versions, lineage et cycle de vie des modèles.

### CI vs CD ?

CI vérifie automatiquement les changements ; CD automatise la publication/déploiement.

### Pourquoi Kubernetes ?

Pour orchestrer des workloads conteneurisés, gérer scaling, discovery, déploiements et résilience.

### Logs vs metrics vs traces ?

```text
Logs
→ événements

Metrics
→ mesures numériques

Traces
→ parcours d'une requête
```

OpenTelemetry formalise précisément ces signaux d'observabilité.

### Prometheus vs Grafana ?

```text
Prometheus
→ collecte/interroge les métriques

Grafana
→ visualise et construit les dashboards
```

---

# 95. QUESTIONS ML OPS

Tu dois pouvoir répondre à :

> Comment reproduire un modèle en production ?

> Comment savoir quelle version du modèle tourne ?

> Comment empêcher un mauvais modèle d'être déployé ?

> Comment revenir à la version précédente ?

> Comment surveiller la dérive des données ?

> Comment détecter une dégradation du modèle ?

> Comment automatiser le retraining ?

---

# 96. QUESTIONS LLMOPS

Tu dois pouvoir répondre à :

> Comment évaluer un RAG avant déploiement ?

> Comment versionner un prompt ?

> Comment mesurer le coût d'un agent ?

> Comment détecter qu'un nouvel agent fait plus d'appels inutiles ?

> Comment tracer une requête LLM ?

> Comment détecter une régression de faithfulness ?

> Comment contrôler les erreurs d'outils ?

> Comment gérer les timeouts et retries ?

---

# 97. ARCHITECTURE CIBLE FIN PHASE 5

```text
                         USER
                           │
                           ▼
                    Load Balancer
                           │
                           ▼
                       API Gateway
                           │
                           ▼
                    AI Application
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
             ML           RAG         Agent
              │            │            │
              ▼            ▼            ▼
           Model        Qdrant        Tools
              │            │            │
              └────────────┼────────────┘
                           ▼
                          Data
                           │
                           ▼
                       PostgreSQL

                    ┌──────────────┐
                    │   MLflow     │
                    └──────┬───────┘
                           │
                    Model Registry

                    ┌──────────────┐
                    │ Observability│
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
            Logs         Metrics        Traces
             │             │             │
             ▼             ▼             ▼
        OpenTelemetry  Prometheus     OTel backend
                           │
                           ▼
                        Grafana
```

---

# 98. RÈGLE D'OR DE LA PHASE 5

Ne pense plus :

> « Mon modèle fonctionne. »

Pense :

> « Mon système fonctionne, je peux prouver quelle version tourne, je peux détecter quand il tombe, comprendre pourquoi il est lent, mesurer sa qualité, et revenir à une version précédente. »

C'est cela la mentalité **Production AI Engineer**.

---

# 99. TON NIVEAU AVANT / APRÈS

## Avant Phase 5

```text
AI Developer
│
├── ML
├── Deep Learning
├── NLP
├── LLM
├── RAG
└── Agents
```

## Après Phase 5

```text
AI Engineer
│
├── ML
├── Deep Learning
├── NLP
├── LLM
├── RAG
├── Agents
│
├── Software Engineering
├── Docker
├── CI/CD
├── MLflow
├── Cloud
├── Kubernetes
├── Monitoring
├── Observability
└── LLMOps
```

---

# 100. CHECKLIST FINALE

## Docker

```text
□ Dockerfile
□ Images
□ Containers
□ Volumes
□ Networks
□ Environment variables
□ Docker Compose
```

## MLOps

```text
□ Experiment tracking
□ MLflow
□ Parameters
□ Metrics
□ Artifacts
□ Model Registry
□ Model lineage
□ Model versioning
```

## CI/CD

```text
□ GitHub Actions
□ CI
□ CD
□ Tests
□ Lint
□ Security checks
□ Docker build
□ Registry push
□ Staging
□ Production
```

## Cloud

```text
□ Azure basics
□ Container Registry
□ Container Apps
□ PostgreSQL
□ Storage
□ Key Vault
□ Azure Monitor
```

## Kubernetes

```text
□ Cluster
□ Node
□ Pod
□ Deployment
□ Service
□ Secret
□ ConfigMap
□ Replica
□ Scaling
□ Health checks
□ Rolling update
□ Rollback
```

## Observability

```text
□ Logs
□ Metrics
□ Traces
□ OpenTelemetry
□ Prometheus
□ Grafana
□ Alerts
```

## ML Monitoring

```text
□ Data drift
□ Concept drift
□ Prediction drift
□ Model performance
□ Feature monitoring
```

## LLMOps

```text
□ Prompt versioning
□ Model versioning
□ Token monitoring
□ Cost tracking
□ RAG evaluation
□ Agent evaluation
□ LLM tracing
□ Regression testing
```

---

# 101. LE PROJET QUI DOIT APPARAÎTRE SUR TON CV

À la fin de cette phase, ton projet peut être présenté comme :

## Production AI/ML Platform

```text
End-to-end ML system covering:

Data validation
→ Model training
→ MLflow experiment tracking
→ Model Registry
→ FastAPI inference
→ Docker
→ GitHub Actions CI/CD
→ Azure deployment
→ Monitoring
→ Observability
→ Model performance monitoring
```

Et pour la partie GenAI :

## Production RAG/Agent Platform

```text
RAG
+
Qdrant
+
LLM
+
LangGraph
+
MCP
+
Evaluation
+
Tracing
+
Cost monitoring
+
CI/CD
+
Cloud
```

Ces deux projets sont beaucoup plus forts sur un CV que dix petits démonstrateurs.

---

# 102. ROADMAP GLOBALE APRÈS LES 5 PHASES

Tu arrives alors à :

```text
                    AI ENGINEER
                         │
       ┌─────────────────┼──────────────────┐
       │                 │                  │
 Software Engineering   AI/ML             GenAI
       │                 │                  │
 Python               PyTorch             LLM
 FastAPI              NLP                 RAG
 SQL                  Transformers        Embeddings
 Git                  CV                  Agents
 Testing              Evaluation          MCP
       │                 │                  │
       └─────────────────┼──────────────────┘
                         │
                     MLOps / LLMOps
                         │
                Docker / CI-CD / MLflow
                Cloud / Kubernetes
                Monitoring / Tracing
                         │
                         ▼
                  PRODUCTION AI
```

À ce stade, ton prochain niveau ne sera plus d'accumuler des frameworks. Il sera de développer **System Design, architecture distribuée, sécurité AI, optimisation des coûts/performance, et spécialisation professionnelle**.
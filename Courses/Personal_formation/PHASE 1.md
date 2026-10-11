# PHASE 1 — SOFTWARE ENGINEERING POUR AI ENGINEER

## Objectif général

L’objectif de cette phase est de passer de :

> « Je sais écrire du code Python et entraîner un modèle »

à :

> « Je sais construire une application IA propre, testable, maintenable et exposée par une API. »

À la fin de cette phase, tu dois savoir construire une architecture comme :

```text
                 CLIENT
                   │
                   ▼
              FastAPI API
                   │
             ┌─────┴─────┐
             │           │
             ▼           ▼
       Validation      Logging
             │
             ▼
       Prediction Service
             │
             ▼
            Model
             │
             ▼
         PostgreSQL
```

Puis :

```text
Code
  ↓
Tests
  ↓
Git
  ↓
Docker
```

Docker et CI/CD seront approfondis dans les phases suivantes ; ici, on prépare les fondations.

---

# 1. PYTHON POUR L'INGÉNIERIE

## 1.1 Pourquoi Python est différent en notebook et en production

Dans un notebook, on peut avoir :

```python
model.fit(X_train, y_train)
prediction = model.predict(X_test)
```

Dans une vraie application, il faut répondre à beaucoup d'autres questions :

- Où se trouve le modèle ?
- Comment charger le modèle ?
- Que se passe-t-il si l'utilisateur envoie une mauvaise donnée ?
- Comment retourner une erreur propre ?
- Comment enregistrer les événements ?
- Comment tester le code ?
- Comment changer de modèle ?
- Comment configurer l'application ?
- Comment séparer la logique métier de l'API ?

C'est précisément ce que nous allons apprendre.

---

# 2. STRUCTURE D'UN PROJET PYTHON PROPRE

Évite progressivement les projets comme :

```text
project/
└── app.py
```

Pour un projet AI Engineer, commence à penser en modules.

Exemple :

```text
ml-api/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   └── prediction_service.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── logging.py
│   │
│   └── ml/
│       ├── __init__.py
│       └── model_loader.py
│
├── tests/
│   ├── test_api.py
│   └── test_prediction.py
│
├── models/
│   └── model.joblib
│
├── requirements.txt
├── .gitignore
├── README.md
└── .env
```

Cette structure n'est pas la seule possible.

Le principe important est :

```text
API ≠ ML ≠ Configuration ≠ Tests
```

Chaque partie doit avoir une responsabilité claire.

---

# 3. ENVIRONNEMENT PYTHON

## 3.1 Environnement virtuel

Ne travaille pas systématiquement dans le Python global.

Création :

```bash
python3 -m venv .venv
```

Activation Linux :

```bash
source .venv/bin/activate
```

Vérification :

```bash
which python
python --version
```

Installation :

```bash
pip install fastapi uvicorn
```

Désinstallation :

```bash
pip uninstall fastapi uvicorn
```

Sauvegarde :

```bash
pip freeze > requirements.txt
```

Installation ultérieure :

```bash
pip install -r requirements.txt
```

## 3.2 Pourquoi ?

Imagine :

```text
Project A
FastAPI version X

Project B
FastAPI version Y
```

Les deux projets peuvent avoir des dépendances différentes.

Le virtual environment évite de mélanger les environnements.

---

# 4. PYTHON AVANCÉ — TYPE HINTS

Un AI Engineer doit écrire un code compréhensible.

Sans type :

```python
def predict(data):
    ...
```

Avec type :

```python
def predict(data: list[float]) -> int:
    ...
```

On comprend immédiatement :

```text
entrée = liste de nombres
sortie = entier
```

## 4.1 Exemple

```python
def add(a: float, b: float) -> float:
    return a + b
```

## 4.2 Structures complexes

```python
from typing import List

def average(values: List[float]) -> float:
    return sum(values) / len(values)
```

Tu rencontreras aussi :

```python
dict[str, float]
list[str]
tuple[int, int]
Optional[str]
```

Avec les versions modernes de Python :

```python
def get_name(user_id: int) -> str | None:
    ...
```

---

# 5. DATACLASSES

Très utiles pour représenter des objets structurés.

```python
from dataclasses import dataclass


@dataclass
class Prediction:
    label: str
    probability: float
```

Utilisation :

```python
result = Prediction(
    label="positive",
    probability=0.93
)

print(result.label)
```

---

# 6. OBJECT-ORIENTED PROGRAMMING

Tu dois être capable de comprendre et écrire des classes.

## 6.1 Classe simple

```python
class ModelLoader:

    def __init__(self, model_path: str):
        self.model_path = model_path

    def load(self):
        print(f"Loading {self.model_path}")
```

Utilisation :

```python
loader = ModelLoader("models/model.joblib")
loader.load()
```

## 6.2 Pourquoi utiliser une classe ?

Pour encapsuler une responsabilité.

Mauvais :

```python
load_model()
predict()
save_prediction()
send_email()
connect_database()
```

tout dans le même fichier.

Meilleur :

```text
ModelLoader
PredictionService
DatabaseService
NotificationService
```

Chaque composant possède une responsabilité.

---

# 7. SINGLE RESPONSIBILITY PRINCIPLE

Une fonction ou classe doit avoir une responsabilité claire.

Mauvais :

```python
def process_request(data):
    validate(data)
    load_model()
    predict(data)
    connect_database()
    save_result()
    send_email()
```

Cette fonction fait trop de choses.

Meilleur :

```text
validate_request()
load_model()
predict()
save_result()
send_notification()
```

Puis un service orchestre ces composants.

---

# 8. EXCEPTION HANDLING

Ton application ne doit jamais supposer que tout fonctionne.

Mauvais :

```python
model = load_model("model.joblib")
```

Meilleur :

```python
try:
    model = load_model("model.joblib")
except FileNotFoundError:
    print("Model file not found")
```

## 8.1 Types d'erreurs importants

```text
FileNotFoundError
ValueError
TypeError
KeyError
ConnectionError
TimeoutError
```

## 8.2 Exemple

```python
def divide(a: float, b: float) -> float:

    if b == 0:
        raise ValueError("b cannot be zero")

    return a / b
```

---

# 9. LOGGING

`print()` n'est pas suffisant pour une application de production.

Au lieu de :

```python
print("Prediction started")
```

utilise :

```python
import logging

logger = logging.getLogger(__name__)

logger.info("Prediction started")
```

## 9.1 Pourquoi ?

Les logs permettent de comprendre :

```text
Que s'est-il passé ?
Quand ?
Dans quel service ?
Avec quelle erreur ?
```

Exemple :

```python
logger.info("Model loaded successfully")
logger.warning("Input probability is low")
logger.error("Prediction failed")
```

---

# 10. LOGGING STRUCTURÉ

Plus tard, tu rencontreras des logs comme :

```text
2026-10-08 12:00:01 INFO Prediction started
2026-10-08 12:00:01 INFO Model loaded
2026-10-08 12:00:02 INFO Prediction completed
```

On pourra ensuite ajouter :

```text
request_id
user_id
model_version
latency
endpoint
status
```

Exemple conceptuel :

```json
{
  "level": "INFO",
  "event": "prediction_completed",
  "model_version": "1.2.0",
  "latency_ms": 84
}
```

Cette compétence deviendra très importante lorsque tu étudieras l'observabilité.

---

# 11. VARIABLES D'ENVIRONNEMENT

Ne mets pas les informations sensibles directement dans ton code.

Mauvais :

```python
DATABASE_PASSWORD = "123456"
```

Meilleur :

```text
.env
```

avec :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ml_db
```

Et Python :

```python
import os

database_url = os.getenv("DATABASE_URL")
```

Ne jamais envoyer `.env` sur GitHub.

Ajoute :

```text
.env
```

dans `.gitignore`.

---

# 12. PYDANTIC

Pydantic est extrêmement important avec FastAPI.

Il permet de définir et valider les données.

Exemple :

```python
from pydantic import BaseModel


class PredictionRequest(BaseModel):
    age: int
    income: float
```

Une requête valide :

```json
{
    "age": 30,
    "income": 50000
}
```

Mais :

```json
{
    "age": "hello",
    "income": 50000
}
```

sera rejetée.

---

# 13. REST API

Une API permet à une application de communiquer avec ton modèle.

Architecture :

```text
Frontend
   │
   │ HTTP
   ▼
FastAPI
   │
   ▼
Model
   │
   ▼
Prediction
```

Les méthodes HTTP les plus importantes :

```text
GET
POST
PUT
PATCH
DELETE
```

Pour une prédiction ML, `POST` est généralement adapté.

---

# 14. FASTAPI

## 14.1 Première API

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI API is running"}
```

Lancement :

```bash
uvicorn app.main:app --reload
```

Puis :

```text
http://127.0.0.1:8000
```

Documentation automatique :

```text
http://127.0.0.1:8000/docs
```

---

# 15. PREMIER ENDPOINT DE PRÉDICTION

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class PredictionRequest(BaseModel):
    feature_1: float
    feature_2: float


@app.post("/predict")
def predict(request: PredictionRequest):

    prediction = request.feature_1 + request.feature_2

    return {
        "prediction": prediction
    }
```

Requête :

```json
{
    "feature_1": 10,
    "feature_2": 20
}
```

Réponse :

```json
{
    "prediction": 30
}
```

Ce n'est encore qu'un exemple pédagogique.

---

# 16. SÉPARER L'API ET LE MODÈLE

Ne mets pas tout dans `main.py`.

Mauvais :

```python
@app.post("/predict")
def predict(...):
    load_model()
    preprocess()
    model.predict()
    save_database()
```

Meilleur :

```text
main.py
   ↓
route
   ↓
PredictionService
   ↓
Model
```

Exemple :

```python
class PredictionService:

    def __init__(self, model):
        self.model = model

    def predict(self, features):
        return self.model.predict([features])
```

L'API appelle le service :

```python
@app.post("/predict")
def predict(request: PredictionRequest):

    result = prediction_service.predict(
        [
            request.feature_1,
            request.feature_2
        ]
    )

    return {
        "prediction": int(result[0])
    }
```

---

# 17. MODEL LOADING

Un modèle entraîné ne doit pas être réentraîné à chaque requête.

Mauvaise architecture :

```text
request
 ↓
train model
 ↓
prediction
```

Architecture correcte :

```text
Application startup
       ↓
Load model
       ↓
Wait for requests
       ↓
Prediction
```

Exemple :

```python
import joblib

model = joblib.load("models/model.joblib")
```

Puis :

```python
prediction = model.predict(data)
```

---

# 18. HEALTH CHECK

Une API de production doit pouvoir répondre :

> Est-ce que le service fonctionne ?

Exemple :

```python
@app.get("/health")
def health():
    return {
        "status": "ok"
    }
```

Plus tard, tu peux avoir :

```json
{
  "status": "ok",
  "model_loaded": true,
  "database": "connected"
}
```

---

# 19. MODEL INFO

Ajoute un endpoint :

```python
@app.get("/model-info")
def model_info():
    return {
        "model_name": "MoleculeClassifier",
        "version": "1.0.0"
    }
```

Cela sera utile pour le debugging et le monitoring.

---

# 20. HTTP STATUS CODES

Tu dois connaître les principaux :

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
422 Validation Error
500 Internal Server Error
503 Service Unavailable
```

Exemple :

```python
from fastapi import HTTPException

if not model_loaded:
    raise HTTPException(
        status_code=503,
        detail="Model unavailable"
    )
```

---

# 21. SQL

Un AI Engineer n'a pas besoin d'être DBA, mais doit être confortable avec SQL.

Tu dois savoir écrire :

```sql
SELECT *
FROM predictions;
```

```sql
SELECT label, COUNT(*)
FROM predictions
GROUP BY label;
```

```sql
SELECT *
FROM predictions
WHERE probability > 0.8;
```

Et comprendre :

```text
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
JOIN
INSERT
UPDATE
DELETE
```

---

# 22. RELATION ENTRE TON API ET LA DATABASE

Exemple :

```text
POST /predict
       ↓
Prediction
       ↓
Database
       ↓
predictions table
```

Table :

```text
predictions
--------------------------------
id
input_value
prediction
probability
model_version
created_at
```

Chaque prédiction peut ainsi être enregistrée.

---

# 23. TESTS

C'est une compétence essentielle que beaucoup de projets étudiants négligent.

Supposons :

```python
def add(a, b):
    return a + b
```

Test :

```python
def test_add():
    assert add(2, 3) == 5
```

Avec pytest :

```bash
pytest
```

---

# 24. TEST UNITAIRES

Un test unitaire vérifie une petite partie du système.

Exemples :

```text
test_preprocessing()
test_prediction()
test_validation()
test_database()
```

Le principe :

```text
Fonction
  ↓
Input connu
  ↓
Output attendu
```

---

# 25. TEST API AVEC FASTAPI

Tu dois aussi tester les endpoints.

Conceptuellement :

```text
POST /predict
       ↓
Response
       ↓
status_code == 200
```

Puis :

```python
assert response.status_code == 200
```

Et :

```python
assert "prediction" in response.json()
```

---

# 26. TESTS DE CAS D'ERREUR

Ne teste pas seulement les cas parfaits.

Exemples :

```text
valeur manquante
mauvais type
valeur négative
feature absente
modèle absent
database indisponible
```

Un bon AI Engineer pense :

> « Comment mon système va casser ? »

et pas seulement :

> « Comment faire fonctionner le cas normal ? »

---

# 27. GIT

Tu dois maintenant utiliser Git comme un ingénieur.

Initialisation :

```bash
git init
```

Vérification :

```bash
git status
```

Ajouter :

```bash
git add .
```

Commit :

```bash
git commit -m "Add prediction endpoint"
```

Branch :

```bash
git checkout -b feature/prediction-api
```

Fusion :

```bash
git checkout main
git merge feature/prediction-api
```

---

# 28. COMMITS PROPRES

Évite :

```text
update
final
final2
new
test
aaa
```

Préfère :

```text
feat: add prediction endpoint
fix: handle missing model file
test: add prediction unit tests
refactor: separate prediction service
docs: update API documentation
```

---

# 29. .GITIGNORE

Exemple :

```gitignore
.venv/
__pycache__/
.env
*.pyc
.ipynb_checkpoints/
.pytest_cache/
```

Attention également aux fichiers modèles volumineux : leur gestion devra être réfléchie séparément.

---

# 30. README

Un vrai projet GitHub doit expliquer :

```text
1. Problem
2. Architecture
3. Dataset
4. Model
5. API
6. Installation
7. Usage
8. Testing
9. Project structure
10. Future improvements
```

Exemple :

```text
# Molecule Classification API

## Overview

This project exposes a machine learning model
through a REST API.

## Architecture

Client
 ↓
FastAPI
 ↓
Prediction Service
 ↓
ML Model
 ↓
PostgreSQL
```

---

# 31. CLEAN CODE

Principes importants :

## Nomme correctement les variables

Mauvais :

```python
x = 10
y = 20
```

Meilleur :

```python
age = 10
income = 20
```

## Fonctions courtes

Mauvais :

```python
def process_everything():
    ...
```

Meilleur :

```python
def validate_input():
    ...

def preprocess_data():
    ...

def predict():
    ...

def save_prediction():
    ...
```

## Éviter le code dupliqué

Mauvais :

```python
def predict_a():
    preprocess_a()
    ...

def predict_b():
    preprocess_a()
    ...
```

Extraire la logique commune.

---

# 32. ARCHITECTURE RECOMMANDÉE POUR TON PROJET

Nous allons construire :

```text
ml-api/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   └── routes.py
│   │
│   ├── schemas/
│   │   └── prediction.py
│   │
│   ├── services/
│   │   └── prediction_service.py
│   │
│   ├── ml/
│   │   ├── model_loader.py
│   │   └── predictor.py
│   │
│   ├── db/
│   │   └── database.py
│   │
│   └── core/
│       ├── config.py
│       └── logging.py
│
├── tests/
│   ├── test_prediction.py
│   └── test_api.py
│
├── models/
│   └── model.joblib
│
├── requirements.txt
├── .gitignore
├── README.md
└── .env
```

---

# 33. PROJET FIL ROUGE — MOLECULE CLASSIFICATION API

Nous allons maintenant utiliser ton projet de classification de molécules.

## Objectif

Transformer :

```text
Dataset
   ↓
Model
   ↓
Prediction
```

en :

```text
                  USER
                    │
                    ▼
               REST API
                    │
                    ▼
                FastAPI
                    │
                    ▼
          Request Validation
                    │
                    ▼
          Prediction Service
                    │
                    ▼
                 Model
                    │
             ┌──────┴──────┐
             ▼             ▼
        Prediction      Probability
             │
             ▼
          PostgreSQL
```

---

# 34. ENDPOINTS À CONSTRUIRE

## GET /

```text
/
```

Réponse :

```json
{
  "message": "Molecule Classification API"
}
```

## GET /health

```json
{
  "status": "ok"
}
```

## GET /model-info

```json
{
  "name": "MoleculeClassifier",
  "version": "1.0.0"
}
```

## POST /predict

Entrée :

```json
{
  "feature_1": 0.23,
  "feature_2": 1.21,
  "feature_3": 0.44
}
```

Sortie :

```json
{
  "prediction": 1,
  "probability": 0.94,
  "model_version": "1.0.0"
}
```

## GET /metrics

Plus tard :

```json
{
  "total_predictions": 1200,
  "average_latency_ms": 83
}
```

---

# 35. LES 4 COUCHES DE TON APPLICATION

## Layer 1 — API

Responsabilité :

```text
HTTP
validation
response
status codes
```

## Layer 2 — Service

Responsabilité :

```text
business logic
```

## Layer 3 — ML

Responsabilité :

```text
preprocessing
model loading
prediction
```

## Layer 4 — Database

Responsabilité :

```text
save
retrieve
query
```

Architecture :

```text
API
 ↓
Service
 ↓
ML
 ↓
Database
```

L'API ne doit pas connaître les détails internes du modèle.

---

# 36. EXERCICE 1 — PYTHON

Crée :

```python
class Calculator:
    ...
```

avec :

```text
add()
subtract()
multiply()
divide()
```

Contraintes :

- type hints
    
- gestion division par zéro
    
- docstrings
    
- tests pytest
    

---

# 37. EXERCICE 2 — MODEL SERVICE

Créer :

```python
class PredictionService:
    ...
```

Méthodes :

```text
load_model()
predict()
```

Contraintes :

- logging
    
- exception handling
    
- type hints
    

---

# 38. EXERCICE 3 — FASTAPI

Créer :

```text
GET /
GET /health
GET /model-info
POST /predict
```

Utiliser Pydantic pour les entrées.

---

# 39. EXERCICE 4 — TESTING

Créer au minimum :

```text
5 tests unitaires
5 tests API
```

Exemples :

```text
valid input
invalid input
empty input
model prediction
health endpoint
```

---

# 40. EXERCICE 5 — DATABASE

Créer une table :

```text
predictions
```

et enregistrer :

```text
prediction
probability
model_version
timestamp
```

---

# 41. CRITÈRES DE FIN DE PHASE 1

Ne passe pas à la phase suivante simplement parce que tu as regardé les cours.

Tu dois être capable de faire cela sans tutoriel :

```text
Créer environnement Python
        ↓
Créer projet structuré
        ↓
Charger modèle
        ↓
Créer service de prédiction
        ↓
Créer API FastAPI
        ↓
Valider requêtes avec Pydantic
        ↓
Gérer erreurs
        ↓
Ajouter logging
        ↓
Écrire tests
        ↓
Connecter PostgreSQL
        ↓
Versionner avec Git
```

---

# 42. CHECKLIST

## Python

```text
□ Type hints
□ Dataclasses
□ Classes
□ OOP
□ Exceptions
□ Logging
□ Environment variables
□ Modules/packages
```

## FastAPI

```text
□ Routes
□ GET
□ POST
□ Pydantic
□ Validation
□ HTTP status codes
□ Error handling
□ Swagger
```

## Database

```text
□ SQL
□ PostgreSQL
□ CRUD
□ INSERT
□ SELECT
□ UPDATE
□ JOIN
```

## Testing

```text
□ pytest
□ Unit tests
□ API tests
□ Error tests
```

## Git

```text
□ git init
□ branch
□ commit
□ merge
□ .gitignore
□ README
```

## Architecture

```text
□ Separation of concerns
□ Services
□ API layer
□ ML layer
□ Database layer
```

---

# 43. ORDRE D'APPRENTISSAGE

Ne mélange pas tout.

### Semaine 1

```text
Python avancé
+
OOP
+
typing
+
exceptions
```

### Semaine 2

```text
Architecture
+
logging
+
configuration
+
Git
```

### Semaine 3

```text
REST
+
FastAPI
+
Pydantic
```

### Semaine 4

```text
PostgreSQL
+
pytest
+
Project integration
```

À la fin :

```text
                  PROJECT 1
                      │
          Molecule Classification API
                      │
      ┌───────────────┼────────────────┐
      │               │                │
    Python         FastAPI          PostgreSQL
      │               │                │
      └───────────────┼────────────────┘
                      │
                    pytest
                      │
                     Git
```

---

# 44. CE QUE TU DOIS SAVOIR EXPLIQUER EN ENTRETIEN

Après cette phase, tu dois être capable de répondre naturellement à :

### Pourquoi FastAPI ?

Parce qu'il permet de construire rapidement des APIs Python avec validation des données, documentation automatique et bonne intégration avec les modèles ML.

### Pourquoi séparer API et service ?

Pour respecter la séparation des responsabilités et rendre le code plus testable et maintenable.

### Pourquoi utiliser Pydantic ?

Pour valider et structurer les données reçues par l'API.

### Pourquoi utiliser logging plutôt que print ?

Parce que le logging est conçu pour observer et diagnostiquer une application, notamment avec différents niveaux de gravité et une configuration adaptée à différents environnements.

### Pourquoi utiliser un environnement virtuel ?

Pour isoler les dépendances de chaque projet.

### Pourquoi tester une API ?

Pour vérifier automatiquement que les endpoints fonctionnent et éviter les régressions lorsqu'on modifie le code.

### Pourquoi PostgreSQL ?

Parce qu'une application IA de production doit souvent conserver des données structurées : prédictions, utilisateurs, métadonnées, résultats, événements, etc.

### Pourquoi séparer le modèle de l'API ?

Pour pouvoir remplacer ou mettre à jour le modèle sans réécrire toute la couche HTTP.

---

# 45. RÈGLE D'OR DE LA PHASE 1

À partir de maintenant, pour chaque projet IA, essaie de penser :

```text
MODEL ≠ APPLICATION
```

Un modèle n'est qu'une partie du système.

Le véritable AI Engineer construit :

```text
             DATA
               ↓
             MODEL
               ↓
          APPLICATION
               ↓
             API
               ↓
          DEPLOYMENT
               ↓
          MONITORING
```

La Phase 1 construit les premières briques de cette chaîne.

---

# 46. RÉSULTAT ATTENDU

À la fin de cette phase, ton projet GitHub ne doit plus ressembler à :

```text
notebook.ipynb
model.pkl
dataset.csv
```

mais à quelque chose comme :

```text
molecule-classification-api/
│
├── app/
├── tests/
├── models/
├── requirements.txt
├── .gitignore
├── .env.example
├── README.md
└── Dockerfile        # introduit dans la phase suivante
```

Et quelqu'un qui ouvre ton GitHub doit immédiatement comprendre :

> « Ce candidat sait transformer un modèle ML en application logicielle. »
# ENVIRONNEMENT

Création :

```bash
python3 -m venv .venv
```

Activation Linux :

```bash
source .venv/bin/activate
```

Desactivation Linux :

```bash
deactivate
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

Sauvegarde :

```bash
pip freeze > requirements.txt
```

Installation ultérieure :

```bash
pip install -r requirements.txt
```

# TYPE HINTS

## 1. Basique

```python
variable: Type = value
```

```python
name: str = "Hamza"
age: int = 24
```

Pour une fonction :

```python
def calculate_accuracy(correct: int, total: int) -> float:
    return correct / total
```

## 2. Types
| Type  | Sigification                                                 |
| ----- | ------------------------------------------------------------ |
| str   | String                                                       |
| int   | Integre                                                      |
| float | Floaton                                                      |
| bool  | boolean(0/1)                                                 |
| None  | `-> None `signifie que la fonction ne retourne rien d'utile. |
## 3. Collections

```python
from typing import List, Tuple, Dict, Set, Sequence, Optional, Any, Literal, TypedDict, Annotated
```

### list

```python
numbers: list[int] = [1, 2, 3]
features: list[str] = ["age", "income", "gender"]
```

### dict

```python
person: dict[str, str] = {"name": "Alice", "city": "Paris"}
scores: dict[str, int] = {"math": 95, "physics": 88}
nested: dict[str, list[int]] = {"a": [1, 2], "b": [3, 4]}
```

### tuple

```python
point: tuple[int, int] = (3, 5)
record: tuple[str, int, bool] = ("Alice", 30, True)
variadic: tuple[int, ...] = (1, 2, 3, 4)
```

### set

```python
unique_ids: set[int] = {1, 2, 3}
tags: set[str] = {"python", "typing"}
empty_set: set[int] = set()
```

### Sequence (abstract, read-only)

```python
def process(items: Sequence[int]) -> int:
    return sum(items)

process([1, 2, 3])       # list works
process((1, 2, 3))       # tuple works
# process({1, 2, 3})     # set does NOT work (not ordered/indexable)
```

### Optional

```python
maybe_name: Optional[str] = None          # str | None
```

### Union

```python
identifier: int | str = 42               # int or str
```

### Any

```python
anything: Any = "could be anything"
```

### Literal

```python
# only these exact values allowed
mode: Literal["r", "w", "a"] = "r"
```


### TypeAlias

```python
type Metrics = dict[str, float]

def evaluate(metrics: Metrics) -> float:
    return metrics["accuracy"]
```

### TypedDict

```python
from typing import TypedDict


class Patient(TypedDict):
    age: int
    temperature: float
    has_cough: bool
    
def predict_patient(patient: Patient) -> int:
    ...
```

### ** kwargs

```python
def configure(**kwargs: str) -> None:
    ...
    
configure(
    optimizer="Adam",
    scheduler="Cosine"
)
```

### * args

```python
def calculate_sum(*values: float) -> float:
    return sum(values)
    
calculate_sum(1.0, 2.0, 3.0)
```

### Annotated

```python
age: Annotated[int, "must be >= 18"]
```

### Nested / complex combinations

```python
matrix: list[list[float]] = [[1.0, 2.0], [3.0, 4.0]]
lookup: dict[str, list[tuple[int, str]]] = {
    "a": [(1, "x"), (2, "y")],
    "b": [(3, "z")],
}
```


# DATACLASSES

## 1. Définition
- `@dataclass` simplifie la création des classes destinées à stocker des données.
- Il génère automatiquement certaines méthodes comme `__init__`, `__repr__` et `__eq__`.

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int

s = Student("Hamza", 24)
print(s)
# Student(name='Hamza', age=24)
```

## 2. Valeurs par défaut

```python
@dataclass
class ModelConfig:
    name: str
    epochs: int = 100
    learning_rate: float = 0.001
```

## 3. `field()` et `default_factory`

- `field()` permet de personnaliser un attribut.
- `default_factory` crée une nouvelle valeur pour chaque instance.
- À utiliser pour les listes et dictionnaires mutables.

```python
from dataclasses import dataclass, field

@dataclass
class Experiment:
    losses: list[float] = field(default_factory=list)
```

## 4. `__post_init__()`

- Méthode exécutée automatiquement après le constructeur généré.
- Utile pour les calculs et les validations.

```python
@dataclass
class Training:
    epochs: int

    def __post_init__(self):
        if self.epochs <= 0:
            raise ValueError("epochs must be positive")
```

## 5. `frozen=True`

- Empêche la réaffectation des attributs après la création.
- Utile pour les configurations immuables.
- Ne garantit pas l'immutabilité des objets internes.

```python
@dataclass(frozen=True)
class Config:
    epochs: int
```

## 6. `slots=True`

- Peut réduire la mémoire utilisée par les instances.
- Limite l'ajout d'attributs non déclarés.

```python
@dataclass(slots=True)
class Prediction:
    label: int
    probability: float
```

## 7. `repr=False` et `compare=False`

- `repr=False` : masque un champ dans la représentation générée.
- `compare=False` : exclut un champ des comparaisons générées.

```python
from dataclasses import dataclass, field

@dataclass
class User:
    username: str
    password: str = field(repr=False, compare=False)
```

## 8. `order=True`

- Génère les méthodes de comparaison d'ordre.
- Les champs sont comparés dans leur ordre de déclaration.

```python
@dataclass(order=True)
class Score:
    accuracy: float
    latency: float
```

## 9. `asdict()`

- Convertit récursivement une dataclass en dictionnaire.

```python
from dataclasses import asdict

data = asdict(Config(epochs=100))
print(data)
# {'epochs': 100}
```

# EXCEPTION HANDLING

```python
try:
    # Code à risque
    ...
except ValueError as e:
    # Si une ValueError se produit
    print(e)
except TypeError as e:
    # Si une TypeError se produit
    print(e)
else:
    # Exécuté si aucune exception ne se produit
    ...
finally:
    # Exécuté normalement dans tous les cas
    ...
```

| Exception             | Cause fréquente                                                    |
| --------------------- | ------------------------------------------------------------------ |
| `Exception`           | Classe de base de la plupart des exceptions usuelles               |
| `ValueError`          | Type acceptable, mais valeur invalide                              |
| `TypeError`           | Opération ou argument d'un type incompatible                       |
| `NameError`           | Variable ou nom non défini                                         |
| `UnboundLocalError`   | Variable locale utilisée avant son initialisation                  |
| `IndexError`          | Index de séquence hors limites                                     |
| `KeyError`            | Clé absente d'un dictionnaire                                      |
| `AttributeError`      | Attribut ou méthode inexistant                                     |
| `ZeroDivisionError`   | Division par zéro                                                  |
| `FileNotFoundError`   | Fichier introuvable                                                |
| `FileExistsError`     | Fichier ou répertoire déjà existant                                |
| `PermissionError`     | Permissions insuffisantes                                          |
| `IsADirectoryError`   | Opération sur un fichier effectuée sur un répertoire               |
| `NotADirectoryError`  | Un chemin attendu comme répertoire ne l'est pas                    |
| `ImportError`         | Échec d'un import                                                  |
| `ModuleNotFoundError` | Module introuvable                                                 |
| `AssertionError`      | Une assertion échoue                                               |
| `RuntimeError`        | Erreur d'exécution générique                                       |
| `RecursionError`      | Profondeur maximale de récursion dépassée                          |
| `NotImplementedError` | Fonctionnalité non implémentée                                     |
| `StopIteration`       | Fin d'un itérateur                                                 |
| `OverflowError`       | Résultat numérique trop grand pour une opération donnée            |
| `FloatingPointError`  | Erreur liée aux opérations en virgule flottante, selon le contexte |
| `UnicodeDecodeError`  | Échec du décodage de texte                                         |
| `UnicodeEncodeError`  | Échec de l'encodage de texte                                       |
| `TimeoutError`        | Opération dépassant le délai autorisé                              |
| `ConnectionError`     | Erreur de connexion générique                                      |
| `OSError`             | Erreur liée au système d'exploitation ou aux opérations système    |
| `MemoryError`         | Mémoire insuffisante                                               |
| `KeyboardInterrupt`   | Interruption par l'utilisateur, généralement avec Ctrl+C           |
| `SystemExit`          | Demande de terminaison du programme                                |

# LOGGING

>Le logging permet d’enregistrer les événements d’un programme pour comprendre son fonctionnement, détecter les erreurs et faciliter le débogage.

```python
import logging
```
## Configuration

```python
logging.basicConfig(
    filename="app.log", # Sauvegarder dans un fichier app.log
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
```

```
2026-10-09 14:00:00 - INFO - Application démarrée
2026-10-09 14:00:01 - ERROR - Échec du traitement
```


| Paramètre  | Rôle                              | Choix possibles                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filename` | Fichier de destination            | N'importe quel chemin valide.                                                                                                                                                                                                                                                                                                                                                                     |
| `level`    | Niveau minimum à enregistrer      | `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL` (ou `logging.DEBUG`, etc.)                                                                                                                                                                                                                                                                                                                        |
| `format`   | Format des messages               | `"%(asctime)s - %(levelname)s - ..."`<br>- `%(asctime)s` : Date et heure<br>- `%(levelname)s` : Nom du niveau (`INFO`,…)<br>- `%(message)s` : Message du log<br>- `%(name)s` : Nom du logger<br>- `%(filename)s` : Nom du fichier source<br>- `%(lineno)d` : Numéro de ligne<br>- `%(funcName)s` : Nom de la fonction<br>- `%(process)d` : PID du processus<br>- `%(threadName)s` : Nom du thread |
| `datefmt`  | Format de la date                 | Format `strftime`<br>- `"%Y-%m-%d %H:%M:%S"`<br>- `"%d/%m/%Y"`<br>- `"%H:%M:%S"`                                                                                                                                                                                                                                                                                                                  |
| `filemode` | Mode d'ouverture du fichier.      | - `"a"` (append, défaut)<br>- `"w"` (écrase)<br>- `"x"` (échoue si existe)                                                                                                                                                                                                                                                                                                                        |
| `handlers` | Définit les destinations des logs | Liste de handlers : <br>- `logging.StreamHandler()`<br>- `logging.FileHandler()`<br>- `RotatingFileHandler()`<br>- `TimedRotatingFileHandler()`<br>- `SMTPHandler()`<br>- `SysLogHandler()`<br>- `NullHandler()`                                                                                                                                                                                  |
## Form

```python
logging.debug("Informations de débogage")
logging.info("Programme démarré")
logging.warning("Attention")
logging.error("Une erreur est survenue")
logging.critical("Erreur critique")
```

| Niveau     | Valeur | Utilisation                           |
| ---------- | ------ | ------------------------------------- |
| `DEBUG`    | 10     | Informations détaillées pour déboguer |
| `INFO`     | 20     | Fonctionnement normal du programme    |
| `WARNING`  | 30     | Problème potentiel                    |
| `ERROR`    | 40     | Erreur pendant une opération          |
| `CRITICAL` | 50     | Erreur très grave                     |

> Si le niveau est `INFO`, les messages `DEBUG` ne sont pas affichés.

## Logging avec les exceptions

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    logging.exception("Erreur pendant le calcul")
```

# VARIABLES D'ENVIRONNEMENT

>Ne mets pas les informations sensibles directement dans ton code.

```env
DATABASE_URL = postgresql://user:password@localhost:5432/ml_db
PASSWORD = 1234
```

```python
import os

database_url = os.getenv("DATABASE_URL")
```

| Fonction                      | Rôle                                          |
| ----------------------------- | --------------------------------------------- |
| `os.getenv("KEY")`            | Lire une variable, retourne `None` si absente |
| `os.environ["KEY"]`           | Lire une variable, lève `KeyError` si absente |
| `os.environ["KEY"] = "value"` | Définir ou modifier une variable              |

# PYDANTIC
 
>Une bibliothèque Python qui permet de valider les données, vérifier leurs types et convertir certaines valeurs automatiquement.

Installation :

```
pip install pydantic
```

## 1. Forme générale : `BaseModel`

```python
from pydantic import BaseModel

class User(BaseModel):    
	name: str    
	age: int    
	email: str
	
user = User(name="Hamza", age=24, email="hamza@example.com")
print(user.name)
print(user.age)
```

- `BaseModel` : classe de base pour définir un modèle de données.
- Les annotations (`str`, `int`, etc.) définissent les types attendus.
- Pydantic valide les données lors de la création de l’objet.

## 2. Validation des données `ValidationError`

```python
from pydantic import BaseModel, ValidationError

class Product(BaseModel):
    name: str
    price: float
    quantity: int

try:
    product = Product(
        name="Laptop",
        price=7500,
        quantity="abc"
    )
except ValidationError as e:
    print(e)
```

## 3. Contraintes avec `Field`

```python
from pydantic import BaseModel, Field

class ModelConfig(BaseModel):
    model_name: str
    learning_rate: float = Field(gt=0, le=1)
    epochs: int = Field(ge=1, le=1000)
```

| Paramètre         | Contrainte                           |
| ----------------- | ------------------------------------ |
| `gt`              | Valeur strictement supérieure à `gt` |
| `ge`              | Valeur supérieure ou égale à `ge`    |
| `lt`              | Valeur strictement inférieure à `lt` |
| `le`              | Valeur inférieure ou égale à `le`    |
| `min_length`      | Longueur minimale                    |
| `max_length`      | Longueur maximale                    |
| `pattern`         | Expression régulière                 |
| `alias`           | Nom alternatif                       |
| `description`     | Documentation                        |
| `default`         | Valeur par défaut                    |
| `default_factory` | Générateur de valeur par défaut      |
| `strict`          | Mode strict                          |
## 4. Validation personnalisée avec `field_validator`

>`@field_validator` permet d’ajouter une règle de validation personnalisée sur un champ.

```python
from pydantic import BaseModel, field_validator

class User(BaseModel):
    username: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, value):
        if len(value) < 3:
            raise ValueError("Minimum 3 caractères")
        return value
```

## 5. Convertir un modèle en dictionnaire ou JSON

```python
from pydantic import BaseModel

class Prediction(BaseModel):
    label: str
    confidence: float

prediction = Prediction(label="pneumonia", confidence=0.92)

data = prediction.model_dump()
json_data = prediction.model_dump_json()
```

| Méthode                            | Résultat                             |
| ---------------------------------- | ------------------------------------ |
| `model_dump()`                     | Dictionnaire Python                  |
| `model_dump_json()`                | Chaîne JSON                          |
| `model_validate(data)`             | Valide des données Python existantes |
| `model_validate_json(json_string)` | Valide une chaîne JSON               |

# FASTAPI

>FastAPI est un framework Python permettant de créer des API REST rapidement, avec validation des données, documentation automatique et prise en charge des opérations asynchrones.

## 2. Installation

```
pip install fastapi uvicorn
```

- `fastapi` : framework pour créer l'API.
- `uvicorn` : serveur ASGI qui exécute l'application.

## 3. Première API

Créer `main.py` :

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World"}
```

Lancer le serveur :

```
uvicorn main:app --reload
```

- `main` : nom du fichier Python (`main.py`).
- `app` : objet FastAPI.
- `--reload` : redémarre le serveur lorsque le code change ; pratique en développement.

Ouvrir dans le navigateur :

- `http://127.0.0.1:8000/` — API
- `http://127.0.0.1:8000/docs` — documentation interactive Swagger
- `http://127.0.0.1:8000/redoc` — documentation ReDoc

## 4. Les méthodes HTTP

|Méthode|Utilisation|Exemple|
|---|---|---|
|`GET`|Lire des données|Obtenir les informations d'un modèle|
|`POST`|Envoyer ou créer des données|Demander une prédiction|
|`PUT`|Remplacer une ressource|Remplacer une configuration|
|`PATCH`|Modifier partiellement|Modifier un paramètre|
|`DELETE`|Supprimer une ressource|Supprimer un enregistrement|

## 5. Les routes et paramètres

### A. Paramètre de chemin (Path Parameter)

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):
	return {"user_id": user_id}
```

### B. Paramètre de requête (Query Parameter)

```python
@app.get("/models")
def get_models(limit: int = 10):
	return {"limit": limit}
```

Exemple : `/models?limit=5`

### C. Corps de requête (Request Body) avec Pydantic

```python
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
	age: int = Field(ge=0)
	threshold: float = Field(ge=0, le=1)
	
@app.post("/predict")
def predict(data: PredictionRequest):
	return {
		"age": data.age,
		"threshold": data.threshold
	}
```

Exemple de JSON envoyé :

```
{
  "age": 24,
  "threshold": 0.45
}
```

>**FastAPI** utilise **Pydantic** pour **valider automatiquement** le corps de la requête.

## 6. Les codes HTTP essentiels

| Code  | Signification                           |
| ----- | --------------------------------------- |
| `200` | Requête réussie                         |
| `201` | Ressource créée                         |
| `204` | Succès sans contenu de réponse          |
| `400` | Requête incorrecte                      |
| `401` | Authentification nécessaire ou invalide |
| `403` | Accès interdit                          |
| `404` | Ressource introuvable                   |
| `422` | Données invalides                       |
| `500` | Erreur interne du serveur               |

## 7. Gérer les erreurs avec `HTTPException`

```python
from fastapi import HTTPException

@app.get("/models/{model_id}")
def get_model(model_id: int):
    if model_id != 1:
        raise HTTPException(
            status_code=404,
            detail="Modèle introuvable"
        )

    return {"model_id": model_id}
```

`HTTPException` permet de renvoyer une erreur HTTP avec un code et un message explicite.

# SQL (Structured Query Language)

## 1. Les commandes essentielles

|Commande|Rôle|Catégorie|
|---|---|---|
|`SELECT`|Lire des données|DQL|
|`INSERT`|Ajouter des données|DML|
|`UPDATE`|Modifier des données|DML|
|`DELETE`|Supprimer des données|DML|
|`CREATE`|Créer une table ou une base|DDL|
|`ALTER`|Modifier la structure|DDL|
|`DROP`|Supprimer une table ou une base|DDL|
|`COMMIT`|Valider une transaction|TCL|
|`ROLLBACK`|Annuler une transaction non validée|TCL|

## 2. Lire des données — `SELECT`

```sql
SELECT * FROM users;

SELECT name, age
FROM users;

SELECT *
FROM users
WHERE age >= 18;

SELECT *
FROM users
ORDER BY age DESC
LIMIT 5;
```

|Clause|Rôle|
|---|---|
|`SELECT`|Colonnes à récupérer|
|`FROM`|Table source|
|`WHERE`|Filtrer les lignes|
|`ORDER BY`|Trier les résultats|
|`LIMIT`|Limiter le nombre de résultats|
|`DISTINCT`|Éliminer les doublons|

## 3. Les opérateurs de filtrage

```sql
WHERE age > 20
WHERE age BETWEEN 18 AND 30
WHERE city IN ('Rabat', 'Casablanca')
WHERE name LIKE 'Ham%'
WHERE age IS NULL
WHERE age >= 18 AND city = 'Rabat'
```

|Opérateur|Signification|
|---|---|
|`=`|Égal à|
|`!=` ou `<>`|Différent de|
|`>` / `<`|Supérieur / inférieur|
|`>=` / `<=`|Supérieur ou égal / inférieur ou égal|
|`AND`|Toutes les conditions doivent être vraies|
|`OR`|Au moins une condition vraie|
|`NOT`|Négation|
|`LIKE`|Recherche par motif|
|`IN`|Appartenance à une liste|
|`BETWEEN`|Intervalle inclusif|
|`IS NULL`|Valeur manquante|

>À retenir : `%` représente zéro ou plusieurs caractères ; `_` représente un seul caractère dans `LIKE`.

## 4. Ajouter, modifier et supprimer

```sql
-- Ajouter
INSERT INTO users (name, age)
VALUES ('Hamza', 24);

-- Modifier
UPDATE users
SET age = 25
WHERE name = 'Hamza';

-- Supprimer
DELETE FROM users
WHERE name = 'Hamza';
```

>Attention : sans `WHERE`, `UPDATE` modifie toutes les lignes et `DELETE` supprime toutes les lignes de la table.

## 5. Créer une table

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 0),
    email VARCHAR(255) UNIQUE,
    city VARCHAR(100) DEFAULT 'Rabat'
);
```

| Contrainte    | Rôle                                |
| ------------- | ----------------------------------- |
| `PRIMARY KEY` | Identifiant unique et non nul       |
| `FOREIGN KEY` | Référence une clé d'une autre table |
| `NOT NULL`    | Interdit les valeurs `NULL`         |
| `UNIQUE`      | Interdit les doublons               |
| `CHECK`       | Vérifie une condition               |
| `DEFAULT`     | Valeur utilisée par défaut          |

## 6. Fonctions d'agrégation

```sql
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;
SELECT SUM(salary) FROM employees;
```

|Fonction|Rôle|
|---|---|
|`COUNT(*)`|Nombre de lignes|
|`COUNT(column)`|Nombre de valeurs non nulles|
|`SUM()`|Somme|
|`AVG()`|Moyenne|
|`MIN()`|Minimum|
|`MAX()`|Maximum|

### `GROUP BY` et `HAVING`

```sql
SELECT city, COUNT(*) AS total
FROM users
GROUP BY city
HAVING COUNT(*) >= 5;
```

- `GROUP BY` regroupe les lignes.
    
- `HAVING` filtre les groupes après agrégation.
    
- `WHERE` filtre les lignes avant le regroupement.
    

## 7. Les jointures — `JOIN`

```sql
SELECT users.name, orders.amount
FROM users
INNER JOIN orders
    ON users.id = orders.user_id;
```

1. `INNER JOIN`
2. `LEFT JOIN`
3. `RIGHT JOIN`
4. `FULL OUTER JOIN`
## 8. Sous-requêtes et CTE

### Sous-requête

```sql
SELECT name
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

### CTE avec `WITH`

```sql
WITH city_stats AS (
    SELECT city, COUNT(*) AS total
    FROM users
    GROUP BY city
)
SELECT *
FROM city_stats
WHERE total > 10;
```

Une CTE permet de nommer temporairement le résultat d'une requête pour rendre le code plus lisible.

## 9. Index et transactions

Index : accélère souvent les recherches, mais peut ralentir les écritures et consommer de l'espace.

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Transaction : permet de traiter plusieurs opérations comme une unité logique.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
-- Utiliser ROLLBACK à la place si l'on doit annuler.
```

# GIT

## 1. Définition

>Git est un système de gestion de versions qui permet de suivre les modifications du code, revenir à une version précédente et travailler en équipe.

- Git : outil local de gestion de versions.
- GitHub : plateforme en ligne pour héberger et partager des dépôts Git.

## 2. Configuration

|Level|Flag|File|Scope|
|---|---|---|---|
|System|`--system`|`/etc/gitconfig`|All users on machine|
|Global|`--global`|`~/.gitconfig`|Your user, all repos|
|Local|`--local`|`.git/config`|Current repo only|
### A. Viewing config
```bash
git config --list                 # all settings (merged)
git config --list --show-origin   # show which file each comes from
git config user.name              # get one value
git config --global --list        # only global
git config --local --list         # only current repo
```
### B. Setting config

```bash
# Global (all repos)
git config --global user.name "Full Name"
git config --global user.email "email@gmail.com"

# Local (only this repo) — overrides global
git config user.name "other name"

# Change default branch name for new repos
git config --global init.defaultBranch main

# Set your editor
git config --global core.editor "nano"

# Enable auto-setup of upstream on first push
git config --global push.autoSetupRemote true
```
### C. Aliases

```bash
# Aliases (shortcuts)
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --all"
# Then use:
git st        # = git status
git lg        # = pretty log
```

### D. Removing a setting

```bash
git config --global --unset user.name
git config --global --unset-all user.name   # if duplicates exist
```
## 3. Commandes essentielles

|Commande|Rôle|
|---|---|
|`git init`|Initialiser un dépôt|
|`git clone URL`|Copier un dépôt distant|
|`git status`|Voir l'état des fichiers|
|`git add .`|Préparer les modifications|
|`git add fichier.py`|Préparer un fichier|
|`git commit -m "message"`|Enregistrer un commit|
|`git log --oneline`|Consulter l'historique|
|`git diff`|Voir les modifications non préparées|
|`git show`|Afficher un commit|
|`git restore fichier.py`|Annuler les modifications locales non préparées|
|`git rm fichier.py`|Supprimer un fichier et préparer cette suppression|

## 4. Envoyer un projet sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Pour un dépôt déjà connecté :

```bash
git pull
git add .
git commit -m "Add model evaluation"
git push
```

- `git pull` : récupère les changements distants et les intègre à la branche courante.
- `git push` : envoie les commits locaux vers le dépôt distant.
- `git fetch` : récupère les informations distantes sans intégrer automatiquement les changements.

## 5. Branches (Branches)

>Une branche permet de développer une fonctionnalité sans modifier directement la branche principale.

```bash
git branch
git branch feature-api
git switch feature-api
```

>Créer et changer de branche en une commande :

```bash
git switch -c feature-api
```

>Fusionner une branche :

```bash
git switch main
git merge feature-api
```

>Supprimer une branche locale fusionnée :

```bash
git branch -d feature-api
```

## 6. Annuler et corriger des modifications

|Commande|Effet|
|---|---|
|`git restore fichier.py`|Annule les modifications non préparées du fichier|
|`git restore --staged fichier.py`|Retire le fichier de la zone de préparation|
|`git commit --amend`|Modifie le dernier commit|
|`git revert HASH`|Crée un commit qui annule un commit précédent|
|`git reset --soft HEAD~1`|Retire le dernier commit en conservant les changements préparés|
|`git reset --hard HEAD~1`|Retire le dernier commit et supprime les changements suivis correspondants|

>Attention : `git reset --hard` peut entraîner une perte de travail. À éviter si tu n'es pas certain de ce que tu veux supprimer.
  
## 7. Le fichier `.gitignore`

```bash
# Environnement Python
.venv/
venv/
__pycache__/
*.py[cod]

# Secrets
.env

# Outils
.vscode/
.idea/

# Logs
*.log

# Modèles et données volumineuses
models/*.keras
data/raw/
```


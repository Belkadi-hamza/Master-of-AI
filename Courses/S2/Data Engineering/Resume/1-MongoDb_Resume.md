# Run mongo on docker
>docker exec -it mongodb mongosh


<h1 style="text-align:center;background:white;color:black">Les bases de données</h1>

### Afficher toutes les bases de données

```javascript
show dbs
```

### Afficher la base de données actuelle

```javascript
db
```

### Changer de base de données

```javascript
use <nom_db>
```

### Créer une nouvelle BD (si elle n'existe pas)

```javascript
use <nom_db>
```

### Supprimer la base de données actuelle

```javascript
db.dropDatabase()
```

### Supprimer avec confirmation

```javascript
db.dropDatabase({writeConcern: {w: "majority"}})
```

---
<h1 style="text-align:center;background:green">Les collections</h1>

### Afficher toutes les collections

```javascript
show collections
```

### Statistiques d'une collection

```javascript
db.<collection>.stats()
```

### Créer une collection

```javascript
db.createCollection("<nom>")
```

### Créer une collection avec options

```javascript
db.createCollection("<nom>", {
  capped: true,                    // Collection à taille fixe
  size: 100000,                    // Taille max en octets
  max: 5000                        // Nombre max de documents
})
```

### Supprimer la collection

```javascript
db.<collection>.drop()
```

### Renommer une collection

```javascript
db.<collection>.renameCollection("<nouveau_nom>")
```

---
<h1 style="text-align:center;background:green">Les documents</h1>

## Insérer un document

```javascript
db.<collection>.insertOne({field: value})
```

### Exemple
```javascript
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  status: "active"
})
```

---

## Insérer plusieurs documents

```javascript
db.<collection>.insertMany([{...}, {...}])
```

### Exemple
```javascript
db.users.insertMany([
  {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    status: "active"
  },
  {
    name: "Bob",
    age: 35,
    email: "bob@example.com",
    status: "inactive"
  }
])
```

---

## Afficher toutes les documents

```javascript
db.<collection>.find()
```

### Exemple
```javascript
db.users.find()
```

---

## Filtrer

```javascript
db.<collection>.find({field: value})
```

### Exemple
```javascript
// Trouver tous les utilisateurs actifs
db.users.find({ status: "active" })

// Trouver tous les utilisateurs âgés de 25 ans
db.users.find({ age: 25 })

// Trouver tous les utilisateurs avec un email spécifique
db.users.find({ email: "john@example.com" })
```

---

## Premier document

```javascript
db.<collection>.findOne()
```

### Exemple
```javascript
db.users.findOne()
```

---

## Premier document filtré

```javascript
db.<collection>.findOne({field: value})
```

### Exemple
```javascript
db.users.findOne({ age: 30 })
```

---

## Limiter les résultats

```javascript
db.<collection>.find().limit(5)
```

### Exemple
```javascript
// Afficher seulement les 3 premiers utilisateurs
db.users.find().limit(3)

// Combiner avec tri
db.users.find().sort({ age: 1 }).limit(3)  // Les 3 plus jeunes
```

---

## Saute des documents

```javascript
db.<collection>.find().skip(10)
```

### Exemple
```javascript
// Saute les 2 premiers documents
db.users.find().skip(2)

// Pagination : page 1 (10 documents)
db.users.find().limit(10).skip(0)
```

---

## Trier (1=asc, -1=desc)

```javascript
db.<collection>.find().sort({field: 1})
```

### Exemple
```javascript
// Trier par âge croissant (du plus jeune au plus vieux)
db.users.find().sort({ age: 1 })

// Trier par âge décroissant (du plus vieux au plus jeune)
db.users.find().sort({ age: -1 })

// Trier par nom alphabétique
db.users.find().sort({ name: 1 })

// Trier par statut puis par âge
db.users.find().sort({ status: 1, age: -1 })

// Combiner avec limit
db.users.find().sort({ age: -1 }).limit(3)  // Les 3 plus âgés
```

---

## Compter les documents

```javascript
db.<collection>.find().count()
```

### Exemple
```javascript
// Compter tous les utilisateurs
db.users.find().count()
// Résultat : 100

// Compter les utilisateurs actifs
db.users.find({ status: "active" }).count()
// Résultat : 45

// Méthode alternative
db.users.countDocuments()
```

---

## Mettre à jour un document

```javascript
db.<collection>.updateOne({filtre}, {$set: {field: value}})
```

### Exemple
```javascript
// Mettre à jour l'âge de John Doe
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
)
// Résultat : { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

// Mettre à jour le statut d'un utilisateur spécifique
db.users.updateOne(
  { email: "bob@example.com" },
  { $set: { status: "active", updatedAt: new Date() } }
)

// Incrémenter un compteur
db.users.updateOne(
  { name: "Alice" },
  { $inc: { loginCount: 1 } }
)
```

---

## Mettre à jour plusieurs

```javascript
db.<collection>.updateMany({filtre}, {$set: {field: value}})
```

### Exemple
```javascript
// Mettre à jour tous les utilisateurs inactifs
db.users.updateMany(
  { status: "inactive" },
  { $set: { status: "suspended" } }
)
// Résultat : { acknowledged: true, matchedCount: 25, modifiedCount: 25 }

// Ajouter un champ à tous les documents
db.users.updateMany(
  {},
  { $set: { createdDate: new Date() } }
)

// Mettre à jour tous les utilisateurs avec un âge spécifique
db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: "minor", role: "underage" } }
)
```

---

## Remplacer complètement

```javascript
db.<collection>.replaceOne({filtre}, {newDocument})
```

### Exemple
```javascript
// Remplacer complètement un document
db.users.replaceOne(
  { email: "john@example.com" },
  {
    name: "John Smith",
    age: 32,
    email: "johnsmith@example.com",
    status: "active",
    role: "admin"
  }
)
// Résultat : { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

// Remplacer avec un nouvel objet
db.users.replaceOne(
  { _id: ObjectId("...") },
  { name: "New User", age: 40, status: "active" }
)
```

---

## Trouver et mettre à jour

```javascript
db.<collection>.findOneAndUpdate({filtre}, {$set: {...}})
```

### Exemple
```javascript
// Trouver et mettre à jour un utilisateur
db.users.findOneAndUpdate(
  { name: "Alice" },
  { $set: { age: 26, updatedAt: new Date() } }
)
// Résultat : Retourne le document avant modification

// Retourner le document après modification
db.users.findOneAndUpdate(
  { name: "Alice" },
  { $inc: { points: 10 } },
  { returnNewDocument: true }
)
// Résultat : Retourne le document après modification

// Trouver, mettre à jour et supprimer le vieux document
db.users.findOneAndUpdate(
  { status: "inactive" },
  { $set: { status: "active" } },
  { sort: { age: -1 } }
)
// Résultat : Met à jour le plus vieux utilisateur inactif
```

---

## Supprimer un document

```javascript
db.<collection>.deleteOne({field: value})
```

### Exemple
```javascript
// Supprimer un utilisateur spécifique
db.users.deleteOne({ email: "bob@example.com" })
// Résultat : { acknowledged: true, deletedCount: 1 }

// Supprimer le premier utilisateur avec un âge spécifique
db.users.deleteOne({ age: 30 })

// Supprimer par ID
db.users.deleteOne({ _id: ObjectId("...") })
```

---

## Supprimer plusieurs

```javascript
db.<collection>.deleteMany({field: value})
```

### Exemple
```javascript
// Supprimer tous les utilisateurs inactifs
db.users.deleteMany({ status: "inactive" })
// Résultat : { acknowledged: true, deletedCount: 25 }

// Supprimer tous les utilisateurs de moins de 18 ans
db.users.deleteMany({ age: { $lt: 18 } })

// Supprimer les utilisateurs avec un email spécifique
db.users.deleteMany({ email: { $regex: /@test\.com$/ } })

// Supprimer tous les documents (attention !)
db.users.deleteMany({})
// Résultat : { acknowledged: true, deletedCount: 100 }
```

---

## Trouver et supprimer

```javascript
db.<collection>.findOneAndDelete({field: value})
```

### Exemple
```javascript
// Trouver et supprimer un utilisateur spécifique
db.users.findOneAndDelete({ email: "alice@example.com" })
// Résultat : Retourne le document supprimé

// Trouver et supprimer le plus vieux utilisateur
db.users.findOneAndDelete(
  {},
  { sort: { age: -1 } }
)
// Résultat : Supprime et retourne le plus vieux utilisateur

// Trouver et supprimer avec condition
db.users.findOneAndDelete(
  { status: "inactive", age: { $gt: 60 } }
)
// Résultat : Supprime le premier utilisateur inactif de plus de 60 ans
```

<h1 style="text-align:center;background:green">Aggregation</h1>
```javascript
db.collection.aggregate([
  { $match:   { ... } },
  { $sort:    { ... } },
  { $group:   { ... } },
  { $lookup:  { ... } },
  { $unwind:  { ... } },
  { $project: { ... } }
])
```

##  `$match`  :  filter documents
>Like `find()`. **Put it first** whenever possible so later stages process fewer docs.

```javascript
db.collection.aggregate([
	{ $match: {
	    status: "paid",
	    total: { $gt: 100 }
	} }
])
```

##  `$sort` : order documents
- `1` = ascending 
- `-1` = descending.
```javascript
db.collection.aggregate([
	{ $sort: { createdAt: -1, total: 1 } }
])
```

## `$group` : aggregate by a key

```javascript
db.collection.aggregate([
	{ $group: { 
		_id_: '$ville', 
		mean_age : {$avg : '$age'},
		total : {$sum:1}
	} }
])
```

## `$lookup` : JOIN with another collection

```javascript
db.collection.aggregate([
	{ $lookup: {
	    from:         "customers",    // other collection
	    localField:   "customerId",   // field in current doc
	    foreignField: "_id",          // field in the other collection
	    as:           "customer"      // output array field
	} }
])
```

## `$project` : shape the output

```javascript
db.collection.aggregate([
	{ $project: {
		_id : 0,
		name : 1,
		city : 1
	} }
])
```

## `$unwind`
> To splite tobale 

### Document de départ

```javascript
{
  _id: 1,
  client: 'karim',
  articles: [
    { produits: 'laptop',  quantite: 1, prix: 900 },
    { produits: 'clavier', quantite: 2, prix: 200 }
  ]
}
```

### Sans `$unwind`


```javascript
db.commandes.find({ _id: 1 })
```

Résultat : **1 document** avec un tableau de 2 articles.

```javascript

{ _id: 1, client: 'karim', articles: [ {...}, {...} ] }
```

### Avec `$unwind`

```javascript

db.commandes.aggregate([
  { $match: { _id: 1 } },
  { $unwind: "$articles" }
])
```

Résultat : **2 documents**, chacun avec **un seul article**.

```javascript

{ _id: 1, client: 'karim', articles: { produits: 'laptop',  quantite: 1, prix: 900 } }
{ _id: 1, client: 'karim', articles: { produits: 'clavier', quantite: 2, prix: 200 } }
```


<h1 style="text-align:center;background:green">Indexes</h1>
## View indexes

```javascript
db.<collection>.getIndexes()
```

## Create an index (1=asc, -1=desc)

```javascript
db.<collection>.createIndex({field: 1})
```

## Unique index

```javascript
db.<collection>.createIndex({field: 1}, {unique: true})
```

## Compound index

```javascript
db.<collection>.createIndex({field1: 1, field2: -1})
```

## Text index

```javascript
db.<collection>.createIndex({field: "text"})
```

## Sparse index

```javascript
db.<collection>.createIndex({field: 1}, {sparse: true})
```

## Drop an index

```javascript
db.<collection>.dropIndex("nom_index")
```

## Drop all indexes

```javascript
db.<collection>.dropIndexes()
```

## Reindex

```javascript
db.<collection>.reIndex()
```

<h1 style="text-align:center;background:green">Query Operators</h1>
## Comparison Operators


```javascript
{ field: { $operator: value } }
```

| Operator   | Description                            | Exanples                          |           |
| ---------- | -------------------------------------- | --------------------------------- | --------- |
| **`$eq`**  | Equal to                               | `{ age: { $eq: 25 } }`            | age == 25 |
| **`$ne`**  | Not equal to                           | `{ age: { $ne: 25 } }`            | age != 25 |
| **`$gt`**  | Greater than                           | `{ age: { $gt: 25 } }`            | age > 25  |
| **`$gte`** | Greater than or equal to               | `{ age: { $gte: 25 } }`           | age >= 25 |
| **`$lt`**  | Less than                              | `{ age: { $lt: 25 } }`            | age < 25  |
| **`$lte`** | Less than or equal to                  | `{ age: { $lte: 25 } }`           | age <= 25 |
| **`$in`**  | Matches any of the values in an array  | `{ age: { $in: [25, 30, 35] } }`  |           |
| **`$nin`** | Matches none of the values in an array | `{ age: { $nin: [25, 30, 35] } }` |           |

## Logical Operators

```javascript
{ $operator: [ { condition1 }, { condition2 }, ... ] }
```

| Operator | Description                                         | Examples                                                     |       |
| -------- | --------------------------------------------------- | ------------------------------------------------------------ | ----- |
| `$and`   | Returns documents that match all conditions         | `{ $and: [ { age: { $gt: 18 } }, { status: "active" } ] }`   | &&    |
| `$or`    | Returns documents that match at least one condition | `{ $or: [ { age: { $lt: 18 } }, { status: "inactive" } ] }`  | \| \| |
| `$nor`   | Returns documents that fail all conditions          | `{ $nor: [ { age: { $lt: 18 } }, { status: "inactive" } ] }` |       |
| `$not`   | Returns documents that do not match the condition   | `{ age: { $not: { $gt: 18 } } }`                             |       |
## Update Operators

```javascript
{ $operator: { field: value } }
// ou pour certains opérateurs :
{ $operator: { field: value, ... } }
```

| Opérateur          | Exemple de code                       | Utilité                                                                              |
| :----------------- | :------------------------------------ | :----------------------------------------------------------------------------------- |
| **`$set`**         | `{ $set: { ville: "Paris" } }`        | Remplace ou ajoute la valeur d'un champ.                                             |
| **`$unset`**       | `{ $unset: { age: "" } }`             | Supprime complètement un champ d'un document.                                        |
| **`$inc`**         | `{ $inc: { stock: -1 } }`             | Incrémente (ajoute) ou décrémente (soustrait) une valeur numérique.                  |
| **`$mul`**         | `{ $mul: { prix: 1.1 } }`             | Multiplie la valeur d'un champ par un nombre.                                        |
| **`$rename`**      | `{ $rename: { "nom": "name" } }`      | Renomme un champ sans changer sa donnée.                                             |
| **`$min`**         | `{ $min: { score: 10 } }`             | Met à jour la valeur seulement si la nouvelle valeur est plus petite que l'actuelle. |
| **`$max`**         | `{ $max: { score: 100 } }`            | Met à jour la valeur seulement si la nouvelle valeur est plus grande que l'actuelle. |
| **`$currentDate`** | `{ $currentDate: { dateMaj: true } }` | Enregistre l'heure actuelle (timestamp) automatiquement.                             |
| **`$push`**        | `{ $push: { tags: "promo" } }`        | Ajoute un élément à la fin d'un tableau (autorise les doublons).                     |
| **`$pop`**         | `{ $pop: { tags: 1 } }`               | Supprime le dernier élément (1) ou le premier élément (-1) d'un tableau.             |

## Element Operators


```javascript
{ field: { $operator: value } }
```

| Operator  | Description                                                | Examples                     |
| --------- | ---------------------------------------------------------- | ---------------------------- |
| `$exists` | Matches documents that have the specified field            | `{ email: { $exists: true } }` |
| `$type`   | Matches documents where the field is of the specified type | `{ age: { $type: "string" } }` |

---

<h1 style="text-align:center;background:green">Users</h1>

## View users

```javascript
show users
```

## Create a user

```javascript
db.createUser({
  user: "username",
  pwd: "password",
  roles: [{role: "readWrite", db: "myapp"}]
})
```

## Drop a user

```javascript
db.dropUser("username")
```

## Change password

```javascript
db.changeUserPassword("username", "newpass")
```

## Authenticate

```javascript
db.auth("username", "password")
```



## Formules à retenir

> **QUORUM = (facteur de réplication / 2) + 1**
> **CAP Theorem** : Consistency + Availability + Partition Tolerance → 2 parmi 3

## I– Installation

## II–Exploration et compréhension de la base vente

### Objectifs pédagogiques
- Comprendre la structure des collections
- Manipuler les commandes de base
- Se familiariser avec le jeu de données

### Exercice 1
Créer une base de données vente avec les collections suivants :
client, vendeurs, magasins , ventes, produits et catégories.

### Exercice 2
1. Afficher toutes les bases de données.
2. Afficher toutes les collections de la DB vente
3. Importer, Coller ou saisissez directement le code ci-dessous pour insert des documents dans chaque collection :

a. Collection Clients
```
db.clients.insertMany([
{ nom: "moss", ville: "Taza", email: "mosst@mail.com" },
{ nom: "Bentaib", ville: "Casablanca", email: "bentaib@mail.com" }
]);
```

b. Collection vendeurs
```
db.vendeurs.insertMany([
{ nom: "Ali", specialite: "électronique" },
{ nom: "mohamed", specialite: "informatique" },
{ nom: "laila", specialite: "électronique" }
]);
```

c. Collection magasins
```
db.magasins.insertMany([
{ nom: "Casa Anfa", ville: "Casablanca" },
{ nom: "Agdal Fes", ville: "Fes" },
{ nom: "jnan El Ouard", ville: "Fes" }
]);
```

d. Collection ventes
```
db.ventes.insertMany([
{ produit: "Smartphone", prix: 500, date: "2026-10-01" },
{ produit: "PC Portable", prix: 1200, date: "2026-10-05" },
{ produit: "Casque", prix: 150, date: "2026-10-10" }
]);
```

e. Collection produits
f. Collection catégories

Avec l'interface graphique de Mongodb compass, insert ces documents :
nom : electronique, Cat : electro
nom : PC Portable , Cat : PCP
nom : PC Bureau , cat : PCB
nom : Telephone, cat : teleph

### Exercice 3
5. Afficher l'ensemble des documents de la collection clients.
6. Afficher le 1er document de la collection clients.
7. Lister les vendeurs qui on la spécialité : électronique.
8. Afficher les magasins situés à Fès.
9. Compter le nombre total des ventes.
10. Mettez à jour la date de vente de chaque produits
11. Enregistrez vote base de données.

### Corrigé détaillé (attendu)
1. Use vente
2. Show dbs
3. db.createCollection("nomDeLaCollection") expl. db.createCollection("categories")
4. Show collections
5. db.clients.find()
6. db.ventes.findOne()
7. db.vendeurs.find({specialite:"électronique"}).pretty()
8. db.magasins.find({ville:"Fes"})
9. db.ventes.countDocuments()
10. db.ventes.updateOne({ produit: "Smartphone" }, { $set: { date: "2026-04-01" } }); puis db.ventes.updateOne({ produit: "PC Portable" }, { $set: { date: "2026-04-01" } }); puis db.ventes.updateOne({ produit: "Casque" }, { $set: { date: "2026-04-01" } });

• Comme on va appliquer la même date à plusieurs produits différents, il suffit d'utiliser updateMany combiné avec l'opérateur $in.
```
db.ventes.updateMany({ produit: { $in: ["Smartphone", "PC Portable", "Casque"] } }, { $set: { date: "2026-04-01" } })
```
• updateOne : Seul le premier document trouvé sera modifié.
• updateMany : Tous les valeurs seront mis à jour.

11. Il existe 2 formats de fichier de sauvegarde (BSON ou JSON), la méthode standard consiste à utiliser l'outil mongodump. Télécharger MongoDB Database Tools (choisissez format ZIP) puis copiez le fichier mongodump.exe et collez-le directement dans votre dossier C:\mongo_tools (par exemple) et enfin créer un dossier de sauvegarde (test)

12. Sauvegarde complète (via le terminal classique)
Ouvrez votre terminal (pas le shell MongoDB, mais l'invite de commande de votre ordinateur) et tapez :
```
C:\mongo-tools\mongodump --db vente --out c:\test
```
•--db vente : Cible uniquement votre base.
•--out C:\test : Crée un dossier où les données seront stockées au format BSON (plus rapide et léger que le JSON).

2. Sauvegarde au format JSON (plus lisible)
Si vous préférez un format texte que vous pouvez ouvrir, utilisez mongoexport pour chaque collection :
```
C:\mongo-tools\mongoexport --db vente --collection clients --out c:\test\clients.json
```

Avec MongoDB Compass, c'est beaucoup plus simple car vous n'avez rien à installer ni à configurer dans Windows.

1. Choisir la collection à enregistrer
• Ouvrez MongoDB Compass et connectez-vous.
• Dans la colonne de gauche, cliquez sur votre base de données vente.
• Cliquez sur la collection que vous voulez sauvegarder (par exemple : ventes).

2. Lancer l'exportation
•Dans la barre d'outils au centre (juste au-dessus de vos documents), cliquez sur le bouton Export the full collection .
•Une fenêtre s'ouvre. Choisissez l'option "Export full collection" (pour tout sauvegarder).
•Cliquez sur Select Fields (en bas à droite).

3. Choisir le format et le dossier
•Vérifiez que tous les champs sont cochés.
•Choisissez le format :
JSON : Le plus courant pour MongoDB.
CSV : Si vous voulez ouvrir vos données dans Excel.
•Cliquez sur Browse pour choisir l'endroit sur votre ordinateur (Bureau, Documents...) où enregistrer le fichier.
•Cliquez sur Export.

---

# TP2 – Filtres avancés et projections

### Objectifs pédagogiques
- Utiliser les opérateurs de comparaison
- Limiter les champs retournés
- Analyser des sous-ensembles de données

### Exercice 1
1. Ajoutez un champ Âge à tous les documents de la collections clients et lui attribuer des valeurs différentes.
2. Afficher les clients âgés de plus de 30 ans.
3. Afficher uniquement le nom et la ville des clients.
4. Identifier les ventes dont le montant est compris entre 150 et 1500 euros.
5. Combiner plusieurs critères de filtrage. (Utilisez les opérateurs logiques) :
• Trouver les ventes de Smartphone dont le prix est supérieur à 400€.
• Trouver les magasins situés soit à Taza, soit à SAfi.
6. Expliquer la différence entre projection inclusive et exclusive.

### Corrigé détaillé (attendu)
1. Même Age : updateMany
Utilisez la méthode updateMany avec l'opérateur $set. En laissant le filtre vide {}.
```
db.clients.updateMany( {}, { $set: { Age: 30 } } );
```
Âge Différent : updateOne (cas par cas)
```
db.clients.updateOne({ _id: ObjectId("ID_DU_CLIENT_1") }, { $set: { Age: 25 } });
```

2.
```
db.clients.find({age:{$gt:30}});
```

3.
```
db.clients.find({}, {nom:1, ville:1, _id:0});
```
Explications :
{} (Premier bloc) : On sélectionne tous les documents (pas de filtre).
{ nom: 1, ville: 1 } : Le 1 signifie "inclure". On demande d'afficher ces deux champs.
_id: 0 : Le 0 signifie "exclure". Par défaut, MongoDB affiche toujours l'identifiant, il faut donc l'enlever explicitement si vous ne voulez que le nom et la ville.

4.
```
db.ventes.find({prix:{$gt:150, $lt:1500}}) / db.ventes.find({prix:{$gte:150, $lte:1500}})
```

5. Combinaison avec opérateurs logiques : Pour que plusieurs conditions soient remplies en même temps, il suffit de les séparer par une virgule dans les accolades. Exemple : Trouver les ventes de "Smartphone" dont le prix est supérieur à 400€ : ET
```
db.ventes.find({ produit: "Smartphone", prix: { $gt: 400 } })
```
Pour trouver des documents qui remplissent soit l'une, soit l'autre des conditions, on utilise l'opérateur $or avec un tableau [ ].
Exemple : Trouver les magasins situés soit à "Taza", soit à "SAfi" :
```
db.magasins.find({ $or: [ { ville: "SAfi" }, { ville: "Fes" } ]})
```
Avec l'opérateur In :
```
db.magasins.find({ville:{$in: [ "SAFI" , "Fes"]}})
```
Mélanger les deux (Combinaison complexe)
Vous pouvez imbriquer ces critères.
Exemple : Trouver les clients qui habitent à "Casablanca" ET qui ont soit 30 ans, soit 42 ans :
```
db.clients.find({ ville: "Casablanca", $or: [ { age: 42 }, { age: 30 } ]})
```
Excluez l'identifiant de l'affichage ?
```
db.clients.find({ ville: "SAfi", $or: [ { age: 42 }, { age: 30 }]} ,{_id:0} )
```

6. La différence entre la projection inclusive et exclusive réside dans la manière dont vous choisissez les informations à afficher dans vos résultats.

La Projection Inclusive (1)
Elle consiste à lister uniquement les champs que vous voulez voir. MongoDB masquera automatiquement tout le reste.
- Syntaxe : { nom: 1, ville: 1 }
- Résultat : Vous ne verrez que le nom, la ville (et l' _id qui est inclus par défaut).

La Projection Exclusive (0)
Elle consiste à lister les champs que vous voulez cacher. MongoDB affichera alors tout le reste du document.
- Syntaxe : { prix: 0, date: 0 }
- Résultat : Vous verrez tous les champs (nom, ville, etc.) sauf le prix et la date.
- _id=0 : C'est la seule exception (autorisation) : on peut inclure des champs et décider de cacher l'ID).

### Opérateurs de Comparaison
• $eq : Égal à
• $ne : Différent de
• $gt : Strictement supérieur à (Greater Than)
• $gte : Supérieur ou égal à (Greater Than or Equal)
• $lt : Strictement inférieur à (Less Than)
• $lte : Inférieur ou égal à (Less Than or Equal)
• $in : Correspond à une des valeurs spécifiées dans un tableau
• $nin : Ne correspond à aucune des valeurs spécifiées dans un tableau.

### Opérateurs Logiques
• $and : Joint plusieurs conditions (toutes doivent être vraies)
• $or : Au moins l'une des conditions doit être vraie
• $nor : Aucune des conditions ne doit être vraie
• $not : Inverse l'effet de la condition qui suit

### Opérateurs d'Agrégation
Utilisés dans les pipelines pour le traitement massif de données :
• $match : Filtre les documents (similaire à une requête find)
• $group : Regroupe les documents selon une clé spécifique
• $project : Ajoute, supprime ou renomme des champs
• $addFields : Ajoute de nouveaux champs à un document.

### Opérateurs de Mise à Jour (Update)
Utilisés lors des modifications :
• $set : Attribue une nouvelle valeur à un champ ou le crée s'il n'existe pas
• $unset : Supprime un champ d'un document
• $push : Ajoute un élément à un tableau existant
• $inc : Incrémente la valeur numérique d'un champ

---

# TP3 – Mise à jour et suppression de données

### Objectifs pédagogiques
- Modifier des documents existants
- Comprendre l'impact des mises à jour
- Supprimer des documents de manière contrôlée

### Exercices
1. Modifier la ville de Bentaib.
2. Augmenter tous les prix de vente de 10%.
3. Ajouter un champ achats à un client.
4. Supprimer une vente spécifique.
5. Différence entre updateOne et updateMany.

### Corrigé détaillé (attendu)
1.
```
db.clients.updateOne( { nom: "Bentaib" }, { $set: { ville: "Casablanca" } })
```
On utilise updateOne avec $Set si on veut modifier une ou plusieurs valeurs d'un SEUL document, sinon , si on veut modifier le ou les même champs avec les même valeurs on utilise UpdateMany :
```
db.clients.updateMany( { nom: { $in: ["Bentaib", "Moss"] } }, ($in : on a une liste).
{ $set: { ville: "Casablanca", email: "contact@info.com" } } )
```
Pour modifier plusieurs documents avec des valeurs différentes (Bentaib et moss) en une seule fois, la méthode la plus propre est d'utiliser db.collection.bulkWrite().
```
db.clients.bulkWrite([
{
updateOne: { filter: { nom: "Bentaib" },
update: { $set: { ville: "Tanger", email: "nouvelle@mail.com" } } } },
updateOne: { filter: { nom: "Moss" },
update: { $set: { ville: "Tanger", email: "nouvelle@mail.com" } } } } ])
```
C'est beaucoup plus efficace que de lancer deux commandes séparées.

2. Pour augmenter une valeur numérique par un pourcentage (ici 10 %), on utilise l'opérateur $mul (multiplication).
```
db.ventes.updateMany({},{ $mul:{prix:1.1} })
```

### Les opérateurs dans Mongodb
```
db.clients.updateOne( { nom: "Bentaib" }, { $push: { achats: "Smartphone" } } )
```

Si vous voulez ajouter toute une liste en une seule commande, on combine $push avec l'opérateur $each :
```
db.clients.updateOne( { nom: "Bentaib" },
{ $push: { achats: { $each: ["Chargeur", "Coque"] } } } )
```

3. Pour supprimer une vente spécifique (un document), on utilise généralement la commande deleteOne(). Il est conseillé d'utiliser un identifiant unique comme l' _id ou le nom du produit pour éviter de supprimer les mauvaises données.

4. Supprimer par le nom du produit
Si vous voulez supprimer la vente du "Casque" :
```
db.ventes.deleteOne( { produit: "Casque" } )
```
, MongoDB ne supprimera qu'un seul document : le tout premier qu'il trouvera sur le disque (généralement le plus ancien).
Si vous voulez supprimer absolument toutes les ventes qui portent le nom "Casque" :
```
db.ventes.deleteMany( { produit: "Casque" } )
```

2. Supprimer par l'identifiant unique (Plus sûr)
C'est la méthode recommandée si vous avez plusieurs ventes du même produit, car chaque vente possède un _id différent :
```
db.ventes.deleteOne( { _id: ObjectId("65f123abc456...") } )
```

3. Supprimer plusieurs ventes d'un coup
Si vous voulez supprimer toutes les ventes dont le prix est inférieur à 500€ :
```
db.ventes.deleteMany( { prix: { $lt: 500 } } )
```

4. La différence principale entre ces deux commandes réside dans le nombre de documents impactés par la modification.

updateOne() :
Action : Modifie un seul document, même si plusieurs documents correspondent au filtre.
Lequel ? Il choisit le premier document qu'il trouve sur le disque (souvent le plus ancien).
Utilité : Idéal pour les modifications précises (ex: changer l'email d'un utilisateur spécifique via son ID).

updateMany() :
Action : Modifie tous les documents qui correspondent au filtre.
Utilité : Idéal pour les mises à jour globales (ex: appliquer une remise de 10% sur tous les produits ).

Les opérations CRUD MongoDB (Créer, Lire, Mettre à jour, Supprimer) constituent l'ensemble des fonctions de base pour gérer les documents au sein de vos collections.

### 1. Create (Créer - Insérer des données)
Pour ajouter de nouveaux documents dans une collection, utilisez insertOne() (pour un seul document) ou insertMany() (pour plusieurs).
• db.collection.insertOne() : Insère un seul document.
• db.collection.insertMany([doc1, doc2]) : Insère plusieurs documents à la fois.
Expl. :
```
db.produits.insertOne({ nom: "IPhone", fabricant: "Apple", prix: 1200 })
```

### 2. Read (Lire - Interroger les données)
Pour récupérer des documents, utilisez la méthode find(). Vous pouvez y ajouter des critères de filtrage.
```
db.produits.find()
```
• Rechercher avec un filtre (ex: prix inférieur à 1000) :
Expl. :
```
db.produits.find({ prix: { $lt: 1000 } })
```

### 3. Update (Mettre à jour - Modifier des données)
Pour modifier un document, utilisez updateOne() ou updateMany(). Utilisez toujours l'opérateur $set pour modifier uniquement les champs ciblés sans écraser le reste du document.
• db.collection.updateOne({ filtre }, { $set: { champ: nouvelle_valeur } }) : Modifie le premier document correspondant.
• db.collection.updateMany({ filtre }, { $set: { champ: nouvelle_valeur } }) : Modifie tous les documents correspondant.
Expl. :
```
db.produits.updateOne( { nom: "IPhone" }, { $set: { prix: 1150 } } )
```

### 4. Delete (Supprimer - Effacer des données)
Pour retirer des documents, utilisez deleteOne() ou deleteMany().
• db.collection.deleteOne({ filtre }) : Supprime le premier document correspondant.
• db.collection.deleteMany({ filtre }) : Supprime tous les documents correspondant.
Expl. :
```
db.produits.deleteOne({ nom: "IPhone" })
```
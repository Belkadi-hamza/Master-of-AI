## Partie I : Partie théorique

### 1. QCM Choisir une seule bonne réponse

|     | Q1  | Q2  | Q3  | Q4  | Q5  | Q6  | Q7  | Q8  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A   |     |     |     |     |     |     |     |     |
| B   |     |     |     |     |     |     |     |     |
| C   |     |     |     |     |     |     |     |     |
| D   |     |     |     |     |     |     |     |     |

**Q1. La qualité des données doit être considérée :**

A. comme une phase finale de nettoyage  
B. comme une exigence intégrée au pipeline  
C. comme une responsabilité exclusive des analystes  
D. comme une tâche facultative

**Q2. Le data lineage permet principalement :**

A. de compresser les données  
B. de chiffrer les bases  
C. de retracer l'origine et les transformations des données  
D. d'entraîner un modèle

**Q3. Lequel des éléments suivants est un test de qualité ?**

A. test d'unicité  
B. test de compilation Java  
C. test de latence GPU  
D. test de rendu HTML

**Q4. Un data contract permet surtout :**

A. d'automatiser un modèle de deep learning  
B. de formaliser les engagements entre producteurs et consommateurs de données  
C. de supprimer les métadonnées  
D. de remplacer la gouvernance

**Q5. La fraîcheur d'une donnée renvoie à :**

A. son niveau de compression  
B. son format de stockage  
C. son actualité par rapport au besoin métier  
D. sa taille disque

**Q6. Les métadonnées servent notamment à :**

A. documenter les données  
B. comprendre leur contexte  
C. faciliter leur gouvernance  
D. toutes les réponses précédentes

**Q7. Dans une logique DataOps, les tests doivent être :**

A. uniquement manuels  
B. uniquement réalisés par le métier  
C. automatisables et intégrés au pipeline  
D. exécutés une seule fois

**Q8. Le principal intérêt des feedback loops est :**

A. ralentir la production  
B. masquer les incidents  
C. améliorer continuellement le pipeline à partir des mesures et anomalies  
D. supprimer les journaux d'exécution

---

### 2. Questions directes

1. Distinguer donnée disponible, donnée exploitable et donnée fiable.

2. Pourquoi la qualité des données doit-elle être traitée dès l'ingestion ?

3. Expliquer le rôle des métadonnées dans la confiance des données.

4. Donner trois exemples de tests de qualité automatisables.

5. Pourquoi le lineage est-il utile pour l'analyse d'impact ?

6. En quoi les data contracts renforcent-ils la stabilité des pipelines ?

7. Quel lien peut-on établir entre qualité des données et performance d'un système ML ?

8. Pourquoi la gouvernance n'est-elle pas seulement une question administrative ?

---

### 3. Définitions à fournir par l'étudiant

Définir brièvement :

- qualité des données ;
- complétude ;
- fraîcheur ;
- métadonnées ;
- data lineage ;
- gouvernance des données ;
- automated testing ;
- data contract ;
- feedback loop.

---

### 4. Questions d'analyse

1. Une table est complète à 99 %, mais aucune documentation n'existe sur ses colonnes. Peut-on parler de donnée de confiance ? Justifier.

2. Un pipeline ne produit pas d'erreur technique, mais les tableaux de bord affichent des résultats incohérents. Quel type de contrôles aurait dû être prévu ?

3. Une équipe modifie le nom d'une colonne sans prévenir les consommateurs. Quel mécanisme du chapitre permet de réduire ce type d'incident ?

4. Pourquoi les tests de qualité doivent-ils être versionnés au même titre que le code ?

5. Comment articuler qualité, monitoring et amélioration continue dans un pipeline moderne ?

---

### 5. Mini étude de cas

Une entreprise de e-commerce alimente chaque nuit un entrepôt de données à partir de trois sources :

- commandes web,
- CRM clients,
- système logistique.

**Depuis deux semaines :**

- le nombre de commandes journalières fluctue anormalement ;
- certaines commandes n'ont plus d'identifiant client ;
- la table de livraison contient des dates antérieures aux dates de commande ;
- le tableau de bord commercial présente des résultats contradictoires avec le reporting logistique.

**Travail demandé**

1. Identifier les problèmes de qualité observables.

2. Classer ces problèmes selon les dimensions de qualité concernées.

3. Proposer au moins cinq règles de validation.

4. Indiquer à quelles étapes du pipeline ces contrôles devraient être placés.

5. Expliquer quels éléments de métadonnées, de lineage ou de gouvernance pourraient aider à résoudre durablement la situation.
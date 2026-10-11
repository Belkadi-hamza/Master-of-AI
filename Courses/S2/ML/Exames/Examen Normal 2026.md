**Contrôle Final**
**Module : Machine Learning**
**Année universitaire : 2025/2026**
**Durée 2H**

**PARTIE I – QCM (10 points)**

**QCM 1**
Quel est l'effet principal de l'augmentation du paramètre C dans un SVM à marge souple ?
- [ ] A) Le modèle devient plus régularisé et tolère plus d'erreurs.
- [ ] B) Le modèle pénalise davantage les erreurs de classification, ce qui réduit la marge et augmente le risque de sur-apprentissage.
- [ ] C) Le modèle ignore automatiquement les vecteurs de support mal classés.
- [ ] D) Le noyau devient automatiquement non linéaire.

**QCM 2**
Pourquoi l'algorithme KNN devient-il inefficace en grande dimension ?
*   ☐ A) Parce que le calcul des distances devient impossible au-delà de 10 dimensions.
*   ☐ B) Parce que la notion de « voisinage » perd son sens : les distances entre points deviennent quasi équivalentes.
*   ☐ C) Parce que KNN ne fonctionne qu'avec des variables catégorielles.
*   ☐ D) Parce que KNN nécessite obligatoirement une ACP préalable.

**QCM 3**
Dans un arbre de décision, le gain d'information d'un attribut A est défini par :
*   ☐ A) Gain(A) = H(Y) + H(Y | A)
*   ☐ B) Gain(A) = H(Y) - H(Y | A)
*   ☐ C) Gain(A) = H(Y | A) - H(Y)
*   ☐ D) Gain(A) = H(A) - H(A | Y)

**QCM 4**
Quelle est la valeur de l'entropie H(Y) lorsque la classe cible est parfaitement équilibrée entre 2 classes ?
*   ☐ A) 0
*   ☐ B) 0,5
*   ☐ C) 1
*   ☐ D) 2

**QCM 5**
Parmi les techniques suivantes, laquelle ne fait pas partie des méthodes de rééquilibrage données ?
*   ☐ A) SMOTE
*   ☐ B) Random Under-Sampling
*   ☐ C) Random Over-Sampling
*   ☐ D) GridSearch

**QCM 6**
Dans un contexte de fort déséquilibre de classes, quelle métrique est la plus pertinente ?
*   ☐ A) Accuracy
*   ☐ B) Erreur quadratique moyenne (MSE)
*   ☐ C) F1-score (moyenne harmonique de précision et rappel)
*   ☐ D) Coefficient de détermination R²

**QCM 7**
Un modèle prédit 100 % de la classe majoritaire sur un jeu où 98 % des exemples appartiennent à cette classe. Que peut-on dire ?
*   ☐ A) Le modèle est excellent car l'accuracy est de 98 %.
*   ☐ B) Le modèle est trompeur : l'accuracy est élevée mais le rappel sur la classe minoritaire est nul.
*   ☐ C) Le modèle est fiable car il ne se trompe jamais.
*   ☐ D) Le modèle est inutile car l'accuracy est faible.

**QCM 8**
Pourquoi est-il recommandé d'appliquer une transformation logarithmique sur une variable comme population ou median_house_value ?
*   ☐ A) Pour supprimer les valeurs manquantes.
*   ☐ B) Pour réduire l'asymétrie (skewness) et rapprocher la distribution d'une loi normale.
*   ☐ C) Pour augmenter le nombre de features.
*   ☐ D) Pour encoder les variables catégorielles.

**QCM 9**
Quelle affirmation est vraie concernant la standardisation (Z-score) avant une régression logistique avec régularisation L1/L2 ?
*   ☐ A) Elle est inutile car la régression logistique est invariante à l'échelle.
*   ☐ B) Elle est indispensable car les pénalités L1/L2 dépendent de l'échelle des coefficients.
*   ☐ C) Elle dégrade toujours les performances.
*   ☐ D) Elle remplace l'encodage one-hot.

**QCM 10**
Que signifie la fiabilité (reliability) d'un modèle de Machine Learning ?
*   ☐ A) Sa capacité à être entraîné rapidement.
*   ☐ B) Sa capacité à produire des prédictions cohérentes, stables et reproductibles dans des conditions variées, y compris sur des données nouvelles.
*   ☐ C) Sa capacité à utiliser le plus de features possible.
*   ☐ D) Sa capacité à obtenir 100 % d'accuracy sur le train.

---

**PARTIE II – EXERCICES (30 points)**

**Exercice 1 – Apprentissage supervisé : SVM et KNN (6 points)**

**1.1 SVM (3 points)**
a. Expliquez le principe fondamental du SVM pour un problème de classification binaire linéairement séparable. (1 pt)
b. Qu'appelle-t-on marge maximale ? Quel est le rôle des vecteurs de support ? (1 pt)
c. Comment le SVM gère-t-il les cas non linéairement séparables ? Décrivez le rôle du noyau (kernel trick) et citez deux noyaux couramment utilisés. (1 pt)

**1.2 KNN (3 points)**
a. Décrivez le fonctionnement de l'algorithme KNN pour une tâche de classification. (1 pt)
b. Citez trois types de distances utilisables et donnez leur formule pour deux d'entre elles. (1 pt)
c. Quel est l'impact du choix de k sur le modèle (biais/variance) ? Que se passe-t-il si k = 1 ? Si k = n ? (1 pt)

**Exercice 3 – Données déséquilibrées et fiabilité des modèles (6 points)**

**3.1 Données déséquilibrées (4 points)**
On considère un problème de classification binaire comportant 100 instances :
*   95 instances de la classe 1
*   5 instances de la classe 2

a. Pourquoi ce jeu de données est-il problématique pour un classifieur naïf ? (1 pt)
b. Citez et expliquez trois techniques permettant de traiter ce déséquilibre (au niveau des données, de l'algorithme, ou de l'évaluation). (1.5 pts)
c. Quelles métriques sont plus adaptées que l'accuracy dans ce contexte ? Justifiez. (1 pt)
d. Proposez une stratégie complète (préprocessing + modèle + évaluation) pour résoudre ce problème. (0.5 pt)

**3.2 Fiabilité des modèles ML (2 points)**
a. Que signifie la fiabilité (reliability) d'un modèle de Machine Learning ? (1 pt)
b. Citez deux techniques permettant d'évaluer ou d'améliorer la fiabilité d'un modèle. (1 pt)

**Exercice 4 – Feature engineering sur données médicales (6 points)**
Soit le jeu de données suivant relatif à des patients :

| Âge (h) | Taille (cm) | Poids (kg) | Sexe | Tension syst. | Tension diast. | Cholestérol | Fumer | Alcool | Activité physique | Maladie cardiaque |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1000 | 160 | 55.0 | 1 | 120 | 80 | 110 | 0 | 1 | 0 | 1 |
| 5000 | 165 | 60.0 | 2 | 130 | 85 | 220 | 1 | 0 | 1 | 1 |
| 2000 | 170 | 65.0 | 1 | 140 | 90 | 110 | 0 | 0 | 0 | 0 |
| 5000 | 175 | 70.0 | 2 | 150 | 95 | 330 | 1 | 1 | 0 | 1 |
| 3000 | 180 | 75.0 | 1 | 160 | 100 | 220 | 0 | 0 | 1 | 0 |

**Questions**
1.  Analysez ce jeu de données et recensez les problèmes potentiels pour la construction d'un modèle linéaire (échelles, types, distributions, encodage, etc.). (1.5 pts)
2.  Pour chaque problème identifié, proposez une technique de transformation adaptée :
    *   Encodage des variables catégorielles (Sexe, Fumer, Alcool...) (0.5 pt)
    *   Normalisation / standardisation des variables numériques (0.5 pt)
    *   Gestion des asymétries éventuelles (0.5 pt)
3.  Donnez le formalisme mathématique de la standardisation (Z-score) et de la normalisation Min-Max. (1 pt)
4.  Proposez une featuremap finale : liste des attributs transformés, leur type et leur rôle dans un modèle linéaire (ex. régression logistique). (2 pts)

**Exercice 5 – Analyse de données immobilières et métriques (6 points)**
On dispose du jeu de données suivant (extrait) :

| longitude | latitude | housing_age (mois) | total_rooms | total_bedrooms | population | households | median_house_value |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| -114.47 | 34.40 | 190 | 7650 | 1901 | 1129 | 463 | 80100 |
| -114.56 | 33.69 | 170 | 720 | 174 | 333 | 117 | 85700 |

**Questions**
1.  Analysez ce jeu de données et identifiez les points posant problème pour la construction d'un modèle linéaire : (1.5 pts)
    *   Variables à forte variance / échelles hétérogènes
    *   Corrélations potentielles (multicolinéarité)
    *   Distributions asymétriques
    *   Valeurs aberrantes possibles
2.  Expliquez les techniques de préparation à appliquer avant modélisation : (1.5 pts)
    *   Standardisation / normalisation
    *   Transformation logarithmique
    *   Réduction de dimension (ACP)
    *   Sélection de variables
3.  Quelle est la différence entre précision (precision) et accuracy ? Donnez les formules et un exemple où l'accuracy est trompeuse. (1.5 pts)
4.  On souhaite évaluer un modèle de régression sur median_house_value. Citez deux métriques adaptées et justifiez. (1.5 pts)
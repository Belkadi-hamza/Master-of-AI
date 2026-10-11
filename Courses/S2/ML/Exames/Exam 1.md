# FSBM - Faculté des Sciences Ben M'sick
## Contrôle final : Machine Learning (2023/2024)

| | | | |
| :--- | :--- | :--- | :--- |
| **CLASSE** | Master DSBD | **DATE** | 2023/2024 |
| **MATIERE** | Machine learning | **DUREE** | 1h30 |
| **PROFESSEUR**| BENLAHMAR EL HABIB | **DOCUMENTS** | Autorisée (#) |
| | | **Internet** | Autorisée (#) |

---

### Question 1

1. **La descente de gradient est un algorithme pour trouver les valeurs des paramètres $w$ et $b$ qui minimisent la fonction de coût $J$.**

   $$\text{repeat until convergence \{} \\
   w = w - \alpha \frac{\partial}{\partial w} J(w, b) \\
   b = b - \alpha \frac{\partial}{\partial b} J(w, b) \\
   \}$$

   Quand $\frac{\partial}{\partial w} J(w, b)$ est un nombre négatif, qu'advient-il de $w$ après une étape de mise à jour (justifier votre réponse) :
   - [ ] $w$ reste le même
   - [ ] Il n'est pas possible de savoir si $w$ va augmenter ou diminuer
   - [ ] $w$ diminue
   - [ ] $w$ augmente

2. **Pour une régression linéaire, quel est le pas de mise à jour du paramètre $b$ :**
   - [ ] $b = b - \alpha \frac{1}{m} \sum_{i=1}^m (f_{w,b}(x^{(i)}) - y^{(i)}) x^{(i)}$
   - [ ] $b = b - \alpha \frac{1}{m} \sum_{i=1}^m (f_{w,b}(x^{(i)}) - y^{(i)})$

3. **Le (SVM) et (KNN) est l'un des algorithmes d'apprentissage supervisé les plus utilisés.**
   - **a.** Expliquez brièvement le concept du SVM.
   - **b.** Donnez 3 types de distances pour l'algorithme KNN.

---

### Question 2

Soit un échantillon de 200 patients se répartissant en 2 classes : $M$ pour malade et $B$ pour bonne santé. Deux attributs, gorge irritée et température, permettent de répartir les patients dans chacune des classes suivant le tableau suivant :

|                            | Gorge irritée | Gorge non irritée |
| :------------------------- | :-----------: | :---------------: |
| **Température $< 37,5$**   |   $6B, 37M$   |     $91B, 1M$     |
| **Température $\ge 37,5$** |   $2B, 21M$   |     $1B, 41M$     |

1. Quel(s) arbre(s) de décision peut-on construire à partir de ces données en utilisant le critère du gain d'information (justifier le choix des attributs sans effectuer les calculs).

---

### Question 3

Comment résoudre les problèmes des jeux de données non équilibrés ?

---

### Question 4

1. What is Reliability of Machine learning? And Why bother about Machine Learning models reliability?
2. You may have a 2-class (binary) classification problem with 100 instances (rows). A total of 95 instances are labeled with Class-1 and the remaining 5 instances are labeled with Class-2.
   - **2.1.** How do you deal with this highly imbalanced data?

---

### Question 5

Soit le jeu de données suivant :

| Age (jours) | Taille (cm) | Poids (kg) | Sexe | Tension systolique | Tension diastolique | Cholestérol | Glucose | Fumeur | Alcool | Activité physique | Maladie cardiovasculaire |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 10000 | 160 | 55.0 | 1 | 120 | 80 | 1 | 1 | 0 | 0 | 1 | 0 |
| 15000 | 165 | 60.0 | 2 | 130 | 85 | 2 | 2 | 1 | 0 | 1 | 1 |
| 20000 | 170 | 65.0 | 1 | 140 | 90 | 1 | 1 | 0 | 1 | 0 | 0 |
| 25000 | 175 | 70.0 | 2 | 150 | 95 | 3 | 3 | 1 | 1 | 0 | 1 |
| 30000 | 180 | 75.0 | 1 | 160 | 100 | 2 | 2 | 0 | 0 | 1 | 0 |

Quelles techniques de transformations pouvez-vous utiliser sur ces attributs pour bien construire la carte des caractéristiques (features map) ? Donner les étapes et les formalismes nécessaires.

---

### Question 6

3. Dans un jeu de données nous disposons des features suivantes :

| longitude | latitude | Housing age (mois) | total_rooms | total_bedrooms | population | households | median_house_value |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 114.470000 | 34.400000 | 190 | 7650.000000 | 1901.000000 | 1129.000000 | 463.000000 | 80100.000000 |
| 114.560000 | 33.690000 | 170 | 720.000000 | 174.000000 | 333.000000 | 117.000000 | 85700.000000 |
| 114.570000 | 33.640000 | 192 | 1501.000000 | 337.000000 | 515.000000 | 226.000000 | 73400.000000 |
| 114.470000 | 33.630000 | 193 | 1501.000000 | 337.000000 | 515.000000 | 226.000000 | 73400.000000 |
| 114.570000 | 33.640000 | 1933 | 1501.000000 | 337.000000 | 515.000000 | 226.000000 | 73400.000000 |

   - **3.1.** Analyser ce jeux de données et recenser les points qui posent problème pour la construction d'un modèle linéaire.
   - **3.2.** Expliquer les différentes techniques à utiliser lors de la préparation de ces données.

4. Expliquer la différence entre précision et Accuracy ?
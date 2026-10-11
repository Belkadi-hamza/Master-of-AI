# FSBM - Faculté des Sciences Ben M'sick
## Contrôle final : Machine Learning (2022/2023)

| | | | |
| :--- | :--- | :--- | :--- |
| **CLASSE** | Master DSBD | **DATE** | 2022/2023 |
| **MATIERE** | Machine learning | **DUREE** | |
| **PROFESSEUR**| BENLAHMAR EL HABIB | **DOCUMENTS** | Autorisés (N) |
| | | **Internet** | Autorisés (N) |

---

### Partie 1

1. **Expliquez les termes suivants :** Cost Function MSE, MAE et RMSE.
2. **Discutez des défis liés à la descente de gradient et des solutions possibles**, telles que le choix du taux d'apprentissage et les critères de convergence.
3. **Le (SVM) et (KNN) est l'un des algorithmes d'apprentissage supervisé les plus utilisés.**
   - **1-** Expliquez brièvement le concept du SVM
   - **2-** Donnez 3 types de distances pour l'algorithme KNN

4. **La descente de gradient est un algorithme pour trouver les valeurs optimales des paramètres $w$ et $b$ qui minimisent la fonction de coût $J$.**

   $$\text{repeat until convergence \{} \\
   w = w - \alpha \frac{\partial}{\partial w} J(w, b) \\
   b = b - \alpha \frac{\partial}{\partial b} J(w, b) \\
   \}$$

   Quand $\frac{\partial}{\partial w} J(w, b)$ est un nombre négatif, qu'advient-il de $w$ après une étape de mise à jour :
   - [ ] $w$ Reste le même
   - [ ] Il n'est pas possible de savoir si $w$ va augmenter ou diminuer
   - [ ] $w$ Diminue
   - [ ] $w$ Augmente

   **1- Pour une régression linéaire, quel est le pas de mise à jour du paramètre $b$ :**
   - [ ] $b = b - \alpha \frac{1}{m} \sum_{i=1}^m (f_{w,b}(x^{(i)}) - y^{(i)}) x^{(i)}$
   - [ ] $b = b - \alpha \frac{1}{m} \sum_{i=1}^m (f_{w,b}(x^{(i)}) - y^{(i)})$

5. **La régression logistique est une technique assez populaire en apprentissage automatique pour classer les données en deux catégories.** Cette technique s'appuie sur la régression linéaire en utilisant le même modèle linéaire, mais il est suivi par la fonction sigmoïde qui convertit la sortie du modèle linéaire à une valeur comprise entre 0 et 1. Cette valeur peut alors être interprétée comme une probabilité. Ceci est généralement représenté comme :

   $$P(y = 1 \mid x_{in}) = x_{out} = \sigma(x_{in}) = \frac{1}{1 + e^{-x_{in}}} \quad \text{(1)}$$

   Où $x_{in}$ comme son nom l'indique est le scalaire d'entrée (qui est également la sortie du modèle linéaire) et $x_{out}$ est le scalaire de sortie.

   Si l'erreur renvoyée à $x_{out}$ est $\frac{\partial E}{\partial x_{out}}$, écrivez l'expression pour $\frac{\partial E}{\partial x_{in}}$ en termes de $\frac{\partial E}{\partial x_{out}}$.

6. **La fonction Loss de la régression logistique peut être écrite sous la forme suivant ce qui s'appelle la Perte logistique.**

   $$\text{Log Loss} = \sum_{(x,y) \in D} -y \log(y') - (1 - y) \log(1 - y')$$

   Expliquez pourquoi on utilise la fonction Log ?

---

### Exercice 2

Donnez les noms des problèmes liés à ce dataset :

| # | Id | Name | Birthday | Gender | IsTeacher | #Students | Country | City |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 111 | John | 31/12/1990 | M | 0 | 0 | Ireland | Dublin |
| 2 | 222 | Mery | 15/10/1978 | F | 1 | 15 | Iceland | |
| 3 | 333 | Alice | 19/04/2000 | F | 0 | 0 | Spain | Madrid |
| 4 | 444 | Mark | 01/11/1997 | M | 0 | 0 | France | Paris |
| 5 | 555 | Alex | 15/03/2000 | A | 1 | 23 | Germany | Berlin |
| 6 | 555 | Peter | 1983-12-01 | M | 1 | 10 | Italy | Rome |
| 7 | 777 | Calvin | 05/05/1995 | M | 0 | 0 | Italy | Italy |
| 8 | 888 | Roxane | 03/08/1948 | F | 0 | 0 | Portugal | Lisbon |
| 9 | 999 | Anne | 05/09/1992 | F | 0 | 5 | Switzerland | Geneva |
| 10 | 101010 | Paul | 14/11/1992 | M | 1 | 26 | Ytali | Rome |

Comment pouvez-vous traiter ces problèmes ? Justifier votre réponse.
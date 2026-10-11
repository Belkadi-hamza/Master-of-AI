
## CONTRÔLE SESSION 1
**Master DSBD/S2**
**Algorithmes d'optimisation**
**Pr. F. Benabbou**
**Durée : 2H**

---
### Exercice 1 : Recherche d'un minimum par la méthode du nombre d'or
On considère la fonction : $f(x) = (x-2)^2 + e^{\frac{x}{2}}$.
1. Appliquer la **méthode du nombre d'or** à la fonction $f(x)$ sur l'intervalle $[0.9, 1]$ en arrêtant l'algorithme dès que la longueur de l'intervalle est inférieure à $0.06$.
   * Calculer successivement les points $x_1$ et $x_2$ utilisés à chaque itération.
   * Évaluer les valeurs $f(x_1)$ et $f(x_2)$.
   * Réduire l'intervalle en fonction des comparaisons des valeurs.
   * Continuer jusqu'à satisfaire la condition d'arrêt.
2. Donner une estimation $x_*$ de la position du minimum et la valeur correspondante $f(x_*)$.

### Exercice 2 : Méthode de Newton pour une fonction quadratique
On considère la fonction quadratique suivante : $f(x,y) = 2x^2 + y^2 - 2xy - 4x + 6y$.
L'objectif est de trouver un optimum de $f$ en appliquant la méthode de Newton à partir du point initial $(x_0,y_0) = (0,0)$.

1. Que représente $\alpha$ dans cet l'algorithme de newton ?
2. Calculer le gradient $\nabla f(x,y)$.
3. Calculer la matrice Hessienne $Hf(x,y)$.
4. En partant de $(x_0,y_0) = (0,0)$, effectuer la première itération de la méthode de Newton pour obtenir $(x_1,y_1)$.
5. En utilisant $(x_1,y_1)$, effectuer la deuxième itération pour trouver $(x_2,y_2)$.
6. Analyser les résultats obtenus et conclure sur la convergence de la méthode ainsi que sur la nature du point atteint (justifier).

### Exercice 3 : Optimisation avec contrainte d'égalité (Multiplicateurs de Lagrange)
On souhaite utiliser la méthode des Multiplicateurs de Lagrange pour maximiser la fonction $f(x,y) = xy$ sous la contrainte $h(x,y) = x^2 + y^2 - 8 = 0$.

1. Formuler le Lagrangien $L(x,y,\lambda)$ associé à ce problème.
2. Trouver les points critiques.
3. Déterminer la nature de ces points (maximum, minimum ou point selle).
4. Déterminer si la solution optimale est locale ou globale et justifier.

### Exercice 4 : Application de la méthode de pénalisation interne (barrière logarithmique)
Considérons le problème de minimisation suivant :
$$
\begin{cases}
f(x) = (x - 3)^2 \\
g(x) = -x < 0
\end{cases}
$$
On souhaite appliquer manuellement la méthode de pénalisation interne (barrière logarithmique) avec les hypothèses suivantes : paramètre initial de pénalité $\lambda_0 = 1$, facteur de décroissance $\beta = 0,5$, tolérance pour la condition d'arrêt $\varepsilon = 0,2$.

1. À l'itération $k$, écrire explicitement la fonction objective pénalisée $B_{\lambda_k}(x)$ en utilisant la barrière logarithmique.
2. Pour l'itération initiale $k=0$, calculer la valeur $x_1$ minimisant analytiquement la fonction pénalisée $B_{\lambda_0}(x)$ en utilisant la condition d'optimalité. Vérifier ensuite si la condition d'arrêt est vérifiée.
3. Passer à l'itération suivante $k=1$ : écrire la nouvelle fonction pénalisée $B_{\lambda_1}(x)$ puis calculer la nouvelle solution $x_2$. Vérifier ensuite si la condition d'arrêt est vérifiée.
4. À partir des résultats obtenus, la méthode converge-t-elle vers la solution du problème initial ? Justifier.

### Exercice 5 : Méthode simplexe
On considère le problème d'optimisation linéaire suivant :
$$
\begin{cases}
\text{Max } Z = 2x + y \\
x + y \leq 4 \\
2x + y \leq 5 \\
x \geq 0, y \geq 0
\end{cases}
$$

1. Mettre le problème sous forme standard en ajoutant les variables d'écart nécessaires.
2. Construire le tableau initial du simplexe.
3. Appliquer l'algorithme du simplexe pour résoudre le problème :
   * Identifier la variable entrante et la variable sortante à chaque itération.
   * Effectuer les opérations de pivotage nécessaires.
   * Écrire toutes les étapes et calculs.
4. Conclure en donnant la solution optimale et la valeur maximale de $Z$.

---

## Aide mémoire (Session 1)

### Algorithme 2 : Du nombre d'or
1. Soit $f$ une fonction, $[a,b]$ un intervalle.
   $\varepsilon = 1e-6$ ($10^{-6}$) est la tolérance.
2. **Répéter**
   Calculer : $x_1 = b - \frac{(b-a)}{\phi^2}$, $x_2 = a + \frac{(b-a)}{\phi^2}$.
3. Évaluer la fonction aux points de division : $f(x_1)$ et $f(x_2)$.
   a) Si $f(x_1) < f(x_2)$, alors le minimum se trouve dans l'intervalle $[a, x_2]$.
      * Mettre à jour l'intervalle : $b = x_2$.
   b) Sinon, le minimum se trouve dans l'intervalle $[x_1, b]$.
      * Mettre à jour l'intervalle : $a = x_1$.
4. **Jusqu'à** $(b - a < \varepsilon)$.
5. Le minimum approximatif est le point médian de l'intervalle final : $(a+b)/2$.

### Algorithme 6 : Méthode de Newton
* **Initialisation** : $x_0, \varepsilon, n = 0, \text{max\_iter}$.
2) **Répéter jusqu'à convergence** :
   a) Calculer le gradient $\nabla f(x_n)$.
   b) Calculer la matrice Hessienne $\nabla^2 f(x_n)$.
   c) Résoudre le système linéaire : $p_n = -\frac{\nabla f(x_n)}{\nabla^2 f(x_n)}$.
   d) Mettre à jour la solution : $x_{n+1} = x_n + p_n$.
   e) $n \leftarrow n+1$.
3) Vérifier la condition d'arrêt : $\|\nabla f(x_n)\| < \varepsilon$ ou $n > \text{max\_iter}$.
4) Solution $x_n$.

### Algorithme 14 : Point intérieur - Méthode de Barrière
1. **Initialisation** : $x_0, g(x_0) < 0, \varepsilon, f : \mathbb{R}^n \rightarrow \mathbb{R}, \lambda_0$, facteur de décroissance $\beta \in (0,1)$.
2. **Répéter** :
   a) Résoudre le problème barrière (algorithme de descente, Newton) :
      $$ \min_x \left( B_{\lambda_k}(x) = f(x) - \lambda_k \sum_{i=1}^m \ln(-g_i(x)) \right) $$
   b) Mise à jour : $x_{k+1}$ est la solution approchée de $\min B_{\lambda_k}(x)$.
   c) Diminuer la pénalité $\lambda_{k+1} = \beta \lambda_k$ où $0 < \beta < 1$.
   d) $k \leftarrow k+1$.
3. **Jusqu'à** $\lambda_k \sum_{i=1}^m \frac{1}{|g_i(x_k)|} < \varepsilon$.

### Algorithme 14 (Suite) : Simplexe cas de maximisation
1. **Initialisation** : Mettre le problème sous forme standard.
2. Construire le tableau du simplexe
   a) Si état initial identifier une solution de base réalisable initiale.
   b) Dans le cas maximisation prendre les coefficients de $-Z$.
3. **Test d'Optimalité** :
   a) Si tous les coefficients dans la ligne $-z$ sont $\geq 0 \rightarrow$ solution optimale atteinte.
   b) Sinon, passer à l'étape suivante.
4. **Choix de la Variable Entrante** : Sélectionner une variable hors base avec le coefficient le plus négatif dans la ligne $-Z$.
5. **Choix de la Variable Sortante** :
   a) Pour chaque contrainte $i$ où le coefficient de la colonne entrante $(E_{ic})$ est $> 0$, calculer : $\theta_i = b_i / E_{ic}$.
   b) Choisir la ligne avec le plus petit $\theta_i$ positif.
6. **Pivotage** :
   a) **Normalisation** : Diviser la ligne pivot par l'élément pivot pour obtenir $1$ (New $E_p = E_p / E_p$) c'est la nouvelle ligne pivot ; (le pivot $E_p$ est l'intersection de la ligne et colonne pivot).
   b) **Élimination** : Calculer les nouvelles valeurs du tableau : Pour toutes les autres lignes (y compris $z$) :
      Nouvelle ligne $i$ = Ligne actuelle $i$ - (coefficient de la colonne pivot de la ligne $i$ $\times$ nouvelle Ligne pivot)
      (New $E_i = E_i - E_{ic} \times$ New $E_p$)
7. **Itération** : Retourner à l'étape 3 avec le nouveau tableau du simplexe jusqu'à satisfaction du critère d'optimalité.
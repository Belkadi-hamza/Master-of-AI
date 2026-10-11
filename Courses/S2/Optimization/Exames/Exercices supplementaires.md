## 1. Méthode du gradient (pas fixe)

### Exercice A

Soit la fonction

$f(x,y) = 2x^2 + 2y^2 - 2xy + 6x - 2y$

On prendra $\alpha = 0{,}2$ et le critère d'arrêt $\|f(x_{n+1}) - f(x_n)\| < \varepsilon = 0{,}1$.

1. Calculer le gradient $\nabla f(x,y)$.
2. Calculer la matrice Hessienne $H_f(x,y)$.
3. À partir de $(x_0,y_0) = (0,0)$, effectuer la **première itération** pour obtenir $(x_1,y_1)$.
4. En utilisant $(x_1,y_1)$, effectuer la **deuxième itération** pour trouver $(x_2,y_2)$.
5. Conclure sur la convergence et la nature du point atteint.

### Exercice B

Soit

$f(x,y) = x^2 + 4y^2 + 2xy - 6x - 8y$

On prendra $\alpha = 0{,}25$ et le critère d'arrêt $\|f(x_{n+1}) - f(x_n)\| < \varepsilon = 0{,}1$.

1. Calculer $\nabla f$ et $H_f$.
2. Partir de $(x_0,y_0) = (1,1)$ et faire **deux itérations** de la méthode du gradient à pas fixe.
3. Vérifier si le critère d'arrêt est atteint.
4. Conclure sur la convergence.

---

## 2. Méthode du nombre d'or

### Exercice A

On considère

$f(x) = (x-3)^2 + e^{\frac{x}{3}}$

sur l'intervalle $[1{,}5, 2{,}5]$, avec arrêt dès que $b-a < 0{,}08$.

1. Calculer $x_1$ et $x_2$ à chaque itération.
2. Évaluer $f(x_1)$ et $f(x_2)$.
3. Réduire l'intervalle selon les comparaisons.
4. Continuer jusqu'à la condition d'arrêt.
5. Donner une estimation de $x_*$ et $f(x_*)$.

### Exercice B

On considère

$f(x) = x^4 - 3x^2 + 2x + 1$

sur $[0, 1]$, avec arrêt dès que $b-a < 0{,}1$.

1. Appliquer la méthode du nombre d'or.
2. Préciser à chaque étape l'intervalle conservé.
3. Donner l'estimation finale du minimum.

---

## 3. Méthode de Newton (optimisation)

### Exercice A

Soit

$f(x,y) = 3x^2 + 2y^2 - 2xy - 6x + 4y$

On part de $(x_0,y_0) = (0,0)$.

1. Que représente $\alpha$ dans l'algorithme de Newton ?
2. Calculer $\nabla f(x,y)$.
3. Calculer $H_f(x,y)$.
4. Effectuer la **première itération** pour obtenir $(x_1,y_1)$.
5. Effectuer la **deuxième itération** pour obtenir $(x_2,y_2)$.
6. Conclure sur la convergence et la nature du point atteint.

### Exercice B

Soit

$f(x,y) = x^2 + y^2 + xy - 4x - 2y$

On part de $(x_0,y_0) = (1,1)$.

1. Calculer $\nabla f$ et $H_f$.
2. Appliquer la méthode de Newton pendant **deux itérations**.
3. Vérifier la condition d'arrêt $\|\nabla f(x_n)\| < 10^{-3}$.
4. Conclure.

---

## 4. Multiplicateurs de Lagrange (contrainte d'égalité)

### Exercice A

Maximiser

$f(x,y) = 2xy$

sous la contrainte

$h(x,y) = x^2 + y^2 - 18 = 0$

1. Écrire le Lagrangien $L(x,y,\lambda)$.
2. Trouver les points critiques.
3. Déterminer leur nature (maximum, minimum, point selle).
4. Préciser si l'optimum est local ou global.

### Exercice B

Minimiser

$f(x,y) = x^2 + y^2$

sous

$h(x,y) = x + y - 4 = 0$

1. Écrire le Lagrangien.
2. Résoudre le système $\nabla L = 0$.
3. Donner l'optimum et sa nature.

---

## 5. Pénalisation extérieure

### Exercice A

Soit le problème

$$
\begin{cases}
f(x,y) = x^2 + y^2 \\
x + y = 2 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

On prend $x_0 = (2,2)$, $\rho_0 = \mu_0 = 5$, $\beta = 5$, $\varepsilon = 0{,}1$.

1. Formuler la fonction pénalisée externe $\phi(x,y,\rho,\mu)$.
2. Minimiser $\phi$ et trouver $(x_1,y_1)$.
3. Mettre à jour $\rho_1,\mu_1$ et vérifier la condition d'arrêt.
4. Si nécessaire, faire une deuxième itération.
5. Donner l'optimum et sa nature.

### Exercice B

Soit

$$
\begin{cases}
f(x,y) = (x-1)^2 + (y-1)^2 \\
x - y = 0
\end{cases}
$$

On prend $x_0 = (2,0)$, $\rho_0 = \mu_0 = 10$, $\beta = 10$, $\varepsilon = 0{,}1$.

1. Écrire la fonction pénalisée.
2. Faire une itération et donner $(x_1,y_1)$.
3. Vérifier l'arrêt ; sinon continuer.
4. Conclure sur l'optimum.

---

## 6. Pénalisation intérieure (barrière logarithmique)

### Exercice A

Soit

$$
\begin{cases}
f(x) = (x-4)^2 \\
g(x) = -x < 0
\end{cases}
$$

On prend $\lambda_0 = 1$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire $B_{\lambda_k}(x)$.
2. Pour $k=0$, calculer $x_1$ minimisant $B_{\lambda_0}(x)$.
3. Vérifier la condition d'arrêt.
4. Passer à $k=1$ : écrire $B_{\lambda_1}(x)$, calculer $x_2$.
5. Conclure sur la convergence.

### Exercice B

Soit

$$
\begin{cases}
f(x) = (x-2)^2 \\
g(x) = 1 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 2$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire la barrière logarithmique.
2. Calculer $x_1$ pour $k=0$.
3. Vérifier l'arrêt ; sinon calculer $x_2$.
4. Conclure.

---

## 7. Méthode du simplexe

### Exercice A

Soit le problème

$$
\begin{cases}
\max Z = 3x + 2y \\
x + y \le 4 \\
x + 2y \le 6 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Mettre sous forme standard.
2. Construire le tableau initial.
3. Appliquer le simplexe : variable entrante, variable sortante, pivotage.
4. Donner la solution optimale et $Z_{\max}$.

### Exercice B

Soit

$$
\begin{cases}
\max Z = 4x + 3y \\
2x + y \le 8 \\
x + 2y \le 8 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations du simplexe.
4. Solution optimale et valeur maximale.

---

## 8. Méthode graphique

### Exercice A

Maximiser

$Z = 4x + 5y$

sous

$$
\begin{cases}
x + y \le 6 \\
2x + y \le 8 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Représenter graphiquement la région admissible.
2. Déterminer les sommets.
3. Calculer $Z$ en chaque sommet.
4. Donner la solution optimale.
5. Justifier pourquoi l'optimum est en un sommet.

### Exercice B

Minimiser

$Z = 2x + 3y$

sous

$$
\begin{cases}
x + y \ge 4 \\
x + 2y \ge 6 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Tracer la région admissible.
2. Trouver les sommets.
3. Évaluer $Z$ en chaque sommet.
4. Donner la solution optimale.

---

## 9. Hill Climbing (taquin)

### Exercice A

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 0 & 6 \\
7 & 5 & 8
\end{bmatrix}
$$

État but :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 0
\end{bmatrix}
$$

Heuristique : nombre de tuiles mal placées (hors 0).

1. Calculer $H$ de l'état initial.
2. Générer les voisins possibles de la case vide.
3. Calculer $H$ pour chaque voisin.
4. Choisir le meilleur voisin et avancer.
5. Répéter jusqu'à atteindre le but ou un optimum local.

Remplir le tableau :

| Étape | État courant | H | Voisins (H) | Meilleur | Décision |
|-------|-------------|---|-------------|----------|----------|
| 0 | ... | ... | ... | ... | ... |

### Exercice B

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
0 & 4 & 6 \\
7 & 5 & 8
\end{bmatrix}
$$

Même état but et même heuristique.

1. Appliquer Hill Climbing étape par étape.
2. Remplir le tableau de résolution.
3. Conclure : but atteint ou optimum local ?

---

## 10. Méthode de Taylor (ordre 1 et 2)

### Exercice A

Soit $f(x) = e^x$ au voisinage de $a = 0$.

1. Écrire le développement de Taylor d'ordre 1.
2. Écrire le développement de Taylor d'ordre 2.
3. Approximer $f(0{,}1)$ avec les deux ordres et comparer à la valeur exacte.

### Exercice B

Soit $f(x) = \ln(1+x)$ au voisinage de $a = 0$.

1. Donner Taylor ordre 1 et ordre 2.
2. Approximer $\ln(1{,}2)$ et comparer à la valeur exacte.
3. Conclure sur l'amélioration de l'approximation.

---

## 11. Décomposition de Cholesky

### Exercice A

Soit

$A = \begin{pmatrix} 9 & 3 & 3 \\ 3 & 5 & 1 \\ 3 & 1 & 5 \end{pmatrix}$

1. Vérifier que $A$ est symétrique définie positive.
2. Calculer $L$ telle que $A = LL^T$.
3. Résoudre $Ax = b$ avec $b = (12, 8, 8)^T$.

### Exercice B

Soit

$A = \begin{pmatrix} 4 & 2 & 2 \\ 2 & 5 & 1 \\ 2 & 1 & 5 \end{pmatrix}$

1. Calculer la décomposition de Cholesky $A = LL^T$.
2. Résoudre $Ax = b$ avec $b = (8, 8, 8)^T$.

---

## 12. Gradient conjugué

### Exercice A

Soit

$f(x,y) = \frac12(x^2 + 4y^2) - 2x - 4y + 5$

On part de $x_0 = (0,0)$.

1. Écrire $A$, $b$, $c$.
2. Calculer $g_0$, $d_0$.
3. Effectuer la première itération : $\alpha_0$, $x_1$, $g_1$, $\beta_0$, $d_1$.
4. Effectuer la deuxième itération.
5. Conclure.

### Exercice B

Soit

$f(x,y) = \frac12(2x^2 + 2y^2) - 4x - 6y$

On part de $x_0 = (1,1)$.

1. Identifier $A$ et $b$.
2. Appliquer deux itérations du gradient conjugué.
3. Vérifier la convergence.

---

## 13. SQP (Sequential Quadratic Programming)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + y = 2
\end{cases}
$$

On part de $(x_0,y_0) = (2,0)$, $B_0 = I$.

1. Linéariser la contrainte en $(x_0,y_0)$.
2. Écrire le sous-problème quadratique.
3. Résoudre pour obtenir $d_0$.
4. Mettre à jour $x_1 = x_0 + d_0$.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y-2)^2 \\
x - y = 0
\end{cases}
$$

On part de $(x_0,y_0) = (0,0)$, $B_0 = I$.

1. Écrire le sous-problème quadratique.
2. Résoudre et donner $x_1$.
3. Faire une deuxième itération si nécessaire.

---

## 14. Programmation linéaire (forme générale)

### Exercice A

Mettre sous forme standard :

$$
\begin{cases}
\max Z = 5x + 4y \\
2x + y \le 10 \\
x + 3y \le 12 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Ajouter les variables d'écart.
2. Identifier les variables de décision et les variables d'écart.
3. Donner la forme standard complète.

### Exercice B

Mettre sous forme standard :

$$
\begin{cases}
\min Z = 3x + 2y \\
x + y \ge 4 \\
2x + y \ge 5 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Transformer les inégalités $\ge$ en égalités.
2. Donner la forme standard.

---

## 15. Fonction quadratique

### Exercice A

Soit

$f(x,y) = 2x^2 + 3y^2 + 2xy - 4x + 6y + 1$

1. Écrire $f$ sous la forme $\frac12 x^T A x + b^T x + c$.
2. Donner $A$, $b$, $c$.
3. Calculer $\nabla f$ et $H_f$.
4. Trouver le point critique $x^* = -A^{-1}b$.
5. Donner la nature de ce point.

### Exercice B

Soit

$f(x,y) = x^2 + 2y^2 - 2xy + 4x - 2y$

1. Identifier $A$, $b$, $c$.
2. Calculer le point critique.
3. Étudier la nature de ce point via la Hessienne.

---

## 16. Hessienne bordée

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
g(x,y) = x + y - 2 = 0
\end{cases}
$$

1. Écrire le Lagrangien.
2. Calculer la Hessienne bordée $H_B$.
3. Étudier le signe des mineurs.
4. Conclure sur la nature du point critique.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = xy \\
g(x,y) = x + y - 4 = 0
\end{cases}
$$

1. Écrire $L(x,y,\lambda)$.
2. Calculer $H_B$.
3. Déterminer la nature du point critique.

---

## 17. Jacobienne des contraintes

### Exercice A

Soient

$g_1(x,y) = x^2 + y^2 - 1$

$g_2(x,y) = x - y$

1. Calculer la Jacobienne $J_g$.
2. Évaluer $J_g$ au point $(1,0)$.
3. Donner le rang de $J_g$ en ce point.

### Exercice B

Soient

$g_1(x,y,z) = x + y + z - 3$

$g_2(x,y,z) = x^2 + y^2 - z$

1. Calculer $J_g$.
2. Évaluer au point $(1,1,1)$.
3. Conclure sur la qualification des contraintes.

---

## 18. KKT (contraintes d'inégalité)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + y \ge 2 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Écrire le Lagrangien avec les multiplicateurs $\mu$.
2. Écrire les conditions KKT.
3. Discuter les cas de complémentarité.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = x + y \\
x^2 + y^2 \le 1
\end{cases}
$$

1. Écrire le Lagrangien.
2. Écrire les conditions KKT.
3. Résoudre et donner l'optimum.

---

## 19. Mélange égalités + inégalités (KKT)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + y = 2 \\
x \le 1
\end{cases}
$$

1. Écrire le Lagrangien $L(x,y,\lambda,\mu)$.
2. Écrire les conditions KKT.
3. Discuter les cas : contrainte active/inactive.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = xy \\
x + y = 4 \\
x \le 3
\end{cases}
$$

1. Écrire le Lagrangien.
2. Conditions KKT.
3. Résoudre et conclure.

---

## 20. Dichotomie (recherche de zéro)

### Exercice A

Soit

$f(x) = x^3 - x - 2$

sur $[1,2]$, avec $\varepsilon = 0{,}05$.

1. Vérifier que $f(1)f(2) < 0$.
2. Appliquer la dichotomie : calculer $m$, mettre à jour $a$ ou $b$.
3. Continuer jusqu'à $b-a < \varepsilon$.
4. Donner une approximation de la racine.

### Exercice B

Soit

$f(x) = e^x - 3x$

sur $[0,1]$, avec $\varepsilon = 0{,}05$.

1. Vérifier le changement de signe.
2. Appliquer la dichotomie.
3. Donner une approximation du zéro.

---

## 21. Quasi-Newton (BFGS / DFP)

### Exercice A

Soit

$f(x,y) = x^2 + 2y^2 - 2x - 4y$

On part de $x_0 = (0,0)$, $B_0 = I$.

1. Calculer $\nabla f(x_0)$.
2. Mettre à jour $x_1 = x_0 - B_0^{-1}\nabla f(x_0)$.
3. Calculer $s_0 = x_1 - x_0$, $y_0 = \nabla f(x_1) - \nabla f(x_0)$.
4. Appliquer la formule BFGS pour obtenir $B_1$.
5. Faire une deuxième itération.

### Exercice B

Soit

$f(x,y) = x^2 + y^2 + xy - 3x$

On part de $x_0 = (1,1)$, $B_0 = I$.

1. Calculer $\nabla f(x_0)$ et $x_1$.
2. Calculer $s_0$, $y_0$.
3. Mettre à jour $B_1$ (BFGS ou DFP).
4. Conclure sur la convergence.

---

## 22. Barrière logarithmique (point intérieur)

### Exercice A

Soit

$$
\begin{cases}
\min f(x) = (x-5)^2 \\
g(x) = 2 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 1$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire $B_{\lambda_k}(x)$.
2. Pour $k=0$, calculer $x_1$.
3. Vérifier l'arrêt ; sinon calculer $x_2$.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x) = (x-1)^2 \\
g(x) = -x < 0
\end{cases}
$$

On prend $\lambda_0 = 2$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire la barrière.
2. Calculer $x_1$, $x_2$.
3. Conclure sur la convergence.

---

## 23. Pas optimal (gradient à pas optimal)

### Exercice A

Soit

$f(x,y) = \frac12(x^2 + 4y^2) - 2x$

On part de $x_0 = (0,0)$.

1. Calculer $g_0 = \nabla f(x_0)$.
2. Écrire $\Phi(\alpha) = f(x_0 - \alpha g_0)$.
3. Calculer $\alpha_0^*$ en résolvant $\Phi'(\alpha) = 0$.
4. Donner $x_1$.
5. Faire une deuxième itération.

### Exercice B

Soit

$f(x,y) = x^2 + 2y^2 - 4x - 8y$

On part de $x_0 = (1,1)$.

1. Calculer $\nabla f(x_0)$.
2. Trouver le pas optimal $\alpha_0^*$.
3. Donner $x_1$ et vérifier la convergence.

---

## 24. Gradient conjugué (fonction quadratique)

### Exercice A

Soit

$f(x,y) = \frac12(4x^2 + 2y^2) - 4x - 2y$

On part de $x_0 = (0,0)$.

1. Identifier $A$ et $b$.
2. Calculer $g_0$, $d_0$.
3. Effectuer deux itérations du gradient conjugué.
4. Conclure.

### Exercice B

Soit

$f(x,y) = \frac12(x^2 + y^2) - 2x - 2y$

On part de $x_0 = (1,1)$.

1. Écrire $A$, $b$.
2. Appliquer le gradient conjugué.
3. Vérifier la convergence en deux itérations.

---

## 25. Simplexe (minimisation)

### Exercice A

Soit

$$
\begin{cases}
\min Z = 2x + 3y \\
x + y \ge 4 \\
x + 2y \ge 6 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Mettre sous forme standard (variables d'écart et variables artificielles si nécessaire).
2. Construire le tableau initial.
3. Appliquer le simplexe.
4. Donner la solution optimale.

### Exercice B

Soit

$$
\begin{cases}
\min Z = 3x + 2y \\
2x + y \ge 8 \\
x + y \ge 5 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations du simplexe.
4. Solution optimale.

---

## 26. Taylor (ordre 2) et optimisation

### Exercice A

Soit

$f(x) = x^3 - 3x^2 + 2x + 1$

au voisinage de $a = 1$.

1. Calculer $f'(x)$ et $f''(x)$.
2. Écrire Taylor ordre 1 et ordre 2 en $a=1$.
3. Approximer $f(1{,}1)$ et comparer à la valeur exacte.
4. Utiliser Taylor ordre 2 pour étudier la nature du point $x=1$.

### Exercice B

Soit

$f(x,y) = x^2 + y^2 - 2x - 4y + 5$

au voisinage de $(1,2)$.

1. Calculer $\nabla f$ et $H_f$.
2. Écrire Taylor ordre 2 en $(1,2)$.
3. Conclure sur la nature du point $(1,2)$.

---

## 27. Cholesky et résolution de système

### Exercice A

Soit

$A = \begin{pmatrix} 16 & 4 & 8 \\ 4 & 5 & 1 \\ 8 & 1 & 14 \end{pmatrix}$

1. Vérifier que $A$ est symétrique définie positive.
2. Calculer $L$ (Cholesky).
3. Résoudre $Ax = b$ avec $b = (28, 10, 23)^T$.

### Exercice B

Soit

$A = \begin{pmatrix} 25 & 5 & 10 \\ 5 & 2 & 1 \\ 10 & 1 & 5 \end{pmatrix}$

1. Calculer $L$ telle que $A = LL^T$.
2. Résoudre $Ax = b$ avec $b = (40, 8, 16)^T$.

---

## 28. Hill Climbing (variante)

### Exercice A

État initial :

$$
\begin{bmatrix}
2 & 1 & 3 \\
4 & 5 & 6 \\
7 & 0 & 8
\end{bmatrix}
$$

État but :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 0
\end{bmatrix}
$$

Heuristique : tuiles mal placées (hors 0).

1. Calculer $H$ initial.
2. Générer les voisins.
3. Appliquer Hill Climbing.
4. Remplir le tableau et conclure.

### Exercice B

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 6 & 0 \\
7 & 5 & 8
\end{bmatrix}
$$

Même but, même heuristique.

1. Appliquer Hill Climbing.
2. Remplir le tableau.
3. Conclure : but atteint ou optimum local ?

---

## 29. Pénalisation extérieure (égalité + inégalité)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + y = 2 \\
x \ge 0
\end{cases}
$$

On prend $x_0 = (1,1)$, $\rho_0 = \mu_0 = 10$, $\beta = 10$, $\varepsilon = 0{,}1$.

1. Écrire $\phi(x,y,\rho,\mu)$.
2. Minimiser $\phi$ et donner $(x_1,y_1)$.
3. Mettre à jour $\rho_1,\mu_1$.
4. Vérifier l'arrêt.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-2)^2 + (y-2)^2 \\
x - y = 0 \\
y \ge 0
\end{cases}
$$

On prend $x_0 = (3,1)$, $\rho_0 = \mu_0 = 5$, $\beta = 5$, $\varepsilon = 0{,}1$.

1. Formuler la pénalité.
2. Faire une itération.
3. Vérifier l'arrêt ; sinon continuer.
4. Conclure.

---

## 30. Méthode graphique (minimisation)

### Exercice A

Minimiser

$Z = 3x + 2y$

sous

$$
\begin{cases}
x + y \ge 3 \\
2x + y \ge 4 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Tracer la région admissible.
2. Déterminer les sommets.
3. Calculer $Z$ en chaque sommet.
4. Donner la solution optimale.
5. Justifier.

### Exercice B

Minimiser

$Z = x + 4y$

sous

$$
\begin{cases}
x + y \ge 2 \\
x + 2y \ge 3 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Représenter graphiquement.
2. Trouver les sommets.
3. Évaluer $Z$.
4. Donner l'optimum.

---

## 31. SQP (deuxième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + 2y^2 \\
x + y = 3
\end{cases}
$$

On part de $(x_0,y_0) = (2,1)$, $B_0 = I$.

1. Linéariser la contrainte.
2. Écrire le sous-problème quadratique.
3. Résoudre pour $d_0$.
4. Mettre à jour $x_1$.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y-1)^2 \\
x + 2y = 4
\end{cases}
$$

On part de $(x_0,y_0) = (0,0)$, $B_0 = I$.

1. Écrire le sous-problème quadratique.
2. Résoudre et donner $x_1$.
3. Faire une deuxième itération.

---

## 32. KKT (contraintes multiples)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + y \ge 2 \\
x \le 1
\end{cases}
$$

1. Écrire le Lagrangien avec $\mu_1,\mu_2$.
2. Écrire les conditions KKT.
3. Discuter les cas de complémentarité.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = x + 2y \\
x + y \le 3 \\
x \le 2 \\
y \le 2
\end{cases}
$$

1. Écrire le Lagrangien.
2. Conditions KKT.
3. Résoudre et conclure.

---

## 33. Nombre d'or (deuxième variante)

### Exercice A

Soit

$f(x) = x^2 - 4x + 5$

sur $[0, 3]$, arrêt si $b-a < 0{,}1$.

1. Appliquer la méthode du nombre d'or.
2. Donner l'estimation du minimum.
3. Vérifier la valeur exacte.

### Exercice B

Soit

$f(x) = (x-1)^2 + 2$

sur $[-1, 3]$, arrêt si $b-a < 0{,}1$.

1. Appliquer la méthode.
2. Donner l'estimation du minimum.

---

## 34. Gradient à pas fixe (troisième variante)

### Exercice A

Soit

$f(x,y) = x^2 + y^2 - 4x - 6y$

On prend $\alpha = 0{,}3$, $x_0 = (0,0)$, $\varepsilon = 0{,}1$.

1. Calculer $\nabla f$ et $H_f$.
2. Faire deux itérations.
3. Vérifier l'arrêt.
4. Conclure.

### Exercice B

Soit

$f(x,y) = 2x^2 + y^2 - 4x + 2y$

On prend $\alpha = 0{,}2$, $x_0 = (1,1)$, $\varepsilon = 0{,}1$.

1. Calculer le gradient.
2. Faire deux itérations.
3. Conclure sur la convergence.

---

## 35. Newton (systèmes et optimisation)

### Exercice A

Soit

$f(x,y) = x^2 + y^2 - 2x - 4y + 5$

On part de $(x_0,y_0) = (0,0)$.

1. Calculer $\nabla f$ et $H_f$.
2. Appliquer Newton : $x_1 = x_0 - H_f^{-1}\nabla f$.
3. Vérifier que $x_1$ est l'optimum exact.
4. Conclure.

### Exercice B

Soit

$f(x,y) = 3x^2 + 2y^2 - 2xy - 6x + 4y$

On part de $(x_0,y_0) = (1,1)$.

1. Calculer $\nabla f$ et $H_f$.
2. Appliquer deux itérations de Newton.
3. Conclure.

---

## 36. Simplexe (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\max Z = 5x + 4y \\
2x + y \le 10 \\
x + 3y \le 12 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations.
4. Solution optimale.

### Exercice B

Soit

$$
\begin{cases}
\max Z = 6x + 5y \\
2x + y \le 12 \\
x + 2y \le 10 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Mettre sous forme standard.
2. Tableau initial.
3. Appliquer le simplexe.
4. Donner $Z_{\max}$.

---

## 37. Lagrange (deuxième variante)

### Exercice A

Maximiser

$f(x,y) = x + 2y$

sous

$x^2 + y^2 = 5$

1. Écrire le Lagrangien.
2. Trouver les points critiques.
3. Déterminer leur nature.
4. Donner l'optimum global.

### Exercice B

Minimiser

$f(x,y) = x^2 + y^2$

sous

$x + 2y = 5$

1. Lagrangien.
2. Points critiques.
3. Nature.
4. Optimum.

---

## 38. Pénalisation intérieure (deuxième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x) = (x-6)^2 \\
g(x) = 2 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 1$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire $B_{\lambda_k}(x)$.
2. Calculer $x_1$ pour $k=0$.
3. Vérifier l'arrêt ; sinon $x_2$.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x) = (x-3)^2 \\
g(x) = 1 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 2$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Barrière logarithmique.
2. Calculer $x_1$, $x_2$.
3. Conclure.

---

## 39. Hessienne bordée (deuxième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + 2y^2 \\
x + y = 3
\end{cases}
$$

1. Lagrangien.
2. Hessienne bordée.
3. Étudier les mineurs.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = x^2 + y^2 \\
x + y = 2
\end{cases}
$$

1. Lagrangien.
2. $H_B$.
3. Nature du point critique.

---

## 40. Programmation linéaire (forme standard)

### Exercice A

Mettre sous forme standard :

$$
\begin{cases}
\max Z = 4x + 3y \\
x + y \le 5 \\
2x + y \le 8 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Ajouter les variables d'écart.
2. Donner la forme standard.
3. Identifier les variables de base initiales.

### Exercice B

Mettre sous forme standard :

$$
\begin{cases}
\min Z = 2x + 5y \\
x + y \ge 3 \\
x + 2y \ge 4 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Transformer les inégalités.
2. Donner la forme standard.

---

## 41. Gradient conjugué (troisième variante)

### Exercice A

Soit

$f(x,y) = \frac12(3x^2 + 5y^2) - 6x - 10y$

On part de $x_0 = (0,0)$.

1. Identifier $A$, $b$.
2. Calculer $g_0$, $d_0$.
3. Effectuer deux itérations.
4. Conclure.

### Exercice B

Soit

$f(x,y) = \frac12(2x^2 + 8y^2) - 4x - 16y$

On part de $x_0 = (1,1)$.

1. Écrire $A$, $b$.
2. Appliquer le gradient conjugué.
3. Vérifier la convergence.

---

## 42. Quasi-Newton (deuxième variante)

### Exercice A

Soit

$f(x,y) = x^2 + 4y^2 - 2x - 8y$

On part de $x_0 = (0,0)$, $B_0 = I$.

1. Calculer $\nabla f(x_0)$.
2. Donner $x_1$.
3. Calculer $s_0$, $y_0$.
4. Mettre à jour $B_1$ (BFGS).
5. Faire une deuxième itération.

### Exercice B

Soit

$f(x,y) = 2x^2 + y^2 - 4x - 2y$

On part de $x_0 = (1,1)$, $B_0 = I$.

1. Calculer $x_1$.
2. Calculer $s_0$, $y_0$.
3. Mettre à jour $B_1$.
4. Conclure.

---

## 43. KKT (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y-1)^2 \\
x + y \le 1 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Écrire le Lagrangien.
2. Conditions KKT.
3. Discuter les cas.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = 2x + y \\
x + y \le 2 \\
x \le 1 \\
y \le 1
\end{cases}
$$

1. Lagrangien.
2. KKT.
3. Résoudre.

---

## 44. Nombre d'or (troisième variante)

### Exercice A

Soit

$f(x) = e^x - 2x$

sur $[0, 2]$, arrêt si $b-a < 0{,}1$.

1. Appliquer le nombre d'or.
2. Donner l'estimation du minimum.
3. Comparer avec la valeur exacte $x = \ln 2$.

### Exercice B

Soit

$f(x) = x^2 - 2x + 3$

sur $[-1, 3]$, arrêt si $b-a < 0{,}1$.

1. Appliquer la méthode.
2. Donner le minimum estimé.

---

## 45. Simplexe (quatrième variante)

### Exercice A

Soit

$$
\begin{cases}
\max Z = 7x + 5y \\
3x + y \le 15 \\
x + 2y \le 10 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations.
4. Solution optimale.

### Exercice B

Soit

$$
\begin{cases}
\max Z = 4x + 6y \\
2x + 3y \le 18 \\
x + y \le 8 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Simplexe.
4. Donner $Z_{\max}$.

---

## 46. Newton (troisième variante)

### Exercice A

Soit

$f(x,y) = x^2 + 3y^2 - 2xy - 4x + 2y$

On part de $(0,0)$.

1. Calculer $\nabla f$ et $H_f$.
2. Appliquer Newton (deux itérations).
3. Conclure.

### Exercice B

Soit

$f(x,y) = 2x^2 + 2y^2 + 2xy - 6x - 6y$

On part de $(1,1)$.

1. Calculer $\nabla f$, $H_f$.
2. Appliquer Newton.
3. Conclure sur la convergence.

---

## 47. Pénalisation extérieure (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
x + 2y = 3 \\
x \ge 0
\end{cases}
$$

On prend $x_0 = (2,1)$, $\rho_0 = \mu_0 = 10$, $\beta = 10$, $\varepsilon = 0{,}1$.

1. Écrire $\phi$.
2. Minimiser et donner $(x_1,y_1)$.
3. Mettre à jour les pénalités.
4. Vérifier l'arrêt.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y-2)^2 \\
x + y = 3 \\
y \ge 0
\end{cases}
$$

On prend $x_0 = (2,2)$, $\rho_0 = \mu_0 = 5$, $\beta = 5$, $\varepsilon = 0{,}1$.

1. Formuler la pénalité.
2. Faire une itération.
3. Vérifier l'arrêt ; sinon continuer.
4. Conclure.

---

## 48. Hill Climbing (troisième variante)

### Exercice A

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
5 & 6 & 0 \\
4 & 7 & 8
\end{bmatrix}
$$

État but :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 0
\end{bmatrix}
$$

Heuristique : tuiles mal placées (hors 0).

1. Calculer $H$ initial.
2. Générer les voisins.
3. Appliquer Hill Climbing.
4. Remplir le tableau et conclure.

### Exercice B

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 0 & 5 \\
6 & 7 & 8
\end{bmatrix}
$$

Même but, même heuristique.

1. Appliquer Hill Climbing.
2. Remplir le tableau.
3. Conclure : but atteint ou optimum local ?

---

## 49. Méthode graphique (troisième variante)

### Exercice A

Maximiser

$Z = 6x + 5y$

sous

$$
\begin{cases}
x + y \le 5 \\
2x + y \le 8 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Représenter graphiquement.
2. Déterminer les sommets.
3. Calculer $Z$ en chaque sommet.
4. Donner la solution optimale.
5. Justifier.

### Exercice B

Minimiser

$Z = 4x + 3y$

sous

$$
\begin{cases}
x + y \ge 3 \\
2x + y \ge 5 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Tracer la région admissible.
2. Trouver les sommets.
3. Évaluer $Z$.
4. Donner l'optimum.

---

## 50. Cholesky (deuxième variante)

### Exercice A

Soit

$A = \begin{pmatrix} 4 & 2 & 2 \\ 2 & 10 & 2 \\ 2 & 2 & 5 \end{pmatrix}$

1. Vérifier que $A$ est symétrique définie positive.
2. Calculer $L$ (Cholesky).
3. Résoudre $Ax = b$ avec $b = (8, 14, 9)^T$.

### Exercice B

Soit

$A = \begin{pmatrix} 9 & 3 & 3 \\ 3 & 10 & 2 \\ 3 & 2 & 6 \end{pmatrix}$

1. Calculer $L$ telle que $A = LL^T$.
2. Résoudre $Ax = b$ avec $b = (15, 15, 11)^T$.

---

## 51. SQP (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + 2y^2 - 2x \\
x + y = 2
\end{cases}
$$

On part de $(x_0,y_0) = (1,1)$, $B_0 = I$.

1. Linéariser la contrainte.
2. Écrire le sous-problème quadratique.
3. Résoudre pour $d_0$.
4. Mettre à jour $x_1$.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-2)^2 + (y-1)^2 \\
x - y = 0
\end{cases}
$$

On part de $(x_0,y_0) = (0,0)$, $B_0 = I$.

1. Sous-problème quadratique.
2. Résoudre et donner $x_1$.
3. Deuxième itération si nécessaire.

---

## 52. Pas optimal (deuxième variante)

### Exercice A

Soit

$f(x,y) = \frac12(2x^2 + y^2) - 2x - y$

On part de $x_0 = (0,0)$.

1. Calculer $\nabla f(x_0)$.
2. Écrire $\Phi(\alpha)$.
3. Trouver $\alpha_0^*$.
4. Donner $x_1$.
5. Faire une deuxième itération.

### Exercice B

Soit

$f(x,y) = x^2 + 3y^2 - 4x - 6y$

On part de $x_0 = (1,1)$.

1. Calculer $\nabla f(x_0)$.
2. Trouver le pas optimal.
3. Donner $x_1$.
4. Vérifier la convergence.

---

## 53. Jacobienne (deuxième variante)

### Exercice A

Soient

$g_1(x,y,z) = x^2 + y^2 + z^2 - 3$

$g_2(x,y,z) = x + y - z$

1. Calculer $J_g$.
2. Évaluer au point $(1,1,1)$.
3. Donner le rang.

### Exercice B

Soient

$g_1(x,y) = x^2 - y$

$g_2(x,y) = x + y^2$

1. Calculer $J_g$.
2. Évaluer au point $(1,1)$.
3. Conclure.

---

## 54. Barrière logarithmique (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x) = (x-5)^2 \\
g(x) = 3 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 1$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire $B_{\lambda_k}(x)$.
2. Calculer $x_1$ pour $k=0$.
3. Vérifier l'arrêt ; sinon $x_2$.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x) = (x-4)^2 \\
g(x) = 1 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 2$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Barrière logarithmique.
2. Calculer $x_1$, $x_2$.
3. Conclure.

---

## 55. Dichotomie (deuxième variante)

### Exercice A

Soit

$f(x) = x^3 - 2x - 5$

sur $[2,3]$, $\varepsilon = 0{,}05$.

1. Vérifier $f(2)f(3) < 0$.
2. Appliquer la dichotomie.
3. Donner une approximation de la racine.

### Exercice B

Soit

$f(x) = \cos x - x$

sur $[0,1]$, $\varepsilon = 0{,}05$.

1. Vérifier le changement de signe.
2. Appliquer la dichotomie.
3. Donner une approximation du zéro.

---

## 56. KKT (quatrième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
2x + y \ge 4 \\
x + y \ge 3
\end{cases}
$$

1. Écrire le Lagrangien.
2. Conditions KKT.
3. Discuter les cas.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = 3x + 2y \\
x + y \le 4 \\
2x + y \le 6 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Lagrangien.
2. KKT.
3. Résoudre.

---

## 57. Gradient à pas fixe (quatrième variante)

### Exercice A

Soit

$f(x,y) = x^2 + 2y^2 - 2x - 8y$

On prend $\alpha = 0{,}25$, $x_0 = (0,0)$, $\varepsilon = 0{,}1$.

1. Calculer $\nabla f$ et $H_f$.
2. Faire deux itérations.
3. Vérifier l'arrêt.
4. Conclure.

### Exercice B

Soit

$f(x,y) = 4x^2 + y^2 - 8x - 2y$

On prend $\alpha = 0{,}2$, $x_0 = (1,1)$, $\varepsilon = 0{,}1$.

1. Calculer le gradient.
2. Faire deux itérations.
3. Conclure.

---

## 58. Lagrange (troisième variante)

### Exercice A

Maximiser

$f(x,y) = 3x + 4y$

sous

$x^2 + y^2 = 25$

1. Lagrangien.
2. Points critiques.
3. Nature.
4. Optimum global.

### Exercice B

Minimiser

$f(x,y) = x^2 + 4y^2$

sous

$x + y = 5$

1. Lagrangien.
2. Points critiques.
3. Nature.
4. Optimum.

---

## 59. Simplexe (cinquième variante)

### Exercice A

Soit

$$
\begin{cases}
\max Z = 8x + 6y \\
4x + 2y \le 20 \\
2x + 3y \le 18 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations.
4. Solution optimale.

### Exercice B

Soit

$$
\begin{cases}
\max Z = 5x + 7y \\
2x + 3y \le 15 \\
3x + 2y \le 16 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Simplexe.
4. Donner $Z_{\max}$.

---

## 60. Newton (quatrième variante)

### Exercice A

Soit

$f(x,y) = x^2 + y^2 + 4xy - 6x - 6y$

On part de $(0,0)$.

1. Calculer $\nabla f$ et $H_f$.
2. Appliquer Newton.
3. Conclure sur la nature du point.

### Exercice B

Soit

$f(x,y) = 2x^2 + 3y^2 - 2xy - 8x + 2y$

On part de $(1,1)$.

1. Calculer $\nabla f$, $H_f$.
2. Appliquer Newton (deux itérations).
3. Conclure.

---

## 61. Pénalisation intérieure (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x) = (x-7)^2 \\
g(x) = 2 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 1$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Écrire $B_{\lambda_k}(x)$.
2. Calculer $x_1$.
3. Vérifier l'arrêt ; sinon $x_2$.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x) = (x-2)^2 \\
g(x) = 3 - x < 0
\end{cases}
$$

On prend $\lambda_0 = 2$, $\beta = 0{,}5$, $\varepsilon = 0{,}2$.

1. Barrière.
2. Calculer $x_1$, $x_2$.
3. Conclure.

---

## 62. Hessienne bordée (troisième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = 2x^2 + y^2 \\
x + 2y = 4
\end{cases}
$$

1. Lagrangien.
2. Hessienne bordée.
3. Étudier les mineurs.
4. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = xy \\
x + y = 6
\end{cases}
$$

1. Lagrangien.
2. $H_B$.
3. Nature du point critique.

---

## 63. Nombre d'or (quatrième variante)

### Exercice A

Soit

$f(x) = x^3 - 3x + 1$

sur $[0, 2]$, arrêt si $b-a < 0{,}1$.

1. Appliquer le nombre d'or.
2. Donner l'estimation du minimum.

### Exercice B

Soit

$f(x) = x^4 - 4x^2 + 2$

sur $[0, 2]$, arrêt si $b-a < 0{,}1$.

1. Appliquer la méthode.
2. Donner le minimum estimé.

---

## 64. Gradient conjugué (quatrième variante)

### Exercice A

Soit

$f(x,y) = \frac12(5x^2 + 3y^2) - 10x - 6y$

On part de $x_0 = (0,0)$.

1. Identifier $A$, $b$.
2. Calculer $g_0$, $d_0$.
3. Deux itérations.
4. Conclure.

### Exercice B

Soit

$f(x,y) = \frac12(4x^2 + 6y^2) - 8x - 12y$

On part de $x_0 = (1,1)$.

1. Écrire $A$, $b$.
2. Appliquer le gradient conjugué.
3. Vérifier la convergence.

---

## 65. Hill Climbing (quatrième variante)

### Exercice A

État initial :

$$
\begin{bmatrix}
2 & 1 & 3 \\
4 & 5 & 6 \\
0 & 7 & 8
\end{bmatrix}
$$

État but :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 0
\end{bmatrix}
$$

Heuristique : tuiles mal placées (hors 0).

1. Calculer $H$ initial.
2. Générer les voisins.
3. Appliquer Hill Climbing.
4. Remplir le tableau et conclure.

### Exercice B

État initial :

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 0 \\
7 & 8 & 6
\end{bmatrix}
$$

Même but, même heuristique.

1. Appliquer Hill Climbing.
2. Remplir le tableau.
3. Conclure.

---

## 66. Quasi-Newton (troisième variante)

### Exercice A

Soit

$f(x,y) = x^2 + 2y^2 - 2x - 4y$

On part de $x_0 = (0,0)$, $B_0 = I$.

1. Calculer $\nabla f(x_0)$.
2. Donner $x_1$.
3. Calculer $s_0$, $y_0$.
4. Mettre à jour $B_1$ (BFGS).
5. Deuxième itération.

### Exercice B

Soit

$f(x,y) = 3x^2 + y^2 - 6x - 2y$

On part de $x_0 = (1,1)$, $B_0 = I$.

1. Calculer $x_1$.
2. Calculer $s_0$, $y_0$.
3. Mettre à jour $B_1$.
4. Conclure.

---

## 67. KKT (cinquième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = (x-2)^2 + y^2 \\
x + y \ge 1 \\
x \le 3
\end{cases}
$$

1. Lagrangien.
2. Conditions KKT.
3. Discuter les cas.
4. Trouver l'optimum.

### Exercice B

Soit

$$
\begin{cases}
\max f(x,y) = 2x + 3y \\
x + y \le 5 \\
x \le 2 \\
y \le 2
\end{cases}
$$

1. Lagrangien.
2. KKT.
3. Résoudre.

---

## 68. SQP (quatrième variante)

### Exercice A

Soit

$$
\begin{cases}
\min f(x,y) = x^2 + y^2 + xy \\
x + y = 2
\end{cases}
$$

On part de $(x_0,y_0) = (1,1)$, $B_0 = I$.

1. Linéariser la contrainte.
2. Sous-problème quadratique.
3. Résoudre pour $d_0$.
4. Mettre à jour $x_1$.
5. Conclure.

### Exercice B

Soit

$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y+1)^2 \\
x - y = 0
\end{cases}
$$

On part de $(x_0,y_0) = (0,0)$, $B_0 = I$.

1. Sous-problème quadratique.
2. Résoudre et donner $x_1$.
3. Deuxième itération.

---

## 69. Pas optimal (troisième variante)

### Exercice A

Soit

$f(x,y) = \frac12(x^2 + 2y^2) - 3x - 4y$

On part de $x_0 = (0,0)$.

1. Calculer $\nabla f(x_0)$.
2. Écrire $\Phi(\alpha)$.
3. Trouver $\alpha_0^*$.
4. Donner $x_1$.
5. Deuxième itération.

### Exercice B

Soit

$f(x,y) = 2x^2 + y^2 - 8x - 4y$

On part de $x_0 = (1,1)$.

1. Calculer $\nabla f(x_0)$.
2. Trouver le pas optimal.
3. Donner $x_1$.
4. Vérifier la convergence.

---

## 70. Simplexe (sixième variante)

### Exercice A

Soit

$$
\begin{cases}
\max Z = 9x + 7y \\
3x + 2y \le 18 \\
2x + 3y \le 18 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Itérations.
4. Solution optimale.

### Exercice B

Soit

$$
\begin{cases}
\max Z = 6x + 8y \\
2x + 4y \le 16 \\
3x + 2y \le 12 \\
x \ge 0,\ y \ge 0
\end{cases}
$$

1. Forme standard.
2. Tableau initial.
3. Simplexe.
4. Donner $Z_{\max}$.

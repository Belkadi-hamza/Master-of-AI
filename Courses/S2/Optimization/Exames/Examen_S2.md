## CONTRÔLE SESSION 2
**Master DSBD/S2**
**Algorithmes d'optimisation**
**Pr. F. Benabbou**
**Durée : 2H**

### Exercice 1 (5 pts) : Méthode du gradient
Soit la fonction
$$f(x,y) = x^2 + y^2 + 2xy + 4x + 4y$$
on prendra $\alpha = 0,25$ et le critère d'arrêt : $\|f(x_{n+1}) - f(x_n)\| < \varepsilon = 0,1$.

1. Calculer le gradient $\nabla f(x,y)$.
2. Calculer la matrice Hessienne $Hf(x,y)$.
3. À partir du point initial $(x_0,y_0) = (0,0)$, effectuer la **première itération** de la méthode du gradient pour obtenir $(x_1,y_1)$.
4. En utilisant $(x_1,y_1)$, effectuer la **deuxième itération** pour trouver $(x_2,y_2)$.
5. Conclure sur la convergence de la méthode et la nature du point atteint.

### Exercice 2 (5 pts) : Méthode graphique
On souhaite maximiser la fonction $f(x,y) = 5x + 3y$ sous les contraintes :
$$
\begin{cases}
x + 2y \leq 12 \\
3x - y \leq 9 \\
x + y \geq 4 \\
x \geq 0 \\
y \geq 0
\end{cases}
$$

1. Représentez graphiquement la région admissible délimitée par les contraintes dans le plan $(x,y)$.
2. Déterminez les points d'intersection (sommets) de la région admissible.
3. Calculez la valeur de la fonction objectif $Z$ en chacun des sommets.
4. En déduire la solution optimale (valeurs de $x$ et $y$) et la valeur maximale de $Z$.
5. Justifiez pourquoi cette méthode donne toujours la solution optimale en un sommet de la région admissible.

### Exercice 3 (5 pts) : Méthode de pénalité extérieure
On cherche l'optimum par la méthode de pénalisation extérieure du problème suivant :
$$
\begin{cases}
f(x,y) = x^2 + y^2 \\
x - y = 0 \\
x \geq 0, y \geq 0
\end{cases}
$$

1. Formuler la fonction pénalisée externe $\phi(x,y,\rho,\mu)$ en prenant une pénalité quadratique pour les inégalités et l'égalité.
2. En prenant comme point initial $x_0 = [1.5, 1.0]$, $\rho_0 = \mu_0 = 10$, $\beta = 10$, $\varepsilon = 1e-1$. Minimiser $\phi(x,y,\rho,\mu)$ et trouver $(x_1,y_1)$, $\rho_1, \mu_1$.
3. Vérifier la condition d'arrêt si nécessaire faire la deuxième itération et donner $(x_2,y_2)$.
4. Si la condition d'arrêt est remplie donner l'optimum et dites sa nature : minimum, maximum, global, local ? Justifier.

### Exercice 4 (5 pts) : Heuristique Hill Climbing
On considère le jeu du taquin $3 \times 3$ suivant, où la case vide est notée $0$.

L'état initial est le suivant :
$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
0 & 7 & 8
\end{bmatrix}
$$
et l'état but est le suivant :
$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 0
\end{bmatrix}
$$

On souhaite appliquer la méthode Hill Climbing pour atteindre l'état but, en utilisant l'heuristique $H(n) =$ nombre de tuiles mal placées dans l'état $n$ (hors $0$) par rapport à l'état but. La case $0$ est la case vide où on peut déplacer la tuile.

1. Appliquer Hill Climbing en précisant à chaque étape les étapes de l'algorithme, répéter l'algorithme jusqu'à atteindre un état où aucun voisin n'a une meilleure heuristique que le but est atteint. (Remplir le tableau de résolution suivant).

| Étape | État courant | H de l'état courant | Voisins générés (mouvement $\rightarrow$ état $\rightarrow$ h) | Voisin choisi | H du voisin choisi |
| :---: | :---: | :---: | :--- | :---: | :---: |
| 0 | $(1,2,3,4,5,6,0,7,8)$ | | Voisin 1 : $h=7$,<br>Voisin 2 : $h=7$,... | | |

---

## Aide mémoire (Session 2)

### Algorithme 1 : Descente de gradient à pas fixe
1. **Initialisation** : $x_0 \in \mathbb{R}^n$, $f$ une fonction objectif de classe $C^1$ sur $\mathbb{R}^n$.
2. $k \leftarrow 0$, critère d'arrêt (tolérance sur le gradient, sur les variations ou l'écart).
3. **Répéter**
   a) Calculer la direction de descente $d_k = -\nabla f(x_k)$.
   b) Mettre à jour la solution : $x_{k+1} = x_k + \alpha d_k$.
   c) $k \leftarrow k+1$.
4. Jusqu'à Vérifier la condition d'arrêt : $\|f(x_{k+1}) - f(x_k)\| < \varepsilon$ ou $\|\nabla f(x_k)\| < \varepsilon$.
5. Retourner $x_k$.

### Algorithme 17 : Hill Climbing
1. **Initialisation**
   a) Générer une solution initiale $x_{current}$.
   b) Évaluer $f(x_{current})$.
2. **Répéter**
   a) Générer les voisins de $x_{current}$.
   b) Évaluer $f$ pour chaque voisin.
   c) Sélectionner le meilleur voisin $x_{next}$.
   d) Si $f(x_{next}) > f(x_{current})$ (pour une maximisation) alors $x_{current} \leftarrow x_{next}$.
   e) Sinon, sortir de la boucle.
3. **Jusqu'à** ce qu'aucun voisin n'améliore la solution.
4. Retourner $x_{current}$.

### Algorithme 11 : Pénalisation classique (externe)
* **Initialisation** : $\varepsilon > 0$, $k=0$, $\max\_iter$, $f, P_i, P_e \in \mathbb{R}$, $\rho$ paramètre de pénalité, $\mu$ paramètre de pénalité d'inégalité et égalité.
* **Répéter**
  a) Résoudre le problème sans contrainte (Newton, etc.) :
     $$ \min_x \left( f(x) + \rho_k \sum_{i=1}^p P_i(x) + \mu_k \sum_{j=1}^q P_e(x) \right) $$
  b) Mise à jour : $x_{k+1}$ est la solution approchée.
  c) Augmenter la pénalité : $\rho_{k+1} = \beta \rho_k, \mu_{k+1} = \beta \mu_k$.
  d) $k \leftarrow k+1$.
* **Jusqu'à** $\|f(x_{k+1}) - f(x_k)\| < \varepsilon$.
* Retourner $x_k$.

# Algorithmes d’optimisation

**Pr. Faouzia Benabbou** (faouzia.benabbou@univh2c.ma)  
Département de mathématiques et Informatique  
Master DSBD & IA 2025-2026

---

## Plan du Module: Algorithmes d’optimisation

- Introduction
- Rappels mathématiques
- Algorithmes d’Optimisation Sans Contraintes
- Algorithmes d’Optimisation avec Contraintes
- Programmation Linéaire et non Linéaire
- Optimisation combinatoire et globale
- Méthodes heuristiques et métaheuristiques

---

# Les algorithmes d’optimisation

## Classes des algorithmes

| Catégorie | Sous‑catégories |
|-----------|------------------|
| **Méthodes Analytiques** | Sous contrainte |
| **Méthodes numériques** | Sans contraintes |
| | • Méthode sans gradient |
| | • Méthode de descente de gradient : |
| |   - Gradient à pas fixe et optimal |
| |   - Gradient conjugué |
| |   - Méthode de Newton |
| |   - Quasi‑Newton (BFGS, DFP) |
| | • Méthodes générales de résolution de PCE, PCI |
| | • Programmation linéaire et non linéaire |
| | • Optimisation combinatoire et globale |
| | • Méthodes heuristiques et métaheuristiques |
| | • Algorithmes multi‑objectifs |

---

# Méthodes d’optimisation sous contraintes

## Méthode des multiplicateurs de Lagrange

La méthode des multiplicateurs de Lagrange est une technique d'optimisation utilisée pour trouver les extrema locaux (maxima ou minima) d'une fonction sous contraintes d'égalité (et étendue aux inégalités via KKT). Elle est particulièrement utile lorsque les contraintes rendent difficile l'expression d'une variable en fonction des autres.

L'idée centrale est de transformer un problème d'optimisation contraint en un problème non contraint en introduisant une **fonction de Lagrange**, qui combine la fonction objective et les contraintes.

---

### Problème avec contraintes d'égalité (PCE)

Soit le problème :
$$
\begin{cases}
\min_{x \in \mathbb{R}^n} f(x) \\
h(x) = 0
\end{cases}
$$
où $h : \mathbb{R}^n \to \mathbb{R}^p$ est différentiable.

**Définition :** La fonction de Lagrange associée est :
$$
L(x, \lambda) = f(x) + \lambda^T h(x) = f(x) + \sum_{i=1}^p \lambda_i h_i(x),
$$
où $\lambda = (\lambda_1, \dots, \lambda_p)^T$ sont les **multiplicateurs de Lagrange**.

---

### Régularité et point régulier

Un point admissible $x$ est dit **régulier** si les gradients des contraintes en ce point sont linéairement indépendants, i.e. la famille $\{\nabla h_i(x)\}_{i=1,\dots,p}$ est libre. Cela équivaut à :
$$
\operatorname{rang}(J_h(x)) = p,
$$
où $J_h$ est la matrice jacobienne de $h$.

L'ensemble admissible $S = \{x \mid h(x)=0\}$ est régulier si tous ses points le sont.

---

## Condition nécessaire d'optimalité du premier ordre

**Théorème de Lagrange :** Soit $x^*$ un optimum local du PCE. Si $x^*$ est un point régulier, alors il existe un unique vecteur $\lambda^* \in \mathbb{R}^p$ tel que :
$$
\nabla_x L(x^*, \lambda^*) = \nabla f(x^*) + J_h(x^*)^T \lambda^* = 0,
$$
avec la condition de faisabilité $h(x^*) = 0$.

En détail :
$$
\nabla_x L = \nabla f(x) + \sum_{i=1}^p \lambda_i \nabla h_i(x) = 0.
$$

Cela signifie que le gradient de $f$ est une combinaison linéaire des gradients des contraintes.

**Remarque :** Ces conditions sont nécessaires mais pas suffisantes pour garantir un minimum local ; il faut analyser la courbure via la Hessienne du Lagrangien.

---

## Condition suffisante du second ordre

Soit $T$ l'espace tangent aux contraintes :
$$
T = \{ d \in \mathbb{R}^n \mid J_h(x^*) d = 0 \}.
$$

**Théorème :** Si $x^*$ satisfait les conditions de premier ordre et que la Hessienne du Lagrangien
$$
H_L(x^*, \lambda^*) = \nabla_{xx}^2 f(x^*) + \sum_{i=1}^p \lambda_i^* \nabla_{xx}^2 h_i(x^*)
$$
est **définie positive sur $T$**, i.e.
$$
d^T H_L(x^*, \lambda^*) d > 0 \quad \forall d \in T \setminus \{0\},
$$
alors $x^*$ est un **minimum local strict**.

---

### Cas particulier : contraintes linéaires

Si les contraintes sont linéaires : $h(x) = Ax - b$, alors
$$
L(x, \lambda) = f(x) + \lambda^T (Ax - b).
$$
Les conditions du premier ordre donnent :
$$
\nabla f(x^*) + A^T \lambda^* = 0, \quad Ax^* = b.
$$

---

## Algorithme 8 – Méthode des multiplicateurs de Lagrange

1. **Initialisation** : définir $f(x)$ et $h(x)$.
2. **Construire le Lagrangien** : $L(x, \lambda) = f(x) + \lambda^T h(x)$.
3. **Calculer le gradient** : $\nabla_x L(x, \lambda) = \nabla f(x) + J_h(x)^T \lambda$.
4. **Résoudre le système** :
   $$
   \begin{cases}
   \nabla_x L(x, \lambda) = 0 & \text{(stationnarité)} \\
   h(x) = 0 & \text{(faisabilité)}
   \end{cases}
   $$
5. **Vérifier la nature du point** :
   - Si $H_L$ est définie positive sur $T$ → minimum local.
   - Si $H_L$ est définie négative sur $T$ → maximum local.
   - Sinon, on ne peut pas conclure.

---

## Exemples détaillés

### Exemple 1

Minimiser $f(x,y) = x^2 + 3y^2$ sous la contrainte $x + 2y = 4$.

1. **Lagrangien** :
   $$
   L(x,y,\lambda) = x^2 + 3y^2 + \lambda (x + 2y - 4).
   $$

2. **Conditions du premier ordre** :
   $$
   \begin{cases}
   \frac{\partial L}{\partial x} = 2x + \lambda = 0 \\[4pt]
   \frac{\partial L}{\partial y} = 6y + 2\lambda = 0 \\[4pt]
   x + 2y - 4 = 0
   \end{cases}
   \quad \Rightarrow \quad
   \begin{cases}
   x = 12/7 \\[4pt]
   y = 8/7 \\[4pt]
   \lambda = -24/7
   \end{cases}
   $$

3. **Espace tangent** : $\nabla h = (1, 2)^T$, donc $d_1 + 2d_2 = 0$, d'où $d = (-2d_2, d_2)$.

4. **Hessienne du Lagrangien** :
   $$
   H_L = \begin{pmatrix} 2 & 0 \\ 0 & 6 \end{pmatrix}.
   $$
   Pour $d \in T$, $d^T H_L d = 2d_1^2 + 6d_2^2 = 14 d_2^2 > 0$. Donc $H_L$ est définie positive sur $T$ : le point $(12/7, 8/7)$ est un **minimum local**. La valeur minimale est $f = 48/7$.

---

### Exemple 2

Minimiser $f(x_1, x_2) = x_1 x_2$ sous la contrainte $x_1 - 2x_2 + 4 = 0$.

1. **Lagrangien** : $L = x_1 x_2 + \lambda (x_1 - 2x_2 + 4)$.

2. **Conditions du premier ordre** :
   $$
   \begin{cases}
   \frac{\partial L}{\partial x_1} = x_2 + \lambda = 0 \\[4pt]
   \frac{\partial L}{\partial x_2} = x_1 - 2\lambda = 0 \\[4pt]
   x_1 - 2x_2 + 4 = 0
   \end{cases}
   \quad \Rightarrow \quad
   \begin{cases}
   x_1 = -2 \\[4pt]
   x_2 = 1 \\[4pt]
   \lambda = -1
   \end{cases}
   $$

3. **Espace tangent** : $\nabla h = (1, -2)^T$, donc $d_1 - 2d_2 = 0$, i.e. $d = (2d_2, d_2)$.

4. **Hessienne du Lagrangien** :
   $$
   H_L = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}.
   $$
   Pour $d = (2d_2, d_2)$, on a $d^T H_L d = 4 d_2^2 > 0$. Donc le point $(-2, 1)$ est un **minimum local**, avec $f = -2$.

---

### Exemple 3

Minimiser $f(x_1, x_2) = 3x_1 + 5x_2$ sous la contrainte $x_1 + x_2 = 10$.

1. **Lagrangien** : $L = 3x_1 + 5x_2 + \lambda (x_1 + x_2 - 10)$.

2. **Conditions du premier ordre** :
   $$
   \begin{cases}
   \frac{\partial L}{\partial x_1} = 3 + \lambda = 0 \\[4pt]
   \frac{\partial L}{\partial x_2} = 5 + \lambda = 0
   \end{cases}
   \quad \Rightarrow \quad 3 + \lambda = 0 \text{ et } 5 + \lambda = 0,
   $$
   ce qui est impossible ($3 \neq 5$). Il n'y a donc pas de point stationnaire. La fonction est linéaire sur une droite, donc pas d'extremum local (ni min ni max).

---

### Limitations de la méthode de Lagrange

- Elle identifie des points stationnaires (candidats) mais ne garantit pas l'optimalité globale.
- Nécessite la régularité des contraintes (gradients indépendants).
- Repose sur le calcul des dérivées (fonctions différentiables).
- Ne gère pas directement les inégalités (pour cela, utiliser KKT).
- Pour un grand nombre de variables/contraintes, le système peut devenir coûteux à résoudre.

---

# Méthodes du gradient projeté

Ces méthodes sont utilisées pour minimiser une fonction sous contraintes, en adaptant la descente de gradient classique par une **projection** sur l'ensemble admissible à chaque itération.

L'idée : à chaque itération, on effectue un pas de descente de gradient, puis on projette le point obtenu sur l'ensemble des contraintes $S$ pour garantir que le nouvel itéré reste réalisable.

---

## Algorithme 9 – Gradient projeté

1. **Initialisation** : $x_0 \in \mathbb{R}^n$, $\alpha_0 > 0$, $\varepsilon$ (tolérance), $\text{max\_iter}$, $k=0$.
2. **Répéter** :
   a) Calculer la direction de descente : $d_k = -\nabla f(x_k)$.
   b) Choisir un pas $\alpha_k$ (fixe ou par recherche linéaire).
   c) Projeter : $x_{k+1} = P_S(x_k + \alpha_k d_k)$, où $P_S$ est la projection sur $S$.
   d) $k = k+1$.
3. **Jusqu'à** $\|\nabla f(x_k)\| < \varepsilon$ ou $k \ge \text{max\_iter}$.

La projection d'un point $y$ sur $S$ est définie par :
$$
P_S(y) = \arg\min_{x \in S} \|x - y\|_2.
$$

---

## Projections sur des ensembles classiques

| Ensemble $S$ | Projection $P(x)$ |
|--------------|-------------------|
| $\mathbb{R}^n$ (pas de contrainte) | $P(x) = x$ |
| Intervalle $[a_i, b_i]^n$ (boîte) | $P(x)_i = \max(a_i, \min(x_i, b_i))$ |
| Boule de rayon $r$ centrée en $c$ | $P(x) = c + r \dfrac{x-c}{\|x-c\|}$ si $\|x-c\|>r$, sinon $x$ |
| Hyperplan affine $a^T x = b$ | $P(x) = x - \dfrac{a^T x - b}{\|a\|^2} a$ |
| Demi‑espace $a^T x \le b$ | $P(x) = x - \dfrac{\max(a^T x - b, 0)}{\|a\|^2} a$ |
| Système linéaire $Ax = b$ (A de rang m) | $P(x) = x - A^T (A A^T)^{-1} (A x - b)$ |
| Ellipse $x^T A x \le 1$ (A définie positive) | Si $x^T A x \le 1$ : $P(x)=x$ ; sinon $P(x) = \dfrac{x}{\sqrt{x^T A x}}$ |

---

### Projection sur une droite (cas particulier)

Pour la droite $ax + by + c = 0$, la projection d'un point $(x_0, y_0)$ est :
$$
P(x_0, y_0) = \left( x_0 - \lambda a, \; y_0 - \lambda b \right), \quad \text{avec } \lambda = \frac{a x_0 + b y_0 + c}{a^2 + b^2}.
$$

---

## Exemple détaillé : Gradient projeté sur une droite

**Problème :** Minimiser $f(x,y) = xy$ sous la contrainte $x - 2y + 4 = 0$.

Ici $S$ est la droite $x - 2y + 4 = 0$.

1. **Projection sur la droite** (fonction Python) :
```python
   def projection_droite(point, a=1, b=-2, c=4):
       x0, y0 = point
       denom = a**2 + b**2
       lam = (a * x0 + b * y0 + c) / denom
       x_proj = x0 - lam * a
       y_proj = y0 - lam * b
       return np.array([x_proj, y_proj])
       
```


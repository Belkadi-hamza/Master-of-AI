# Algorithmes d’optimisation

**Pr. Faouzia Benabbou** (faouzia.benabbou@univh2c.ma)  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2025-2026

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

## Méthode d’Optimisation quadratique Séquentielle (SQP)

La méthode SQP (*Sequential Quadratic Programming*) est une technique pour résoudre les problèmes d'optimisation non linéaire sous contraintes. Elle consiste à remplacer le problème initial par une suite de problèmes quadratiques sous contraintes linéaires plus faciles à résoudre.

À chaque itération, SQP remplace temporairement :
- la fonction objectif par une approximation quadratique,
- la contrainte non linéaire par son approximation linéaire.

---

### Problème avec contraintes d’égalité

Considérons le problème (différentiable) avec contraintes d’égalité :
$$
(P_x) \quad \begin{cases}
\min_{x \in \mathbb{R}^n} f(x), & f : \mathbb{R}^n \to \mathbb{R} \\
h(x) = 0, & h : \mathbb{R}^n \to \mathbb{R}^p
\end{cases}
$$

En utilisant la méthode de Lagrange, on introduit le Lagrangien :
$$
L(x, \lambda) = f(x) + \lambda^T h(x), \quad \lambda \in \mathbb{R}^p.
$$

---

### Conditions KKT et formulation

Si $x^*$ est un optimum local régulier, alors il existe $\lambda^*$ tel que les conditions de Karush–Kuhn–Tucker (KKT) soient satisfaites :
$$
\begin{cases}
\nabla_x L(x^*, \lambda^*) = \nabla f(x^*) + J_h(x^*)^T \lambda^* = 0, \\
h(x^*) = 0.
\end{cases}
$$

On pose $F(x, \lambda) = \begin{pmatrix} \nabla_x L(x, \lambda) \\ h(x) \end{pmatrix}$.  
On cherche à résoudre $F(x, \lambda) = 0$.

---

### Application de Newton‑Raphson

On applique la méthode de Newton‑Raphson à $F$. La matrice jacobienne de $F$ est :
$$
J_F(x, \lambda) =
\begin{pmatrix}
\nabla_{xx}^2 L(x, \lambda) & J_h(x)^T \\
J_h(x) & 0
\end{pmatrix}.
$$

Le système linéaire à résoudre à chaque itération est :
$$
\begin{pmatrix}
\nabla_{xx}^2 L(x_k, \lambda_k) & J_h(x_k)^T \\
J_h(x_k) & 0
\end{pmatrix}
\begin{pmatrix}
x_{k+1} - x_k \\
\lambda_{k+1} - \lambda_k
\end{pmatrix}
=
-
\begin{pmatrix}
\nabla_x L(x_k, \lambda_k) \\
h(x_k)
\end{pmatrix}.
\quad (SL)
$$

En posant $H_L(x_k, \lambda_k) = \nabla_{xx}^2 L(x_k, \lambda_k)$ et $\mathbf{d}_k = x_{k+1} - x_k$, on obtient :
$$
\begin{cases}
H_L(x_k, \lambda_k) \mathbf{d}_k + \nabla f(x_k) + J_h(x_k)^T \lambda_{k+1} = 0, \\
J_h(x_k)^T \mathbf{d}_k + h(x_k) = 0.
\end{cases}
\quad (5)
$$

---

### Sous‑problème quadratique (QP)

Le système (5) est exactement les conditions KKT du sous‑problème quadratique suivant :
$$
(QP) \quad \begin{cases}
\min_{\mathbf{d} \in \mathbb{R}^n} \frac{1}{2} \mathbf{d}^T H_L(x_k, \lambda_k) \mathbf{d} + \nabla f(x_k)^T \mathbf{d}, \\
\text{s.c. } J_h(x_k)^T \mathbf{d} + h(x_k) = 0.
\end{cases}
$$

Ainsi, la direction $\mathbf{d}_k$ est la solution optimale du QP local, et $\lambda_{k+1}$ est le multiplicateur associé.

---

### Algorithme 10 – SQP sous contrainte d’égalité

1. **Initialisation** : $x_0$, $\varepsilon$, $k=0$, $\text{max\_iter}$, $\lambda_0$.
2. **Répéter** :
   a) Résoudre le sous‑problème quadratique pour obtenir $\mathbf{d}_k$ et $\lambda_{k+1}$ :
      $$
      \begin{cases}
      \min_{\mathbf{d} \in \mathbb{R}^n} \frac{1}{2} \mathbf{d}^T H_L(x_k, \lambda_k) \mathbf{d} + \nabla f(x_k)^T \mathbf{d}, \\
      \text{s.c. } J_h(x_k)^T \mathbf{d} + h(x_k) = 0.
      \end{cases}
      $$
   b) Mettre à jour : $x_{k+1} = x_k + \mathbf{d}_k$.
   c) Mettre à jour $\lambda_{k+1}$ avec la valeur issue du QP.
   d) $k \leftarrow k+1$.
3. **Jusqu’à** $\|\nabla_x L(x_k, \lambda_k)\| < \varepsilon$ ou $k > \text{max\_iter}$.
4. Retourner $x_k$.

---

## Exemple détaillé

**Problème :**  
Minimiser  
$$
f(x,y) = x^2 + 2(y-2)^2
$$  
sous la contrainte  
$$
h(x,y) = x^2 + y^2 - 1 = 0.
$$

**Données initiales :**  
$(x_0, y_0) = (-1/2, 1/2)$, $\lambda_0 = 1$.

---

### Itération 0

- $f(x_0, y_0) = 4.75$
- $h(x_0, y_0) = -0.5$
- $\|\nabla L(x_0, y_0, \lambda_0)\| \approx 5.385$

**Lagrangien :**
$$
L(x,y,\lambda) = x^2 + 2(y-2)^2 + \lambda (x^2 + y^2 - 1).
$$

**Gradient de $L$ :**
$$
\nabla L(x,y,\lambda) =
\begin{pmatrix}
2x + 2\lambda x \\
4(y-2) + 2\lambda y
\end{pmatrix}.
$$

**Hessienne de $L$ par rapport à $(x,y)$ :**
$$
H_L(x,y,\lambda) =
\begin{pmatrix}
2 + 2\lambda & 0 \\
0 & 4 + 2\lambda
\end{pmatrix}.
$$

**Gradient de $f$ :**
$$
\nabla f(x,y) = (2x, \; 4y - 8)^T.
$$

**Jacobienne de $h$ (ici gradient) :**
$$
J_h(x,y)^T = (2x, \; 2y)^T.
$$

---

### Itération 1

On résout le système linéaire (SL) :
$$
\begin{pmatrix}
H_L(x_0, y_0, \lambda_0) & J_h(x_0, y_0)^T \\
J_h(x_0, y_0) & 0
\end{pmatrix}
\begin{pmatrix}
\mathbf{d}_0 \\
\lambda_1 - \lambda_0
\end{pmatrix}
=
-
\begin{pmatrix}
\nabla L(x_0, y_0, \lambda_0) \\
h(x_0, y_0)
\end{pmatrix}.
$$

Calculs :
$$
H_L(x_0, y_0, 1) =
\begin{pmatrix}
4 & 0 \\
0 & 6
\end{pmatrix}, \quad
\nabla f(x_0, y_0) = (-1, -6)^T, \quad
J_h(x_0, y_0)^T = (-1, 1)^T, \quad
h(x_0, y_0) = -\frac{1}{2}.
$$

Le système devient :
$$
\begin{cases}
4 d_0^1 - \lambda_1 = 1, \\
6 d_0^2 + \lambda_1 = 6, \\
-d_0^1 + d_0^2 = \frac{1}{2}.
\end{cases}
$$

Résolution :
$$
d_0^1 = \frac{2}{5}, \quad d_0^2 = \frac{9}{10}, \quad \lambda_1 = \frac{3}{5}.
$$

Mise à jour :
$$
(x_1, y_1) = (x_0 + d_0^1, \; y_0 + d_0^2) = \left(-\frac{1}{10}, \frac{14}{10}\right) = (-0.1, 1.4).
$$

- $f(x_1, y_1) \approx 0.73$
- $h(x_1, y_1) \approx 0.97$
- $\|\nabla L(x_1, y_1, \lambda_1)\| \approx 0.7879$ (non atteint)

---

### Itération 2

Nouvelle Hessienne et gradient :
$$
H_L(x_1, y_1, \lambda_1) =
\begin{pmatrix}
2 + 2(0.6) & 0 \\
0 & 4 + 2(0.6)
\end{pmatrix}
=
\begin{pmatrix}
3.2 & 0 \\
0 & 5.2
\end{pmatrix}.
$$

$$
\nabla f(x_1, y_1) = (-0.2, \; -2.4)^T, \quad
J_h(x_1, y_1)^T = (-0.2, \; 2.8)^T, \quad
h(x_1, y_1) \approx 0.97.
$$

Résolution du système :
$$
\begin{cases}
3.2 d_1^1 - 0.2 \lambda_2 = 0.2, \\
5.2 d_1^2 + 2.8 \lambda_2 = 2.4, \\
-0.2 d_1^1 + 2.8 d_1^2 = -0.97.
\end{cases}
$$

Solution :
$$
d_1^1 \approx 0.154997, \quad d_1^2 \approx -0.335357, \quad \lambda_2 \approx 1.479949.
$$

Mise à jour :
$$
(x_2, y_2) = (-0.1 + 0.154997, \; 1.4 - 0.335357) \approx (0.054997, \; 1.064643).
$$

- $f(x_2, y_2) \approx 1.7528$
- $h(x_2, y_2) \approx 0.1365$
- $\|\nabla L(x_2, y_2, \lambda_2)\| \approx 0.6502$ (non atteint)

Les itérations suivantes (3 à 5) convergent vers la solution.

---

### Résumé des itérations

| $k$ | $(x_k, y_k)$ | $\lambda_k$ | $\|\nabla L\|$ | Arrêt ? |
|-----|--------------|-------------|----------------|---------|
| 0   | (-0.5, 0.5)  | 1.000000    | 5.385165       | Non     |
| 1   | (-0.1, 1.4)  | 0.600000    | 0.787909       | Non     |
| 2   | (0.054997, 1.064643) | 1.479949 | 0.650183 | Non     |
| 3   | (-0.010548, 1.003928) | 1.955585 | 0.084991 | Non     |
| 4   | (0.000157, 1.000065)  | 1.999571 | 0.001001 | Non     |
| 5   | (-0.000000, 1.000000) | 2.000000 | $1.46\times10^{-7}$ | Oui     |

**Résultat final :**  
$x^* \approx (0, 1)$, $\lambda^* \approx 2$, $f(x^*, y^*) = 2$, et $h(x^*) \approx 0$.

---

### Vérification de la nature du point

Espace tangent : $\nabla h(x^*) = (2x^*, 2y^*) = (0, 2)$.  
Pour $d \in T$, on a $0 \cdot d_1 + 2 d_2 = 0 \Rightarrow d_2 = 0$.

Hessienne du Lagrangien en $(0,1)$ avec $\lambda=2$ :
$$
H_L(0,1,2) =
\begin{pmatrix}
2 + 2(2) & 0 \\
0 & 4 + 2(2)
\end{pmatrix}
=
\begin{pmatrix}
6 & 0 \\
0 & 8
\end{pmatrix}.
$$

Pour $d = (d_1, 0)$, on a $d^T H_L d = 6 d_1^2 > 0$ si $d_1 \neq 0$.  
Donc $H_L$ est définie positive sur $T$ : le point est un **minimum local strict**.

---

## Avantages et limites de la méthode SQP

### Avantages
- Très efficace pour les problèmes avec contraintes non linéaires.
- Adaptée aux problèmes de grande dimension.
- Peut approcher la solution par des points réalisables ou non réalisables (pas besoin de point initial réalisable).
- Convergence quadratique près de l’optimum.

### Limites
- Chaque itération nécessite la résolution d’un sous‑problème quadratique, ce qui peut être coûteux.
- Les sous‑problèmes peuvent devenir non réalisables, entraînant l’échec de la méthode.
- Nécessite un point initial régulier (gradient des contraintes non nul) pour une bonne linéarisation.

---

## Comparaison avec d’autres méthodes

| Critère | Multiplicateurs de Lagrange | Gradient projeté | SQP |
|---------|-----------------------------|------------------|-----|
| **Type de problème** | Contraintes d’égalité | Égalité / inégalité | Égalité / inégalité |
| **Principe** | Intègre les contraintes dans la fonction objectif | Projette le gradient sur l’espace admissible | Approxime par des sous‑problèmes quadratiques |
| **Hessienne utilisée** | Non | Non | Oui |
| **Complexité** | Résolution d’un système non linéaire | Projection à chaque itération | Résolution d’un QP à chaque itération |
| **Point initial admissible** | Pas nécessaire | Souvent oui | Pas obligatoire |
| **Efficacité en grande dimension** | Peut devenir coûteux | Moyennement adapté | Très efficace pour problèmes complexes |

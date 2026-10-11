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

# Optimisation sous contraintes d’inégalité ou mixtes

Un problème d’optimisation avec contraintes d’inégalité (et éventuellement d’égalité) se formule comme suit :

$$
\begin{cases}
\min_{x \in \mathbb{R}^n} f(x), & f : \mathbb{R}^n \to \mathbb{R} \\
g(x) \le 0, & g : \mathbb{R}^n \to \mathbb{R}^m \\
h(x) = 0, & h : \mathbb{R}^n \to \mathbb{R}^p
\end{cases}
$$

où $f, g, h$ sont de classe $C^1$.

---

## Méthodes de résolution pour problèmes mixtes

- **Méthodes Dual‑Primal**
- **Multiplicateurs de Lagrange & Conditions KKT**
- **Méthodes de pénalisation externe et interne**
- **Lagrangien augmenté (Augmented Lagrangian Method — ALM)**

---

# Méthodes Dual‑Primal

En optimisation, on associe souvent au **problème primal** (le problème original) un **problème dual**, qui est souvent plus facile à résoudre.

- **Problème primal** : le problème original à minimiser/maximiser sous contraintes.
- **Problème dual** : dérivé du primal via la fonction Lagrangienne.

Les méthodes primales‑duales cherchent une solution optimale pour les deux problèmes en itérant et en mettant à jour simultanément les variables primales et duales.

**Dualité forte** : les valeurs optimales du primal et du dual sont égales (écart de dualité nul).  
**Dualité faible** : l'écart de dualité est strictement positif (en minimisation, $d^* < p^*$).

---

### Conditions pour la dualité forte

1. **Problème convexe** :
   - $f$ convexe,
   - $g_i$ convexes,
   - $h_j$ affines,
   - Condition de qualification (ex. Slater) satisfaite.

2. **Cas non convexe** : la dualité forte peut échouer (dualité faible).

---

# Conditions de Karush‑Kuhn‑Tucker (KKT)

Les conditions KKT étendent la méthode des multiplicateurs de Lagrange aux contraintes d’inégalité.

## Lagrangien pour un problème mixte

$$
L(x, \lambda, \mu) = f(x) + \sum_{i=1}^p \lambda_i h_i(x) + \sum_{j=1}^m \mu_j g_j(x),
$$

avec :
- $\lambda_i \in \mathbb{R}$ (multiplicateurs pour les égalités),
- $\mu_j \ge 0$ (multiplicateurs pour les inégalités, en minimisation).

---

## Conditions nécessaires KKT

**Théorème (nécessité) :** Soit $x^*$ un minimum local réalisable du problème mixte. Si une condition de qualification des contraintes est satisfaite en $x^*$, alors il existe $\lambda^* \in \mathbb{R}^p$ et $\mu^* \in \mathbb{R}^m$ tels que :

1. **Stationnarité** :
   $$
   \nabla_x L(x^*, \lambda^*, \mu^*) = 0.
   $$

2. **Faisabilité primale** :
   $$
   g(x^*) \le 0, \quad h(x^*) = 0.
   $$

3. **Faisabilité duale** :
   $$
   \mu^* \ge 0.
   $$

4. **Complémentarité** :
   $$
   \mu_j^* g_j(x^*) = 0, \quad \forall j = 1, \dots, m.
   $$

---

## Qualification des contraintes

Pour que les conditions KKT soient nécessaires, il faut une condition de régularité :

- **Slater** (pour problèmes convexes) : il existe $x_0$ strictement réalisable : $g_i(x_0) < 0$ et $h_j(x_0) = 0$.
- **LICQ** (indépendance linéaire) : les gradients des contraintes actives (égalités et inégalités saturées) sont linéairement indépendants.

---

## Théorème d’optimalité globale (convexe)

Si :
- $f$ est convexe différentiable,
- les $g_i$ sont convexes différentiables,
- les $h_j$ sont affines,
- Slater est satisfaite,

alors $x^*$ est une solution **globale** du problème **si et seulement si** il existe $\lambda^*, \mu^*$ tels que les conditions KKT soient vérifiées.

---

## Exemple 1

**Problème :**
$$
\begin{cases}
\min f(x,y) = x^2 + y^2 \\
g(x,y) = 1 - x - y \le 0 \\
h(x,y) = x - 2 = 0
\end{cases}
$$

### a) Vérification de Slater

- $f$ est convexe (Hessienne $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ définie positive).
- $g$ est affine donc convexe.
- $h$ est affine.
- Ensemble admissible : $x=2$ et $1-2-y \le 0 \Rightarrow y \ge -1$.
- Point strictement réalisable : $(2,0)$ donne $g(2,0) = -1 < 0$.
- Slater est satisfaite.

### b) Lagrangien
$$
L(x,y,\mu,\lambda) = x^2 + y^2 + \mu(1-x-y) + \lambda(x-2).
$$

### c) Conditions KKT

1. **Stationnarité** :
   $$
   \frac{\partial L}{\partial x} = 2x - \mu + \lambda = 0, \quad
   \frac{\partial L}{\partial y} = 2y - \mu = 0.
   $$

2. **Primale** :
   $$
   1 - x - y \le 0, \quad x - 2 = 0.
   $$

3. **Duale** :
   $$
   \mu \ge 0.
   $$

4. **Complémentarité** :
   $$
   \mu(1 - x - y) = 0.
   $$

### d) Résolution

De $x-2=0$, on a $x=2$.

Stationnarité :
$$
4 - \mu + \lambda = 0, \quad 2y - \mu = 0 \Rightarrow \mu = 2y.
$$

Complémentarité :
$$
\mu(1 - 2 - y) = 2y(-1-y) = 0.
$$

**Cas 1 :** $y=0$ $\Rightarrow \mu=0$, $\lambda=-4$. Point $(2,0)$, $f=4$.

**Cas 2 :** $y=-1$ $\Rightarrow \mu=-2$ (violation de $\mu \ge 0$), impossible.

**Conclusion :** le seul point KKT est $(2,0)$, avec $\mu=0$, $\lambda=-4$. C'est le minimum global.

---

## Exemple 2

**Problème :**
$$
\begin{cases}
\min f(x,y) = (x-1)^2 + (y-1)^2 \\
g(x,y) = y - x^2 \le 0 \\
h(x,y) = x = 0
\end{cases}
$$

### a) Vérification LICQ

Gradients :
$$
\nabla g = (-2x, 1), \quad \nabla h = (1, 0).
$$

Indépendance linéaire : $\alpha \nabla g + \beta \nabla h = 0 \Rightarrow \alpha(-2x,1) + \beta(1,0) = (0,0) \Rightarrow \alpha = \beta = 0$. Donc LICQ est satisfaite.

### b) Lagrangien
$$
L(x,y,\mu,\lambda) = (x-1)^2 + (y-1)^2 + \mu(y - x^2) + \lambda x.
$$

### c) Conditions KKT

1. **Stationnarité** :
   $$
   \frac{\partial L}{\partial x} = 2(x-1) - 2\mu x + \lambda = 0, \quad
   \frac{\partial L}{\partial y} = 2(y-1) + \mu = 0.
   $$

2. **Primale** :
   $$
   y - x^2 \le 0, \quad x = 0.
   $$

3. **Duale** :
   $$
   \mu \ge 0.
   $$

4. **Complémentarité** :
   $$
   \mu(y - x^2) = 0.
   $$

### d) Résolution

De $x=0$, la stationnarité donne :
$$
-2 + \lambda = 0 \Rightarrow \lambda = 2, \quad
2(y-1) + \mu = 0 \Rightarrow \mu = 2(1-y).
$$

Faisabilité primale : $y \le 0$.

Dualité : $\mu = 2(1-y) \ge 0 \Rightarrow y \le 1$.

Complémentarité : $\mu y = 0 \Rightarrow 2(1-y) y = 0$.

**Cas 1 :** $y=0$ $\Rightarrow \mu=2$ (OK), point $(0,0)$, $f=2$.

**Cas 2 :** $y=1$ $\Rightarrow \mu=0$, mais $1 \le 0$ est faux (violation primale).

**Conclusion :** le seul point admissible est $(0,0)$, avec $\mu=2$, $\lambda=2$. C'est un minimum local (et global car le problème est convexe).

---

## Avantages et limites des conditions KKT

### Avantages
- Gère les contraintes mixtes (inégalités + égalités).
- Base de nombreux algorithmes numériques (barrières, SQP, etc.).
- Les multiplicateurs donnent une interprétation économique (prix marginaux, sensibilité).

### Limites
- Conditions nécessaires mais pas suffisantes si le problème est non convexe.
- Nécessite des conditions de régularité (Slater, LICQ).
- Peut être difficile à résoudre analytiquement pour de nombreuses contraintes actives.

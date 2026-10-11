# Algorithmes d’optimisation

**Pr. Faouzia Benabbou** (faouzia.benabbou@univh2c.ma)  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2024-2026

---

## Plan du Module complet

1. Introduction
2. Rappels mathématiques
3. Algorithmes d’Optimisation Sans Contraintes
4. Algorithmes d’Optimisation avec Contraintes
5. Programmation Linéaire et non Linéaire
6. Optimisation combinatoire et globale
7. Méthodes heuristiques et métaheuristiques

---

# Partie 1 : Rappels mathématiques

## 1. Matrices

### Matrice Définie +/-

Soit $A$ une matrice carrée réelle de taille $n \times n$. On dit que $A$ est :

- **Définie positive** si pour tout vecteur $x \in \mathbb{R}^n$, $x^T A x > 0$.
- **Semi‑définie positive** si pour tout $x \in \mathbb{R}^n$, $x^T A x \ge 0$.
- **Définie négative** si pour tout $x \in \mathbb{R}^n$, $x^T A x < 0$.
- **Semi‑définie négative** si pour tout $x \in \mathbb{R}^n$, $x^T A x \le 0$.

> $x^T A x$ est appelée la *forme quadratique* ou *l’énergie* de la matrice.

**Exemple :**  
Soit $X = (x,y)$ et  
$$
A = \begin{pmatrix} a & b \\ b & c \end{pmatrix}.
$$
Alors
$$
X^T A X = (x,y) \begin{pmatrix} a & b \\ b & c \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}
= a x^2 + 2bxy + c y^2.
$$

---

### Théorème (valeurs propres)

Une matrice symétrique réelle $A$ est définie positive **si et seulement si** toutes ses valeurs propres sont strictement positives.

### Décomposition de Cholesky

Il existe une unique matrice triangulaire inférieure $L$ à coefficients diagonaux strictement positifs telle que
$$
A = L L^T
$$
si et seulement si $A$ est symétrique définie positive (SDP).

---

### Critères de détermination

1. **Valeurs propres** : si toutes sont $> 0$, $A$ est définie positive.
2. **Critère de Sylvester** : les déterminants de toutes les sous‑matrices principales sont strictement positifs.
3. **Cholesky** : $A$ admet une décomposition de Cholesky.

**Propriétés :**
- Les matrices définies positives sont inversibles.
- La matrice identité est définie positive.
- Une matrice diagonale avec éléments diagonaux $>0$ est définie positive.
- Une matrice de covariance est semi‑définie positive.

---

## 2. Convexité

### Ensemble convexe

**Définition :** $C \subset \mathbb{R}^n$ est convexe si  
$$
\forall x, y \in C, \; \forall \lambda \in [0,1] : \quad \lambda x + (1-\lambda) y \in C.
$$

**Exemples :** un disque, un triangle.

**Propriétés :**
- L'intersection de convexes est convexe.
- L'image d'un convexe par une application affine est convexe.

---

### Fonction convexe

**Définition :** $f : C \to \mathbb{R}$ est convexe si  
$$
\forall x, y \in C, \; \forall \lambda \in [0,1] : \quad f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda) f(y).
$$
- $f$ est **strictement convexe** si l’inégalité est stricte.
- $f$ est concave si $-f$ est convexe.

**Propriété (C²) :** Si $f$ est deux fois différentiable sur $C$ convexe :
- $f$ convexe $\iff \nabla^2 f(X) \ge 0$ (semi-définie positive) pour tout $X \in C$.
- $f$ strictement convexe si $\nabla^2 f(X) > 0$ (définie positive).

**Théorème fondamental :** Si $f$ est convexe sur $C$ ouvert :
- Tout minimum local est un minimum **global**.
- Si $\nabla f(X_0) = 0$, alors $X_0$ est un minimum global.

---

## 3. Extremums

### Définitions

Soit $f : U \subset \mathbb{R}^n \to \mathbb{R}$.

- **Minimum local** : il existe un voisinage $V$ de $a$ tel que $f(x) \ge f(a)$ pour tout $x \in V$.
- **Maximum local** : $f(x) \le f(a)$ pour tout $x \in V$.
- **Extremum global** : atteint sur tout le domaine.

---

### Cas univarié (condition nécessaire)

**Théorème de Fermat :** Si $f$ est dérivable et $a$ est un extremum local, alors $f'(a) = 0$.

**Conditions suffisantes (second ordre) :** Soit $f'(a)=0$.
- Si $f''(a) > 0$ : minimum local strict.
- Si $f''(a) < 0$ : maximum local strict.
- Si $f''(a) = 0$ : cas douteux (ex: $x^3$).

**Théorème de Weierstrass :** Si $f$ est continue sur un compact $K$, alors $f$ atteint ses bornes (min et max globaux).

**Coercivité :** Si $f$ est continue et $\lim_{\|x\| \to \infty} f(x) = +\infty$, alors $f$ admet un minimum global. Si de plus $f$ est strictement convexe, ce minimum est unique.

---

### Cas multivarié (Hessienne)

Soit $f : \mathbb{R}^n \to \mathbb{R}$. La **matrice Hessienne** est :
$$
\nabla^2 f(x) = H_f(x) =
\begin{pmatrix}
\frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\[4pt]
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2}
\end{pmatrix}.
$$

**Condition nécessaire :** Si $x^*$ est un extremum local, alors $\nabla f(x^*) = 0$ et :
- Min local $\Rightarrow \nabla^2 f(x^*)$ semi-définie positive.
- Max local $\Rightarrow \nabla^2 f(x^*)$ semi-définie négative.

**Conditions suffisantes :** Soit $\nabla f(x^*) = 0$.
- Si $\nabla^2 f(x^*)$ est **définie positive** $\Rightarrow$ minimum local strict.
- Si $\nabla^2 f(x^*)$ est **définie négative** $\Rightarrow$ maximum local strict.
- Si $\nabla^2 f(x^*)$ est **indéfinie** $\Rightarrow$ point selle.

**Critère de Monge (pour 2 variables) :**  
Soit $r = f_{xx}$, $t = f_{yy}$, $s = f_{xy}$, $\Delta = rt - s^2$.
- $\Delta > 0$ et $r > 0$ $\Rightarrow$ minimum.
- $\Delta > 0$ et $r < 0$ $\Rightarrow$ maximum.
- $\Delta < 0$ $\Rightarrow$ point selle.

---

# Partie 2 : Algorithmes d’optimisation sans contraintes

## Classes des algorithmes

| Catégorie | Sous‑catégories |
|-----------|------------------|
| **Méthodes Analytiques** | Sous contrainte |
| **Méthodes numériques** | Sans contraintes |
| | • Méthodes sans gradient (directes) |
| | • Méthodes de descente de gradient : |
| |   - Gradient à pas fixe / optimal |
| |   - Gradient conjugué |
| |   - Newton |
| |   - Quasi‑Newton (BFGS, DFP) |

---

## Méthodes directes (sans gradient)

### 1. Méthode de dichotomie (bissection)

**Principe :** Résoudre $f(x)=0$ sur $[a,b]$ avec $f(a)f(b)<0$.

**Algorithme :**
1. $n=0$, $a_n=a$, $b_n=b$, $\varepsilon$ tolérance.
2. Répéter :
   - $x_n = \dfrac{a_n + b_n}{2}$
   - Si $f(a_n) f(x_n) > 0$ alors $a_{n+1} = x_n$, $b_{n+1} = b_n$
   - Sinon $a_{n+1} = a_n$, $b_{n+1} = x_n$
3. Jusqu’à $|b_n - a_n| < \varepsilon$.

**Convergence :** linéaire.  
**Limites :** lente, nécessite un intervalle initial.

---

### 2. Méthode du nombre d’or (section dorée)

**Principe :** Chercher le minimum d'une fonction unimodale sur $[a,b]$ en utilisant le nombre d'or $\varphi = \dfrac{1+\sqrt{5}}{2}$ et $\tau = 1/\varphi$.

**Algorithme :**
1. $a_0=a$, $b_0=b$, $\tau = \dfrac{\sqrt{5}-1}{2}$.
2. Répéter :
   - $x_1 = b_n - \tau (b_n - a_n)$
   - $x_2 = a_n + \tau (b_n - a_n)$
   - Si $f(x_1) < f(x_2)$ alors $b_{n+1} = x_2$ (sinon $a_{n+1} = x_1$)
3. Jusqu’à $b_n - a_n < \varepsilon$.

**Convergence :** linéaire (plus rapide que dichotomie).

---

## Méthodes de descente de gradient

### Principe général

On cherche à minimiser $f : \mathbb{R}^n \to \mathbb{R}$ différentiable.  
L'itération s'écrit :
$$
x_{k+1} = x_k + \alpha_k d_k,
$$
où $d_k = -\nabla f(x_k)$ est la **direction de descente** et $\alpha_k > 0$ le **pas**.

> Interprétation : on descend la pente la plus forte.

**Choix du pas :**
- Pas trop grand $\Rightarrow$ risque d'oscillation.
- Pas trop petit $\Rightarrow$ convergence lente.
- Pas de formule magique : on tâtonne (learning rate en ML).

---

### Gradient à pas fixe

Le pas est constant : $\alpha_k = \alpha$ pour tout $k$.

**Algorithme :**
1. Initialiser $x_0$, $\alpha > 0$, $\varepsilon$, $\text{max\_iter}$.
2. Répéter :
   - $d_k = -\nabla f(x_k)$
   - $x_{k+1} = x_k + \alpha d_k$
3. Jusqu’à $\|\nabla f(x_k)\| < \varepsilon$ ou $k \ge \text{max\_iter}$.

**Convergence :** linéaire (dépend fortement de $\alpha$).

---

### Méthode de Newton

On utilise l'approximation quadratique de $f$ :
$$
x_{k+1} = x_k - [\nabla^2 f(x_k)]^{-1} \nabla f(x_k).
$$

**Convergence :** **quadratique** (très rapide près du minimum).  
**Inconvénients :** calcul coûteux de la Hessienne inverse ; peut diverger si mal initialisé.

---

### Méthodes Quasi‑Newton (BFGS / DFP)

On remplace l'inverse de la Hessienne $\nabla^2 f(x_k)^{-1}$ par une approximation $B_k$ pour éviter le calcul coûteux.

**Algorithme général :**
1. Initialiser $x_0$, $B_0 = I$ (identité).
2. Répéter :
   - $d_k = -B_k \nabla f(x_k)$
   - Recherche linéaire pour $\alpha_k$
   - $x_{k+1} = x_k + \alpha_k d_k$
   - $s_k = x_{k+1} - x_k$, $y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$
   - Mettre à jour $B_k$ :

**BFGS :**
$$
\rho_k = \frac{1}{y_k^T s_k}, \quad
B_{k+1} = (I - \rho_k s_k y_k^T) B_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T.
$$

**DFP :**
$$
B_{k+1} = B_k - \frac{B_k y_k y_k^T B_k}{y_k^T B_k y_k} + \frac{s_k s_k^T}{y_k^T s_k}.
$$

**Convergence :** **superlinéaire** (bon compromis vitesse/coût).  
**Avantages :** efficace pour les grands problèmes, pas de Hessienne explicite.  
**Inconvénients :** nécessite une recherche linéaire ; rare perte de définie positivité.

---

### Comparaison des convergences

| Algorithme | Type de convergence | Description |
|------------|----------------------|-------------|
| Dichotomie | Linéaire | Intervalle divisé par 2 |
| Section dorée | Linéaire | Réduction par facteur $\varphi$ |
| Gradient pas fixe | Linéaire | Dépend du choix du pas |
| Gradient pas optimal | Linéaire (pire cas) | Plus rapide qu'à pas fixe |
| **Newton** | **Quadratique** | Très rapide, mais Hessienne coûteuse |
| **Quasi‑Newton (BFGS)** | **Superlinéaire** | Bon compromis, stable et efficace |

---

# Partie 3 : Optimisation avec contraintes

## Définitions générales

On cherche :
$$
\min_{x \in \mathbb{R}^n} f(x)
$$
sous :
- **Contraintes d'égalité** : $h(x) = 0$ (PCE), avec $h : \mathbb{R}^n \to \mathbb{R}^p$.
- **Contraintes d'inégalité** : $g(x) \le 0$ (PCI), avec $g : \mathbb{R}^n \to \mathbb{R}^m$.

---

### Matrice Jacobienne

Pour $h = (h_1, \dots, h_p)^T$, la Jacobienne est :
$$
J_h(x) =
\begin{bmatrix}
\frac{\partial h_1}{\partial x_1} & \cdots & \frac{\partial h_1}{\partial x_n} \\
\vdots & \ddots & \vdots \\
\frac{\partial h_p}{\partial x_1} & \cdots & \frac{\partial h_p}{\partial x_n}
\end{bmatrix}.
$$

---

### Admissibilité

- **Point admissible** : $x$ vérifiant toutes les contraintes.
- **Ensemble admissible** : $S = \{x \mid h(x)=0, g(x)\le 0\}$.
- **Direction admissible** $d$ en $x \in S$ : il existe $\alpha > 0$ tel que $x + t d \in S$ pour tout $t \in [0, \alpha]$.

**Condition nécessaire (1er ordre) :** Pour une contrainte d'égalité $h(x)=0$, une direction $d$ doit vérifier $\nabla h(x)^T d = 0$. Généralisation : $J_h(x) d = 0$.

---

## Sous‑types de problèmes avec contraintes d'égalité

### 1. Linéaire
$$
\min f(x) \quad \text{s.c. } A x = b.
$$
**Admissibilité :** $d$ est admissible $\iff A d = 0$.

**Exemple :** $\min x^2 + 3y^2$ s.c. $x+2y=4$.

---

### 2. Non linéaire
$$
\min f(x) \quad \text{s.c. } h(x)=0.
$$

**Exemple :** $\min x^2 + y^2$ s.c. $x^2 + y^2 - 4 = 0$ (cercle).

---

### 3. Quadratique (QP)
$$
\min \frac{1}{2} x^T Q x + c^T x \quad \text{s.c. } A x = b,
$$
avec $Q$ symétrique définie positive.

**Exemple :** $\min \frac{1}{2}(4x_1^2 + 4x_1x_2 + 2x_2^2) + x_1 + x_2$ s.c. $x_1+x_2=1$ et $x_1-x_2=0$.

---

### 4. Dynamique (contrôle optimal)
$$
\min_{u(t)} J(u) = \int_{t_0}^{t_f} L(x(t), u(t), t) \, dt
$$
s.c.
- $\dot{x}(t) = f(x(t), u(t), t)$ (dynamique)
- $h(x(t), u(t), t) = 0$ (contrainte d'égalité à chaque instant)

**Exemple :** minimiser la consommation d'énergie d'un robot sous contrainte de trajectoire.

---

## Méthodes de résolution des PCE

| Type de problème | Méthodes adaptées |
|------------------|-------------------|
| Contraintes linéaires simples | Substitution |
| Linéaire / non linéaire / quadratique (égalité) | Multiplicateurs de Lagrange |
| Contraintes convexes simples | Gradient projeté |
| Non linéaire général | Newton‑Raphson, SQP |
| Programmation linéaire | Simplex |
| Non linéaire avec égalités/inégalités | Pénalité extérieure |
| Contraintes d'inégalité strictes | Pénalité intérieure / barrière |

---

### Méthode de substitution (exemple détaillé)

**Problème :** $\min f(x,y) = x^2 + 3y^2$ s.c. $x + 2y = 4$.

**Résolution :**
1. Exprimer $x = 4 - 2y$.
2. Substituer : $g(y) = (4-2y)^2 + 3y^2 = 7y^2 - 16y + 16$.
3. Minimiser $g(y)$ (dérivée, etc.).

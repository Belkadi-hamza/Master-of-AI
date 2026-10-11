# Algorithmes d’optimisation

**Pr. Faouzia Benabbou** (faouzia.benabbou@univh2c.ma)  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2024-2025

---

## Plan du Module: Algorithmes d’optimisation

- Introduction
- Rappels mathématiques
- Algorithmes d’Optimisation Sans Contraintes
- Algorithmes d’Optimisation avec Contraintes
- Programmation Linéaire et non Linéaire
- Optimisation combinatoire et globale
- Méthodes heuristiques et métäheuristique

---

## Rappels mathématiques

### Matrices

#### Matrice Définie +/-

Soit $A$ une matrice carrée réelle de taille $n \times n$.  
On dit que $A$ est :

- **Définie positive** si pour tout vecteur $x \in \mathbb{R}^n$, $x^T A x > 0$.
- **Semi‑définie positive** si pour tout $x \in \mathbb{R}^n$, $x^T A x \ge 0$.
- **Définie négative** si pour tout $x \in \mathbb{R}^n$, $x^T A x < 0$.
- **Semi‑définie négative** si pour tout $x \in \mathbb{R}^n$, $x^T A x \le 0$.

> $x^T A x$ est appelée la *forme quadratique* ou *l’énergie* de la matrice.

---

##### Exemple

Soit $X = (x,y)$ et  
$$
A = \begin{pmatrix} a & b \\ b & c \end{pmatrix}.
$$
Alors
$$
X^T A X = (x,y) \begin{pmatrix} a & b \\ b & c \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}
= a x^2 + 2bxy + c y^2.
$$

Pour  
$$
A = \begin{pmatrix} 1 & 6 \\ 6 & -1 \end{pmatrix},
$$
on a
$$
X^T A X = x^2 + 12xy - y^2.
$$

---

##### Théorème

Une matrice symétrique réelle $A$ est définie positive **si et seulement si** toutes ses valeurs propres sont strictement positives.

##### Décomposition de Cholesky

Soit $A$ une matrice carrée réelle. Il existe une unique matrice triangulaire inférieure $L$ à coefficients diagonaux strictement positifs telle que
$$
A = L L^T
$$
si et seulement si $A$ est symétrique définie positive (SDP).

---

##### Critères de détermination

Plusieurs critères permettent de déterminer si une matrice symétrique est définie positive. Les plus courants sont :

1. **Calcul des valeurs propres** : si toutes sont strictement positives, la matrice est définie positive.
2. **Critère de Sylvester** : calculer les déterminants de toutes les sous‑matrices principales de $A$. Si tous ces déterminants sont strictement positifs, alors $A$ est définie positive.
3. **Décomposition de Cholesky** : $A$ est symétrique définie positive ssi elle admet une décomposition de Cholesky.

---

##### Propriétés importantes

- Les matrices définies positives sont inversibles.
- Les valeurs propres d'une matrice définie positive sont toutes strictement positives.
- La matrice identité est définie positive.
- Une matrice diagonale dont tous les éléments diagonaux sont positifs est définie positive.
- Une matrice de covariance est semi‑définie positive.

---

### Convexité

> Dans les problèmes d’optimisation, une notion joue un rôle très important : celle de convexité.  
> En effet, pour la plupart des algorithmes, la convergence vers un optimum global ne pourra être démontrée qu’avec des hypothèses de convexité.

![[img1.png|275]]

---

#### Ensemble convexe

**Définition.** Soit $C \subset \mathbb{R}^n$. $C$ est convexe si  
$$
\forall x, y \in C, \; \forall \lambda \in [0,1] : \quad \lambda x + (1-\lambda) y \in C.
$$

D’un point de vue géométrique, un convexe est un ensemble qui, lorsqu’il contient deux points, contient nécessairement le segment les reliant.

> *Illustration* : A et B non connexe (non représenté ici).

---

##### Exemples d’ensembles convexes

- Un **disque** est convexe.
- Un **triangle** est convexe.
- Une **forme en fer à cheval** n’est pas convexe.

---

##### Propriétés

- **Théorème.** L'image d'un connexe par une fonction continue est un connexe.
- **Proposition.** Soient $C, C_1, C_2$ des convexes de $\mathbb{R}^n$, $I,J \subset \mathbb{R}$ ; on a :
  - Si $\lambda_1, \lambda_2 \in \mathbb{R}$, alors $\lambda_1 C_1 + \lambda_2 C_2$ est un convexe de $\mathbb{R}^n$.
  - Si $(C_j)_{j \in J}$ est une famille quelconque de convexes de $\mathbb{R}^n$, alors $\bigcap_{j \in J} C_j$ est un convexe de $\mathbb{R}^n$.
  - Si $C$ est un convexe de $\mathbb{R}^n$ et $f : \mathbb{R}^n \to \mathbb{R}^m$ une application affine de type $f(x) = A x + b$ (avec $A \in \mathbb{R}^{m \times n}$ et $b \in \mathbb{R}^m$), alors $f(C)$ est un convexe de $\mathbb{R}^m$.

---

#### Fonction convexe

**Définition.** Soit $C \subset \mathbb{R}^n$ et $f : C \to \mathbb{R}$. On dit que $f$ est **convexe** si :
$$
\forall x, y \in C, \; \forall \lambda \in [0,1] : \quad f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda) f(y).
$$
- $f$ est **strictement convexe** si l’inégalité est stricte pour $\lambda \in ]0,1[$ et $x \neq y$.
- Une fonction $f$ est dite **(strictement) concave** si $-f$ est (strictement) convexe.

> Interprétation géométrique : le graphe d’une fonction convexe est toujours en dessous du segment reliant $(x_0, f(x_0))$ et $(y, f(y))$.

---

##### Propriété (fonctions deux fois différentiables)

Si $f : C \subset \mathbb{R}^n \to \mathbb{R}$ est deux fois continûment différentiable sur $C$ convexe, alors :
- $f$ est convexe si et seulement si $\nabla^2 f(X) \ge 0$ pour tout $X \in C$.
- $f$ est concave si $\nabla^2 f(X) \le 0$ pour tout $X \in C$.
- $f$ est strictement convexe si $\nabla^2 f(X) > 0$ pour tout $X \in C$.

**Exemple.** $f(x) = x^2$ sur $\mathbb{R}$ est convexe car $f''(x) = 2 > 0$.

---

##### Théorème fondamental

Si $f$ est convexe sur un ensemble ouvert convexe $C \subset \mathbb{R}^n$, alors :

a) Si $f$ admet en $X_0 \in C$ un minimum local, alors $f$ admet en $X_0$ un minimum **global**.

b) Si $f$ est de classe $C^1$ sur $C$ et $\nabla f(X_0) = 0$, alors $X_0$ est un minimum global sur $C$.

---

##### Théorème (caractérisation)

Soit $f : C \subset \mathbb{R}^n \to \mathbb{R}$ continûment différentiable sur $C$. Les conditions suivantes sont équivalentes :

a) $f$ est convexe.  
b) $\forall x, y : \quad f(y) \ge f(x) + \nabla f(x)^T (y - x)$.

Si $f \in C^2$, alors $f$ est convexe ssi $\nabla^2 f(x)$ est semi‑définie positive pour tout $x \in C$ :
$$
y^T \nabla^2 f(x) \, y \ge 0, \quad \forall y \in \mathbb{R}^n.
$$

---

### Extremums

#### Définition des Extremums local / global

Soit $f$ définie sur $U \subset \mathbb{R}^n$ et à valeurs réelles. Un point $a \in U$ est :

- un **minimum local** (ou relatif) de $f$ s’il existe un voisinage $V_a$ de $a$ (ouvert dans $U$) tel que  
  $$
  f(x) \ge f(a) \quad \forall x \in V_a.
  $$
- un **maximum local** s’il existe un voisinage $V_a$ tel que  
  $$
  f(x) \le f(a) \quad \forall x \in V_a.
  $$
- un **extremum local** s’il est maximum ou minimum local.

Un extremum est dit **strict** si l’inégalité est stricte pour tout $x \neq a$.

![[img2.png|328]]
![[img3.png|328]]

---

#### Condition d’existence d’un extremum

L’existence d’un extremum dépend de la fonction et du domaine. Plusieurs théorèmes permettent de montrer leur existence sous certaines conditions. Ces théorèmes sont cruciaux en optimisation.

---

#### Cas des fonctions d’une variable réelle

##### Théorème de Fermat (condition nécessaire du premier ordre)

Si $f : U \subset \mathbb{R} \to \mathbb{R}$ est dérivable sur $U$ et $x_0$ est un extremum local de $f$, alors
$$
f'(x_0) = 0.
$$
Autrement dit, $x_0$ est un point critique.

> La réciproque n’est pas toujours vraie. Par exemple, $f(x) = x^3$ a $x=0$ comme point critique, mais ce n’est ni un maximum ni un minimum (point d’inflexion).

---

##### Conditions suffisantes du second ordre

Soit $f$ deux fois dérivable sur un intervalle ouvert $I \subset \mathbb{R}$ et $a \in I$ tel que $f'(a) = 0$. Alors :

- Si $f''(a) > 0$, alors $f$ admet un minimum local strict en $a$.
- Si $f''(a) < 0$, alors $f$ admet un maximum local strict en $a$.
- Si $f''(a) = 0$, on ne peut pas conclure (il faut approfondir).

---

##### Théorème de Weierstrass

Soient $K$ un compact (fermé et borné) non vide de $\mathbb{R}^n$ et $f : K \to \mathbb{R}$ continue sur $K$. Alors $f$ est bornée et atteint ses bornes sur $K$ : il existe $a^*$ tel que
$$
f(a^*) = \min_{x \in K} f(x) \quad \text{ou} \quad f(a^*) = \max_{x \in K} f(x).
$$

---

##### Théorème d’existence (coercivité)

Soit $f : \mathbb{R}^n \to \mathbb{R}$ continue. Si $f$ est **coercive**, c’est‑à‑dire
$$
\lim_{\|x\| \to \infty} f(x) = +\infty,
$$
alors $f$ admet au moins un minimum global sur $\mathbb{R}^n$.

##### Théorème d’unicité

Si $f$ est coercive et strictement convexe, alors il existe un unique minimum global $a^*$ tel que
$$
\forall x \in \mathbb{R}^n, \quad f(x) \ge f(a^*).
$$

> Pour les fonctions concaves, on recherche des maximas ; pour les convexes, des minimas (les inégalités sont inversées).

---

##### Exemple

Soit $f : \mathbb{R}^2 \to \mathbb{R}$ définie par  
$$
f(x, y) = x^2 + y^2 + \sin x + \sin y.
$$
- $f$ est continue et coercive, donc elle admet un minimum global.

> **Exercice** : chercher ce minimum global.

---

#### Cas des fonctions de plusieurs variables

On généralise les résultats précédents en utilisant la **matrice Hessienne**.

---

##### Définition de la Hessienne

Soit $f : \mathbb{R}^n \to \mathbb{R}$ une fonction de $n$ variables. La matrice Hessienne de $f$ en $x = (x_1, \dots, x_n)$ est la matrice $n \times n$ des dérivées partielles d’ordre 2, notée $\nabla^2 f(x)$ ou $H_f(x)$ :
$$
\nabla^2 f(x) = H_f(x) =
\begin{pmatrix}
\frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\[4pt]
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2}
\end{pmatrix}.
$$

La Hessienne fournit des informations sur la courbure de $f$, ce qui est crucial pour déterminer la nature d’un point critique.

---

##### Cas de deux variables

Pour $f(x,y)$, on a
$$
\nabla^2 f(x,y) = H_f(x,y) =
\begin{pmatrix}
\frac{\partial^2 f}{\partial x^2} & \frac{\partial^2 f}{\partial x \partial y} \\[4pt]
\frac{\partial^2 f}{\partial y \partial x} & \frac{\partial^2 f}{\partial y^2}
\end{pmatrix}.
$$

**Exemple :**  
$f(x,y) = x^2 + xy$, alors
$$
\nabla^2 f(x,y) = \begin{pmatrix} 2 & 1 \\ 1 & 0 \end{pmatrix}.
$$

---

##### Définition des extremums locaux (plusieurs variables)

Soit $f : U \subset \mathbb{R}^n \to \mathbb{R}$, $U$ ouvert. On dit que $f$ admet un **maximum local** (resp. **minimum local**) en $X^* \in U$ s’il existe un voisinage $D \subset U$ centré en $X^*$ tel que
$$
\forall X \in D, \quad f(X) \le f(X^*) \quad (\text{resp. } f(X) \ge f(X^*)).
$$

---

##### Condition nécessaire du premier ordre

Si $f$ admet un extremum local en $a = (a_1, \dots, a_n)$, alors
$$
\nabla f(a) = \left( \frac{\partial f}{\partial x_1}(a), \dots, \frac{\partial f}{\partial x_n}(a) \right) = (0, \dots, 0).
$$
En dimension 2, cela donne
$$
\frac{\partial f}{\partial x}(a_0, a_1) = 0, \quad \frac{\partial f}{\partial y}(a_0, a_1) = 0.
$$

---

##### Conditions suffisantes (Hessienne)

Soit $f$ de classe $C^2$ sur un ouvert $U \subset \mathbb{R}^n$, et soit $x^* \in U$ un point critique ($\nabla f(x^*) = 0$). Alors :

- Si $\nabla^2 f(x^*)$ est **définie positive**, alors $f$ admet un **minimum local strict** en $x^*$.
- Si $\nabla^2 f(x^*)$ est **définie négative**, alors $f$ admet un **maximum local strict** en $x^*$.
- Si $\nabla^2 f(x^*)$ est **indéfinie** (il existe $v$ et $w$ tels que $v^T H_f v > 0$ et $w^T H_f w < 0$), alors $x^*$ est un **point selle** et il n’y a pas d’extremum local.

---

##### Conditions nécessaires (Hessienne)

Si $x^*$ est un minimum local, alors $\nabla^2 f(x^*)$ est **semi‑définie positive**.  
Si $x^*$ est un maximum local, alors $\nabla^2 f(x^*)$ est **semi‑définie négative**.

---

##### Critère de Monge (pour deux variables)

Soit $f : \mathbb{R}^2 \to \mathbb{R}$ de classe $C^2$ et $(x_0, y_0)$ un point critique. Posons
$$
r = \frac{\partial^2 f}{\partial x^2}(x_0, y_0), \quad
t = \frac{\partial^2 f}{\partial y^2}(x_0, y_0), \quad
s = \frac{\partial^2 f}{\partial x \partial y}(x_0, y_0).
$$
Alors
$$
\det(\nabla^2 f(x_0, y_0)) = r t - s^2.
$$

- Si $\det > 0$ et $r > 0$, alors $(x_0, y_0)$ est un **minimum local**.
- Si $\det > 0$ et $r < 0$, alors $(x_0, y_0)$ est un **maximum local**.
- Si $\det = 0$, on ne peut pas conclure directement.

---

##### Exemples

1. $f(x) = x^2$ : minimum local en 0, $f'(0)=0$, $f''(0)>0$.
![[img4.png|261]]
2. $f(x) = -x^2$ : maximum local en 0, $f'(0)=0$, $f''(0)<0$.
![[img5.png|261]]
3. $f(x) = x^3$ : ni minimum ni maximum en 0, $f'(0)=0$, $f''(0)=0$.
![[img6.png|270]]

---

##### Exemple en deux variables

Soit $f(x,y) = x y^2 + x^4 - y^4$.  
Points critiques : 
$$
\begin{cases}
\frac{\partial f}{\partial x} = y^2 + 4x^3 = 0 \\[4pt]
\frac{\partial f}{\partial y} = 2xy - 4y^3 = 0
\end{cases}
\quad \Rightarrow \quad (0,0) \text{ est le seul point critique}.
$$
Hessienne :
$$
\nabla^2 f(x,y) =
\begin{pmatrix}
12x^2 & 2y \\ 2y & 2x - 12y^2
\end{pmatrix},
\quad
\nabla^2 f(0,0) =
\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}.
$$
$\det(\nabla^2 f(0,0)) = 0$, donc $(0,0)$ est un point selle.
![[img7.png|313]]

---

##### Autre exemple

$f(x,y) = x^2 + xy + y^2 - 3x - 6y$.  
Points critiques :
$$
\begin{cases}
\frac{\partial f}{\partial x} = 2x + y - 3 = 0 \\[4pt]
\frac{\partial f}{\partial y} = x + 2y - 6 = 0
\end{cases}
\quad \Rightarrow \quad (0,3) \text{ est le seul point critique}.
$$
Hessienne :
$$
\nabla^2 f(x,y) =
\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix},
\quad
\nabla^2 f(0,3) =
\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}.
$$
$\det(\nabla^2 f(0,3)) = 3 > 0$ et $r=2>0$, donc la Hessienne est définie positive et $(0,3)$ est un **minimum local**.

---

<h1 style="color: red;">Méthode générale pour résoudre un exercice d'optimisation</h1>
## 1. Pour une fonction d'une variable
1. Calculer \( f'(x) \).
2. Résoudre \( f'(x) = 0 \) pour trouver les points critiques.
3. Calculer \( f''(x) \).
4. Conclure :
   - \( f''(x) > 0 \) → **minimum local**
   - \( f''(x) < 0 \) → **maximum local**
   - \( f''(x) = 0 \) → **test insuffisant**

---

## 2. Pour une fonction de plusieurs variables
1. Calculer le gradient \( \nabla f \).
2. Résoudre \( \nabla f = 0 \) pour trouver les points critiques.
3. Calculer la matrice Hessienne \( H \).
4. Déterminer la nature de \( H \) (par valeurs propres ou critère de Monge/Sylvester).
5. Conclure :
   - \( H \) définie positive → **minimum local**
   - \( H \) définie négative → **maximum local**
   - \( H \) indéfinie → **point selle**
   - \( H \) semi-définie → **test insuffisant**

---

## 3. Résumé synthétique

| Cas | Condition | Conclusion |
|-----|-----------|------------|
| 1 variable | \( f'(a) = 0 \), \( f''(a) > 0 \) | Minimum local |
| 1 variable | \( f'(a) = 0 \), \( f''(a) < 0 \) | Maximum local |
| 1 variable | \( f'(a) = 0 \), \( f''(a) = 0 \) | Impossible de conclure |
| Plusieurs variables | \( \nabla f = 0 \), Hessienne définie positive | Minimum local |
| Plusieurs variables | \( \nabla f = 0 \), Hessienne définie négative | Maximum local |
| Plusieurs variables | \( \nabla f = 0 \), Hessienne indéfinie | Point selle |

---

## 4. Cas particuliers importants

- ✅ **Fonction convexe** : tout minimum local est aussi un **minimum global**.
- ✅ **Fonction strictement convexe + coercive** : le minimum global est **unique**.

# Série d'exercices (Énoncés)

## Exercice 1 : Matrice définie positive

Soit

$$
A=
\begin{pmatrix}
4&1\
1&3
\end{pmatrix}.
$$

1. Vérifier que la matrice est symétrique.
2. Calculer les valeurs propres.
3. Déterminer si la matrice est :

   * définie positive,
   * semi-définie positive,
   * définie négative,
   * indéfinie.

---

## Exercice 2 : Critère de Sylvester

Soit

$$
A=
\begin{pmatrix}
5&2\
2&4
\end{pmatrix}.
$$

Déterminer la nature de la matrice en utilisant **uniquement le critère de Sylvester**.

---

## Exercice 3 : Convexité d'un ensemble

Les ensembles suivants sont-ils convexes ?

1.

$$
C_1={(x,y)\in\mathbb R^2:x^2+y^2\le1}
$$

2.

$$
C_2=[0,2]\cup[5,8]
$$

3.

Le triangle de sommets

$$
A(0,0),;
B(1,0),;
C(0,2).
$$

---

## Exercice 4 : Convexité d'une fonction

Étudier la convexité des fonctions suivantes :

1.

$$
f(x)=x^2+4x+1
$$

2.

$$
f(x)=-3x^2+5
$$

3.

$$
f(x)=e^x
$$

4.

$$
f(x)=\ln(x)
$$

---

## Exercice 5 : Extremum (une variable)

Déterminer les extremums de

$$
f(x)=x^3-6x^2+9x+1.
$$

---

## Exercice 6 : Fonction à deux variables

Soit

$$
f(x,y)=x^2+y^2-2x-4y+10.
$$

1. Calculer le gradient.
2. Déterminer le point critique.
3. Calculer la Hessienne.
4. Déterminer la nature du point critique.

---

## Exercice 7 : Hessienne

Soit

$$
f(x,y)=x^2-4xy+y^2.
$$

1. Déterminer le point critique.
2. Calculer la Hessienne.
3. Déterminer les valeurs propres.
4. Donner la nature du point critique.

---

## Exercice 8 : Critère de Monge

Soit

$$
f(x,y)=x^2+xy+y^2.
$$

1. Trouver le point critique.
2. Calculer

$$
r,;s,;t.
$$

3. Calculer

$$
D=rt-s^2.
$$

4. Déterminer la nature du point critique.

---

## Exercice 9 : Fonction convexe

Soit

$$
f(x,y)=3x^2+2y^2+4.
$$

1. Montrer que la fonction est strictement convexe.
2. Déterminer le minimum global.

---

## Exercice 10 : Exercice complet (type examen)

Soit

$$
f(x,y)=x^2+2xy+5y^2-4x-8y+10.
$$

1. Calculer le gradient.
2. Déterminer le point critique.
3. Calculer la Hessienne.
4. Étudier la nature de la Hessienne.
5. La fonction est-elle convexe ?
6. Déterminer la nature du point critique.
7. Le minimum est-il global ?

---

# Corrections

---

# Correction Exercice 1

La matrice est symétrique.

Le polynôme caractéristique est

$$
(4-\lambda)(3-\lambda)-1=0.
$$

On obtient

$$
\lambda_1=\frac{7+\sqrt5}{2},
\qquad
\lambda_2=\frac{7-\sqrt5}{2}.
$$

Les deux valeurs propres sont positives.

**Conclusion**

La matrice est **définie positive**.

---

# Correction Exercice 2

Mineur principal d'ordre 1 :

$$
\Delta_1=5>0.
$$

Mineur principal d'ordre 2 :

$$
\Delta_2=
5\times4-2\times2=16>0.
$$

Tous les mineurs sont positifs.

**Conclusion**

La matrice est **définie positive**.

---

# Correction Exercice 3

1.

Le disque est convexe.

✅ Convexe.

---

2.

L'union

$$
[0,2]\cup[5,8]
$$

n'est pas convexe.

Le segment reliant 2 et 5 ne reste pas dans l'ensemble.

❌ Non convexe.

---

3.

Un triangle est toujours convexe.

✅ Convexe.

---

# Correction Exercice 4

1.

$$
f''(x)=2>0
$$

Convexe.

---

2.

$$
f''(x)=-6<0
$$

Concave.

---

3.

$$
f''(x)=e^x>0
$$

Strictement convexe.

---

4.

$$
f''(x)=-\frac1{x^2}<0
$$

Concave.

---

# Correction Exercice 5

La dérivée est

$$
f'(x)=3x^2-12x+9
$$

$$
=3(x-1)(x-3).
$$

Points critiques

$$
x=1,;3.
$$

Deuxième dérivée

$$
f''(x)=6x-12.
$$

En

$$
x=1
$$

$$
f''(1)=-6<0.
$$

Maximum local.

En

$$
x=3
$$

$$
f''(3)=6>0.
$$

Minimum local.

---

# Correction Exercice 6

Gradient

$$
\nabla f=
\begin{bmatrix}
2x-2\
2y-4
\end{bmatrix}
$$

Point critique

$$
(1,2).
$$

Hessienne

$$
H=
\begin{pmatrix}
2&0\
0&2
\end{pmatrix}
$$

Valeurs propres

$$
2,;2.
$$

La Hessienne est définie positive.

**Conclusion**

Le point

$$
(1,2)
$$

est un minimum global.

---

# Correction Exercice 7

Gradient

$$
\nabla f=
\begin{bmatrix}
2x-4y\
-4x+2y
\end{bmatrix}
$$

Point critique

$$
(0,0).
$$

Hessienne

$$
\begin{pmatrix}
2&-4\
-4&2
\end{pmatrix}
$$

Valeurs propres

$$
6,;-2.
$$

Une positive et une négative.

**Conclusion**

Point selle.

---

# Correction Exercice 8

Gradient

$$
\nabla f=
\begin{bmatrix}
2x+y\
x+2y
\end{bmatrix}
$$

Point critique

$$
(0,0).
$$

Hessienne

$$
\begin{pmatrix}
2&1\
1&2
\end{pmatrix}
$$

On obtient

$$
r=2,
\quad
s=1,
\quad
t=2.
$$

Le déterminant est

$$
D=2\times2-1^2=3>0.
$$

Comme

$$
r>0,
$$

le point critique est un minimum local.

---

# Correction Exercice 9

La Hessienne est

$$
H=
\begin{pmatrix}
6&0\
0&4
\end{pmatrix}
$$

Toutes les valeurs propres sont positives.

La fonction est strictement convexe.

Gradient

$$
\nabla f=
\begin{bmatrix}
6x\
4y
\end{bmatrix}
$$

Le point critique est

$$
(0,0).
$$

Le minimum global est

$$
f(0,0)=4.
$$

---

# Correction Exercice 10

Gradient

$$
\nabla f=
\begin{bmatrix}
2x+2y-4\
2x+10y-8
\end{bmatrix}
$$

Le système

$$
\begin{cases}
2x+2y=4\
2x+10y=8
\end{cases}
$$

donne

$$
(x,y)=\left(\frac32,\frac12\right).
$$

Hessienne

$$
H=
\begin{pmatrix}
2&2\
2&10
\end{pmatrix}
$$

Déterminant

$$
20-4=16>0.
$$

Comme

$$
r=2>0,
$$

la Hessienne est définie positive.

La fonction est strictement convexe.

Le point critique est donc un **minimum local**, qui est également un **minimum global** grâce à la convexité.

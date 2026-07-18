# Correction — Exercice 1 : Méthode de dichotomie

On considère

$$
f(x)=x^3-2x-5,\qquad [2,3],\qquad \varepsilon=0.1.
$$

---

## 1. Vérifier que la méthode est applicable

Calculons les valeurs aux bornes :

$$
f(2)=8-4-5=-1
$$

$$
f(3)=27-6-5=16
$$

Comme

$$
f(2)\times f(3)=-16<0,
$$

la fonction change de signe sur $[2,3]$.

**Conclusion :** la méthode de dichotomie est applicable.

---

## 2. Première itération

Intervalle :

$$
[a,b]=[2,3]
$$

Milieu :

$$
x_1=\frac{2+3}{2}=2.5
$$

Calcul :

$$
f(2.5)=2.5^3-2(2.5)-5
$$

$$
=15.625-5-5
$$

$$
=5.625
$$

Comme

$$
f(2)\times f(2.5)
=(-1)\times(5.625)<0
$$

la racine appartient à

$$
[2,;2.5].
$$

---

## 3. Deuxième itération

Nouvel intervalle :

$$
[2,;2.5]
$$

Milieu :

$$
x_2=\frac{2+2.5}{2}=2.25
$$

Calcul :

$$
f(2.25)=2.25^3-2(2.25)-5
$$

$$
=11.390625-4.5-5
$$

$$
=1.890625
$$

Comme

$$
f(2)\times f(2.25)<0,
$$

le nouvel intervalle devient

$$
[2,;2.25].
$$

---

## 4. Approximation de la racine

Après deux itérations :

$$
2\le x^*\le2.25.
$$

Une approximation est

$$
x^*\approx2.125.
$$

La véritable racine est

$$
x^*\approx2.0946.
$$

---

# Réponse finale

| Itération | Intervalle | Milieu |
| --------- | ---------- | ------ |
| 1         | $[2,3]$    | $2.5$  |
| 2         | $[2,2.5]$  | $2.25$ |

Approximation :

$$
x^*\approx2.125.
$$

---

# Correction — Exercice 2 : Méthode du nombre d'or

On considère

$$
f(x)=x^2-4x+5
$$

sur

$$
[0,5]
$$

avec

$$
\varepsilon=0.5.
$$

On utilise

$$
\tau=\frac{\sqrt5-1}{2}\approx0.618.
$$

---

## 1. Première itération

Longueur :

$$
L=5
$$

Calcul des deux points :

$$
x_1=5-0.618\times5=1.91
$$

$$
x_2=0+0.618\times5=3.09
$$

---

### Valeurs de la fonction

Pour

$$
x_1=1.91
$$

$$
f(1.91)=1.91^2-4(1.91)+5
$$

$$
=3.6481-7.64+5
$$

$$
=1.0081
$$

Pour

$$
x_2=3.09
$$

$$
f(3.09)=3.09^2-4(3.09)+5
$$

$$
=9.5481-12.36+5
$$

$$
=2.1881
$$

Comme

$$
f(x_1)<f(x_2),
$$

on garde

$$
[0,;3.09].
$$

---

## 2. Deuxième itération

Nouvel intervalle

$$
[0,;3.09]
$$

Longueur :

$$
3.09
$$

Calcul :

$$
x_1=3.09-0.618(3.09)=1.18
$$

$$
x_2=0+0.618(3.09)=1.91
$$

---

### Valeurs

$$
f(1.18)=1.18^2-4(1.18)+5
$$

$$
=1.3924-4.72+5
$$

$$
=1.6724
$$

$$
f(1.91)=1.0081
$$

Comme

$$
f(1.18)>f(1.91),
$$

le minimum est dans

$$
[1.18,;3.09].
$$

---

## 3. Estimation du minimum

Le milieu du dernier intervalle est

$$
x^*=\frac{1.18+3.09}{2}=2.135.
$$

La vraie solution est

$$
x=2.
$$

---

# Réponse finale

| Itération | Intervalle     |
| --------- | -------------- |
| 1         | $[0,;3.09]$    |
| 2         | $[1.18,;3.09]$ |

Minimum estimé :

$$
x^*\approx2.135.
$$

---

# Correction — Exercice 3 : Descente de gradient à pas fixe

On considère

$$
f(x,y)=x^2+y^2+2x+4y
$$

avec

$$
(x_0,y_0)=(0,0),
\qquad
\alpha=0.25.
$$

---

## 1. Gradient

Les dérivées partielles sont

$$
\frac{\partial f}{\partial x}=2x+2
$$

$$
\frac{\partial f}{\partial y}=2y+4.
$$

Donc

$$
\nabla f(x,y)=
\begin{pmatrix}
2x+2\
2y+4
\end{pmatrix}.
$$

---

## 2. Hessienne

Les dérivées secondes sont

$$
\frac{\partial^2 f}{\partial x^2}=2,
\qquad
\frac{\partial^2 f}{\partial y^2}=2,
\qquad
\frac{\partial^2 f}{\partial x\partial y}=0.
$$

Ainsi,

$$
H=
\begin{pmatrix}
2&0\
0&2
\end{pmatrix}.
$$

La Hessienne est définie positive.

---

## 3. Première itération

Point initial

$$
(0,0).
$$

Gradient :

$$
\nabla f(0,0)=
\begin{pmatrix}
2\
4
\end{pmatrix}.
$$

Direction de descente :

$$
d_0=-\nabla f=
\begin{pmatrix}
-2\
-4
\end{pmatrix}.
$$

Mise à jour :

$$
x_1=x_0+\alpha d_0
$$

$$
=(0,0)+0.25(-2,-4)
$$

$$
=(-0.5,-1).
$$

---

## 4. Deuxième itération

Gradient au nouveau point :

$$
\nabla f(-0.5,-1)
=================

\begin{pmatrix}
2(-0.5)+2\
2(-1)+4
\end{pmatrix}
=============

\begin{pmatrix}
1\
2
\end{pmatrix}.
$$

Direction :

$$
d_1=
\begin{pmatrix}
-1\
-2
\end{pmatrix}.
$$

Mise à jour :

$$
(-0.5,-1)+0.25(-1,-2)
$$

$$
=(-0.75,-1.5).
$$

Donc

$$
(x_2,y_2)=(-0.75,-1.5).
$$

---

## 5. La méthode converge-t-elle ?

Oui.

La fonction est quadratique et la Hessienne est définie positive :

$$
H=
\begin{pmatrix}
2&0\
0&2
\end{pmatrix}.
$$

La descente de gradient converge vers l'unique minimum.

---

## 6. Nature du point obtenu

Cherchons le point critique :

$$
2x+2=0
$$

$$
2y+4=0
$$

On obtient

$$
(x^*,y^*)=(-1,-2).
$$

Comme la Hessienne est définie positive,

le point est un **minimum global**.

---

# Réponse finale

Gradient :

$$
\nabla f=
\begin{pmatrix}
2x+2\
2y+4
\end{pmatrix}
$$

Hessienne :

$$
H=
\begin{pmatrix}
2&0\
0&2
\end{pmatrix}
$$

Première itération :

$$
(-0.5,-1)
$$

Deuxième itération :

$$
(-0.75,-1.5)
$$

Solution optimale :

$$
(x^*,y^*)=(-1,-2).
$$

Nature :

**Minimum global.**

# Correction — Exercice 4 : Gradient à pas optimal (5 pts)

On considère

$$
f(x,y)=x^2+3y^2
$$

Point initial :

$$
(x_0,y_0)=(2,1).
$$

---

## 1. Calcul du gradient

Les dérivées partielles sont

$$
\frac{\partial f}{\partial x}=2x,
\qquad
\frac{\partial f}{\partial y}=6y.
$$

Donc

$$
\nabla f(x,y)=
\begin{pmatrix}
2x\
6y
\end{pmatrix}.
$$

Au point initial

$$
\nabla f(2,1)=
\begin{pmatrix}
4\
6
\end{pmatrix}.
$$

---

## 2. Direction de descente

La direction est

$$
d_0=-\nabla f=
\begin{pmatrix}
-4\
-6
\end{pmatrix}.
$$

---

## 3. Écrire

$$
x(\alpha)=x_k-\alpha\nabla f
$$

On obtient

$$
x(\alpha)=2-4\alpha
$$

$$
y(\alpha)=1-6\alpha.
$$

---

## 4. Calcul de

$$
\phi(\alpha)
$$

On remplace dans la fonction :

$$
\phi(\alpha)
=(2-4\alpha)^2
+3(1-6\alpha)^2.
$$

Développement :

$$
(2-4\alpha)^2
=4-16\alpha+16\alpha^2
$$

$$
(1-6\alpha)^2
=1-12\alpha+36\alpha^2
$$

Donc

$$
\phi(\alpha)
============

4-16\alpha+16\alpha^2
+3-36\alpha+108\alpha^2
$$

# $$

7-52\alpha+124\alpha^2.
$$

---

## 5. Calcul du pas optimal

On dérive :

$$
\phi'(\alpha)
=-52+248\alpha.
$$

On résout

$$
\phi'(\alpha)=0
$$

$$
248\alpha=52
$$

$$
\boxed{\alpha^*=\frac{13}{62}\approx0.2097.}
$$

---

## 6. Nouveau point

$$
x_1=2-4(0.2097)
=1.1612
$$

$$
y_1=1-6(0.2097)
=-0.2582
$$

Donc

$$
\boxed{(x_1,y_1)\approx(1.161,,-0.258).}
$$

---

## Conclusion

Le pas optimal est

$$
\boxed{\alpha^*=0.2097}
$$

et la méthode se rapproche du minimum

$$
(0,0).
$$

---

# Correction — Exercice 5 : Méthode de Newton (5 pts)

On considère

$$
f(x,y)=3x^2+y^2-2xy-6x
$$

avec

$$
(x_0,y_0)=(0,0).
$$

---

## 1. Calcul du gradient

$$
\frac{\partial f}{\partial x}=6x-2y-6
$$

$$
\frac{\partial f}{\partial y}=2y-2x.
$$

Ainsi

$$
\nabla f=
\begin{pmatrix}
6x-2y-6\
2y-2x
\end{pmatrix}.
$$

---

## 2. Calcul de la Hessienne

$$
H=
\begin{pmatrix}
6&-2\
-2&2
\end{pmatrix}.
$$

Son déterminant vaut

$$
\det(H)=12-4=8>0.
$$

La Hessienne est définie positive.

---

## 3. Première itération

Gradient au point initial :

$$
g_0=
\begin{pmatrix}
-6\
0
\end{pmatrix}.
$$

Inverse de la Hessienne :

$$
H^{-1}
======

\frac18
\begin{pmatrix}
2&2\
2&6
\end{pmatrix}.
$$

Méthode de Newton :

$$
x_{1}
=====

x_0-H^{-1}g_0.
$$

Calcul :

$$
H^{-1}g_0
=========

\frac18
\begin{pmatrix}
2&2\
2&6
\end{pmatrix}
\begin{pmatrix}
-6\
0
\end{pmatrix}
=============

\begin{pmatrix}
-1.5\
-1.5
\end{pmatrix}.
$$

Donc

$$
\boxed{(x_1,y_1)=(1.5,;1.5).}
$$

---

## 4. Deuxième itération

Gradient en

$$
(1.5,1.5)
$$

$$
\nabla f=
\begin{pmatrix}
0\
0
\end{pmatrix}.
$$

Donc

$$
\boxed{(x_2,y_2)=(1.5,;1.5).}
$$

La méthode s'arrête.

---

## 5. Conclusion

La méthode de Newton converge en **une seule itération**, car la fonction est quadratique.

Le point obtenu est

$$
\boxed{(1.5,;1.5)}
$$

et c'est un

$$
\boxed{\text{minimum global}.}
$$

---

# Correction — Exercice 6 : Optimisation sous contrainte (4 pts)

On considère

$$
\min f(x,y)=x^2+y^2
$$

sous

$$
x+y=6.
$$

---

## 1. Fonction objectif

La fonction à minimiser est

$$
\boxed{f(x,y)=x^2+y^2.}
$$

---

## 2. Contrainte

La contrainte est

$$
\boxed{x+y=6.}
$$

---

## 3. Type de problème

Il existe une contrainte.

Donc il s'agit d'un problème

$$
\boxed{\text{d'optimisation avec contrainte}.}
$$

---

## 4. Méthode adaptée

Comme la contrainte est une égalité,

on applique

$$
\boxed{\text{la méthode des Multiplicateurs de Lagrange}.}
$$

---

## 5. Domaine admissible

L'équation

$$
x+y=6
$$

représente

$$
\boxed{\text{une droite}.}
$$

---

# Conclusion

| Élément           | Réponse                      |
| ----------------- | ---------------------------- |
| Fonction objectif | $x^2+y^2$                    |
| Contrainte        | $x+y=6$                      |
| Type              | Optimisation avec contrainte |
| Méthode           | Multiplicateurs de Lagrange  |
| Domaine           | Une droite                   |

---

# Correction — Exercice 7 : Multiplicateurs de Lagrange (6 pts)

On veut maximiser

$$
f(x,y)=2xy
$$

sous

$$
x^2+y^2=18.
$$

---

## 1. Construire le Lagrangien

La contrainte est

$$
h(x,y)=x^2+y^2-18=0.
$$

Le Lagrangien est

$$
\boxed{
L(x,y,\lambda)
==============

2xy
+\lambda(x^2+y^2-18).
}
$$

---

## 2. Calcul des dérivées

$$
\frac{\partial L}{\partial x}
=============================

2y+2\lambda x=0
$$

$$
\frac{\partial L}{\partial y}
=============================

2x+2\lambda y=0
$$

$$
\frac{\partial L}{\partial \lambda}
===================================

x^2+y^2-18=0.
$$

---

## 3. Résolution

Des deux premières équations :

$$
y=-\lambda x
$$

$$
x=-\lambda y.
$$

En remplaçant,

$$
x=\lambda^2x.
$$

Comme

$$
x\neq0,
$$

on obtient

$$
\lambda^2=1.
$$

Deux cas.

### Cas 1

$$
\lambda=1.
$$

Alors

$$
y=-x.
$$

Avec la contrainte

$$
2x^2=18
$$

$$
x=\pm3.
$$

Points :

$$
(3,-3)
$$

$$
(-3,3).
$$

---

### Cas 2

$$
\lambda=-1.
$$

Alors

$$
y=x.
$$

Avec la contrainte

$$
2x^2=18
$$

$$
x=\pm3.
$$

Points :

$$
(3,3)
$$

$$
(-3,-3).
$$

---

## 4. Points critiques

Les quatre points sont

$$
(3,3)
$$

$$
(-3,-3)
$$

$$
(3,-3)
$$

$$
(-3,3).
$$

---

## 5. Maximum

Calcul de

$$
f(x,y)=2xy.
$$

Pour

$$
(3,3)
$$

$$
f=18.
$$

Pour

$$
(-3,-3)
$$

$$
f=18.
$$

Donc

$$
\boxed{f_{\max}=18.}
$$

---

## 6. Minimum

Pour

$$
(3,-3)
$$

$$
f=-18.
$$

Pour

$$
(-3,3)
$$

$$
f=-18.
$$

Donc

$$
\boxed{f_{\min}=-18.}
$$

---

# Conclusion

| Point     | Valeur de $f$ | Nature  |
| --------- | ------------- | ------- |
| $(3,3)$   | 18            | Maximum |
| $(-3,-3)$ | 18            | Maximum |
| $(3,-3)$  | -18           | Minimum |
| $(-3,3)$  | -18           | Minimum |

---

# Correction — Exercice 8 : Méthode de pénalité extérieure (5 pts)

On considère

$$
f(x)=x^2
$$

avec

$$
x\ge2
$$

et

$$
\rho=10.
$$

---

## 1. Écrire la contrainte sous la forme

$$
g(x)\le0
$$

La contrainte

$$
x\ge2
$$

devient

$$
\boxed{g(x)=2-x\le0.}
$$

---

## 2. Construire la fonction pénalisée

La pénalité extérieure quadratique est

$$
\boxed{
P(x)=x^2+\rho,[\max(0,2-x)]^2.
}
$$

Comme

$$
\rho=10,
$$

on obtient

$$
\boxed{
P(x)=x^2+10[\max(0,2-x)]^2.
}
$$

---

## 3. Calcul du minimum

### Cas 1 : $x\ge2$

La pénalité est nulle.

Donc

$$
P(x)=x^2.
$$

Le minimum sur

$$
x\ge2
$$

est

$$
\boxed{x=2}
$$

avec

$$
P(2)=4.
$$

---

### Cas 2 : $x<2$

Alors

$$
P(x)=x^2+10(2-x)^2.
$$

Développement :

$$
P(x)=11x^2-40x+40.
$$

Dérivée :

$$
P'(x)=22x-40.
$$

On résout

$$
22x-40=0
$$

$$
x=\frac{20}{11}\approx1.818.
$$

Comme ce point ne respecte pas la contrainte, la solution admissible reste

$$
\boxed{x=2.}
$$

---

## 4. Comparaison avec la solution réelle

Le problème initial est

$$
\min x^2
\quad\text{sous}\quad x\ge2.
$$

La solution exacte est

$$
\boxed{x=2.}
$$

La méthode de pénalité extérieure conduit également à

$$
\boxed{x=2.}
$$

# Correction — Exercice 9 : Barrière logarithmique (5 pts)

On considère

$$
f(x)=(x-4)^2
$$

avec la contrainte

$$
x>1
$$

et

$$
\lambda=0.5.
$$

---

## 1. Construire la fonction barrière

La contrainte

$$
x>1
$$

s'écrit sous la forme

$$
g(x)=1-x<0.
$$

La fonction de barrière logarithmique est

$$
B_\lambda(x)=f(x)-\lambda\ln(-g(x)).
$$

Comme

$$
-g(x)=x-1,
$$

on obtient

$$
\boxed{
B(x)=(x-4)^2-0.5\ln(x-1).
}
$$

Le domaine est

$$
\boxed{x>1.}
$$

---

## 2. Calcul de la dérivée

La dérivée du premier terme est

$$
\frac{d}{dx}(x-4)^2=2(x-4).
$$

La dérivée du second terme est

$$
\frac{d}{dx}\left[-0.5\ln(x-1)\right]
=====================================

-\frac{0.5}{x-1}.
$$

Donc

$$
\boxed{
B'(x)=2(x-4)-\frac{0.5}{x-1}.
}
$$

---

## 3. Déterminer le minimum

On cherche

$$
B'(x)=0.
$$

Donc

$$
2(x-4)-\frac{0.5}{x-1}=0.
$$

On multiplie par

$$
2(x-1)
$$

$$
4(x-4)(x-1)-1=0.
$$

Développement :

$$
4(x^2-5x+4)-1=0
$$

$$
4x^2-20x+15=0.
$$

Résolution :

$$
x=\frac{20\pm\sqrt{400-240}}{8}
$$

$$
x=\frac{20\pm\sqrt{160}}8
$$

$$
x=\frac{20\pm12.649}{8}.
$$

Les deux solutions sont

$$
x_1\approx4.081
$$

$$
x_2\approx0.919.
$$

Comme

$$
x>1,
$$

la seule solution admissible est

$$
\boxed{x^*\approx4.081.}
$$

---

## 4. Pourquoi doit-on rester dans

$$
x>1
$$

Parce que

$$
\ln(x-1)
$$

n'est défini que lorsque

$$
x-1>0.
$$

Si

$$
x\le1,
$$

le logarithme n'existe pas.

La méthode interdit donc automatiquement de sortir du domaine admissible.

---

# Conclusion

| Élément           | Résultat                  |
| ----------------- | ------------------------- |
| Fonction barrière | $(x-4)^2-0.5\ln(x-1)$     |
| Dérivée           | $2(x-4)-\dfrac{0.5}{x-1}$ |
| Minimum           | $x\approx4.081$           |
| Domaine           | $x>1$                     |

---

# Correction — Exercice 10 : Programmation linéaire (5 pts)

Une entreprise fabrique deux produits :

* Produit **A** : bénéfice **30 DH**
* Produit **B** : bénéfice **20 DH**

Sous les contraintes

$$
\begin{cases}
2A+B\le100\
A+2B\le80\
A\ge0,;B\ge0
\end{cases}
$$

---

## 1. Définir les variables

Soit

$$
A=\text{nombre d'unités du produit A}
$$

$$
B=\text{nombre d'unités du produit B}.
$$

---

## 2. Fonction objectif

Chaque unité rapporte

* 30 DH pour A
* 20 DH pour B

Donc

$$
\boxed{
\max Z=30A+20B.
}
$$

---

## 3. Contraintes

Les contraintes du problème sont

$$
\boxed{
\begin{cases}
2A+B\le100\
A+2B\le80\
A\ge0\
B\ge0
\end{cases}
}
$$

---

## 4. Domaine admissible

Le domaine admissible est l'ensemble des points

$$
(A,B)
$$

qui vérifient simultanément toutes les contraintes.

Les sommets sont obtenus par les intersections des droites.

### Sommet 1

$$
(0,0)
$$

---

### Sommet 2

Intersection avec l'axe des A

$$
B=0
$$

La contrainte

$$
2A\le100
$$

donne

$$
A=50.
$$

Donc

$$
(50,0).
$$

---

### Sommet 3

Intersection avec l'axe des B

$$
A=0
$$

La contrainte

$$
2B\le80
$$

donne

$$
B=40.
$$

Donc

$$
(0,40).
$$

---

### Sommet 4

Intersection des deux droites

$$
2A+B=100
$$

$$
A+2B=80.
$$

Résolution :

Multiplier la deuxième équation par 2

$$
2A+4B=160.
$$

Soustraction :

$$
3B=60
$$

$$
B=20.
$$

Puis

$$
A+40=80
$$

$$
A=40.
$$

Donc

$$
(40,20).
$$

---

## Conclusion

Le domaine admissible est le polygone ayant pour sommets

$$
\boxed{
(0,0),;(50,0),;(40,20),;(0,40).
}
$$

---

# Correction — Exercice 11 : Méthode graphique (5 pts)

Résoudre

$$
\max Z=4x+3y
$$

sous

$$
\begin{cases}
x+y\le8\
2x+y\le10\
x\ge0\
y\ge0
\end{cases}
$$

---

## 1. Tracer les contraintes

Les droites sont

### Première droite

$$
x+y=8.
$$

Intersections :

* $(8,0)$
* $(0,8)$

---

### Deuxième droite

$$
2x+y=10.
$$

Intersections :

* $(5,0)$
* $(0,10)$

Le domaine admissible est situé sous les deux droites et dans le premier quadrant.

---

## 2. Déterminer les sommets

Les sommets sont

### Origine

$$
(0,0).
$$

---

### Axe des x

La contrainte la plus restrictive est

$$
2x+y\le10.
$$

Donc

$$
(5,0).
$$

---

### Axe des y

La contrainte la plus restrictive est

$$
x+y\le8.
$$

Donc

$$
(0,8).
$$

---

### Intersection des deux droites

Résolution

$$
\begin{cases}
x+y=8\
2x+y=10
\end{cases}
$$

Soustraction :

$$
x=2.
$$

Puis

$$
y=6.
$$

Donc

$$
(2,6).
$$

---

## 3. Calcul de

$$
Z=4x+3y.
$$

### Au point

$$
(0,0)
$$

$$
Z=0.
$$

---

### Au point

$$
(5,0)
$$

$$
Z=20.
$$

---

### Au point

$$
(0,8)
$$

$$
Z=24.
$$

---

### Au point

$$
(2,6)
$$

$$
Z=4(2)+3(6)
$$

$$
=8+18
$$

$$
=26.
$$

---

## 4. Solution optimale

La plus grande valeur est

$$
26.
$$

Elle est obtenue au point

$$
\boxed{(2,6).}
$$

---

## Conclusion

| Sommet  | Valeur de $Z$ |
| ------- | ------------: |
| $(0,0)$ |             0 |
| $(5,0)$ |            20 |
| $(0,8)$ |            24 |
| $(2,6)$ |        **26** |

Ainsi,

$$
\boxed{
x^*=2,\qquad
y^*=6,\qquad
Z_{\max}=26.
}
$$

La méthode graphique confirme que la solution optimale d'un problème de programmation linéaire est atteinte sur un **sommet de la région admissible**.

# Correction — Exercice 11 : Méthode graphique (5 pts)

On considère le problème

$$
\max Z=4x+3y
$$

sous les contraintes

$$
\begin{cases}
x+y\le8\
2x+y\le10\
x\ge0\
y\ge0
\end{cases}
$$

---

## 1. Tracer les contraintes

### Contrainte 1

$$
x+y=8
$$

Intersections avec les axes :

* si $x=0$ alors $y=8$
* si $y=0$ alors $x=8$

---

### Contrainte 2

$$
2x+y=10
$$

Intersections :

* si $x=0$ alors $y=10$
* si $y=0$ alors $x=5$

Le domaine admissible est situé sous les deux droites et dans le premier quadrant.

---

## 2. Déterminer les sommets

### Sommet A

$$
(0,0)
$$

---

### Sommet B

Sur l'axe des x :

$$
(5,0)
$$

---

### Sommet C

Sur l'axe des y :

$$
(0,8)
$$

---

### Sommet D : intersection

Résolvons

$$
\begin{cases}
x+y=8\
2x+y=10
\end{cases}
$$

Soustraction :

$$
x=2
$$

Puis

$$
y=6.
$$

Donc

$$
D=(2,6).
$$

---

## 3. Calcul de la fonction objectif

### Au point

$$
(0,0)
$$

$$
Z=0.
$$

---

### Au point

$$
(5,0)
$$

$$
Z=4(5)+3(0)=20.
$$

---

### Au point

$$
(0,8)
$$

$$
Z=24.
$$

---

### Au point

$$
(2,6)
$$

$$
Z=4(2)+3(6)
$$

$$
=8+18
$$

$$
=26.
$$

---

## 4. Solution optimale

Le maximum est

$$
\boxed{Z_{\max}=26}
$$

obtenu pour

$$
\boxed{(x,y)=(2,6).}
$$

---

# Tableau récapitulatif

| Sommet  | Valeur de $Z$ |
| ------- | ------------: |
| $(0,0)$ |             0 |
| $(5,0)$ |            20 |
| $(0,8)$ |            24 |
| $(2,6)$ |        **26** |

---

# Correction — Exercice 12 : Méthode du Simplexe (8 pts)

Résoudre

$$
\max Z=5x+4y
$$

sous

$$
\begin{cases}
x+y\le6\
2x+y\le8\
x,y\ge0
\end{cases}
$$

---

## 1. Mise sous forme standard

Ajout des variables d'écart

$$
s_1,s_2.
$$

On obtient

$$
x+y+s_1=6
$$

$$
2x+y+s_2=8.
$$

Fonction objectif

$$
Z-5x-4y=0.
$$

---

## 2. Tableau initial

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | Second membre |
| ----- | --: | --: | ----: | ----: | ------------: |
| $s_1$ |   1 |   1 |     1 |     0 |             6 |
| $s_2$ |   2 |   1 |     0 |     1 |             8 |
| $Z$   |  -5 |  -4 |     0 |     0 |             0 |

---

## 3. Variable entrante

On choisit le coefficient le plus négatif de la ligne Z.

$$
-5<-4
$$

Donc

$$
\boxed{x\text{ entre}.}
$$

---

## 4. Variable sortante

Calcul des rapports

Première ligne

$$
\frac{6}{1}=6
$$

Deuxième ligne

$$
\frac{8}{2}=4
$$

Le plus petit rapport est

$$
4.
$$

Donc

$$
\boxed{s_2\text{ sort}.}
$$

Le pivot vaut

$$
2.
$$

---

## 5. Premier pivot

Nouvelle ligne 2

Division par 2

$$
L_2\leftarrow\frac{L_2}{2}
$$

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_2$ |   1 | 0.5 |     0 |   0.5 |  4 |

---

Annulation de la colonne x

Nouvelle ligne 1

$$
L_1-L_2
$$

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_1$ |   0 | 0.5 |     1 |  -0.5 |  2 |

Nouvelle ligne Z

$$
L_Z+5L_2
$$

| Base | $x$ |  $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | ---: | ----: | ----: | -: |
| Z    |   0 | -1.5 |     0 |   2.5 | 20 |

---

## 6. Deuxième variable entrante

Coefficient négatif restant

$$
-1.5.
$$

Donc

$$
\boxed{y\text{ entre}.}
$$

---

## 7. Variable sortante

Rapports

Première ligne

$$
\frac{2}{0.5}=4
$$

Deuxième ligne

$$
\frac{4}{0.5}=8
$$

Donc

$$
\boxed{s_1\text{ sort}.}
$$

Pivot

$$
0.5.
$$

---

## 8. Deuxième pivot

Division de la première ligne par 0.5

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $y$  |   0 |   1 |     2 |    -1 |  4 |

---

Annulation dans les autres lignes

Nouvelle ligne x

$$
L_2-0.5L_1
$$

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $x$  |   1 |   0 |    -1 |     1 |  2 |

Nouvelle ligne Z

$$
L_Z+1.5L_1
$$

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| Z    |   0 |   0 |     3 |     1 | 26 |

Tous les coefficients de la ligne Z sont positifs.

L'algorithme s'arrête.

---

# Solution optimale

$$
\boxed{x=2,\qquad y=4}
$$

Valeur optimale

$$
\boxed{Z_{\max}=26.}
$$

---

# Correction — Exercice 13 : Exercice complet (10 pts)

On considère

$$
\max Z=3x+2y
$$

sous

$$
\begin{cases}
x+y\le6\
2x+y\le8\
x,y\ge0
\end{cases}
$$

---

## 1. Mise sous forme standard

Ajout des variables d'écart

$$
x+y+s_1=6
$$

$$
2x+y+s_2=8.
$$

---

## 2. Tableau initial

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_1$ |   1 |   1 |     1 |     0 |  6 |
| $s_2$ |   2 |   1 |     0 |     1 |  8 |
| Z     |  -3 |  -2 |     0 |     0 |  0 |

---

## 3. Première itération

Variable entrante

$$
x
$$

Variable sortante

$$
s_2.
$$

Après le pivot

| Base  | $x$ |  $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | ---: | ----: | ----: | -: |
| $s_1$ |   0 |  0.5 |     1 |  -0.5 |  2 |
| $x$   |   1 |  0.5 |     0 |   0.5 |  4 |
| Z     |   0 | -0.5 |     0 |   1.5 | 12 |

---

## 4. Deuxième itération

Variable entrante

$$
y.
$$

Variable sortante

$$
s_1.
$$

Après pivot

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $y$  |   0 |   1 |     2 |    -1 |  4 |
| $x$  |   1 |   0 |    -1 |     1 |  2 |
| Z    |   0 |   0 |     1 |     1 | 14 |

Tous les coefficients de la ligne Z sont positifs.

La solution est optimale.

---

## 5. Variables de base

### Départ

$$
(s_1,s_2)
$$

---

### Après le premier pivot

$$
(s_1,x)
$$

---

### Après le second pivot

$$
(y,x).
$$

---

## 6. Solution optimale

Variables

$$
\boxed{x=2}
$$

$$
\boxed{y=4}
$$

Fonction objectif

$$
Z=3(2)+2(4)
$$

$$
=6+8
$$

$$
\boxed{Z_{\max}=14.}
$$

---

## 7. Vérification graphique

Les sommets sont

$$
(0,0),\quad(4,0),\quad(2,4),\quad(0,6).
$$

Calcul de

$$
Z
$$

| Sommet  | Valeur |
| ------- | -----: |
| $(0,0)$ |      0 |
| $(4,0)$ |     12 |
| $(2,4)$ | **14** |
| $(0,6)$ |     12 |

Le maximum est bien obtenu au sommet

$$
\boxed{(2,4)}
$$

avec

$$
\boxed{Z_{\max}=14.}
$$

# Correction — Exercice 11 : Méthode graphique (5 pts)

On considère le problème

$$
\max Z=4x+3y
$$

sous les contraintes

$$
\begin{cases}
x+y\le8\
2x+y\le10\
x\ge0\
y\ge0
\end{cases}
$$

---

## 1. Tracer les contraintes

### Contrainte 1

$$
x+y=8
$$

Intersections avec les axes :

* si $x=0$ alors $y=8$
* si $y=0$ alors $x=8$

---

### Contrainte 2

$$
2x+y=10
$$

Intersections :

* si $x=0$ alors $y=10$
* si $y=0$ alors $x=5$

Le domaine admissible est situé sous les deux droites et dans le premier quadrant.

---

## 2. Déterminer les sommets

### Sommet A

$$
(0,0)
$$

---

### Sommet B

Sur l'axe des x :

$$
(5,0)
$$

---

### Sommet C

Sur l'axe des y :

$$
(0,8)
$$

---

### Sommet D : intersection

Résolvons

$$
\begin{cases}
x+y=8\
2x+y=10
\end{cases}
$$

Soustraction :

$$
x=2
$$

Puis

$$
y=6.
$$

Donc

$$
D=(2,6).
$$

---

## 3. Calcul de la fonction objectif

### Au point

$$
(0,0)
$$

$$
Z=0.
$$

---

### Au point

$$
(5,0)
$$

$$
Z=4(5)+3(0)=20.
$$

---

### Au point

$$
(0,8)
$$

$$
Z=24.
$$

---

### Au point

$$
(2,6)
$$

$$
Z=4(2)+3(6)
$$

$$
=8+18
$$

$$
=26.
$$

---

## 4. Solution optimale

Le maximum est

$$
\boxed{Z_{\max}=26}
$$

obtenu pour

$$
\boxed{(x,y)=(2,6).}
$$

---

# Tableau récapitulatif

| Sommet  | Valeur de $Z$ |
| ------- | ------------: |
| $(0,0)$ |             0 |
| $(5,0)$ |            20 |
| $(0,8)$ |            24 |
| $(2,6)$ |        **26** |

---

# Correction — Exercice 12 : Méthode du Simplexe (8 pts)

Résoudre

$$
\max Z=5x+4y
$$

sous

$$
\begin{cases}
x+y\le6\
2x+y\le8\
x,y\ge0
\end{cases}
$$

---

## 1. Mise sous forme standard

Ajout des variables d'écart

$$
s_1,s_2.
$$

On obtient

$$
x+y+s_1=6
$$

$$
2x+y+s_2=8.
$$

Fonction objectif

$$
Z-5x-4y=0.
$$

---

## 2. Tableau initial

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | Second membre |
| ----- | --: | --: | ----: | ----: | ------------: |
| $s_1$ |   1 |   1 |     1 |     0 |             6 |
| $s_2$ |   2 |   1 |     0 |     1 |             8 |
| $Z$   |  -5 |  -4 |     0 |     0 |             0 |

---

## 3. Variable entrante

On choisit le coefficient le plus négatif de la ligne Z.

$$
-5<-4
$$

Donc

$$
\boxed{x\text{ entre}.}
$$

---

## 4. Variable sortante

Calcul des rapports

Première ligne

$$
\frac{6}{1}=6
$$

Deuxième ligne

$$
\frac{8}{2}=4
$$

Le plus petit rapport est

$$
4.
$$

Donc

$$
\boxed{s_2\text{ sort}.}
$$

Le pivot vaut

$$
2.
$$

---

## 5. Premier pivot

Nouvelle ligne 2

Division par 2

$$
L_2\leftarrow\frac{L_2}{2}
$$

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_2$ |   1 | 0.5 |     0 |   0.5 |  4 |

---

Annulation de la colonne x

Nouvelle ligne 1

$$
L_1-L_2
$$

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_1$ |   0 | 0.5 |     1 |  -0.5 |  2 |

Nouvelle ligne Z

$$
L_Z+5L_2
$$

| Base | $x$ |  $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | ---: | ----: | ----: | -: |
| Z    |   0 | -1.5 |     0 |   2.5 | 20 |

---

## 6. Deuxième variable entrante

Coefficient négatif restant

$$
-1.5.
$$

Donc

$$
\boxed{y\text{ entre}.}
$$

---

## 7. Variable sortante

Rapports

Première ligne

$$
\frac{2}{0.5}=4
$$

Deuxième ligne

$$
\frac{4}{0.5}=8
$$

Donc

$$
\boxed{s_1\text{ sort}.}
$$

Pivot

$$
0.5.
$$

---

## 8. Deuxième pivot

Division de la première ligne par 0.5

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $y$  |   0 |   1 |     2 |    -1 |  4 |

---

Annulation dans les autres lignes

Nouvelle ligne x

$$
L_2-0.5L_1
$$

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $x$  |   1 |   0 |    -1 |     1 |  2 |

Nouvelle ligne Z

$$
L_Z+1.5L_1
$$

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| Z    |   0 |   0 |     3 |     1 | 26 |

Tous les coefficients de la ligne Z sont positifs.

L'algorithme s'arrête.

---

# Solution optimale

$$
\boxed{x=2,\qquad y=4}
$$

Valeur optimale

$$
\boxed{Z_{\max}=26.}
$$

---

# Correction — Exercice 13 : Exercice complet (10 pts)

On considère

$$
\max Z=3x+2y
$$

sous

$$
\begin{cases}
x+y\le6\
2x+y\le8\
x,y\ge0
\end{cases}
$$

---

## 1. Mise sous forme standard

Ajout des variables d'écart

$$
x+y+s_1=6
$$

$$
2x+y+s_2=8.
$$

---

## 2. Tableau initial

| Base  | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | --: | ----: | ----: | -: |
| $s_1$ |   1 |   1 |     1 |     0 |  6 |
| $s_2$ |   2 |   1 |     0 |     1 |  8 |
| Z     |  -3 |  -2 |     0 |     0 |  0 |

---

## 3. Première itération

Variable entrante

$$
x
$$

Variable sortante

$$
s_2.
$$

Après le pivot

| Base  | $x$ |  $y$ | $s_1$ | $s_2$ | SM |
| ----- | --: | ---: | ----: | ----: | -: |
| $s_1$ |   0 |  0.5 |     1 |  -0.5 |  2 |
| $x$   |   1 |  0.5 |     0 |   0.5 |  4 |
| Z     |   0 | -0.5 |     0 |   1.5 | 12 |

---

## 4. Deuxième itération

Variable entrante

$$
y.
$$

Variable sortante

$$
s_1.
$$

Après pivot

| Base | $x$ | $y$ | $s_1$ | $s_2$ | SM |
| ---- | --: | --: | ----: | ----: | -: |
| $y$  |   0 |   1 |     2 |    -1 |  4 |
| $x$  |   1 |   0 |    -1 |     1 |  2 |
| Z    |   0 |   0 |     1 |     1 | 14 |

Tous les coefficients de la ligne Z sont positifs.

La solution est optimale.

---

## 5. Variables de base

### Départ

$$
(s_1,s_2)
$$

---

### Après le premier pivot

$$
(s_1,x)
$$

---

### Après le second pivot

$$
(y,x).
$$

---

## 6. Solution optimale

Variables

$$
\boxed{x=2}
$$

$$
\boxed{y=4}
$$

Fonction objectif

$$
Z=3(2)+2(4)
$$

$$
=6+8
$$

$$
\boxed{Z_{\max}=14.}
$$

---

## 7. Vérification graphique

Les sommets sont

$$
(0,0),\quad(4,0),\quad(2,4),\quad(0,6).
$$

Calcul de

$$
Z
$$

| Sommet  | Valeur |
| ------- | -----: |
| $(0,0)$ |      0 |
| $(4,0)$ |     12 |
| $(2,4)$ | **14** |
| $(0,6)$ |     12 |

Le maximum est bien obtenu au sommet

$$
\boxed{(2,4)}
$$

avec

$$
\boxed{Z_{\max}=14.}
$$
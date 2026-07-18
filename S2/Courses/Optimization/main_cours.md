# Cours Complet d’Optimisation







## 1.1 Définitions fondamentales 9 ## 1.2 Représentation graphique 9 ## 1.3 Limites et continuité 10 ## 1.4 Dérivée première 10 ## 1.4.1 Signification géométrique 11 ## 1.4.2 Interprétation physique 11 ## 1.5 Dérivée seconde et convexité 11 ## 1.6 Points critiques et extrema 11 ## 1.7 Points d’inflexion 12 ## 1.8 Méthodes rapides et astuces d’examen 12

## 2 Fonctions de plusieurs variables 15

## 2.1 Définitions 15 ## 2.2 Courbes de niveau 15 ## 2.3 Surfaces 16

## 3 Le Gradient 17

## 3.1 Définition 17 ## 3.2 Interprétation géométrique 18 ## 3.3 Interprétation physique 18

## 4 Points critiques 19

## 4.1 Cas d’une variable 19 ## 4.2 Cas de plusieurs variables 19

## 5 Nature des points critiques 23

## 5.1 Cas d’une variable – Rappels 23 ## 5.2 Cas de plusieurs variables – La matrice Hessienne 23 ## 5.3 Méthode pratique pour n=2 25

## 6 La Matrice Hessienne 27

## 6.1 Construction pas à pas 27 ## 6.2 Interprétation de la Hessienne 28

## 7 Convexité et Concavité 29 ## 7.1 Cas d’une variable 29 ## 7.2 Cas de plusieurs variables 29

## 8 Valeurs propres 31 ## 8.1 Définition 31 ## 8.2 Polynôme caractéristique 31 ## 8.3 Cas 2x2 – Formule magique 32 ## 8.4 Lien avec la Hessienne 32

## 9 Matrices définies positives 35 ## 9.1 Définitions 35 ## 9.2 Critères de détermination 35 ## 9.2.1 Critère des valeurs propres 35 ## 9.2.2 Critère de Sylvester (mineurs principaux) 36

## 10 Décomposition de Cholesky 39 ## 10.1 Pourquoi Cholesky ? 39 ## 10.2 Algorithme 39 ## 10.3 Application à la résolution de Ax = b 40

## 11 Le Déterminant 43 ## 11.1 Définition et propriétés 43 ## 11.2 Calcul pratique 43 ## 11.3 Lien avec la Hessienne 44

## 12 Fonctions quadratiques 45 ## 12.1 Définition 45 ## 12.2 Rôle des coefficients 45 ## 12.3 Comment reconnaître une fonction quadratique 46

## 13 Forme quadratique 47 ## 13.1 Définition 47 ## 13.2 Comment construire la matrice A 47

## 14 Détermination du point critique d’une fonction quadratique 49 ## 14.1 Pourquoi le gradient vaut Ax + b ? 49 ## 14.2 Le système Ax = -b 49 ## 14.3 Méthodes de résolution 49 ## 14.3.1 Inversion de matrice 49 ## 14.3.2 Élimination de Gauss 50 ## 14.3.3 Décomposition LU 50 ## 14.3.4 Décomposition de Cholesky 50

## 15 Méthodes et astuces 51 ## 15.1 Arbre de décision général 51 ## 15.2 Pour chaque type d’exercice 51 ## 15.2.1 Type 1 : Trouver les extrema d’une fonction 52 ## 15.2.2 Type 2 : Fonction quadratique 52 ## 15.2.3 Type 3 : Nature de la Hessienne 52 ## 15.3 Conseils pour réussir les examens 53

## 16 Synthèse et fiches de révision 55 ## 16.1 Fiche 1 : Définitions essentielles . . . . . . . . . . . . . . . . . . . . 55 ## 16.2 Fiche 2 : Théorèmes importants . . . . . . . . . . . . . . . . . . . . 55 ## 16.3 Fiche 3 : Formules à connaître par cœur . . . . . . . . . . . . . . . . . . . 55 ## 16.4 Fiche 4 : Arbre de décision complet . . . . . . . . . . . . . . . . . . . . 56 ## 16.5 Fiche 5 : Tableau comparatif des méthodes . . . . . . . . . . . . . . . . . . 56







Bienvenue dans ce cours complet d’optimisation. Ce document a été conçu pour vous accom- pagner pas à pas dans la compréhension des concepts fondamentaux de l’optimisation mathéma- tique, depuis les fonctions d’une seule variable jusqu’aux méthodes numériques avancées.

## • À retenir

## Objectifs du cours :

1. Comprendre la notion de point critique et savoir le déterminer

2. Maîtriser les critères de nature (minimum, maximum, point-selle)

3. Savoir utiliser la matrice Hessienne et ses valeurs propres

4. Connaître les méthodes de résolution des systèmes linéaires

5. Être capable de reconnaître et résoudre les problèmes d’optimisation quadratique

## Remarque

Ce cours suppose connues les notions de base d’algèbre linéaire (matrices, vecteurs, déter- minants) et d’analyse (dérivation, intégration). Si vous avez des lacunes dans ces domaines, je vous invite à les combler avant d’aborder les chapitres avancés.





# 1 . Chapitre 1 Fonctions d’une seule variable

## Remarque

Ce chapitre revisite les notions de base que vous avez vues en première année, mais sous un angle préparatoire à l’optimisation. Ne négligez pas ces fondements : ils sont essentiels pour comprendre ce qui suit.

## 1.1 Définitions fondamentales

## Définition

Une fonction numérique f d’une variable réelle est une application qui à chaque élément x d’un ensemble D ⊂ R associe un unique nombre réel f (x). On note :

\[f : D \subset \mathbb{R} \to \mathbb{R}, \quad x \mapsto f(x)\]

L’ensemble D est appelé domaine de définition de f.

## Exemple

Soit f (x) = √x − 2. Le domaine de définition est D = [2, +∞[ car l’expression sous la racine doit être positive ou nulle.

Erreur classique : Oublier de vérifier le domaine avant de chercher les extrema. Vous ne pouvez pas trouver de minimum en x = 0 si la fonction n’est pas définie en ce point !

## 1.2 Représentation graphique

La représentation graphique d’une fonction f est l’ensemble des points (x, f (x)) pour x ∈ D. En optimisation, cette courbe nous permet de visualiser immédiatement les comportements de f.

## 1.3 Limites et continuité

Définition

On dit que f admet pour limite ℓ en a si :

\[ \forall \varepsilon > 0, \exists \delta > 0 \text{ tel que } |x - a| < \delta \Rightarrow |f(x) - \ell| < \varepsilon \]

On note lim x→a f(x) = ℓ.

Définition

Une fonction f est continue en a si lim x→a f(x) = f(a).

Théorème - Weierstrass

Si f est continue sur un segment [a, b], alors f est bornée et atteint ses bornes sur [a, b]. En particulier, il existe c, d ∈ [a, b] tels que :

\[ f(c) = \min_{x \in [a,b]} f(x) \quad \text{et} \quad f(d) = \max_{x \in [a,b]} f(x) \]

Remarque

Ce théorème est fondamental en optimisation : il garantit l’existence d’un optimum lorsque la fonction est continue sur un compact. C’est notre “certificat d’existence”.

## 1.4 Dérivée première

Définition

La dérivée de f en a est définie par :

\[ f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h} \]

lorsque cette limite existe.

## 1.4.1 Signification géométrique La dérivée f'(a) représente la pente de la tangente à la courbe de f au point d'abscisse a.



## 1.4.2 Interprétation physique

Si f(t) représente la position d’un mobile à l’instant t, alors f′(t) est la vitesse instantanée du mobile à cet instant.

## 1.5 Dérivée seconde et convexité

## Définition

La dérivée seconde f′′(x) est la dérivée de la dérivée première. Elle mesure la courbure de la fonction.

## Définition

Une fonction f est :

— Convexe sur I si f′′(x) ≥ 0 pour tout x ∈ I

— Concave sur I si f′′(x) ≤ 0 pour tout x ∈ I



## 1.6 Points critiques et extrema

## Définition

Un point c est un point critique de f si f′(c) = 0 ou si f′(c) n’existe pas.

Théorème – Condition nécessaire d’optimalité

Si f est dérivable en c et si c est un extremum local de f, alors f′(c) = 0.

## Attention

La réciproque est fausse! \(f'(c) = 0\) ne garantit pas que \(c\) soit un extremum. Pensez à \(f(x) = x^3\) en \(x = 0\) : la dérivée est nulle, mais \(c\) est un point d’inflexion, pas un extremum.

## Théorème – Test de la dérivée seconde

Soit c un point critique (f'(c) = 0) avec f'' continue en c.

— Si f''(c) > 0 : c est un minimum local strict

— Si f''(c) < 0 : c est un maximum local strict

— Si f''(c) = 0 : on ne peut pas conclure (test inconclusif)

## Exemple

Étudions f(x) = x3 – 3x.

Étape 1 : f'(x) = 3x² – 3 = 3(x² – 1) = 3(x – 1)(x + 1).

Les points critiques sont x = –1 et x = 1.

Étape 2 : f''(x) = 6x.

En x = −1 : f''(−1) = −6 < 0 ⇒ maximum local.

En x = 1 : f''(1) = 6 > 0 ⇒ minimum local.

Vérification : f(−1) = 2 et f(1) = −2. Le maximum vaut 2, le minimum vaut −2.

## 1.7 Points d’inflexion

## Définition

Un point d’inflexion est un point où la courbe change de convexité (passe de convexe à concave ou inversement). Condition nécessaire : f''(c) = 0 (si f'' existe et est continue).

## Erreur fréquente

Erreur fréquente : Croire que f''(c) = 0 suffit pour avoir un point d’inflexion. Il faut en plus que f'' change de signe en c.

Contre-exemple : f(x) = x4. On a f''(0) = 0, mais f''(x) = 12x2 ≥ 0 partout : la fonction reste convexe, il n’y a pas de point d’inflexion en 0.

## 1.8 Méthodes rapides et astuces d’examen

## Méthode – Méthode complète pour trouver les extrema d’une fonction

Étape 1 : Déterminer le domaine de définition D.

Étape 2 : Calculer f'(x).

Étape 3 : Résoudre f'(x) = 0 pour trouver les points critiques.

Étape 4 : Calculer f''(x) et évaluer en chaque point critique.

Étape 5 : Si f''(c) = 0, utiliser le test de la dérivée première (étudier le signe de f' autour de c).

Étape 6 : Comparer les valeurs de f aux extrema et aux bornes du domaine pour les extrema globaux.

## Astuce

Astuce de calcul : Pour factoriser f ′(x), commencez toujours par factoriser les coefficients numériques et repérer les formules remarquables. Cela vous fera gagner un temps précieux à l’examen.

Conseil d’examen : Quand on vous demande de “déterminer la nature des points critiques”, ne vous contentez jamais de dire “f ′(c) > 0 donc minimum”. Expliquez toujours :

1. Que c est bien un point critique (f ′(c) = 0)

2. Le signe de f ′(c)

3. La conclusion précise (minimum local strict)

## • À retenir

Tableau récapitulatif – Nature des points critiques (une variable)

<table>ConditionConclusionPreuvef'(c) = 0 et f''(c) &gt; 0Minimum local strictDérivée secondef'(c) = 0 et f''(c) &lt; 0Maximum local strictDérivée secondef'(c) = 0 et f''(c) = 0Test inconclusifVoir dérivée premièref'(c) n'existe pasPoint critique possibleÉtudier le voisinage</table>



# 2 Chapitre 2 Fonctions de plusieurs variables

## Remarque

Nous passons maintenant à la dimension supérieure. Tout ce que vous avez appris sur les fonctions d’une variable se généralise, mais avec des subtilités importantes. La visualisation devient plus difficile, c’est pourquoi les outils algébriques (gradient, Hessienne) deviennent indispensables.

## 2.1 Définitions

## Définition

Une fonction de plusieurs variables est une application :

\[f : D \subset \mathbb{R}^n \to \mathbb{R}, \quad (x_1, \dots, x_n) \mapsto f(x_1, \dots, x_n)\]

Le domaine D est un sous-ensemble de R n.

## Exemple

— f(x,y) = x2 + y2 : fonction de deux variables (paraboloïde)

— g(x,y,z) = x2 + y2 + z2 : fonction de trois variables

— h(x1, x2, x3, x4) = x1x2 + x3x4 : fonction de quatre variables

## 2.2 Courbes de niveau

## Définition

Pour k ∈ R, la courbe de niveau k de f est l’ensemble :

\[ \{(x, y) \in D : f(x, y) = k\} \]

## 2. FONCTIONS DE PLUSIEURS VARIABLES



## Remarque

Les courbes de niveau sont l’équivalent des lignes de contour sur une carte topographique. Plus les courbes sont resserrées, plus la pente est forte.

## 2.3 Surfaces

Le graphe d’une fonction f(x,y) est une surface dans R3 :

\[S = \{(x, y, z) \in \mathbb{R}^3 : z = f(x, y)\}\]


# 3 Chapitre 3 Le Gradient

## 3.1 Définition

## Définition

Soit f : R n → R une fonction de classe C 1. Le gradient de f en x = (x 1 , . . . , x n ) est le vecteur colonne :

\[ \nabla f(x) = \begin{pmatrix} \frac{\partial f}{\partial x_1}(x) \\ \frac{\partial f}{\partial x_2}(x) \\ \vdots \\ \frac{\partial f}{\partial x_n}(x) \end{pmatrix} \]

## Exemple

Soit f(x,y) = x2y + 3x − y3.

Calcul des dérivées partielles :

\[ \frac{\partial f}{\partial x} = 2xy + 3 \\ \frac{\partial f}{\partial y} = x^2 - 3y^2 \]

Donc :

\[ \nabla f(x, y) = \begin{pmatrix} 2xy + 3 \\ x^2 - 3y^2 \end{pmatrix} \]

\[ \text{En } (1, 2) : \nabla f(1, 2) = \begin{pmatrix} 7 \\ -11 \end{pmatrix}. \]

## 3.2 Interpretation geometrique

## Théorème

Le gradient ∇f(x) pointe dans la direction de plus forte pente ascendante de f au point x. Sa norme ‖∇f(x)‖ mesure la raideur de cette pente.



## Remarque

Le gradient est toujours perpendiculaire aux courbes (ou surfaces) de niveau. C’est une propriété fondamentale à retenir.

## 3.3 Interpretation physique

Si f(x,y) représente la température au point (x,y), alors :

— ∇f(x,y) indique la direction dans laquelle la température augmente le plus vite

— −∇f(x,y) indique la direction de refroidissement maximal

## Astuce

Astuce de calcul : Pour calculer le gradient rapidement :

1. Dérivez par rapport à x1 en traitant toutes les autres variables comme des constantes

2. Faites de même pour x2, . . . , xn

3. Assemblez les résultats en colonne

## Erreur fréquente

Erreur fréquente : Oublier que le gradient est un vecteur colonne, pas un vecteur ligne. En optimisation, cette distinction est cruciale car on écrit souvent ∇f(x)Tv (produit scalaire).

# 4 Points Chapitre 4

## 4.1 Cas d’une variable

## Définition

Un point c est critique pour f si f′(c) = 0 ou si f′(c) n’existe pas.

## Méthode – Méthode complète – Une variable

Étape 1 : Calculer f′(x).

Étape 2 : Résoudre f′(x) = 0.

Étape 3 : Ajouter les points où f′ n’existe pas.

Étape 4 : Vérifier que chaque point critique appartient au domaine de définition.

## 4.2 Cas de plusieurs variables

## Définition

Un point x* ∈ R n est un point critique de f si :

\[ \nabla f(x^*) = 0 \]

c’est-à-dire si toutes les dérivées partielles s’annulent simultanément en x*.

## Méthode – Méthode complète – Plusieurs variables

Étape 1 : Calculer toutes les dérivées partielles ∂f ∂xi.

Étape 2 : Écrire le système ∇f(x) = 0, c’est-à-dire :

\[ \begin{cases} \frac{\partial f}{\partial x_1} = 0 \\ \frac{\partial f}{\partial x_2} = 0 \\ \vdots \\ \frac{\partial f}{\partial x_n} = 0 \end{cases} \]

Étape 3 : Résoudre ce système (par substitution, combinaison linéaire, etc.).

## 4.2. CAS DE PLUSIEURS VARIABLES

Étape 4 : Vérifier que chaque solution appartient au domaine de définition.

## Exemple

Trouvons les points critiques de f(x,y) = x2 + y2 − 2x − 4y + 5. Étape 1 : Calcul du gradient

\[ \frac{\partial f}{\partial x} = 2x - 2 \\ \frac{\partial f}{\partial y} = 2y - 4 \]

Étape 2 : Système

\[ \begin{cases} 2x - 2 = 0 \\ 2y - 4 = 0 \end{cases} \implies \begin{cases} x = 1 \\ y = 2 \end{cases} \]

Conclusion : Le seul point critique est (1, 2).

Vérification : f(1,2) = 1 + 4 – 2 – 8 + 5 = 0. C’est bien le minimum global (la fonction est une paraboloïde décalée).

## Exercice d’application

Trouver les points critiques de f(x,y) = x3 + y3 − 3xy.

## Solution détaillée

Étape 1 : Gradient

\[ \begin{align*} \frac{\partial f}{\partial x} &= 3x^2 - 3y \\ \frac{\partial f}{\partial y} &= 3y^2 - 3x \end{align*} \]

Étape 2 : Système

\[ \begin{cases} 3x^2 - 3y = 0 \\ 3y^2 - 3x = 0 \end{cases} \implies \begin{cases} y = x^2 \\ x = y^2 \end{cases} \]

De la première équation : y = x2. En substituant dans la seconde :

\[ x = (x^2)^2 = x^4 \implies x^4 - x = 0 \implies x(x^3 - 1) = 0 \]

Cas 1 : x = 0 ⇒ y = 0 ⇒ point (0,0)

Cas 2 : x3 = 1 ⇒ x = 1 ⇒ y = 1 ⇒ point (1, 1)

Conclusion : Les points critiques sont (0,0) et (1,1).

## Erreur fréquente

Erreur fréquente : Oublier de vérifier que les solutions du système sont bien dans le domaine de définition. Si f(x,y) = ln(x) + ln(y), le point (−1, −1) ne serait pas acceptable même s’il annulait le gradient.

## Conseil d’examen

Conseil d’examen : Quand vous résolvez un système non linéaire, pensez toujours à
factoriser. Les facteurs communs vous donnent des cas à étudier séparément. N’oubliez
jamais le cas “égal à zéro” !
Cours d’Optimisation
21



# 5 Nature des points critiques

## Remarque

Ce chapitre est le cœur du cours. Savoir déterminer la nature d’un point critique est la compétence fondamentale de l’optimisation. Maîtrisez-le parfaitement.

## 5.1 Cas d’une variable – Rappels

Théorème – Test de la dérivée seconde

Soit c tel que f'(c) = 0.

— f''(c) > 0 ⇒ minimum local strict

— f''(c) < 0 ⇒ maximum local strict

— f''(c) = 0 ⇒ test inconclusif

Exemple – Cas f''(c) = 0 – Test inconclusif

— f(x) = x4 : f'(0) = f''(0) = 0, mais f(x) ≥ 0 : minimum en 0

— g(x) = −x4 : g′(0) = g′′(0) = 0, mais g(x) ≤ 0 : maximum en 0

— h(x) = x3 : h′(0) = h′′(0) = 0, pas d’extremum : point d’inflexion

## 5.2 Cas de plusieurs variables – La matrice Hessienne

## Définition

Soit f : R n → R de classe C 2. La matrice Hessienne de f en x est :

\[H_f(x) = \nabla^2 f(x) = \begin{pmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{pmatrix}\]

## Proposition

Par le théorème de Schwarz, si f est C2, alors :

\[ \frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i} \]

Donc Hf(x) est une matrice symétrique.

## 5.3. MÉTHODE PRATIQUE POUR N=2

## Théorème – Classification par la Hessienne

Soit x* un point critique (∇f(x*) = 0) et H = Hf(x*).

— Si H est définie positive : x* est un minimum local strict

— Si H est définie négative : x* est un maximum local strict

— Si H est indéfinie : x* est un point-selle

— Si H est semi-définie : le test est inconclusif

## Erreur fréquente

Erreur monumentale : Confondre “définie positive” et “à coefficients positifs”. Une ma- trice peut avoir tous ses coefficients positifs sans être définie positive, et inversement.

Contre-exemple : A = 1 2 1 a des coefficients positifs, mais ses valeurs propres sont 2 1

3 et –1 : elle est indéfinie.

## 5.3 Méthode pratique pour n=2

Pour une fonction de deux variables, la Hessienne est :

\[H = \begin{pmatrix} a & b \\ b & d \end{pmatrix}\]

## Méthode – Méthode du déterminant pour n = 2

Calculons det(H) = ad – b2.

Cas 1 : det(H) > 0 et a > 0 ⇒ H définie positive ⇒ minimum

Cas 2 : det(H) > 0 et a < 0 ⇒ H définie négative ⇒ maximum

Cas 3 : det(H) < 0 ⇒ H indéfinie ⇒ point-selle

Cas 4 : det(H) = 0 ⇒ test inconclusif

## Exemple

Reprenons f(x,y) = x3 + y3 − 3xy avec ses points critiques (0, 0) et (1, 1).

Hessienne :

\[H_f(x, y) = \begin{pmatrix} 6x & -3 \\ -3 & 6y \end{pmatrix}\]

En (0, 0) :

\[H_f(0, 0) = \begin{pmatrix} 0 & -3 \\ -3 & 0 \end{pmatrix}\]

det(H) = 0 x 0 – (–3)2 = –9 < 0 ⇒ point-selle.

En (1, 1) :

\[H_f(1, 1) = \begin{pmatrix} 6 & -3 \\ -3 & 6 \end{pmatrix}\]

det(H) = 36 – 9 = 27 > 0 et a = 6 > 0 ⇒ minimum local strict.

##  À retenir  Arbre de décision – Nature des points critiques (n = 2)


# 6 La Matrice Hessionne

## 6.1 Construction pas à pas

Étape 1 : Écrivez la fonction f ( x 1 , . . . , x n ) . Étape 2 : Calculez toutes les dérivées partielles premières ∂f ∂x i . Étape 3 : Pour chaque dérivée partielle première, calculez les dérivées partielles secondes ∂2f ∂x i ∂x j . Étape 4 : Assemblez ces dérivées secondes dans une matrice n × n . Étape 5 : Vérifiez la symétrie (théorème de Schwarz).

Soit f ( x , y , z ) = x 2 y + y z 2 + x z . Dérivées premières :

\[
\begin{align*}
\frac{\partial f}{\partial x} &= 2xy + z \\
\frac{\partial f}{\partial y} &= x^2 + z^2 \\
\frac{\partial f}{\partial z} &= 2yz + x
\end{align*}
\]

Dérivées secondes :

\[
\begin{array}{c|ccc}
& \partial x & \partial y & \partial z \\
\hline
\partial x & 2y & 2x & 1 \\
\partial y & 2x & 0 & 2z \\
\partial z & 1 & 2z & 2y
\end{array}
\]

Hessienne :

\[
H_f(x, y, z) = \begin{pmatrix} 2y & 2x & 1 \\ 2x & 0 & 2z \\ 1 & 2z & 2y \end{pmatrix}
\]

Vérification : La matrice est bien symétrique ( H12 = H21 = 2x, etc.).

## 6.2 Interprétation de la Hessienne

La Hessienne généralise la notion de dérivée seconde. Elle encode toute l’information sur la courbure de la fonction dans toutes les directions.

## Proposition

Pour f : R n → R, le développement de Taylor à l’ordre 2 s’écrit :

\[f(x+h) = f(x) + \nabla f(x)^T h + \frac{1}{2}h^T H_f(x)h + o(\|h\|^2)\]

Le terme quadratique 12hTHf(x)h détermine la nature du point critique.

## Remarque

Si vous connaissez le développement de Taylor à une variable :

\[f(x+h) = f(x) + f'(x)h + \frac{1}{2}f''(x)h^2 + o(h^2)\]

Alors en plusieurs variables, f′(x) devient le gradient et f′′(x) devient la Hessienne. C’est exactement la même idée !

# 7 Convexité et Concavité

## 7.1 Cas d’une variable

## Définition

Une fonction f est convexe sur I si pour tout x, y ∈ I et tout t ∈ [0, 1] :

\[f(tx + (1-t)y) \leq tf(x) + (1-t)f(y)\]

Elle est concave si −f est convexe.



<center>Fonction convexe : la corde est au-dessus de la courbe</center>

Théorème = Critère de convexité

Si f est C2 sur I, alors :

— f est convexe sur I ⇔ f′′(x) ≥ 0 pour tout x ∈ I

— f est concave sur I ⇔ f′′(x) ≤ 0 pour tout x ∈ I

## 7.2 Cas de plusieurs variables

## Définition

Une fonction f : R n → R est convexe si pour tout x, y ∈ R n et tout t ∈ [0, 1] :

\[f(tx + (1-t)y) \leq tf(x) + (1-t)f(y)\]

## 7.2. CAS DE PLUSIEURS VARIABLES

Théorème – Critère de convexité multidimensionnel

Soit f : R” → R de classe C2.

— f est convexe ⇔ Hf(x) est semi-définie positive pour tout x

— f est strictement convexe ⇔ Hf(x) est définie positive pour tout x

## Remarque

Ce théorème est fondamental : il relie la convexité (propriété géométrique) à la Hessienne (propriété algébrique). C’est le pont entre l’intuition et le calcul.

## Exemple

Soit f(x,y) = x2 + y2. Sa Hessienne est :

\[H_f(x, y) = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}\]

Les valeurs propres sont 2 et 2 (toutes positives). Donc Hf est définie positive partout, et f est strictement convexe.

C’est cohérent avec l’intuition : f est un parabolóide, clairement “en bol”.

## Lien crucial :

Convexité de f ⇐⇒ Hessienne semi-définie positive

Conséquence pratique : Si f est convexe et x* est un point critique, alors x* est automatiquement un minimum global.

# 8 Chapitre 8 Valeurs propres

## 8.1 Définition

## Définition

Soit A une matrice carrée n × n. Un scalaire λ ∈ C est une valeur propre de A s’il existe un vecteur v ̸ = 0 tel que :

\[Av = \lambda v\]

Le vecteur v est appelé vecteur propre associé à λ.

## Remarque

L’équation Av = λv signifie que A agit sur v simplement en l’étirant (ou le contractant) d’un facteur λ. La direction de v est préservée, seule sa longueur change.

## 8.2 Polynôme caractéristique

## Définition

Le polynôme caractéristique de A est :

\[P_A(\lambda) = \det(A - \lambda I)\]

Les valeurs propres de A sont les racines de PA.

## Méthode – Calcul des valeurs propres

Étape 1 : Former A - λI.

Étape 2 : Calculer det(A - λI).

Étape 3 : Résoudre det(A - λI) = 0.

Étape 4 : Les solutions sont les valeurs propres.

## CHAPITRE 8. VALEURS PROPRES
Exemple
Soit A =
�4
2
2
3
�
.
Étape 1 :
A −λI =
�4 −λ
2
2
3 −λ
�
Étape 2 :
det(A −λI) = (4 −λ)(3 −λ) −4 = λ2 −7λ + 8
Étape 3 :
λ = 7 ± √49 −32
2
= 7 ±
√
17
2
Donc λ1 = 7+
√
17
2
≈5.56 et λ2 = 7−
√
17
2
≈1.44.
8.3
Cas 2x2 – Formule magique
Astuce
Pour une matrice 2 × 2 : A =
�a
b
c
d
�
Le polynôme caractéristique est :
λ2 −tr(A)λ + det(A) = 0
où tr(A) = a + d (trace) et det(A) = ad −bc.
Formule des racines :
λ = tr(A) ±
�
tr(A)2 −4 det(A)
2
8.4
Lien avec la Hessienne
Théorème
Soit H la Hessienne de f en un point critique x∗.
— Si toutes les valeurs propres de H sont > 0 : H est définie positive ⇒minimum
local
— Si toutes les valeurs propres de H sont < 0 : H est définie négative ⇒maximum
local
— Si H a des valeurs propres > 0 et < 0 : H est indéfinie ⇒point-selle
32
Cours d’Optimisation

## 8.4. LIEN AVEC LA HESSIENNE

## Remarque

Pour une matrice 2 × 2, il suffit de regarder le déterminant et le premier coefficient :

— det(H) > 0 et H11 > 0 : les deux valeurs propres sont positives

— det(H) > 0 et H11 < 0 : les deux valeurs propres sont négatives

— det(H) < 0 : une valeur propre positive, une négative

C’est beaucoup plus rapide que de calculer explicitement les valeurs propres !



# 9 Chapitre 9 Matrices définies positives

Remarque

Ce chapitre est absolument central. Vous ne pouvez pas faire d’optimisation sans maîtriser ces notions. Prenez le temps de bien comprendre chaque critère.

## 9.1 Définitions

## Définition

Soit A une matrice symétrique n x n. On dit que A est :

— Défini positiive (A > 0) si xT Ax > 0 pour tout x ̸ = 0

— Semi-définie positive (A ≥ 0) si xT Ax ≥ 0 pour tout x

— Définie négative (A < 0) si xT Ax < 0 pour tout x ̸ = 0

— Semi-définie négative (A ≤ 0) si xT Ax ≤ 0 pour tout x

— Indéfinie s’il existe x, y tels que xT Ax > 0 et yT Ay < 0

## 9.2 Critères de détermination

## 9.2.1 Critère des valeurs propres

## Théorème

Soit A symétrique avec valeurs propres λ1, . . . , λn.

— A définie positive ⇔ toutes les λi > 0

— A semi-définie positive ⇔ toutes les λi ≥ 0

— A définie négative ⇔ toutes les λi < 0

— A indéfinie ⇔ il existe λi > 0 et λj < 0

## 9.2.2 Critère de Sylvester (mineurs principaux)

## 9.2.2 Critère de Sylvester (mineurs principaux)

Soit A symétrique. Les mineurs principaux sont les déterminants :

\[ \Delta_1 = a_{11}, \quad \Delta_2 = \det \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}, \quad \Delta_3 = \det \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{pmatrix}, \quad \dots \]

— A définie positive ⇔ Δ1 > 0, Δ2 > 0, Δ3 > 0, …(tous positifs)

— A définie négative ⇔ Δ1 < 0, Δ2 > 0, Δ3 < 0, …(signes alternés)

## Astuce

Pour n = 2 : A = (a b) (b d)

Définie positive : a > 0 et ad − b2 > 0

Définie négative : a < 0 et ad − b2 > 0

Indéfinie : ad − b2 < 0

C’est le critère le plus rapide pour les examens !

## • À retenir

## Tableau récapitulatif complet

<table>TypeValeurs propresMineurs (Sylvester)SignificationDéfinie positivetoutes &gt; 0Δ1 &gt; 0, Δ2 &gt; 0, …Minimum localSemi-déf. positivetoutes ≥ 0tous ≥ 0Minimum possibleDéfinie négativetoutes &lt; 0Δ1 &lt; 0, Δ2 &lt; 0, …Maximum localSemi-déf. négativetoutes ≤ 0signes alternés, ≥ 0Maximum possibleIndéfiniesignes opposéspas de règle fixePoint-selle</table>

## Exemple

\[ \text{Classifications } A = \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}. \]

Méthode 1 – Valeurs propres :

\[ \det(A - \lambda I) = (2 - \lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 1)(\lambda - 3) = 0 \]

λ1 = 1 > 0, λ2 = 3 > 0 ⇒ définie positive.

Méthode 2 – Sylvester :

\[ \Delta_1 = 2 > 0 \]

\[ \Delta_2 = 4 - 1 = 3 > 0 \]

Conclusion identique : définie positive.

## Erreur fréquente

Erreur classique : Pour tester si A est définie négative, certains étudiants vérifient “tous les mineurs négatifs”. C’est FAUX !

## 9.2. CRITÈRES DE DÉTERMINATION

La bonne règle est : Δ1 < 0, Δ2 > 0, Δ3 < 0, etc. (signes alternés). Astuce mnémotechnique : Pensez à A = −In. Ses mineurs sont (−1)k. Le signe alterne !



# 10 Decomposition de Cholesky

## 10.1 Pourquoi Cholesky ?

## Remarque

En optimisation, on résout constamment des systèmes linéaires de la forme Ax = b, notam- ment quand on cherche les points critiques (∇f (x) = 0). Quand A est symétrique définie positive, la décomposition de Cholesky est la méthode la plus efficace et la plus stable numériquement.

## Définition

Soit A une matrice symétrique définie positive. La décomposition de Cholesky consiste à écrire :

\[A = LL^T\]

où L est une matrice triangulaire inférieure avec des éléments diagonaux strictement positifs.

## Théorème – Existence et unicité

Toute matrice symétrique définie positive admet une unique décomposition de Cholesky A = LLT.

## 10.2 Algorithme

## Méthode – Décomposition de Cholesky

Pour A = (aij) symétrique définie positive, on construit L = (lij) triangulaire inférieure : Pour i = 1 à n :

\[1. \ l_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i-1} l_{ik}^2}\]

2. Pour j = i + 1 à n :

\[l_{ji} = \frac{1}{l_{ii}} \left( a_{ji} - \sum_{k=1}^{i-1} l_{jk} l_{ik} \right)\]

## 10. DÉCOMPOSITION DE CHOLESKY

## Exemple

Décomposons A = (4 2 2 3 ).

Vérification préalable : A est symétrique. det(A) = 12 −4 = 8 > 0 et a11 = 4 > 0. Donc A est définie positive.

Calcul de L :

\[l_{11} = \sqrt{a_{11}} = \sqrt{4} = 2\]

\[l_{21} = \frac{a_{21}}{l_{11}} = \frac{2}{2} = 1\]

\[l_{22} = \sqrt{a_{22} - l_{21}^2} = \sqrt{3 - 1} = \sqrt{2}\]

Donc :

\[L = \begin{pmatrix} 2 & 0 \\ 1 & \sqrt{2} \end{pmatrix}\]

Vérification :

\[LL^T = \begin{pmatrix} 2 & 0 \\ 1 & \sqrt{2} \end{pmatrix} \begin{pmatrix} 2 & 1 \\ 0 & \sqrt{2} \end{pmatrix} = \begin{pmatrix} 4 & 2 \\ 2 & 3 \end{pmatrix} = A \quad \checkmark\]

## 10.3 Application à la résolution de Ax = b

## Méthode – Résolution par Cholesky

Étape 1 : Calculer A = LLT (décomposition de Cholesky).

Étape 2 : Résoudre Ly = b (substitution directe).

Étape 3 : Résoudre L T x = y (substitution inverse).

Étape 4 : x est la solution.

## Exemple

Résolvons Ax = b avec A = (4 2 3 ) et b = (6 5 ).

On a déjà L = (2 1 0 ).

Étape 2 : Ly = b

\[ \begin{cases} 2y_1 = 6 \\ y_1 + \sqrt{2}y_2 = 5 \end{cases} \implies \begin{cases} y_1 = 3 \\ y_2 = \frac{5-3}{\sqrt{2}} = \sqrt{2} \end{cases} \]

Étape 3 : L T x = y

\[ \begin{cases} 2x_1 + x_2 = 3 \\ \sqrt{2}x_2 = \sqrt{2} \end{cases} \implies \begin{cases} x_2 = 1 \\ x_1 = 1 \end{cases} \]

Solution : x = (1 1 ).

Vérification : Ax = (4+2 2+3 ) = (6 5 ) = b ✓

## 10.3. APPLICATION À LA RÉSOLUTION DE AX = B

Conseil d’examen : Si on vous demande de résoudre un système avec une matrice symé- trique, vérifiez d’abord si elle est définie positive. Si oui, Cholesky est la méthode la plus rapide et la plus élégante. Cela fait toujours bonne impression !



# 11 Chapitre 11 Le Déterminant

## 11.1 Définition et propriétés

## Définition

Le déterminant d’une matrice carrée A est un scalaire qui mesure le “volume” orienté du parallélépipède formé par les colonnes de A.

## Proposition - Propriétés fondamentales

1. det(AB) = det(A) det(B)

2. det(A7) = det(A)

3. det(λA) = λn det(A) pour A de taille n × n

4. Si A a deux lignes (ou colonnes) proportionnelles, det(A) = 0

5. det(A−1) = 1/ det(A)

## 11.2 Calcul pratique

Méthode - Déterminant 2 x 2

\[ \det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc \]

Mnémotechnique : “Produit diagonal principal moins produit diagonal secondaire”.

Méthode - Déterminant 3 x 3 - Règle de Sarrus

\[ \det \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = aei + bfg + cdh - ceg - afh - bdi \]

## 11.3 Lien avec la Hessienne

## 11.3 Lien avec la Hessienne

sub_title[[135,143, 232, 161]]
## Remarque

En optimisation à deux variables, le déterminant de la Hessienne est le critère décisif :

— det(H) > 0 : les deux valeurs propres ont le même signe (extremum)

— det(H) < 0 : les valeurs propres ont des signes opposés (point-selle)

— det(H) = 0 : au moins une valeur propre est nulle (test inconclusif)

## • À retenir

Interprétation géométrique : Le déterminant de la Hessienne mesure la “courbure to- tale” de la fonction au point critique. Un déterminant positif signifie que la fonction courbe dans la même direction dans toutes les directions (tout minimum ou tout maximum). Un déterminant négatif signifie qu’elle courbe dans des directions opposées (point-selle).

# 12

# Fonctions quadratiques

## 12.1 Définition

## Définition

Une fonction quadratique f : R n → R s’écrit sous la forme :

\[f(x) = \frac{1}{2}x^T A x + b^T x + c\]

ou :

— A est une matrice symétrique n x n

— b est un vecteur colonne de R n

— c est un scalaire (terme constant)

## 12.2 Rôle des coefficients

— Le terme c détermine la valeur de f en x = 0 : f(0) = c. C’est un simple décalage vertical.

— Le terme bT x est linéaire. Il “incline” la fonction et déplace le point critique de l’origine.

— Le terme 12xT Ax est quadratique pur. Il détermine la “forme” de la fonction (paraboloïde, selle, etc.).

## Exemple

Soit f(x,y) = x2 + 2xy + 3y2 − 4x + 6y + 7.

## Identification :

— Termes quadratiques : x2 + 2xy + 3y2

— Termes linéaires : −4x + 6y

— Constante : 7

Matrice A : Les coefficients des termes quadratiques donnent :

\[A = \begin{pmatrix} 2 & 2 \\ 2 & 6 \end{pmatrix}\]

(Attention : le coefficient de x2 est 1, mais dans 12xT Ax, le terme x2 vaut 12a11x2, donc

## 12.2. RÔLE DES COEFFICIENTS

a11 = 2.)

Vecteur b : b = −4        6 

Constante c : c = 7

Erreur fréquente

Erreur fréquente : Oublier le facteur 12 dans la forme standard. Si vous écrivez f(x) = xT Ax + bT x + c, alors la Hessienne sera 2A, pas A.

Règle : Dans la forme f(x) = 12xT Ax + bT x + c, on a ∇f(x) = Ax + b et Hf(x) = A.

## 12.3 Comment reconnaître une fonction quadratique

## Méthode – Reconnaissance rapide

Une fonction est quadratique si et seulement si :

1. Elle est un polynôme en x1, . . . , xn

2. Chaque terme est de degré ≤ 2

3. Il n’y a pas de termes de degré > 2

## Exemples :

— f(x,y) = x2 + xy + y2 : quadratique

— g(x,y) = x2y + x + y : non quadratique (terme x2y de degré 3)

— h(x,y) = e[x+y] : non quadratique (fonction transcendante)

# 13 Forme Chapitre 13

## 13.1 Définition

## Définition

Une forme quadratique est une expression de la forme :

\[q(x) = x^T A x = \sum_{i=1}^{n} \sum_{j=1}^{n} a_{ij} x_i x_j\]

où A est une matrice symétrique.

## 13.2 Comment construire la matrice A

## Méthode - Construction de A à partir de l’expression

Soit q(x,y) = ax2 + bxy + cy2.

Règle :

— a11 = a (coefficient de x2)

— a22 = c (coefficient de y2)

— a12 = a21 = b/2 (moitié du coefficient de xy)

Donc :

\[A = \begin{pmatrix} a & b/2 \\ b/2 & c \end{pmatrix}\]

## Exemple

Soit q(x,y) = 3x2 + 4xy + 5y2.

Identification :

— Coefficient de x2 : 3 ⇒ a11 = 3

— Coefficient de y2 : 5 ⇒ a22 = 5

— Coefficient de xy : 4 ⇒ a12 = a21 = 2

## 13.2. COMMENT CONSTRUIRE LA MATRICE A

Matrice :

\[A = \begin{pmatrix} 3 & 2 \\ 2 & 5 \end{pmatrix}\]

Vérification :

\[x^T Ax = \begin{pmatrix} x & y \end{pmatrix} \begin{pmatrix} 3 & 2 \\ 2 & 5 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = 3x^2 + 4xy + 5y^2 \quad \checkmark\]

## Exercice d’application

Construire la matrice de la forme quadratique q(x, y, z) = x2 + 2y2 + 3z2 + 4xy + 6xz + 8yz.

## Solution détaillée

Coefficients diagonaux :

— a11 = 1 (coefficient de x2)

— a22 = 2 (coefficient de y2)

— a33 = 3 (coefficient de z2)

Coefficients non diagonaux :

— a12 = a21 = 4/2 = 2 (moitié du coefficient de xy)

— a13 = a31 = 6/2 = 3 (moitié du coefficient de xz)

— a23 = a32 = 8/2 = 4 (moitié du coefficient de yz)

Matrice :

\[A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 2 & 4 \\ 3 & 4 & 3 \end{pmatrix}\]

# 14 Determinatiou 14 du point critique d’une fonction quadratique

## 14.1 Pourquoi le gradient vaut Ax + b ?

Proposition

Pour f(x) = 1 xT Ax + bT x + c avec A symétrique :

\[ \nabla f(x) = Ax + b \quad \text{et} \quad H_f(x) = A \]

Remarque

C’est une propriété remarquable : pour une fonction quadratique, le gradient est une fonc- tion affine de x et la Hessienne est constante. Cela simplifie énormément les calculs.

## 14.2 Le système Ax = -b

Méthode – Point critique d’une fonction quadratique

Étape 1 : Identifier A et b dans l’expression de f.

Étape 2 : Résoudre le système linéaire Ax = −b.

Étape 3 : La solution x* est le point critique.

Étape 4 : Étudier la nature de x* via la Hessienne A.

## 14.3 Méthodes de résolution

## 14.3.1 Inversion de matrice

Si A est inversible, x* = −A−1b.

## 14.2 Élimination de Gauss Méthode systématique par pivots. Adaptée à toute taille.

## 14.3.3 Décomposition LU

A = LU où L est triangulaire inférieure et U triangulaire supérieure. Très stable numérique- ment.

## 14.3.4 Décomposition de Cholesky

Si A est symétrique définie positive : A = LLT. La méthode la plus efficace pour les matrices symétriques définies positives.

Soit f (x, y) = x2 + 2xy + 3y2 − 4x + 6y + 7. Étape 1 : Identification

\[A = \begin{pmatrix} 2 & 2 \\ 2 & 6 \end{pmatrix}, \quad b = \begin{pmatrix} -4 \\ 6 \end{pmatrix}, \quad c = 7\]

Étape 2 : Système Ax = −b

\[ \begin{pmatrix} 2 & 2 \\ 2 & 6 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 4 \\ -6 \end{pmatrix} \]

Étape 3 : Résolution

Par la méthode de Cramer :

\[ \begin{align*} \det(A) &= 12 - 4 = 8 \\ \det \begin{pmatrix} 4 & 2 \\ -6 & 6 \end{pmatrix} &= \frac{24 + 12}{8} = \frac{36}{8} = 4.5 \\ \det \begin{pmatrix} 2 & 4 \\ 2 & -6 \end{pmatrix} &= \frac{-12 - 8}{8} = \frac{-20}{8} = -2.5 \end{align*} \]

Point critique : x* = 4.5 −2.5

Étape 4 : Nature

det(A) = 8 > 0 et a11 = 2 > 0 ⇒ A définie positive ⇒ minimum global.

# 15 Chapitre 15 Méthodes et astuces

## Remarque

Ce chapitre est votre “boîte à outils” pour les examens. Chaque méthode a été testée et affinée au fil des années. Apprenez-les par cœur.

## 15.1 Arbre de décision général



## 15.2 Pour chaque type d’exercice

## 15.2.1 Type 1 : Trouver les extrema d’une fonction

## Méthode

Première chose à faire : Vérifier le domaine de définition. Erreurs à éviter :

— Chercher des extrema en dehors du domaine

— Oublier les points où la dérivée n’existe pas

— Confondre minimum local et minimum global

Méthode la plus rapide :

1. Points critiques : V f = 0

2. Hessienne en chaque point

3. Déterminant et signe des mineurs

Vérification : Refaites le calcul avec des valeurs numériques proches du point critique.

## 15.2.2 Type 2 : Fonction quadratique

## Méthode

Première chose à faire : Identifier A, b, c.

Erreurs à éviter :

— Oublier le facteur 1 2 dans A

— Mettre les signes de b à l’envers

Méthode la plus rapide : Résoudre Ax = −b par Cramer (2 × 2) ou Cholesky (définie positive).

Vérification : Vérifiez que f(x*) est cohérent avec la nature du point.

## 15.2.3 Type 3 : Nature de la Hessienne

## Méthode

Première chose à faire : Vérifier que la matrice est symétrique.

Erreurs à éviter :

— Tester les coefficients au lieu des valeurs propres

— Inverser les règles de Sylvester pour la définie négative

Méthode la plus rapide :

— n = 2 : déterminant + premier coefficient

— n = 3 : valeurs propres ou Sylvester

Vérification : Si A est définie positive, vérifiez que xT Ax > 0 pour un vecteur test.

## 15.3. CONSEILS POUR RÉUSSIR LES EXAMENS

## 15.3 Conseils pour réussir les examens

1. Lisez tout l’énoncé avant de commencer. Identifiez le type de problème et la mé- thode adaptée.

2. Soyez méthodique. Chaque étape doit être clairement identifiée. L’examinateur doit comprendre votre raisonnement.

3. Vérifiez vos calculs. Un signe oublié peut tout fausser. Prenez 2 minutes pour vérifier.

4. Expliquez vos résultats. Ne vous contentez pas de donner un nombre. Dites ce que cela signifie.

5. Gérez votre temps. Si vous bloquez sur un calcul, passez à la suite et revenez plus tard.



# 16 Synthese der Theile de revision

## 16.1 Fiche 1 : Définitions essentielles

— Point critique : ∇f (x) = 0 (ou dérivée n’existe pas) — Gradient : vecteur des dérivées partielles, direction de plus forte pente — Hessienne : matrice des dérivées secondes, symétrique — Convexe : f (tx + (1 − t)y) ≤ tf (x) + (1 − t)f (y) — Valeur propre : λ tel que Av = λv — Définie positive : xT Ax > 0 pour tout x ̸ = 0

## 16.2 Fiche 2 : Théorèmes importants

1. Weierstrass : fonction continue sur compact ⇒ extrema atteints 2. Condition nécessaire : extremum + dérivable ⇒ gradient nul 3. Hessienne : définie positive ⇒ minimum ; définie négative ⇒ maximum 4. Convexité : H f semi-définie positive ⇔ f convexe 5. Sylvester : mineurs principaux déterminent la nature de A

## 16.3 Fiche 3 : Formules à connaître par cœur

Gradient d’une quadratique :

\[ \nabla \left( \frac{1}{2} x^T A x + b^T x + c \right) = A x + b \]

## 16.4 Fiche 4 : Arbre de décision complet



## 16.5 Fiche 5 : Tableau comparatif des méthodes


## 16.5. FICHE 5 : TABLEAU COMPARATIF DES MÉTHODES

Bon courage pour vos examens ! La pratique régulière est la clé du succès.
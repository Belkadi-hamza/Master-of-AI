# Algorithmes d'Optimisation Numerique





## Table des matières

Introduction 5  Arbre de Decision Global 6  1 La Dichotomie 7  1.1 Principe Intuitif 7  1.2 Algorithme 7  1.3 Organigramme (Flowchart) 8  1.4 Exemple Numerique 8  1.5 Analyse de Convergence 9  2 La Section Doree 11  2.1 Le Nombre d’Or 11  2.2 Principe Intuitif 11  2.3 Algorithme 12  2.4 Organigramme 13  2.5 Exemple Numerique 13  3 Gradient a Pas Fixe 15  3.1 Principe Intuitif 15  3.2 Algorithme 15  3.3 Organigramme 16  3.4 Exemple Numerique 16  4 Gradient a Pas Optimal 19  4.1 Principe Intuitif 19  4.2 Algorithme 20  4.3 Organigramme 20  4.4 Calcul du Pas Optimal (Cas Quadratique) 20  5 Gradient Conjugue 23  5.1 Principe Intuitif 23  5.2 Algorithme 24  5.3 Organigramme 24  5.4 Exemple Numerique 25  6 Methode de Newton 27  6.1 Principe Intuitif 27  6.2 Algorithme 28

TABLE DES MATIÈRES
6.3
Organigramme
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
28
6.4
Exemple Numerique
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
29
7
Methode BFGS
31
7.1
Principe Intuitif . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
31
7.2
Formule de Mise a Jour BFGS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
31
7.3
Organigramme
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
33
7.4
Exemple Numerique
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
33
8
Methode DFP
35
8.1
Principe Intuitif . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
35
8.2
Formule de Mise a Jour DFP
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
35
8.3
Organigramme
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
36
8.4
Comparaison BFGS vs DFP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
37
9
Tableau Synthetique et Choix de Methode
39
9.1
Tableau Comparatif Global
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
39
9.2
Arbre de Decision Detaillee
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
39
9.3
Fiches de Revision
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
40
9.4
Formules Essentielles . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
40
4
Algorithmes d’Optimisation

## Introduction

Bienvenue dans ce cours complet sur les algorithmes d'optimisation numerique. Ce docu- ment presente 8 méthodes fondamentales, du plus simple (dichotomie) au plus sophistique (BFGS, DFP), avec pour chacune :

— Une explication intuitive du fonctionnement

— Le pseudocode detaillé

— Un organigramme visuel (flowchart)

— Un exemple numerique complet

— La complexite et les conditions d'application

## • A Retenir

## Objectifs du cours :

1. Comprendre le principe de chaque algorithme (intuition geometrique)

2. Savoir ecrire le pseudocode et l'organigramme associe

3. Etre capable d'executer a la main un exemple numerique

4. Connaitre les avantages et inconvenients de chaque methode

5. Savoir choisir l'algorithme adapte a un probleme donne

## Remarque

Ce cours suppose connues les notions de base d'analyse (derivation, gradient, Hessienne) et d'algebre lineaire (matrices, systemes lineaires).

 Arbre de Decision - Quel Algorithme Choisir ?

# 1 La Dichotomie

Remarque

La dichotomie est la méthode la plus simple et la plus robuste pour trouver un zero d'une fonction continue. Elle repose sur le theoreme des valeurs intermédiaires.

## 1.1 Principe Intuitif

## Definition

Si f est continue sur [a, b] et si f (a) et f (b) sont de signes opposes (f (a) · f (b) < 0), alors il existe au moins un c ∈]a, b[ tel que f (c) = 0.



## 1.2 Algorithme

## Algorithme

Entrees : f fonction continue, [a, b] intervalle avec f (a)f (b) < 0, ε precision. Principe : A chaque iteration, on coupe l'intervalle en deux et on garde la moitie ou f change de signe.

## 1.3 Organigramme (Flowchart)



## 1.4 Exemple Numerique

Exemple Numerique Trouvons un zero de f ( x ) = x 3 − x − 2 sur [1, 2] avec ε = 0.1. Verification initiale : f ( 1 ) = − 2 < 0 et f ( 2 ) = 4 > 0. OK.

## 1.5. ANALYSE DE CONVERGENCE

<table>It.abmf(m)SigneAction01.0002.0001.500-0.125f(a)f(m) &gt; 0a ← m11.5002.0001.750+1.609f(a)f(m) &lt; 0b ← m21.5001.7501.625+0.666f(a)f(m) &lt; 0b ← m31.5001.6251.562+0.252f(a)f(m) &lt; 0b ← m41.5001.5621.531+0.059f(a)f(m) &lt; 0b ← m</table>

Arret : (b - a)/2 = (1.562 - 1.500)/2 = 0.031 &lt; 0.1.

Resultat : x* = (1.500 + 1.562)/2 = [1.531].

Valeur exacte : x ≈ 1.521. Erreur ≈ 0.01.

## 1.5 Analyse de Convergence

## Complexite

Nombre d'iterations : N ≥ log2 (b − a ε )

Complexite : O (log 1 ε ) - convergence lineaire.

Ordre de convergence : p = 1 avec C = 1/2.

## • A Retenir

## Avantages :

✓ Tres robuste (toujours convergent si f(a)f(b) < 0)

✓ Simple a implementer

✓ Convergence garantie

## Inconvenients :

× Convergence lente (lineaire)

× Ne trouve que les zeros (pas les extrema directement)

× Ne peut pas detecter les racines multiples



# 2 La Section D’Or

## Remarque

La section doree est une methode d'optimisation unidimensionnelle (recherche de minimum ou maximum) sans utiliser la derivee. Elle est inspiree du nombre d'or φ.

## 2.1 Le Nombre d’Or

## Definition

Le nombre d'or est defini par :

\[ \varphi = \frac{\sqrt{5} - 1}{2} \approx 0.618 \]

C'est l'inverse du nombre d'or classique Φ = 1+√5 2 ≈ 1.618.



## 2.2 Principe Intuitif

On cherche le minimum d'une fonction f sur [a, b]. On place deux points c et d de maniere symetrique par rapport au centre, avec le ratio φ.

## 2.3 Algorithme

Algorithm 2 Section Doree

Entree : f, a, b, ε

Sortie : x* approximation du minimum

1: φ ← (√5 − 1)/2

2: c ← b − φ(b − a)

3: d ← a + φ(b − a)

4: f_c ← f(c), f_d ← f(d)

5: Tant que (b − a) > ε faire

6: Si f_c < f_d alors

7: b ← d

8: d ← c, f_d ← f_c

9: c ← b − φ(b − a), f_c ← f(c)

10: Sinon

11: a ← c

12: c ← d, f_c ← f_d

13: d ← a + φ(b − a), f_d ← f(d)

14: end Si

15: end Tant que

16: x* ← (a + b)/2

17: Retourner x*

## 2.4 Organigramme



## 2.5 Exemple Numerique

## Exemple Numerique

Minimisons f (x) = x2 sur [−1, 2] avec ε = 0.3. Initialisation : φ = 0.618, c = 2 − 0.618(3) = 0.146, d = −1 + 0.618(3) = 0.854.

<table>It.abcdf(c)f(d)Action0−1.0002.0000.1460.8540.0210.729b ← d1−1.0000.854−0.1460.1460.0210.021b ← d2−1.0000.146−0.146−0.1460.1730.021b ← d3−1.000−0.146−0.562−0.4160.3160.173b ← d</table>

Arret : b − a = 0.854 < 0.3 ? Non, on continue... Apres 6 iterations : b − a ≈ 0.2 < 0.3. Resultat : x* ≈ [0.0] (minimum exact en 0).

## Complexite

Reduction de l'intervalle : Chaque iteration reduit l'intervalle d'un facteur φ ≈ 0.618. Nombre d'iterations : N ≥ ln(ε/(b − a)) ln(φ) Complexite : O(log(1/ε)) − convergence lineaire.

## 2.5. EXEMPLE NUMERIQUE

Pourquoi \(\varphi\)? Le nombre d'or garantit que un seul point est recalculé par iteration (l'autre est reutilise). C'est l'optimal pour les méthodes de comparaison par paires.

# 3 Chapitre 3 Gradient a Pas Fixe

## 3.1 Principe Intuitif

## Definition

Le gradient \(\nabla f(x)\) pointe dans la direction de plus forte pente ascendante. Pour minimiser, on va dans la direction opposee : \(-\nabla f(x)\) .

image[[316, 504, 679, 717]]

### 3.2 Algorithme

## Algorithme

Formule de mise a jour : \(x_{k + 1} = x_{k} - \alpha \nabla f(x_{k})\) Interpretation : On fait un pas de taille \(\alpha\) dans la direction opposee au gradient.

## 3.3 Organigramme

Algorithm 3 Gradient a Pas Fixe

Entree : f, Vf, x0, α, ε

Sortie : x* approximation du minimum

1: x ← x0

2: Tant que ||∇f(x)|| > ε faire

3: g ← ∇f(x)

4: x ← x − αg

5: end Tant que

6: x* ← x

7: Retourner x*



## 3.4 Exemple Numerique

## 3.4. EXEMPLE NUMERIQUE

## Exemple Numerique

Minimisons \(f(x,y) = x^2 + 4y^2\) avec \(x_0 = (2,1)\), \(\alpha = 0.2\), \(\varepsilon = 0.5\).

Gradient : \(\nabla f(x,y) = (2x,8y)\).

<table>kxk∇f(xk)||∇f||xk+10(2.000, 1.000)(4.000, 8.000)8.944(1.200, -0.600)1(1.200, -0.600)(2.400, -4.800)5.367(0.720, 0.360)2(0.720, 0.360)(1.440, 2.880)3.220(0.432, -0.216)3(0.432, -0.216)(0.864, -1.728)1.932(0.259, 0.130)</table>

Arret : \(\|\nabla f(x_3)\| = 1.932 > 0.5\), on continue... Apres 7 iterations : \(\|\nabla f\| < 0.5\).

Resultat : \(x^* \approx (0.062, 0)\) (tendance vers \((0,0)\)).

## Erreur Frequente

Erreur classique : Choisir \(\alpha\) trop grand \(\Rightarrow\) divergence ; trop petit \(\Rightarrow\) convergence tres lente. Regle empirique : Pour une fonction quadratique \(f(x) = \frac{1}{2}x^T Ax\), choisir \(\alpha < 2/\lambda_{\max}(A)\).

## Complexite

Convergence : Lineaire si \(0 < \alpha < 2/\lambda_{\max}\).

Complexite par iteration : \(O(n)\) (evaluation du gradient).

Total : \(O(n \cdot N_{\text{iter}})\).



# 4 Chapitre 4 Gradient a Pas Optimal

## 4.1 Principe Intuitif

## Definition

Au lieu de fixer α arbitrairement, on choisit a chaque iteration le pas α* qui minimise f le long de la direction de descente :

\[ \alpha^* = \underset{\alpha > 0}{\arg\min} f(x_k - \alpha \nabla f(x_k)) \]


## 4.2 Algorithme

Algorithm 4 Gradient a Pas Optimal

Entree : f, Vf, x0, ϵ

Sortie : x* approximation du minimum

1: x ← x0

2: Tant que ||∇f(x)|| > ε faire

3: g ← ∇f(x)

4: α* ← argminα f(x − αg)

 Recherche lineaire

5: x ← x − α*g

6: end Tant que

7: x* ← x

8: Retourner x*

## 4.3 Organigramme



## 4.4 Calcul du Pas Optimal (Cas Quadratique)

Pour f(x) = 1 2 xT Ax − bT x avec A symetrique definie positive :

\[ \alpha^* = \frac{g^T g}{g^T A g} \quad \text{ou} \quad g = \nabla f(x) = A x - b \]

## 4.4. CALCUL DU PAS OPTIMAL (CAS QUADRATIQUE)

## Exemple Numerique

Minimisons f(x,y) = x2 + 4y2 avec x0 = (2, 1), ε = 0.5.

Gradient : ∇f(x,y) = (2x,8y). Hessienne : A = ( 2 0 0 8 ).

Iteration 0 : x0 = (2,1), g0 = (4,8).

\[ \alpha^* = \frac{g_0^T g_0}{g_0^T A g_0} = \frac{16 + 64}{(4, 8) \begin{pmatrix} 2 & 0 \\ 0 & 8 \end{pmatrix} \begin{pmatrix} 4 \\ 8 \end{pmatrix}} = \frac{80}{32 + 512} = \frac{80}{544} \approx 0.147 \]

\[ x_1 = (2, 1) - 0.147(4, 8) = (2 - 0.588, 1 - 1.176) = (1.412, -0.176) \]

Iteration 1 : g1 = (2.824, -1.408), ||g1|| ≈ 3.16 > 0.5.

\[ \alpha^* = \frac{7.97 + 1.98}{(2.824, -1.408)A(2.824, -1.408)^T} = \frac{9.95}{15.95 + 15.87} \approx 0.313 \]

\[ x_2 = (1.412, -0.176) - 0.313(2.824, -1.408) \approx (0.529, 0.265) \]

Convergence plus rapide que le pas fixe (meme nombre d'iterations, meilleure precision).

## Complexite

Convergence : Lineaire mais meilleure constante que le pas fixe.

Complexite par iteration : O(n2) (recherche lineaire + gradient).

Pour les quadratiques : Convergence en au plus n iterations (theorique).



# 5 Chapitre 5 Gradient Conjugue

## 5.1 Principe Intuitif

Definition

Deux vecteurs d et d sont A-conjugues (ou A-orthogonaux) si :

\[d_i^T A d_j = 0 \quad \text{pour } i \neq j\]



Remarque

Le gradient conjugue construit iterativement des directions conjuguees a partir des residus (gradients), sans connaitre A explicitement.

## 5.2 Algorithme

Algorithm 5 Gradient Conjugate

Entree : A SDP, b, x0, ε

Sortie : x* solution de Ax = b

1: x ← x0

2: r ← b − Ax

3: d ← r

4: Tant que ||r|| > ε faire

5: α ← (r^T r)/(d^T Ad)

6: x ← x + αd

7: rnew ← r − αAd

8: β ← (rnewT rnew)/(rT r)

9: d ← rnew + βd

10: r ← rnew

11: end Tant que

12: x* ← x

13: Retourner x*

## 5.3 Organigramme


## 5.4 Exemple Numerique

## Exemple Numerique

Resolvons \(Ax = b\) avec \(A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}\) \(b = \begin{pmatrix} 3 \\ 5 \end{pmatrix}\) \(x_0 = \begin{pmatrix} 0 \\ 0 \end{pmatrix}\)

Iteration \(0:r_0 = b - Ax_0 = (3,5)\) \(d_0 = (3,5)\)

equation[[259, 216, 738, 270]]

\[x_{1} = (0,0) + 0.382(3,5) = (1.146,1.910)\]

Iteration \(1:r_1 = r_0 - \alpha_0Ad_0 = (3,5) - 0.382(11,18)\approx (- 1.202, - 1.876)\)

\[\beta_{0} = \frac{r_{1}^{T}r_{1}}{r_{0}^{T}r_{0}} = \frac{1.445 + 3.519}{34}\approx 0.146\]

\[d_{1} = r_{1} + \beta_{0}d_{0}\approx (-1.202, -1.876) + 0.146(3,5)\approx (-0.764, -1.146)\]

Iteration \(2:\alpha_{1}\approx 0.0\) (car \(r_1\approx 0\) ).Convergence!

Solution execute : \(x^{*} = \left( \begin{array}{c}4 / 5\\ 7 / 5 \end{array} \right) = \left( \begin{array}{c}0.8\\ 1.4 \end{array} \right)\)

Resultat : \(x_{2}\approx \left[(0.800,1.400)\right]\)

## Complexite

Convergence : Au plus \(n\) iterations pour un systeme de taille \(n\) (theorie exacte en arithmetique exacte).

Complexite par iteration : \(O(n^{2})\) (produit matrice- vecteur).

Total : \(O(n^{3})\) dans le pire cas, mais souvent \(O(n^{2})\) en pratique.

## A Retenir

Pourquoi ca marche ? Les directions \(d_{k}\) sont \(A\) - conjuguees, donc chaque iteration minimise \(f\) sur un sous- espace de plus en plus grand. En \(n\) iterations, on a explore tout \(\mathbb{R}^{n}\) .



# 6 Chapitre 6 Methode de Newton

## 6.1 Principe Intuitif

## Definition

La methode de Newton minimise le modele quadratique de Taylor a l'ordre 2 :

\[f(x_k + p) \approx f(x_k) + \nabla f(x_k)^T p + \frac{1}{2} p^T \nabla^2 f(x_k) p\]

Le minimum de cette approximation est atteint en p = −H−1g.


## 6.2 Algorithme

Algorithm 6 Methode de Newton

Entree : f, ∇f, ∇2f, x0, ε

Sortie : x* approximation du minimum

1: x ← x0

2: Tant que ||∇f(x)|| > ε faire

3: g ← ∇f(x)

4: H ← ∇2f(x)

5: p ← H−1g

Resolution du systeme Hp = g

6: x ← x − p

7: end Tant que

8: x* ← x

9: Retourner x*

## Remarque

En pratique, on ne calcule pas H−1 explicitement (couteux O(n3)). On resout le systeme lineaire Hp = g par decomposition LU ou Cholesky (O(n3) mais plus stable).

## 6.3 Organigramme


## 6.4 Exemple Numerique

## Exemple Numerique

Minimisons f(x) = x² avec x₀ = 2, ε = 0.01.

Derivees : f'(x) = 2x, f''(x) = 2.

Iteration 0 : x₀ = 2, g₀ = 4, H₀ = 2.

\[p = H^{-1}g = \frac{4}{2} = 2, \quad x_1 = 2 - 2 = 0\]

Iteration 1 : x₁ = 0, g₁ = 0, ||g₁|| = 0 < 0.01.

Arret immediat !

Resultat : x* = 0 (convergence en 1 iteration pour une quadratique !).

## Exemple Numerique

Minimisons f(x,y) = x² + 4y² avec x₀ = (2, 1).

Gradient : ∇f = (2x, 8y) = (4, 8).

Hessienne : H = (2 0 0). Direction :

\[p = H^{-1}g = \begin{pmatrix} 1/2 & 0 \\ 0 & 1/8 \end{pmatrix} \begin{pmatrix} 4 \\ 8 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}\]

Mise a jour :

\[x_1 = (2, 1) - (2, 1) = (0, 0)\]

Convergence en 1 iteration ! (car f est quadratique)

## Complexite

Convergence : Quadratique pres du minimum (||x_{k+1} - x^*|| ≤ C||x_k - x^*||^2).

Complexite par iteration : O(n³) (inversion Hessienne ou resolution systeme).

Total : O(n³ · Niter), mais Niter est tres petit.

## Erreur Frequente

Piege classique : Si H n'est pas definie positive, la direction −H−1g peut etre une direction de montee !

Solution : Modifier H pour la rendre definie positive (modification de Hessienne), ou utiliser une recherche lineaire.



# 7 Chapitre 7 Methode BFGS

## 7.1 Principe Intuitif

## Definition

BFGS (Broyden-Fletcher-Goldfarb-Shanno) est une methode quasi-Newton : elle approxime la Hessienne (ou son inverse) sans la calculer explicitement.



<center>Compromis vitesse/cout</center>

## 7.2 Formule de Mise a Jour BFGS

## Definition

On définit s = x +1 − x (deplacement) et y = ∇f (x +1) − ∇f (x ) (variation du gradient). k k La mise a jour de l'inverse de la Hessienne H est : k

\[H_{k+1} = (I - \rho_k s_k y_k^T) H_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T\]

\[où \rho_k = 1/(y_k^T s_k).\]

1: \(x \leftarrow x_0\) 2: \(H \leftarrow I\) 3: Tant que \(\| \nabla f(x) \| > \epsilon\) faire 4: \(g \leftarrow \nabla f(x)\) 5: \(p \leftarrow -Hg\) 6: \(\alpha \leftarrow\) recherche lineaire 7: \(x_{new} \leftarrow x + \alpha p\) 8: \(s \leftarrow x_{new} - x\) 9: \(y \leftarrow \nabla f(x_{new}) - g\) 10: \(\rho \leftarrow 1 / (y^T s)\) 11: \(H \leftarrow (I - \rho sy^T)H(I - \rho ys^T) + \rho ss^T\) 12: \(x \leftarrow x_{new}\) 13: end Tant que 14: \(x^* \leftarrow x\) 15: Retourner \(x^*\)

## 7.3 Organigramme



## 7.4 Exemple Numerique

## Exemple Numerique

Minimisons f(x,y) = x2 + 4y2 avec x0 = (2, 1), ε = 0.1.

Initialisation : H0 = I = 1 0.    0 1

Iteration 0 : g0 = (4,8), p0 = −H0g0 = (−4, −8).

Avec α = 0.1 (recherche lineaire simple) : x1 = (2, 1) + 0.1(−4, −8) = (1.6, 0.2).

s0 = (−0.4, −0.8), g1 = (3.2, 1.6), y0 = (−0.8, −6.4).

ρ0 = 1/(y0T s0) = 1/(0.32 + 5.12) = 1/5.44 ≈ 0.184.

Mise a jour BFGS de H0 vers H1 (calcul matriciel)...

Apres 3-4 iterations : convergence vers (0, 0).

## 7.4. EXEMPLE NUMERIQUE

 A Retenir  Convergence super-lineaire (presque quadratique)  Cout O(n2) par iteration (vs O(n3) pour Newton)  Pas de calcul de Hessienne necessaire  Tres robuste en pratique

# 8 Chapitre 8 Methode DFP

## 8.1 Principe Intuitif

## Definition

DFP (Davidon-Fletcher-Powell) est l'ancêtre de BFGS. Au lieu de mettre a jour l'inverse de la Hessienne H, DFP met a jour directement l'approximation de la Hessienne B (puis on inverse).



mise a jour de H

mise a jour de B

## 8.2 Formule de Mise a Jour DFP

## Definition

Avec s k = x k + 1 − x k et y k = ∇ f ( x k + 1 ) − ∇ f ( x k ) :

\[B_{k+1} = B_k + \frac{s_k s_k^T}{s_k^T y_k} - \frac{B_k y_k y_k^T B_k}{y_k^T B_k y_k}\]

La direction de descente est p k = − B k − 1 ∇ f ( x k ) .

## 8.3 Organigramme

Algorithm 8 DFP

Entree : f, ∇f, x0, ε

Sortie : x* approximation du minimum

1: x ← x0

2: B ← I

Initialisation : identite

3: Tant que ||∇f(x)|| > ε faire

4: g ← ∇f(x)

5: p ← −B−1g

Resolution systeme

6: α ← recherche lineaire

7: xnew ← x + αp

8: s ← xnew − x

9: y ← ∇f(xnew) − g

10: B ← B + s s T s T y − B y y T B y

11: x ← xnew

12: end Tant que

13: x* ← x

14: Retourner x*


## 8.4 Comparaison BFGS vs DFP

<table>CriterieBFGSDFPMise a jour de\(H\approx (\nabla ^{2}f)^{-1}\)\(B\approx \nabla ^{2}f\)Formule\((I-\rho sy^{T})H(I-\rho ys^{T})+\rho ss^{T}\)\(B+\frac {ss^{T}}{s^{T}y}-\frac {Byy^{T}B}{y^{T}By}\)Direction\(p=-Hg\)\(p=-B^{-1}g\) (systeme)Cout direction\(O(n^{2})\)\(O(n^{3})\) (inversion)RobustessePlus robusteMoins robusteUtilisationStandardRare aujourd'hui</table>

## Exemple Numerique

Meme exemple : \(f(x,y)=x^{2}+4y^{2}\), \(x_{0}=(2,1)\).

DFP vs BFGS : Les deux convergent vers (0,0), mais BFGS est generalement plus rapide et plus stable numeriquement.

En pratique : On utilise presque toujours BFGS (ou L-BFGS pour les grands problemes).

## Complexite

Convergence : Super-lineaire (similaire a BFGS).

Complexite par iteration : \(O(n^{3})\) (a cause de l'inversion de \(B\)).

Pourquoi BFGS a remplace DFP : Cout \(O(n^{2})\) vs \(O(n^{3})\) par iteration.



# 9 Tableau Synthétique et Choix de Methode

## 9.1 Tableau Comparatif Global

<table>MethodeConvergenceCout/iterBesoinUtilisationDichotomieLineaire (p = 1)O(1)f continue, signeRacines 1DSection DoreeLineaire (p = 1)O(1)f unimodaleOpt. 1D sans deriveGrad. pas fixeLineaireO(n)∇f, αGrandes dimensionsGrad. optimalLineaire+O(n<sup>2</sup>)∇fQuadratiquesGrad. conjuguen iter (quad.)O(n<sup>2</sup>)A SDPSystemes lineairesNewtonQuadratiqueO(n<sup>3</sup>)∇f, ∇<sup>2</sup>fPetits problemesBFGSSuper-lineaireO(n<sup>2</sup>)∇fUsage generalDFPSuper-lineaireO(n<sup>3</sup>)∇fHistorique</table>

## 9.2 Arbre de Decision Detaillée


## 9.3 Fiches de Revision

## • A Retenir

## Fiche 1 – Dichotomie :

— Couper l'intervalle en 2, garder celui ou f change de signe

— Convergence lineaire, tres robuste

— N ≥ log2((b − a)/ε) iterations

## • A Retenir

## Fiche 2 – Section Doree :

— φ = (√5 − 1)/2 ≈ 0.618

— Un seul point recalcule par iteration

— Pour minimiser sans derivee en 1D

## • A Retenir

## Fiche 3 – Gradient :

— Pas fixe : x ← x − α∇f (choisir α avec soin)

— Pas optimal : α* = argmin f(x − α∇f)

— Conjugue : directions A-orthogonales, convergence en n iterations

## • A Retenir

## Fiche 4 – Newton et Quasi-Newton :

— Newton : x ← x − H−1g (quadratique, mais O(n3))

— BFGS : approximate H−1 sans la calculer (O(n2))

— DFP : approximate H directement (moins efficace que BFGS)

## 9.4 Formules Essentielles

## • A Retenir

<table>MethodeFormule de mise a jourGradient pas fixe\(x_{k+1}=x_{k}-\alpha \nabla f(x_{k})\)Gradient optimal\(x_{k+1}=x_{k}-\alpha ^{*}\nabla f(x_{k})\)Gradient conjugue\(x_{k+1}=x_{k}+\alpha _{k}d_{k}\)Newton\(x_{k+1}=x_{k}-H_{k}^{-1}\nabla f(x_{k})\)BFGS\(x_{k+1}=x_{k}-\alpha _{k}H_{k}\nabla f(x_{k})\)</table>

## 9.4. FORMULES ESSENTIELLES

Bon courage pour vos examens !

La pratique reguliere est la cle du succes.
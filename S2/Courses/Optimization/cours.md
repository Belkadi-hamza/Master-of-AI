# Cours Complet d’Optimisation Numérique

Méthodes de recherche, Newton, Lagrange, Barrière logarithmique et Simplex



Préparation à l’examen — Devoir d’Optimisation Version complète avec démonstrations, algorithmes et astuces de calcul

Juillet 2026

1 Chapitre 1 — Optimisation Unidimensionnelle 2 1.1 1.1 Problème général 2 1.2 1.2 La méthode du nombre d’or (Golden Section Search) 2 1.2.1 Principe 2 1.2.2 Algorithme 3 1.2.3 Pourquoi le nombre d’or ? 3 1.2.4 Exemple guidé (Exercice 1 de l’examen) 3

2 Chapitre 2 — Méthode de Newton pour l’Optimisation 4 2.1 2.1 Rappels sur le gradient et la hessienne 4 2.2 2.2 Principe de la méthode de Newton 5 2.3 2.3 Cas particulier crucial : fonctions quadratiques 5 2.4 2.4 Nature du point critique 6 2.5 2.5 Exemple guidé (Exercice 2 de l’examen) 6

3 Chapitre 3 — Multiplicateurs de Lagrange 8 3.1 3.1 Problème avec contraintes d’égalité 8 3.2 3.2 Méthodologie de résolution 8 3.3 3.3 Nature des points critiques sur une contrainte 8 3.4 3.4 Exemple guidé (Exercice 3 de l’examen) 9

4 Chapitre 4 — Méthode de Barrière Logarithmique 11 4.1 4.1 Problème avec contraintes d’inégalité 11 4.2 4.2 Principe de la barrière logarithmique 11 4.3 4.3 Algorithme de barrière 11 4.4 4.4 Exemple guidé (Exercice 4 de l’examen) 12

5 Chapitre 5 — Méthode du Simplexe 14 5.1 5.1 Problème de programmation linéaire (PL) 14 5.2 5.2 Passage à la forme standard 14 5.3 5.3 Tableau du simplexe 14 5.4 5.4 Solutions optimales multiples 15 5.5 5.5 Exemple guidé (Exercice 5 de l’examen) 15

6 Fiche Récapitulative — “Cheat Sheet” 17

# 1 Chapitre 1 — Optimisation Unidimensionnelle

## 1.1 1.1 Problème général

## Définition

Soit f : R → R une fonction de classe C1 (ou C2). On cherche à résoudre :

\[ \min_{x \in [a,b]} f(x) \]

où [a, b] est un intervalle fermé borné de R.

## Théorème

Si f est continue sur [a, b], alors f atteint son minimum sur [a, b] (théorème de Weierstrass).

## Théorème

Si x* ∈]a, b[ est un minimum local de f et si f est dérivable en x*, alors :

\[ f'(x^*) = 0 \quad (\text{point critique}) \]

## Théorème

Si f ∈ C2 et x* vérifie f′(x*) = 0 et f′′(x*) > 0, alors x* est un minimum local strict.

## 1.2 1.2 La méthode du nombre d’or (Golden Section Search)

## 1.2.1 Principe

C’est une méthode d’élimination d’intervalles : à chaque itération, on réduit l’intervalle de recherche en comparant les valeurs de f en deux points intérieurs.

## Définition

Le nombre d’or est défini par :

\[ \varphi = \frac{1 + \sqrt{5}}{2} \approx 1.618034 \]

Il satisfait la relation φ2 = φ + 1, d’où :

\[ \frac{1}{\varphi} = \varphi - 1 \approx 0.618034, \quad \frac{1}{\varphi^2} = 2 - \varphi \approx 0.381966 \]

## Formules utiles à mémoriser :

\[ \begin{aligned} & -\frac{1}{\varphi^2} = \frac{3 - \sqrt{5}}{2} \approx 0.381966 \\ & -1 - \frac{1}{\varphi^2} = \frac{1}{\varphi} = \frac{\sqrt{5} - 1}{2} \approx 0.618034 \end{aligned} \]

## 1.2.2 Algorithme

## Méthode

Entrées : f, intervalle [a0, b0], tolérance ε > 0.

Initialisation : Calculer ρ = 1 1 φ2 ≈ 0.381966.

Répéter pour k = 0, 1, 2, . . .

1. Calculer les points intérieurs :

\[x_1 = b_k - \rho(b_k - a_k), \quad x_2 = a_k + \rho(b_k - a_k)\]

2. Évaluer f(x1) et f(x2).

3. Si f(x1) < f(x2) : le minimum est dans [ak, x2].

\[a_{k+1} = a_k, \quad b_{k+1} = x_2\]

Sinon : le minimum est dans [x1, bk].

\[a_{k+1} = x_1, \quad b_{k+1} = b_k\]

4. Arrêt : Si bk − ak < ε, stop.

Sortie : x* = ak + bk (milieu de l’intervalle final). 2

## Attention

Piège classique : Ne pas confondre les formules !

— x1 est proche de bk (à gauche de bk)

— x2 est proche de ak (à droite de ak)

— On élimine le côté où f est la plus grande

## 1.2.3 Pourquoi le nombre d’or ?

Le choix de ρ = 1/φ2 garantit que :

— À chaque itération, l’un des deux points calculés est réutilisé dans l’itération suivante (éco- nomie de calcul).

— Le taux de réduction de l’intervalle est constant : bk+1 − ak+1 = 1 φ ≈ 0.618. bk − ak

## 1.2.4 Exemple guidé (Exercice 1 de l’examen)

## Exemple

On étudie f(x) = (x − 2)2 + e/x2 sur [a0, b0] = [0.9, 1] avec ε = 0.06.

Étape 0 — Initialisation :

\[ \rho = \frac{1}{\varphi^2} \approx 0.381966, \quad b_0 - a_0 = 0.1 \]

Calcul des points :

\[x_1 = b_0 - \rho(b_0 - a_0) = 1 - 0.381966 \times 0.1 = 0.961803\]

Évaluation de f :

\[
\begin{align*}
f(x_1) &= f(0.961803) = (0.961803 - 2)^2 + e^{0.961803/2} \\
&= (-1.038197)^2 + e^{0.480902} \\
&= 1.077872 + 1.617532 = 2.695404
\end{align*}
\]

\[
\begin{align*}
f(x_2) &= f(0.938197) = (0.938197 - 2)^2 + e^{0.938197/2} \\
&= (-1.061803)^2 + e^{0.469098} \\
&= 1.127427 + 1.598551 = 2.725978
\end{align*}
\]

Comparaison : f(x1) = 2.695404 < f(x2) = 2.725978

Donc le minimum est dans [a0, x2] = [0.9, 0.938197].

Mise à jour : a1 = 0.9, b1 = 0.938197

Test d’arrêt :

\[
b_1 - a_1 = 0.938197 - 0.9 = 0.038197 < 0.06 \quad \checkmark
\]

Conclusion : L’algorithme s’arrête en 1 itération. L’estimation du minimum est :

\[
x^* = \frac{a_1 + b_1}{2} = \frac{0.9 + 0.938197}{2} = 0.919098
\]

et

\[
f(x^*) = (0.919098 - 2)^2 + e^{0.919098/2} = 1.168348 + 1.583362 = 2.751710
\]

Astuce de calcul : Quand l’intervalle initial est petit (ici 0.1) et que ρ ≈ 0.38, une seule itération suffit souvent pour passer sous une tolérance de l’ordre de 0.05–0.06, car 0.1 × 0.38 ≈ 0.038.

# 2 Chapitre 2 — Méthode de Newton pour l’Optimisation

## 2.1 2.1 Rappels sur le gradient et la hessienne

Définition

Soit f : R n → R de classe C 1. Le gradient de f en x est le vecteur des dérivées partielles :

\[
\nabla f(x) = \begin{pmatrix} \frac{\partial f}{\partial x_1}(x) \\ \vdots \\ \frac{\partial f}{\partial x_n}(x) \end{pmatrix}
\]

Le gradient pointe dans la direction de plus forte pente ascendante.

## 2.2 Principe de la méthode de Newton

Définition

Soit f : R n → R de classe C2. La matrice hessienne de f en x est la matrice des dérivées secondes :

\[ \nabla^2 f(x) = \begin{pmatrix} \frac{\partial^2 f}{\partial x_1^2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{pmatrix} \]

Par le théorème de Schwarz, ∇2f(x) est symétrique.

## 2.2 2.2 Principe de la méthode de Newton

## Méthode

L’idée est d’approprier f au voisinage de xn par son développement de Taylor à l’ordre 2 :

\[ f(x) \approx f(x_n) + \nabla f(x_n)^\top (x - x_n) + \frac{1}{2}(x - x_n)^\top \nabla^2 f(x_n)(x - x_n) \]

Le minimum de cette approximation quadratique est atteint en :

\[ x_{n+1} = x_n + p_n \quad \text{où} \quad p_n = -[\nabla^2 f(x_n)]^{-1}\nabla f(x_n) \]

## Algorithme :

1. Choisir x0 ∈ R n et une tolérance ε > 0.

2. Tant que ||∇f(xn)|| > ε :

(a) Calculer ∇f(xn) et ∇2f(xn).

(b) Résoudre ∇2f(xn)pn = −∇f(xn) (système linéaire).

(c) Mettre à jour : xn+1 = xn + αpn.

## Définition

Le paramètre α > 0 est le pas (ou learning rate / step size) :

— α = 1 : méthode de Newton “pure” (convergence quadratique près de l’optimum).

— α déterminé par recherche linéaire : méthode de Newton globalisée.

## 2.3 2.3 Cas particulier crucial : fonctions quadratiques

## Théorème

Si f est une fonction quadratique (c’est-à-dire f(x) = 12 xT Ax+bT x+c avec A symétrique), alors :

— ∇2f(x) = A est constante.

— La méthode de Newton avec α = 1 converge en exactement une itération vers le point critique.

## 2.4 Nature du point critique

## Attention

Pourquoi une seule itération ? Parce que le modèle quadratique de Taylor est alors exact (pas d’approximation !). La méthode de Newton trouve directement le minimum du modèle, qui coïncide avec le minimum de f.

## 2.4 2.4 Nature du point critique

## Définition

Une matrice symétrique A est :

— Définie positive si xT Ax > 0 pour tout x ̸ = 0 (toutes les valeurs propres > 0).

— Définie négative si xT Ax < 0 pour tout x ̸ = 0 (toutes les valeurs propres < 0).

— Indéfinie si elle a des valeurs propres de signes opposés.

## Théorème

Soit x* un point critique (∇f(x*) = 0) :

— Si ∇2f(x*) est définie positive : x* est un minimum local (strict).

— Si ∇2f(x*) est définie négative : x* est un maximum local (strict).

— Si ∇2f(x*) est indéfinie : x* est un point-selle.

Comment calculer les valeurs propres d’une matrice 2 × 2 ?

Pour A = (a b) , le polynôme caractéristique est : c d

\[ \det(A - \lambda I) = \lambda^2 - \operatorname{tr}(A)\lambda + \det(A) = 0 \]

où tr(A) = a + d (trace) et det(A) = ad − bc (déterminant).

## 2.5 2.5 Exemple guidé (Exercice 2 de l’examen)

## Exemple

Soit f(x,y) = 2x2 + y2 − 2xy − 4x + 6y et (x0, y0) = (0, 0).

Étape 1 — Gradient :

\[ \begin{aligned} \frac{\partial f}{\partial x} &= 4x - 2y - 4 \\ \frac{\partial f}{\partial y} &= -2x + 2y + 6 \end{aligned} \]

Donc :

\[ \nabla f(x, y) = \begin{pmatrix} 4x - 2y - 4 \\ -2x + 2y + 6 \end{pmatrix} \]

Étape 2 — Hessienne :

\[ \nabla^2 f(x, y) = \begin{pmatrix} 4 & -2 \\ -2 & 2 \end{pmatrix} \]

Remarque : Elle est constante car f est quadratique.

Étape 3 — Première itération :

\[ \nabla f(0, 0) = \begin{pmatrix} -4 \\ 6 \end{pmatrix} \]

Calcul de l’inverse de la hessienne :

\[ \det(H_f) = 4 \times 2 - (-2) \times (-2) = 8 - 4 = 4 \]

\[ H_f^{-1} = \frac{1}{4} \begin{pmatrix} 2 & 2 \\ 2 & 4 \end{pmatrix} = \begin{pmatrix} 0.5 & 0.5 \\ 0.5 & 1 \end{pmatrix} \]

Direction de Newton :

\[ p_0 = -H_f^{-1}\nabla f(0, 0) = -\begin{pmatrix} 0.5 & 0.5 \\ 0.5 & 1 \end{pmatrix} \begin{pmatrix} -4 \\ 6 \end{pmatrix} = -\begin{pmatrix} 1 \\ 4 \end{pmatrix} = -\begin{pmatrix} -1 \\ -4 \end{pmatrix} \]

Mise à jour (avec α = 1) :

\[ (x_1, y_1) = (0, 0) + (-1, -4) = (-1, -4) \]

Étape 4 — Deuxième itération :

\[ \nabla f(-1, -4) = \begin{pmatrix} 4(-1) - 2(-4) - 4 \\ -2(-1) + 2(-4) + 6 \end{pmatrix} = \begin{pmatrix} -4 + 8 - 4 \\ 2 - 8 + 6 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} \]

Le gradient est nul ! L’algorithme s’arrête.

Étape 5 — Nature du point :

Valeurs propres de \(H_f = \begin{pmatrix} 4 & -2 \\ -2 & 2 \end{pmatrix}\) :

\[ \lambda^2 - 6\lambda + 4 = 0 \quad \Rightarrow \quad \lambda = \frac{6 \pm \sqrt{36 - 16}}{2} = 3 \pm \sqrt{5} \]

\[ \lambda_1 = 3 + \sqrt{5} \approx 5.236 > 0, \quad \lambda_2 = 3 - \sqrt{5} \approx 0.764 > 0 \]

Les deux valeurs propres sont strictement positives : \(H_f\) est définie positive.

**Conclusion :** \((-1, -4)\) est un **minimum global** de \(f\) (car \(f\) est quadratique convexe). Valeur optimale :

\[ f(-1, -4) = 2(1) + 16 - 2(-1)(-4) - 4(-1) + 6(-4) = 2 + 16 - 8 + 4 - 24 = -10 \]

Formule magique pour l’inverse 2 x 2 :

\[ \begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix} \]

# 3 Chapitre 3 — Multiplicateurs de Lagrange

## 3.1 3.1 Problème avec contraintes d’égalité

## Définition

On considère le problème :

\[ \min_{x \in \mathbb{R}^n} f(x) \quad \text{s.c.} \quad h(x) = 0 \]

où h : R^n → R^m (m contraintes d’égalité).

## Définition

Le lagrangien associé au problème est :

\[ \mathcal{L}(x, \lambda) = f(x) - \lambda^T h(x) = f(x) - \sum_{i=1}^{m} \lambda_i h_i(x) \]

où λ = (λ1, . . . , λm)T sont les multiplicateurs de Lagrange.

## Théorème

Si x* est un minimum local régulier du problème contraint, alors il existe λ* tel que :

\[ \nabla_x \mathcal{L}(x^*, \lambda^*) = 0 \quad \text{et} \quad h(x^*) = 0 \]

C’est-à-dire :

\[ \nabla f(x^*) = \sum_{i=1}^{m} \lambda_i^* \nabla h_i(x^*) \]

## 3.2 3.2 Méthodologie de résolution

## Méthode

Étape 1 : Écrire le lagrangien L(x, λ) = f(x) − λh(x).

Étape 2 : Résoudre le système :

\[ \left\{ \begin{array}{l} \frac{\partial \mathcal{L}}{\partial x_i} = 0 \quad \text{pour tout } i \\ \frac{\partial \mathcal{L}}{\partial \lambda_j} = 0 \quad (\text{c'est-à-dire } h_j(x) = 0) \end{array} \right. \]

Étape 3 : Identifier tous les points critiques (x*, λ*).

Étape 4 : Comparer les valeurs de f pour déterminer maxima/minima.

## 3.3 3.3 Nature des points critiques sur une contrainte

## Théorème

Si l’ensemble des contraintes est compact (fermé et borné), alors f atteint son maximum et son minimum globaux sur cet ensemble.

## 3.4 Exemple guide (Exercice 3 de l'examen)

Exemple

Maximiser f(x,y) = xy sous h(x,y) = x2 + y2 − 8 = 0.

Étape 1 — Lagrangien :

\[
\mathcal{L}(x, y, \lambda) = xy - \lambda(x^2 + y^2 - 8)
\]

Étape 2 — Système KKT :

\[
\begin{align*}
\frac{\partial \mathcal{L}}{\partial x} &= y - 2\lambda x = 0 \tag{1} \\
\frac{\partial \mathcal{L}}{\partial y} &= x - 2\lambda y = 0 \tag{2} \\
\frac{\partial \mathcal{L}}{\partial \lambda} &= -(x^2 + y^2 - 8) = 0 \tag{3}
\end{align*}
\]

Étape 3 — Résolution :

De (1) : y = 2λx. En substituant dans (2) :

\[
x - 2\lambda(2\lambda x) = x(1 - 4\lambda^2) = 0
\]

Cas 1 : Si x = 0, alors y = 0 (par (1)), mais cela viole (3) (0 ≠ 8). Impossible.

Cas 2 : 1 − 4λ2 = 0, donc λ = ±1

Sous-cas λ = 1

\[
y = 2 \times \frac{1}{2} \times x = x. \text{ Par } (3) : 2x^2 = 8 \Rightarrow x = \pm 2.
\]

\[
\text{Points : } (2, 2) \text{ et } (-2, -2)
\]

Sous-cas λ = −1

\[
y = 2 \times (-\frac{1}{2}) \times x = -x. \text{ Par } (3) : 2x^2 = 8 \Rightarrow x = \pm 2.
\]

\[
\text{Points : } (2, -2) \text{ et } (-2, 2)
\]

Étape 4 — Évaluation et classification :

\[
\begin{align*}
f(2, 2) &= 4, \tag{f(-2, -2) = 4} \\
f(2, -2) &= -4, \tag{f(-2, 2) = -4}
\end{align*}
\]

\[
\text{Paramétrisation du cercle : } x = 2\sqrt{2}\cos\theta, \quad y = 2\sqrt{2}\sin\theta
\]

\[
f(\theta) = 8 \cos \theta \sin \theta = 4 \sin(2\theta) \in [-4, 4]
\]

Conclusion :

— (2, 2) et (−2, −2) sont des maxima globaux (f = 4).

— (2, −2) et (−2, 2) sont des minima globaux (f = −4).

La contrainte est un cercle (compact), donc Weierstrass garantit l’existence de ces extrema globaux.

# 4 Chapitre 4 Méthode de Barrière Logarithmique

## 4.1 4.1 Problème avec contraintes d’inégalité

Définition

\[ \min_x f(x) \quad \text{s.c.} \quad g_i(x) \leq 0, \quad i = 1, \dots, m \]

L’ensemble admissible est F = {x : gi(x) ≤ 0, ∀i}.

## 4.2 4.2 Principe de la barrière logarithmique

L’idée est de transformer le problème contraint en une suite de problèmes non contraints en ajoutant une barrière qui pénalise le rapprochement de la frontière.

## Définition

Pour une contrainte g(x) < 0 (stricte), la barrière logarithmique est :

\[ B_{\lambda}(x) = f(x) - \lambda \sum_{i=1}^{m} \ln(-g_i(x)) \]

où λ > 0 est le paramètre de pénalisation.

## Théorème

— Quand g i ( x ) → 0 − (approche de la frontière), ln( − g i ( x ) ) → − ∞ , donc − λ ln( − g i ( x ) ) → + ∞ : la barrière repousse x de la frontière.

— Quand λ → 0, la barrière devient moins “épaisse” et les solutions approchent l’optimum du problème contraint.

## 4.3 4.3 Algorithme de barrière

## Méthode

Paramètres : λ0 > 0, β ∈]0, 1[ (facteur de réduction), ε > 0 (tolérance).

Pour k = 0, 1, 2, . . .

1. Résoudre (exactement ou approximativement) :

\[ x_k = \arg \min_x B_{\lambda_k}(x) = f(x) - \lambda_k \sum_i \ln(-g_i(x)) \]

2. Test d’arrêt : Si λk · maxi 1 |gi(xk)| < ε, stop.

3. Mettre à jour : λk+1 = β λk.

## 4.4 Exemple guide (Exercice 4 de l'examen)

Condition d’optimalité : Pour minimiser Bλ(x), on résout :

\[ \nabla B_{\lambda}(x) = \nabla f(x) - \lambda \sum_{i=1}^{m} \frac{\nabla g_i(x)}{g_i(x)} = 0 \]

Dans le cas scalaire avec une seule contrainte g(x) = -x < 0 (donc -g(x) = x) :

\[ B_{\lambda}(x) = f(x) - \lambda \ln(x) \quad \Rightarrow \quad B'_{\lambda}(x) = f'(x) - \frac{\lambda}{x} = 0 \]

Minimiser f(x) = (x −3)2 avec g(x) = −x < 0 (donc x > 0). Paramètres : λ0 = 1, β = 0.5, ε = 0.2. Itération k = 0 (λ0 = 1) :

\[B_1(x) = (x - 3)^2 - \ln(x)\]

Condition d’optimalité :

\[B_1'(x) = 2(x - 3) - \frac{1}{x} = 0 \quad \Rightarrow \quad 2x^2 - 6x - 1 = 0\]

Discriminant : Δ = 36 + 8 = 44

\[x = \frac{6 \pm \sqrt{44}}{4} = \frac{3 \pm \sqrt{11}}{2}\]

Seule la racine positive convient (x > 0) :

\[x_1 = \frac{3 + \sqrt{11}}{2} \approx 3.15831\]

Test d’arrêt :

\[\lambda_0 \cdot \frac{1}{|g(x_1)|} = 1 \cdot \frac{1}{x_1} = \frac{1}{3.15831} \approx 0.3166 > 0.2\]

Non arrêt. On continue.

Itération k = 1 (λ1 = 0.5) :

\[B_{0.5}(x) = (x - 3)^2 - 0.5 \ln(x)\]

Condition d’optimalité :

\[B_{0.5}'(x) = 2(x - 3) - \frac{0.5}{x} = 0 \quad \Rightarrow \quad 4x^2 - 12x - 1 = 0\]

Discriminant : Δ = 144 + 16 = 160

\[x = \frac{12 \pm \sqrt{160}}{8} = \frac{3 \pm \sqrt{10}}{2}\]

Racine positive :

\[x_2 = \frac{3 + \sqrt{10}}{2} \approx 3.08114\]

Test d’arrêt :

\[\lambda_1 \cdot \frac{1}{|g(x_2)|} = 0.5 \times \frac{1}{3.08114} \approx 0.1623 < 0.2\]

Arrêt !

Conclusion : La méthode converge vers \(x^* = 3\) (où la contrainte \(x > 0\) est inactive). Après 2 itérations, \(x_2 \approx 3.081\) est l’estimation finale.

Observation importante : Si le minimum sans contrainte (x* = 3) est déjà dans le domaine admissible (x > 0), la contrainte est inactive à l’optimum. La méthode de barrière converge quand même vers ce point car λk → 0.

# 5 Chapitre 5 Méthode du Simplexe

## 5.1 5.1 Problème de programmation linéaire (PL)

## Définition

Un problème de programmation linéaire sous forme standard s’écrit :

\[ \max Z = c^T x \quad \text{s.c.} \quad Ax = b, \quad x \geq 0 \]

ou :

— x ∈ R n : variables de décision

— c ∈ R n : coefficients de l’objectif

— A ∈ R m×n : matrice des contraintes (m < n)

— b ∈ R m : termes de droite (b ≥ 0)

## Théorème

Si un PL admet une solution optimale, alors il en existe une qui est un sommet (point extrême) du polyèdre des contraintes.

## 5.2 5.2 Passage à la forme standard

## Méthode

1. Contrainte ≤ : ajouter une variable d’écart s ≥ 0.

\[ x + y \leq 4 \quad \Rightarrow \quad x + y + s_1 = 4 \]

2. Contrainte ≥ : soustraire une variable d’écart et ajouter une variable artificielle.

3. Variable libre : remplacer x par x+ − x− avec x+, x− ≥ 0.

4. Minimisation : remplacer min Z par max(−Z).

## 5.3 5.3 Tableau du simplexe

## Définition

Une base est un ensemble de m colonnes de A linéairement indépendantes. Les variables associées sont les variables de base (en général les variables d’écart au départ). Les autres sont les variables hors base (nulles à chaque sommet).

## 5.4 Solutions optimales multiples Théorème Si dans le tableau final, le coefficient d'une variable hors base dans la ligne -Z est nul, alors il existe une infinité de solutions optimales. Toute combinaison convexe des sommets optimaux adjacents est optimale.

## Méthode

Initialisation : Tableau avec variables de base = variables d’écart.

Tant que il existe un coefficient négatif dans la ligne −Z :

1. Variable entrante : choisir la colonne avec le coefficient le plus négatif dans la ligne −Z (règle de Dantzig).

2. Variable sortante (test du ratio) : pour chaque ligne i avec coefficient positif dans la colonne entrante :

\[ \theta_i = \frac{\text{RHS}_i}{\text{coef}_{i,\text{entrante}}} \]

Choisir la ligne avec le plus petit ratio θi.

3. Pivot : rendre le coefficient pivot égal à 1, puis éliminer les autres coefficients de la colonne entrante.

Solution optimale : Lire les valeurs des variables de base dans la colonne RHS. Les variables hors base sont nulles.

## Attention

Test du ratio : Si tous les coefficients de la colonne entrante sont ≤ 0, le problème est non borné (pas de solution finie).

## 5.4 5.4 Solutions optimales multiples

## Théorème

Si dans le tableau final, le coefficient d’une variable hors base dans la ligne −Z est nul, alors il existe une infinité de solutions optimales. Toute combinaison convexe des sommets optimaux adjacents est optimale.

## 5.5 5.5 Exemple guidé (Exercice 5 de l’examen)

## Exemple

\[ \max Z = 2x + y \quad \text{s.c.} \quad \begin{cases} x + y \leq 4 \\ 2x + y \leq 5 \\ x, y \geq 0 \end{cases} \]

Étape 1 — Forme standard : Ajout des variables d’écart s1, s2 ≥ 0 :

\[ \begin{cases} x + y + s_1 = 4 \\ 2x + y + s_2 = 5 \\ Z - 2x - y = 0 \end{cases} \]

Étape 2 — Tableau initial :

<table>Basexys1s2RHSs111104s221015-Z-2-1000</table>

Étape 3 — Itération 1 :

Variable entrante : −2 est le plus négatif ⇒ colonne x entre. Test du ratio :

\[ \theta_1 = \frac{4}{1} = 4, \quad \theta_2 = \frac{5}{2} = 2.5 \]

Minimum = 2.5 ⇒ ligne s2 sort. Pivot = 2.

Normalisation (ligne s2 divisée par 2) :

\[ x : [1, 0.5, 0, 0.5 | 2.5] \]

Élimination :

\[ \text{Nouvelle ligne } s_1 = [1, 1, 1, 0 | 4] - 1 \times [1, 0.5, 0, 0.5 | 2.5] \\ = [0, 0.5, 1, -0.5 | 1.5] \]

\[ \text{Nouvelle ligne } -Z = [-2, -1, 0, 0 | 0] - (-2) \times [1, 0.5, 0, 0.5 | 2.5] \\ = [0, 0, 0, 1 | 5] \]

Tableau final :

<table>Basexys1s2RHSs100.51-0.51.5x10.500.52.5-Z00015</table>

Test d’optimalité : Tous les coefficients de −Z sont ≥ 0. Optimal !

Solution :

\[ x = 2.5, \quad y = 0, \quad s_1 = 1.5, \quad s_2 = 0, \quad Z_{\text{max}} = 5 \]

Solutions multiples ? Le coefficient de y (hors base) dans −Z est 0. Cela signifie que y peut entrer sans changer Z : il existe une arête optimale.

Le sommet adjacent est obtenu en faisant entrer y :

\[ \theta_1 = \frac{1.5}{0.5} = 3, \quad \theta_2 = \frac{2.5}{0.5} = 5 \]

s1 sort. Après pivot, on trouve (x, y) = (1, 3) avec Z = 5.

Tout point du segment [(2.5, 0), (1, 3)] est optimal.

Interprétation géométrique : Le coefficient nul de y dans −Z signifie que le vecteur objectif (2, 1) est colinéaire à la contrainte active 2x + y = 5. Toute la face (arête) est donc optimale.

# 6 Fiche Récapitulative — “Cheat Sheet” Méthode du nombre d’or

\[
- \varphi = \frac{1+\sqrt{5}}{2} \approx 1.618
\]

\[
- \rho = 1/\varphi^2 \approx 0.382
\]

\[
- x_1 = b - \rho(b - a), \quad x_2 = a + \rho(b - a)
\]

— Garder le côté où f est la plus petite

\[
- \text{Arrêt} : b - a < \varepsilon, \text{ puis } x^* = \frac{a+b}{2}
\]

## Méthode de Newton

\[
- p_n = -H_f^{-1}\nabla f(x_n)
\]

— xn+1 = xn + αpn (α = 1 pour Newton pur)

— Fonction quadratique ⇒ convergence en 1 itération

— Nature : valeurs propres de Hf > 0 ⇒ minimum

## Multiplicateurs de Lagrange

\[
- \mathcal{L} = f - \lambda h
\]

— Résoudre ∇L = 0 et h = 0

— Comparer les valeurs de f pour classer

— Compact ⇒ extrema globaux garantis (Weierstrass)

## Barrière logarithmique

\[
- B_{\lambda}(x) = f(x) - \lambda \ln(-g(x))
\]

\[
- \text{Condition} : B'_{\lambda}(x) = 0
\]

\[
- \text{Arrêt} : \lambda_k / |g(x_k)| < \varepsilon
\]

\[
- \lambda_{k+1} = \beta \lambda_k \text{ avec } 0 < \beta < 1
\]

## Simplexe

— Forme standard : ajouter variables d’écart

— Entrante : coefficient le plus négatif dans –Z

— Sortante : minimum des ratios RHS/coeff > 0

— Coefficient nul d’une variable hors base ⇒ solutions multiples

Bonne chance pour l’examen !
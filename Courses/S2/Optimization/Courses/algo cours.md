# Algorithmes d'Optimisation Numérique

## Table des matières

Introduction 5  
Arbre de Décision Global 6  
1 La Dichotomie 7  
1.1 Principe Intuitif 7  
1.2 Algorithme 7  
1.3 Organigramme (Flowchart) 8  
1.4 Exemple Numérique 8  
1.5 Analyse de Convergence 9  
2 La Section Dorée 11  
2.1 Le Nombre d'Or 11  
2.2 Principe Intuitif 11  
2.3 Algorithme 12  
2.4 Organigramme 13  
2.5 Exemple Numérique 13  
3 Gradient à Pas Fixe 15  
3.1 Principe Intuitif 15  
3.2 Algorithme 15  
3.3 Organigramme 16  
3.4 Exemple Numérique 16  
4 Gradient à Pas Optimal 19  
4.1 Principe Intuitif 19  
4.2 Algorithme 20  
4.3 Organigramme 20  
4.4 Calcul du Pas Optimal (Cas Quadratique) 20  
5 Gradient Conjugué 23  
5.1 Principe Intuitif 23  
5.2 Algorithme 24  
5.3 Organigramme 24  
5.4 Exemple Numérique 25  
6 Méthode de Newton 27  
6.1 Principe Intuitif 27  
6.2 Algorithme 28  
6.3 Organigramme 28  
6.4 Exemple Numérique 29  
7 Méthode BFGS 31  
7.1 Principe Intuitif 31  
7.2 Formule de Mise à Jour BFGS 31  
7.3 Organigramme 33  
7.4 Exemple Numérique 33  
8 Méthode DFP 35  
8.1 Principe Intuitif 35  
8.2 Formule de Mise à Jour DFP 35  
8.3 Organigramme 36  
8.4 Comparaison BFGS vs DFP 37  
9 Tableau Synthétique et Choix de Méthode 39  
9.1 Tableau Comparatif Global 39  
9.2 Arbre de Décision Détaillée 39  
9.3 Fiches de Révision 40  
9.4 Formules Essentielles 40  

---

## Introduction

Bienvenue dans ce cours complet sur les algorithmes d'optimisation numérique. Ce document présente 8 méthodes fondamentales, du plus simple (dichotomie) au plus sophistiqué (BFGS, DFP), avec pour chacune :

— Une explication intuitive du fonctionnement  
— Le pseudocode détaillé  
— Un organigramme visuel (flowchart)  
— Un exemple numérique complet  
— La complexité et les conditions d'application  

## • À Retenir

## Objectifs du cours :

1. Comprendre le principe de chaque algorithme (intuition géométrique)  
2. Savoir écrire le pseudocode et l'organigramme associé  
3. Être capable d'exécuter à la main un exemple numérique  
4. Connaître les avantages et inconvénients de chaque méthode  
5. Savoir choisir l'algorithme adapté à un problème donné  

## Remarque

Ce cours suppose connues les notions de base d'analyse (dérivation, gradient, Hessienne) et d'algèbre linéaire (matrices, systèmes linéaires).

Arbre de Décision - Quel Algorithme Choisir ?

---

# 1 La Dichotomie

## Remarque

La dichotomie est la méthode la plus simple et la plus robuste pour trouver un zéro d'une fonction continue. Elle repose sur le théorème des valeurs intermédiaires.

## 1.1 Principe Intuitif

## Définition

Si $f$ est continue sur $[a, b]$ et si $f(a)$ et $f(b)$ sont de signes opposés ($f(a) \cdot f(b) < 0$), alors il existe au moins un $c \in ]a, b[$ tel que $f(c) = 0$.

## 1.2 Algorithme

## Algorithme

Entrées : $f$ fonction continue, $[a, b]$ intervalle avec $f(a)f(b) < 0$, $\varepsilon$ précision.  
Principe : À chaque itération, on coupe l'intervalle en deux et on garde la moitié où $f$ change de signe.

## 1.3 Organigramme (Flowchart)

## 1.4 Exemple Numérique

Exemple Numérique  
Trouvons un zéro de $f(x) = x^3 - x - 2$ sur $[1, 2]$ avec $\varepsilon = 0.1$.  
Vérification initiale : $f(1) = -2 < 0$ et $f(2) = 4 > 0$. OK.

| It. | a | b | m | f(m) | Signe | Action |
|-----|---|---|---|------|-------|--------|
| 0 | 1.000 | 2.000 | 1.500 | -0.125 | $f(a)f(m) > 0$ | $a \leftarrow m$ |
| 1 | 1.500 | 2.000 | 1.750 | +1.609 | $f(a)f(m) < 0$ | $b \leftarrow m$ |
| 2 | 1.500 | 1.750 | 1.625 | +0.666 | $f(a)f(m) < 0$ | $b \leftarrow m$ |
| 3 | 1.500 | 1.625 | 1.562 | +0.252 | $f(a)f(m) < 0$ | $b \leftarrow m$ |
| 4 | 1.500 | 1.562 | 1.531 | +0.059 | $f(a)f(m) < 0$ | $b \leftarrow m$ |

Arrêt : $(b - a)/2 = (1.562 - 1.500)/2 = 0.031 < 0.1$.

Résultat : $x^* = (1.500 + 1.562)/2 = [1.531]$.

Valeur exacte : $x \approx 1.521$. Erreur $\approx 0.01$.

## 1.5 Analyse de Convergence

## Complexité

Nombre d'itérations : $N \geq \log_2\left(\frac{b - a}{\varepsilon}\right)$

Complexité : $O\left(\log \frac{1}{\varepsilon}\right)$ - convergence linéaire.

Ordre de convergence : $p = 1$ avec $C = 1/2$.

## • À Retenir

## Avantages :

✓ Très robuste (toujours convergent si $f(a)f(b) < 0$)  
✓ Simple à implémenter  
✓ Convergence garantie  

## Inconvénients :

× Convergence lente (linéaire)  
× Ne trouve que les zéros (pas les extrema directement)  
× Ne peut pas détecter les racines multiples  

---

# 2 La Section Dorée

## Remarque

La section dorée est une méthode d'optimisation unidimensionnelle (recherche de minimum ou maximum) sans utiliser la dérivée. Elle est inspirée du nombre d'or $\varphi$.

## 2.1 Le Nombre d'Or

## Définition

Le nombre d'or est défini par :

$$ \varphi = \frac{\sqrt{5} - 1}{2} \approx 0.618 $$

C'est l'inverse du nombre d'or classique $\Phi = \frac{1+\sqrt{5}}{2} \approx 1.618$.

## 2.2 Principe Intuitif

On cherche le minimum d'une fonction $f$ sur $[a, b]$. On place deux points $c$ et $d$ de manière symétrique par rapport au centre, avec le ratio $\varphi$.

## 2.3 Algorithme

**Algorithm 2 Section Dorée**

Entrée : $f, a, b, \varepsilon$  
Sortie : $x^*$ approximation du minimum

1: $\varphi \leftarrow (\sqrt{5} - 1)/2$  
2: $c \leftarrow b - \varphi(b - a)$  
3: $d \leftarrow a + \varphi(b - a)$  
4: $f_c \leftarrow f(c), f_d \leftarrow f(d)$  
5: Tant que $(b - a) > \varepsilon$ faire  
6: $\quad$ Si $f_c < f_d$ alors  
7: $\quad\quad b \leftarrow d$  
8: $\quad\quad d \leftarrow c, f_d \leftarrow f_c$  
9: $\quad\quad c \leftarrow b - \varphi(b - a), f_c \leftarrow f(c)$  
10: $\quad$ Sinon  
11: $\quad\quad a \leftarrow c$  
12: $\quad\quad c \leftarrow d, f_c \leftarrow f_d$  
13: $\quad\quad d \leftarrow a + \varphi(b - a), f_d \leftarrow f(d)$  
14: $\quad$ end Si  
15: end Tant que  
16: $x^* \leftarrow (a + b)/2$  
17: Retourner $x^*$

## 2.4 Organigramme

## 2.5 Exemple Numérique

## Exemple Numérique

Minimisons $f(x) = x^2$ sur $[-1, 2]$ avec $\varepsilon = 0.3$.  
Initialisation : $\varphi = 0.618$, $c = 2 - 0.618(3) = 0.146$, $d = -1 + 0.618(3) = 0.854$.

| It. | a | b | c | d | f(c) | f(d) | Action |
|-----|---|---|---|---|------|------|--------|
| 0 | -1.000 | 2.000 | 0.146 | 0.854 | 0.021 | 0.729 | $b \leftarrow d$ |
| 1 | -1.000 | 0.854 | -0.146 | 0.146 | 0.021 | 0.021 | $b \leftarrow d$ |
| 2 | -1.000 | 0.146 | -0.146 | -0.146 | 0.173 | 0.021 | $b \leftarrow d$ |
| 3 | -1.000 | -0.146 | -0.562 | -0.416 | 0.316 | 0.173 | $b \leftarrow d$ |

Arrêt : $b - a = 0.854 < 0.3$ ? Non, on continue... Après 6 itérations : $b - a \approx 0.2 < 0.3$.  
Résultat : $x^* \approx [0.0]$ (minimum exact en 0).

## Complexité

Réduction de l'intervalle : Chaque itération réduit l'intervalle d'un facteur $\varphi \approx 0.618$.  
Nombre d'itérations : $N \geq \frac{\ln(\varepsilon/(b - a))}{\ln(\varphi)}$  
Complexité : $O(\log(1/\varepsilon))$ - convergence linéaire.

## 2.5. Exemple Numérique

Pourquoi $\varphi$ ? Le nombre d'or garantit que un seul point est recalculé par itération (l'autre est réutilisé). C'est l'optimal pour les méthodes de comparaison par paires.

---

# 3 Chapitre 3 Gradient à Pas Fixe

## 3.1 Principe Intuitif

## Définition

Le gradient $\nabla f(x)$ pointe dans la direction de plus forte pente ascendante. Pour minimiser, on va dans la direction opposée : $-\nabla f(x)$.

image[[316, 504, 679, 717]]

### 3.2 Algorithme

## Algorithme

Formule de mise à jour : $x_{k+1} = x_k - \alpha \nabla f(x_k)$  
Interprétation : On fait un pas de taille $\alpha$ dans la direction opposée au gradient.

## 3.3 Organigramme

**Algorithm 3 Gradient à Pas Fixe**

Entrée : $f, \nabla f, x_0, \alpha, \varepsilon$  
Sortie : $x^*$ approximation du minimum

1: $x \leftarrow x_0$  
2: Tant que $\|\nabla f(x)\| > \varepsilon$ faire  
3: $\quad g \leftarrow \nabla f(x)$  
4: $\quad x \leftarrow x - \alpha g$  
5: end Tant que  
6: $x^* \leftarrow x$  
7: Retourner $x^*$

## 3.4 Exemple Numérique

## 3.4. Exemple Numérique

## Exemple Numérique

Minimisons $f(x,y) = x^2 + 4y^2$ avec $x_0 = (2,1)$, $\alpha = 0.2$, $\varepsilon = 0.5$.

Gradient : $\nabla f(x,y) = (2x, 8y)$.

| k | $x_k$ | $\nabla f(x_k)$ | $\|\nabla f\|$ | $x_{k+1}$ |
|---|-------|------------------|----------------|------------|
| 0 | (2.000, 1.000) | (4.000, 8.000) | 8.944 | (1.200, -0.600) |
| 1 | (1.200, -0.600) | (2.400, -4.800) | 5.367 | (0.720, 0.360) |
| 2 | (0.720, 0.360) | (1.440, 2.880) | 3.220 | (0.432, -0.216) |
| 3 | (0.432, -0.216) | (0.864, -1.728) | 1.932 | (0.259, 0.130) |

Arrêt : $\|\nabla f(x_3)\| = 1.932 > 0.5$, on continue... Après 7 itérations : $\|\nabla f\| < 0.5$.

Résultat : $x^* \approx (0.062, 0)$ (tendance vers $(0,0)$).

## Erreur Fréquente

Erreur classique : Choisir $\alpha$ trop grand $\Rightarrow$ divergence ; trop petit $\Rightarrow$ convergence très lente.  
Règle empirique : Pour une fonction quadratique $f(x) = \frac{1}{2}x^T Ax$, choisir $\alpha < 2/\lambda_{\max}(A)$.

## Complexité

Convergence : Linéaire si $0 < \alpha < 2/\lambda_{\max}$.  
Complexité par itération : $O(n)$ (évaluation du gradient).  
Total : $O(n \cdot N_{\text{iter}})$.

---

# 4 Chapitre 4 Gradient à Pas Optimal

## 4.1 Principe Intuitif

## Définition

Au lieu de fixer $\alpha$ arbitrairement, on choisit à chaque itération le pas $\alpha^*$ qui minimise $f$ le long de la direction de descente :

$$ \alpha^* = \underset{\alpha > 0}{\arg\min} f(x_k - \alpha \nabla f(x_k)) $$

## 4.2 Algorithme

**Algorithm 4 Gradient à Pas Optimal**

Entrée : $f, \nabla f, x_0, \varepsilon$  
Sortie : $x^*$ approximation du minimum

1: $x \leftarrow x_0$  
2: Tant que $\|\nabla f(x)\| > \varepsilon$ faire  
3: $\quad g \leftarrow \nabla f(x)$  
4: $\quad \alpha^* \leftarrow \arg\min_\alpha f(x - \alpha g)$  $\triangleright$ Recherche linéaire  
5: $\quad x \leftarrow x - \alpha^* g$  
6: end Tant que  
7: $x^* \leftarrow x$  
8: Retourner $x^*$

## 4.3 Organigramme

## 4.4 Calcul du Pas Optimal (Cas Quadratique)

Pour $f(x) = \frac{1}{2} x^T A x - b^T x$ avec $A$ symétrique définie positive :

$$ \alpha^* = \frac{g^T g}{g^T A g} \quad \text{où} \quad g = \nabla f(x) = A x - b $$

## 4.4. Calcul du Pas Optimal (Cas Quadratique)

## Exemple Numérique

Minimisons $f(x,y) = x^2 + 4y^2$ avec $x_0 = (2, 1)$, $\varepsilon = 0.5$.

Gradient : $\nabla f(x,y) = (2x, 8y)$. Hessienne : $A = \begin{pmatrix} 2 & 0 \\ 0 & 8 \end{pmatrix}$.

Itération 0 : $x_0 = (2,1)$, $g_0 = (4,8)$.

$$ \alpha^* = \frac{g_0^T g_0}{g_0^T A g_0} = \frac{16 + 64}{(4, 8) \begin{pmatrix} 2 & 0 \\ 0 & 8 \end{pmatrix} \begin{pmatrix} 4 \\ 8 \end{pmatrix}} = \frac{80}{32 + 512} = \frac{80}{544} \approx 0.147 $$

$$ x_1 = (2, 1) - 0.147(4, 8) = (2 - 0.588, 1 - 1.176) = (1.412, -0.176) $$

Itération 1 : $g_1 = (2.824, -1.408)$, $\|g_1\| \approx 3.16 > 0.5$.

$$ \alpha^* = \frac{7.97 + 1.98}{(2.824, -1.408)A(2.824, -1.408)^T} = \frac{9.95}{15.95 + 15.87} \approx 0.313 $$

$$ x_2 = (1.412, -0.176) - 0.313(2.824, -1.408) \approx (0.529, 0.265) $$

Convergence plus rapide que le pas fixe (même nombre d'itérations, meilleure précision).

## Complexité

Convergence : Linéaire mais meilleure constante que le pas fixe.  
Complexité par itération : $O(n^2)$ (recherche linéaire + gradient).  
Pour les quadratiques : Convergence en au plus $n$ itérations (théorique).

---

# 5 Chapitre 5 Gradient Conjugué

## 5.1 Principe Intuitif

**Définition**

Deux vecteurs $d_i$ et $d_j$ sont $A$-conjugués (ou $A$-orthogonaux) si :

$$ d_i^T A d_j = 0 \quad \text{pour } i \neq j $$

## Remarque

Le gradient conjugué construit itérativement des directions conjuguées à partir des résidus (gradients), sans connaître $A$ explicitement.

## 5.2 Algorithme

**Algorithm 5 Gradient Conjugué**

Entrée : $A$ SDP, $b$, $x_0$, $\varepsilon$  
Sortie : $x^*$ solution de $Ax = b$

1: $x \leftarrow x_0$  
2: $r \leftarrow b - Ax$  
3: $d \leftarrow r$  
4: Tant que $\|r\| > \varepsilon$ faire  
5: $\quad \alpha \leftarrow (r^T r)/(d^T A d)$  
6: $\quad x \leftarrow x + \alpha d$  
7: $\quad r_{\text{new}} \leftarrow r - \alpha A d$  
8: $\quad \beta \leftarrow (r_{\text{new}}^T r_{\text{new}})/(r^T r)$  
9: $\quad d \leftarrow r_{\text{new}} + \beta d$  
10: $\quad r \leftarrow r_{\text{new}}$  
11: end Tant que  
12: $x^* \leftarrow x$  
13: Retourner $x^*$

## 5.3 Organigramme

## 5.4 Exemple Numérique

## Exemple Numérique

Résolvons $Ax = b$ avec $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, $b = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$, $x_0 = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$

Itération 0 : $r_0 = b - Ax_0 = (3,5)$, $d_0 = (3,5)$

equation[[259, 216, 738, 270]]

$$ x_1 = (0,0) + 0.382(3,5) = (1.146, 1.910) $$

Itération 1 : $r_1 = r_0 - \alpha_0 A d_0 = (3,5) - 0.382(11,18) \approx (-1.202, -1.876)$

$$ \beta_0 = \frac{r_1^T r_1}{r_0^T r_0} = \frac{1.445 + 3.519}{34} \approx 0.146 $$

$$ d_1 = r_1 + \beta_0 d_0 \approx (-1.202, -1.876) + 0.146(3,5) \approx (-0.764, -1.146) $$

Itération 2 : $\alpha_1 \approx 0.0$ (car $r_1 \approx 0$). Convergence !

Solution exacte : $x^* = \begin{pmatrix} 4/5 \\ 7/5 \end{pmatrix} = \begin{pmatrix} 0.8 \\ 1.4 \end{pmatrix}$

Résultat : $x_2 \approx [(0.800, 1.400)]$

## Complexité

Convergence : Au plus $n$ itérations pour un système de taille $n$ (théorie exacte en arithmétique exacte).  
Complexité par itération : $O(n^2)$ (produit matrice-vecteur).  
Total : $O(n^3)$ dans le pire cas, mais souvent $O(n^2)$ en pratique.

## À Retenir

Pourquoi ça marche ? Les directions $d_k$ sont $A$-conjuguées, donc chaque itération minimise $f$ sur un sous-espace de plus en plus grand. En $n$ itérations, on a exploré tout $\mathbb{R}^n$.

---

# 6 Chapitre 6 Méthode de Newton

## 6.1 Principe Intuitif

## Définition

La méthode de Newton minimise le modèle quadratique de Taylor à l'ordre 2 :

$$ f(x_k + p) \approx f(x_k) + \nabla f(x_k)^T p + \frac{1}{2} p^T \nabla^2 f(x_k) p $$

Le minimum de cette approximation est atteint en $p = -H^{-1}g$.

## 6.2 Algorithme

**Algorithm 6 Méthode de Newton**

Entrée : $f, \nabla f, \nabla^2 f, x_0, \varepsilon$  
Sortie : $x^*$ approximation du minimum

1: $x \leftarrow x_0$  
2: Tant que $\|\nabla f(x)\| > \varepsilon$ faire  
3: $\quad g \leftarrow \nabla f(x)$  
4: $\quad H \leftarrow \nabla^2 f(x)$  
5: $\quad p \leftarrow H^{-1}g$  $\triangleright$ Résolution du système $Hp = g$  
6: $\quad x \leftarrow x - p$  
7: end Tant que  
8: $x^* \leftarrow x$  
9: Retourner $x^*$

## Remarque

En pratique, on ne calcule pas $H^{-1}$ explicitement (coûteux $O(n^3)$). On résout le système linéaire $Hp = g$ par décomposition LU ou Cholesky ($O(n^3)$ mais plus stable).

## 6.3 Organigramme

## 6.4 Exemple Numérique

## Exemple Numérique

Minimisons $f(x) = x^2$ avec $x_0 = 2$, $\varepsilon = 0.01$.

Dérivées : $f'(x) = 2x$, $f''(x) = 2$.

Itération 0 : $x_0 = 2$, $g_0 = 4$, $H_0 = 2$.

$$ p = H^{-1}g = \frac{4}{2} = 2, \quad x_1 = 2 - 2 = 0 $$

Itération 1 : $x_1 = 0$, $g_1 = 0$, $\|g_1\| = 0 < 0.01$.

Arrêt immédiat !

Résultat : $x^* = 0$ (convergence en 1 itération pour une quadratique !).

## Exemple Numérique

Minimisons $f(x,y) = x^2 + 4y^2$ avec $x_0 = (2, 1)$.

Gradient : $\nabla f = (2x, 8y) = (4, 8)$.

Hessienne : $H = \begin{pmatrix} 2 & 0 \\ 0 & 8 \end{pmatrix}$. Direction :

$$ p = H^{-1}g = \begin{pmatrix} 1/2 & 0 \\ 0 & 1/8 \end{pmatrix} \begin{pmatrix} 4 \\ 8 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix} $$

Mise à jour :

$$ x_1 = (2, 1) - (2, 1) = (0, 0) $$

Convergence en 1 itération ! (car $f$ est quadratique)

## Complexité

Convergence : Quadratique près du minimum ($\|x_{k+1} - x^*\| \leq C\|x_k - x^*\|^2$).  
Complexité par itération : $O(n^3)$ (inversion Hessienne ou résolution système).  
Total : $O(n^3 \cdot N_{\text{iter}})$, mais $N_{\text{iter}}$ est très petit.

## Erreur Fréquente

Piège classique : Si $H$ n'est pas définie positive, la direction $-H^{-1}g$ peut être une direction de montée !

Solution : Modifier $H$ pour la rendre définie positive (modification de Hessienne), ou utiliser une recherche linéaire.

---

# 7 Chapitre 7 Méthode BFGS

## 7.1 Principe Intuitif

## Définition

BFGS (Broyden-Fletcher-Goldfarb-Shanno) est une méthode quasi-Newton : elle approxime la Hessienne (ou son inverse) sans la calculer explicitement.

<center>Compromis vitesse/coût</center>

## 7.2 Formule de Mise à Jour BFGS

## Définition

On définit $s_k = x_{k+1} - x_k$ (déplacement) et $y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$ (variation du gradient). La mise à jour de l'inverse de la Hessienne $H_k$ est :

$$ H_{k+1} = (I - \rho_k s_k y_k^T) H_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T $$

où $\rho_k = 1/(y_k^T s_k)$.

1: $x \leftarrow x_0$  
2: $H \leftarrow I$  
3: Tant que $\|\nabla f(x)\| > \varepsilon$ faire  
4: $\quad g \leftarrow \nabla f(x)$  
5: $\quad p \leftarrow -Hg$  
6: $\quad \alpha \leftarrow$ recherche linéaire  
7: $\quad x_{\text{new}} \leftarrow x + \alpha p$  
8: $\quad s \leftarrow x_{\text{new}} - x$  
9: $\quad y \leftarrow \nabla f(x_{\text{new}}) - g$  
10: $\quad \rho \leftarrow 1 / (y^T s)$  
11: $\quad H \leftarrow (I - \rho s y^T)H(I - \rho y s^T) + \rho s s^T$  
12: $\quad x \leftarrow x_{\text{new}}$  
13: end Tant que  
14: $x^* \leftarrow x$  
15: Retourner $x^*$

## 7.3 Organigramme

## 7.4 Exemple Numérique

## Exemple Numérique

Minimisons $f(x,y) = x^2 + 4y^2$ avec $x_0 = (2, 1)$, $\varepsilon = 0.1$.

Initialisation : $H_0 = I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

Itération 0 : $g_0 = (4,8)$, $p_0 = -H_0 g_0 = (-4, -8)$.

Avec $\alpha = 0.1$ (recherche linéaire simple) : $x_1 = (2, 1) + 0.1(-4, -8) = (1.6, 0.2)$.

$s_0 = (-0.4, -0.8)$, $g_1 = (3.2, 1.6)$, $y_0 = (-0.8, -6.4)$.

$\rho_0 = 1/(y_0^T s_0) = 1/(0.32 + 5.12) = 1/5.44 \approx 0.184$.

Mise à jour BFGS de $H_0$ vers $H_1$ (calcul matriciel)...

Après 3-4 itérations : convergence vers $(0, 0)$.

## 7.4. Exemple Numérique

## À Retenir

- Convergence super-linéaire (presque quadratique)  
- Coût $O(n^2)$ par itération (vs $O(n^3)$ pour Newton)  
- Pas de calcul de Hessienne nécessaire  
- Très robuste en pratique  

---

# 8 Chapitre 8 Méthode DFP

## 8.1 Principe Intuitif

## Définition

DFP (Davidon-Fletcher-Powell) est l'ancêtre de BFGS. Au lieu de mettre à jour l'inverse de la Hessienne $H$, DFP met à jour directement l'approximation de la Hessienne $B$ (puis on inverse).

mise à jour de $H$  
mise à jour de $B$

## 8.2 Formule de Mise à Jour DFP

## Définition

Avec $s_k = x_{k+1} - x_k$ et $y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$ :

$$ B_{k+1} = B_k + \frac{s_k s_k^T}{s_k^T y_k} - \frac{B_k y_k y_k^T B_k}{y_k^T B_k y_k} $$

La direction de descente est $p_k = -B_k^{-1} \nabla f(x_k)$.

## 8.3 Organigramme

**Algorithm 8 DFP**

Entrée : $f, \nabla f, x_0, \varepsilon$  
Sortie : $x^*$ approximation du minimum

1: $x \leftarrow x_0$  
2: $B \leftarrow I$  $\triangleright$ Initialisation : identité  
3: Tant que $\|\nabla f(x)\| > \varepsilon$ faire  
4: $\quad g \leftarrow \nabla f(x)$  
5: $\quad p \leftarrow -B^{-1}g$  $\triangleright$ Résolution système  
6: $\quad \alpha \leftarrow$ recherche linéaire  
7: $\quad x_{\text{new}} \leftarrow x + \alpha p$  
8: $\quad s \leftarrow x_{\text{new}} - x$  
9: $\quad y \leftarrow \nabla f(x_{\text{new}}) - g$  
10: $\quad B \leftarrow B + \frac{s s^T}{s^T y} - \frac{B y y^T B}{y^T B y}$  
11: $\quad x \leftarrow x_{\text{new}}$  
12: end Tant que  
13: $x^* \leftarrow x$  
14: Retourner $x^*$

## 8.4 Comparaison BFGS vs DFP

| Critère | BFGS | DFP |
|---------|------|-----|
| Mise à jour de | $H \approx (\nabla^2 f)^{-1}$ | $B \approx \nabla^2 f$ |
| Formule | $(I - \rho s y^T)H(I - \rho y s^T) + \rho s s^T$ | $B + \frac{s s^T}{s^T y} - \frac{B y y^T B}{y^T B y}$ |
| Direction | $p = -Hg$ | $p = -B^{-1}g$ (système) |
| Coût direction | $O(n^2)$ | $O(n^3)$ (inversion) |
| Robustesse | Plus robuste | Moins robuste |
| Utilisation | Standard | Rare aujourd'hui |

## Exemple Numérique

Même exemple : $f(x,y) = x^2 + 4y^2$, $x_0 = (2,1)$.

DFP vs BFGS : Les deux convergent vers $(0,0)$, mais BFGS est généralement plus rapide et plus stable numériquement.

En pratique : On utilise presque toujours BFGS (ou L-BFGS pour les grands problèmes).

## Complexité

Convergence : Super-linéaire (similaire à BFGS).  
Complexité par itération : $O(n^3)$ (à cause de l'inversion de $B$).

Pourquoi BFGS a remplacé DFP : Coût $O(n^2)$ vs $O(n^3)$ par itération.

---

# 9 Tableau Synthétique et Choix de Méthode

## 9.1 Tableau Comparatif Global

| Méthode | Convergence | Coût/iter | Besoin | Utilisation |
|---------|-------------|-----------|--------|-------------|
| Dichotomie | Linéaire ($p = 1$) | $O(1)$ | $f$ continue, signe | Racines 1D |
| Section Dorée | Linéaire ($p = 1$) | $O(1)$ | $f$ unimodale | Opt. 1D sans dérivée |
| Grad. pas fixe | Linéaire | $O(n)$ | $\nabla f$, $\alpha$ | Grandes dimensions |
| Grad. optimal | Linéaire+ | $O(n^2)$ | $\nabla f$ | Quadratiques |
| Grad. conjugué | $n$ iter (quad.) | $O(n^2)$ | $A$ SDP | Systèmes linéaires |
| Newton | Quadratique | $O(n^3)$ | $\nabla f, \nabla^2 f$ | Petits problèmes |
| BFGS | Super-linéaire | $O(n^2)$ | $\nabla f$ | Usage général |
| DFP | Super-linéaire | $O(n^3)$ | $\nabla f$ | Historique |

## 9.2 Arbre de Décision Détaillée

## 9.3 Fiches de Révision

## • À Retenir

**Fiche 1 – Dichotomie :**  
— Couper l'intervalle en 2, garder celui où $f$ change de signe  
— Convergence linéaire, très robuste  
— $N \geq \log_2((b - a)/\varepsilon)$ itérations  

## • À Retenir

**Fiche 2 – Section Dorée :**  
— $\varphi = (\sqrt{5} - 1)/2 \approx 0.618$  
— Un seul point recalculé par itération  
— Pour minimiser sans dérivée en 1D  

## • À Retenir

**Fiche 3 – Gradient :**  
— Pas fixe : $x \leftarrow x - \alpha \nabla f$ (choisir $\alpha$ avec soin)  
— Pas optimal : $\alpha^* = \arg\min f(x - \alpha \nabla f)$  
— Conjugué : directions $A$-orthogonales, convergence en $n$ itérations  

## • À Retenir

**Fiche 4 – Newton et Quasi-Newton :**  
— Newton : $x \leftarrow x - H^{-1}g$ (quadratique, mais $O(n^3)$)  
— BFGS : approxime $H^{-1}$ sans la calculer ($O(n^2)$)  
— DFP : approxime $H$ directement (moins efficace que BFGS)  

## 9.4 Formules Essentielles

## • À Retenir

| Méthode | Formule de mise à jour |
|---------|------------------------|
| Gradient pas fixe | $x_{k+1} = x_k - \alpha \nabla f(x_k)$ |
| Gradient optimal | $x_{k+1} = x_k - \alpha^* \nabla f(x_k)$ |
| Gradient conjugué | $x_{k+1} = x_k + \alpha_k d_k$ |
| Newton | $x_{k+1} = x_k - H_k^{-1} \nabla f(x_k)$ |
| BFGS | $x_{k+1} = x_k - \alpha_k H_k \nabla f(x_k)$ |

## 9.4. Formules Essentielles

Bon courage pour vos examens !

La pratique régulière est la clé du succès.
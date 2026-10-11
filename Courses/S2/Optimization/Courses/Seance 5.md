# Algorithmes d'optimisation

**Pr. Faouzia Benabbou**  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2024-2025  
<faouzia.benabbou@univh2c.ma>

---

## Plan du module

- Introduction – Rappels mathématiques
- Algorithmes d’Optimisation Sans Contraintes
- Algorithmes d’Optimisation avec Contraintes
- Programmation Linéaire et non Linéaire
- Optimisation combinatoire et globale
- Méthodes heuristiques et métahéuristiques

---

## Les algorithmes d’optimisation

### Classes des algorithmes

- **Optimisation**
  - **Méthodes Analytiques** – Sous contrainte
  - **Méthodes numériques** – Sans contraintes
    - Méthode sans gradient
    - Méthode de descente de gradient
      - Méthode de gradient à pas fixe et optimal
      - Méthode de gradient conjugué
      - Méthodes du gradient quasi‑Newton
      - Méthode de Newton
    - Méthodes générales de résolutions de PCE, PCI
    - Programmation linéaire et non linéaire
    - Optimisation combinatoire et globale
    - Méthodes heuristiques et métahéuristiques
    - Algorithmes multi‑objectifs

---

## Méthodes d’optimisation de descente gradient

### Méthode de gradient à pas fixe : limites

- L’inconvénient d’utiliser un pas de descente constant est que l’algorithme converge très lentement si le pas est trop petit.
- Dans le cas où le pas est trop grand, l’algorithme peut devenir instable et diverger.
- Le choix optimal de la valeur de $\alpha$ est très important pour la convergence.
- Il faudra par conséquent ajuster la valeur de $\alpha$ à chaque itération.

---

### Méthode de gradient à pas optimal

L’idée de base est de chercher $\alpha_k$ diminuant davantage $f(x_k)$ dans la direction $d_k$ :

$$
d_k = -\nabla f(x_k)
$$

Dans la méthode de gradient à pas fixe on a :

$$
x_{k+1} = x_k + \alpha \, d_k
$$

et on cherche à minimiser $f(x_{k+1})$ par rapport à $\alpha$.

On pose :

$$
\phi(\alpha) = f(x_{k+1}) = f(x_k - \alpha \nabla f(x_k))
$$

et on cherche le pas optimal tel qu’il réalise :

$$
\min_{\alpha} \phi(\alpha)
$$

Minimiser $\phi(\alpha)$ revient à chercher $\alpha$ tel que :

$$
\frac{d}{d\alpha}\phi(\alpha) = 0
$$

---

#### Algorithme – Gradient à pas optimal

1. **Initialisation** :  
   $x_0 \in \mathbb{R}^n$, $f$ une fonction objective de classe $\mathcal{C}^1$, $\alpha \in \mathbb{R}_+^*$.  
   $\varepsilon$ : critère d’arrêt (tolérance sur le gradient), `max_iter` : nombre max d’itérations.

2. **Répéter**  
   a) Calculer la direction de descente : $d_k = -\nabla f(x_k)$  
   b) Recherche linéaire avec condition d’Armijo pour trouver  
      $\alpha_k = \min_{\alpha>0} f(x_k - \alpha \nabla f(x_k))$  
   c) Mettre à jour la solution : $x_{k+1} = x_k + \alpha_k d_k$  
   d) $k \leftarrow k+1$  
   jusqu’à convergence.

---

#### Condition d’Armijo

L’objectif est de trouver un pas $\alpha$ satisfaisant :

$$
f(x + \alpha d) \leq f(x) + \delta \, \alpha \, \nabla f(x)^T d
$$

À chaque itération on réduit $\alpha$ par $\alpha \leftarrow \alpha \cdot \beta$.

Avec :
- $\delta$ : paramètre d’Armijo dans $[0,1]$ (doit être petit, ex. $10^{-4}$)
- $\beta$ : facteur de réduction du pas dans $[0,1]$ (ex. $0.7$)
- $\alpha$ : pas initial de la descente  
- $d$ : direction de descente

Dans la descente du gradient on prend la plus forte descente $d = -\nabla f(x)$. Après simplification on obtient :

$$
f(x + \alpha d) \leq f(x) - \delta \, \alpha \, \|\nabla f(x)\|^2
$$

Si la condition n’est pas satisfaite, le pas est réduit de manière multiplicative : $\alpha \leftarrow \alpha \cdot \beta$.

---

#### Algorithme de recherche linéaire avec condition d’Armijo

1. Initialisation : $\alpha \leftarrow$ valeur < 1 (pas initial choisi)  
2. Tant que la condition d’Armijo n’est pas satisfaite et que $i < \text{max\_iter}$  
   a) Si $f(x - \alpha \nabla f(x)) \leq f(x) - \delta \, \alpha \, \|\nabla f(x)\|^2$  
      → retourner $\alpha$ (pas valide)  
   b) Sinon, $\alpha \leftarrow \alpha \cdot \beta$  
3. Retourner le dernier $\alpha$ trouvé

---

#### Limites de la méthode de gradient à pas optimal

- Trouver $\alpha$ nécessite de résoudre un sous‑problème d’optimisation unidimensionnel à chaque itération, ce qui peut être coûteux en temps de calcul.
- Lorsque le gradient varie fortement en norme, le pas optimal peut fluctuer, entraînant des zigzags et une convergence lente.
- C’est une méthode simple et efficace pour les problèmes bien conditionnés et convexes.
- Cependant, elle devient inefficace dans les cas mal conditionnés (rapport entre la plus grande et la plus petite valeur propre élevé), non convexes, ou lorsque la recherche du pas est trop coûteuse.

---

### Exemple : $f(x,y)=100x^2+y^2$

#### Calcul symbolique du gradient avec Python

```python
x, y = sp.symbols('x y', real=True)

# Définition de la fonction f(x, y)
f = 100*x**2 + y**2

# Calcul du gradient symbolique
f_x = sp.diff(f, x)  # Dérivée par rapport à x
f_y = sp.diff(f, y)  # Dérivée par rapport à y

print("Dérivée partielle par rapport à x:", f_x)
print("Dérivée partielle par rapport à y:", f_y)

# Conversion en fonctions numériques
grad_f_x = sp.lambdify((x, y), f_x, 'numpy')
grad_f_y = sp.lambdify((x, y), f_y, 'numpy')

def grad_f(x_val, y_val):
    return np.array([grad_f_x(x_val, y_val), grad_f_y(x_val, y_val)])
```

---

#### Descente de gradient à pas optimal

```python
def descente_optimal(x0, y0, epsilon=1e-6, max_iterations=50):
    x, y = x0, y0
    trajectory = [(x, y)]
    num_iterations = 0
    for _ in range(max_iterations):
        grad = grad_f_numeric(x, y)
        norm_grad = np.linalg.norm(grad)
        if norm_grad < epsilon:
            break
        # Recherche linéaire pour trouver le pas optimal
        t = line_search_armijo(np.array([x, y]), grad)
        # Mise à jour
        x -= t * grad[0]
        y -= t * grad[1]
        trajectory.append((x, y))
        num_iterations += 1
    return trajectory, num_iterations
```

---

#### Descente de gradient à pas fixe

```python
alpha = 0.01           # Taux d'apprentissage
epsilon = 1e-6         # Critère d'arrêt
max_iterations = 100   # Nombre maximum d'itérations
x0, y0 = -1.0, 1.0     # Point de départ

x_vals, y_vals, num_iterations = gradient_descent(f, grad_f, x0, y0, alpha, epsilon, max_iterations)
min_x, min_y = x_vals[-1], y_vals[-1]
print(f"Le minimum est atteint en ({min_x:.6f}, {min_y:.6f}) après {num_iterations} itérations.")
```

---

#### Comparaison : pas fixe vs pas optimal

**Pas fixe $t = 0.1$** :  
Minimum trouvé à  
$x = -75051624198252387620538345656498694575846324140945864444754058238831805931044028204462977223468527742027513408880578658874425344.0000$  
$y = 0.0000$  
$f = 5632746294795702855005384171848075278325783408937976733218869272826276552864670566759997913552867172775337673964785413710603475090055131064498151351169764565301146849523931087650683043119114902507880588359419964602577442627518094451995293390332906291855360.0000$  
en 100 itérations

**Pas fixe $t = 0.01$** :  
Minimum trouvé à $x = -1.0000$, $y = 0.1326$, $f = 100.0176$ en 100 itérations

**Pas optimal** :  
Minimum trouvé à $x = -0.0027$, $y = 0.1316$, $f = 0.0180$ en 100 itérations

> Bien que le nombre d’itérations soit le même (100), la qualité de la solution avec le pas optimal est bien meilleure. La recherche linéaire adapte le pas pour mieux naviguer dans la fonction, tandis que le pas fixe n’a pas réussi à s’adapter et a conduit à un échec de convergence.

---

#### Fonction de recherche linéaire (Armijo)

```python
def line_search_armijo(x, grad, t=1e-2, beta=0.7, alpha=1, max_iter=100):
    """Recherche linéaire avec la condition d'Armijo."""
    for _ in range(max_iter):
        if f_lambdified(*(x - alpha * grad)) <= f_lambdified(*x) - t * alpha * np.linalg.norm(grad)**2:
            return alpha
        alpha *= beta
    return alpha
```

---

#### Descente de gradient avec recherche linéaire

```python
def gradient_descent_optimal(f, grad_f_numeric, x0, y0, epsilon, max_iterations):
    x, y = x0, y0
    trajectory = [(x, y)]
    for iteration in range(max_iterations):
        grad = grad_f_numeric(x, y)
        norm_grad = np.linalg.norm(grad)
        if norm_grad < epsilon:
            return trajectory, iteration + 1
        t = line_search_armijo(np.array([x, y]), grad)
        x -= t * grad[0]
        y -= t * grad[1]
        trajectory.append((x, y))
    return trajectory, max_iterations
```

---

### Méthode du gradient conjugué

Les méthodes du gradient conjugué sont utilisées pour résoudre des systèmes d’équations linéaires de la forme $Ax = b$, où la matrice $A$ est symétrique définie positive (SDP).

**Définition** :  
Soit $A$ une matrice symétrique $n \times n$ définie positive. Deux vecteurs $x$ et $y$ de $\mathbb{R}^n$ sont dits $A$-conjugués (ou conjugués par rapport à $A$) s’ils vérifient

$$
x^T A y = 0
$$

---

#### Théorème – Existence et unicité du minimum pour une fonction quadratique

Soit une fonction quadratique de la forme

$$
f(x) = \frac{1}{2} x^T A x - b^T x + c
$$

où $A$ est symétrique définie positive ($A^T = A$, $x^T A x > 0$ pour tout $x \neq 0$), $b \in \mathbb{R}^n$, $c \in \mathbb{R}$.

Alors cette fonction admet un unique minimum global donné par

$$
x^* = A^{-1} b
$$

---

#### Principe du gradient conjugué

Étant donnés un point initial $x_0 \in \mathbb{R}^n$ et $n$ directions $A$-conjuguées. L’idée est de construire itérativement des directions $d_1, \dots, d_k$ mutuellement conjuguées.

On a

$$
\nabla f(x) = \nabla\left(\frac{1}{2} x^T A x - b^T x + c\right) = A x - b
$$

car $\nabla\left(\frac{1}{2} x^T A x\right) = A x$ et $\nabla(b^T x) = b$.

On note le résidu (ou erreur) :

$$
r(x) = b - A x = -\nabla f(x)
$$

Le pas $\alpha_k$ détermine de combien avancer dans la direction $d_k$ pour minimiser $f$.

---

#### Algorithme 5 – Descente du gradient conjugué

1. **Initialisation** :  
   $x_0 \in \mathbb{R}^n$, $f$ quadratique symétrique définie positive, $\varepsilon$ tolérance, `max_iter`.  
   $k = 0$

2. Calculer le résidu initial :  
   $r_0 = b - A x_0$

3. Poser la direction initiale :  
   $d_0 = r_0$

4. **Répéter**  
   a) Calculer le pas optimal :  
   $\alpha_k = \dfrac{r_k^T r_k}{d_k^T A d_k}$  
   b) Mettre à jour la solution :  
   $x_{k+1} = x_k + \alpha_k d_k$  
   c) Calculer le nouveau résidu :  
   $r_{k+1} = r_k - \alpha_k A d_k$  
   d) Calculer le coefficient de conjugaison :  
   $\beta_k = \dfrac{r_{k+1}^T r_{k+1}}{r_k^T r_k}$  
   e) Mettre à jour la direction :  
   $d_{k+1} = r_{k+1} + \beta_k d_k$  
   f) $k \leftarrow k+1$

5. Jusqu’à ce que $\|r_k\| \le \varepsilon$ ou $k > \text{max\_iter}$

6. Retourner $x_k$ solution approchée de $Ax = b$.

---

#### Exemple 1 – $f(x,y) = 3(x^2+y^2)$

1. Calcul du gradient :  
   $\nabla f(x,y) = (6x, 6y)$

2. Hessienne :  
   $H_f = \begin{pmatrix} 6 & 0 \\ 0 & 6 \end{pmatrix} = A$

   On vérifie que  
   $$
   f(x,y) = \frac{1}{2} (x,y) \begin{pmatrix} 6 & 0 \\ 0 & 6 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \frac{1}{2} x^T A x
   $$
   avec $b = 0$, $c = 0$.

3. $f(x,y) \ge 0$ donc $x^T A x \ge 0$ (forme quadratique), $A$ est symétrique définie positive (SDP).

4. Recherche du minimum avec point de départ $(x_0, y_0) = (1,1)$, $\varepsilon = 10^{-4}$.

   - Résidu initial :  
     $r_0 = b - A x_0 = -\begin{pmatrix} 6 & 0 \\ 0 & 6 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -6 \\ -6 \end{pmatrix}$

   - Direction initiale :  
     $d_0 = r_0 = \begin{pmatrix} -6 \\ -6 \end{pmatrix}$

   - Pas optimal :  
     $$
     \alpha_0 = \frac{r_0^T r_0}{d_0^T A d_0}
     = \frac{72}{(-6,-6) \begin{pmatrix} 6 & 0 \\ 0 & 6 \end{pmatrix} \begin{pmatrix} -6 \\ -6 \end{pmatrix}}
     = \frac{72}{432} = \frac{1}{6}
     $$

   - Mise à jour :  
     $$
     x_1 = x_0 + \alpha_0 d_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix} + \frac{1}{6} \begin{pmatrix} -6 \\ -6 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
     $$

   - Nouveau résidu :  
     $$
     r_1 = r_0 - \alpha_0 A d_0 = \begin{pmatrix} -6 \\ -6 \end{pmatrix} - \frac{1}{6} \begin{pmatrix} 6 & 0 \\ 0 & 6 \end{pmatrix} \begin{pmatrix} -6 \\ -6 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
     $$

   $\|r_1\| = 0 \le \varepsilon$, donc on s’arrête. Le minimum est atteint en une itération : $(0,0)$.

---

#### Exemple 2 – $f(x,y) = 5x^2 + \frac{1}{2}y^2 - 3(x+y)$

1. Gradient :  
   $\nabla f(x,y) = (10x - 3,\; y - 3)$

2. Hessienne :  
   $H_f = \begin{pmatrix} 10 & 0 \\ 0 & 1 \end{pmatrix} = A$

3. Forme quadratique :  
   $$
   f(x,y) = \frac{1}{2} (x,y) \begin{pmatrix} 10 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} - b^T \begin{pmatrix} x \\ y \end{pmatrix} + c
   $$
   avec $b = \begin{pmatrix} 3 \\ 3 \end{pmatrix}$ et $c = 0$.

   $x^T A x = 5x^2 + \frac{1}{2}y^2 \ge 0$, donc $A$ est SDP.

4. Algorithme avec point de départ $(x_0, y_0) = (1,1)$, $\varepsilon = 10^{-6}$.

   - Résidu initial :  
     $r_0 = b - A x_0 = \begin{pmatrix} 3 \\ 3 \end{pmatrix} - \begin{pmatrix} 10 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -7 \\ 2 \end{pmatrix}$

   - Direction initiale :  
     $d_0 = r_0 = \begin{pmatrix} -7 \\ 2 \end{pmatrix}$

---

#### Implémentation Python du gradient conjugué

```python
import numpy as np

def Ax(A, x):
    return np.dot(A, x)

def gradient_conjugue(A, b, x0, tol, max_iter):
    r0 = b - Ax(A, x0)
    d0 = r0
    xk = x0
    rk = r0
    dk = d0
    k = 0
    print(f"Initialisation : x0 = {xk}, r0 = {rk}, d0 = {dk}")

    while np.linalg.norm(rk) > tol and k < max_iter:
        alpha_k = np.dot(rk, rk) / np.dot(dk, Ax(A, dk))
        print(f"Itération {k+1}:")
        print(f"  alpha_k = {alpha_k}")
        xk = xk + alpha_k * dk
        print(f"  xk+1 = {xk}")
        rk1 = rk - alpha_k * Ax(A, dk)
        print(f"  rk+1 = {rk1}")
        print(f"  ||rk+1|| = {np.linalg.norm(rk1)}")
        beta_k = np.dot(rk1, rk1) / np.dot(rk, rk)
        print(f"  beta_k = {beta_k}")
        dk1 = rk1 + beta_k * dk
        print(f"  dk+1 = {dk1}")
        rk = rk1
        dk = dk1
        k += 1
    return xk

# Exemple
A = np.array([[10, 0], [0, 1]])
b = np.array([3, 3])
x0 = np.array([0, 0])
solution = gradient_conjugue(A, b, x0, tol=1e-4, max_iter=100)
print(f"Solution approximative x = {solution}")
```

Sortie :

```
Initialisation : x0 = [0 0], r0 = [3 3], d0 = [3 3]
Itération 1:
  alpha_k = 0.18181818181818182
  xk+1 = [0.54545455 0.54545455]
  rk+1 = [-2.45454545  2.45454545]
  ||rk+1|| = 3.4712514712794156
  beta_k = 0.669421487603306
  dk+1 = [-0.44628099  4.46280992]
Itération 2:
  alpha_k = 0.55
  xk+1 = [0.3 3. ]
  rk+1 = [-4.4408921e-16 -8.8817842e-16]
  ||rk+1|| = 9.930136612989092e-16
  beta_k = 8.183485042158984e-32
  dk+1 = [-4.4408921e-16 -8.8817842e-16]
Solution approximative x = [0.3 3. ]
```

---

#### Remarques sur le gradient conjugué

- Pour les matrices symétriques définies positives, le gradient conjugué converge théoriquement en au plus $n$ itérations, où $n$ est la taille de la matrice.
- Cette méthode est plus efficace que la descente de gradient, surtout pour les grands systèmes.
- Cependant, elle est sensible aux erreurs numériques.
- Elle est inefficace pour les matrices mal conditionnées, et exige une matrice SDP.

---

### Méthode de Newton

La méthode de Newton permet de résoudre des équations de type $f(x)=0$, et en particulier, si $f = F'$ on peut calculer les points critiques de $F$.

Bien que Newton appartienne à la famille des méthodes de descente, il ne s’agit pas d’une descente de gradient classique. Elle appartient aux méthodes de second ordre, qui exploitent la matrice hessienne pour ajuster la direction de mise à jour.

On cherche à minimiser une fonction $f : \mathbb{R}^n \to \mathbb{R}$ de classe $\mathcal{C}^2$.

La méthode de Newton est basée sur l’approximation quadratique de $f$ autour d’un point $x_n$ en utilisant le développement de Taylor au second ordre (modèle quadratique).

Rappel du développement de Taylor :

$$
f(x+h) \approx f(x) + h^T \nabla f(x) + \frac{1}{2!} h^T \nabla^2 f(x) h
$$

En remplaçant $x$ par $x_n$ :

$$
f(x_n+h) \approx f(x_n) + h^T \nabla f(x_n) + \frac{1}{2!} h^T \nabla^2 f(x_n) h
$$

L’idée est de trouver un point $x_{n+1}$ qui minimise l’approximation quadratique $P_{x_n}(h)$.

$$
P_{x_n}(x_n+h) = f(x_n) + h^T \nabla f(x_n) + \frac{1}{2!} h^T \nabla^2 f(x_n) h
$$

---

#### Obtention du pas de Newton

Les conditions de premier ordre donnent (dérivation par rapport à $h$) :

$$
\nabla P_{x_n}(x_n+h) = 0 = \nabla\left( f(x_n) + h^T \nabla f(x_n) + \frac{1}{2!} h^T \nabla^2 f(x_n) h \right)
$$

Sachant que la hessienne est symétrique ($\nabla(p^T A p) = 2 A p$), on a :

$$
\nabla f(x_n) + \frac{1}{2!} \left( 2 \nabla^2 f(x_n) h \right) = 0
$$

Donc :

$$
h = - \left( \nabla^2 f(x_n) \right)^{-1} \nabla f(x_n)
$$

En posant $x_{n+1} = x_n + h$, on obtient :

$$
x_{n+1} = x_n - \left( \nabla^2 f(x_n) \right)^{-1} \nabla f(x_n)
$$

---

#### Algorithme 6 – Méthode de Newton

1. Initialisation : $x_0$, $\varepsilon$, $n=0$, `max_iter`

2. **Répéter** jusqu’à convergence :  
   a) Calculer le gradient $\nabla f(x_n)$  
   b) Calculer la matrice hessienne $\nabla^2 f(x_n)$  
   c) Résoudre le système linéaire :  
      $p_n = - \left( \nabla^2 f(x_n) \right)^{-1} \nabla f(x_n)$  
   d) Mettre à jour la solution :  
      $x_{n+1} = x_n + p_n$  
   e) $n \leftarrow n+1$

3. Vérifier la condition d’arrêt : $\|\nabla f(x_n)\| < \varepsilon$ ou $n > \text{max\_iter}$

4. Retourner la solution $x_{n+1}$

---

#### Exemple d’application de Newton

Soit la fonction :

$$
f(x_1, x_2, x_3) = \frac{1}{4}x_1^4 + x_2^3 - \frac{1}{3}x_3^3 + 6x_1^2 + 3x_2^2 + 6x_1 x_2
$$

*(Nota : sur les pages 38‑39 du cours original, une coquille mentionnait $x_4^3$ au lieu de $x_1^4$ ; la fonction correcte est celle ci‑dessus.)*

Évaluation numérique par l’algorithme de Newton.

---

#### Implémentation Python – Newton

```python
import sympy as sp
import numpy as np

# Définition des variables symboliques
x1, x2, x3 = sp.symbols('x1 x2 x3')
variables = [x1, x2, x3]

# Fonction symbolique
f_sym = (1/4) * x1**4 + x2**3 - (1/3) * x3**3 + 6 * x1**2 + 3 * x2**2 + 6 * x1 * x2

# Calcul automatique du gradient et de la hessienne
grad_f_sym = [sp.diff(f_sym, var) for var in variables]
hess_f_sym = [[sp.diff(g, var) for var in variables] for g in grad_f_sym]

# Conversion en fonctions numériques
grad_f_numeric = sp.lambdify(variables, grad_f_sym, 'numpy')
hess_f_numeric = sp.lambdify(variables, hess_f_sym, 'numpy')
```

---

```python
def newton_method(x0, tol, max_iter):
    x = np.array(x0, dtype=float)
    iter_count = 0
    while np.linalg.norm(np.array(grad_f_numeric(*x), dtype=float)) >= tol and iter_count < max_iter:
        grad = np.array(grad_f_numeric(*x), dtype=float)
        hess = np.array(hess_f_numeric(*x), dtype=float)

        if np.linalg.det(hess) == 0:
            print("La matrice Hessienne est singulière, arrêt de l'algorithme.")
            return x

        p = -np.linalg.inv(hess) @ grad
        x += p
        iter_count += 1
        print(f"Itération {iter_count}: x = {x}, Gradient Norm = {np.linalg.norm(grad)}")

    return x, iter_count

# Point initial
x0 = [1.0, 1.0, 1.0]
solution, iter_count = newton_method(x0, tol=1e-6, max_iter=100)
print("Solution trouvée :", solution, "en", iter_count, "itérations")
```

---

#### Résultats

Avec tolérance $10^{-6}$ :

```
Itération 1: x = [-0.16666667  0.33333333  1.        ], Gradient Norm = 23.430749027719962
Itération 2: x = [-0.03333333  0.06666667  1.        ], Gradient Norm = 1.333333333333335
Itération 3: x = [-0.00196078  0.00392157  1.        ], Gradient Norm = 0.213333333333333
Itération 4: x = [-7.62951095e-06  1.52590219e-05  1.00000000e+00], Gradient Norm = 0.011810841983852407
Itération 5: x = [-1.16415322e-10  2.32830644e-10  1.00000000e+00], Gradient Norm = 4.5777764203336834e-05
Solution trouvée : [-1.16415322e-10  2.32830644e-10  1.00000000e+00] en 5 itérations
```

Avec tolérance $10^{-100}$ (plus stricte) :

```
Itération 1: x = [-0.16666667  0.33333333  1.        ], Gradient Norm = 23.430749027719962
Itération 2: x = [-0.03333333  0.06666667  1.        ], Gradient Norm = 1.333333333333335
Itération 3: x = [-0.00196078  0.00392157  1.        ], Gradient Norm = 0.213333333333333
Itération 4: x = [-7.62951095e-06  1.52590219e-05  1.00000000e+00], Gradient Norm = 0.011810841983852407
Itération 5: x = [-1.16415322e-10  2.32830644e-10  1.00000000e+00], Gradient Norm = 4.5777764203336834e-05
Itération 6: x = [-2.71050802e-20  5.42101086e-20  1.00000000e+00], Gradient Norm = 6.984919312767051e-10
Itération 7: x = [0. 0. 1.], Gradient Norm = 1.6263017077675663e-19
Solution trouvée : [0. 0. 1.] en 7 itérations
```

---

#### Gestion des problèmes numériques

- Si la matrice hessienne est singulière, on peut utiliser la pseudo‑inverse de Moore‑Penrose au lieu de l’inverse classique.
- On peut aussi ajouter une régularisation :  
  $H_{\text{mod}} = H + \lambda I$, où $I$ est la matrice identité et $\lambda$ un petit facteur (>0).
- Changer de méthode : passer à une méthode plus robuste comme le gradient conjugué ou la quasi‑Newton (BFGS).

---

#### Variantes de Newton

Il existe d’autres versions de l’algorithme de Newton : Newton‑Raphson, Newton tronquée, Gauss‑Newton, quasi‑Newton, etc.

---

#### Avantages et inconvénients de Newton

**Avantages :**
- Très performante lorsque la fonction est deux fois différentiable et que la hessienne est définie positive.
- Atteint des solutions précises en peu d’itérations.
- Convergence super‑linéaire voire quadratique : si le point de départ est proche de la solution, la convergence est très rapide.

**Inconvénients :**
- Nécessite le calcul du gradient et de la hessienne, coûteux pour des fonctions complexes ou de grande dimension.
- Un mauvais choix du point initial peut entraîner divergence ou convergence vers un minimum local.
- L’algorithme échoue si la matrice hessienne est singulière.
- L’inversion de la hessienne devient impraticable pour de très grandes dimensions.
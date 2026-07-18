# Exercice 1 : Calcul symbolique (Questions 1-5)

## Question 1
En utilisant SymPy, on souhaite déclarer une variable **symbolique** 'x' qui soit **réelle** (et non complexe). Complétez le code ci-dessous pour créer cette variable à l'aide de **symbols()** en précisant l'option appropriée.

```python
from sympy import symbols

# Déclarez x comme une variable symbolique réelle (real=True)
# Votre code ici
```

---

## Question 2
On souhaite résoudre l'équation ($x^2 - 5x + 6 = 0$) avec SymPy. Complétez le code ci-dessous en utilisant la fonction `solve()` pour trouver les racines de cette équation.

```python
from sympy import symbols, solve

x = symbols('x')
equation = x**2 - 5*x + 6

# Utilisez solve() pour trouver les racines de l'équation
# Votre code ici
```

---

## Question 3
Soit la fonction $( f(x, y) = x^2 + 3xy + y^2 )$. On souhaite calculer son gradient $( \nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right))$ avec SymPy. Complétez le code en utilisant la fonction `diff()`.

```python
from sympy import symbols, diff

x, y = symbols('x y', real=True)
f = x**2 + 3*x*y + y**2

# Calculez les dérivées partielles df/dx et df/dy
# Votre code ici
```

---

## Question 4
On exécute le code suivant avec SymPy :

```python
from sympy import symbols, expand
x = symbols('x')
expr = (x + 2)**2
result = expand(expr)
print(result)
```

Quelle est la sortie affichée par ce programme ?

A. `(x + 2)**2`  
B. `x**2 + 4*x + 4`  
C. `x**2 + 4`  
D. `2*x + 4`

Écrivez la lettre correspondant à la bonne réponse.

---

## Question 5
Soit $( f(x) = x^3 - 3x^2 + 2 )$. Les points critiques sont les valeurs de \( x \) pour lesquelles $( f'(x) = 0 )$. Complétez le code ci-dessous pour calculer la dérivée de \( f \) avec SymPy puis résoudre $( f'(x) = 0 )$ afin de trouver les points critiques.

```python
from sympy import symbols, diff, solve

x = symbols('x', real=True)
f = x**3 - 3*x**2 + 2

# Calculez la dérivée f' de f
# Résolvez f'(x) = 0 pour trouver les points critiques
# Votre code ici
```

---

# Exercice 2 : Algorithme de dichotomie (Questions 6-10)

## Question 6
On cherche une racine de \( f(x) = x^2 - 2 \) sur l'intervalle \([a, b] = [0, 2]\) par la méthode de dichotomie, en s'arrêtant lorsque la largeur de l'intervalle est inférieure à une tolérance `tol`. Complétez la condition de la boucle `while` ci-dessous.

```python
def f(x):
    return x**2 - 2

a, b = 0, 2
tol = 1e-6
m = (a + b) / 2

# Complétez la condition d'arrêt de la boucle
while ______:
    m = (a + b) / 2
    if f(a) * f(m) < 0:
        b = m
    else:
        a = m

print(m)
```

---

## Question 7
Dans l'algorithme de dichotomie, on calcule le milieu \( m = \frac{a+b}{2} \). Si \( f(a) \cdot f(m) < 0 \), quelle mise à jour de l'intervalle est correcte ?

A. \( a = m \)  
B. \( b = m \)  
C. Aucun changement (\( a \) et \( b \) restent identiques)  
D. \( a = b \) et \( b = a \)  

Écrivez la lettre de la bonne réponse.

---

## Question 8
Complétez la ligne de code permettant de calculer le milieu `m` de l'intervalle \([a, b]\) dans l'algorithme de dichotomie.

```python
a, b = 1, 3

# Calculez le milieu de l'intervalle [a, b]
m = ______

print(m)
```

---

## Question 9
Dans la méthode de dichotomie, à quoi sert le paramètre `tol` (tolérance) ?

A. À définir la valeur initiale de a  
B. À fixer la précision requise pour arrêter l'algorithme  
C. À choisir le nombre de variables du problème  
D. À normaliser la fonction f  

Écrivez la lettre de la bonne réponse.

---

## Question 10
La méthode de dichotomie nécessite que \( f(a) \) et \( f(b) \) soient de signes opposés (condition indispensable pour garantir l'existence d'une racine dans \([a, b]\)). Complétez la fonction ci-dessous qui vérifie cette condition avant de lancer l'algorithme.

```python
def f(x):
    return x**3 - x - 2

a, b = 1, 2

# Vérifiez que f(a) et f(b) sont de signes opposés
# Votre code ici
```

---

# Exercice 3 : Méthode de la Section Dorée (Questions 11-15)

## Question 11
La méthode de la section dorée utilise le nombre d'or \(\varphi = \frac{\sqrt{5} - 1}{2} \approx 0.618\). Complétez le code ci-dessous pour calculer `phi`.

```python
# Calculez phi = (sqrt(5) - 1) / 2
phi = ______

print(phi)
```

---

## Question 12
Dans la méthode de la section dorée, on définit deux points intérieurs \(x_1\) et \(x_2\) dans l'intervalle \([a, b]\) :
\[x_1 = a + \varphi(b - a) \quad \text{et} \quad x_2 = b - \varphi(b - a)\]

```python
a, b = 0, 10

# Calculez x1 et x2
# Votre code ici
```

---

## Question 13
Quel est le rôle du coefficient \(\varphi\) (nombre d'or) dans la méthode de la section dorée ?

A. Il détermine le nombre maximal d'itérations  
B. Il permet de placer les points intérieurs de façon à réutiliser une évaluation de \(f\) à chaque itération  
C. Il remplace le calcul du gradient  
D. Il sert uniquement à normaliser la fonction objectif  

Écrivez la lettre de la bonne réponse.

---

## Question 14
Dans la méthode de la section dorée pour **minimiser** \(f\), si \(f(x_1) < f(x_2)\), quelle mise à jour de l'intervalle est correcte ?

A. `a = x1`, `b` inchangé  
B. `b = x2`, `a` inchangé  
C. Aucun changement (`a` et `b` restent identiques)  
D. `a = x2` et `b = x1`

Écrivez la lettre de la bonne réponse.

---

## Question 15
Quel est l'objectif principal de la méthode de la section dorée ?

A. Résoudre un système d'équations linéaires  
B. Trouver le minimum (ou maximum) d'une fonction unimodale sur un intervalle, sans calculer sa dérivée  
C. Calculer la dérivée exacte d'une fonction  
D. Approcher l'inverse d'une matrice  

Écrivez la lettre de la bonne réponse.

---

# Exercice 4 : Gradient à Pas Fixe (Questions 16-20)

## Question 16
Soit \(f(x) = x^2 + 4x + 4\). Complétez la fonction `grad(x)` qui calcule le gradient \(f'(x) = 2x + 4\).

```python
def f(x):
    return x**2 + 4*x + 4

# Complétez la fonction `grad(x)` qui calcule f'(x)
def grad(x):
    # Votre code ici
    pass
```

---

## Question 17
Dans l'algorithme du gradient à pas fixe, la mise à jour de \(x\) est donnée par :

```python
x = x - alpha * grad
```

Que représente `alpha` dans cette formule ?

A. Le nombre d'itérations  
B. Le pas (taux d'apprentissage), fixé à l'avance et constant à chaque itération  
C. La valeur initiale de \(x\)  
D. La tolérance d'arrêt  

Écrivez la lettre de la bonne réponse.

---

## Question 18
Que se passe-t-il si le pas `alpha` est choisi **trop grand** dans l'algorithme du gradient à pas fixe ?

A. L'algorithme converge toujours plus vite  
B. L'algorithme peut osciller, voire diverger  
C. Le gradient devient automatiquement nul  
D. Cela n'a aucun effet sur la convergence  

Écrivez la lettre de la bonne réponse.

---

## Question 19
Complétez la condition d'arrêt de la boucle de l'algorithme du gradient à pas fixe : on arrête lorsque la valeur absolue du gradient est inférieure à une tolérance `tol`.

```python
grad_x = 0.01
tol = 1e-6

# Complétez la condition d'arrêt
# if ______:
#    print("Convergence atteinte")
```

---

## Question 20
```python
def f(x):
    return x**2

def grad(x):
    return 2*x

def gradient_pas_fixe(x0, alpha, n_iter):
    x = x0
    for i in range(n_iter):
        # Mettez à jour x selon x = x - alpha * grad(x)
        # Votre code ici
        pass
    return x
```

Complétez la mise à jour de \(x\) dans la boucle de l'algorithme du gradient à pas fixe.

---

# Exercice 5 : Gradient à Pas Optimal (Questions 21-25)

## Question 21
Dans la méthode du gradient à pas optimal, comment est choisi le pas \(\alpha_k\) à chaque itération ?

A. Il est fixé une fois pour toutes au début de l'algorithme  
B. Il est choisi aléatoirement à chaque itération  
C. Il est déterminé en minimisant \(f(x_k - \alpha \nabla f(x_k))\) par rapport à \(\alpha\)  
D. Il est toujours égal à 1  

Écrivez la lettre de la bonne réponse.

---

## Question 22
Pour rechercher le pas optimal, on définit une fonction coût \(\phi(\alpha) = f(x_k - \alpha \nabla f(x_k))\) pour \(f(x) = x^2\). Complétez la fonction `phi(alpha)` ci-dessous.

```python
def f(x):
    return x**2

def grad(x):
    return 2*x

x_k = 5
g_k = grad(x_k)

# Complétez phi(alpha) = f(x_k - alpha * g_k)
def phi(alpha):
    # Votre code ici
    pass
```

---

## Question 23
Dans l'algorithme du gradient (pas fixe ou optimal), quelle est la direction de descente utilisée à l'itération \(k\) ?

A. \(\nabla f(x_k)\)  
B. \(-\nabla f(x_k)\)  
C. \(x_k\)  
D. \(-x_k\)  

Écrivez la lettre de la bonne réponse.

---

## Question 24
On souhaite trouver le pas optimal `alpha` qui minimise la fonction `phi` définie précédemment, en utilisant `scipy.optimize.minimize_scalar`. Complétez la ligne de code ci-dessous.

```python
from scipy.optimize import minimize_scalar

def phi(alpha):
    return (5 - alpha * 10)**2

# Trouvez le alpha qui minimise phi
# Votre code ici
```

---

## Question 25
Par rapport au gradient à pas fixe, quel est le principal avantage du gradient à pas optimal ?

A. Il ne nécessite pas de calculer le gradient  
B. Il choisit à chaque itération le pas qui diminue le plus la fonction dans la direction de descente, ce qui peut accélérer la convergence  
C. Il fonctionne uniquement pour les fonctions linéaires  
D. Il évite complètement tout calcul supplémentaire  

Écrivez la lettre de la bonne réponse.

---

# Exercice 6 : Gradient Conjugué (Questions 26-30)

## Question 26
Dans la méthode du gradient conjugué, la direction de recherche \(d_k\) à l'itération \(k \geq 1\) est donnée par \(d_k = -\nabla f(x_k) + \beta_k d_{k-1}\). Que représente le terme \(\beta_k d_{k-1}\) ?

A. Une correction qui prend en compte la direction précédente pour éviter de répéter les mêmes déplacements  
B. Une réinitialisation complète de la direction  
C. Une approximation de la Hessienne  
D. Le pas de la méthode  

Écrivez la lettre de la bonne réponse.

---

## Question 27
La formule de Fletcher-Reeves pour calculer \(\beta_k\) est \(\beta_k = \frac{\|\nabla f(x_k)\|^2}{\|\nabla f(x_{k-1})\|^2}\). Complétez le code ci-dessous.

```python
import numpy as np

grad_k = np.array([1.0, 2.0])
grad_km1 = np.array([2.0, 3.0])

# Calculez beta selon la formule de Fletcher-Reeves
beta = ______

print(beta)
```

---

## Question 28
Complétez la ligne de code qui met à jour la direction de recherche \(d_k = -\nabla f(x_k) + \beta_k d_{k-1}\).

```python
import numpy as np

grad_k = np.array([1.0, -1.0])
beta = 0.2
d_prev = np.array([0.5, 0.5])

# Calculez la nouvelle direction d_k
d_k = ______

print(d_k)
```

---

## Question 29
À la première itération (\(k = 0\)) de la méthode du gradient conjugué, quelle direction utilise-t-on généralement ?

A. \(d_0 = \nabla f(x_0)\)  
B. \(d_0 = -\nabla f(x_0)\) (la direction de plus forte descente)  
C. \(d_0 = 0\)  
D. \(d_0\) est choisie aléatoirement  

Écrivez la lettre de la bonne réponse.

---

## Question 30
Complétez la boucle principale de l'algorithme du gradient conjugué qui met à jour \(x_k\) selon \(x_{k+1} = x_k + \alpha_k d_k\), pour un pas `alpha` fixé (version simplifiée).

```python
import numpy as np

x = np.array([0.0, 0.0])
d = np.array([1.0, 1.0])
alpha = 0.1

for i in range(5):
    # Mettez à jour x selon x = x + alpha * d
    # Votre code ici
    pass

print(x)
```

---

# Exercice 7 : Méthode de Newton (Questions 31-35)

## Question 31
Soit \( f(x, y) = x^2 + y^2 - xy \). Complétez le code ci-dessous pour calculer le gradient \( \nabla f \) à l'aide de SymPy.

```python
from sympy import symbols, diff

x, y = symbols('x y', real=True)
f = x**2 + y**2 - x*y

# Calculez le gradient de f (df/dx, df/dy)
# Votre code ici
```

---

## Question 32
Toujours pour \( f(x, y) = x^2 + y^2 - xy \), complétez le code ci-dessous pour construire la matrice Hessienne \( H \) (matrice des dérivées secondes) à l'aide de SymPy.

```python
from sympy import symbols, hessian

x, y = symbols('x y', real=True)
f = x**2 + y**2 - x*y

# Calculez la matrice Hessienne de f
# Votre code ici
```

---

## Question 33
La méthode de Newton pour l'optimisation utilise la mise à jour \( x_{k+1} = x_k - H^{-1} \nabla f(x_k) \), où \( H \) est la Hessienne évaluée en \( x_k \). Que représente \( H^{-1} \) dans cette formule ?

A. La transposée de la Hessienne  
B. L'inverse de la matrice Hessienne  
C. Le déterminant de la Hessienne  
D. Le carré de la Hessienne  

Écrivez la lettre de la bonne réponse.

---

## Question 34
En supposant que `H` est un tableau `numpy` représentant la Hessienne et `grad` le gradient (tous deux évalués en \( x_k \)), complétez la ligne de code qui calcule le pas de Newton \( H^{-1} \nabla f(x_k) \).

```python
import numpy as np

H = np.array([[2, -1], [-1, 2]], dtype=float)
grad = np.array([1.0, -1.0])

# Calculez le pas de Newton H^{-1} @ grad
pas = ______

print(pas)
```

---

## Question 35
Par rapport à la méthode du gradient simple, quel est l'apport principal de la Hessienne dans la méthode de Newton ?

A. Elle remplace complètement le calcul du gradient  
B. Elle apporte une information sur la courbure de la fonction, permettant d'ajuster à la fois la direction et l'amplitude du pas  
C. Elle sert uniquement à normaliser \( x_k \)  
D. Elle n'a aucun rôle, c'est juste une formalité  

Écrivez la lettre de la bonne réponse.

---

# Exercice 8 : Méthode BFGS (Questions 36-40)

## Question 36
BFGS est une méthode dite de **quasi-Newton**. Quel est le principe général de cette famille de méthodes ?

A. Calculer exactement la Hessienne à chaque itération  
B. Approcher progressivement l'inverse de la Hessienne à partir des informations de gradient successives, sans la calculer explicitement  
C. Ignorer complètement le gradient  
D. Utiliser uniquement la dérivée première sans aucune information de courbure  

Écrivez la lettre de la bonne réponse.

---

## Question 37
Dans BFGS, on maintient une matrice \( B_k \) (ou son inverse) qui approxime la Hessienne. Comment cette matrice évolue-t-elle au cours des itérations ?

A. Elle reste constante, égale à la matrice identité  
B. Elle est mise à jour à chaque itération à partir des différences de gradient et de position  
C. Elle est recalculée analytiquement à chaque itération avec SymPy  
D. Elle est remise à zéro à chaque itération  

Écrivez la lettre de la bonne réponse.

---

## Question 38
Dans BFGS, la direction de descente à l'itération \( k \) est \( d_k = -B_k^{-1} \nabla f(x_k) \), où \( B_k^{-1} \) est l'approximation courante de l'inverse de la Hessienne. Complétez le code ci-dessous.

```python
import numpy as np

B_inv = np.eye(2)
grad = np.array([2.0, -1.0])

# Calculez la direction de descente d = -B_inv @ grad
# Votre code ici
```

---

## Question 39
Complétez le code ci-dessous pour minimiser la fonction \( f(x) = (x_1 - 1)^2 + (x_2 - 2)^2 \) en utilisant la méthode BFGS de `scipy.optimize.minimize`.

```python
import numpy as np
from scipy.optimize import minimize

def f(x):
    return (x[0] - 1)**2 + (x[1] - 2)**2

x0 = np.array([0.0, 0.0])

# Utilisez minimize() avec method='BFGS'
# Votre code ici
```

---

## Question 40
On exécute :

```python
from scipy.optimize import minimize
result = minimize(f, x0, method='BFGS')
```

Que contient l'attribut `result.x` après exécution ?

A. La valeur de la fonction \( f \) au minimum trouvé  
B. Le point (variables) qui minimise approximativement \( f \)  
C. Le nombre d'itérations effectuées  
D. La matrice Hessienne finale  

Écrivez la lettre de la bonne réponse.

---

# Exercice 9 : Méthode DFP (Questions 41-45)

## Question 41
DFP (Davidon-Fletcher-Powell) est, comme BFGS, une méthode de quasi-Newton. Quelle est la principale différence entre BFGS et DFP ?

A. DFP n'utilise pas de gradient  
B. Elles utilisent toutes les deux le gradient mais diffèrent par la formule de mise à jour de la matrice d'approximation de l'inverse de la Hessienne  
C. DFP calcule exactement la Hessienne à chaque itération, contrairement à BFGS  
D. DFP est utilisée uniquement pour les fonctions linéaires  

Écrivez la lettre de la bonne réponse.

---

## Question 42
Dans la méthode DFP, on maintient directement une approximation de l'inverse de la Hessienne, notée \( H_k \). Quel est l'intérêt de travailler directement avec \( H_k \), plutôt qu'avec la Hessienne elle-même ?

A. Cela évite d'avoir à résoudre un système linéaire pour calculer la direction de descente  
B. Cela permet d'ignorer complètement le gradient  
C. Cela rend la méthode équivalente à la dichotomie  
D. Cela n'a aucun intérêt particulier  

Écrivez la lettre de la bonne réponse.

---

## Question 43
Comme pour BFGS, dans DFP la direction de descente est \( d_k = -H_k \nabla f(x_k) \), où \( H_k \) est l'approximation courante de l'inverse de la Hessienne. Complétez le code ci-dessous.

```python
import numpy as np

H_k = np.eye(2)
grad = np.array([1.5, -0.5])

# Calculez la direction de descente d = -H_k @ grad
# Votre code ici
```

---

## Question 44
Bien que `scipy.optimize.minimize` ne propose pas DFP directement, complétez le code ci-dessous pour minimiser \( f(x) = x_1^2 + 2x_2^2 \) avec la méthode "BFGS" (à titre de comparaison avec les méthodes de quasi-Newton comme DFP).

```python
import numpy as np
from scipy.optimize import minimize

def f(x):
    return x[0]**2 + 2*x[1]**2

x0 = np.array([1.0, 1.0])

# Minimisez f avec method='BFGS'
# Votre code ici
```

---

## Question 45
Quel est le point commun entre les méthodes BFGS et DFP présentées dans ce TP ?

A. Elles nécessitent de calculer explicitement la Hessienne exacte à chaque itération  
B. Ce sont toutes les deux des méthodes de quasi-Newton qui approchent l'inverse de la Hessienne à partir du gradient, sans calcul exact de la Hessienne  
C. Elles ne convergent que pour les fonctions linéaires  
D. Elles remplacent totalement le calcul du gradient par des différences finies  

Écrivez la lettre de la bonne réponse.
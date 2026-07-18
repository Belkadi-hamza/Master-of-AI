Voici la correction complète des 9 exercices, avec toutes les réponses et le code corrigé :

---

# Exercice 1 : Calcul symbolique (Questions 1-5)

## Question 1
```python
from sympy import symbols

# Déclarez x comme une variable symbolique réelle (real=True)
x = symbols('x', real=True)
```

---

## Question 2
```python
from sympy import symbols, solve

x = symbols('x')
equation = x**2 - 5*x + 6

# Utilisez solve() pour trouver les racines de l'équation
racines = solve(equation, x)
# racines = [2, 3]
```

---

## Question 3
```python
from sympy import symbols, diff

x, y = symbols('x y', real=True)
f = x**2 + 3*x*y + y**2

# Calculez les dérivées partielles df/dx et df/dy
df = [diff(f, x), diff(f, y)]
# df = [2*x + 3*y, 3*x + 2*y]
```

---

## Question 4
**Réponse : B** `x**2 + 4*x + 4`

```python
from sympy import symbols, expand
x = symbols('x')
expr = (x + 2)**2
result = expand(expr)
print(result)  # x**2 + 4*x + 4
```

---

## Question 5
```python
from sympy import symbols, diff, solve

x = symbols('x', real=True)
f = x**3 - 3*x**2 + 2

# Calculez la dérivée f' de f
# Résolvez f'(x) = 0 pour trouver les points critiques
df = diff(f, x)           # df = 3*x**2 - 6*x
pt_critiques = solve(df, x)  # pt_critiques = [0, 2]
```

---

# Exercice 2 : Algorithme de dichotomie (Questions 6-10)

## Question 6
```python
def f(x):
    return x**2 - 2

a, b = 0, 2
tol = 1e-6
m = (a + b) / 2

# Complétez la condition d'arrêt de la boucle
while (b - a) > tol:    # ou while abs(b - a) > tol:
    m = (a + b) / 2
    if f(a) * f(m) < 0:
        b = m
    else:
        a = m

print(m)  # environ 1.414213562373095
```

---

## Question 7
**Réponse : B** `b = m`

Si `f(a) * f(m) < 0`, la racine se trouve dans l'intervalle `[a, m]`, donc on remplace `b` par `m`.

---

## Question 8
```python
a, b = 1, 3

# Calculez le milieu de l'intervalle [a, b]
m = (a + b) / 2

print(m)  # 2.0
```

---

## Question 9
**Réponse : B** À fixer la précision requise pour arrêter l'algorithme

---

## Question 10
```python
def f(x):
    return x**3 - x - 2

a, b = 1, 2

# Vérifiez que f(a) et f(b) sont de signes opposés
if f(a) * f(b) < 0:
    print("Signes opposés, une racine existe")
else:
    print("Signes identiques, pas de garantie de racine")
```

---

# Exercice 3 : Méthode de la Section Dorée (Questions 11-15)

## Question 11
```python
from sympy import sqrt

# Calculez phi = (sqrt(5) - 1) / 2
phi = (sqrt(5) - 1) / 2
# ou avec math : phi = (5**0.5 - 1) / 2

print(phi)  # 0.6180339887498949
```

---

## Question 12
```python
a, b = 0, 10
phi = (5**0.5 - 1) / 2

# Calculez x1 et x2
x1 = a + phi * (b - a)  # 6.180339887498949
x2 = b - phi * (b - a)  # 3.819660112501051
```

---

## Question 13
**Réponse : B** Il permet de placer les points intérieurs de façon à réutiliser une évaluation de `f` à chaque itération

---

## Question 14
**Réponse : B** `b = x2`, `a` inchangé

Si `f(x1) < f(x2)`, le minimum se trouve dans `[a, x2]`, donc on remplace `b` par `x2`.

---

## Question 15
**Réponse : B** Trouver le minimum (ou maximum) d'une fonction unimodale sur un intervalle, sans calculer sa dérivée

---

# Exercice 4 : Gradient à Pas Fixe (Questions 16-20)

## Question 16
```python
def f(x):
    return x**2 + 4*x + 4

# Complétez la fonction `grad(x)` qui calcule f'(x)
def grad(x):
    return 2*x + 4
```

---

## Question 17
**Réponse : B** Le pas (taux d'apprentissage), fixé à l'avance et constant à chaque itération

---

## Question 18
**Réponse : B** L'algorithme peut osciller, voire diverger

---

## Question 19
```python
grad_x = 0.01
tol = 1e-6

# Complétez la condition d'arrêt
if abs(grad_x) < tol:
    print("Convergence atteinte")
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
        x = x - alpha * grad(x)
    return x
```

---

# Exercice 5 : Gradient à Pas Optimal (Questions 21-25)

## Question 21
**Réponse : C** Il est déterminé en minimisant `f(x_k - α ∇f(x_k))` par rapport à `α`

---

## Question 22
```python
def f(x):
    return x**2

def grad(x):
    return 2*x

x_k = 5
g_k = grad(x_k)  # g_k = 10

# Complétez phi(alpha) = f(x_k - alpha * g_k)
def phi(alpha):
    return f(x_k - alpha * g_k)
# ou explicitement : return (5 - 10*alpha)**2
```

---

## Question 23
**Réponse : B** `-∇f(x_k)` (la direction de plus forte descente)

---

## Question 24
```python
from scipy.optimize import minimize_scalar

def phi(alpha):
    return (5 - alpha * 10)**2

# Trouvez le alpha qui minimise phi
resultat = minimize_scalar(phi)
alpha_optimal = resultat.x
# ou directement : resultat = minimize_scalar(phi, method='brent')
```

---

## Question 25
**Réponse : B** Il choisit à chaque itération le pas qui diminue le plus la fonction dans la direction de descente, ce qui peut accélérer la convergence

---

# Exercice 6 : Gradient Conjugué (Questions 26-30)

## Question 26
**Réponse : A** Une correction qui prend en compte la direction précédente pour éviter de répéter les mêmes déplacements

---

## Question 27
```python
import numpy as np

grad_k = np.array([1.0, 2.0])
grad_km1 = np.array([2.0, 3.0])

# Calculez beta selon la formule de Fletcher-Reeves
beta = np.linalg.norm(grad_k)**2 / np.linalg.norm(grad_km1)**2
# beta = 5 / 13 = 0.38461538461538464

print(beta)
```

---

## Question 28
```python
import numpy as np

grad_k = np.array([1.0, -1.0])
beta = 0.2
d_prev = np.array([0.5, 0.5])

# Calculez la nouvelle direction d_k
d_k = -grad_k + beta * d_prev
# d_k = [-1.0 + 0.1, 1.0 + 0.1] = [-0.9, 1.1]

print(d_k)
```

---

## Question 29
**Réponse : B** `d0 = -∇f(x0)` (la direction de plus forte descente)

---

## Question 30
```python
import numpy as np

x = np.array([0.0, 0.0])
d = np.array([1.0, 1.0])
alpha = 0.1

for i in range(5):
    # Mettez à jour x selon x = x + alpha * d
    x = x + alpha * d

print(x)  # [0.5, 0.5]
```

---

# Exercice 7 : Méthode de Newton (Questions 31-35)

## Question 31
```python
from sympy import symbols, diff

x, y = symbols('x y', real=True)
f = x**2 + y**2 - x*y

# Calculez le gradient de f (df/dx, df/dy)
gradient = [diff(f, x), diff(f, y)]
# gradient = [2*x - y, 2*y - x]
```

---

## Question 32
```python
from sympy import symbols, hessian

x, y = symbols('x y', real=True)
f = x**2 + y**2 - x*y

# Calculez la matrice Hessienne de f
H = hessian(f, (x, y))
# H = [[2, -1], [-1, 2]]
```

---

## Question 33
**Réponse : B** L'inverse de la matrice Hessienne

---

## Question 34
```python
import numpy as np

H = np.array([[2, -1], [-1, 2]], dtype=float)
grad = np.array([1.0, -1.0])

# Calculez le pas de Newton H^{-1} @ grad
pas = np.linalg.inv(H) @ grad
# ou : pas = np.linalg.solve(H, grad)

print(pas)  # [0.33333333, -0.33333333]
```

---

## Question 35
**Réponse : B** Elle apporte une information sur la courbure de la fonction, permettant d'ajuster à la fois la direction et l'amplitude du pas

---

# Exercice 8 : Méthode BFGS (Questions 36-40)

## Question 36
**Réponse : B** Approcher progressivement l'inverse de la Hessienne à partir des informations de gradient successives, sans la calculer explicitement

---

## Question 37
**Réponse : B** Elle est mise à jour à chaque itération à partir des différences de gradient et de position

---

## Question 38
```python
import numpy as np

B_inv = np.eye(2)
grad = np.array([2.0, -1.0])

# Calculez la direction de descente d = -B_inv @ grad
d = -B_inv @ grad
# d = [-2.0, 1.0]

print(d)
```

---

## Question 39
```python
import numpy as np
from scipy.optimize import minimize

def f(x):
    return (x[0] - 1)**2 + (x[1] - 2)**2

x0 = np.array([0.0, 0.0])

# Utilisez minimize() avec method='BFGS'
result = minimize(f, x0, method='BFGS')
print(result.x)  # [1.0, 2.0]
```

---

## Question 40
**Réponse : B** Le point (variables) qui minimise approximativement `f`

---

# Exercice 9 : Méthode DFP (Questions 41-45)

## Question 41
**Réponse : B** Elles utilisent toutes les deux le gradient mais diffèrent par la formule de mise à jour de la matrice d'approximation de l'inverse de la Hessienne

---

## Question 42
**Réponse : A** Cela évite d'avoir à résoudre un système linéaire pour calculer la direction de descente

---

## Question 43
```python
import numpy as np

H_k = np.eye(2)
grad = np.array([1.5, -0.5])

# Calculez la direction de descente d = -H_k @ grad
d = -H_k @ grad
# d = [-1.5, 0.5]

print(d)
```

---

## Question 44
```python
import numpy as np
from scipy.optimize import minimize

def f(x):
    return x[0]**2 + 2*x[1]**2

x0 = np.array([1.0, 1.0])

# Minimisez f avec method='BFGS'
result = minimize(f, x0, method='BFGS')
print(result.x)  # [0.0, 0.0]
```

---

## Question 45
**Réponse : B** Ce sont toutes les deux des méthodes de quasi-Newton qui approchent l'inverse de la Hessienne à partir du gradient, sans calcul exact de la Hessienne
## Importation
```python
import sympy as sp
from sympy import symbols,solve,...
from sympy import *
```
## Symbols

Declarer un nouvelle variable

```Python
x = sp.symbols('x')
x, y = sp.symbols('x y')
```
Parametre
```python
sp.symbols('x', real=True) # Variables réelles
sp.symbols('x', complex=True) # Variables complexes (Par default)
sp.symbols('x', positive=True) 
sp.symbols('x', nonpositive=True)
sp.symbols('x', negative=True)
sp.symbols('x', nonnegative=True)
sp.symbols('x', integer=True)
sp.symbols('x', rational=True)
sp.symbols('x', zero=True)
```
## Expression Mathematique

```Python
sin = sp.sin(x)
cos = sp.cos(x)
tan = sp.tan(x)
exp = sp.exp(x)
log = sp.log(x)
sqrt = sp.sqrt(x)
pi = sp.pi
```
## Developement de fonction (expand)
```python
f = (x-3)**2
sp.expand(f) # => x**2 - 6*x + 9
```
**Paramètres de `expand()` :**

|Option|Description|
|---|---|
|`trig=True`|Développe les fonctions trigonométriques|
|`log=True`|Développe les logarithmes|
|`power_expand=True`|Développe les puissances|
|`multi=True`|Développe les expressions multi-niveaux|
|`mul=True`|Développe les produits|
|`poly=True`|Force le développement polynomial|
## Factorisation (factor)
```Python
f = x**2 - 6*x + 9
sp.fact(f) # => (x-3)**2
```
## Simplification (simplify)
```Python
f = (x**2 - 1)/(x - 1)
sp.simplify(f) # => (x+1)
```
## Substitution (subs)
Remplace le symbol par un nembre
```Python
f = x**2 - 6*x + 9
f.subs(x,2) # => 2**2 - 6*2 + 9 =  1

g = x**2 + y**2
f.subs(x,2).subs(y,3) # 13
f.subs({x:2, y:3}) # 13
```
## Résolution (solve)
```Python
f = x**2 - 4
g = x**2 + y**2
sp.solve(f, x) # [-2, 2]
sp.solve(g,[x,y]) # [(-I*y, y), (I*y, y)] I=sqrt(-1)
```
### Systèmes
```Python
system = [
    x + y - 5,
    2*x - y - 1
]

sp.solve(system, (x,y)) # {x: 2, y: 3}
```
## Dérivation (diff)
```Python
f = x**3
# 1D
sp.diff(f, x)  # 3*x**2
# 2D
sp.diff(f, x, 2) # 6*x
#2 variable
g = x**2 + y**2 + 3*x*y
sp.diff(g, x, y) # 3
```
## Matrice Hessienne (hessian)
```Python
f = x**2 + 3*x*y + y**2
sp.hessian(f, (x, y))
# Matrix([[2, 3],[3, 2]])
```
### Développement de Taylor (series)
```Python
f = sp.sin(x)
# order 1 (<2)
sp.series(f, x, 0, 2) # x + O(x**2)
# order 2 (<3)
sp.series(f, x, 0, 3) # x + O(x**3)
# order 5 (<6)
sp.series(f, x, 0, 6) # x - x**3/6 + x**5/120 + O(x**6)
```
## Integrale (integrate)
```Python
f = x**2
sp.integrate(f,x) # (x**3)/3
```
## Conversion en fonctions numériques
```Python
f_num = sp.lambdify((x, y), f, modules='numpy')
```
## Valeurs propres (eigenvals)
```Python
A = sp.Matrix([[2, 1], [1, 2]])
A.eigenvals() # {3: 1, 1: 1}
```
## Vecteur propres (eigenvect)
```Python
A = sp.Matrix([[2, 1], [1, 2]])
A.eigenvects()
# [
#     (1,1,[Matrix([[-1],[1]])]),
#     (3,1,[Matrix([[1],[1]])])
# ]
```
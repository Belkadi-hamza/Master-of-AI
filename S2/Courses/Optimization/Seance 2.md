# 📘 Résumé – Séance 2 : Rappels Mathématiques pour l'Optimisation

> **Objectif :** Comprendre les outils mathématiques fondamentaux utilisés en optimisation, Machine Learning et Deep Learning.

---

# Chapitre 1 : Fonctions et Dérivées

## Définition

La dérivée mesure **la vitesse de variation** d'une fonction en un point. Elle indique la pente de la tangente à la courbe.

$$f'(a) = \lim_{h \rightarrow 0} \frac{f(a+h) - f(a)}{h}$$

### Interprétation

- $f'(x) > 0$ → Fonction croissante 📈  
- $f'(x) < 0$ → Fonction décroissante 📉  
- $f'(x) = 0$ → Point critique (minimum, maximum ou point selle)

### Exemple

Soit $f(x) = x^2$.  
Sa dérivée est :

$$f'(x) = 2x$$

Au point $x = 2$ :

$$f'(2) = 4$$

La pente de la tangente vaut **4**.

---

## Règles de dérivation

| Fonction       | Dérivée                      |
|----------------|------------------------------|
| $c$            | $0$                          |
| $x^n$          | $n x^{n-1}$                  |
| $f + g$        | $f' + g'$                    |
| $f \cdot g$    | $f'g + fg'$                  |
| $\dfrac{f}{g}$ | $\dfrac{gf' - fg'}{g^2}$     |

---

## Points critiques

Un point critique est obtenu lorsque :

$$f'(x) = 0$$

ou lorsque la dérivée n'existe pas.

Ces points peuvent être :

- ✅ Minimum local  
- ✅ Maximum local  
- ✅ Point selle  

---

# Chapitre 2 : Dérivées Partielles

## Pourquoi ?

Les fonctions en IA dépendent souvent de plusieurs variables.

Exemple :

$$f(x, y) = x^2 + y^2$$

Chaque variable influence la fonction.

La dérivée partielle mesure l'effet d'une seule variable en considérant les autres constantes.

---

## Dérivées partielles

$$\frac{\partial f}{\partial x} = 2x$$

$$\frac{\partial f}{\partial y} = 2y$$

### Exemple

Soit :

$$f(x, y) = 3x^2 + xy + y^2$$

Alors :

$$\frac{\partial f}{\partial x} = 6x + y$$

$$\frac{\partial f}{\partial y} = x + 2y$$

---

# Chapitre 3 : Gradient

## Définition

Le gradient est le vecteur contenant toutes les dérivées partielles.
## **Question Répondu**

> **Dans quelle direction faut-il aller pour monter le plus vite ?**

$$\nabla f = \begin{bmatrix} \dfrac{\partial f}{\partial x} \\ \dfrac{\partial f}{\partial y} \end{bmatrix}$$

### Exemple

Soit :

$$f(x, y) = x^2 + y^2$$

Alors :

$$\nabla f = \begin{bmatrix} 2x \\ 2y \end{bmatrix}$$

Au point $(1, 2)$ :

$$\nabla f(1, 2) = \begin{bmatrix} 2 \\ 4 \end{bmatrix}$$

---

## Interprétation

Le gradient indique :

➡️ **la direction de montée la plus rapide**

Son opposé :

$$-\nabla f$$

indique :

➡️ **la direction de descente la plus rapide**

C'est le principe du **Gradient Descent** utilisé pour entraîner les modèles de Machine Learning.

---

# Chapitre 4 : Développement de Taylor

## Objectif

Approcher une fonction compliquée par un polynôme plus simple autour d'un point.

---

## Taylor d'ordre 1

$$f(x) \approx f(a) + f'(a)(x - a)$$

Approximation **linéaire**.

### Exemple

Soit $f(x) = x^2$.  
Autour de $a = 1$ :

$$f(x) \approx 2x - 1$$

---

## Taylor d'ordre 2

$$f(x) \approx f(a) + f'(a)(x - a) + \frac{f''(a)}{2}(x - a)^2$$

Approximation **quadratique**, plus précise.

---

## Importance en optimisation

Utilisé dans :

- Newton-Raphson  
- Quasi-Newton  
- BFGS  
- Trust Region  

---

# Chapitre 5 : Matrices

## Définition

Une matrice est un tableau de nombres.

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$$

---

## Types importants

### Matrice identité

$$I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$

Équivalent du nombre **1**.

---

### Transposée

On échange les lignes et les colonnes.

$$A^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$$

---

### Matrice symétrique

$$A = A^T$$

Très utilisée avec la matrice Hessienne.

---

# Chapitre 6 : Valeurs Propres et Vecteurs Propres

## Définition

$$A v = \lambda v$$

où :

- $A$ : matrice  
- $v$ : vecteur propre  
- $\lambda$ : valeur propre  

---

## Interprétation

Après transformation par la matrice :

- la direction du vecteur ne change pas ;  
- seule sa longueur change.

Si $\lambda = 5$ :

➡️ le vecteur est multiplié par **5**.

Si $\lambda = -2$ :

➡️ le vecteur est inversé et multiplié par **2**.

---

## Calcul des valeurs propres

On résout :

$$\det(A - \lambda I) = 0$$

Puis on détermine les vecteurs propres avec :

$$(A - \lambda I)v = 0$$

---

# Chapitre 7 : Matrice Hessienne (Complément)

> **Cette notion est indispensable en optimisation, même si elle est peu développée dans le support.**

## Définition

La Hessienne est la matrice des dérivées secondes.
## **Question Répondu**

> **La pente est-elle en train d'augmenter ou de diminuer ?**


Pour $f(x, y)$ :

$$H(f) = \begin{bmatrix} \dfrac{\partial^2 f}{\partial x^2} & \dfrac{\partial^2 f}{\partial x \partial y} \\ \dfrac{\partial^2 f}{\partial y \partial x} & \dfrac{\partial^2 f}{\partial y^2} \end{bmatrix}$$

---

## Exemple

Soit :

$$f(x, y) = 3x^2 + xy + y^2$$

Gradient :

$$\nabla f = \begin{bmatrix} 6x + y \\ x + 2y \end{bmatrix}$$

Hessienne :

$$H = \begin{bmatrix} 6 & 1 \\ 1 & 2 \end{bmatrix}$$

---

## Interprétation

La Hessienne mesure **la courbure** de la fonction.

Les valeurs propres de la Hessienne permettent de déterminer la nature d'un point critique :

| Valeurs propres                     | Nature du point  |
|-------------------------------------|------------------|
| Toutes positives                    | ✅ Minimum local |
| Toutes négatives                    | ✅ Maximum local |
| Signes différents                   | ⚠️ Point selle   |

---

# Relations entre les notions

```
Fonctions
     │
     ▼
Dérivée
     │
     ▼
Dérivées partielles
     │
     ▼
Gradient
     │
     ▼
Point critique
     │
     ▼
Hessienne
     │
     ▼
Valeurs propres
     │
     ▼
Nature du point critique
```

# Exercices Corrigés – Séance 2 : Rappels Mathématiques pour l'Optimisation

---

# Exercice 1 : Calcul d'une dérivée

## Énoncé

Soit :

$$f(x) = 3x^2 + 5x - 2$$

Calculer :

1. $f'(x)$  
2. $f'(2)$

---

## Solution

### Étape 1 : Dériver chaque terme

$$(3x^2)' = 6x$$

$$(5x)' = 5$$

$$(-2)' = 0$$

Donc :

$$\boxed{f'(x) = 6x + 5}$$

---

### Étape 2 : Calculer en $x = 2$

$$f'(2) = 6(2) + 5$$

$$= 12 + 5$$

$$= 17$$

### Réponse

$$\boxed{f'(x) = 6x + 5}$$

$$\boxed{f'(2) = 17}$$

---

# Exercice 2 : Étude du sens de variation

## Énoncé

Étudier les variations de :

$$f(x) = x^2 - 4x + 3$$

---

## Solution

### Dérivée

$$f'(x) = 2x - 4$$

Cherchons les points critiques :

$$2x - 4 = 0$$

$$x = 2$$

---

### Étude du signe

Pour $x < 2$ :

$$f'(x) < 0 \quad \Rightarrow \quad \text{Fonction décroissante}$$

Pour $x > 2$ :

$$f'(x) > 0 \quad \Rightarrow \quad \text{Fonction croissante}$$

---

### Conclusion

Le point $x = 2$ est un **minimum local**.

---

# Exercice 3 : Dérivées partielles

## Énoncé

Soit :

$$f(x, y) = 4x^2 + xy + 3y^2$$

Calculer :

$$\frac{\partial f}{\partial x} \quad \text{et} \quad \frac{\partial f}{\partial y}$$

---

## Solution

### Par rapport à $x$

$$(4x^2)' = 8x$$

$$(xy)' = y$$

$$(3y^2)' = 0$$

Donc :

$$\boxed{\frac{\partial f}{\partial x} = 8x + y}$$

---

### Par rapport à $y$

$$4x^2 \rightarrow 0$$

$$xy \rightarrow x$$

$$3y^2 \rightarrow 6y$$

Donc :

$$\boxed{\frac{\partial f}{\partial y} = x + 6y}$$

---

# Exercice 4 : Gradient

## Énoncé

Pour :

$$f(x, y) = x^2 + 2y^2$$

Calculer le gradient au point $(2, 1)$.

---

## Solution

### Dérivées partielles

$$\frac{\partial f}{\partial x} = 2x$$

$$\frac{\partial f}{\partial y} = 4y$$

Le gradient est :

$$\nabla f = \begin{bmatrix} 2x \\ 4y \end{bmatrix}$$

Au point $(2, 1)$ :

$$\nabla f(2, 1) = \begin{bmatrix} 4 \\ 4 \end{bmatrix}$$

---

### Réponse

$$\boxed{\nabla f(2, 1) = \begin{bmatrix} 4 \\ 4 \end{bmatrix}}$$

---

# Exercice 5 : Développement de Taylor (Ordre 1)

## Énoncé

Approximer :

$$f(x) = x^2$$

autour de $a = 3$.

---

## Solution

$$f(3) = 9$$

$$f'(x) = 2x$$

$$f'(3) = 6$$

Taylor ordre 1 :

$$f(x) \approx 9 + 6(x - 3)$$

Développons :

$$= 9 + 6x - 18$$

$$\boxed{f(x) \approx 6x - 9}$$

---

# Exercice 6 : Hessienne

## Énoncé

Calculer la matrice Hessienne de :

$$f(x, y) = 3x^2 + xy + y^2$$

---

## Solution

### Gradient

$$\frac{\partial f}{\partial x} = 6x + y$$

$$\frac{\partial f}{\partial y} = x + 2y$$

---

### Dérivées secondes

$$\frac{\partial^2 f}{\partial x^2} = 6$$

$$\frac{\partial^2 f}{\partial x \partial y} = 1$$

$$\frac{\partial^2 f}{\partial y \partial x} = 1$$

$$\frac{\partial^2 f}{\partial y^2} = 2$$

---

### Hessienne

$$\boxed{H = \begin{bmatrix} 6 & 1 \\ 1 & 2 \end{bmatrix}}$$

---

# Exercice 7 : Hessienne à trois variables

## Énoncé

Calculer la Hessienne de :

$$f(x, y, z) = x^2 + y^2 + z^2$$

---

## Solution

Gradient :

$$\nabla f = \begin{bmatrix} 2x \\ 2y \\ 2z \end{bmatrix}$$

Hessienne :

$$\boxed{H = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}}$$

---

# Exercice 8 : Valeurs propres

## Énoncé

Soit :

$$A = \begin{bmatrix} 3 & 0 \\ 0 & 2 \end{bmatrix}$$

Trouver les valeurs propres.

---

## Solution

On résout :

$$\det(A - \lambda I) = 0$$

$$\begin{vmatrix} 3 - \lambda & 0 \\ 0 & 2 - \lambda \end{vmatrix} = 0$$

$$(3 - \lambda)(2 - \lambda) = 0$$

Donc :

$$\boxed{\lambda_1 = 3}$$

$$\boxed{\lambda_2 = 2}$$

---

# Exercice 9 : Valeurs et vecteurs propres

## Énoncé

Soit :

$$A = \begin{bmatrix} 2 & 0 \\ 0 & 5 \end{bmatrix}$$

Trouver les valeurs propres et les vecteurs propres.

---

## Solution

### Valeurs propres

$$(2 - \lambda)(5 - \lambda) = 0$$

$$\boxed{\lambda_1 = 2}$$

$$\boxed{\lambda_2 = 5}$$

---

### Vecteur propre associé à $\lambda = 2$

$$(A - 2I)v = 0$$

$$\begin{bmatrix} 0 & 0 \\ 0 & 3 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Donc $y = 0$.  
On choisit $x = 1$.

Vecteur propre :

$$\boxed{\begin{bmatrix} 1 \\ 0 \end{bmatrix}}$$

---

### Vecteur propre associé à $\lambda = 5$

$$(A - 5I)v = 0$$

$$\begin{bmatrix} -3 & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Donc $x = 0$.  
On choisit $y = 1$.

Vecteur propre :

$$\boxed{\begin{bmatrix} 0 \\ 1 \end{bmatrix}}$$

---

# Exercice 10 : Nature d'un point critique avec la Hessienne

## Énoncé

Étudier la nature du point critique de :

$$f(x, y) = x^2 + y^2$$

---

## Solution

### Gradient

$$\nabla f = \begin{bmatrix} 2x \\ 2y \end{bmatrix}$$

Point critique :

$$2x = 0, \quad 2y = 0$$

$$(x, y) = (0, 0)$$

---

### Hessienne

$$H = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$$

Les valeurs propres sont $2$ et $2$.

Toutes positives.

Donc :

$$\boxed{(0, 0) \text{ est un minimum local (et même global).}}$$

---

# Exercice 11 : Nature d'un point critique (Point selle)

## Énoncé

Étudier :

$$f(x, y) = x^2 - y^2$$

---

## Solution

Gradient :

$$\nabla f = \begin{bmatrix} 2x \\ -2y \end{bmatrix}$$

Point critique : $(0, 0)$

Hessienne :

$$H = \begin{bmatrix} 2 & 0 \\ 0 & -2 \end{bmatrix}$$

Les valeurs propres sont $2$ et $-2$.

Une positive et une négative.

Donc :

$$\boxed{(0, 0) \text{ est un point selle.}}$$

---
### Nature d'un point critique

| Hessienne                                          | Nature                |
|----------------------------------------------------|-----------------------|
| Valeurs propres $> 0$                              | ✅ Minimum            |
| Valeurs propres $< 0$                              | ✅ Maximum            |
| Valeurs propres de signes différents               | ⚠️ Point selle        |
| Une valeur propre $= 0$                            | Cas indéterminé       |
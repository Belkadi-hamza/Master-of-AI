# Exercice 1 — Méthode de dichotomie (3 pts)

On considère la fonction

$$f(x)=x^3-2x-5.$$

On souhaite déterminer une racine de $f(x)=0$ sur l'intervalle

$$[2,3].$$

On prendra

$$\varepsilon=0.1.$$

### Questions

1. Vérifier que la méthode de dichotomie est applicable.
2. Calculer les deux premières itérations.
3. Donner le nouvel intervalle à chaque étape.
4. Déterminer une approximation de la racine.
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

## Réponse finale

| Itération | Intervalle | Milieu |
| --------- | ---------- | ------ |
| 1         | $[2,3]$    | $2.5$  |
| 2         | $[2,2.5]$  | $2.25$ |

Approximation :

$$
x^*\approx2.125.
$$

---

# Exercice 2 — Méthode du nombre d'or (4 pts)

On considère

$$f(x)=x^2-4x+5$$

sur

$$[0,5].$$

On prendra

$$\varepsilon=0.5.$$

### Questions

1. Calculer $x_1$ et $x_2$.
2. Calculer $f(x_1)$ et $f(x_2)$.
3. Réduire l'intervalle.
4. Effectuer une deuxième itération.
5. Donner une estimation du minimum.

---

# Exercice 3 — Descente de gradient à pas fixe (5 pts)

On considère

$$f(x,y)=x^2+y^2+2x+4y.$$

On prend

$$(x_0,y_0)=(0,0)$$

et

$$\alpha=0.25.$$

### Questions

1. Calculer le gradient.
2. Calculer la Hessienne.
3. Effectuer la première itération.
4. Effectuer la deuxième itération.
5. La méthode converge-t-elle ?
6. Déterminer la nature du point obtenu.

---

# Exercice 4 — Gradient à pas optimal (5 pts)

Soit

$$f(x,y)=x^2+3y^2.$$

Point initial

$$(2,1).$$

### Questions

1. Calculer le gradient.
2. Donner la direction de descente.
3. Écrire $x(\alpha)=x_k-\alpha\nabla f$.
4. Calculer $\phi(\alpha)=f(x(\alpha))$.
5. Déterminer le pas optimal $\alpha^*$.
6. Calculer le nouveau point.

---

# Exercice 5 — Méthode de Newton (5 pts)

On considère

$$f(x,y)=3x^2+y^2-2xy-6x.$$

avec

$$(x_0,y_0)=(0,0).$$

### Questions

1. Calculer le gradient.
2. Calculer la Hessienne.
3. Effectuer une itération de Newton.
4. Effectuer une deuxième itération.
5. Conclure.

---

# Exercice 6 — Optimisation sous contrainte (4 pts)

On veut minimiser

$$f(x,y)=x^2+y^2$$

sous la contrainte

$$x+y=6.$$

### Questions

1. Identifier la fonction objectif.
2. Identifier la contrainte.
3. Ce problème est-il avec ou sans contrainte ?
4. Quelle méthode est adaptée ?
5. Le domaine admissible est-il une droite ou un disque ?

---

# Exercice 7 — Multiplicateurs de Lagrange (6 pts)

Maximiser

$$f(x,y)=2xy$$

sous

$$x^2+y^2=18.$$

### Questions

1. Construire le Lagrangien.
2. Calculer les dérivées.
3. Résoudre le système.
4. Donner les points critiques.
5. Déterminer le maximum.
6. Déterminer le minimum.

---

# Exercice 8 — Méthode de pénalité extérieure (5 pts)

On considère

$$f(x)=x^2$$

avec

$$x\ge2.$$

On prendra

$$\rho=10.$$

### Questions

1. Écrire $g(x)$.
2. Construire la fonction pénalisée.
3. Calculer le minimum de la fonction pénalisée.
4. Comparer avec la solution réelle.

---

# Exercice 9 — Barrière logarithmique (5 pts)

On considère

$$f(x)=(x-4)^2$$

avec

$$x>1.$$

On prend

$$\lambda=0.5.$$

### Questions

1. Construire la fonction barrière.
2. Calculer sa dérivée.
3. Déterminer le minimum.
4. Expliquer pourquoi on doit rester dans $x>1$.

---

# Exercice 10 — Programmation linéaire (5 pts)

Une entreprise fabrique deux produits $A$ et $B$.

Chaque unité de :

- $A$ rapporte **30 DH**
- $B$ rapporte **20 DH**

Contraintes :

$$
\begin{cases}
2A+B\le100 \\
A+2B\le80 \\
A\ge0,\;B\ge0
\end{cases}
$$

### Questions

1. Définir les variables.
2. Écrire la fonction objectif.
3. Écrire les contraintes.
4. Donner le domaine admissible.

---

# Exercice 11 — Méthode graphique (5 pts)

Résoudre graphiquement

$$\max Z=4x+3y$$

sous

$$
\begin{cases}
x+y\le8 \\
2x+y\le10 \\
x\ge0 \\
y\ge0
\end{cases}
$$

### Questions

1. Tracer les contraintes.
2. Déterminer les sommets.
3. Calculer $Z$ en chaque sommet.
4. Donner la solution optimale.

---

# Exercice 12 — Méthode du simplexe (8 pts)

Résoudre

$$\max Z=5x+4y$$

sous

$$
\begin{cases}
x+y\le6 \\
2x+y\le8 \\
x,y\ge0
\end{cases}
$$

### Questions

1. Mettre sous forme standard.
2. Ajouter les variables d'écart.
3. Construire le tableau initial.
4. Choisir la variable entrante.
5. Choisir la variable sortante.
6. Effectuer le pivot.
7. Continuer jusqu'à l'optimum.
8. Donner la solution optimale.

---

# Exercice 13 — Exercice complet (10 pts)

On considère

$$\max Z=3x+2y$$

sous

$$
\begin{cases}
x+y\le6 \\
2x+y\le8 \\
x\ge0 \\
y\ge0
\end{cases}
$$

### Questions

1. Écrire le problème sous forme standard.
2. Construire le premier tableau du simplexe.
3. Réaliser toutes les itérations.
4. Donner les variables de base à chaque étape.
5. Donner la valeur optimale de $Z$.
6. Vérifier graphiquement le résultat obtenu.

---


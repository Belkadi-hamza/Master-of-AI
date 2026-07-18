
# Correction — Exercice 2 : Méthode de Newton pour une fonction quadratique

On considère la fonction

$$
f(x,y)=2x^2+y^2-2xy-4x+6y.
$$

Le point initial est

$$
(x_0,y_0)=(0,0).
$$

---

## 1. Que représente $\(alpha\) $dans cet algorithme de Newton ?

Dans la méthode de Newton classique, le déplacement est donné directement par

$$
x_{k+1}=x_k-H^{-1}(x_k)\nabla f(x_k).
$$

Il n'y a donc **pas de pas d'apprentissage** comme dans la méthode du gradient.

Si un paramètre

$$
\alpha
$$

est utilisé, il représente le **pas de déplacement** :

$$
x_{k+1}=x_k-\alpha H^{-1}(x_k)\nabla f(x_k).
$$

Dans la méthode de Newton classique,

$$
\boxed{\alpha=1.}
$$

---

## 2. Calcul du gradient

La fonction est

$$
f(x,y)=2x^2+y^2-2xy-4x+6y.
$$

### Dérivée par rapport à \(x\)

$$
\frac{\partial f}{\partial x}
=4x-2y-4.
$$

### Dérivée par rapport à \(y\)

$$
\frac{\partial f}{\partial y}
=2y-2x+6.
$$

Ainsi,

$$
\boxed{
\nabla f(x,y)=
\begin{pmatrix}
4x-2y-4\\
2y-2x+6
\end{pmatrix}
}
$$

---

## 3. Calcul de la matrice Hessienne

Les dérivées secondes sont

$$
\frac{\partial^2 f}{\partial x^2}=4,
$$

$$
\frac{\partial^2 f}{\partial y^2}=2,
$$

$$
\frac{\partial^2 f}{\partial x\partial y}
=
\frac{\partial^2 f}{\partial y\partial x}
=-2.
$$

Donc

$$
\boxed{
H=
\begin{pmatrix}
4&-2\\
-2&2
\end{pmatrix}
}
$$

Cette matrice est constante.

Calcul du déterminant :

$$
|H|
=4\times2-(-2)(-2)
=8-4
=4>0.
$$

La Hessienne est inversible.

Son inverse est

$$
H^{-1}
=
\frac1{4}
\begin{pmatrix}
2&2\\
2&4
\end{pmatrix}
=
\begin{pmatrix}
0.5&0.5\\
0.5&1
\end{pmatrix}.
$$

---

## 4. Première itération

Le point initial est

$$
(x_0,y_0)=(0,0).
$$

### Gradient au point initial

$$
\nabla f(0,0)
=
\begin{pmatrix}
-4\\
6
\end{pmatrix}.
$$

Calcul du déplacement de Newton

$$
p_0
=
-H^{-1}\nabla f(0,0).
$$

On calcule

$$
H^{-1}\nabla f
=
\begin{pmatrix}
0.5&0.5\\
0.5&1
\end{pmatrix}
\begin{pmatrix}
-4\\
6
\end{pmatrix}
=
\begin{pmatrix}
1\\
4
\end{pmatrix}.
$$

Ainsi,

$$
p_0=
\begin{pmatrix}
-1\\
-4
\end{pmatrix}.
$$

La mise à jour est

$$
(x_1,y_1)
=
(x_0,y_0)+p_0.
$$

Donc

$$
\boxed{
(x_1,y_1)=(-1,-4)
}
$$

---

## Vérification

Calcul du gradient en

$$
(-1,-4)
$$

$$
\nabla f(-1,-4)
=
\begin{pmatrix}
4(-1)-2(-4)-4\\
2(-4)-2(-1)+6
\end{pmatrix}
=
\begin{pmatrix}
0\\
0
\end{pmatrix}.
$$

Le gradient est nul.

Le minimum est déjà atteint.

---

## 5. Deuxième itération

Comme

$$
\nabla f(x_1,y_1)=0,
$$

on obtient

$$
p_1=-H^{-1}(0)=0.
$$

Ainsi,

$$
(x_2,y_2)
=
(x_1,y_1).
$$

Donc

$$
\boxed{
(x_2,y_2)=(-1,-4)
}
$$

---

## 6. Analyse et conclusion

La Hessienne est

$$
H=
\begin{pmatrix}
4&-2\\
-2&2
\end{pmatrix}.
$$

Ses mineurs principaux sont

$$
4>0,
$$

et

$$
\det(H)=4>0.
$$

La Hessienne est donc **définie positive**.

La fonction est **strictement convexe**.

Par conséquent, tout point où

$$
\nabla f=0
$$

est un minimum global.

La méthode de Newton converge en une seule itération, ce qui est normal pour une fonction quadratique.

---

# Réponses finales

### 1.

$$
\boxed{\alpha=1}
$$

(dans la méthode de Newton classique)

### 2.

$$
\boxed{
\nabla f(x,y)=
\begin{pmatrix}
4x-2y-4\\
2y-2x+6
\end{pmatrix}
}
$$

### 3.

$$
\boxed{
H=
\begin{pmatrix}
4&-2\\
-2&2
\end{pmatrix}
}
$$

### 4.

$$
\boxed{(x_1,y_1)=(-1,-4)}
$$

### 5.

$$
\boxed{(x_2,y_2)=(-1,-4)}
$$

### 6.

La méthode converge en une seule itération vers

$$
\boxed{(-1,-4)}
$$

qui est le **minimum global** de la fonction, car la Hessienne est définie positive.
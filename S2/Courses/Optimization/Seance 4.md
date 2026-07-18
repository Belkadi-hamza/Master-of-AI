# Algorithmes d’optimisation

**Pr. Faouzia Benabbou** (faouzia.benabbou@univh2c.ma)  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2024-2025

---

## Plan du Module: Algorithmes d’optimisation

- Introduction
- Rappels mathématiques
- Algorithmes d’Optimisation Sans Contraintes
- Algorithmes d’Optimisation avec Contraintes
- Programmation Linéaire et non Linéaire
- Optimisation combinatoire et globale
- Méthodes heuristiques et métäheuristique

---

# Les algorithmes d’optimisation

## Classes des algorithmes

| Catégorie | Sous‑catégories |
|-----------|------------------|
| **Méthodes Analytiques** | – Sous contrainte |
| **Méthodes numériques** | – Sans contraintes |
| | • Méthode sans gradient |
| | • Méthode de descente de gradient : |
| |   - Méthode de gradient à pas fixe |
| |   - Méthode de gradient conjugué |
| |   - Méthodes du gradient quasi‑Newton |
| |   - Méthode de Newton |
| | • Méthodes générales de résolution de PCE, PCI |
| | • Programmation linéaire et non linéaire |
| | • Optimisation combinatoire et globale |
| | • Méthodes heuristiques et métaheuristiques |
| | • Algorithmes multi‑objectifs |

---

## L’optimisation sans contrainte

L’optimisation sans contrainte est un domaine de l’optimisation où l’on cherche à minimiser ou maximiser une fonction sans aucune restriction sur les valeurs que peuvent prendre les variables de décision.

**Problème :** Soit une fonction objectif  
$$
f : K \subset \mathbb{R}^n \to \mathbb{R}, \quad n \ge 1, \quad x = (x_1,\dots,x_n) \mapsto f(x)
$$  
On cherche soit le minimum ou le maximum de $f$ tel que :
$$
f(a^*) = \min_{x \in K} f(x) \quad \text{ou} \quad f(a^*) = \max_{x \in K} f(x).
$$

### Approches de résolution

Il existe deux grandes approches :

- **Méthodes analytiques** : reposent sur le calcul différentiel pour identifier les points critiques et analyser leur nature.
- **Méthodes numériques** : algorithmes itératifs utilisés lorsque les solutions analytiques sont difficiles ou impossibles à obtenir.

---

## Les méthodes analytiques

- On calcule les dérivées partielles et on résout le système $\nabla f(x_0) = 0$.
- On utilise la Hessienne $\nabla^2 f(x_0)$ pour déterminer la nature des points critiques (minimum, maximum, point selle).
- Adaptée aux problèmes simples et aux fonctions régulières.
- Avantages : solutions exactes et analyse théorique.

---

## Les méthodes numériques

Résoudre $\nabla f(x^*) = 0$ n’est pas toujours possible dans les cas suivants :

- Équations non linéaires ou trop complexes.
- Données discrètes ou bruitées.
- Grand nombre de variables.
- Fonctions non différentiables.

On cherche alors une **valeur approchée** de $x^*$ à l’aide d’algorithmes itératifs qui construisent une suite $(x_n)_{n \in \mathbb{N}}$ convergeant vers $x^*$.

### Définition d’un algorithme itératif

Un algorithme itératif est défini par une application vectorielle $\Phi : \mathbb{R}^n \to \mathbb{R}^n$ qui génère une suite :
$$
x_{n+1} = \Phi(x_n), \quad n \in \mathbb{N},
$$
à partir d’un point initial $x_0$. On espère que $(x_n)$ converge vers l’optimum cherché.

---
### Convergence et vitesse

La **vitesse de convergence** d’un algorithme itératif est la vitesse de convergence de la suite $(x_n)$ vers $x^*$.

**Définition :** Soit $(x_n)$ une suite telle que  
$$
\lim_{n \to +\infty} x_n = x^*.
$$  
On dit que la convergence est **d’ordre $p$** s’il existe $C > 0$ telle que
$$
\lim_{n \to \infty} \frac{\|x_{n+1} - x^*\|}{\|x_n - x^*\|^p} = C.
$$

- **Convergence linéaire** : $p=1$ et $C \in ]0,1[$ ; on a  
  $$
  \|x_{n+1} - x^*\| \le C \|x_n - x^*\|.
  $$
  Plus $C$ est proche de 0, plus la convergence est rapide.
- **Convergence superlinéaire** : $p=1$ et $C=0$ (ou plus généralement $\frac{\|x_{n+1} - x^*\|}{\|x_n - x^*\|} \to 0$).
- **Convergence quadratique** : $p=2$ ; il existe $C>0$ tel que  
  $$
  \|x_{n+1} - x^*\| \le C \|x_n - x^*\|^2.
  $$

| Type de convergence | Vitesse |
|---------------------|---------|
| Linéaire            | Lente   |
| Superlinéaire       | Rapide  |
| Quadratique         | Très rapide |

**Convergence globale / locale :**

- **Globale** : l’algorithme converge quel que soit le point de départ $x_0$.
- **Locale** : l’algorithme ne converge que si $x_0$ est suffisamment proche de $x^*$.

---

### Complexité et critères d’arrêt

- La **complexité calculatoire** mesure le coût des opérations nécessaires pour une itération ; le coût global est le produit du coût par itération et du nombre d’itérations.
- **Critères d’arrêt** (basés sur une précision $\varepsilon$, un nombre maximal d’itérations, etc.) :

| Type de critère | Condition | Avantage | Inconvénient |
|-----------------|-----------|----------|--------------|
| **Critère principal** | $\|\nabla f(x_n)\| < \varepsilon$ | Bonne indication de la convergence | Peut s’arrêter sur un point selle |
| **Critère secondaire** | $\|f(x_{n+1}) - f(x_n)\| < \eta$ | Permet d’arrêter quand l’amélioration est négligeable | Peut être trompeur sur un plateau |
| **Critère secondaire** | $\|x_{n+1} - x_n\| < \alpha$ | Évite les itérations inutiles | Peut arrêter prématurément si $\alpha$ trop petit |
| **Sécurité** | $n \ge \text{max\_iter}$ | Toujours garanti de s’arrêter | Peut être trop strict |
| **Critère mixte** | $\|\nabla f(x_n)\| < \varepsilon$ **et** $\|f(x_{n+1}) - f(x_n)\| < \eta$ | Plus robuste | Nécessite de régler deux seuils |

---

## Méthodes d’optimisation directe (sans gradient)

### Méthodes univariées : Méthode de dichotomie (ou bissection)

Cette méthode itérative résout une équation non linéaire $f(x)=0$ en s’appuyant sur le théorème des valeurs intermédiaires.

**Principe :** Soit $f : [a,b] \to \mathbb{R}$ continue telle que $f(a)f(b) < 0$. Alors il existe $\alpha \in ]a,b[$ tel que $f(\alpha)=0$.

**Algorithme 1 – Dichotomie**

1. Initialiser $n=0$, $a_n = a$, $b_n = b$, $\varepsilon = 10^{-6}$ (tolérance), $\text{max\_iter}$.
2. Répéter :
   a) $x_n = \dfrac{a_n + b_n}{2}$
   b) Si $f(x_n) = 0$, alors $x_n$ est la solution.
   c) Si $f(a_n) f(x_n) > 0$, alors $a_{n+1} = x_n$, $b_{n+1} = b_n$.
   d) Sinon ($f(a_n) f(x_n) < 0$), $a_{n+1} = a_n$, $b_{n+1} = x_n$.
   e) $n \leftarrow n+1$.
3. Jusqu’à ce que $|b_n - a_n| < \varepsilon$ ou $n \ge \text{max\_iter}$.

**Exemple :**  
$f(x) = x^3 - 4x + 1$ sur $[1,2]$.  
Avec $\varepsilon = 10^{-6}$, la méthode converge après 21 itérations vers $x^* \approx 1.8608059883$, et $f(x^*) \approx 3.9 \times 10^{-6}$.

**Limites :**
- Convergence lente.
- Nécessite un intervalle initial contenant une racine ($f(a)f(b)<0$).
- Ne fonctionne que pour les fonctions continues.
- Ne garantit pas un optimum global.

---

### Méthode du nombre d’or (section dorée)

On cherche le minimum (ou maximum) d’une fonction d’une seule variable sur un intervalle donné.  
Elle utilise le nombre d’or $\varphi = \dfrac{1+\sqrt{5}}{2} \approx 1.618$ et son inverse $\tau = 1/\varphi$.

**Algorithme 2 – Nombre d’or**

1. Initialiser $a_0 = a$, $b_0 = b$, $\varepsilon$ (tolérance), $\tau = \dfrac{\sqrt{5}-1}{2}$.
2. Répéter :
   a) $x_1 = b_n - \tau (b_n - a_n)$  
      $x_2 = a_n + \tau (b_n - a_n)$
   b) Évaluer $f(x_1)$ et $f(x_2)$.
   c) Si $f(x_1) < f(x_2)$ :  
      le minimum se trouve dans $[a_n, x_2]$. Mettre à jour : $a_{n+1} = a_n$, $b_{n+1} = x_2$.
   d) Sinon :  
      le minimum se trouve dans $[x_1, b_n]$. Mettre à jour : $a_{n+1} = x_1$, $b_{n+1} = b_n$.
3. Jusqu’à ce que $b_n - a_n < \varepsilon$.
4. Le minimum approximatif est le point médian $(a_n + b_n)/2$.

**Exemple :**  
$f(x) = x^3 - 4x - 2$, $\varepsilon = 10^{-6}$, intervalle $[-3,0]$.  
La méthode converge en 31 itérations vers $x^* \approx 1.15470036$, $f(x^*) \approx -5.07920144$.

---

## Méthodes d’optimisation de descente de gradient

Ces algorithmes itératifs minimisent des fonctions différentiables.  
**Analogies :** Vous êtes perdu dans la montagne, vous suivez la pente la plus forte pour atteindre la vallée.

### Principe général

Soit $f : \mathbb{R}^n \to \mathbb{R}$ différentiable. L’algorithme de descente de gradient génère une suite :
$$
x_{k+1} = x_k + \alpha_k \, d_k,
$$
où $d_k = -\nabla f(x_k)$ est la **direction de descente** (opposée au gradient) et $\alpha_k > 0$ est le **pas** (ou taux d’apprentissage).

**Cas univarié :**  
$$
x_{k+1} = x_k - \alpha_k \, f'(x_k).
$$

### Choix du pas

- Un pas trop grand peut faire osciller l’algorithme autour du minimum.
- Un pas trop petit ralentit la convergence.
- Il n’y a pas de formule magique, il faut tâtonner. Dans les réseaux de neurones, on parle de *learning rate* $\eta$.

**Remarque :** L’algorithme peut converger vers un minimum local (piège des problèmes non convexes).

### Variantes de la descente de gradient

- Gradient à pas fixe
- Gradient à pas optimal
- Gradient conjugué
- Méthode de Newton
- Méthodes quasi‑Newton

---

### Méthode de gradient à pas fixe

Le pas est constant : $\alpha_k = \alpha$ pour tout $k$.

**Algorithme 3 – Descente de gradient à pas fixe**

1. Initialisation :
   - $x_0 \in \mathbb{R}^n$
   - $\alpha > 0$ (pas fixe)
   - $\varepsilon > 0$ (tolérance sur le gradient)
   - $\text{max\_iter}$
2. Répéter :
   a) Calculer la direction de descente : $d_k = -\nabla f(x_k)$.
   b) Mettre à jour : $x_{k+1} = x_k + \alpha \, d_k$.
   c) $k \leftarrow k+1$.
3. Jusqu’à ce que $\|\nabla f(x_k)\| < \varepsilon$ ou $k \ge \text{max\_iter}$.

**Exemple 1 :**  
$f(x) = 4x^2 + e^x$, $\nabla f(x) = 8x + e^x$.  
Avec $\alpha = 0.01$, $x_0 = -3$, 20 itérations.

**Exemple 2 :**  
Même fonction avec $\alpha = 0.4$, $\varepsilon = 10^{-6}$, 100 itérations.

**Exercice :**  
Trouver le minimum de  
$$
f(x,y) = \cos(2x) \sqrt{y^2 + 1}.
$$

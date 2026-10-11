# Algorithmes d'Optimisation

## Professeur
**Pr. Faouzia Benabbou**
Département de Mathématiques et Informatique
Master DSBD et IA
Année académique : 2025-2026
Email : faouzia.benabbou@univh2c.ma

---

## Plan du Module

### 1. Introduction et Rappels Mathématiques
### 2. Algorithmes d'Optimisation Sans Contraintes
### 3. Algorithmes d'Optimisation Avec Contraintes
### 4. Programmation Linéaire et Non Linéaire
### 5. Optimisation Combinatoire et Globale
### 6. Méthodes Heuristiques et Métaheuristiques

---

## Chapitre : Les Algorithmes d'Optimisation

### Classification des Algorithmes d'Optimisation

Les méthodes d'optimisation se répartissent en deux grandes catégories :

#### 1. Méthodes Analytiques
- **Sous contrainte**
- **Sans contraintes**

#### 2. Méthodes Numériques

**Sans contraintes :**
- Méthode sans gradient
- Méthode de descente de gradient :
  - Méthode de gradient à pas fixe et optimal
  - Méthode de gradient conjugué
  - Méthode de Newton
  - Méthodes du gradient quasi-Newton

**Avec contraintes :**
- Méthodes générales de résolutions de PCE, PCI
- Programmation linéaire et non linéaire
- Optimisation combinatoire et globale
- Méthodes heuristiques et métaheuristiques

---

## Méthodes de Pénalisation

### Principes Généraux

Les méthodes de pénalité classiques sont une famille d'algorithmes d'optimisation conçus pour résoudre des problèmes d'optimisation contrainte en les transformant en une séquence de problèmes d'optimisation sans contrainte.

L'idée fondamentale est d'ajouter un terme de "pénalité" à la fonction objective originale pour chaque contrainte violée. L'ampleur de cette pénalité augmente à mesure que la violation de la contrainte devient plus importante.

### Formulation Mathématique

Soit le problème **(P)** :

$$\min f(x), \quad f \text{ une fonction objective. } x \in \mathbb{R}^n \quad g(x) \leq 0 \quad h(x) = 0$$

Où :
- $h : \mathbb{R}^n \rightarrow \mathbb{R}^p$ est de classe $C^1$, la fonction de contrainte d'égalité
- $g : \mathbb{R}^n \rightarrow \mathbb{R}^m$ est de classe $C^1$, la fonction de contrainte d'inégalité
- $x \in \mathbb{R}^n$ est le vecteur des variables de décision

Les méthodes de pénalisation transforment le problème contraint en une suite de problèmes sans contraintes, en ajoutant à la fonction objectif un terme qui pénalise la violation des contraintes :

$$(P, \rho) \quad \min_{x \in \mathbb{R}^n} \varphi(x, \rho, \mu)$$

Où :
$$\varphi(x, \rho, \mu) = f(x) + \rho PI(x) + \mu PE(x)$$

- $\rho, \mu > 0$ : paramètres de pénalisation pris assez grand
- $PI$ et $PE$ : fonctions de pénalisation d'inégalité et égalité

### Types de Méthodes de Pénalité

Il existe principalement deux types de méthodes de pénalité classiques :
1. Méthode des pénalités extérieures
2. Méthode des pénalités intérieures (barrière)

---

## 1. Méthodes des Pénalités Extérieures

### Définition

Dans la pénalité extérieure, on autorise les solutions non admissibles (qui ne respectent pas les contraintes), mais on les pénalise. On commence à l'extérieur du domaine admissible, et la solution est poussée de manière itérative vers l'intérieur en augmentant la pénalité.

**Définition :** Une pénalisation est dite **exacte** si toute solution du problème (P) initial est solution du problème pénalisé (P,ρ), et **inexacte** dans le cas contraire.

### Fonctions de Pénalité pour les Contraintes d'Inégalité

Les formes courantes de fonctions de pénalité utilisées pour les contraintes d'inégalité $PI(g(x) \leq 0)$ sont :

- **Fonction de pénalité quadratique :**
  $$PI_i(x) = \max(0, g_i(x))^2$$

- **Fonction de pénalité de Heaviside (non différentiable) :**
  $$PI_j(x) = \begin{cases} 0 & \text{si } g_j(x) \leq 0 \\ 1 & \text{si } g_j(x) > 0 \end{cases}$$

### Fonctions de Pénalité pour les Contraintes d'Égalité

Les formes courantes de fonctions de pénalité pour les contraintes d'égalité $PE(h_j(x)=0)$ sont :

- **Fonction de pénalité quadratique :**
  $$PE_j(x) = h_j(x)^2$$

- **Fonction de pénalité de valeur absolue :**
  $$PE_j(x) = |h_j(x)|$$

La fonction de pénalité totale est généralement la somme des pénalités pour chaque contrainte.

### Algorithme de Pénalisation Classique (Externe)

**Algorithme 1 : Pénalisation classique (externe)**

1. **Initialisation :**
   - $x_0$ : point initial, pas forcément réalisable
   - $\varepsilon$ : tolérance de convergence
   - $k = 0$
   - `max_iter` : nombre maximal d'itérations
   - $f, PI, PE : \mathbb{R}^n \rightarrow \mathbb{R}$ : fonctions objectif et de pénalité
   - $\rho_0, \mu_0$ : paramètres de pénalité initiaux
   - $\beta$ : facteur d'augmentation de la pénalité ($\beta > 1$)

2. **Répéter :**
   - a) Résoudre le problème sans contrainte (descente de gradient, Newton, quasi-Newton, BFGS, etc.) :
     $$x_{k+1} = \min_x \left[ f(x) + \rho_k \sum_{j=1}^{m} PI_j(x) + \mu_k \sum_{i=1}^{p} PE_i(x) \right]$$
   
   - b) Mise à jour : $x_{k+1}$ est la solution approchée de a)
   
   - c) Augmenter la pénalité :
     $$\rho_{k+1} = \beta \rho_k, \quad \mu_{k+1} = \beta \mu_k \quad \text{où } \beta > 1$$
   
   - d) $k = k + 1$

3. **Jusqu'à** $|| f(x_{k+1}) - f(x_k)|| < \varepsilon$ ou `max_iter` atteint

4. **Retourner** $x_k$

### Exemple 1 : Pénalité Extérieure

**Problème :**
$$\min_{x \in \mathbb{R}^n} f(x,y) = x^2 + (y - 2)^2$$
$$\text{Sous les contraintes :}$$
$$h(x,y) = x - y = 0$$
$$g(x,y) = x + y - 1 \leq 0$$

**Fonction pénalisée (avec pénalisation quadratique pour g et h) :**

$$\varphi(x, \rho, \mu) = f(x) + \rho \max(0, g(x))^2 + \mu h(x)^2$$

**Code Python :**

```python
# Fonction de pénalisation
def fonction_penalisee(xk, rho, mu, contraintes_inegalite, contraintes_egalite):
    x, y = xk
    penalite_inegalite = sum(rho * max(0, g(x, y))**2 for g in contraintes_inegalite)
    penalite_egalite = sum(mu * h(x, y)**2 for h in contraintes_egalite)
    return f(x, y) + penalite_inegalite + penalite_egalite

# Méthode de pénalisation externe classique
def penalisation_externe_classique(fonction_objective, contraintes_inegalite, 
                                   contraintes_egalite, x0, y0, rho0, mu0, 
                                   beta, tolerance, options=None):
    xk = np.array([x0, y0])
    rho = rho0
    mu = mu0
    fk_prev = np.inf
    trajectory = [np.array([x0, y0])]
    total_iterations = 0

    while True:
        # Résoudre le sous-problème de minimisation
        res = minimize(fonction_penalisee, xk, 
                      args=(rho, mu, contraintes_inegalite, contraintes_egalite),
                      method="BFGS", options=options)
        xk_new = res.x
        fk_new = fonction_objective(*xk_new)
        total_iterations += res.nit
        trajectory.append(xk_new)

        if np.abs(fk_new - fk_prev) < tolerance:
            break

        xk = xk_new
        rho += beta
        mu += beta
        fk_prev = fk_new

    return xk_new, total_iterations, np.array(trajectory)

# Paramètres
x0, y0 = 0.0, 0.0
rho_initial = 1.0
mu_initial = 10.0
beta = 5.0
tolerance_convergence = 1e-6
```

### Exemple 2 : Pénalité Extérieure avec Conditions Initiales Modifiées

**Problème :**
$$\min_{x \in \mathbb{R}^n} f(x,y) = x^2 + (y - 2)^2$$
$$\text{Sous les contraintes :}$$
$$h(x,y) = x - y = 0$$
$$g(x,y) = x + y - 1 \leq 0$$

**Paramètres d'exécution :**
```python
x0, y0 = 0.0, 2.0
rho_initial = 1.0
mu_initial = 1.0
beta = 5.0
tolerance_convergence = 1e-6
```

### Exemple 3 : Pénalité Extérieure pour Problème Complexe

**Problème :**
$$\min_{x \in \mathbb{R}^n} f(x, y) = (x^2 + y - 11)^2 + (x + y^2 - 7)^2$$
$$\text{Sous les contraintes :}$$
$$h(x, y) = y - x - 1 = 0$$
$$g(x, y) = (x^2 + y^2 - 20) \leq 0$$

**Paramètres d'exécution :**
```python
x0, y0 = 0.0, 0.0
rho_initial = 1.0
mu_initial = 1.0
beta = 5.0
tolerance_convergence = 1e-10
```

### Avantages et Inconvénients de la Pénalité Extérieure

#### Avantages :
- La méthode transforme un problème contraint en une suite de problèmes non contraints, permettant d'utiliser des algorithmes classiques d'optimisation (comme le gradient ou quasi-Newton)
- Peut être appliquée à une grande variété de problèmes avec contraintes mixtes

#### Inconvénients :
- Pour respecter exactement les contraintes, il faut que les paramètres de pénalisation ($\rho_k$ ou $\mu_k$) deviennent très grands, ce qui peut rendre la fonction objective mal conditionnée, pouvant ralentir ou bloquer la convergence
- La solution du problème pénalisé ne satisfait pas toujours exactement les contraintes du problème original — la réalisabilité n'est atteinte qu'à la limite
- Le choix des paramètres de pénalisation influence fortement la performance et la précision

---

## 2. Méthodes des Pénalités Intérieures (Barrière)

### Principes Généraux

Les méthodes barrière sont des méthodes d'optimisation sous contraintes qui transforment un problème avec contraintes d'inégalité en une suite de problèmes sans contraintes, mais en forçant les itérés à rester à l'intérieur de l'ensemble admissible.

Dans certaines applications, les itérés doivent rester dans l'ensemble admissible :
$$S = \{ x \in \mathbb{R}^n \mid g_i(x) \leq 0, i=1,\ldots,m \}$$

Ceci est nécessaire notamment lorsque la fonction objectif $f$ n'est définie que sur $S$, ou qu'un point extérieur à $S$ n'a aucune signification physique. La violation d'une contrainte est interdite, même temporairement.

Le principe fondamental des méthodes de pénalité intérieure est de créer une "barrière" qui empêche la solution de quitter l'intérieur de la région admissible définie par les contraintes d'inégalité.

### Formulation du Problème

Le problème traité est sous forme :
$$\begin{cases} \min_{x \in \mathbb{R}^n} f(x), \text{ } f \text{ une fonction objective} \\ g(x) \leq 0 \end{cases}$$

Où $g : \mathbb{R}^n \rightarrow \mathbb{R}^m$ est la fonction de contrainte d'inégalité, différentiable.

Soit $T = \{ x \mid g_i(x) < 0, \forall i \}$, l'optimisation est effectuée uniquement dans cette région.

### Fonctions Barrière

Le problème devient après introduction d'une fonction barrière :
$$(P_\rho) \quad \min_{x \in \mathbb{R}^n} f(x) + \rho B(x), \text{ où } \rho \text{ tend vers } 0$$

Les formes courantes de $B$ qui permettent de respecter la contrainte lorsque $g(x) < 0$ sont :

- **Fonction barrière inverse :**
  $$B(x) = -\sum_{i=1}^{m} \frac{1}{g_i(x)}$$

- **Fonction barrière logarithmique :**
  $$B(x) = -\sum_{i=1}^{m} \ln(-g_i(x))$$
  
  C'est la **Méthode de la barrière logarithmique**

### Algorithme de Pénalisation Classique (Interne)

**Algorithme 2 : Pénalisation classique (interne)**

1. **Initialisation :**
   - $x_0$ : point initial strictement admissible
   - $\varepsilon$ : tolérance de convergence
   - $k = 0$
   - `max_iter` : nombre maximal d'itérations
   - $f, B_j : \mathbb{R}^n \rightarrow \mathbb{R}$ : fonctions objectif et barrière
   - $\rho_0$ : paramètre de pénalité initial

2. **Répéter :**
   - a) Résoudre le problème sans contrainte :
     $$\min_{\mathbf{x}} \left[ f(x) + \rho_k \sum_{j=1}^{m} B_j(x) \right]$$
   
   - b) Mise à jour : $x_{k+1}$ est la solution approchée de a)
   
   - c) Diminuer la pénalité :
     $$\rho_{k+1} = \beta \rho_k, \text{ où } 0 < \beta < 1$$
   
   - d) $k = k + 1$

3. **Jusqu'à** $|| f(x_{k+1}) - f(x_k)|| < \varepsilon$ ou `max_iter`

4. **Retourner** $x_k$

### Exemple 1 : Pénalité Intérieure

**Problème :**
$$\begin{cases} \min_{x \in \mathbb{R}^n} f(x) = x^2+1 \\ g(x) = x-2 \leq 0 \end{cases}$$

**Transformation du problème :**

On va transformer ce problème contraint en une séquence de problèmes non contraints en ajoutant un terme de barrière pour la violation de la contrainte : $B(x) = -\log(2 - x)$.

Le problème non contraint pénalisé devient :
$$\min_{x \in \mathbb{R}^n} \varphi(x, \rho)$$
Où :
$$\varphi(x, \rho) = f(x) + \rho B(x) = f(x) - \rho \log(2 - x)$$
$$\varphi(x, \rho) = x^2 + 1 - \rho \log(2 - x)$$

**Code Python :**

```python
# Fonction barrière : f(x) - mu * log(2 - x)
def f_barriere(x, mu):
    if 2 - x <= 0:
        return np.inf  # Invalide hors domaine
    return f(x) - mu * np.log(2 - x)

# Méthode de barrière avec critère d'arrêt basé sur la variation de f
def methode_penalisation_interne(x0, mu0=1.0, beta=0.5, epsilon=1e-10, max_iter=50):
    xk = x0
    mu = mu0
    trajectory = [xk]
    f_prec = f(xk)

    for k in range(max_iter):
        res = minimize(lambda x: f_penalisation(x, mu), [xk], method='BFGS')
        xk = res.x[0]
        trajectory.append(xk)
        f_courant = f(xk)
        critere = abs(f_courant - f_prec)
        
        if critere < epsilon:
            break

        f_prec = f_courant
        mu *= beta
    
    return xk, trajectory
```

### Exemple 2 : Application Supplémentaire

Le cours présente un deuxième exemple d'application de la méthode de barrière, illustrant sa mise en œuvre pour des problèmes d'optimisation sous contraintes d'inégalité.

### Avantages et Limites de la Pénalité Intérieure

#### Avantages :
- Contrairement aux méthodes de pénalisation externe, les itérés restent toujours à l'intérieur du domaine admissible (satisfont $g_i(x) < 0$)
- Utile pour les problèmes où les contraintes ne doivent jamais être violées
- Contrairement aux pénalisations externes (qui deviennent mal conditionnées pour des pénalités élevées), la barrière logarithmique reste mieux conditionnée

#### Limites :
- Nécessite un point initial strictement admissible. Trouver un tel point peut être difficile, voire impossible pour certains problèmes complexes
- Inadaptée aux contraintes d'égalité (il faut utiliser des solutions hybrides comme le Lagrangien augmenté + barrière)
- Sensibilité au choix de $\rho$ :
  - Si $\rho$ décroît trop vite → risque de divergence
  - Si $\rho$ décroît trop lentement → convergence lente
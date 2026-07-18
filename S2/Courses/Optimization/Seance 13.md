# Algorithmes d’optimisation

**Pr. Faouzia Benabbou**  
Département de mathématiques et Informatique  
Master Data Science & Big Data 2025-2026  
<faouzia.benabbou@univh2c.ma>

---

## Plan du module

- Introduction – Rappels mathématiques
- Algorithmes d’Optimisation Sans Contraintes
- Algorithmes d’Optimisation avec Contraintes
- Programmation Linéaire
- Méthodes d’Optimisation Combinatoire Exactes
- Méthodes d’Optimisation Combinatoire Approchées

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
      - Méthode de Newton
      - Méthodes du gradient quasi‑Newton
    - Méthodes générales de résolutions de PCE, PCI
    - Programmation linéaire
    - Optimisation combinatoire
      - Méthodes Exactes
      - Méthodes approchées
    - Algorithmes multi‑objectifs

---

## Méthodes approchées

- À la différence des méthodes exactes, les méthodes approchées permettent de trouver une bonne solution proche de l’optimal en un temps de calcul raisonnable.
- Elles sont utilisées quand les méthodes exactes sont trop coûteuses (problèmes NP‑difficiles, grandes instances, etc.).
- Elles ne garantissent pas l’optimalité, mais elles permettent d’obtenir des solutions réalisables et souvent proches de l’optimum.
- Les méthodes approchées se divisent en deux grandes familles :
  - Les **heuristiques**
  - Les **métahuristiques**

---

### Heuristiques

#### Définition

- Un algorithme heuristique est une méthode qui explore l’ensemble des solutions réalisables d’un problème d’optimisation, en exploitant la structure du problème afin d’identifier rapidement de bonnes solutions réalisables.
- Les méthodes heuristiques sont conçues pour résoudre des problèmes spécifiques en fournissant une solution acceptable dans un temps réduit, sans garantie d’optimalité.
- Elles peuvent être classées en deux grandes catégories :

  - **Heuristiques constructives (ou gloutonnes)** : elles construisent progressivement une solution en prenant à chaque étape la meilleure décision locale, dans l’espoir d’obtenir une bonne (voire optimale) solution globale, sans retour en arrière.  
    Exemples : l’algorithme glouton et l’algorithme de Dijkstra.

  - **Heuristiques d’amélioration locale** : elles partent d’une solution initiale (générée aléatoirement ou par une méthode gloutonne), puis l’améliorent à l’aide de modifications locales successives.  
    Exemples : Hill Climbing, la recherche tabou (Tabu Search), et la recherche à voisinage variable (Variable Neighborhood Search – VNS).

---

### Heuristiques gloutonnes

- **Définition** : une heuristique gloutonne désigne généralement une méthode qui construit une solution réalisable étape par étape, de manière à ce que chaque étape soit localement optimale.
- Les heuristiques gloutonnes sont spécifiques à un problème particulier.
- **Exemple** : l’algorithme glouton pour le problème du voyageur de commerce consiste à partir de la ville d’origine et, à chaque étape, à sélectionner la ville la plus proche comme prochaine destination, jusqu’à visiter toutes les villes prévues.

---

#### Algorithme – Plus proche voisin (greedy) pour le TSP

```
Algorithme 17. Plus proche voisin (glouton)
1. Initialisation :
   n : Nombre de villes
   d(i, j), i = 1,...,n, j = 1,...,n : la distance entre deux villes
   chemin_sol ← {1} : la séquence solution qu’on va construire
   villes_non_visitées ← {2,...,n} : la liste des villes non encore visitées
   ville_courante ← 1
2. Répéter :
   # le cas où plusieurs villes ont la même distance minimale par rapport à la ville c
   choisir i = argmin_{j∈S} d(ville_courante, j)
   ville_courante ← i
   chemin_sol ← chemin_sol ∪ {i}
   villes_non_visitées ← villes_non_visitées \ {i}
   jusqu’à villes_non_visitées = ∅
3. Retourner chemin_sol
```

---

#### Exemple 1 – TSP avec 16 villes

- Instance du problème du voyageur de commerce (TSP) avec 16 villes (le domicile + 15 clients).
- Le représentant doit planifier une tournée minimisant la distance totale parcourue.
- Le problème est modélisé par un graphe complet dont les arêtes ont pour coût la distance euclidienne directe.

Coordonnées des villes (sommet 1 = domicile) :

| Client | x‑coord | y‑coord | Client | x‑coord | y‑coord |
|--------|---------|---------|--------|---------|---------|
| 1      | 9.14    | 3.92    | 9      | 3.41    | 27.54   |
| 2      | 18.46   | 1.17    | 10     | 13.63   | 22.11   |
| 3      | 28.35   | 9.72    | 11     | 24.41   | 22.10   |
| 4      | 39.41   | 7.39    | 12     | 39.90   | 22.64   |
| 5      | 8.87    | 10.33   | 13     | 3.37    | 30.48   |
| 6      | 12.56   | 17.55   | 14     | 14.52   | 39.34   |
| 7      | 27.29   | 13.97   | 15     | 21.75   | 37.64   |
| 8      | 32.31   | 10.78   | 16     | 32.48   | 30.06   |

*(Une représentation spatiale figure dans le cours original.)*

---

#### Implémentation Python de l’heuristique gloutonne pour le TSP

```python
# algorithme glouton pour le voyageur de commerce
def nearest_neighbor_greedy(coords):
    distance_matrix = creer_distance_matrix(coords)
    n = len(coords)
    chemin_sol = [0]
    villes_non_visitees = set(range(1, n))
    ville_courante = 0

    while villes_non_visitees:
        distances = [(j, distance_matrix[ville_courante][j]) for j in villes_non_visitees]
        min_distance = min(distances, key=lambda x: x[1])[1]
        # on traite le cas où il y a égalité de distance
        candidats = [j for j, d in distances if d == min_distance]
        # on prend la première
        i = candidats[0]
        ville_courante = i
        chemin_sol.append(i)
        villes_non_visitees.remove(i)

    return chemin_sol, distance_matrix

# calcul du coût total
def total_cost(chemin, distance_matrix):
    cost = 0
    for k in range(len(chemin) - 1):
        cost += distance_matrix[chemin[k]][chemin[k+1]]
    # Pour revenir au point de départ et fermer le circuit (optionnel)
    cost += distance_matrix[chemin[-1]][chemin[0]]
    return cost

# Exécution
chemin, distance_matrix = nearest_neighbor_greedy(coords)
cout = total_cost(chemin, distance_matrix)
```

**Résultat** :
- Ordre de visite des villes : [1, 5, 6, 10, 11, 7, 3, 8, 4, 12, 16, 15, 14, 13, 9, 2]
- Coût total du parcours (distance totale) : **158.54**

---

### Heuristiques d’amélioration locale – Hill Climbing

- Principe : partir d’une solution approchée et tenter de l’améliorer itérativement.
- La recherche locale compare la solution actuelle à un ensemble de solutions voisines et sélectionne celle qui est la plus prometteuse.
- Elle s’arrête lorsqu’elle atteint une solution jugée suffisamment bonne, ou lorsque toutes les solutions voisines ont été explorées sans en trouver une meilleure.

#### Composants principaux

- **Espace de recherche** : toutes les solutions valides.
- **Fonction de voisinage** : décrit les mouvements possibles pour générer les voisins.
- **Fonction heuristique** : évalue la qualité des solutions (à maximiser ou minimiser).

---

#### Algorithme – Hill Climbing (maximisation)

```
Algorithme 17. HillClimbing (Maximisation)
1. Initialisation :
   choisir aléatoirement une solution de départ solution_initiale,
   f une fonction objective,
   générer_voisins une fonction qui retourne un ensemble de solutions voisines.
   S_courante = Solution_Initiale
2. tant que (vrai)
   a) List_voisins = générer_voisins(S_courante)
   b) Si List_voisins = ∅ alors :
         retourner S_courante
      sinon
         meilleur_voisin ← max_f(List_voisins)
         Si f(meilleur_voisin) ≤ f(S_courante)
            retourner S_courante
         S_courante ← meilleur_voisin
   Retourner S_courante
```

#### Remarques

- L’état initial peut être aléatoire ou choisi selon le problème.
- La fonction `générer_voisins` doit permettre d’explorer efficacement l’espace des solutions.

#### Avantages

- Trouve une solution acceptable rapidement.

#### Limites

- Risque d’être piégé dans des optima locaux.
- Nécessite le calcul de f pour tous les voisins, ce qui peut être coûteux sur de grands domaines.
- Une variante stochastique choisit un voisin aléatoire améliorant pour sortir des minima locaux.

---

#### Exemple – Problème des 4‑reines

- Placer 4 reines sur un échiquier 4×4 sans qu’elles s’attaquent.
- Une solution est représentée par un vecteur de 4 entiers : la colonne de chaque reine (ligne fixe).
- **Fonction objectif** : nombre de conflits (à minimiser).
- **Voisinage** : déplacer chaque reine dans sa ligne vers une autre colonne.

##### Itération 0
- État initial : `[1, 2, 3, 4]` → conflits = 6.
- Tous les voisins générés avec leurs conflits :

| Voisin        | Conflits |
|---------------|----------|
| [2,2,3,4]     | 4        |
| [3,2,3,4]     | 5        |
| [4,2,3,4]     | 4        |
| [1,1,3,4]     | 4        |
| [1,3,3,4]     | 4        |
| [1,4,3,4]     | 5        |
| [1,2,1,4]     | 5        |
| [1,2,2,4]     | 4        |
| [1,2,4,4]     | 4        |
| [1,2,3,1]     | 4        |
| [1,2,3,2]     | 5        |
| [1,2,3,3]     | 4        |

- Meilleur voisin : `[2,2,3,4]` avec 4 conflits.

---

##### Itération 1
- État courant : `[2,2,3,4]`, conflits = 4.
- Voisins :

| Reine déplacée | Nouvelles colonnes possibles | Voisins générés                |
|----------------|------------------------------|--------------------------------|
| 1              | 1, 3, 4                      | [1,2,3,4], [3,2,3,4], [4,2,3,4] |
| 2              | 1, 3, 4                      | [2,1,3,4], [2,3,3,4], [2,4,3,4] |
| 3              | 1, 2, 4                      | [2,2,1,4], [2,2,2,4], [2,2,4,4] |
| 4              | 1, 2, 3                      | [2,2,3,1], [2,2,3,2], [2,2,3,3] |

- Conflits des voisins :

| Voisin        | Conflits |
|---------------|----------|
| [1,2,3,4]     | 6        |
| [3,2,3,4]     | 5        |
| [4,2,3,4]     | 4        |
| [2,1,3,4]     | **2**    |
| [2,3,3,4]     | 3        |
| [2,4,3,4]     | 3        |
| [2,2,1,4]     | 3        |
| [2,2,2,4]     | 4        |
| [2,2,4,4]     | 4        |
| [2,2,3,1]     | 2        |
| [2,2,3,2]     | 5        |
| [2,2,3,3]     | 3        |

- Meilleur voisin : `[2,1,3,4]` avec 2 conflits.

---

##### Itération 2
- État courant : `[2,1,3,4]`, conflits = 2.
- Voisins et conflits :

| Voisin        | Conflits |
|---------------|----------|
| [1,1,3,4]     | 4        |
| [3,1,3,4]     | **2**    |
| [4,1,3,4]     | 2        |
| [2,2,3,4]     | 4        |
| [2,3,3,4]     | 3        |
| [2,4,3,4]     | 3        |
| [2,1,1,4]     | 2        |
| [2,1,2,4]     | 3        |
| [2,1,4,4]     | 3        |
| [2,1,3,1]     | 2        |
| [2,1,3,2]     | 3        |
| [2,1,3,3]     | 3        |

- Meilleur voisin : `[3,1,3,4]` (ou un autre à 2 conflits).

---

##### Itération 3
- État courant : `[3,1,3,4]`, conflits = 2.
- Voisins :

| Voisin        | Conflits |
|---------------|----------|
| [1,1,3,4]     | 4        |
| [2,1,3,4]     | 2        |
| [4,1,3,4]     | 2        |
| [3,2,3,4]     | 5        |
| [3,3,3,4]     | 4        |
| [3,4,3,4]     | 5        |
| [3,1,1,4]     | 2        |
| [3,1,2,4]     | **1**    |
| [3,1,4,4]     | **1**    |
| [3,1,3,1]     | 2        |
| [3,1,3,2]     | 2        |
| [3,1,3,3]     | 4        |

- Meilleur voisin : `[3,1,2,4]` (1 conflit).

---

##### Itération 4
- État courant : `[3,1,2,4]`, conflits = 1.
- Voisins :

| Voisin        | Conflits |
|---------------|----------|
| [1,1,2,4]     | 3        |
| [2,1,2,4]     | 3        |
| [4,1,2,4]     | 3        |
| [3,2,2,4]     | 3        |
| [3,3,2,4]     | 2        |
| [3,4,2,4]     | 2        |
| [3,1,1,4]     | 2        |
| [3,1,3,4]     | 2        |
| [3,1,4,4]     | **1**    |
| [3,1,2,1]     | 3        |
| [3,1,2,2]     | 2        |
| [3,1,2,3]     | 4        |

- Meilleur voisin : `[3,1,4,4]` (1 conflit).

---

##### Itération 5
- État courant : `[3,1,4,4]`, conflits = 1.
- Voisins :

| Voisin        | Conflits |
|---------------|----------|
| [1,1,4,4]     | 3        |
| [2,1,4,4]     | 3        |
| [4,1,4,4]     | 3        |
| [3,2,4,4]     | 3        |
| [3,3,4,4]     | 3        |
| [3,4,4,4]     | 4        |
| [3,1,1,4]     | 2        |
| [3,1,2,4]     | 1        |
| [3,1,3,4]     | 2        |
| [3,1,4,1]     | 1        |
| [3,1,4,2]     | **0**    |
| [3,1,4,3]     | 3        |

- Meilleur voisin : `[3,1,4,2]` avec 0 conflit → solution optimale !

---

#### Code Python pour Hill Climbing – 4‑reines

```python
# Fonction pour compter les conflits dans une solution (état)
def compter_conflits(etat):
    conflits = 0
    n = len(etat)
    for i in range(n):
        for j in range(i+1, n):
            # Même ligne ou même diagonale ?
            if etat[i] == etat[j] or abs(etat[i] - etat[j]) == abs(i - j):
                conflits += 1
    return conflits

# Fonction pour générer les voisins
def voisins(etat):
    liste_voisins = []
    n = len(etat)
    for col in range(n):
        for ligne in range(n):
            if ligne != etat[col]:
                voisin = list(etat)
                voisin[col] = ligne
                nb_conflits = compter_conflits(voisin)
                liste_voisins.append((voisin, nb_conflits))
    return liste_voisins

def hill_climbing(etat_initial):
    S_courante = etat_initial
    conflits_actuel = compter_conflits(S_courante)
    iteration = 0
    print(f"État initial : {S_courante} avec {conflits_actuel} conflits\n")
    while conflits_actuel > 0:
        liste_voisins = voisins(S_courante)
        print(f"Itération {iteration} : État courant = {S_courante} (Conflits : {conflits_actuel})")
        print("Voisins et nombre de conflits :")
        for v, c in liste_voisins:
            print(f" {v} -> {c}")
        # On choisit le voisin avec le moins de conflits
        liste_voisins.sort(key=lambda x: x[1])
        meilleur_voisin, conflits_meilleur = liste_voisins[0]
        if conflits_meilleur >= conflits_actuel:
            print("Aucun voisin meilleur trouvé, arrêt de l'algorithme.")
            break
        S_courante = meilleur_voisin
        conflits_actuel = conflits_meilleur
        iteration += 1
        print()
    print(f"État final : {S_courante} avec {conflits_actuel} conflits")
    return S_courante, conflits_actuel
```

---

## Métaheuristiques à population

### Définition

- Une métahouristique à population est une stratégie d’optimisation qui, au lieu d’améliorer itérativement une seule solution comme le fait la recherche locale, maintient et fait évoluer un ensemble de solutions candidates en parallèle.
- Ces solutions interagissent entre elles, échangent des informations, et s’améliorent collectivement au fil des itérations grâce à des mécanismes inspirés de phénomènes naturels ou sociaux.
- Elles permettent d’explorer l’espace de recherche de manière plus large, en cherchant à approcher l’optimal global.
- Elles ne garantissent pas l’optimalité, mais sont généralement plus efficaces que les simples heuristiques pour trouver des solutions de haute qualité.
- Elles sont adaptatives à plus d’un problème.

### Exemples de métaheuristiques à population

- **Algorithmes génétiques** (GA) : basés sur l’évolution biologique (sélection, croisement, mutation).
- **Colonies de fourmis** (ACO) : inspirées du comportement des fourmis pour explorer les chemins.
- **Optimisation par essaim de particules** (PSO)
- **Artificial Bee Colony** (ABC), 2005
- **Firefly Algorithm** (FA), 2008
- **Cuckoo Search** (CS), 2009
- **Bat Algorithm** (BA), 2010
- **Grey Wolf Optimizer** (GWO), 2014
- **Whale Optimization Algorithm** (WOA), 2016
- **Moth‑Flame Optimization** (MFO), 2015

---

## Particle Swarm Optimization (PSO)

- Proposé par James Kennedy & Russell Eberhart (1995).
- Imite le comportement collectif d’animaux (oiseaux, poissons) qui se déplacent ensemble en échangeant des informations.
- Algorithme d’optimisation stochastique basé sur une population.
- Particulièrement bien adapté aux problèmes d’optimisation continue, mais adaptable au discret.

### Concepts de base

- **Particule $i$** : solution candidate.
  - **Position** $x_i$ : point dans l’espace de recherche.
  - **Vitesse** $v_i$ : direction et amplitude du mouvement.
- **Meilleure position personnelle** $pbest_i$ : meilleure position trouvée par la particule $i$.
- **Meilleure position globale** $gbest$ : meilleure position trouvée par l’ensemble de l’essaim.

### Mouvement des particules

À chaque itération $t$, la vitesse et la position sont mises à jour :

$$
v_i(t+1) = \omega \, v_i(t) + c_1 r_1 \bigl(pbest_i(t) - x_i(t)\bigr) + c_2 r_2 \bigl(gbest(t) - x_i(t)\bigr)
$$

$$
x_i(t+1) = x_i(t) + v_i(t+1)
$$

Avec :
- $v_i(t)$ : vitesse de la particule $i$ à l’itération $t$.
- $\omega$ : coefficient d’inertie (exploration vs exploitation).
- $c_1$ : coefficient cognitif (attraction vers $pbest$).
- $c_2$ : coefficient social (attraction vers $gbest$).
- $r_1, r_2$ : nombres aléatoires uniformes dans $[0,1]$.
- $pbest_i(t)$ : meilleure position personnelle.
- $gbest(t)$ : meilleure position globale.

---

### Algorithme PSO (minimisation)

```
Algorithme 18. Particle Swarm Optimization (PSO)
1. Initialisation :
   f : fonction objectif
   d : dimension de l’espace de recherche
   n : nombre de particules
   max_iter : nombre maximum d’itérations
   ω, c1, c2 : paramètres
   x_min, x_max : bornes de recherche
   v_max : vitesse maximale
2. Pour chaque particule i = 1 à n :
   x[i] ← position aléatoire ∈ [x_min, x_max]
   v[i] ← vitesse aléatoire ∈ [-v_max, v_max]
   pbest[i] ← x[i]
   f_pbest[i] ← f(x[i])
   gbest ← pbest[i] ayant le plus petit f_pbest[i]
3. Répéter pour t = 1 à max_iter :
   Pour chaque particule i = 1 à n :
      r1, r2 ← aléatoires ∈ [0,1]
      v[i] ← ω * v[i]
             + c1 * r1 * (pbest[i] - x[i])
             + c2 * r2 * (gbest - x[i])
      v[i] ← clip(v[i], -v_max, v_max)
      x[i] ← x[i] + v[i]
      x[i] ← clip(x[i], x_min, x_max)
      f_curr ← f(x[i])
      Si f_curr < f_pbest[i] :
         pbest[i] ← x[i]
         f_pbest[i] ← f_curr
         Si f_pbest[i] < f(gbest) :
            gbest ← pbest[i]
4. Retourner gbest, f(gbest)
```

---

### Exemple d’application – Minimisation du coût d’une usine

- Une usine veut minimiser ses coûts totaux qui dépendent de 3 paramètres :
  - $x_1$ : nombre d’heures de travail par jour (4‑12 h)
  - $x_2$ : température du processus (100‑300 °C)
  - $x_3$ : taux d’utilisation des machines (50‑100 %)

- Fonction coût à minimiser :

$$
\text{Coût total} = 30\,x_1 + 0.5\,(x_2 - 80)^2 + 20\,(100 - x_3)
$$

**Objectif** : trouver $(x_1, x_2, x_3)$ qui minimise ce coût.

---

#### Implémentation Python – PSO

```python
import numpy as np
import random
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Paramètres PSO
n = 50              # nombre de particules
d = 3               # dimensions (x1, x2, x3)
max_iter = 100
w = 0.7             # inertie
c1 = 1.5            # cognitif
c2 = 1.5            # social

# Bornes pour chaque variable
x_min = np.array([4, 100, 50])
x_max = np.array([12, 300, 100])
v_max = (x_max - x_min) * 0.1

# Fonction coût à minimiser
def cost_function(x):
    x1, x2, x3 = x
    return 30*x1 + 0.5*(x2 - 80)**2 + 20*(100 - x3)

def pso_minimization(f, d, n, max_iter, w, c1, c2, x_min, x_max, v_max):
    # Initialisation
    x = np.random.uniform(low=x_min, high=x_max, size=(n, d))
    v = np.random.uniform(low=-v_max, high=v_max, size=(n, d))
    pbest = x.copy()
    f_pbest = np.array([f(xi) for xi in x])
    
    # Meilleure solution globale initiale
    idx_gbest = np.argmin(f_pbest)
    gbest = pbest[idx_gbest].copy()
    gbest_val = f_pbest[idx_gbest]
    
    convergence = []  # historique du meilleur coût

    for t in range(max_iter):
        for i in range(n):
            r1, r2 = np.random.rand(2)
            # Mise à jour de la vitesse
            v[i] = (w * v[i]
                    + c1 * r1 * (pbest[i] - x[i])
                    + c2 * r2 * (gbest - x[i]))
            # Clipping de la vitesse
            v[i] = np.clip(v[i], -v_max, v_max)
            # Mise à jour de la position
            x[i] = x[i] + v[i]
            # Clipping de la position
            x[i] = np.clip(x[i], x_min, x_max)
            
            # Évaluation
            current_score = f(x[i])
            
            # Mise à jour personnelle
            if current_score < f_pbest[i]:
                pbest[i] = x[i].copy()
                f_pbest[i] = current_score
                
                # Mise à jour globale
                if f_pbest[i] < gbest_val:
                    gbest = pbest[i].copy()
                    gbest_val = f_pbest[i]
        
        convergence.append(gbest_val)
    
    return gbest, gbest_val, convergence

# Exécution
best_solution, best_cost, convergence_history = pso_minimization(
    f=cost_function,
    d=d,
    n=n,
    max_iter=max_iter,
    w=w,
    c1=c1,
    c2=c2,
    x_min=x_min,
    x_max=x_max,
    v_max=v_max
)

print("Solution optimale trouvée :")
print(f"  - Heures de travail : {best_solution[0]:.2f} h/jour")
print(f"  - Température de production : {best_solution[1]:.2f} °C")
print(f"  - Taux d'utilisation machines : {best_solution[2]:.2f} %")
print(f"Coût total minimum : {best_cost:.2f} €")
```

**Résultats obtenus** :
- Heures de travail : 4.00 h/jour
- Température de production : 100.00 °C
- Taux d’utilisation machines : 100.00 %
- Coût total minimum : 320.00 €

---

## Complément

- **Greedy search** (recherche gloutonne)
- **Adam et ses variantes** (algorithmes d’optimisation stochastique pour l’apprentissage profond)
- **Comparaison sur différents types de données**


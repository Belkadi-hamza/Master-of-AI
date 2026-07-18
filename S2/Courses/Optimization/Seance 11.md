# Algorithmes d'Optimisation

## Professeur
**Pr. Faouzia Benabbou**
Département de Mathématiques et Informatique
Master DSBD et IA
Année académique : 2025-2026
Email : faouzia.benabbou@univh2c.ma

---

## Plan du Module

### 1. Introduction
### 2. Rappels Mathématiques
### 3. Algorithmes d'Optimisation Sans Contraintes
### 4. Algorithmes d'Optimisation avec Contraintes
### 5. Programmation Linéaire
### 6. Optimisation Combinatoire et Globale
### 7. Méthodes Heuristiques et Métaheuristiques

---

## Chapitre : Programmation Linéaire

### Classification des Algorithmes d'Optimisation

Les méthodes d'optimisation se répartissent en plusieurs catégories :

#### Méthodes Analytiques
- Sous contrainte

#### Méthodes Numériques
- **Sans contraintes :**
  - Méthode sans gradient
  - Méthode de descente de gradient :
    - Méthode de gradient à pas fixe et optimal
    - Méthode de gradient conjugué
    - Méthode de Newton
    - Méthodes du gradient quasi-Newton

- **Avec contraintes :**
  - Méthodes générales de résolutions de PCE, PCI
  - Programmation linéaire
  - Optimisation combinatoire et globale
  - Méthodes heuristiques et métaheuristiques
  - Algorithmes multi-objectifs

---

## 1. Introduction à la Programmation Linéaire

### Définition

La programmation linéaire est une branche de l'optimisation dans laquelle la fonction objectif ainsi que les contraintes sont linéaires. Les variables de décision sont généralement supposées non négatives.

### Objectif

Elle vise à déterminer la meilleure manière d'utiliser des ressources limitées pour satisfaire plusieurs besoins ou activités concurrentes. Autrement dit, elle permet de prendre des décisions optimales lorsque les ressources disponibles sont contraintes.

### Domaines d'Application

La programmation linéaire est largement utilisée dans de nombreux domaines, notamment :
- La logistique
- La planification de la production
- La finance
- Le transport
- La gestion des ressources

### Forme Générale d'un Problème de Programmation Linéaire

La forme générale d'un problème de programmation linéaire est la suivante :

$$\min f(x) = c^T x$$
$$\text{Sous les contraintes : } Ax \leq b, \quad x \geq 0$$

Où :
- $c$ est le vecteur des coefficients de la fonction objective
- $x$ est le vecteur des variables de décision
- $A$ est la matrice des coefficients des contraintes
- $b$ est le vecteur des seconds membres

### Exemple Classique : Problème du Régime Alimentaire

**Contexte :** Une personne souhaite composer un régime alimentaire quotidien qui couvre ses besoins nutritionnels tout en minimisant le coût total des aliments consommés.

**Données :** Elle dispose de 6 aliments, chaque aliment apporte une certaine quantité de protéines, de vitamines et de calories. Le régime doit respecter des apports nutritionnels minimaux.

| Aliment | Portion | Énergie | Protéines | Calcium (mg) | Prix/portion |
|---------|---------|---------|-----------|--------------|--------------|
| Céréales | 28g | 110 | 4 | 2 | 3 |
| Poulet | 100g | 205 | 32 | 12 | 24 |
| Œufs | 2 gros | 160 | 13 | 54 | 13 |
| Lait entier | 237cc | 160 | 8 | 285 | 9 |
| Tarte | 170g | 420 | 4 | 285 | 20 |
| Bœuf aux haricots | - | 260 | 14 | 80 | 19 |

**Besoins Nutritionnels Minimaux :**
- Énergie : 2000 kcal
- Protéines : 55 g
- Calcium : 800 mg

**Limites Journalières :**
- Flocons d'avoine : maximum 4 portions par jour
- Poulet : maximum 3 portions par jour
- Œufs : maximum 2 portions par jour
- Lait : maximum 8 portions par jour
- Tarte aux cerises : maximum 2 portions par jour
- Bœuf aux haricots : maximum 2 portions par jour

---

## 2. Modélisation du Problème

### Variables de Décision

Soit $x_1, x_2, x_3, x_4, x_5, x_6$ représentant respectivement :
- Flocons d'avoine
- Poulet
- Œufs
- Lait
- Tarte aux cerises
- Bœuf aux haricots

### Contraintes de Portions

$$0 \leq x_1 \leq 4, \quad 0 \leq x_2 \leq 3, \quad 0 \leq x_3 \leq 2, \quad 0 \leq x_4 \leq 8, \quad 0 \leq x_5 \leq 2, \quad 0 \leq x_6 \leq 2$$

### Contraintes Nutritionnelles

**Énergie (≥ 2000 kcal) :**
$$110x_1 + 205x_2 + 160x_3 + 160x_4 + 420x_5 + 260x_6 \geq 2000$$

**Protéines (≥ 55 g) :**
$$4x_1 + 32x_2 + 13x_3 + 8x_4 + 4x_5 + 14x_6 \geq 55$$

**Calcium (≥ 800 mg) :**
$$2x_1 + 12x_2 + 54x_3 + 285x_4 + 285x_5 + 80x_6 \geq 800$$

### Fonction Objectif (Minimisation du Coût)

$$\min f(x_1, x_2, x_3, x_4, x_5, x_6) = 3x_1 + 24x_2 + 13x_3 + 9x_4 + 20x_5 + 19x_6$$

### Caractéristiques du Problème
- Contraintes d'inégalité
- Contraintes linéaires
- Fonction objective linéaire

---

## 3. Propriétés Fondamentales de la Programmation Linéaire

### Hypothèses Implicites

1. **Linéarité :** Toutes les relations sont linéaires
2. **Proportionnalité :** La contribution d'une variable est proportionnelle à sa valeur
3. **Additivité :** Les contributions individuelles s'additionnent sans interaction
4. **Divisibilité :** Les variables sont réelles et continues
   - Si les variables sont limitées à des valeurs entières → Programmation Linéaire en Nombres Entiers (PLNE)
5. **Certitude :** Tous les coefficients sont connus avec certitude

### Propriétés Géométriques

- L'ensemble admissible d'un programme linéaire est un **ensemble convexe**, car il est obtenu par l'intersection de demi-espaces et d'hyperplans convexes

- En dimension deux, l'ensemble admissible est généralement représenté par un polygone convexe, éventuellement non borné. Les coins de ce polygone sont appelés **sommets** ou **points extrêmes**

- En dimension supérieure, l'ensemble admissible est appelé **polyèdre convexe**

### Théorème Fondamental

Si un programme linéaire admet une solution optimale finie et si son ensemble admissible possède au moins un sommet, alors il existe au moins une solution optimale située en un sommet de l'ensemble admissible.

**Conséquence :** Pour rechercher une solution optimale d'un programme linéaire, il suffit d'examiner les sommets de l'ensemble admissible.

---

## 4. Méthode Graphique de Résolution

### Géométrie de la Programmation Linéaire

La méthode graphique est la plus rapide et la plus simple, mais aussi la plus limitée : dès lors que le nombre de variables de décision ou de contraintes dépasse 2, elle devient impraticable.

### Étapes de la Méthode Graphique

1. **Représenter graphiquement les droites (équations provenant des inéquations)** :
   - Tracer les contraintes (fonctionnelles et de non-négativité)
   - Déterminer le demi-plan fermé satisfaisant chaque contrainte

2. **Déterminer le polygone de contraintes** comme l'intersection de toutes ces régions, en tenant compte des contraintes de non-négativité

3. **Tracer les niveaux du vecteur de coûts C** de la fonction objective

4. **Remplacer successivement les coordonnées de chaque point** de la région dans la fonction objective afin de rechercher la (les) solution(s) optimale(s) (si elle existe)

### Cas Possibles pour le Polygone de Contraintes

1. **Borné :** Région fermée avec un nombre fini de sommets
   - Le PL admet une solution optimale (sommet du polyèdre)
   - Solution non nécessairement unique

2. **Non borné :** S'étend à l'infini dans au moins une direction
   - Domaine non vide
   - Fonction objective non majorée → max de f = +∞

3. **Vide :** Domaine = ∅
   - Contraintes contradictoires
   - Aucun point ne satisfait toutes les contraintes
   - Le PL n'a pas de solutions

### Résolution Graphique (n=2)

**Étapes :**
1. Tracer les contraintes
2. Déterminer la région admissible
3. Trouver les sommets
4. Tracer les niveaux du vecteur de coûts C de la fonction objective
5. Évaluer la fonction objectif aux sommets
6. Choisir le meilleur

**Résultats possibles :**
- Solution unique
- Solutions multiples
- Solution infinie
- Pas de solution

---

## 5. Exemples de Résolution Graphique

### Problème 1 : Solution Unique

$$\begin{cases} \max f(x_1, x_2) = 3 + x_1 + x_2 \\ x_1 \leq 3 \\ x_2 \leq 7 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- Point admissible : oui, exemple (0,0)
- Sommets : (0,0), (3,0), (0,7), (3,7)
- Évaluations : f(0,0)=3, f(3,0)=6, f(0,7)=10, f(3,7)=13
- **Solution optimale :** oui (x₁=3, x₂=7)

### Problème 2 : Pas de Solution (Non Faisable)

$$\begin{cases} \max z = 3x_1 - x_2 \\ x_1 + x_2 \leq 2 \\ -2x_1 - 2x_2 \leq -10 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- Point admissible ? Non
- Solution optimale ? Non
- Ici, on a : $x_1 + x_2 \leq 2$ et $x_1 + x_2 \geq 5$ ⇒ Aucune solution ne satisfait les deux
- **Ce problème est non faisable**

### Problème 3 : Problème Non Borné

$$\begin{cases} \max z = x_1 - x_2 \\ -2x_1 + x_2 \leq -1 \\ -x_1 - 2x_2 \leq -2 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- Analysons la première contrainte : $-2x_1 + x_2 \leq -1 \Rightarrow x_2 \leq 2x_1 - 1$
- $-x_1 - 2x_2 \leq -2 \Rightarrow x_1 + 2x_2 \geq 2$
- Points admissibles : (1,1) est admissible
- **Point admissible existe mais le problème est non borné** : il existe une infinité de solutions faisables qui améliorent indéfiniment la valeur de la fonction objectif, sans jamais atteindre un maximum global

### Problème 4 : Solutions Multiples

$$\begin{cases} \max z = x_1 + x_2 \\ x_1 + x_2 \leq 1 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- Point admissible ? Oui (1, 0)
- Solution optimale ? Oui mais pas unique
- Les points (1,0) et (0,1) sont des solutions optimales

### Problème 5 : Maximisation avec Deux Contraintes

$$\begin{cases} \max x_1 + x_2 \\ 2x_1 + x_2 \leq 10 \\ x_1 + 2x_2 \leq 8 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- La région admissible est un polygone
- Sommets : (0,0), (0,4), (4,2), (5,0)
- Pour maximiser/minimiser une fonction linéaire, l'optimum se trouve sur l'un des sommets

### Problème 6 : Maximisation du Profit

$$\begin{cases} \text{Max } z = x_1 + 2x_2 \\ x_1 + x_2 \leq 6 \\ x_2 \leq 3 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- On délimite le domaine des solutions réalisables (polygone convexe)
- Droites des contraintes :
  - D₁ : $x_1 + x_2 = 6$ : points (0,6) et (6,0)
  - D₂ : $x_2 = 3$
  - D₃ : $x_1 \geq 0$
- On trace des lignes de niveaux arbitraires de f (4, 6, 8, 10)
- **Sommets :** (0,0), (0,3), (3,3), (6,0)
- **Solution optimale :** (3,3) avec Z = 9

### Problème 7 : Maximisation avec Trois Contraintes

$$\begin{cases} \text{Max } z = x_1 + 2x_2 \\ x_1 + 3x_2 \leq 6 \\ -x_1 + x_2 \leq 1 \\ 2x_1 - x_2 \leq 4 \\ x_1, x_2 \geq 0 \end{cases}$$

**Résolution :**
- Droites relatives aux contraintes :
  - D₁ : $x_1 + 3x_2 = 6$ : points (0,2) et (6,0)
  - D₂ : $-x_1 + x_2 = 1$ : points (0,1) et (-1,0)
  - D₃ : $2x_1 - x_2 = 4$ : points (0,-4) et (2,0)
  - D₄ : $x_1 \geq 0$
  - D₅ : $x_2 \geq 0$
- **Sommets admissibles et valeurs de Z :**
  - Sommet 4 : (0.00, 1.00) - Z = 2.00 est le point optimal

### Problème 8 : Région Admissible Vide

$$\begin{cases} \text{Max } z = x_1 + 2x_2 \\ 3x_1 + 2x_2 \leq 6 \\ x_1 - x_2 \leq 1 \\ 2x_1 - x_2 \geq 6 \\ x_1, x_2 \geq 0 \end{cases}$$

**Analyse :**
- La contrainte $2x_1 - x_2 \geq 6$ implique $x_1 \geq 3 + x_2/2 \geq 3$
- Considérons la première contrainte $3x_1 + 2x_2 \leq 6$
- Si $x_1 > 3$ et $x_2 \geq 0$, alors $3x_1 + 2x_2 \geq 9$, ce qui viole l'inégalité
- **La région admissible définie par ce système d'inégalités est vide**

---

## 6. Méthode du Simplexe

### Présentation

L'algorithme du simplexe est un algorithme fondamental en programmation linéaire (PL) pour résoudre les problèmes d'optimisation linéaire. Développé par **George Dantzig** à partir de 1947, il reste l'une des méthodes les plus utilisées pour trouver une solution optimale à un PL, en particulier pour les problèmes de taille modérée.

### Concept Fondamental : Exploration des Sommets

L'algorithme du simplexe exploite la propriété fondamentale de la programmation linéaire : si une solution optimale existe, elle se trouve toujours à un sommet (ou point extrême) du polytope des contraintes (la région réalisable définie par les inégalités et les contraintes d'égalité).

**Principe :** L'algorithme du simplexe se déplace itérativement d'un sommet admissible à un sommet admissible voisin, en améliorant la valeur de la fonction objective à chaque étape.

Il s'arrête lorsqu'il atteint un sommet où aucune amélioration n'est possible, ce qui correspond à la solution optimale.

### Mise sous Forme Standard

Avant d'appliquer l'algorithme du simplexe, le problème de PL doit être converti en forme standard :

#### Règles de Transformation

1. **Fonction objective :** Exprimée sous forme de maximisation
   - Si le problème original est une minimisation, on maximise l'opposé de la fonction objective (-f)

2. **Constantes des contraintes (b) :** Positives ou nulles
   - Si b < 0, multiplier la contrainte entière par -1 (et inverser le sens de l'inégalité si nécessaire)

3. **Transformation des contraintes d'inégalité en égalités :**
   - Pour les contraintes de type $\sum a_{ij}x_j \leq b_i$ : ajouter une variable d'écart $s_i \geq 0$
     $$\sum a_{ij}x_j + s_i = b_i$$
   - Pour les contraintes de type $\sum a_{ij}x_j \geq b_i$ : soustraire une variable d'excédent $e_i \geq 0$
     $$\sum a_{ij}x_j - e_i = b_i$$

4. **Variables non négatives :** $x_j \geq 0, s_i \geq 0, e_i \geq 0$
   - Si $x_j \leq 0$ : remplacer par $x_j^+ = -x_j$
   - Si $x_j \in \mathbb{R}$ : remplacer par deux variables non négatives $x_j^+$ et $x_j^-$ tel que $x_j = x_j^+ - x_j^-$

#### Exemple de Mise sous Forme Standard

Soit le problème :

$$\begin{cases} \text{Max } z = 6x_1 - 3x_2 + x_3 \\ 4x_1 + 2x_2 + x_3 \leq 65 \\ x_1 + x_2 - x_3 \geq 5 \\ x_1 + x_2 = 10 \\ x_1 \geq 0, x_2 \leq 0 \end{cases}$$

**Transformation :**
1. $x_2 \leq 0$ et $x_3$ libre ⇒ Posons :
   - $y_1 = x_1$, $y_2 = -x_2$, $x_3 = y_3 - y_4$
   - où $y_i \geq 0$ pour i = 1,2,3,4

2. Transformation des contraintes en égalités :
   - $4y_1 - 2y_2 + y_3 - y_4 \leq 65$ devient : $4y_1 - 2y_2 + y_3 - y_4 + s_1 = 65$
   - $y_1 + y_2 + y_4 - y_3 \geq 5$ devient : $y_1 + y_2 + y_4 - y_3 - e_1 = 5$
   - $y_1 + y_2 = 10$

**Forme standard :**
$$\begin{cases} \text{Max } z = 6y_1 - 3y_2 + y_3 - y_4 \\ 4y_1 - 2y_2 + y_3 - y_4 + s_1 = 65 \\ y_1 + y_2 + y_4 - y_3 - e_1 = 5 \\ y_1 + y_2 = 10 \\ y_1, y_2, y_3, y_4, s_1, e_1 \geq 0 \end{cases}$$

#### Autre Exemple

$$\begin{cases} \text{Max } Z = 6x_1 + 14x_2 + 13x_3 \\ \frac{1}{2}x_1 + 2x_2 + x_3 \leq 24 \\ x_1 + 2x_2 + 4x_3 \leq 60 \\ x_1, x_2, x_3 \geq 0 \end{cases}$$

**Forme standard :**
$$\begin{cases} \text{Max } Z = 6x_1 + 14x_2 + 13x_3 \\ \frac{1}{2}x_1 + 2x_2 + x_3 + s_1 = 24 \\ x_1 + 2x_2 + 4x_3 + s_2 = 60 \\ x_1, x_2, x_3, s_1, s_2 \geq 0 \end{cases}$$

---

## 7. Tableau du Simplexe

### Structure du Tableau

L'algorithme du simplexe est généralement implémenté en utilisant un tableau :

- **Nombre de lignes** : Nombre de contraintes + 1 (ligne de la fonction objective)
- **Nombre de colonnes** : Nombre total de variables

### Composants du Tableau

1. **Ligne de la fonction objective (ligne Z)** :
   - Contient les coefficients de la fonction objective (-Z pour maximiser)
   - Un 0 à la dernière colonne (valeur initiale de Z)

2. **Lignes de contraintes** :
   - Chaque ligne représente une contrainte d'égalité
   - Contient les coefficients des variables, la variable de base correspondante et la valeur du second membre $b_i$

3. **Variables de base** :
   - Variables qui forment une matrice identité dans les colonnes correspondantes
   - Initialement : variables d'écart ou d'excédent
   - Changent au cours de l'exécution de l'algorithme

4. **Variables hors base** :
   - Toutes les autres variables du problème
   - À l'initialisation : variables initiales du problème

### Exemple de Tableau Initial

**Problème :**
$$\begin{cases} \text{Max } z = 30x_1 + 50x_2 \\ 3x_1 + 2x_2 \leq 1800 \\ x_1 \leq 400 \\ x_2 \leq 600 \\ x_1, x_2 \geq 0 \end{cases}$$

**Forme standard :**
$$\begin{cases} 3x_1 + 2x_2 + x_3 = 1800 \\ x_1 + x_4 = 400 \\ x_2 + x_5 = 600 \\ z - 30x_1 - 50x_2 = 0 \\ x_1, x_2, x_3, x_4, x_5 \geq 0 \end{cases}$$

**Tableau initial :**

| Variables hors base | Variables d'écart | | | | | |
|---------------------|-------------------|---|---|---|---|---|
| | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | b |
| $x_3$ | 3 | 2 | 1 | 0 | 0 | 1800 |
| $x_4$ | 1 | 0 | 0 | 1 | 0 | 400 |
| $x_5$ | 0 | 1 | 0 | 0 | 1 | 600 |
| Z | -30 | -50 | 0 | 0 | 0 | 0 |

**Note :** Un coefficient négatif dans la ligne de Z indique qu'une amélioration est encore possible.

---

## 8. Algorithme du Simplexe (Cas de Maximisation)

### Algorithme 1 : Simplexe - Cas de Maximisation

**1. Initialisation :**
- Mettre le problème sous forme standard

**2. Construire le tableau du simplexe :**
- a) Identifier une solution de base réalisable initiale
- b) Pour le cas maximisation, prendre les coefficients de la ligne Z

**3. Test d'Optimalité :**
- a) Si tous les coefficients dans la ligne Z sont $\geq 0$ → Solution optimale atteinte
- b) Sinon, passer à l'étape suivante

**4. Choix de la Variable Entrante :**
- Sélectionner une variable hors base avec le coefficient le plus négatif dans la ligne -Z

**5. Choix de la Variable Sortante :**
- a) Pour chaque contrainte i où le coefficient de la colonne entrante (EiC) > 0, calculer : $\theta_i = b_i / \text{EiC}$
- b) Choisir la ligne avec le plus petit $\theta_i$ positif

**6. Pivotage :**
- a) Normalisation : Diviser la ligne pivot par l'élément pivot pour obtenir 1
  - New_Eij = Eij / Eic (la nouvelle ligne pivot)
  - Le pivot Eic est l'intersection de la ligne et colonne pivot
- b) Élimination : Calculer les nouvelles valeurs du tableau
  - Pour toutes les autres lignes (y compris z) :
  - Nouvelle ligne i = Ligne actuelle i - (coefficient de la colonne pivot de la ligne i × nouvelle ligne pivot)
  - New_Eij = Eij - Eic × (New_Eij)

**7. Itération :**
- Retourner à l'étape 3 avec le nouveau tableau du simplexe jusqu'à satisfaction du critère d'optimalité

### Cas de Minimisation

Transformer une minimisation en maximisation :
- Problème : $\min f(x)$ peut être transformé en : $\max (-f(x))$
- En effet : $\min f(x) = \max [-f(x)]$

**Exemple :** $\min z = 3x_1 + 2x_2$ est équivalent à $\max z' = -3x_1 - 2x_2$

### Règles de Sélection

- Sélectionner une variable hors base avec un coefficient positif dans la ligne Z
- Choisir la variable entrante avec Z le plus petit
- S'il y a deux ou plus variables qui satisfont aux conditions précédentes, choisir celle avec l'indice le plus petit (règle de Bland)
- Cette colonne sera la colonne pivot

### Choix de la Variable Sortante

Pour déterminer jusqu'à quelle valeur la variable entrante $x_i$ (dont les coefficients de sa colonne sont $(a_i)$) peut augmenter sans violer les contraintes, on effectue le test du ratio minimum :

- Calculer le rapport $b_i / a_i$ pour chaque contrainte (ligne) où $a_i > 0$
- La variable de base correspondant à la ligne avec le ratio minimum positif est choisie comme variable sortante
- Sa ligne sera la ligne pivot

L'élimination vise à rendre tous les autres éléments de la colonne pivot égaux à 0.

---

## 9. Exemple Détaillé de Résolution par le Simplexe

### Problème

$$\begin{cases} 3x_1 + 2x_2 + x_3 = 1800 \\ x_1 + x_4 = 400 \\ x_2 + x_5 = 600 \\ z - 30x_1 - 50x_2 = 0 \\ x_1, x_2, x_3, x_4, x_5 \geq 0 \end{cases}$$

### Itération 1

**Tableau initial :**

| | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | b |
|---|-------|-------|-------|-------|-------|-----|
| $x_3$ | 3 | 2 | 1 | 0 | 0 | 1800 |
| $x_4$ | 1 | 0 | 0 | 1 | 0 | 400 |
| $x_5$ | 0 | 1 | 0 | 0 | 1 | 600 |
| Z | -30 | -50 | 0 | 0 | 0 | 0 |

**Étape 3 :** Test d'optimalité - Des coefficients négatifs existent (-30 et -50) → Continuer

**Étape 4 :** Choix de la variable entrante - $x_2$ (coefficient le plus négatif : -50)

**Étape 5 :** Choix de la variable sortante - Test du ratio minimum :
- Ligne 1 : $1800 / 2 = 900$
- Ligne 2 : $400 / 0 = \infty$ (non considéré)
- Ligne 3 : $600 / 1 = 600$ (minimum)
- **Variable sortante :** $x_5$

**Étape 6 :** Pivotage
- Normalisation de la ligne pivot (ligne 3) : diviser par 1
- Élimination pour les autres lignes

**Calcul des nouvelles lignes :**

- **Nouvelle ligne 1 :** $(3, 2, 1, 0, 0, 1800) - 2 \times (0, 1, 0, 0, 1, 600) = (3, 0, 1, 0, -2, 600)$
- **Nouvelle ligne 2 :** $(1, 0, 0, 1, 0, 400) - 0 \times (0, 1, 0, 0, 1, 600) = (1, 0, 0, 1, 0, 400)$
- **Nouvelle ligne 4 (Z) :** $(-30, -50, 0, 0, 0, 0) - (-50) \times (0, 1, 0, 0, 1, 600) = (-30, 0, 0, 0, 50, 30000)$

**Nouveau tableau après itération 1 :**

| | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | b |
|---|-------|-------|-------|-------|-------|-----|
| $x_3$ | 3 | 0 | 1 | 0 | -2 | 600 |
| $x_4$ | 1 | 0 | 0 | 1 | 0 | 400 |
| $x_2$ | 0 | 1 | 0 | 0 | 1 | 600 |
| Z | -30 | 0 | 0 | 0 | 50 | 30000 |

**Solution de base actuelle :**
- $x_1 = 0$ (n'apparaît pas dans les variables de base)
- $x_2 = 600$
- $x_3 = 600$
- $x_4 = 400$
- $x_5 = 0$
- $Z = 50 \times 600 = 30000$

**Test d'optimalité :** Valeur négative (-30) → Continuer

### Itération 2

**Étape 4 :** Choix de la variable entrante - $x_1$ (coefficient -30)

**Étape 5 :** Choix de la variable sortante - Test du ratio minimum :

| | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | b | b/Eic |
|---|-------|-------|-------|-------|-------|-----|-------|
| $x_3$ | 3 | 0 | 1 | 0 | -2 | 600 | 200 |
| $x_4$ | 1 | 0 | 0 | 1 | 0 | 400 | 400 |
| $x_2$ | 0 | 1 | 0 | 0 | 1 | 600 | +∞ |
| Z | -30 | 0 | 0 | 0 | 50 | 30000 | |

- Ligne 1 : $600 / 3 = 200$ (minimum)
- Ligne 2 : $400 / 1 = 400$
- **Variable sortante :** $x_3$

**Étape 6 :** Pivotage
- Normalisation de la ligne pivot (ligne 1) : diviser par 3

**Nouvelle ligne 1 (pivot normalisée) :** $(1, 0, 1/3, 0, -2/3, 200)$

**Élimination :**

- **Nouvelle ligne 2 :** $(1, 0, 0, 1, 0, 400) - 1 \times (1, 0, 1/3, 0, -2/3, 200) = (0, 0, -1/3, 1, 2/3, 200)$
- **Nouvelle ligne 3 :** $(0, 1, 0, 0, 1, 600) - 0 \times (1, 0, 1/3, 0, -2/3, 200) = (0, 1, 0, 0, 1, 600)$
- **Nouvelle ligne 4 (Z) :** $(-30, 0, 0, 0, 50, 30000) + 30 \times (1, 0, 1/3, 0, -2/3, 200) = (0, 0, 10, 0, 30, 36000)$

**Tableau final :**

| | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | b |
|---|-------|-------|-------|-------|-------|-----|
| $x_1$ | 1 | 0 | 1/3 | 0 | -2/3 | 200 |
| $x_4$ | 0 | 0 | -1/3 | 1 | 2/3 | 200 |
| $x_2$ | 0 | 1 | 0 | 0 | 1 | 600 |
| Z | 0 | 0 | 10 | 0 | 30 | 36000 |

### Résultat Final

**Solution de base optimale :**
- $x_1 = 200$
- $x_2 = 600$
- $x_3 = 0$
- $x_4 = 200$
- $x_5 = 0$
- **Z = 36000**

**Interprétation :**
- Tous les coefficients des variables hors base dans la ligne Z sont non négatifs (10 et 30)
- Cela signifie que la solution actuelle est optimale
- Pour maximiser le profit Z, l'entreprise doit produire 200 unités du produit $x_1$ et 600 unités du produit $x_2$, générant un profit maximal de 36000

**Interprétation des variables d'écart :**
- $x_3 = 0$ : La première contrainte ($3x_1 + 2x_2 \leq 1800$) est saturée (entièrement utilisée)
- $x_4 = 200$ : La deuxième contrainte ($x_1 \leq 400$) a une marge de 200 unités non utilisées
- $x_5 = 0$ : La troisième contrainte ($x_2 \leq 600$) est saturée (entièrement utilisée)

---

## 10. Cas Particuliers du Simplexe

### Solutions Multiples

Si, à l'optimalité, une variable hors base a un coefficient de zéro dans la ligne Z, cela indique qu'il existe d'autres solutions optimales avec la même valeur de Z.

### Problème Non Borné

Si, lors du choix de la variable sortante, tous les coefficients de la variable entrante dans les contraintes sont négatifs :

- Cela signifie que la variable entrante peut augmenter indéfiniment sans violer les contraintes
- La fonction objective peut croître sans limite
- Le programme linéaire est non borné

**Exemple :** $z = x_1 + x_2$ avec $x_1 - x_2 \leq 1$ et $x_1, x_2 \geq 0$ → $x_2$ peut augmenter infiniment

### Dégénérescence

Si une variable de base a une valeur $b_i$ nulle, le test du ratio minimum peut conduire à un ratio de zéro, ce qui peut potentiellement entraîner des cycles (l'algorithme revient à un tableau déjà rencontré) :

- La variable sortante quitte alors la base avec une valeur déjà nulle
- Après le pivot :
  - La base change, mais la solution reste exactement la même
  - La valeur de Z ne s'améliore pas

### Absence de Solution Réalisable

Les contraintes définissent une région admissible vide. Il n'existe aucun ensemble de valeurs pour les variables de décision qui satisfassent simultanément toutes les contraintes du problème.

### Solution de Base Réalisable Initiale

L'algorithme du simplexe nécessite une solution de base réalisable initiale pour démarrer ses itérations. Si le problème au format standard ne présente pas immédiatement une base réalisable évidente, des méthodes spéciales sont nécessaires pour en trouver une :

- **Phase I** : Méthode en deux phases
- **Grand M** : Méthode de la grande constante

---

## 11. Variantes du Simplexe

### Méthode du Simplexe Dual
### Méthode du Simplexe Borné (Bounded Variable Simplex)
### Méthode du Simplexe Révisé (Revised Simplex Method)

---

## 12. Autres Algorithmes de Programmation Linéaire

### Algorithmes Spécialisés

- **Algorithme de Transport** : Pour les problèmes de distribution de biens d'un ensemble de sources (fournisseurs) à un ensemble de destinations (clients), en minimisant les coûts logistiques

- **Algorithme d'Affectation (Méthode Hongroise)** : Affectation optimale de ressources (employés, machines) à des tâches, avec des coûts ou temps variables

- **Algorithmes de Flot dans les Réseaux (Ford-Fulkerson, Edmonds-Karp)** : Optimisation de trafic routier, réseaux de télécommunication, gestion d'énergie

- **Décomposition de Dantzig-Wolfe** : Pour les problèmes de grande taille avec une structure bloc-diagonale, planification multi-étapes, problèmes de découpe de matériaux

### Logiciels de Programmation Linéaire

- **Solveurs commerciaux :** CPLEX, Gurobi
- **Solveurs open source :** SciPy.optimize, cvxpy

---

## 13. Avantages et Limites de la Méthode du Simplexe

### Avantages

- Très performante pour la plupart des problèmes réels de programmation linéaire (souvent converge en O(n) à O(n³) itérations)

- Optimise rapidement des problèmes avec des milliers de variables/contraintes

- Fournit une solution optimale exacte globale (pas une approximation) lorsque le problème est borné et réalisable

- Interprétation économique : Les variables duales (écart et excédent) donnent des insights utiles (valeur marginale des ressources, sensibilité aux contraintes)

### Limites

- Dans le pire cas, complexité théorique exponentielle : l'algorithme peut explorer tous les sommets du polyèdre (O(2^n) itérations)

- Sensibilité aux dégénérescences : Risque de cyclage (boucles infinies) si les règles anti-cyclage comme la règle de Bland ne sont pas appliquées, ce qui peut ralentir la convergence

- Nécessite une reformulation préalable en ajoutant les variables d'écart/excédents

- Limite aux problèmes linéaires : Inadaptée aux problèmes non-linéaires ou discrets
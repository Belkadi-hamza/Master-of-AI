# Les Réseaux de Neurones Artificiels

**Pr. BEN LAHMAR EL Habib**

---

## Introduction

### Définition

Les réseaux de neurones sont une **tentative de reproduction des structures du cerveau** afin de raisonner.

### Structure

- Ensemble d'unités transformant des entrées en sorties **(neurones)** connectées
- Chaque connexion à un **poids** associé
- La phase d'apprentissage permet d'ajuster les poids pour produire la bonne sortie (la classe en classification)

---

### Schéma d'un Réseau de Neurones

```mermaid
flowchart LR
    subgraph Input["Couche d'entrée"]
        I1[Entrée 1]
        I2[Entrée 2]
        I3[Entrée 3]
    end
    
    subgraph Hidden["Couche cachée"]
        H1[Neurone 1]
        H2[Neurone 2]
        H3[Neurone 3]
    end
    
    subgraph Output["Couche de sortie"]
        O1[Sortie 1]
        O2[Sortie 2]
    end
    
    I1 --> H1
    I1 --> H2
    I1 --> H3
    I2 --> H1
    I2 --> H2
    I2 --> H3
    I3 --> H1
    I3 --> H2
    I3 --> H3
    
    H1 --> O1
    H1 --> O2
    H2 --> O1
    H2 --> O2
    H3 --> O1
    H3 --> O2
    
    style Input fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Hidden fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style Output fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
```

---

## Analogie avec le Cerveau

### Faits sur le Cerveau Humain

- Contient environ **100 milliards de neurones**
- Chaque neurone est connecté à environ **10.000 autres**

### Fonctionnement d'un Neurone Biologique

1. Un neurone reçoit des impulsions électriques de ses voisins via les **dendrites**
2. Si la somme des signaux dépasse un certain **seuil**, il se produit une décharge électrique de type **tout ou rien** appelée **potentiel d'action**
3. Le potentiel d'action se propage le long de l'**axone**, qui se ramifie en une multitude de dendrites
4. La terminaison d'une dendrite est une petite usine de production chimique
5. Elle diffuse des **neurotransmetteurs chimiques** dans un espace appelé **synapse**, qui rejoint un autre neurone

---

### Schéma du Neurone Biologique

```mermaid
flowchart LR
    A[Dendrites<br>Réception des signaux] --> B[Soma<br>Somme des signaux]
    B --> C{Seuil<br>atteint ?}
    C -->|Oui| D[Potentiel d'action]
    C -->|Non| E[Neurone inactif]
    D --> F[Axone<br>Transmission]
    F --> G[Synapse<br>Communication avec d'autres neurones]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style C fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style D fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style E fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style F fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style G fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
```

---

## Modélisation du Neurone

### Fonctionnement du Neurone Artificiel

- Induit une valeur en **sortie** à partir d'un ensemble de valeurs en **entrée**
- Les liens sont pondérés par des **poids**
- Réalise une **combinaison linéaire** des entrées suivie d'une **fonction de transfert** (fonction à seuil)

### Éléments du Neurone

$$
\text{Entrées} \xrightarrow{\text{Σ (Somme pondérée)}} \xrightarrow{f(\cdot)} \text{Sortie}
$$

**Fonction de transfert :**

$$
S = \sum_i w_i \times E_i
$$

- Biais optionnel $b$
- Fonction Sigmoïde :

$$
f(x) = \frac{1}{1 + e^{-x}}
$$

---

### Schéma d'un Neurone Artificiel

```mermaid
flowchart LR
    subgraph Inputs["Entrées"]
        E1[E₁] -->|w₁| S
        E2[E₂] -->|w₂| S
        E3[E₃] -->|w₃| S
        B[Biais b] --> S
    end
    
    S["Σ"] --> F["f(x)"]
    F --> O["Sortie<br>O = f(ΣwᵢEᵢ + b)"]
    
    style Inputs fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style S fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style F fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style O fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
```

---

## Combinaison et Activation

### Phases du Traitement

1. **Phase de combinaison** : combine les entrées et produit une valeur en sortie
2. **Phase d'activation** : prend en entrée la sortie de la fonction de combinaison et déduit la valeur finale

### Fonctions de Combinaison

| Fonction | Description |
|----------|-------------|
| Produit scalaire | $y = \sum w_i x_i$ |
| Norme euclidienne | $y = \sqrt{\sum (x_i - w_i)^2}$ |
| Minimum / Maximum | $y = \min(x_i)$ ou $\max(x_i)$ |
| Majorité | Vote majoritaire |

### Fonctions d'Activation

Trois intervalles de fonctionnement :

| Intervalle | État du Neurone |
|------------|-----------------|
| En dessous du seuil | Neurone non actif |
| Aux alentours du seuil | Phase de transition |
| Au dessus du seuil | Neurone actif |

---

### Fonctions d'Activation Courantes

```mermaid
flowchart LR
    A["Fonctions d'activation"] --> B["Sigmoïde<br>f(x) = 1/(1+e⁻ˣ)"]
    A --> C["Tangente hyperbolique<br>f(x) = tanh(x)"]
    A --> D["ReLU<br>f(x) = max(0,x)"]
    A --> E["Seuil<br>f(x) = 0 ou 1"]
    
    B --> B1["[0, 1]"]
    C --> C1["[-1, 1]"]
    D --> D1["[0, ∞]"]
    E --> E1["{0, 1}"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style D fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style E fill:#fce4ec,stroke:#c62828,stroke-width:2px
```

---

## Organisation en Réseau

### Réseau Multi-couches Totalement Connecté

Un réseau de neurones est organisé en couches :

1. **Couche d'entrée** : reçoit les données
2. **Couches cachées** : effectuent les calculs intermédiaires
3. **Couche de sortie** : produit le résultat

### Topologie

- Entrées, 1 ou 2 couches cachées, sorties
- Choix du nombre de neurones par couche dépend des entrées et sorties
- Couches cachées intermédiaires

### Normalisation des Variables d'Entrées

| Type de Variable | Méthode de Normalisation |
|------------------|--------------------------|
| Variable continue | Centrée réduite $[-1, +1]$ |
| Variable discrète | Codée ou valeurs attribuées aux entrées |
| Sorties | Booléenne codant les classes |

---

### Architecture d'un Perceptron Multicouche

```mermaid
flowchart TD
    subgraph Input["Couche d'entrée"]
        direction LR
        I1[Neurone 1]
        I2[Neurone 2]
        I3[Neurone 3]
    end
    
    subgraph Hidden1["Couche cachée 1"]
        direction LR
        H1[Neurone 1]
        H2[Neurone 2]
        H3[Neurone 3]
        H4[Neurone 4]
    end
    
    subgraph Hidden2["Couche cachée 2"]
        direction LR
        G1[Neurone 1]
        G2[Neurone 2]
    end
    
    subgraph Output["Couche de sortie"]
        direction LR
        O1[Neurone 1]
        O2[Neurone 2]
    end
    
    Input --> Hidden1 --> Hidden2 --> Output
    
    style Input fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Hidden1 fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style Hidden2 fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Output fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
```

---

## Perceptron Multicouche

Le perceptron multicouche (PMC) est l'architecture la plus courante des réseaux de neurones.

### Caractéristiques

- Plusieurs couches de neurones
- Connexions totales entre les couches
- Apprentissage supervisé

---

## Apprentissage

### Principe

- Découverte de modèles complexes avec **affinage progressif**
- Le réseau s'adapte lors de la phase d'apprentissage

### Algorithmes d'Apprentissage

Plusieurs algorithmes possibles :

- Le plus utilisé = **Rétropropagation** (Backpropagation)
- Modification des poids $w$ par rétropropagation

### Modes d'Apprentissage

| Mode | Description | Avantage |
|------|-------------|----------|
| **Off-Line (Batch)** | Mise à jour après tous les exemples | Stable, converge mieux |
| **On-Line (Stochastique)** | Mise à jour après chaque exemple | Plus rapide, échappe aux minima locaux |

### Algorithme d'Apprentissage Générique

```
1. Initialiser la matrice des poids au hasard
2. Pour chaque exemple :
   a. Calculer la sortie avec les poids actuels du réseau
   b. Calculer les erreurs de sortie
   c. Appliquer l'algorithme de mise à jour des poids
```

---

### Schéma de l'Apprentissage

```mermaid
flowchart TD
    A["Parameter Initialization<br>W ~ N(0, σ²), b = 0"] --> B["Batch Injection<br>Input X, Target y"]
    B --> C["Forward Pass<br>ŷ = f(WX + b)"]
    C --> D["Loss Computation<br>L(y, ŷ)"]
    D --> E["Backpropagation<br>∂L / ∂W"]
    E --> F["Optimization Step<br>W ← W - η · ∇W"]
    F --> G{"Model Converged or<br>Max Epochs Reached?"}
    G -->|No| B
    G -->|Yes| H["Trained Model<br>(Ready for Inference)"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style E fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style F fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style G fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style H fill:#e0f7fa,stroke:#00695c,stroke-width:2px
```

---

## Rétropropagation

### Initialisation

- Tirage aléatoire des poids sur $[-1, +1]$

### Étapes de la Rétropropagation

#### 1. Propager les Entrées en Avant (Forward Pass)

- Un exemple est appliqué aux entrées
- Le réseau calcule les sorties

#### 2. Propager les Erreurs en Arrière (Backward Pass)

**Pour une cellule de sortie :**

$$
Err = O(1 - O) \times (T - O)
$$

**Pour une cellule cachée :**

$$
Err = O(1 - O) \times \sum_k (w_k \times Err_k)
$$

#### 3. Corriger les Poids et Biais

$$
\Delta w_{ij} = \lambda \times Err_j \times O_i
$$

$$
\Delta b_j = \lambda \times Err_j
$$

Où :
- $\lambda$ : Taux d'apprentissage (learning rate)
- $Err_j$ : Erreur de la cellule $j$
- $O_i$ : Sortie de la cellule $i$

---

### Schéma de la Rétropropagation

```mermaid
flowchart LR
    subgraph Forward["Propagation avant"]
        F1[Entrées] --> F2[Couches cachées] --> F3[Sorties]
    end
    
    subgraph Backward["Rétropropagation"]
        B1[Erreur de sortie] --> B2[Erreur des couches cachées]
        B2 --> B3[Mise à jour des poids]
    end
    
    Forward -->|"Calcul des sorties<br>et de l'erreur"| Backward
    
    style Forward fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style Backward fill:#fce4ec,stroke:#c62828,stroke-width:2px
```

---

### Calcul de l'Erreur

```mermaid
flowchart LR
    subgraph Output["Cellule de sortie"]
        O1["Err = O(1-O) × (T-O)"]
    end
    
    subgraph Hidden["Cellule cachée"]
        H1["Err = O(1-O) × Σ(wₖ × Errₖ)"]
    end
    
    subgraph Update["Mise à jour"]
        U1["Δwᵢⱼ = λ × Errⱼ × Oᵢ"]
        U2["Δbⱼ = λ × Errⱼ"]
    end
    
    Output --> Update
    Hidden --> Update
    
    style Output fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Hidden fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style Update fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
```

---

## Avantages et Inconvénients

### Inconvénients

| ❌ | Inconvénient | Description |
|----|--------------|-------------|
| ❌ | **Coûteux en apprentissage** | Calculs complexes, peu applicable sur de larges BD |
| ❌ | **Effet boîte noire** | Comportement difficile à expliquer |
| ❌ | **Temps d'entraînement** | Peut être très long pour de grands réseaux |
| ❌ | **Sur-apprentissage** | Risque de mémorisation des données |

### Avantages

| ✅ | Avantage | Description |
|----|----------|-------------|
| ✅ | **Capacité d'apprentissage** | Peut modéliser des relations complexes |
| ✅ | **Généralisation** | Bonne performance sur des données non vues |
| ✅ | **Adaptabilité** | Peut s'adapter à de nouvelles données |
| ✅ | **Applications variées** | Classification, régression, reconnaissance, etc. |

---

### Applications des Réseaux de Neurones

```mermaid
flowchart TD
    A["Réseaux de Neurones"] --> B["Classification"]
    A --> C["Régression / Prédiction"]
    A --> D["Reconnaissance"]
    A --> E["Optimisation"]
    A --> F["Contrôle"]
    
    B --> B1["Spam / Non-spam"]
    B --> B2["Diagnostic médical"]
    C --> C1["Prévision boursière"]
    C --> C2["Prévision météo"]
    D --> D1["Reconnaissance faciale"]
    D --> D2["Reconnaissance vocale"]
    E --> E1["Recherche opérationnelle"]
    F --> F1["Robots"]
    F --> F2["Voitures autonomes"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style D fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style E fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style F fill:#fce4ec,stroke:#c62828,stroke-width:2px
```

---

## Bilan de la Classification

### Techniques de Classification

De nombreuses techniques dérivées de l'IA et des statistiques :

- Règles associatives
- Raisonnement par cas
- Ensembles flous
- Arbres de décision
- Réseaux de neurones
- Machines à vecteurs supports (SVM)
- etc.

### Problème de Passage à l'Échelle

- Certaines techniques (arbres de décision, réseaux) ont des problèmes de passage à l'échelle
- Nécessité de **tester plusieurs techniques** pour résoudre un problème

### Y-a-t-il une Technique Dominante ?

> **Non.** Le choix de la technique dépend du problème, des données disponibles, et des contraintes opérationnelles.

---

### Comparaison des Classifieurs

```mermaid
flowchart LR
    subgraph Methods["Méthodes de classification"]
        M1["Arbres de décision"]
        M2["Réseaux de neurones"]
        M3["SVM"]
        M4["Bayésien naïf"]
        M5["k-NN"]
        M6["Règles associatives"]
    end
    
    subgraph Criteria["Critères de choix"]
        C1["Interprétabilité"]
        C2["Précision"]
        C3["Temps d'apprentissage"]
        C4["Taille des données"]
        C5["Type de données"]
        C6["Complexité du problème"]
    end
    
    Methods --> Criteria
    
    style Methods fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Criteria fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

---

### Synthèse Générale

```mermaid
flowchart TD
    A["Problème de classification"] --> B["Choisir un algorithme"]
    B --> C{"Critères"}
    
    C --> C1["Interprétabilité → Arbre de décision"]
    C --> C2["Précision → SVM / Réseaux"]
    C --> C3["Données simples → Bayésien naïf"]
    C --> C4["Grandes données → Réseaux profonds"]
    
    C1 --> D["Tester plusieurs approches"]
    C2 --> D
    C3 --> D
    C4 --> D
    
    D --> E["Sélectionner la meilleure"]
    E --> F["Modèle final"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style C fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style D fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style E fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style F fill:#e0f7fa,stroke:#00695c,stroke-width:2px
```





# [[00 - Table des Matières]]
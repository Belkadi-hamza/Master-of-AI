
# Séance 3 — Étude cartographique & revue de littérature

## Structurer l’état de l’art pour positionner un projet de recherche en IA

**Module : Méthodologie de la recherche — Master IA**  
**Pr. SADIQ Mounir**  
Faculté des Sciences Ben M'Sick — Université Hassan II de Casablanca

---

## 🔗 Lien avec la séance 2

| Séance 2 | Séance 3 |
|----------|----------|
| Vous avez formulé un **sujet**, une **problématique** et une **question de recherche**. | Vous allez vérifier ce que la **littérature dit déjà** sur ce sujet. |

### Objectif de cette étape

- **Éviter de travailler "dans le vide"**
- **Positionner votre contribution** par rapport à l'existant

### Sortie attendue

- Une **première stratégie de recherche documentaire**
- Un **tableau de synthèse** des articles clés

---

## 🎯 Objectifs de la séance

À la fin de cette séance, vous serez capable de :

1. Comprendre le rôle de l'**étude cartographique** et de la **revue de littérature**.
2. **Différencier** étude cartographique et revue systématique de littérature (RSL).
3. Construire une **stratégie de recherche documentaire** en IA.
4. Organiser les articles dans une **grille de lecture et de synthèse**.
5. Repérer les **tendances, lacunes, méthodes et limites** d'un domaine.

---

## 📚 Pourquoi lire la littérature ?

> La littérature n'est pas une décoration : elle **fonde** la recherche.

### Trois fonctions essentielles

| Comprendre | Positionner | Justifier |
|------------|-------------|-----------|
| Concepts clés | Ce qui est déjà fait | Valeur de votre contribution |
| Approches existantes | Lacunes / limites | Angle scientifique |
| Méthodes dominantes | Où se situe votre projet | Choix méthodologique |
| Datasets et métriques | Originalité de votre approche | Problématique |
| État de l'art général | Contribution attendue | Hypothèses et protocole |

---

## 🗺️ Étude cartographique vs RSL

Les deux sont **complémentaires**, mais n'ont pas le même niveau de focalisation.

### Étude cartographique (*Mapping Study*)

- **Objectif** : cartographier un domaine (vue d'ensemble).
- **Donne** : thèmes, méthodes, tendances.
- **Utile** au début pour comprendre "où se situe" votre sujet.
- **Résultat** : catégories, tableaux, tendances, lacunes.

### Revue systématique (RSL)

- **Objectif** : répondre à une **question précise**.
- **Suit** un protocole explicite et reproductible.
- **Inclut** : critères, sélection, extraction, synthèse.
- **Résultat** : réponse argumentée à la question.

> 💡 **En pratique** : On commence souvent par une **étude cartographique** pour avoir une vision globale, puis on affine avec une **RSL** pour répondre à une question ciblée.

---

## 🔍 Mini-pipeline de recherche documentaire


1. Définir la question documentaire
   ↓
2. Choisir les bases de données
   (Scopus, IEEE, ACM, Springer, ScienceDirect...)
   ↓
3. Construire les mots-clés et équations booléennes
   ↓
4. Appliquer des critères d'inclusion/exclusion
   ↓
5. Sélectionner les articles pertinents
   ↓
6. Extraire les informations dans une grille
   ↓
7. Synthétiser : tendances, méthodes, limites, pistes


---

### Étape 1 — Définir la question documentaire

- Qu'est-ce que je cherche exactement ?
- Quels aspects du sujet vais-je couvrir ?
- Quelles sont les limites temporelles ou géographiques ?

**Exemple** :
> *Quelles sont les approches d'IA utilisées pour la détection de fraude bancaire sur données déséquilibrées, et quelles sont leurs limites ?*

---

### Étape 2 — Choisir les bases de données

| Base | Spécialité |
|------|------------|
| **Scopus** | Multidisciplinaire, large couverture |
| **IEEE Xplore** | Informatique, électronique |
| **ACM Digital Library** | Informatique, IA, HCI |
| **Springer Link** | Sciences, ingénierie |
| **ScienceDirect** | Sciences, médecine, technique |
| **Google Scholar** | Large couverture, utile pour la veille |
| **arXiv** | Prépublications (recherche de pointe) |

---

### Étape 3 — Construire les mots-clés et équations booléennes

#### Principes

- Identifier les **concepts principaux** de la question de recherche.
- Ajouter les **synonymes**, termes proches et variantes (FR/EN).
- Utiliser les **opérateurs booléens** :
  - **AND** : pour combiner des concepts
  - **OR** : pour ajouter des synonymes
  - **NOT** : pour exclure des termes
- Utiliser les **guillemets** pour les expressions exactes.
- Utiliser les **parenthèses** pour grouper.
- Limiter si nécessaire : titre, résumé, mots-clés, période, domaine.
- **Tester plusieurs requêtes** et noter les résultats obtenus.

#### Exemple d'équation booléenne


("bank fraud" OR "fraud detection") 
AND ("deep learning" OR "neural network") 
AND ("imbalanced data" OR "class imbalance")


---

### Étape 4 — Appliquer les critères d'inclusion/exclusion

| Critères d'inclusion | Critères d'exclusion |
|----------------------|----------------------|
| Articles en anglais ou français | Articles sans méthode claire |
| Publiés après 2018 | Études trop anciennes |
| Portant sur le domaine visé | Portant sur un autre domaine |
| Avec évaluation quantitative | Sans évaluation expérimentale |
| Articles de conférences ou revues | Rapports techniques non validés |

---

### Étape 5 — Sélectionner les articles pertinents

1. Lecture des **titres** et **résumés** → sélection initiale.
2. Lecture **intégrale** des articles présélectionnés.
3. Gestion des **doublons** (même article dans plusieurs bases).
4. **Boule de neige** (*snowballing*) : consulter les références citées.

---

### Étape 6 — Extraire les informations dans une grille

**Grille de synthèse type** :

| Article | Année | Méthode | Jeu de données | Métrique principale | Résultat clé | Limites |
|---------|-------|---------|----------------|---------------------|--------------|---------|
| ... | ... | ... | ... | ... | ... | ... |

---

### Étape 7 — Synthétiser

À partir du tableau d'extraction, répondez aux questions suivantes :

- Quelles sont les **tendances** récentes ?
- Quelles **méthodes** sont les plus utilisées ?
- Quelles sont les **limites** communes ?
- Quelles sont les **lacunes** (ce qui n'est pas encore fait) ?
- Quelles **pistes** pour votre propre recherche ?

---

## 📊 Tableau récapitulatif des différences

| Aspect | Étude cartographique | Revue systématique (RSL) |
|--------|----------------------|--------------------------|
| **Objectif** | Vue d'ensemble | Réponse à une question précise |
| **Protocole** | Souple | Rigoureux, reproductible |
| **Sélection** | Large, exploratoire | Ciblée, critères stricts |
| **Résultat** | Catégories, tendances | Synthèse argumentée |
| **Utilisation** | Début de projet | Phase d'approfondissement |

---

## 🧠 Synthèse visuelle


📌 Question documentaire
   ↓
🔍 Bases de données (Scopus, IEEE, ACM...)
   ↓
🔑 Mots-clés + équations booléennes
   ↓
📋 Critères d'inclusion/exclusion
   ↓
📄 Sélection des articles + gestion des doublons
   ↓
📊 Grille d'extraction (tableau de synthèse)
   ↓
📝 Synthèse : tendances, méthodes, limites, lacunes


---

## ✅ À faire avant la prochaine séance

1. 📖 Lire ce support de cours.
2. 📝 Répondre au **quiz diagnostic** sur da3me.
3. 💡 Préparer une **première ébauche** de votre question documentaire.
4. 🔍 Identifier **2 à 3 bases de données** pertinentes pour votre sujet.
5. 📋 Esquisser une **première liste de mots-clés** (FR et EN) avec équations booléennes.

---

**Bon travail et à très vite en séance !**  
L’équipe pédagogique

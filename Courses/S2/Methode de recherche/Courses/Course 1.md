# Méthodologie de la recherche en Intelligence Artificielle

## Cours complet — Master IA

---

## Introduction

Ce cours a pour objectif de former les étudiants aux principes fondamentaux de la recherche scientifique appliquée à l’intelligence artificielle. Il couvre l’ensemble du processus, depuis l’émergence d’une idée jusqu’à la communication des résultats, en passant par la revue de littérature, la conception expérimentale et l’évaluation critique.

---

## 1. Introduction à la recherche en IA

### 1.1. Nature de la recherche scientifique
- La recherche scientifique vise à produire des connaissances nouvelles, validées et reproductibles.
- Elle repose sur une démarche systématique, rigoureuse et critique.

### 1.2. Recherche, développement et veille technologique
- **Recherche** : exploration de concepts nouveaux, modèles théoriques, preuves de concept.
- **Développement** : mise en œuvre pratique, optimisation, industrialisation.
- **Veille technologique** : suivi des évolutions récentes pour anticiper les tendances.

### 1.3. Spécificités de la recherche en IA
- Forte interdisciplinarité (mathématiques, informatique, cognition, éthique).
- Dépendance aux données et à la puissance de calcul.
- Évolution rapide des architectures et des méthodes.

### 1.4. Types de contributions en IA
- Nouvelle architecture (ex. : transformer, CNN, GAN).
- Nouvelle méthode d’optimisation (ex. : nouveaux algorithmes d’apprentissage).
- Nouveau jeu de données ou benchmark.
- Étude d’usage, d’impact ou de biais (éthique, équité).

---

## 2. De l’idée au problème de recherche

### 2.1. Choix du thème et délimitation du sujet
- Partir d’un domaine large (ex. : NLP, vision, robotique).
- Recentrer sur une question précise et originale.
- Tenir compte des ressources disponibles (données, calcul, compétences).

### 2.2. Formulation de la problématique
- La problématique est une question centrale qui structure la recherche.
- Elle doit être :
  - **Pertinente** (enjeu scientifique ou sociétal).
  - **Faisable** (accessible avec les moyens disponibles).
  - **Originale** (apport nouveau par rapport à l’existant).

### 2.3. Construction des questions de recherche
- Décliner la problématique en sous-questions opérationnelles.
- Exemples :
  - *Comment améliorer la robustesse des modèles face aux attaques adversariales ?*
  - *Quel est l’impact de la taille du dataset sur la généralisation en transfer learning ?*

### 2.4. Élaboration des hypothèses
- Les hypothèses sont des réponses provisoires aux questions de recherche.
- Elles doivent être testables et falsifiables (ex. : *L’augmentation de données améliore la robustesse de 15 %*).

### 2.5. Identification des variables et indicateurs
- Variables indépendantes (ex. : architecture, taille du dataset).
- Variables dépendantes (ex. : précision, temps d’inférence).
- Indicateurs quantitatifs ou qualitatifs (métriques, scores, taux d’erreur).

---

## 3. Étude cartographique et revue de littérature

### 3.1. Recherche documentaire scientifique
- Utiliser des bases de données : arXiv, Google Scholar, IEEE Xplore, PubMed, ACL Anthology.
- Définir des mots-clés, opérateurs booléens (AND, OR, NOT) et critères de filtrage.

### 3.2. Étude cartographique (ou *mapping study*)
- **Objectif** : avoir une vision d’ensemble du domaine.
- **Démarche** :
  1. Identifier les travaux majeurs.
  2. Classer les approches par familles (architectures, méthodes, applications).
  3. Visualiser les tendances (chronologie, pays, institutions).

### 3.3. Revue systématique de littérature (RSL)
- **Définition** : synthèse exhaustive et reproductible des travaux existants.
- **Étapes** :
  1. Définition de la question de recherche.
  2. Protocole de recherche (critères d’inclusion/exclusion).
  3. Extraction et synthèse des données.
  4. Analyse critique.
- **Différence avec l’étude cartographique** : la RSL est plus approfondie et critique.

### 3.4. Lecture critique d’articles scientifiques
- Identifier la contribution, la méthode, les résultats, les limites.
- Questionner la validité interne (biais) et externe (généralisation).
- Évaluer la reproductibilité et la disponibilité du code/données.

---

## 4. Designs de recherche et protocoles expérimentaux en IA

### 4.1. Types de recherche
- **Théorique** : preuves mathématiques, complexité, convergence.
- **Empirique** : analyse de données, observations.
- **Expérimentale** : tests contrôlés en environnement maîtrisé.
- **Étude de cas** : analyse approfondie d’une application spécifique.

### 4.2. Construction d’un protocole expérimental
- Définir les conditions de test (ex. : split train/validation/test).
- Choisir les baselines (modèles de référence).
- Planifier les comparaisons (état de l’art, ablation).

### 4.3. Baselines, comparaison et reproductibilité
- Comparer avec des approches existantes (classiques ou récentes).
- Assurer la reproductibilité :
  - Code source public.
  - Paramètres d’entraînement documentés.
  - Initialisations aléatoires maîtrisées.

### 4.4. Bonnes pratiques méthodologiques
- Éviter le *data leakage*.
- Utiliser la validation croisée.
- Réaliser plusieurs runs pour évaluer la stabilité.

### 4.5. Introduction aux tests et analyses statistiques
- Tests de comparaison de moyennes (t-test, ANOVA).
- Mesures d’intervalle de confiance.
- Analyse de la significativité statistique des résultats.

---

## 5. Données, annotation et évaluation

### 5.1. Sources de données en IA
- Données publiques (ImageNet, COCO, SQuAD, Common Crawl).
- Données propriétaires (entreprises, institutions).
- Données synthétiques (générées par simulation ou GAN).

### 5.2. Constitution et sélection d’un dataset
- Représentativité du problème cible.
- Équilibre des classes.
- Volume minimal requis pour l’apprentissage.

### 5.3. Annotation et qualité des données
- Définition des labels et consignes d’annotation.
- Mesure de l’accord inter-annotateurs (kappa de Cohen).
- Contrôle qualité et nettoyage des données.

### 5.4. Biais de données
- Biais de sélection, de mesure, de représentativité.
- Impact sur l’équité et la généralisation.
- Stratégies d’atténuation (rééchantillonnage, pondération).

### 5.5. Choix des métriques d’évaluation
- Classification : exactitude, précision, rappel, F1-score, AUC-ROC.
- Régression : MSE, MAE, R².
- Génération de texte : BLEU, ROUGE, METEOR, BERTScore.

### 5.6. Robustesse, validité et fiabilité
- Tester sous différentes conditions (bruit, dégradation).
- Valider les résultats sur des datasets indépendants.
- Assurer la reproductibilité externe.

---

## 6. IA dans la méthodologie de recherche

### 6.1. Usage des outils d’IA pour la recherche
- Automatisation de la revue de littérature (ex. : Elicit, Connected Papers).
- Aide à la rédaction, à la correction stylistique.

### 6.2. LLM et assistance à la revue de littérature
- Résumé automatique d’articles.
- Extraction d’informations clés (méthodes, résultats).
- Génération de questions critiques.

### 6.3. Aide à l’analyse et à l’expérimentation
- Génération de code (ex. : AutoML, suggestions d’architectures).
- Analyse exploratoire automatisée.

### 6.4. Limites des outils d’IA
- Hallucinations (informations fausses ou inventées).
- Biais des modèles linguistiques.
- Dépendance à la qualité des prompts.

### 6.5. Intégrité scientifique
- Citation correcte des sources.
- Pas de plagiat (ni humain, ni par IA).
- Transparence sur l’utilisation d’outils d’IA.

---

## 7. Élaboration d’un projet de recherche

### 7.1. Structure d’une recherche proposée
- Titre, résumé, introduction, problématique.
- État de l’art, méthodologie, résultats attendus.
- Calendrier et étapes clés.

### 7.2. Justification du sujet et positionnement scientifique
- Montrer la pertinence (originalité, utilité).
- Se positionner par rapport à l’état de l’art (gap identifié).

### 7.3. Intégration des différentes phases
- Étude cartographique → RSL → problématique → protocole → expérimentation.
- Cohérence entre les questions, hypothèses et métriques choisies.

### 7.4. Planification du travail
- Utiliser un diagramme de Gantt ou un calendrier.
- Prévoir des marges pour les imprévus (entraînements longs, données manquantes).

---

## 8. Communication scientifique

### 8.1. Présentation d’un projet de recherche
- Structure : contexte, problématique, méthode, résultats, conclusion.
- Adapter le niveau de détail au public (spécialistes ou généralistes).

### 8.2. Rédaction académique
- Clarté, concision, précision.
- Respect des normes de citation (APA, IEEE, etc.).
- Utilisation de figures et tableaux pour illustrer.

### 8.3. Présentation orale scientifique
- Préparer un support visuel (slides).
- Maîtriser le temps de parole.
- Anticiper les questions du jury.

### 8.4. Poster, article, séminaire
- **Poster** : synthèse visuelle, échanges courts.
- **Article** : publication dans conférence ou revue.
- **Séminaire** : présentation plus longue avec discussions.

### 8.5. Argumentation et défense d’un projet
- Justifier les choix méthodologiques.
- Assumer les limites et proposer des perspectives.
- Répondre aux critiques de manière constructive.

---

## Organisation pédagogique (séances)

Le module est structuré en 8 séances, couvrant l’intégralité du processus de recherche :

| Séance | Intitulé |
|--------|----------|
| 1 | Introduction à la recherche en IA |
| 2 | Formulation du problème, questions, hypothèses |
| 3 | Étude cartographique et revue de littérature |
| 4 | Designs de recherche et protocoles expérimentaux |
| 5 | Données, annotation, biais et métriques |
| 6 | IA, LLM, biais et intégrité scientifique |
| 7 | Élaboration d’une recherche proposée |
| 8 | Communication scientifique et séminaire final |

---

## Modalités de travail (à distance)

Chaque semaine, l’étudiant suit un parcours type :

1. **Lecture / visionnage** de la ressource.
2. **Quiz diagnostic** pour valider les acquis.
3. **Forum** pour échanger sur les points de blocage.
4. **Livrable** : production écrite (1 page, 1 tableau, 1 schéma).
5. **Feedback** et correction type pour progresser.

---

## Conclusion

Ce cours propose une feuille de route complète pour mener un projet de recherche en intelligence artificielle, de l’idée initiale à la communication des résultats. Il insiste sur la rigueur méthodologique, l’esprit critique, l’éthique et l’utilisation raisonnée des outils d’IA.

La recherche en IA est un domaine exigeant mais passionnant, où chaque étape — de la formulation de la question à l’interprétation des résultats — contribue à l’avancement des connaissances. Bonne exploration !
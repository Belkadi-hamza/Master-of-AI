# Partie I : Partie théorique

## 1. QCM Choisir une seule bonne réponse

|     | Q1  | Q2  | Q3  | Q4  | Q5  | Q6  | Q7  | Q8  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A   |     |     |     |     |     |     |     |     |
| B   |     |     |     |     |     |     |     |     |
| C   |     |     |     |     |     |     |     |     |
| D   |     |     |     |     |     |     |     |     |


**Q1. Le principal objectif de MLOps est :**

- [ ] a) améliorer uniquement la précision des modèles
- [x] b) industrialiser le cycle de vie des modèles ML
- [ ] c) remplacer totalement DevOps
- [ ] d) supprimer la nécessité de données de qualité

**Q2. DataOps s’intéresse principalement :**

- [ ] a) au choix des hyperparamètres
- [ ] b) à la visualisation 3D des données
- [x] c) à la fiabilité et à la fluidité des pipelines de données
- [ ] d) uniquement aux tableaux de bord BI

**Q3. La reproductibilité signifie :**

- [ ] a) qu’un modèle est toujours exact
- [x] b) qu’on peut reproduire un résultat à partir des mêmes entrées et conditions
- [ ] c) qu’un pipeline n’a pas besoin de documentation
- [ ] d) qu’un système n’a jamais d’erreurs

**Q4. Lequel des éléments suivants relève le plus directement de MLOps ?**

- [x] a) model registry
- [ ] b) politique RH
- [ ] c) design graphique
- [ ] d) gestion des imprimantes réseau

**Q5. AIOps désigne :**

- [ ] a) un autre nom de DataOps
- [x] b) l’usage de l’IA pour améliorer les opérations IT
- [ ] c) le nettoyage manuel des données
- [ ] d) une méthode d’annotation d’images

**Q6. Dans une logique de hiérarchie des besoins en MLOps, il est difficile de réussir sans :**

- [x] a) CI et versionnement
- [ ] b) slogans marketing
- [ ] c) très grands GPU uniquement
- [ ] d) suppression des tests

**Q7. La dérive d’un modèle désigne :**

- [ ] a) l’arrêt du serveur
- [x] b) la perte de performance ou le changement de comportement lié à l’évolution des données ou du contexte
- [ ] c) le renommage d’un fichier
- [ ] d) une opération de compression

**Q8. Lequel de ces énoncés est correct ?**

- [ ] a) DevOps suffit toujours pour tous les problèmes ML
- [ ] b) MLOps ignore les données
- [x] c) DataOps et MLOps complètent DevOps dans les systèmes pilotés par les données
- [ ] d) LLMOps remplace tout le reste

## 2. Questions directes

1. Pourquoi un notebook de data science ne constitue-t-il pas une solution de production ?

2. Expliquez la différence entre performance expérimentale et robustesse opérationnelle.

3. Pourquoi les systèmes ML dépendent-ils autant des données que du code ?

4. En quoi DataOps prolonge-t-il DevOps ?

5. Citez trois raisons pour lesquelles la traçabilité est indispensable.

6. Pourquoi parle-t-on de cycle de vie d’un modèle et non d’un simple entraînement ?

7. Que signifie considérer une donnée ou un modèle comme un produit ?

## 3. Définitions à rédiger

Donnez les définitions des concepts suivants :

• DevOps
• DataOps
• MLOps
• AIOps
• LLMOps
• reproductibilité
• traçabilité
• gouvernance des données
• monitoring
• dérive des données

## 4. Questions d’analyse

**Analyse 1**

Une équipe de data science dispose d’un modèle performant dans un notebook Jupyter, mais le modèle n’est pas versionné, les données d’entraînement proviennent d’extractions manuelles, et aucun test n’existe sur les features.

**Question :** identifiez les risques majeurs et expliquez pourquoi ce projet n’est pas encore dans une logique MLOps.

**Analyse 2**

Une entreprise veut produire un tableau de bord quotidien à partir de plusieurs sources hétérogènes. Les retards sont fréquents, certaines colonnes changent sans préavis, et les utilisateurs perdent confiance dans les chiffres.

**Question :** expliquez pourquoi cette situation relève d’un problème DataOps.

**Analyse 3**

Une organisation souhaite déployer un assistant conversationnel basé sur un LLM externe.

**Question :** quels nouveaux défis apparaissent par rapport à un système ML classique ?

---

# Partie II : Partie pratique

## Etude de Cas : Passage d’un prototype à une chaîne exploitable

### Contexte

Une équipe universitaire a développé un prototype de prédiction de désabonnement client. Le prototype comprend :

• un notebook Python ;
• un fichier CSV d’entraînement ;
• un modèle sauvegardé localement ;
• une présentation des métriques de performance.

**Cependant :**

• les données ne sont pas versionnées ;
• aucune étape n’est automatisée ;
• le nettoyage des données est fait manuellement ;
• aucune documentation n’existe ;
• le modèle n’est pas surveillé après déploiement ;
• l’équipe métier demande un score hebdomadaire fiable.

### Consigne

À partir de ce contexte, les étudiants doivent produire une analyse structurée du passage nécessaire vers une démarche DataOps/MLOps.

### Travail demandé

1. Identifier les limites du prototype actuel.
2. Classer ces limites selon trois catégories :
	- données
	- modèle
	- opérations / gouvernance.
3. Proposer un cycle de vie cible du système.
4. Distinguer ce qui relève de DataOps et ce qui relève de MLOps.
5. Formuler une première feuille de route en 6 à 8 actions prioritaires.

### Livrables attendus

• un tableau d’analyse des problèmes ;
• un schéma simple du cycle de vie cible ;
• une séparation claire des responsabilités DataOps / MLOps ;
• une mini feuille de route de transformation ;
• une conclusion d’une page : “Pourquoi ce prototype n’est pas encore industrialisable ?”
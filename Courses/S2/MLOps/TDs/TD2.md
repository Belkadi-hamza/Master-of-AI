# Partie I : Partie théorique

## 1. QCM Choisir une seule bonne réponse

|     | Q1  | Q2  | Q3  | Q4  | Q5  | Q6  | Q7  | Q8  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A   |     |     |     |     |     |     |     |     |
| B   |     |     |     |     |     |     |     |     |
| C   |     |     |     |     |     |     |     |     |
| D   |     |     |     |     |     |     |     |     |

**Q1. Le principal objectif d'un pipeline industrialisé est :**

a) remplacer totalement les analystes  
b) automatiser uniquement l'entraînement des modèles  
c) structurer un flux répétable, traçable et contrôlable  
d) réduire uniquement le temps de développement

**Q2. Dans une logique Lean, un gaspillage correspond :**

a) à toute étape technique complexe  
b) à toute activité qui consomme des ressources sans créer de valeur suffisante  
c) uniquement aux erreurs humaines  
d) uniquement aux temps de calcul élevés

**Q3. Le versionnement dans un système MLOps concerne :**

a) uniquement le code Python  
b) uniquement les modèles entraînés  
c) le code, les configurations, les données et les artefacts  
d) uniquement les jeux de test

**Q4. L'orchestration sert principalement à :**

a) écrire du code plus vite  
b) gérer l'enchaînement, la planification et la supervision des tâches  
c) remplacer Git  
d) éviter toute erreur dans les données

**Q5. La CI appliquée aux pipelines permet surtout :**

a) de supprimer le besoin de tests  
b) de détecter rapidement certaines erreurs après modification  
c) de garantir à elle seule la qualité métier  
d) de remplacer l’orchestration

**Q6. Un pipeline ML se distingue d’un pipeline de données car il inclut :**

a) le stockage brut uniquement  
b) les étapes de collecte manuelle  
c) l’entraînement, l’évaluation et la gestion des modèles  
d) uniquement la visualisation des résultats

**Q7. Un environnement reproductible est un environnement :**

a) utilisé uniquement en production  
b) dont les dépendances et paramètres sont explicités et reconstruisibles  
c) qui ne change jamais  
d) qui ne contient aucun package externe

**Q8. La logique Agile dans un projet data consiste principalement à :**

a) éviter toute documentation  
b) supprimer la planification  
c) travailler par itérations avec feedback et adaptation  
d) empêcher toute évolution du pipeline

**Q8. Lequel de ces énoncés est correct ?**

a) DevOps suffit toujours pour tous les problèmes ML  
b) MLOps ignore les données  
c) DataOps et MLOps complètent DevOps dans les systèmes pilotés par les données  
d) LLMOps remplace tout le reste

---

## 2. Questions directes

1. Définir la notion de pipeline dans un contexte data ou ML.  
2. Expliquer la différence entre pipeline de données et pipeline ML.  
3. Pourquoi le versionnement des seules sources de code est-il insuffisant en MLOps ?  
4. En quoi la cartographie du flux de valeur aide-t-elle à améliorer un système de traitement ?  
5. Pourquoi un pipeline peut-il être techniquement correct mais organisationnellement inefficace ?  
6. Quel est le rôle de l’orchestration dans la robustesse du workflow ?  
7. Pourquoi la CI est-elle importante même avant le déploiement final ?

---

## 3. Définitions à rédiger

Donner une définition claire et concise des notions suivantes :

- Lean Thinking
- Agile Collaboration
- flux de valeur
- pipeline de données
- pipeline ML
- versionnement
- environnement reproductible
- orchestration
- continuous integration

---

## 4. Questions d’analyse

**Analyse 1**

Une équipe dispose de trois notebooks exécutés manuellement chaque semaine :

- notebook 1 : extraction des données CRM,
- notebook 2 : nettoyage et agrégation,
- notebook 3 : entraînement d’un modèle de scoring.

Aucune version des données n’est conservée, les dépendances Python diffèrent selon les postes, et les résultats sont envoyés par email.

**Questions :**

1. Pourquoi ce système est-il artisanal ?  
2. Identifier au moins cinq risques.  
3. Proposer les premiers éléments de transformation vers un pipeline industrialisé.

**Analyse 2**

Une organisation affirme être “Agile” parce qu’elle fait une réunion hebdomadaire, mais :

- les scripts ne sont pas mutualisés,
- les changements ne sont pas tracés,
- les erreurs sont découvertes tardivement,
- chaque équipe travaille dans son coin.

**Questions :**

1. Pourquoi cette organisation n’est-elle pas réellement Agile au sens DataOps ?  
2. Quels principes du DataOps Manifesto semblent manquer ?  
3. Quels changements de pratiques proposeriez-vous ?

**Analyse 3**

Deux étudiants exécutent le même script d’entraînement sur des machines différentes et obtiennent des résultats distincts.

**Questions :**

1. Donner trois causes possibles.  
2. En quoi cela relève-t-il d’un problème de reproductibilité ?  
3. Quelles mesures techniques permettraient de réduire ce problème ?

---

# Partie II : Partie pratique

## TP : Structuration d’un pipeline data/ML simple

### Contexte

Vous êtes chargés d’analyser un mini cas de projet ML académique. Le projet vise à produire un score de risque à partir d’un fichier CSV contenant des données clients. Actuellement, le workflow est le suivant :

- un fichier CSV est déposé manuellement ;
- un script Python nettoie les colonnes ;
- un autre script entraîne un modèle ;
- un notebook génère des métriques ;
- un fichier final est exporté manuellement.

Aucun orchestrateur n’est utilisé, le versionnement des données n’est pas formalisé, et l’équipe ne sait pas clairement quelles étapes doivent être automatisées.

---

### Travail demandé

#### Exercice pratique 1 — Cartographie du pipeline existant

**Consigne :**

Représenter le pipeline actuel sous forme de schéma ou de liste structurée.

**Étapes :**

1. Identifier les entrées ;
2. Identifier chaque étape de traitement ;
3. Identifier les sorties intermédiaires ;
4. Identifier la sortie finale ;
5. Repérer les tâches manuelles.

**Livrable attendu :**

- un schéma simple du pipeline actuel ;
- une liste des points de fragilité.

---

#### Exercice pratique 2 — Identification des éléments versionnables

**Consigne :**

Dresser un tableau des objets à versionner dans ce projet.

**Étapes :**

1. Lister le code source ;
2. Lister les jeux de données ou références de données ;
3. Lister les configurations ;
4. Lister les artefacts de sortie ;
5. Lister les dépendances d’environnement.

**Livrable attendu :**

- un tableau à 3 colonnes : élément / pourquoi versionner / outil ou mécanisme envisagé.

---

#### Exercice pratique 3 — Proposition d’architecture simple

**Consigne :**

Proposer une architecture minimale de pipeline industrialisé utilisant :

- Git ;
- DVC ou logique équivalente ;
- un orchestrateur ;
- un environnement reproductible.

**Étapes :**

1. Définir ce qui est géré par Git ;
2. Définir ce qui est géré par DVC ou stockage d’artefacts ;
3. Décrire le rôle de l’orchestrateur ;
4. Décrire le mécanisme de reproductibilité ;
5. Décrire le déclenchement du pipeline.

**Livrable attendu :**

- un schéma d’architecture ;
- un texte explicatif de 10 à 15 lignes.

---

#### Exercice pratique 4 — Lecture critique d’un pipeline artisanal

**Consigne :**

À partir du pipeline initial, rédiger une critique structurée.

**Points à analyser :**

- manque de modularité ;
- dépendance aux manipulations manuelles ;
- absence de versionnement ;
- faible reproductibilité ;
- absence de contrôle automatisé ;
- difficulté de passage à l’échelle.

**Livrable attendu :**

- une note critique de 1 à 2 pages.

---

#### Exercice pratique 5 — Organisation d’un workflow cible

**Consigne :**

Construire un workflow cible avec les étapes suivantes :

- ingestion,
- validation minimale,
- transformation,
- entraînement,
- évaluation,
- enregistrement de l’artefact,
- journalisation de l’exécution.

**Étapes :**

1. Définir l’ordre des tâches ;
2. Définir les dépendances ;
3. Identifier les points de contrôle ;
4. Identifier les sorties ;
5. Proposer une fréquence ou un mode de déclenchement.

**Livrable attendu :**

- un diagramme de workflow ;
- une justification des choix de structuration.
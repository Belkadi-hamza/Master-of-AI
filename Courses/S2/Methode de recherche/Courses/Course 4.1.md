# Introduction à la recherche en IA

## Module : Méthodologie de recherche — Master IA

**Pr. SADIQ Mounir**  
Faculté des Sciences Ben M'Sick — Université Hassan II de Casablanca

---

## Objectif de la séance

Comprendre ce qu’est la recherche en intelligence artificielle et distinguer les principaux types de contributions scientifiques.

### Plan de la séance

- Définir la recherche en IA
- Distinguer recherche, développement et veille
- Comprendre les types de contributions : architecture, optimisation, données, usage

---

## Objectifs pédagogiques

À la fin de cette séance, l’étudiant sera capable de :

- Comprendre ce qu’est la recherche scientifique en intelligence artificielle.
- Distinguer recherche, développement technique et veille technologique.
- Identifier les grands types de contributions scientifiques en IA.

---

## 1. Qu’est-ce que la recherche ?

### La recherche scientifique

- Produit une connaissance **nouvelle** ou **utile** à la communauté.
- Répond à une **question précise** à l’aide d’une méthode rigoureuse.
- Explique, compare, améliore ou généralise un phénomène.

### Ce que la recherche n’est pas

- ❌ Répéter un tutoriel sans question scientifique.
- ❌ Coder une application sans analyser ce qu’elle apporte.
- ❌ Choisir un modèle “par habitude” sans justification.

---

## QCM — Qu’est-ce que la recherche ? (Partie 1)

**1. Une recherche scientifique vise surtout à :**  
A. répéter un tutoriel existant  
B. produire une connaissance nouvelle ✅  
C. coder vite une application  
D. choisir un modèle au hasard

**2. Une recherche répond à :**  
A. une question précise ✅  
B. toutes les questions possibles  
C. une intuition sans méthode  
D. un besoin de programmation uniquement

**3. La recherche peut surtout :**  
A. expliquer ou comparer un phénomène ✅  
B. éviter toute justification  
C. supprimer les données  
D. remplacer l’expérimentation

---

## QCM — Qu’est-ce que la recherche ? (Partie 2)

**4. Ce qui n’est pas de la recherche, c’est :**  
A. analyser un problème avec méthode  
B. comparer plusieurs approches  
C. coder une application sans analyser son apport ✅  
D. répondre à une question scientifique

**5. Répéter un tutoriel sans question scientifique revient à :**  
A. une recherche complète  
B. une activité non scientifique ✅  
C. une preuve rigoureuse  
D. une généralisation théorique

**6. Choisir un modèle “par habitude” sans justification signifie :**  
A. une démarche scientifique rigoureuse  
B. une bonne pratique de recherche  
C. une absence d’argument scientifique ✅  
D. une validation expérimentale

---

## 2. Recherche, développement, veille

Trois activités proches mais différentes :

| Activité          | Objectif principal                                              |
| ----------------- | --------------------------------------------------------------- |
| **Recherche**     | Produire un savoir nouveau, expliquer ou démontrer un gain.     |
| **Développement** | Réaliser une application, un prototype ou un outil fonctionnel. |
| **Veille**        | Suivre l’évolution des outils, modèles et tendances du domaine. |

> 💡 Un bon mémoire de Master peut combiner les trois, mais la **contribution scientifique** doit être explicite.

---

## Activité 1 — Recherche ou développement ?

### Consigne

Lisez les deux situations suivantes :  
(a) *“J’ai créé une application qui utilise un modèle existant.”*  
(b) *“J’ai comparé trois modèles pour montrer lequel est le plus robuste au brouillard.”*

### Questions

1. Indiquez laquelle correspond plutôt à du développement et laquelle relève davantage de la recherche.  
2. Justifiez votre réponse en une phrase simple.  
3. Donnez un exemple personnel ou imaginaire dans le domaine de l’IA.

---

### Réponses attendues

1. La situation **(a)** correspond plutôt au **développement** (utilisation d’un modèle existant).  
   La situation **(b)** relève davantage de la **recherche** (comparaison pour produire une connaissance).

2. Justification : le développement cherche à construire un outil fonctionnel, alors que la recherche cherche à **analyser, comparer et expliquer**.

3. Exemple :  
   - *Développement* : « J’ai conçu une application qui résume automatiquement des cours avec un modèle déjà disponible. »  
   - *Recherche* : « J’ai comparé deux méthodes de résumé pour savoir laquelle est la plus fiable sur des textes académiques. »

> ✅ À retenir : créer un outil avec un modèle existant = plutôt développement ; comparer et justifier scientifiquement = plutôt recherche.

---

## 3. Spécificités de la recherche en IA

Pourquoi la recherche en IA a sa propre logique méthodologique.

### Particularités du domaine

- Elle s’appuie sur des **modèles**, des **données** et des **protocoles expérimentaux**.
- Elle nécessite des **métriques** pour évaluer les performances : accuracy, F1-score, robustesse, etc.
- Elle doit tenir compte des **biais**, de la **reproductibilité** et des **conditions de test**.
- Elle mélange souvent dimensions techniques, expérimentales et **socio-techniques**.

---

### Modèles, données et protocole

> Une expérience en IA ne se résume pas à “faire tourner un modèle”.

- La recherche en IA s’appuie toujours sur trois éléments :  
  - **un modèle** (le programme IA)  
  - **des données** (exemples d’apprentissage)  
  - **un protocole expérimental** (comment on entraîne et on teste)

- Sans protocole clair, on ne peut pas comparer les résultats de manière scientifique.

**Exemple simple** : Reconnaître “chat” ou “chien” — modèle = programme IA ; données = images ; protocole = séparation entraînement / test.

---

### Métriques de performance

> En IA, on évalue avec des mesures, pas seulement avec une impression générale.

- Une métrique indique si le modèle fonctionne bien : accuracy, F1-score, robustesse, temps de réponse, etc.
- Ces mesures permettent de comparer deux approches dans les mêmes conditions.
- Selon le problème, une seule métrique ne suffit pas toujours pour juger la qualité réelle du système.

**Exemple simple** : Si un modèle trouve 90 bonnes réponses sur 100 images, son accuracy est de 90 %. Mais il peut rester faible sur les cas difficiles.

---

### Biais, reproductibilité et test

> Un bon résultat doit être fiable, juste et reproductible.

- Les résultats peuvent être trompeurs si les données sont **biaisées** ou si les tests sont trop faciles.
- La **reproductibilité** signifie qu’un autre chercheur doit pouvoir refaire l’expérience et retrouver un résultat proche.
- Les conditions de test doivent représenter la réalité : jour/nuit, clair/brouillard, données variées, etc.

**Exemple simple** : Un modèle entraîné seulement avec des visages pris le jour peut échouer la nuit : il y a alors un **biais de données et de test**.

---

### Dimension socio-technique

> La recherche en IA ne concerne pas seulement l’algorithme, mais aussi son usage réel.

- La recherche en IA mélange souvent dimension technique, expérimentation et **impact humain ou social**.
- Il faut étudier non seulement la performance du système, mais aussi la façon dont il est utilisé.
- Cette approche est essentielle dans des domaines comme l’éducation, la santé, la justice ou les transports.

**Exemple simple** : Un assistant IA pour étudiants peut être techniquement bon, mais poser des questions d’éthique, de dépendance ou d’équité.

---

## 4. Types de contributions en IA

Quatre familles à connaître pour débuter :

| Type de contribution | Description |
|----------------------|-------------|
| **Nouvelle architecture** | Proposer une nouvelle structure de modèle. |
| **Nouvelle méthode d’optimisation** | Entraîner plus vite, plus stablement ou avec moins de ressources. |
| **Nouvelles données / benchmark** | Créer des jeux de données ou de nouvelles évaluations. |
| **Étude d’usage / d’impact** | Comprendre comment un système IA est utilisé dans la réalité. |

---

### Contribution 1 — Nouvelle architecture

> Changer l’organisation du modèle.

- Une architecture décrit comment les couches ou blocs sont organisés dans un réseau.
- Exemples connus : CNN, ResNet, Transformer.
- L’objectif peut être : mieux apprendre, aller plus vite ou être plus robuste.
- La recherche doit montrer le gain par comparaison avec des architectures existantes.

---
#### Activité 2 — Comprendre une architecture

**Consigne** : Imaginez une maison : en changeant la structure des pièces, des couloirs ou des renforts, on peut améliorer la circulation ou la stabilité.

**Questions** :
1. Expliquez en quoi cette analogie aide à comprendre une “architecture” en IA.
2. Donnez un exemple simple d’amélioration possible dans une structure.
3. Concluez : pourquoi une nouvelle architecture peut être une contribution scientifique ?

---

**Réponses attendues** :

1. Comme dans une maison, la manière d’organiser les pièces, les couloirs ou les renforts change le fonctionnement global. En IA, l’architecture désigne la façon d’organiser les couches et les connexions d’un modèle.

2. Ajouter un “raccourci” entre deux parties d’un réseau, comme on ajoute un passage direct dans une maison, peut faciliter la circulation de l’information et améliorer l’apprentissage du modèle.

3. Parce qu’une nouvelle architecture peut permettre au modèle d’apprendre mieux, plus vite ou plus efficacement. Si cette amélioration est démontrée par des tests rigoureux, elle devient une véritable contribution scientifique.

---

### Contribution 2 — Nouvelle méthode d’optimisation

> Changer la façon d’entraîner le modèle.

- L’optimisation sert à mettre à jour les paramètres pour que le modèle apprenne.
- Exemples : SGD, Momentum, Adam, AdamW.
- Une nouvelle méthode peut converger plus vite ou être plus stable sur des données difficiles.
- Elle peut aussi réduire le coût en mémoire, calcul ou énergie.

---

#### Activité 3 — Optimiser, c’est descendre une montagne

**Consigne** : Imaginez que vous devez descendre une montagne dans le brouillard pour trouver le point le plus bas.

**Questions** :
1. Pourquoi une méthode à petits pas peut être lente ?
2. Pourquoi une méthode à grands pas peut être risquée ?
3. Pourquoi une méthode “adaptative” peut être utile ?

---

**Réponses attendues** :

1. Une méthode à petits pas est lente car elle avance très doucement vers le point le plus bas. Elle évite les grands risques, mais elle peut demander beaucoup de temps avant d’arriver à une bonne solution.

2. Une méthode à grands pas est risquée car elle peut aller trop vite, dépasser le bon chemin ou manquer le point le plus bas. En optimisation, cela revient à rater une bonne solution ou à rendre l’apprentissage instable.

3. Une méthode adaptative est utile car elle ajuste la taille des pas selon la situation : elle peut aller plus vite quand le terrain est simple et ralentir quand le chemin devient difficile. Cela aide à apprendre plus efficacement et plus sûrement.

---

### Contribution 3 — Données et benchmark

> Ce que l’on mesure influence ce que l’on développe.

- Un dataset de qualité permet de tester un modèle dans des conditions crédibles.
- Un benchmark définit comment comparer les méthodes entre elles.
- Créer un dataset plus réaliste, plus équilibré ou plus difficile est une vraie contribution.
- On peut aussi proposer de nouvelles métriques d’évaluation.

---

#### Activité 4 — Qu’est-ce qui manque dans les données ?

**Consigne** : On vous donne un dataset de conduite autonome composé uniquement d’images prises de jour et par beau temps.

**Questions** :
1. Quels problèmes ce dataset pose-t-il pour la recherche ?
2. Quelles situations réelles manquent-elles ?
3. En quoi ajouter du brouillard, de la pluie ou de la nuit pourrait-il constituer une contribution ?

---

**Réponses attendues** :

1. Ce dataset est limité, car il ne représente pas toute la réalité. Un modèle entraîné uniquement sur des images de jour et par beau temps risque de fonctionner mal dans d'autres conditions.

2. Il manque des situations comme la nuit, la pluie, le brouillard, les ombres fortes, les routes mouillées ou une faible visibilité. Or, ces cas sont fréquents en conduite réelle.

3. Ajouter ces cas rend le dataset plus riche et plus réaliste. Cette amélioration permet de mieux tester les modèles et peut aider la recherche à développer des systèmes plus robustes et plus utiles.

---

### Contribution 4 — Études d’usage et d’impact

> Observer l’IA dans son contexte réel.

- Ici, on ne propose pas forcément un nouveau modèle : on étudie l’usage réel du système.
- Exemples : impact d’un assistant IA sur les étudiants, sur des médecins ou sur des usagers.
- Les méthodes peuvent être : questionnaires, entretiens, observation, analyse de traces.
- La contribution est souvent **socio-technique** : adoption, confiance, utilité, effets inattendus.

---

#### Activité 5 — Observer l’usage réel de l’IA

**Consigne** : Imaginez qu’un assistant IA est utilisé par des étudiants pour rédiger des devoirs universitaires.

**Questions** :
1. Que veut-on observer ici : le modèle lui-même ou son usage réel ?
2. Donnez deux effets possibles de cet assistant IA sur les étudiants.
3. Citez une méthode simple pour étudier cet usage (questionnaire, entretien, observation, traces…).

---

**Réponses attendues** :

1. Ici, on veut surtout observer l’**usage réel** de l’assistant IA : comment les étudiants l’utilisent, dans quelles situations et avec quels effets sur leur travail.

2. **Effet positif** : l’assistant peut aider l’étudiant à mieux structurer ses idées ou gagner du temps.  
   **Effet négatif** : il peut aussi rendre l’étudiant trop dépendant ou réduire son effort personnel.

3. On peut utiliser un **questionnaire**, un **entretien**, une **observation** en classe ou l’**analyse des traces** d’utilisation. Ces méthodes aident à comprendre l’adoption, la confiance et l’utilité réelle du système.

---

## Transition vers la suite

Après avoir compris ce qu’est la recherche en IA et les types de contributions, nous passons maintenant à une nouvelle étape :

### ➡️ De l’idée au problème de recherche

> **Idée clé** : avant de chercher dans la littérature, il faut savoir quel sujet précis on veut étudier et quelle question on veut poser.

---

**Fin de la séance — merci pour votre attention !**
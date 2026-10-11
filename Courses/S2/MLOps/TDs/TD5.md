## Partie I : Partie théorique

### 1. QCM Choisir une seule bonne réponse

| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|----|----|----|----|----|----|----|----|
| a  |    |    |    |    |    |    |    |
| b  |    |    |    |    |    |    |    |
| c  |    |    |    |    |    |    |    |
| d  |    |    |    |    |    |    |    |

**Q1. La continuous integration (CI) dans un projet ML consiste principalement à :**

a) remplacer tous les développeurs  
b) vérifier automatiquement les changements intégrés  
c) supprimer les tests manuels  
d) entraîner automatiquement tous les modèles en production

**Q2. Dans un projet ML, un pipeline CI peut inclure :**

a) uniquement des métriques de précision  
b) uniquement des tests unitaires  
c) des tests de code, de dépendances et de service  
d) uniquement l'entraînement complet du modèle

**Q3. Le packaging permet principalement de :**

a) visualiser les données  
b) transformer le composant en artefact installable et versionné  
c) supprimer les dépendances  
d) remplacer Docker

**Q4. Un conteneur permet surtout de :**

a) stocker des données non structurées  
b) normaliser l'exécution d'une application et de ses dépendances  
c) remplacer le versionnement Git  
d) optimiser automatiquement le modèle

**Q5. Le principe "build once, run many" signifie que :**

a) on entraîne un modèle une seule fois  
b) on utilise le même artefact construit pour plusieurs environnements  
c) on interdit la mise à jour des versions  
d) on exécute plusieurs modèles dans un seul conteneur

**Q6. Le canary deployment consiste à :**

a) supprimer l'ancienne version avant la nouvelle  
b) déployer la nouvelle version sur 100 % du trafic immédiatement  
c) exposer progressivement une petite partie du trafic à la nouvelle version  
d) exécuter le modèle uniquement en local

**Q7. Un service ML batch est surtout adapté lorsque :**

a) une réponse temps réel est indispensable  
b) le traitement peut être planifié à intervalles réguliers  
c) aucune donnée n'est disponible  
d) le modèle doit répondre à chaque clic utilisateur

**Q8. Parmi les tests suivants, lequel vérifie surtout que le service démarre ?**

a) test de charge  
b) smoke test  
c) test de fairness  
d) test A/B

---

### B. Questions directes

1. Définir la continuous integration dans le contexte d'un projet ML.

2. Expliquer la différence entre CI et CD.

3. Pourquoi la conteneurisation est-elle particulièrement importante en machine learning ?

4. Donner trois différences entre un déploiement batch et un déploiement par API.

5. Citer quatre étapes d'un pipeline de déploiement.

6. Pourquoi les tests de déploiement sont-ils nécessaires même si le modèle fonctionne en notebook ?

7. Expliquer en quoi le packaging contribue à la discipline d'ingénierie.

8. Donner un cas où un déploiement canary serait préférable à un déploiement recreate.

---

### C. Définitions à rédiger

Les étudiants doivent rédiger une définition claire pour chacun des termes suivants :

- continuous integration
- continuous delivery
- packaging
- conteneurisation
- service ML
- microservice
- pipeline de déploiement
- smoke test
- canary deployment
- cloud-native

---

### D. Questions d'analyse

1. Pourquoi un excellent modèle peut-il échouer en production malgré de bonnes performances offline ?

2. En quoi l'automatisation du déploiement réduit-elle le risque organisationnel ?

3. Peut-on mettre en place une CI/CD utile sans réentraîner le modèle à chaque modification ? Justifier.

4. Pourquoi le déploiement d'un modèle doit-il être pensé comme le déploiement d'un service et non comme la simple copie d'un fichier ?

5. Quel est le lien entre déploiement industrialisé et observabilité future ?

---

### E. Mini étude de cas

#### Cas

Une entreprise a développé un modèle de prédiction de churn. Actuellement :

- le code est exécuté depuis un notebook ;
- un ingénieur exporte manuellement le modèle ;
- le fichier est copié sur un serveur ;
- les dépendances sont installées manuellement ;
- l'équipe métier consomme les résultats via un script lancé à la demande ;
- aucune stratégie de versioning de déploiement n'est formalisée.

#### Travail demandé

1. Identifier au moins six risques techniques ou organisationnels.

2. Proposer une cible d'industrialisation en s'appuyant sur les notions du chapitre.

3. Dire si le service doit être batch, API ou microservice, et justifier.

4. Proposer une stratégie de rollout adaptée.

5. Proposer trois tests de déploiement indispensables.
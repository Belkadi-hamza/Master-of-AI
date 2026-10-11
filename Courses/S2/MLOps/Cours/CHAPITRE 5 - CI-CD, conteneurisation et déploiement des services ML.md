## Chapitre 5 : CI/CD, conteneurisation et déploiement des services ML

---

### Objectifs :

• Comprendre la logique CI/CD en contexte ML
• Découvrir le packaging et la conteneurisation
• Comprendre comment déployer un service ML fiable
• Identifier les tests avant mise en production
• Comparer les stratégies de déploiement

---

### Contenu :

• Pourquoi industrialiser le déploiement ML
• Continuous Integration et Continuous Delivery
• Packaging des composants ML
• Conteneurisation avec Docker
• Services ML : batch, API, microservice, serverless
• Pipeline de déploiement, tests et rollout

---

## Introduction

Après avoir étudié les fondements disciplinaires de MLOps et DataOps, les pipelines et l'orchestration, puis la qualité, les tests, les contrats de données, et enfin la reproductibilité ainsi que la gestion du cycle de vie des modèles, ce chapitre aborde la question centrale de la mise en production industrialisée.

• En amont : qualité des données, reproductibilité et cycle de vie fournissent un modèle validé, prêt à être industrialisé.
• Ce chapitre : transformer un modèle validé en service fiable, testé et déployable de façon reproductible.
• En aval : une fois en production, le service doit être surveillé et gouverné dans la durée (chapitre 6).

---

## Plan

01 Pourquoi industrialiser ?
02 CI : contrôler les changements
03 CD : livrer un système déployable
04 Packaging & conteneurs
05 Service ML : batch, API, microservice
06 Rollout, tests et cloud-native

Code → Tests → Package → Container → Deploy → Observe

---

## L'intérêt d'un pipeline industrialisé

### 01 Pourquoi industrialiser ?

#### Erreurs humaines
Étapes oubliées, versions mélangées, configuration incohérente entre environnements.

#### Faible traçabilité
Aucune trace fiable de ce qui a été déployé, quand, et par qui.

Un déploiement manuel repose sur des étapes exécutées « à la main » par un ingénieur : copier le modèle, configurer l'environnement, relancer le service.

#### Rollback difficile
Revenir à la version précédente en cas d'incident n'est ni rapide ni garanti.

Cette approche fonctionne pour un prototype isolé, mais ne passe pas à l'échelle dès que les mises à jour deviennent fréquentes.

#### Faible reproductibilité
Impossible de garantir que « ça marche pareil » sur une autre machine.

#### Lenteur
Chaque mise à jour du modèle mobilise du temps d'ingénierie non automatisé.

---

## L'intérêt d'un pipeline industrialisé

### Sans Pipeline
• Déploiement ad hoc, dépendant d'une personne
• Étapes manuelles non standardisées
• Tests exécutés de façon irrégulière
• Traçabilité faible ou inexistante
• Rollback lent, incertain

### Avec Pipeline CI/CD
• Déploiement automatisé et standardisé
• Étapes identiques à chaque exécution
• Tests systématiques avant promotion
• Historique complet des versions déployées
• Rollback

---

## Déploiement manuel vs pipeline industrialisé

### Définition
AIT DAOUD, M. (2025)

Le Déploiement est processus par lesquels un composant de données ou de machine learning validé est mis en service dans un environnement cible, de manière contrôlée, reproductible et exploitable.

### Risques : 
dépendance humaine, erreurs, faible traçabilité, rollback difficile.

• Notebook
• Export fichier
• Copie serveur
• Install manuelle
• Run script

### Bénéfices : 
automatisation, reproductibilité, traçabilité, validation continue.

• Commit
• Tests
• Build
• Deploy staging
• Promote

---

## CI : contrôler les changements

### Définition
Atwal, H. (2019). IBM (Qu'est-ce qu'un DAG ?)

La CI est la pratique qui consiste à intégrer automatiquement les changements de code dans un dépôt partagé, en déclenchant une suite de contrôles (tests, linting, validation) à chaque commit ou pull request.

### Validation locale
• Exécutée manuellement, sur le poste du développeur
• Dépend de son environnement personnel
• Non systématique, facilement oubliée
• Aucune trace partagée avec l'équipe

### Intégration continue (CI)
• Déclenchée automatiquement à chaque changement
• Exécutée dans un environnement standardisé
• Systématique : impossible à oublier
• Résultats visibles et partagés par toute l'équipe

---

## CI : contrôler les changements

En contexte ML, la CI peut vérifier :

**Code** : lint, format, tests unitaires
**Données** : schéma, colonnes, types
**Modèle** : chargement, version, compatibilité
**Service** : endpoint, contrat
**Sécurité** : profile, permissions
**Config & infra** : dépendances

La CI en ML ne doit pas être confondue avec le réentraînement automatique à chaque commit. Dans de nombreux cas, la CI s'intéresse d'abord à la validité du système, non à la performance finale sur un nouvel apprentissage complet.

Utiliser GitHub Actions pour automatiser la CI selon une logique événementielle.

---

## CD : livrer un système déployable

### Définition
AIT DAOUD, M. (2025)

La continuous delivery vise à rendre le système déployable à tout moment, grâce à une chaîne automatisée qui produit un artefact prêt pour la mise en production. La différence essentielle avec la CI est que la CD s'intéresse à la livraison jusqu'au seuil du déploiement, voire au déploiement lui-même selon les politiques de l'organisation.

• La CI garantit qu'à chaque étape, l'artefact produit est testé et fiable avant de passer à la suivante.
• La CD orchestre le passage de cet artefact d'un environnement à l'autre, jusqu'au service exposé et surveillé.

Le principe « build once, run many »

---

## CI/CD pipeline

Pipeline CI/CD pour Data / ML

---

## Packaging d'un projet ML

### Définition
AIT DAOUD, M. (2025) / Atwal, H. (2019). Practical DataOps

Encapsuler un projet, un modèle ou un service ML dans une forme organisée, stable et réutilisable, afin de faciliter son exécution, son partage son intégration et sa préparation au déploiement.

• Le packaging structure et fige le contenu logique (code, version, dépendances déclarées).
• La conteneurisation va plus loin : elle fige aussi l'environnement d'exécution complet (système, runtime, bibliothèques systèmes).
• Un composant bien empaqueté rend la conteneurisation simple, prévisible et reproductible.

---

## Conteneurisation

### Définition
AIT DAOUD, M. (2025)

La conteneurisation consiste à encapsuler une application avec ses dépendances et sa configuration d'exécution dans une unité standardisée appelée conteneur. Le conteneur est généralement construit à partir d'une image.

**Image** : Modèle d'exécution : code + dépendances + configuration, prêt à être instancié.
**Conteneur** : Instance en cours d'exécution d'une image, isolée du système hôte.
**Moteur** : Moteur qui exécute les conteneurs à partir des images (ex. Docker Engine).

La conteneurisation ne doit pas être considérée comme un simple détail technique : elle est un instrument de standardisation.

---

## Bonnes pratiques de conteneurisation

**Image légère** : Limiter les couches et les paquets inutiles pour réduire taille et surface d'attaque.
**Dépendances figées** : Verrouiller précisément les versions pour garantir un comportement stable.
**Séparation claire** : Un conteneur = une responsabilité (le service, pas la base de données).
**Pas de secrets dans l'image** : Les identifiants et clés sont injectés à l'exécution, jamais gravés dans l'image.
**Commande de démarrage explicite** : Le point d'entrée du conteneur est documenté et déterministe.

---

## Service ML : batch, API, microservice

### Définition
AIT DAOUD, M. (2025)

Un service ML est une unité applicative qui met à disposition une fonctionnalité fondée sur un modèle ou un pipeline de traitement. Cette fonctionnalité peut prendre plusieurs formes selon le besoin métier.

| Forme | Principe | Avantage | Limite |
|-------|----------|----------|--------|
| Batch | Traitement périodique de gros volumes | Simple, efficace en masse | Résultats non immédiats |
| API | Réponse synchrone à une requête | Faible latence, interactif | Doit rester disponible |
| Microservice | Composant indépendant dans une architecture | Modulaire, évolutif | Complexité d'orchestration |
| Serverless | Exécution à la demande, sans gestion d'infra | Coût à l'usage, élastique | Démarrage à froid possible |

---

## Le microservice ML dans un système distribué

### Définition
AIT DAOUD, M. (2025)

Le microservice est une approche architecturale dans laquelle une fonctionnalité métier est exposée sous forme de service autonome.

Un microservice ML encapsule une capacité de prédiction unique, exposée par une interface claire et stable.

• Modularité : chaque microservice peut évoluer, être testé et redéployé indépendamment des autres.
• Indépendance de déploiement : une mise à jour du modèle n'impacte pas le reste du système d'information.
• Interface claire : le contrat (entrées/sorties) est ce qui découple le microservice du reste de l'architecture.

---

## Le pipeline de déploiement

### Définition
AIT DAOUD, M. (2025)

Le pipeline de déploiement est l'enchaînement automatisé des étapes conduisant d'un changement validé à un composant mis à disposition dans un environnement cible.

Le pipeline organise la promotion depuis le commit jusqu'à la production.

---

## Tests de déploiement

**Smoke tests** : Le service démarre-t-il et répond-il de façon minimale ?
**Tests de contrat** : Le format des entrées/sorties respecte-t-il le contrat attendu ?
**Tests d'intégration** : Les composants (API, modèle, données) fonctionnent-ils ensemble ?
**Tests de performance** : Le service tient-il la charge et la latence attendues ?
**Tests de sécurité** : Le service résiste-t-il aux entrées malveillantes ou non autorisées ?
**Tests fonctionnels d'inférence** : Les prédictions renvoyées sont-elles correctes sur des cas connus ?

Tests production contrôlé canary / monitoring initial
Tests déploiement staging, smoke, contrat
Tests intégration pipeline + modèle + API
Tests unitaires fonctions Python

---

## Rollout

Déployer un nouveau service ou une nouvelle version de modèle comporte toujours un risque. Une mise en production brutale peut provoquer une dégradation du service, une erreur métier ou une baisse de performance non anticipée.

| Stratégie | Principe | Avantage | Limite | Risque |
|-----------|----------|----------|--------|--------|
| Recreate | Arrêt puis remplacement complet | Simplicité maximale | Interruption de service | Élevé |
| Rolling update | Remplacement progressif des instances | Pas d'interruption totale | Coexistence temporaire de versions | Moyen |
| Blue-green | Deux environnements, bascule instantanée | Rollback immédiat | Double infrastructure nécessaire | Faible |
| Canary | Exposition progressive à un sous-ensemble | Détection précoce des problèmes | Pilotage plus complexe | Faible |
| Shadow | Nouvelle version testée en miroir, sans impact | Aucun risque utilisateur | Coût de duplication du trafic | Très faible |

---

## CI/CD pipeline

Pipeline CI/CD pour Data / ML
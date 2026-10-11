# BPMN

**Réalisé par : Rachida AIT ABDELOUAHID**

---

## PLAN

- **I - Introduction Processus métier**
- **II - BPMN**
  1. Définition BPMN
  2. Objectif
  3. Notations
  4. Meta-Model

---

## Introduction

![Logo OMG BPMN](https://via.placeholder.com/300x150?text=OMG+BPMN)

![Bizagi Modeler](https://via.placeholder.com/300x100?text=Bizagi+Modeler)

---

## Processus métiers

- Un processus représente un flux séquentiel d'activités ou de tâches réalisé dans une organisation afin de produire un ou plusieurs extrants.

![Processus type : Enregistrement → Planification/ordonnancement → Préparation → Conditionnement → Livraison → Facturation → Recouvrement](https://via.placeholder.com/800x200?text=Processus+type)

*(Source : www.piloter.org)*

---

### La modélisation des processus métiers ?

- La représentation d'un processus se fait en rédigeant un modèle selon une notation plus ou moins formelle. Les méthodes et formalismes adoptés se sont imposés au gré de la démocratisation de l'utilisation des processus, et le terme 'modélisation' ou création d'un 'modèle' sera adopté pour exprimer la représentation d'un processus selon un formalisme spécifique.

### La cartographie des processus métiers ?

- Représentation graphique de chacune des étapes de l'ensemble des activités d'un processus et les liens entre elles, de manière à faciliter la visualisation de l'ensemble.

---

### Les standards (formalismes) de la modélisation des processus métiers

Les composantes de la modélisation qui sont 'échange' et 'représentation' ont conduit à définir des langages communs, ou notations communes, qui deviendront des standards. Les principales méthodes ou langages retenues en raison de leur diffusion, ouverture, et officialisation sont :

- IDEF
- OSSAF
- MERISE
- UML (Unified Modeling Language)
- BPMN (Business Process Model and Notation)

---

## BPMN

### Définition BPMN

- BPMN (Business Process Model notation) est une norme de notation pour la modélisation de processus. BPMN est soutenu par l'OMG/BMPI (Object Management Group/ Business Process Management Initiative) depuis leur fusion en 2005.

- La notation BPMN propose deux niveaux de participation aux processus métier :
  - Les unités organisationnelles représentant les groupes d'intérêts communs internes ou externes à l'organisation comme l'entreprise, le département, les clients, etc.
  - Les rôles associés à l'exécution des activités du processus métier et réglant la plupart des échanges d'information entre les unités organisationnelles.

![Exemple de diagramme BPMN avec unités organisationnelles](https://via.placeholder.com/600x300?text=Diagramme+BPMN)

---

### Objectif

- L'objectif de BPMN est de fournir une notation graphique complète permettant de représenter un processus métier en découplant les informations métiers des informations techniques - qui fournit un cadre de travail commun aux utilisateurs métier et techniques.

---

## BPMN : Principes de base

Symboles de base et étendus. Règles de base.

---

### SYMBOLE DE BASE

#### Objet de flux

- **Événement de départ / Déclencheur** : qui déclenche un processus ou sous-processus.
- **Événement de fin / Résultat** : qui résulte de la réalisation d'une activité ou de tâches.
- **Activité / Tâche** : une tâche correspond à une action qui peut être réalisée par un humain ou une machine.

![Événement de départ (cercle vert)](https://via.placeholder.com/100x100?text=Départ)

![Événement de fin (cercle rouge)](https://via.placeholder.com/100x100?text=Fin)

![Tâche (rectangle arrondi)](https://via.placeholder.com/150x80?text=Tâche)

---

#### Objet de flux (suite)

- **Branchement / Aiguillage / Bifurcation** : Est utilisé pour contrôler les divergences et les convergences que l'on retrouve au niveau des flux séquentiels d'activités ou de tâches dans un processus.

![Branchement (losange)](https://via.placeholder.com/100x100?text=Branchement)

- **Événement intermédiaire** : Qui intervient dans le cours normal d'un flux séquentiel.

![Événement intermédiaire (double cercle)](https://via.placeholder.com/100x100?text=Intermédiaire)

---

#### Objet de flux (suite)

- **Sous-processus** : Se compose de plusieurs tâches et est soumis aux mêmes règles qu'un processus normal mais qui n'est pas nécessaire de détailler.

![Sous-processus (rectangle avec +)](https://via.placeholder.com/150x80?text=Sous-processus)

---

#### Objet de connexion (connecteur)

- **Flux séquence**
- **Flux par défaut**

![Flux séquence et flux par défaut](https://via.placeholder.com/200x100?text=Flux)

---

#### Objet de connexion (connecteur) (suite)

- **Flux de messages (entre processus)** : Modèle collaboratif : échanges entre processus.

![Flux de messages entre processus](https://via.placeholder.com/600x300?text=Flux+de+messages)

- **Connecteurs** : Flux, Association, Message.

![Connecteurs : Flux, Association, Message](https://via.placeholder.com/400x200?text=Connecteurs)

---

#### Objets d'organisation (Swimlanes)

- **Processus (groupement – pool)** : Précise les limites du processus.

![Pool (Processus 1)](https://via.placeholder.com/400x150?text=Pool)

- **Couloirs/Bandes** : Définissent les acteurs.

![Couloirs avec Acteur 1 et Acteur 2](https://via.placeholder.com/400x250?text=Couloirs)

---

#### Objets d'organisation (Swimlanes) (suite)

- **Milestone** : Jalons.

![Milestone 1 et Milestone 2](https://via.placeholder.com/600x250?text=Milestones)

---

#### Objet de données

- **Objet de données** : Représente une structure d'information généralement traitée dans les activités comme les documents, courriels, lettres, etc.

![Objet de données (document)](https://via.placeholder.com/100x120?text=Données)

- **Collection d'objets de données** : Représente un ensemble d'informations, telle une liste des articles d'une commande.

![Collection d'objets de données (document avec barres)](https://via.placeholder.com/100x120?text=Collection)

---

#### Objet de données (suite)

- **Magasin de données** : Un magasin de données est un endroit où le processus peut lire et écrire des données, comme une base de données ou un classeur ; son contenu persiste même après la fin de l'instance du processus.

![Magasin de données (cylindre)](https://via.placeholder.com/120x100?text=Magasin)

---

### SYMBOLE ÉTENDU

#### Tâches

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Tâche utilisateur | Implique qu'un humain accomplisse une tâche d'une application informatique. | Tâche Utilisateur |
| Tâche réception | Instaure lorsqu'un participant doit attendre un message afin de poursuivre ses activités. | Tâche Réception |
| Tâche script | Indique qu'un algorithme sera effectué par une application informatique. | Tâche Script |
| Tâche service | Se réalise automatiquement avec une application quelconque sans aucune intervention humaine. | Tâche Service |

---

#### Tâches (suite)

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Tâche d'envoi | Consiste à envoyer un message à un participant du processus. | Tâche Envoi |
| Tâche manuelle | Doit être effectuée sans l'aide d'un logiciel ou d'une application quelconque. | Tâche Manuelle |
| Tâche de règle métier | Utilisée lorsque la poursuite des activités dépend de l'application de règle métier. | Tâche Règle Métier |

---

#### Sous-processus

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Sous-processus réutilisable | Processus à part entière, il peut être invoqué dans différents processus globaux. | + |
| Sous-processus d'événement | Processus qui n'est pas dans le flux du processus normal. | + |
| Sous-processus ad Hoc | Signifie que les tâches à l'intérieur de celui-ci s'effectuent sans aucune séquence prédéfinie. | + ~ |

---

#### Boucle

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Tâche avec itérations | Signifie qu'elle sera répétée tant aussi longtemps qu'elle ne satisfait pas une condition. | Tâche avec itérations |
| Tâche instance multiple | Permet de spécifier que l'activité précédente n'a pas besoin d'être complète avant de débuter l'activité d'instance multiple | Tâche instance multiple parallèle / Tâche instance multiple séquentielle |

---

#### Branchements

![Types de branchements : Exclusif, Parallèle, Inclusif, Complexe, Basé sur les événements](https://via.placeholder.com/600x300?text=Branchements)

- Branchement Exclusif
- Branchement Parallèle
- Branchement Inclusif
- Branchement Complexe
- Branchement basé sur les Événements

---

##### Branchement exclusif

![Branchement exclusif : Décour, Condition 1, Condition 2](https://via.placeholder.com/600x200?text=Branchement+exclusif)

OU

![Branchement exclusif : Défaut, Condition 1, Condition 2](https://via.placeholder.com/600x200?text=Branchement+exclusif+2)

---

##### Branchement parallèle : Éclatement

![Branchement parallèle : Tâche A → Tâche 1, Tâche 2, Tâche 3](https://via.placeholder.com/400x250?text=Éclatement+parallèle)

Après la tâche A, les tâches 1, 2, 3 débutent ensemble.

---

##### Branchement parallèle : Synchronisation

![Synchronisation : Tâche 1, Tâche 2, Tâche 3 → Tâche A](https://via.placeholder.com/400x250?text=Synchronisation)

La tâche A ne débutera que quand les tâches 1, 2, 3 seront complétées.

---

##### Branchement inclusif

![Branchement inclusif : Condition 1, Condition 2, Condition 3 → Convergence](https://via.placeholder.com/600x250?text=Branchement+inclusif)

---

##### Branchement complexe

![Branchement complexe : Tâche 1, Tâche 2, Tâche 3 → Tâche A](https://via.placeholder.com/400x250?text=Branchement+complexe)

La tâche A ne débutera que quand 2 des 3 tâches seront complétées.

---

##### Branchement basé sur l'événement

![Branchement basé sur l'événement : Événement 1, Événement 2, Événement 3](https://via.placeholder.com/500x250?text=Branchement+événementiel)

La tâche 1 débutera si l'événement 1 a été déclenché en premier avant 2 et 3.

---

#### Événements déclencheurs

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Basic | Est utilisé lorsque la cause du déclenchement de processus n'est pas spécifiée. | |
| Message | Est utilisé lorsqu'un message provenant d'un participant extérieur déclenche le processus. | |
| Temporisateur | Utilisé lorsqu'une période spécifique est programmée pour déclencher les processus. | |
| Règle | Utilisé lorsque le processus est déclenché suite à la validation d'une condition. | |

---

#### Événements déclencheurs (suite)

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Signal | Utilisé lorsqu'un signal provenant d'un autre processus déclenche le processus. | |
| Multiple | Signifie qu'il y a plusieurs déclencheurs au processus et le fait qu'un seul de ces déclencheurs se produise est suffisant pour déclencher le processus. | |
| Multiple parallèle | Signifie qu'il y a plusieurs déclencheurs au processus et qu'ils doivent tous se produire pour déclencher le processus. | |

---

#### Événements résultats

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Fin | Utilisé lorsque l'événement de finalisation n'entraîne aucune action. | |
| Compensation | Le type indique que le processus est terminé et qu'un processus de compensation est nécessaire. | |
| Fin précipitée | Indique que toutes les activités du processus se terminent immédiatement. | |
| Annulation | Lorsqu'un événement d'annulation est présent dans le processus. | |
| Erreur | Utilisé uniquement lorsqu'un événement intermédiaire d'erreur est présent dans le processus. | |

---

#### Événements résultats (suite)

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Message | Indique qu'un message est envoyé lorsque le processus est terminé. | |
| Signal | Indique qu'un signal sera envoyé lorsque le processus sera terminé. | |
| Multiple | Indique qu'il y a plusieurs conséquences ou résultats reliés à la fin du processus. | |
| Escalade | Utilisé uniquement lorsqu'un événement intermédiaire d'escalade est présent dans le processus. | |

---

#### Événements intermédiaires

![Événements intermédiaires : Événement déclenché, Message reçu, Signal reçu, Réception multiple, Lien point d'entrée, Événement conditionnel, Temporisation, Parallèle, Message envoyé, Signal envoyé, Lancement multiple, Lien point de sortie, Escalade, Compensation](https://via.placeholder.com/800x300?text=Événements+intermédiaires)

---

#### Événements intermédiaires (suite)

| Nom | Utilisation | Notation |
|-----|-------------|----------|
| Message | Le type message est utilisé lorsque la réalisation d'une activité ou d'une tâche dépend de la réception d'un message. | Message reçu / Message envoyé |
| Signal | Le type signal est utilisé pour signifier qu'un signal doit être reçu afin de terminer l'activité ou la tâche. | Signal reçu / Signal envoyé |
| Multiple | Le type multiplicité parallèle est utilisé lorsqu'il y a plusieurs déclencheurs attachés à un événement. | Lancement multiple / Réception multiple |
| Temporisateur | Le type temporisateur est utilisé lorsqu'une période spécifique ou une contrainte de temps est déterminée afin de réaliser l'activité ou la tâche. | Temporisation |

---

### RÈGLES DE BASE

- Une ou plusieurs fin(s).
- Un événement de début.
- Écriture/Lecture de Gauche à droite.
- Principe de jeton (token)

**Règles générales :**
- L'événement de départ émet un jeton.
- L'événement de fin absorbe un (ou tous les) jeton(s).
- Une tâche s'exécute quand elle reçoit un jeton et libère le jeton quand elle est terminée.

---

#### Exemple

![Exemple de processus avec branchement exclusif](https://via.placeholder.com/600x200?text=Exemple+de+processus)

---

#### Branchement exclusif (« ou » exclusif)

- Les chemins s'excluent. Il n'y a qu'un seul chemin possible.
- Divergence.

![Branchement exclusif : Divergence](https://via.placeholder.com/600x200?text=Divergence+exclusive)

Une seule tâche parmi les tâches B1, B2, B3 sera exécutée.

---

#### Branchement exclusif (« ou » exclusif) (suite)

- Convergence.

![Branchement exclusif : Convergence](https://via.placeholder.com/600x200?text=Convergence+exclusive)

La tâche C débutera dès qu'une tâche parmi les tâches B1, B2, B3 sera réalisée.

---

#### Règles de base (suite)

Un branchement exclusif ne peut pas être convergent et divergent en même temps.

![Branchement exclusif incorrect vs correct](https://via.placeholder.com/600x200?text=Exclusif+correct+vs+incorrect)

---

#### Branchement Parallèle : Éclatement

![Branchement parallèle : Éclatement](https://via.placeholder.com/400x250?text=Éclatement+parallèle)

Après la tâche A, les tâches 1, 2 et 3 débuteront ensemble.

---

#### Branchement Parallèle : Synchronisation

![Branchement parallèle : Synchronisation](https://via.placeholder.com/400x250?text=Synchronisation+parallèle)

La tâche A ne débutera que quand les tâches 1, 2 et 3 seront complétées.

---

#### Règles de base (suite)

- Pas de branchement parallèle de synchronisation et d'éclatement en même temps.
- Attention, certaines situations peuvent mener à un blocage. Dans l'exemple ci-dessous, la tâche A ne sera jamais exécutée.

![Exemple de blocage : branchement parallèle incorrect](https://via.placeholder.com/400x250?text=Blocage+parallèle)

---

#### Branchement basé sur les événements

- Le branchement basé sur les événements indique que les flux sortants reposent sur des événements plutôt que sur l'évaluation des conditions.
- Un événement intermédiaire est placé sur chaque branche sortante du branchement.
  - À chaque réception d'un jeton, il émet un jeton sur chaque branche sortante.
  - Chaque jeton arrive sur l'événement intermédiaire et attend son déclenchement.
  - Le premier événement qui se déclenche « gagne » et laisse continuer son jeton, les autres jetons en attente sur les autres événements disparaissent.

---

#### Règles de base — Exemple

![Exemple : Processus d'authentification avec timeout, validation, tentatives échouées, blocage](https://via.placeholder.com/800x400?text=Exemple+authentification)

---

#### Cas d'utilisation : GED

![Processus de gestion de courrier : utilisateur, secrétaire, responsable](https://via.placeholder.com/800x400?text=GED)

---

#### Processus de gestion de contact

![Processus de gestion de contact : gérer contact → ajouter, modifier, supprimer](https://via.placeholder.com/800x400?text=Gestion+de+contact)

---

#### Gestion des utilisateurs

![Processus de gestion d'utilisateur : gérer utilisateur → ajouter, modifier, supprimer](https://via.placeholder.com/800x400?text=Gestion+des+utilisateurs)

---

## Méta-Modèle

### MÉTA-MODÈLE BPMN

![Méta-modèle BPMN : Diagram, BPMNDiagram, BPMNPlane, BPMNLabelStyle](https://via.placeholder.com/600x300?text=Méta-modèle+BPMN)

- **BPMNPlane** joue le rôle de conteneur de tous les éléments de ce diagramme.
- Une référence au diagramme qui contient directement cet élément de diagramme. La référence est définie que pour l'élément racine dans un diagramme.
- C'est une collection BPMN qui définit le style d'un libellé qui est un élément dans ce diagramme.

---

### BPMNSHAPE

![BPMNShape : LabeledShape, ParticipantBandKind, BPMNShape, BPMNLabel, BaseElement](https://via.placeholder.com/600x300?text=BPMNShape)

- **LabeledShape** représente une forme qui possède une collection des libellés.
- La collection des libellés appartenant à cette forme.

---

### BPMNEDGE

**LabeledEdge** représente un bord qui possède une collection des libellés.

![BPMNEdge : LabeledEdge, MessageVisibleKind, BPMNEdge, BPMNLabel, BaseElement](https://via.placeholder.com/600x300?text=BPMNEdge)

---

### BPMNLABEL

![BPMNLabel : Label, Style, BPMNLabelStyle, Font](https://via.placeholder.com/600x300?text=BPMNLabel)

**BPMNLabel** est une représentation textuelle des informations sur un élément BPMN.
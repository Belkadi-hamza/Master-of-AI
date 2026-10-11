# Bizagi

**Réalisé par : Rachida AIT ABDELUAHID**

---

## PLAN

- **I - Introduction Processus métier**
- **II - Bizagi**
  1. Définition et description
  2. Étude de cas : Bibliothèque
- **IV - Conclusion**

---

## Introduction

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

## Bizagi

Un logiciel gratuit utilisé pour :

- Représenter un processus
- Créer le processus en utilisant le standard BPMN
- Documenter le processus
- Simuler le processus
- Collaborer dans le processus

---

### Présentation Bizagi Process Modeler

- Représenter un processus : Interface Utilisateur
- Créer un processus : Impression
- Collaborer dans un processus
- Simuler un processus

---

#### Interface Utilisateur

![Interface Bizagi Process Modeler : Barre d'outils, Palette, Espace de travail, Navigation diagrammes, Propriété de l'élément sélectionné](https://via.placeholder.com/800x400?text=Interface+Bizagi)

---

#### Présentation Bizagi Process Modeler — Créer un nouveau diagramme

![Créer un nouveau diagramme dans Bizagi](https://via.placeholder.com/600x300?text=Créer+un+nouveau+diagramme)

---

#### Créer un processus

En créant un nouveau diagramme, un processus (groupement) est déjà présent. Pour renommer le processus, il suffit de cliquer droit et choisir 'edit text'.

---

#### Créer un processus : Identifier les participants

Drag & Drop depuis la palette pour ajouter pour chaque participant une bande.

---

#### Créer un processus : Placer les éléments

Placer le point de départ en ajoutant l'événement de début. Placer les autres éléments de la palette. Les deux éléments sont automatiquement reliés.

![Drag & Drop des éléments dans Bizagi](https://via.placeholder.com/600x200?text=Drag+%26+Drop)

---

#### Créer un processus : Exemple de types de branchement

![Menu contextuel pour le type de branchement : Parallel Gateway, Inclusive Gateway, Event-based Gateway, Exclusive Event-based Gateway, Parallel Event-based Gateway, Complex Gateway](https://via.placeholder.com/600x300?text=Types+de+branchement)

---

#### Créer un processus : Gestion de sous-processus

![Transform to Sub-Process et Edit Sub-Process](https://via.placeholder.com/400x300?text=Gestion+de+sous-processus)

---

#### Créer un processus : Modifier le type d'un sous-processus

![Menu Sub-Process type : Reusable Sub-Process](https://via.placeholder.com/400x300?text=Type+de+sous-processus)

---

#### Créer un processus : Attacher un événement à la frontière d'une activité

![Menu Attach event : Message, Timer, Error, Compensate, Conditional, Signal, Multiple, Parallel Multiple, Escalation](https://via.placeholder.com/400x300?text=Attach+event)

---

#### Impression d'un diagramme

Cliquer sur Menu / Dossier / imprimer / Visualiser avant impression.

Vous devez disposer d'une prévisualisation de votre diagramme que vous pouvez en modifier quelques options.

![Menu Print : Print, Quick Print, Print Preview](https://via.placeholder.com/400x300?text=Impression)

---

#### Documenter un processus

Compléter les propriétés de chaque élément : Accéder aux propriétés de l'élément :

- **Élément de base**

![Propriétés de l'élément de base : Name, Description, Performers](https://via.placeholder.com/600x200?text=Propriétés+de+base)

- **Élément étendu**

![Ajout de propriété étendue : Add Property, Table, TextArea](https://via.placeholder.com/600x200?text=Propriétés+étendues)

- **Élément avancé**

---

#### Documenter un processus : Publier la documentation

Générer un document WORD.

---

#### Collaborer dans un processus

Types de fichiers :

- **.bpm** : Type normal.
  - Pas protégé contre les accès concurrents.
- **.bpmc** :
  - Type collaboratif : possibilité de travailler à plusieurs sur le même fichier.
  - Chat entre les participants.
  - Commentaires possibles à différents niveaux.

---

#### Collaborer dans un processus : Étapes pour partager un processus

- **Étape n°1** depuis Bizagi Process Modeler : Share Process

![Share Process dans Bizagi](https://via.placeholder.com/600x200?text=Share+Process)

- **Étape n°2** depuis Dropbox : Partager

![Partage Dropbox](https://via.placeholder.com/600x200?text=Partage+Dropbox)

---

#### Collaborer dans un processus : Niveaux des commentaires

- **Niveau général**

![Commentaires au niveau général](https://via.placeholder.com/600x300?text=Commentaires+généraux)

- **Niveau diagramme**

![Commentaires au niveau diagramme](https://via.placeholder.com/600x300?text=Commentaires+diagramme)

- **Niveau élément**

![Commentaires au niveau élément](https://via.placeholder.com/600x300?text=Commentaires+élément)

---

#### Simuler un processus

La simulation est un outil pour évaluer la performance d'un modèle, sous différentes configurations et sur de longues périodes de temps réel, afin de réduire les risques d'échecs pour répondre aux spécifications, pour éviter sous ou sur-utilisation des ressources et d'optimiser les performances du système.

**Passer en vue simulation :**

![Simulation View](https://via.placeholder.com/400x100?text=Simulation+View)

---

##### Niveau 1 : Process validation

Répartition sur les branchements.

---

##### Niveau 2 : Time Analysis

Mettre des durées sur les tâches.

![Time Analysis : Processing time en days, hrs, mins, secs](https://via.placeholder.com/600x200?text=Time+Analysis)

---

##### Niveau 3 : Resource Analysis

Mettre des ressources et des coûts sur les tâches.

![Resource Analysis : Activity cost](https://via.placeholder.com/600x200?text=Resource+Analysis)

---

##### Niveau 4 : Calendar Analysis

Mettre un calendrier sur chaque ressource :
1. Définir & gérer les calendriers :
2. Gérer les ressources : affecter les calendriers

![Calendar Analysis : Resources, Calendars](https://via.placeholder.com/600x200?text=Calendar+Analysis)

---

##### Lancer la simulation

![Run Simulation : Start, Stop, Results](https://via.placeholder.com/600x100?text=Lancer+la+simulation)

**Afficher les résultats :**

![Résultats de simulation : Completed, Average time, Total time](https://via.placeholder.com/600x150?text=Résultats+de+simulation)

---

## Exemple : processus d'emprunt d'un livre

Pour décrire nos processus métier nous avons choisi comme méthode de travail une qui s'appelle SIPOC.

SIPOC est l'acronyme de Supplier Input Process Output Customer, en français Fournisseurs Entrées Processus Sorties Clients.

Il est présenté sous forme d'une carte dans laquelle on va décrire ce processus du fournisseur (entrées) au client (sorties) à travers ses activités.

| Fournisseurs | Entrées | Processus | Sorties | Clients |
|--------------|---------|-----------|---------|---------|
| | | Etape 1 | Etape 2 | Etape 3 | Etape 4 | Etape 5 | | |
| Fournisseur 1 | Fourniture 1 | | | | | | Produit 1 | Client 1 |
| Fournisseur 2 | Fourniture 2 | | | | | | | Client 2 |

---

### Méthode SIPOC : Emprunter livre (l'état actuel)

| fournisseurs | entrées | processus | sorties | clients |
|--------------|---------|-----------|---------|---------|
| | | étape 1 | étape 2 | étape 3 | étape 4 | étape 5 | étape 6 | | |
| Etudiant | Demande d'emprunt | Demande formulaire | Recherche le livre | Remplir formulaire | Recherche le livre demandé | Demande la carte D'étudiant | Fournir la carte | Livre emprunté | Étudiant avec livre |
| Bibliothécaire | Demande formulaire | | | | | | | | |

---

### Processus d'emprunt (état actuel)

![Diagramme BPMN du processus d'emprunt : Étudiant (prendre le formulaire, rechercher le livre, remplir le formulaire) → Bibliothécaire (rechercher le livre demandé, existe?, demander la carte d'étudiant, fournir le livre à l'étudiant) → livre emprunté](https://via.placeholder.com/800x400?text=Processus+d'emprunt)

---

## Simulation des niveaux pour le scénario 1

### 1ère niveau : Process validation

![Process validation : Simulation View, Level 1](https://via.placeholder.com/800x300?text=Process+validation)

**Et en cliquant sur RUN puis sur START :**

![Résultats Process validation : 25 instances, 7 Non, 18 Oui](https://via.placeholder.com/800x300?text=Résultats+Process+validation)

---

### Résultats

Lorsque la simulation est terminée nous pouvons afficher les résultats en sélectionnant l'option Results.

![Simulation Results : tableau des instances complétées](https://via.placeholder.com/800x400?text=Simulation+Results)

Le résultat peut être exporté sous forme d'un fichier Excel.

| Name | Type | Instances completed |
|------|------|---------------------|
| processus d'emprunt | Process | 25 |
| NoneStart | Start event | 25 |
| NoneIntermediate | Intermediate event | 25 |
| existe? | Gateway | 25 |
| Non | End event | 7 |
| NoneEnd | End event | 18 |
| prendre le formulaire | Task | 25 |
| rechercher le livre | Task | 25 |
| remplir le formulaire | Task | 25 |
| rechercher le livre demandé | Task | 25 |
| demander la carte d'etudiant | Task | 18 |
| livre emprunté | Task | 18 |
| fournir le livre à l'étudiant | Task | 18 |

---

### 2ème niveau : Time Analysis

![Time Analysis : Simulation View, Level 2](https://via.placeholder.com/800x200?text=Time+Analysis)

**Et en cliquant sur RUN puis sur START :**

![Résultats Time Analysis : Completed, Average time, Total time](https://via.placeholder.com/800x300?text=Résultats+Time+Analysis)

---

### 3ème niveau : Resources Analysis

![Resources Analysis : Simulation View, Level 3](https://via.placeholder.com/800x200?text=Resources+Analysis)

**Et en cliquant sur RUN puis sur START :**

![Résultats Resources Analysis : Resources Utilization, Completed, Average time, Average time waiting, Total time, Total time waiting](https://via.placeholder.com/800x400?text=Résultats+Resources+Analysis)

---

### Résultats

| Scenario information | | | | |
|----------------------|--|--|--|--|
| Name | Scenario 1 | | | |
| Time unit | Minutes | | | |
| Resource | Utilization | Total fixed cost | Total unit cost | Total cost |
| Etudiant | 65,70 % | 0 | 0 | 0 |
| bibliothécaire | 41,21 % | 0 | 0 | 0 |
| Total | | 0 | 0 | 0 |

---

### 4ème niveau : Calendar Analysis

![Calendar Analysis : Simulation View, Level 4](https://via.placeholder.com/800x200?text=Calendar+Analysis)

**Et en cliquant sur RUN puis sur START :**

![Résultats Calendar Analysis : Resources Utilization, Completed, Average time, Total time](https://via.placeholder.com/800x400?text=Résultats+Calendar+Analysis)

---

### Résultats

| Scenario information | | | | |
|----------------------|--|--|--|--|
| Name | Scenario 1 | | | |
| Time unit | Minutes | | | |
| Resource | Utilization | Total fixed cost | Total unit cost | Total cost |
| Etudiant | 0,93 % | 0 | 0 | 0 |
| bibliothécaire | 0,58 % | 0 | 0 | 0 |
| Total | | 0 | 0 | 0 |

---

## Méthode SIPOC : Emprunter livre (Solution proposée)

| fournisseurs | entrées | processus | sorties | clients |
|--------------|---------|-----------|---------|---------|
| | | étape 1 | étape 2 | étape 3 | étape 4 | étape 5 | | |
| Etudiant | Demande d'emprunt | Rechercher livre | Remplir formulaire | | | | Livre emprunté | Étudiant avec livre |
| Bibliothécaire | | Vérifier disponibilité du livre | Informe l'étudiant de la disponibilité du livre | Enregistrer l'emprunt | | | | |

---

### Processus d'emprunt (solution proposée)

![Diagramme BPMN du processus d'emprunt optimisé : Étudiant (rechercher un livre, existe?, remplir formulaire) → Bibliothécaire (vérifier disponibilité du livre, enregistrer l'emprunt) → emprunté? Oui/Non](https://via.placeholder.com/800x400?text=Processus+d'emprunt+optimisé)

---

## Simulation des niveaux pour le scénario 2

### 1ère niveau : Process validation

![Process validation scénario 2 : 25 instances, 2 Non, 8 Oui, 15 NoneEnd](https://via.placeholder.com/800x300?text=Process+validation+scénario+2)

---

### Simulation Results

| Name | Type | Instances completed |
|------|------|---------------------|
| processus d'emprunt | Process | 25 |
| NoneStart | Start event | 25 |
| existe? | Gateway | 25 |
| non | End event | 2 |
| emprunté? | Gateway | 23 |
| Oui | End event | 8 |
| NoneEnd | End event | 15 |
| NoneIntermediate | Intermediate event | 23 |
| rechercher un livre | Task | 25 |
| verifier disponibilité du livre | Task | 23 |
| remplir formulaire | Task | 23 |
| enregistrer l'emprunt | Task | 15 |

---

### 2ème niveau : Time Analysis

![Time Analysis scénario 2 : Completed, Average time, Total time](https://via.placeholder.com/800x300?text=Time+Analysis+scénario+2)

---

### 3ème niveau : Resources Analysis

![Resources Analysis scénario 2 : Resources Utilization, Completed, Average time, Average time waiting, Total time](https://via.placeholder.com/800x400?text=Resources+Analysis+scénario+2)

---

### Résultats

| Scenario information | | | | |
|----------------------|--|--|--|--|
| Name | Scenario 2 | | | |
| Time unit | Minutes | | | |
| Resource | Utilization | Total fixed cost | Total unit cost | Total cost |
| Etudiant | 13,23 % | 0 | 0 | 0 |
| bibliothécaire | 4,20 % | 0 | 0 | 0 |
| Total | | 0 | 0 | 0 |

---

### 4ème niveau : Calendar Analysis

![Calendar Analysis scénario 2 : Simulation View, Level 4](https://via.placeholder.com/800x200?text=Calendar+Analysis+scénario+2)

---

### Résultats

| Scenario information | | | | |
|----------------------|--|--|--|--|
| Name | Scenario 2 | | | |
| Time unit | Minutes | | | |
| Resource | Utilization | Total fixed cost | Total unit cost | Total cost |
| Etudiant | 13,23 % | 0 | 0 | 0 |
| bibliothécaire | 4,20 % | 0 | 0 | 0 |
| Total | | 0 | 0 | 0 |

---

## Conclusion
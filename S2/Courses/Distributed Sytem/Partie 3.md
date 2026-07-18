# GraphQL

---

## 1. Introduction à GraphQL

- **GraphQL** = langage de requêtes de données pour API (**QL = Query Language**).
- Permet de manipuler la donnée de manière **simple, flexible et précise**.
- Créé par **Facebook en 2012**, passé en **open-source en 2015**.

### GraphQL vs REST

| Aspect                | REST                                                                                               | GraphQL                                        |
| --------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Accès aux données     | Plusieurs endpoints (`GET /etudiants`, `GET /etudiants/3`, `GET /formations`, `GET /formations/1`) | Un seul point d'entrée, requête structurée     |
| Précision des données | Souvent sur/sous-récupération (_over/under-fetching_)                                              | Le client précise exactement les champs voulus |
| Exemple de requête    | `GET /etudiants/3`                                                                                 | `formations{ nom, etudiants{ nom, prenom } }`  |
| Flexibilité           | Faible (structure fixe par endpoint)                                                               | Élevée (structure définie par le client)       |

**Schéma général** : `Client REST/GraphQL ↔ API/Traitement ↔ Base de Données (BD)`

---

## 2. Types de requêtes GraphQL

Il existe **trois** types d'opérations (queries, mutations, subscriptions) :

|Type|Rôle|Modifie la donnée ?|
|---|---|---|
|**Query**|Récupérer de la donnée (lecture)|❌ Non|
|**Mutation**|Changer l'état de la donnée (créer/modifier/supprimer)|✅ Oui|
|**Subscription**|Écouter des événements en temps réel|❌ Non (écoute)|

---

## 3. Schema Definition Language (SDL)

- Utilisé pour **définir un schéma GraphQL** et exposer les fonctionnalités disponibles.
- Contient :
    - **Types** → similaires aux classes Java
    - **Operations** → similaires aux méthodes Java

### Exemple (`fichier.graphqls`)

```graphql
type Query {
  getLivre(id: Int): Livre
  getLivres: [Livre]
}

type Mutation {
  createLivre(name: String, pages: Int): Int
  deleteLivre(id: Int): String
}

type Livre {
  id: Int
  name: String
  pages: Int
}
```

---

## 4. Format des requêtes/réponses HTTP (GET/POST)

Les réponses GraphQL sont **toujours en JSON**, avec deux entrées :

```json
{
  "data": { ... },
  "errors": [ ... ]
}
```

- `data` : contient les données requêtées
- `errors` : contient les erreurs éventuelles

### Exemple complet

**Requête :**

```graphql
query {
  getEtudiant(id: 3) {
    nom
    genre
  }
}
```

**Réponse :**

```json
{
  "data": {
    "getEtudiant": {
      "nom": "Fadli",
      "genre": "Homme"
    }
  }
}
```

---

## 5. Les trois opérations GraphQL — Exemples

```graphql
# Lire (Query)
query {
  search(q: "name") {
    title
    author
  }
}

# Écrire (Mutation)
mutation {
  create(title: "book") {
    id
  }
}

# Écouter (Subscription)
subscription {
  onCreate {
    id
    title
  }
}
```

---

## 6. Subscriptions GraphQL

### Définition

- Permettent une **connexion en temps réel** entre client et serveur.
- Écoutent : création, mise à jour, suppression, ou lecture de données.
- L'événement émis dépend du choix du développeur.
- **Utilité** : notifications, chat en temps réel, suivi de données en direct.

### Fonctionnement

1. Contrairement aux _queries_/_mutations_, les subscriptions utilisent le protocole **WebSocket** (connexion ouverte en continu).
2. Le client s'abonne à un événement via une requête d'abonnement.
3. Le serveur définit un événement avec une **fonction de rappel (callback) de résolution**.
4. À chaque émission de l'événement côté serveur, la fonction de résolution est appelée et la valeur est envoyée au client abonné.

### Exemple

```graphql
subscription {
  etudiantAdded {
    id
    nom
    prenom
    genre
  }
}
```

### Avantages

- Très utile pour les applications temps réel.
- Largement utilisé par les entreprises pour diffuser du contenu en direct.

---

## 7. Project Reactor (pour implémenter les Subscriptions)

### 7.1 `Flux`

Représente une **séquence réactive de 0 à N éléments** — modélise des flux asynchrones de données.

**Création d'un Flux :**

|Méthode|Rôle|
|---|---|
|`Flux.just()`|Émet une séquence de valeurs spécifiques|
|`Flux.fromIterable()`|Crée un Flux à partir d'une collection|
|`Flux.range()`|Génère une séquence d'entiers dans une plage donnée|

**Opérations courantes :**

```java
flux.map(value -> value.toLowerCase());                     // transforme chaque élément
flux.filter(value -> value.startsWith("A"));                // filtre selon condition
flux.flatMap(value -> Flux.just(value, value.toUpperCase())); // aplatit les flux imbriqués
```

### 7.2 `Sink`

Abstraction permettant de **produire des données de manière programmatique** dans un flux réactif (Publisher).

|Type de Sink|Rôle|
|---|---|
|`Sinks.one()`|Émet une seule valeur|
|`Sinks.many().unicast()`|Flux émis vers **un seul** abonné|
|`Sinks.many().multicast()`|Flux émis vers **plusieurs abonnés simultanément**|
|`Sinks.many().replay()`|Stocke les éléments émis pour les **rejouer** aux nouveaux abonnés|
|`Sinks.empty()`|Émet seulement une complétion ou une erreur|

---

## 8. Application pratique : Spring Data REST - GraphQL

### 8.1 Architecture générale

```
Client GraphQL ⇄ Controller ⇄ Service ⇄ Repository ⇄ Model ⇄ BD
```

- Entités : `Centre` (id, nomCentre, adresse, listEtudiants) et `Etudiant` (id, nom, prenom, genre, id_centre)

### 8.2 Étapes à suivre

1. Création d'un projet Spring Boot + dépendances
2. Ajout des Entités JPA
3. Création des Repository JPA
4. Ajout d'une classe Controller
5. Création des DTO (objets de transfert de données)
6. Définition du schéma GraphQL
7. Définition de la source de données
8. Test

**Dépendances nécessaires :** `Spring Web`, `H2 Database`, `Lombok`, `Spring Data JPA`, `Rest Repositories`, `Spring for GraphQL`, `WebSocket`

### 8.3 Entités JPA

```java
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Centre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String nom;
    String adresse;
    @OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    List<Etudiant> listEtudiants;
}

@Entity @Data
@AllArgsConstructor @NoArgsConstructor
@Builder @Table(name="etudiants")
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="nom_etudiant", nullable=false)
    String nom;
    @Column(name="prenom_etudiant")
    String prenom;
    @Enumerated(EnumType.STRING)
    Genre genre;
    @ManyToOne
    @NotNull
    @JoinColumn(name="centre_id")
    Centre centre;
}
```

### 8.4 DTO (Data Transfer Object)

```java
public record EtudiantDTO(
    String nom,
    String prenom,
    Genre genre,
    Long centreId
) {}
```

### 8.5 Mapping DTO → Entité

```java
@Component
public class DtoToEtudiant {
    @Autowired
    CentreRepository centreRepository;

    public void toEtudiant(Etudiant et, EtudiantDTO dto) {
        Centre centre = centreRepository.findById(dto.centreId()).orElse(null);
        if (dto != null) {
            BeanUtils.copyProperties(dto, et);
            et.setCentre(centre);
        }
    }
}
```

### 8.6 Repository JPA

```java
public interface CentreRepository extends JpaRepository<Centre, Long> {}
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {}
```

### 8.7 Services

```java
@Service
public class EtudiantService {
    @Autowired DtoToEtudiant dtoToEtudiant;
    @Autowired EtudiantRepository etudiantRepository;

    private final Sinks.Many<Etudiant> sink = Sinks.many().multicast().onBackpressureBuffer();
    private final Sinks.Many<String> sinkSuppression = Sinks.many().multicast().onBackpressureBuffer();

    public List<Etudiant> getStudents() { return etudiantRepository.findAll(); }

    public Etudiant getEtudiant(Long id) { return etudiantRepository.findById(id).orElse(null); }

    public Etudiant addEtudiant(EtudiantDTO dto) {
        Etudiant etudiant = new Etudiant();
        dtoToEtudiant.toEtudiant(etudiant, dto);
        etudiantRepository.save(etudiant);
        sink.tryEmitNext(etudiant);
        return etudiant;
    }

    public Etudiant updateEtudiant(Long id, EtudiantDTO dto) {
        if (etudiantRepository.findById(id).isPresent()) {
            Etudiant etudiant = etudiantRepository.findById(id).get();
            dtoToEtudiant.toEtudiant(etudiant, dto);
            return etudiantRepository.save(etudiant);
        }
        return null;
    }

    public String deleteEtudiant(Long id) {
        if (etudiantRepository.findById(id).isPresent()) {
            Etudiant et = etudiantRepository.findById(id).get();
            etudiantRepository.deleteById(id);
            String msg = String.format("l'étudiant %s %s vient de quitter l'école !", et.getNom(), et.getPrenom());
            sinkSuppression.tryEmitNext(msg);
            return String.format("l'étudiant %s est bien supprimé !", id);
        }
        return String.format("l'étudiant %s n'existe pas !", id);
    }

    public Flux<Etudiant> getEtudiantAdded() { return sink.asFlux(); }
    public Flux<String> etudiantMoved() { return sinkSuppression.asFlux(); }
}

@Service
public class CentreService {
    @Autowired CentreRepository centreRepository;
    public List<Centre> getCentres() { return centreRepository.findAll(); }
    public Centre getCentre(Long id) { return centreRepository.findById(id).orElse(null); }
}
```

### 8.8 Controller

```java
@Controller
public class EtudiantCentreController {
    @Autowired EtudiantService etudiantService;
    @Autowired CentreService centreService;

    @QueryMapping("listCentres")
    public List<Centre> getAllCentres() { return centreService.getCentres(); }

    @QueryMapping
    public List<Etudiant> getAllEtudiants() { return etudiantService.getStudents(); }

    @QueryMapping
    public Centre getCentreById(@Argument int id) { return centreService.getCentre(id); }

    @QueryMapping
    public Etudiant getEtudiantById(@Argument Long id) { return etudiantService.getEtudiant(id); }

    @MutationMapping
    public Etudiant addEtudiant(@Argument EtudiantDTO etudiantDTO) {
        return etudiantService.addEtudiant(etudiantDTO);
    }

    @MutationMapping
    public String deleteEtudiant(@Argument Long id) { return etudiantService.deleteEtudiant(id); }

    @MutationMapping
    public Etudiant updateEtudiant(@Argument Long id, @Argument EtudiantDTO etudiantDTO) {
        return etudiantService.updateEtudiant(id, etudiantDTO);
    }

    @SubscriptionMapping
    public Flux<Etudiant> etudiantAdded() { return etudiantService.getEtudiantAddedPublisher(); }

    @SubscriptionMapping
    public Flux<Etudiant> etudiantMoved() { return etudiantService.etudiantMoved(); }
}
```

> **Annotations clés** : `@QueryMapping` (lecture), `@MutationMapping` (écriture), `@SubscriptionMapping` (écoute), `@Argument` (paramètre de la requête).

### 8.9 Schéma GraphQL (`schema.graphqls`)

📂 Emplacement : `src/main/resources/graphql/schema.graphqls`

```graphql
type Query {
  getAllEtudiants: [Etudiant]
  getEtudiantById(id: Float): Etudiant
  listCentres: [Centre]
  getCentreById(id: Float): Centre
}

type Mutation {
  addEtudiant(etudiantDTO: EtudiantDTO): Etudiant
  updateEtudiant(id: Float, etudiantDTO: EtudiantDTO): Etudiant
  deleteEtudiant(id: Float): String
}

type Subscription {
  etudiantAdded: Etudiant
  etudiantRemoved: String
}

enum Genre {
  Homme
  Femme
}

type Etudiant {
  id: Float
  nom: String
  prenom: String
  genre: Genre
  centre: Centre
}

type Centre {
  id: Int
  nom: String
  adresse: String
  listEtudiants: [Etudiant]
}

input EtudiantDTO {
  nom: String
  prenom: String
  genre: String
  centreId: Float
}
```

### 8.10 Configuration (`application.properties`)

```properties
spring.h2.console.enabled=true
spring.datasource.username=12
spring.datasource.password=
spring.datasource.url=jdbc:h2:mem:centredb
spring.graphql.graphiql.enabled=true
spring.graphql.websocket.path=/graphql
```

### 8.11 Jeu d'enregistrements initial

```java
public class TpGraphQlApplication implements CommandLineRunner {
    @Autowired EtudiantRepository etudiantRepository;
    @Autowired CentreRepository centreRepository;

    public static void main(String[] args) {
        SpringApplication.run(TpGraphQlApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Centre centre1 = Centre.builder().nom("Maarif").adresse("Biranzarane").build();
        centreRepository.save(centre1);

        Centre centre2 = Centre.builder().nom("Oranges").adresse("Oulfa").build();
        centreRepository.save(centre2);

        Etudiant et1 = Etudiant.builder()
            .nom("Adnani").prenom("Brahim").genre(Genre.Homme)
            .centre(centre1).build();
        etudiantRepository.save(et1);
        // ...
    }
}
```

### 8.12 Outils de test

|Outil|URL / usage|
|---|---|
|**GraphiQL** (intégré)|`http://localhost:8080/graphiql?path=/graphql`|
|**Insomnia**|`POST http://localhost:8080/graphql` avec corps de type `GraphQL`|

**Exemple de test dans Insomnia :**

```graphql
query {
  getEtudiant(id: 3) {
    nom
    genre
  }
}
```

```json
{
  "data": {
    "getEtudiant": {
      "nom": "Fadli",
      "genre": "Homme"
    }
  }
}
```

**Exemple avec fragment (réutilisation de champs) :**

```graphql
fragment fragmentEtu on Etudiant {
  nom
  prenom
  genre
}

query {
  findAllEtudiants {
    id
    ...fragmentEtu
    centre {
      nom
      adresse
    }
  }
}
```

**Exemple de mutation avec variables :**

```graphql
mutation($n: String, $p: String, $g: String, $cId: Float) {
  addEtudiant(etudiant: {
    nom: $n
    prenom: $p
    genre: $g
    centreId: $cId
  }) {
    id
    nom
    centre { id }
  }
}
```

Variables :

```json
{"n": "unNom", "p": "unPrénom", "g": "Homme", "cId": 2}
```

**Test de subscription (2 clients) :**

- Client 1 exécute une **mutation** `addEtudiant`.
- Client 2, abonné via `subscription { etudiantAdded { id nom prenom } }`, **reçoit automatiquement** l'événement en temps réel dès la création.

---

## 9. Questions à Choix Multiples (QCM) — Auto-évaluation

> ⚠️ Ces QCM ne figurent pas dans le PDF original ; ils ont été créés pour vous permettre de vous auto-évaluer sur le contenu du cours. Les corrigés sont fournis juste après chaque question.

**Q1. Qui a créé GraphQL et en quelle année a-t-il été rendu open-source ?**

- A) Google, 2012
- B) Facebook, 2015
- C) Facebook, 2012
- D) Twitter, 2015

<details><summary>✅ Réponse</summary>C) Facebook a créé GraphQL en 2012, et l'a rendu open-source en 2015.</details>

---

**Q2. Quelle opération GraphQL est utilisée pour lire des données sans les modifier ?**

- A) Mutation
- B) Query
- C) Subscription
- D) Fetch

<details><summary>✅ Réponse</summary>B) Query.</details>

---

**Q3. Quel protocole est généralement utilisé par les Subscriptions GraphQL pour maintenir une connexion ouverte ?**

- A) HTTP
- B) FTP
- C) WebSocket
- D) SMTP

<details><summary>✅ Réponse</summary>C) WebSocket.</details>

---

**Q4. Dans le SDL GraphQL, à quoi correspondent les "Types" ?**

- A) Aux méthodes Java
- B) Aux classes Java
- C) Aux interfaces REST
- D) Aux annotations Spring

<details><summary>✅ Réponse</summary>B) Aux classes Java (les "Operations" correspondent aux méthodes).</details>

---

**Q5. Quelle entrée JSON contient les erreurs dans une réponse GraphQL ?**

- A) `data`
- B) `fail`
- C) `errors`
- D) `exceptions`

<details><summary>✅ Réponse</summary>C) `errors`.</details>

---

**Q6. Quel type de Sink de Project Reactor permet de diffuser un flux vers plusieurs abonnés simultanément ?**

- A) `Sinks.many().unicast()`
- B) `Sinks.many().multicast()`
- C) `Sinks.one()`
- D) `Sinks.empty()`

<details><summary>✅ Réponse</summary>B) `Sinks.many().multicast()`.</details>

---

**Q7. Quelle annotation Spring for GraphQL est utilisée pour une mutation ?**

- A) `@QueryMapping`
- B) `@SubscriptionMapping`
- C) `@MutationMapping`
- D) `@PostMapping`

<details><summary>✅ Réponse</summary>C) `@MutationMapping`.</details>

---

**Q8. Que représente un `Flux` dans Project Reactor ?**

- A) Une seule valeur asynchrone
- B) Une séquence réactive de 0 à N éléments
- C) Une connexion HTTP
- D) Une base de données réactive

<details><summary>✅ Réponse</summary>B) Une séquence réactive de 0 à N éléments (flux asynchrone de données).</details>

---

**Q9. Dans l'exemple Spring GraphQL, quel fichier définit le schéma GraphQL de l'application ?**

- A) `application.properties`
- B) `schema.graphqls`
- C) `pom.xml`
- D) `EtudiantDTO.java`

<details><summary>✅ Réponse</summary>B) `schema.graphqls` (placé dans `resources/graphql/`).</details>

---

**Q10. Quel est le principal avantage de GraphQL par rapport à REST illustré dans le cours ?**

- A) GraphQL est plus rapide à écrire en HTML
- B) GraphQL permet au client de préciser exactement les champs souhaités en un seul appel
- C) GraphQL remplace complètement les bases de données
- D) GraphQL n'utilise jamais JSON

<details><summary>✅ Réponse</summary>B) Le client peut demander précisément les données voulues (ex : `formations{ nom, etudiants{ nom, prenom } }`) au lieu de multiplier les appels REST.</details>

---

## 10. Exercices de codage corrigés

> ⚠️ Exercices additionnels créés pour la pratique, avec correction, en s'appuyant sur le modèle `Etudiant`/`Centre` du cours.

### Exercice 1 — Écrire une Query GraphQL

**Énoncé :** Écrire une requête GraphQL qui récupère la liste de tous les centres avec leur nom, adresse, et pour chacun la liste des étudiants (nom et prénom seulement).

**Correction :**

```graphql
query {
  listCentres {
    nom
    adresse
    listEtudiants {
      nom
      prenom
    }
  }
}
```

---

### Exercice 2 — Écrire une Mutation GraphQL

**Énoncé :** Écrire une mutation qui crée un nouvel étudiant "Salma Bennani", de genre "Femme", rattaché au centre d'id 1, et qui retourne son id et son nom.

**Correction :**

```graphql
mutation {
  addEtudiant(etudiantDTO: {
    nom: "Bennani"
    prenom: "Salma"
    genre: "Femme"
    centreId: 1
  }) {
    id
    nom
  }
}
```

---

### Exercice 3 — Compléter le schéma GraphQL

**Énoncé :** Ajouter au schéma `schema.graphqls` une opération `getEtudiantsByCentre(centreId: Float): [Etudiant]` permettant de récupérer tous les étudiants d'un centre donné.

**Correction :**

```graphql
type Query {
  getAllEtudiants: [Etudiant]
  getEtudiantById(id: Float): Etudiant
  listCentres: [Centre]
  getCentreById(id: Float): Centre
  getEtudiantsByCentre(centreId: Float): [Etudiant]   # ← ajout
}
```

Il faudra également ajouter la méthode correspondante dans le Controller et le Service :

```java
// Controller
@QueryMapping
public List<Etudiant> getEtudiantsByCentre(@Argument Long centreId) {
    return etudiantService.getEtudiantsByCentre(centreId);
}

// Service
public List<Etudiant> getEtudiantsByCentre(Long centreId) {
    return etudiantRepository.findAll().stream()
        .filter(e -> e.getCentre().getId().equals(centreId))
        .collect(Collectors.toList());
}
```

---

### Exercice 4 — Implémenter une Subscription

**Énoncé :** En utilisant `Sinks.Many` (Project Reactor), écrire le code du Service permettant de notifier tous les clients abonnés lorsqu'un centre est mis à jour (événement `centreUpdated`).

**Correction :**

```java
@Service
public class CentreService {
    @Autowired CentreRepository centreRepository;

    private final Sinks.Many<Centre> sinkCentreUpdated =
        Sinks.many().multicast().onBackpressureBuffer();

    public List<Centre> getCentres() { return centreRepository.findAll(); }

    public Centre getCentre(Long id) { return centreRepository.findById(id).orElse(null); }

    public Centre updateCentre(Long id, Centre nouveauCentre) {
        if (centreRepository.findById(id).isPresent()) {
            Centre centre = centreRepository.findById(id).get();
            centre.setNom(nouveauCentre.getNom());
            centre.setAdresse(nouveauCentre.getAdresse());
            Centre updated = centreRepository.save(centre);
            sinkCentreUpdated.tryEmitNext(updated);   // notifie les abonnés
            return updated;
        }
        return null;
    }

    public Flux<Centre> centreUpdated() {
        return sinkCentreUpdated.asFlux();
    }
}
```

Puis dans le Controller :

```java
@SubscriptionMapping
public Flux<Centre> centreUpdated() {
    return centreService.centreUpdated();
}
```

Et dans le schéma :

```graphql
type Subscription {
  etudiantAdded: Etudiant
  etudiantRemoved: String
  centreUpdated: Centre   # ← ajout
}
```

---

### Exercice 5 — Vrai/Faux avec justification

Pour chaque affirmation, dire si elle est **vraie** ou **fausse** et justifier.

1. _"Une query GraphQL peut modifier les données de la base."_
    
    <details><summary>✅ Réponse</summary>**Faux.** Les queries servent uniquement à la lecture ; c'est la mutation qui modifie l'état de la donnée.</details>
2. _"Les subscriptions GraphQL fonctionnent sur une simple requête HTTP GET classique."_
    
    <details><summary>✅ Réponse</summary>**Faux.** Elles utilisent le protocole WebSocket pour maintenir une connexion ouverte et transmettre des événements en continu.</details>
3. _"Dans le schéma GraphQL, `input` est utilisé pour définir les données envoyées en paramètre d'une mutation."_
    
    <details><summary>✅ Réponse</summary>**Vrai.** Exemple : `input EtudiantDTO { nom: String ... }` utilisé dans `addEtudiant(etudiantDTO: EtudiantDTO)`.</details>
4. _"REST nécessite généralement plusieurs endpoints pour récupérer des données liées (ex: étudiants et formations), contrairement à GraphQL qui peut tout récupérer en un seul appel."_
    
    <details><summary>✅ Réponse</summary>**Vrai.** C'est l'un des principaux avantages de GraphQL illustrés dans le cours.</details>

---

## 11. Récapitulatif visuel — Résumé express

|Concept|Point clé à retenir|
|---|---|
|GraphQL|Langage de requêtes API, créé par Facebook (2012), open-source (2015)|
|Query|Lecture de données|
|Mutation|Écriture/modification de données|
|Subscription|Écoute d'événements en temps réel (WebSocket)|
|SDL|Types (≈ classes) + Operations (≈ méthodes)|
|Réponse GraphQL|Toujours en JSON : `{ data, errors }`|
|Project Reactor|`Flux` (flux de 0 à N éléments) + `Sinks` (production programmatique)|
|Spring for GraphQL|`@QueryMapping`, `@MutationMapping`, `@SubscriptionMapping`, `@Argument`|
|Fichier schéma|`schema.graphqls` dans `resources/graphql/`|
|Outils de test|GraphiQL (`/graphiql?path=/graphql`), Insomnia (`POST /graphql`)|

---

_Fin de la fiche de révision — Partie 3 : GraphQL_
# Développement des Web Services REST

## 1. Les Web Services

Un **Web Service** est un composant logiciel qui permet à deux ou plusieurs applications de communiquer entre elles via un réseau (Internet ou Intranet) en utilisant principalement le protocole **HTTP**.

**Exemple :**

Une application mobile bancaire demande le solde d'un client au serveur Spring Boot.

```
Application Mobile
        │
   Requête HTTP
        │
        ▼
API REST Spring Boot
        │
        ▼
 Base de données
```

---

## 2. SOAP vs REST

### SOAP (Simple Object Access Protocol)

- Protocole.
- Utilise uniquement XML.
- Plus sécurisé mais plus lourd.
- Principalement utilisé dans les applications d'entreprise.

### REST (Representational State Transfer)

- Style d'architecture.
- Utilise principalement HTTP.
- Échange généralement des données au format JSON.
- Plus simple, plus rapide et plus léger.

| SOAP | REST |
|------|------|
| Protocole | Style d'architecture |
| XML | JSON |
| Plus lourd | Plus léger |
| Plus complexe | Plus simple |

---

## 3. REST vs RESTful

**REST** représente les règles permettant de concevoir une API.

**RESTful** est une API qui respecte ces règles.

❌ Non RESTful

```
GET /getClient/5
```

✅ RESTful

```
GET /clients/5
```

---

## 4. Les ressources REST

Une **ressource** représente un objet métier.

Dans notre Bank Management System :

```
/clients
/comptes
/transactions
```

Chaque ressource possède une URI unique.

---

## 5. Les verbes HTTP

| Verbe | Action | Exemple |
|--------|---------|----------|
| GET | Lire | GET /clients |
| POST | Créer | POST /clients |
| PUT | Remplacer | PUT /clients/5 |
| PATCH | Modifier partiellement | PATCH /clients/5 |
| DELETE | Supprimer | DELETE /clients/5 |

---

## 6. Les codes HTTP

| Famille | Signification |
|----------|---------------|
| 1xx | Information |
| 2xx | Succès |
| 3xx | Redirection |
| 4xx | Erreur du client |
| 5xx | Erreur du serveur |

Les principaux codes :

| Code | Signification |
|------|---------------|
| 200 OK | Lecture réussie |
| 201 Created | Ressource créée |
| 204 No Content | Suppression réussie |
| 400 Bad Request | Requête invalide |
| 401 Unauthorized | Non authentifié |
| 403 Forbidden | Accès interdit |
| 404 Not Found | Ressource introuvable |
| 500 Internal Server Error | Erreur serveur |

---

# 7. Les annotations Jakarta REST (JAX-RS)

| Annotation    | Rôle             | Exemple                |
| ------------- | ---------------- | ---------------------- |
| `@Path`       | Définit l'URL    | `@Path("/clients")`    |
| `@GET`        | Lire             | `GET /clients`         |
| `@POST`       | Ajouter          | `POST /clients`        |
| `@PUT`        | Modifier         | `PUT /clients/{id}`    |
| `@DELETE`     | Supprimer        | `DELETE /clients/{id}` |
| `@PathParam`  | Paramètre URL    | `/clients/5`           |
| `@QueryParam` | Paramètre GET    | `/clients?ville=Casa`  |
| `@Consumes`   | Reçoit du JSON   | `@Consumes(JSON)`      |
| `@Produces`   | Retourne du JSON | `@Produces(JSON)`      |

**Exemple**

```java
@Path("/clients")
public class ClientResource {

    @GET
    public List<Client> getClients(){}

    @POST
    public Client save(Client client){}
}
```
---
# 8. Les annotations Spring MVC

| Annotation        | Rôle            | Exemple                |
| ----------------- | --------------- | ---------------------- |
| `@RestController` | Contrôleur REST | `@RestController`      |
| `@RequestMapping` | URL principale  | `/clients`             |
| `@GetMapping`     | GET             | `GET /clients`         |
| `@PostMapping`    | POST            | `POST /clients`        |
| `@PutMapping`     | PUT             | `PUT /clients/{id}`    |
| `@PatchMapping`   | PATCH           | `PATCH /clients/{id}`  |
| `@DeleteMapping`  | DELETE          | `DELETE /clients/{id}` |
| `@PathVariable`   | Variable URL    | `/clients/{id}`        |
| `@RequestParam`   | Paramètre GET   | `?ville=Casa`          |
| `@RequestBody`    | Corps JSON      | `Client client`        |

**Exemple**

```java
@RestController
@RequestMapping("/clients")
public class ClientController {

    @GetMapping
    public List<Client> getClients(){}

    @PostMapping
    public Client save(@RequestBody Client client){}
}
```

---

# 9. Spring Data REST

Spring Data REST permet de créer automatiquement les API REST à partir d'un Repository, sans écrire de contrôleur.

```java
@Entity
public class Client{

    @Id
    @GeneratedValue
    private Long id;

    private String nom;

}
```

```java
@RepositoryRestResource(path="clients")
public interface ClientRepository
extends JpaRepository<Client,Long>{

}
```

Spring génère automatiquement :

```
GET     /clients
GET     /clients/{id}
POST    /clients
PUT     /clients/{id}
PATCH   /clients/{id}
DELETE  /clients/{id}
```

### Annotations principales

| Annotation | Rôle |
|------------|------|
| `@RepositoryRestResource` | Expose le Repository |
| `@RestResource` | Personnalise une méthode |
| `@Projection` | Retourne certains champs |
| `@RepositoryEventHandler` | Gère les événements CRUD |

---

# 10. Pagination et Tri

Lorsque la base contient des milliers d'enregistrements, on utilise la pagination.

Exemple :

```
GET /clients?page=0&size=10
```

Renvoie uniquement les 10 premiers clients.

Pour trier :

```
GET /clients?sort=nom
```

Tri décroissant :

```
GET /clients?sort=nom,desc
```

### Paramètres

| Paramètre | Rôle | Exemple |
|-----------|------|----------|
| page | Numéro de page | `page=0` |
| size | Nombre d'éléments | `size=10` |
| sort | Champ de tri | `sort=nom` |
| asc | Ordre croissant | `sort=nom,asc` |
| desc | Ordre décroissant | `sort=nom,desc` |

---

# Exercices

## Exercice 1 : QCM

### Question 1

REST est :

- A. Un protocole
- B. Un langage de programmation
- C. Un style d'architecture
- D. Une base de données

<details>
<summary>✅ Correction</summary>

**Réponse : C**

REST (Representational State Transfer) est un style d'architecture permettant de développer des Web Services.

</details>

---

### Question 2

SOAP utilise principalement :

- A. JSON
- B. XML
- C. HTML
- D. CSV

<details>
<summary>✅ Correction</summary>

**Réponse : B**

SOAP échange les données au format XML.

</details>

---

### Question 3

Une API RESTful est :

- A. Une base de données
- B. Une application qui respecte les règles REST
- C. Un serveur Web
- D. Une bibliothèque Java

<details>
<summary>✅ Correction</summary>

**Réponse : B**

RESTful désigne une API qui respecte les principes REST.

</details>

---

### Question 4

Quel verbe HTTP permet de créer une ressource ?

- A. GET
- B. POST
- C. DELETE
- D. PUT

<details>
<summary>✅ Correction</summary>

**Réponse : B**

POST permet d'ajouter une nouvelle ressource.

Exemple :

```http
POST /clients
```

</details>

---

### Question 5

Quel code HTTP indique qu'une ressource a été créée ?

- A. 200
- B. 201
- C. 404
- D. 500

<details>
<summary>✅ Correction</summary>

**Réponse : B (201 Created)**

</details>

---

## Exercice 2 : Compléter le tableau

Compléter le tableau suivant.

| Verbe HTTP | Action |
| ---------- | ------ |
| GET        | ?      |
| POST       | ?      |
| PUT        | ?      |
| PATCH      | ?      |
| DELETE     | ?      |

<details>
<summary>✅ Correction</summary>

| Verbe HTTP | Action |
|------------|--------|
| GET | Lire |
| POST | Créer |
| PUT | Remplacer complètement |
| PATCH | Modifier partiellement |
| DELETE | Supprimer |

</details>

---

## Exercice 3 : Codes HTTP

Associer chaque situation au bon code HTTP.

| Situation | Code |
|------------|------|
| Lecture réussie | ? |
| Création réussie | ? |
| Ressource inexistante | ? |
| Erreur serveur | ? |

<details>
<summary>✅ Correction</summary>

| Situation | Code |
|------------|------|
| Lecture réussie | **200 OK** |
| Création réussie | **201 Created** |
| Ressource inexistante | **404 Not Found** |
| Erreur serveur | **500 Internal Server Error** |

</details>

---

## Exercice 4 : Compléter le code Spring MVC

Compléter les annotations manquantes.

```java
_________
@RequestMapping("/clients")
public class ClientController {

    _________
    public List<Client> getClients(){

        return service.findAll();

    }

}
```

<summary>✅ Correction</summary>
```
@RestController
@RequestMapping("/clients")
public class ClientController {
    @GetMapping
    public List&lt;Client&gt; getClients(){
        return service.findAll();
    }
}
```

---

# Exercice 5 : Identifier l'URL

Soit le contrôleur suivant :

```java
@RestController
@RequestMapping("/clients")
public class ClientController {

    @GetMapping("/{id}")
    public Client getClient(
            @PathVariable Long id){

        return service.findById(id);

    }

}
```

### Questions

1. Quel est le verbe HTTP ?

2. Quelle URL faut-il appeler pour récupérer le client numéro 10 ?

<summary>✅ Correction</summary>

**Verbe HTTP**

```
GET
```

**URL**

```
GET /clients/10
```


---

# Exercice 6 : Jakarta REST

Compléter le code.

```java
________("/clients")
public class ClientResource {

    ________
    public List<Client> getClients(){

    }

}
```

<details>
<summary>✅ Correction</summary>

```java
@Path("/clients")
public class ClientResource {

    @GET
    public List<Client> getClients(){

    }

}
```

</details>

---

# Exercice 7 : Spring Data REST

On possède le Repository suivant.

```java
@RepositoryRestResource(path="clients")
public interface ClientRepository
extends JpaRepository<Client,Long>{

}
```

Quelles API Spring Boot génère automatiquement ?

<details>
<summary>✅ Correction</summary>

```http
GET     /clients

GET     /clients/{id}

POST    /clients

PUT     /clients/{id}

PATCH   /clients/{id}

DELETE  /clients/{id}
```

</details>

---

# Exercice 8 : Pagination

On souhaite afficher seulement **20 clients** par page.

Quelle URL faut-il utiliser ?

<details>
<summary>✅ Correction</summary>

```http
GET /clients?page=0&size=20
```

- page=0 → première page
- size=20 → 20 clients par page

</details>

---

# Exercice 9 : Tri

Comment afficher les clients triés par **nom** en ordre décroissant ?

<details>
<summary>✅ Correction</summary>

```http
GET /clients?sort=nom,desc
```

</details>

---

# Exercice 10 : Développement

Compléter le contrôleur Spring Boot.

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    // Lire tous les produits

    // Ajouter un produit

    // Supprimer un produit

}
```

<details>
<summary>✅ Correction</summary>

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public List<Product> getProducts(){

        return service.findAll();

    }

    @PostMapping
    public Product save(
            @RequestBody Product product){

        return service.save(product);

    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id){

        service.delete(id);

    }

}
```

</details>

---

# Exercice 11 : Vrai ou Faux

Déterminer si les affirmations suivantes sont vraies ou fausses.

1. REST utilise généralement JSON.
2. SOAP utilise XML.
3. POST permet de supprimer une ressource.
4. `@PathVariable` récupère un paramètre présent dans l'URL.
5. Spring Data REST peut créer automatiquement les API CRUD.

<details>
<summary>✅ Correction</summary>

1. ✅ Vrai

2. ✅ Vrai

3. ❌ Faux (DELETE)

4. ✅ Vrai

5. ✅ Vrai

</details>

---

# Exercice 12 : Associer les annotations

Associer chaque annotation à son rôle.

| Annotation | Rôle |
|------------|------|
| `@RestController` | ? |
| `@GetMapping` | ? |
| `@PostMapping` | ? |
| `@PathVariable` | ? |
| `@RequestBody` | ? |
| `@RepositoryRestResource` | ? |

<details>
<summary>✅ Correction</summary>

| Annotation | Rôle |
|------------|------|
| `@RestController` | Déclare un contrôleur REST |
| `@GetMapping` | Gère les requêtes GET |
| `@PostMapping` | Gère les requêtes POST |
| `@PathVariable` | Récupère une variable de l'URL |
| `@RequestBody` | Convertit le JSON en objet Java |
| `@RepositoryRestResource` | Expose automatiquement un Repository comme API REST |

</details>

---

# Résumé

À travers cette série d'exercices, vous avez révisé :

- Les Web Services
- SOAP et REST
- RESTful
- Les verbes HTTP
- Les codes HTTP
- Les annotations Jakarta REST
- Les annotations Spring MVC
- Spring Data REST
- La pagination
- Le tri (Sorting)

Ces exercices couvrent les notions essentielles généralement demandées lors des examens de Systèmes Distribués et de développement Spring Boot.
# gRPC

> Support de révision basé sur le cours de A. Ettaoufik (diapositives 253–302)

---

## 1. Introduction à gRPC

- **gRPC** = **Google Remote Procedure Call**.
- Framework pour l'utilisation de **RPC via HTTP/2**, publié par **Google en 2016** (première version).

### Architecture générale

- **Côté serveur** → le serveur implémente une interface et exécute un serveur gRPC pour gérer les appels des clients.
- **Côté client** → le client dispose d'un **stub** (parfois simplement appelé "client") qui fournit les **mêmes méthodes** que le serveur.

### Schéma de fonctionnement

```
C++ App ──┐
Python App ─┼── Stub gRPC ──► Serveur gRPC
Java App ──┘
```

Chaque application cliente (peu importe le langage) communique via un **stub gRPC** généré automatiquement vers le **Serveur gRPC**.

---

## 2. JSON vs Protocol Buffer (Proto)

||JSON|Protocol Buffer (.proto)|
|---|---|---|
|Format|Texte, lisible|**Binaire**, compact|
|Exemple|`{"nom": "Saadani", "prenom": "Ibrahim", "age": 25}`|`message Personne { string nom = 1; string prenom = 2; int32 age = 3; }`|
|Poids|Plus volumineux|Plus léger et plus rapide à sérialiser|

**Exemple comparatif :**

```json
// Personne.JSON
[
  { "nom": "Saadani", "prenom": "Ibrahim", "age": 25 },
  { "nom": "Faouzani", "prenom": "Sanaa", "age": 23 }
]
```

```protobuf
// Personne.proto
message Personne {
  string nom = 1;
  string prenom = 2;
  int32 age = 3;
}
```

---

## 3. Les 4 concepts clés de gRPC

```
1. Protocol Buffer
2. HTTP/2
3. Streaming
4. Canaux (Channels)
```

### 3.1 Protocol Buffer (Protobuf)

- Norme de **sérialisation/désérialisation** qui facilite la définition des applications et la **génération automatique du code des stubs** dans différents langages.
- Les fichiers **`.proto`** activent les services gRPC et les communications entre clients et messages du serveur.

### 3.2 HTTP/2

|HTTP/1|HTTP/2|
|---|---|
|Ouvre une **nouvelle connexion TCP** à chaque requête|Prend en charge le **multiplexage** : plusieurs messages en parallèle sur **une seule connexion TCP**|
|—|Prend en charge la **compression d'en-tête** (headers) → paquets plus légers|
|Texte|**Binaire** (Protocol Buffers utilisé comme protocole binaire)|

**Exemple HTTP/1 :**

```
Web browser → GET /document.html HTTP/1.0 → Web server
Web browser ← HTTP/1.1 200 OK, Content-Type text/html ← Web server
```

**Multiplexage HTTP/2 :**

```
HTTP/1.1 : jquery.js, example.css, image.png → 3 connexions TCP
HTTP/2   : jquery.js, example.css, image.png → 1 seule connexion TCP
```

### 3.3 Streaming

- Permet l'exécution de **plusieurs processus dans une seule requête**.
- Rendu possible grâce au **multiplexage HTTP/2**, qui permet d'envoyer/recevoir plusieurs réponses ou requêtes **simultanément** sur une seule connexion TCP.

### 3.4 Canaux (Channels)

- Abstraction clé pour gérer la communication client-serveur.
- Un canal permet au client d'envoyer des **appels RPC**.
- **Avantages :**
    - Réutilisable pour plusieurs appels RPC (plus efficace qu'une nouvelle connexion à chaque fois)
    - **Performances optimisées** grâce au multiplexage HTTP/2
    - **Sécurité intégrée** : prise en charge de TLS/SSL

---

## 4. Les 4 modèles gRPC

```
1. RPC simple (Unaire)
2. Server-Streaming
3. Client-Streaming
4. Bidirectional Streaming
```

Tous s'appuient sur un **Canal gRPC** établi sur une **Connexion HTTP/2** entre Client et Serveur.

### 4.1 RPC Unaire

- Le client envoie **une seule requête** et reçoit **une seule réponse**.
- Peut être **synchrone** (le client attend la réponse) ou **asynchrone** (appel non bloquant, réponse renvoyée de manière asynchrone).

```
Client gRPC ──Request──► Serveur gRPC
Client gRPC ◄──Response── Serveur gRPC
        (HTTP/2)
```

**Cas d'utilisation :**

- Requêtes simples (lecture/écriture d'une information)
- Appels de type API REST classique (1 requête ↔ 1 réponse)

### 4.2 Client-Streaming

Le **client** envoie une **série de messages** au serveur via un flux ; le serveur répond **une seule fois**.

**Fonctionnement :**

1. Le client initie l'appel et ouvre un flux.
2. Il envoie plusieurs messages consécutivement (souvent en asynchrone).
3. Une fois tous les messages envoyés, le **client ferme le flux**.
4. Le serveur traite les messages reçus et envoie **une réponse unique**.

**Cas d'utilisation :**

- Partage de données de localisation en temps réel
- Jeux multijoueurs
- Envoi de grandes quantités de données au serveur
- Localisation du conducteur en temps réel (covoiturage)

### 4.3 Server-Streaming

Le **client** envoie une **requête unique** ; le **serveur** répond par une **série de messages** via un flux.

**Fonctionnement :**

1. Le client initie une requête.
2. Le serveur envoie une série de réponses en flux, de manière asynchrone.
3. Une fois toutes les données envoyées, le flux est fermé.

**Cas d'utilisation :**

- Streaming de données/événements en temps réel
- Rapports progressifs (résultats intermédiaires avant le résultat final)
- Envoi de contenus volumineux en fragments (fichiers, vidéos)

### 4.4 Bidirectional Streaming (BiDi)

Le client et le serveur envoient des messages **simultanément et indépendamment** via un **canal unique**.

**Fonctionnement :**

1. Le client et le serveur ouvrent un **flux partagé**.
2. Le client envoie plusieurs messages, le serveur répond avec plusieurs messages, dans un ordre potentiellement asynchrone.
3. Les deux parties lisent/écrivent indépendamment jusqu'à la fermeture du flux par l'une ou l'autre.

**Cas d'utilisation :**

- Applications interactives en temps réel (chat, jeux en ligne)
- Streaming de données complexes (échange continu)
- Traitement d'événements en temps réel (capteurs, transactions financières)

### Récapitulatif des 4 modèles

|Modèle|Client|Serveur|
|---|---|---|
|Unaire|1 requête|1 réponse|
|Client-Streaming|N requêtes (flux)|1 réponse|
|Server-Streaming|1 requête|N réponses (flux)|
|Bidirectional|N requêtes (flux)|N réponses (flux)|

---

## 5. Protocol Buffer en détail

- **Protobuf** est un langage qui permet de définir **comment l'objet sera sérialisé** et **comment générer le code source** des stubs.
- Téléchargement : `https://github.com/protocolbuffers/protobuf/releases`

### Exemple (`user.proto`)

```protobuf
syntax = "proto3";
option java_package = "stub";

message User {
  int32 id = 1;       // Position 1
  string name = 2;     // Position 2
  string email = 3;    // Position 3
  bool isActive = 4;   // Position 4
}

message UserList {
  repeated User users = 1;  // Une liste d'utilisateurs
}
```

> `repeated` = équivalent d'une liste/tableau d'objets.

### Génération du code (compilation)

```bash
protoc -I="src" --java_out="src/main/java" user.proto
```

---

## 6. Application pratique n°1 : RPC Unaire (Login)

### 6.1 Étapes du projet

```
✓ Fichier ".proto"
✓ Stub (protoc)
✓ Implémentation (UserService)
✓ Server gRPC
✓ Test - BloomRPC
✓ Client gRPC
✓ Ajout d'autres méthodes
```

### 6.2 Schéma

```
Client gRPC ──Request(login & password)──► Serveur gRPC
Client gRPC ◄──Response(msgRep & idRep)──── Serveur gRPC
                     (HTTP/2)
```

### 6.3 Fichier `user.proto` (dans `resources`)

```protobuf
syntax = "proto3";
option java_package = "app.grpc";

service user {
  rpc login(LoginRequest) returns (LoginResponse);
}

message LoginRequest {
  string userName = 1;
  string password = 2;
}

message LoginResponse {
  string msgResponse = 1;
  int32 idResponse = 2;
}
```

### 6.4 Dépendances Maven

```xml
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-stub</artifactId>
    <version>1.15.1</version>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-protobuf</artifactId>
    <version>1.15.1</version>
</dependency>
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.6.1</version>
</dependency>
<dependency>
    <groupId>jakarta.annotation</groupId>
    <artifactId>jakarta.annotation-api</artifactId>
    <version>1.3.5</version>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-netty</artifactId>
    <version>1.16.1</version>
</dependency>
```

### 6.5 Plugin de compilation

- Ajout du plugin **`com.github.os72`**, puis compilation du `user.proto` via le cycle de vie Maven (**validate → compile**).

### 6.6 Classe `UserService` (implémentation du service)

```java
public class UserService extends userGrpc.userImplBase {
    @Override
    public void login(LoginRequest request, StreamObserver<LoginResponse> responseObserver) {
        String username = request.getUserName();
        String password = request.getPassword();
        LoginResponse.Builder response = LoginResponse.newBuilder();

        if (username.equals(password)) {
            response.setIdResponse(0).setMsgResponse("SUCCES");
        } else {
            response.setIdResponse(100).setMsgResponse("NON VALIDE");
        }
        responseObserver.onNext(response.build());
        responseObserver.onCompleted();
    }
}
```

### 6.7 Classe `ServeurGrpc`

```java
public class ServeurGrpc {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(9082)
            .addService(new UserService())
            .build();
        server.start();
        System.out.println("Serveur demarre au port : " + server.getPort());
        server.awaitTermination();
    }
}
```

### 6.8 Test avec BloomRPC (client GRPC graphique)

- Outil : `https://github.com/bloomrpc/bloomrpc/releases`
- Permet de tester les appels **Unary Call** en saisissant le JSON de requête et en visualisant la réponse.

**Exemple :**

```json
// Requête
{ "userName": "Hello", "password": "grpc" }

// Réponse
{ "msgResponse": "NON VALIDE", "idResponse": 100 }
```

### 6.9 Classe `ClientGrpc` (client Java)

```java
public class ClientGrpc {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9082)
            .usePlaintext().build();

        userGrpc.userBlockingStub userStub = newBlockingStub(channel);

        User.LoginRequest login = User.LoginRequest.newBuilder()
            .setUserName("GRPC").setPassword("GRPC").build();

        User.LoginResponse response = userStub.login(login);
        System.out.println(response.getMsgResponse());

        channel.shutdown();
    }
}
```

---

## 7. Application pratique n°2 : Client-Streaming (Salutation)

### 7.1 Schéma

```
Client gRPC ──Proto Request (stream de noms)──► Serveur gRPC (stub, user.proto, Service)
Client gRPC ◄──Proto Response (une seule réponse)──
```

### 7.2 Fichier `Salutation.proto`

```protobuf
syntax = "proto3";
option java_package = "stub";

service Salutation {
  // Client streaming RPC
  rpc message (stream SalutRequest) returns (SalutResponse);
}

message SalutRequest {
  string name = 1;
}

message SalutResponse {
  string message = 1;
}
```

### 7.3 Service `MessageService`

```java
public class MessageService extends SalutationGrpc.SalutationImplBase {
    @Override
    public StreamObserver<SalutRequest> message(StreamObserver<SalutResponse> responseObserver) {
        return new StreamObserver<>() {
            StringBuilder noms = new StringBuilder();

            @Override
            public void onNext(SalutRequest request) {
                // Traite chaque message envoyé par le client
                noms.append(request.getName()).append(", ");
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("Erreur reçue : " + t.getMessage());
            }

            @Override
            public void onCompleted() {
                // Envoie une réponse au client une fois que tous les messages sont reçus
                String responseMessage = "Salut à tous : " + noms.toString();
                SalutResponse response = SalutResponse.newBuilder()
                    .setMessage(responseMessage).build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
            }
        };
    }
}
```

### 7.4 Serveur `MessageServer`

```java
public class MessageServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(9090)
            .addService(new MessageService())
            .build();
        server.start();
        System.out.println("Serveur gRPC en cours d'exécution sur le port " + server.getPort());
        server.awaitTermination();
    }
}
```

### 7.5 Test via BloomRPC

- Mode **"Client Streaming"** dans BloomRPC : plusieurs **Stream** (Stream 1, 2, 3...) envoyés, une **seule réponse** finale reçue.

### 7.6 Client `MessageClient`

```java
public class MessageClient {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9090)
            .usePlaintext().build();

        // Créer un stub asynchrone pour appeler le service
        SalutationGrpc.SalutationStub asyncStub = SalutationGrpc.newStub(channel);

        // Observer pour recevoir la réponse du serveur
        StreamObserver<SalutResponse> responseObserver = new StreamObserver<>() {
            @Override
            public void onNext(SalutResponse response) {
                System.out.println("Réponse du serveur : " + response.getMessage());
            }
            @Override
            public void onError(Throwable t) {
                System.err.println("Erreur : " + t.getMessage());
            }
            @Override
            public void onCompleted() {
                System.out.println("Communication terminée.");
            }
        };

        // Observer pour envoyer les messages au serveur
        StreamObserver<SalutRequest> requestObserver = asyncStub.message(responseObserver);

        try {
            // Envoyer plusieurs messages au serveur
            requestObserver.onNext(SalutRequest.newBuilder().setName("Ahmed").build());
            requestObserver.onNext(SalutRequest.newBuilder().setName("Brahim").build());
            requestObserver.onNext(SalutRequest.newBuilder().setName("Imane").build());
            // Indiquer que tous les messages ont été envoyés
            requestObserver.onCompleted();
        } catch (Exception e) {
            requestObserver.onError(e);
        }

        // Attendre un moment pour que le serveur termine la réponse
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Fermer le canal
        channel.shutdown();
    }
}
```

---

## 8. Application pratique n°3 : Server-Streaming (Table de multiplication)

### 8.1 Schéma

```
Client gRPC ──Proto Request (un seul message)──► Serveur gRPC (stub, user.proto, Service)
Client gRPC ◄──Proto Response (stream de réponses)──
```

### 8.2 Fichier `Multiplication.proto`

```protobuf
syntax = "proto3";
option java_package = "stub";

service Multiplication {
  rpc GetMultiplicationTable (MultiplicationRequest) returns (stream MultiplicationResponse);
}

message MultiplicationRequest {
  int32 nombre = 1;
  int32 limite = 2;
}

message MultiplicationResponse {
  string resultat = 1;
}
```

### 8.3 Service `MultiplicationService`

```java
public class MultiplicationService extends MultiplicationGrpc.MultiplicationImplBase {
    @Override
    public void getMultiplicationTable(MultiplicationRequest request,
                                        StreamObserver<MultiplicationResponse> responseObserver) {
        int nombre = request.getNombre();
        int limite = request.getLimite();

        for (int i = 1; i <= limite; i++) {
            String result = nombre + " x " + i + " = " + (nombre * i);
            MultiplicationResponse response = MultiplicationResponse.newBuilder()
                .setResultat(result).build();
            // Envoyer le message au client
            responseObserver.onNext(response);
        }
        // Terminer le streaming
        responseObserver.onCompleted();
    }
}
```

### 8.4 Serveur `MultiplicationServer`

```java
public class MultiplicationServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(50051)
            .addService(new MultiplicationService())
            .build();
        System.out.println("Serveur gRPC démarré sur le port 50051...");
        server.start();
        server.awaitTermination();
    }
}
```

### 8.5 Test via BloomRPC

- Mode **"Server Streaming"** : une seule requête envoyée (`{"nombre": 10, "limite": 10}`), plusieurs **Stream** de réponses reçus (Stream 1 → Stream 6 : `"10 x 6 = 60"`, etc.).

### 8.6 Client `MultiplicationClient`

```java
public class MultiplicationClient {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
            .usePlaintext().build();

        MultiplicationGrpc.MultiplicationStub stub = MultiplicationGrpc.newStub(channel);

        MultiplicationRequest request = MultiplicationRequest.newBuilder()
            .setNombre(5)
            .setLimite(10)
            .build();

        stub.getMultiplicationTable(request, new io.grpc.stub.StreamObserver<MultiplicationResponse>() {
            @Override
            public void onNext(MultiplicationResponse response) {
                System.out.println(response.getResultat());
            }
            @Override
            public void onError(Throwable t) {
                System.err.println("Erreur : " + t.getMessage());
            }
            @Override
            public void onCompleted() {
                System.out.println("Streaming terminé.");
            }
        });

        // Garder le client en vie pour recevoir les réponses
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        channel.shutdown();
    }
}
```

---

## 9. Questions à Choix Multiples (QCM) — Auto-évaluation

> ⚠️ Ces QCM ne figurent pas dans le PDF original ; ils ont été créés pour vous permettre de vous auto-évaluer. Les corrigés sont fournis juste après chaque question.

**Q1. Qui a publié gRPC et en quelle année (première version) ?**

- A) Facebook, 2015
- B) Google, 2016
- C) Microsoft, 2018
- D) Amazon, 2016

<details><summary>✅ Réponse</summary>B) Google, en 2016.</details>

---

**Q2. Sur quel protocole HTTP gRPC repose-t-il ?**

- A) HTTP/1.0
- B) HTTP/1.1
- C) HTTP/2
- D) HTTP/3

<details><summary>✅ Réponse</summary>C) HTTP/2 (grâce notamment au multiplexage).</details>

---

**Q3. Quel élément côté client fournit les mêmes méthodes que le serveur gRPC ?**

- A) Le canal
- B) Le stub
- C) Le proxy REST
- D) Le sink

<details><summary>✅ Réponse</summary>B) Le stub.</details>

---

**Q4. Quel format est utilisé par Protocol Buffers pour sérialiser les données ?**

- A) Texte JSON
- B) XML
- C) Binaire
- D) YAML

<details><summary>✅ Réponse</summary>C) Format binaire (plus compact et rapide que JSON/XML).</details>

---

**Q5. Quelle est la principale amélioration de HTTP/2 par rapport à HTTP/1 exploitée par gRPC ?**

- A) Le chiffrement obligatoire
- B) Le multiplexage (plusieurs messages en parallèle sur une seule connexion TCP)
- C) L'usage exclusif du protocole UDP
- D) La suppression des en-têtes

<details><summary>✅ Réponse</summary>B) Le multiplexage.</details>

---

**Q6. Dans quel modèle gRPC le client envoie-t-il plusieurs messages et reçoit-il une seule réponse ?**

- A) RPC Unaire
- B) Server-Streaming
- C) Client-Streaming
- D) Bidirectional Streaming

<details><summary>✅ Réponse</summary>C) Client-Streaming.</details>

---

**Q7. Quel modèle gRPC est le plus adapté pour un chat en temps réel où les deux parties échangent continuellement des messages ?**

- A) RPC Unaire
- B) Server-Streaming
- C) Client-Streaming
- D) Bidirectional Streaming

<details><summary>✅ Réponse</summary>D) Bidirectional Streaming.</details>

---

**Q8. Quel mot-clé du langage Protobuf indique qu'un champ RPC retourne un flux de messages ?**

- A) `list`
- B) `stream`
- C) `repeated`
- D) `flux`

<details><summary>✅ Réponse</summary>B) `stream` (utilisé par exemple dans `returns (stream MultiplicationResponse)`).</details>

---

**Q9. Quel mot-clé Protobuf permet de définir une liste répétée d'un même type de message ?**

- A) `stream`
- B) `repeated`
- C) `array`
- D) `multiple`

<details><summary>✅ Réponse</summary>B) `repeated` (ex. `repeated User users = 1;`).</details>

---

**Q10. Quel outil graphique est utilisé dans le cours pour tester un service gRPC sans écrire de code client ?**

- A) Postman
- B) Insomnia
- C) BloomRPC
- D) SoapUI

<details><summary>✅ Réponse</summary>C) BloomRPC.</details>

---

**Q11. Dans l'exemple `UserService`, que fait la méthode `login()` si `username` est égal à `password` ?**

- A) Elle lève une exception
- B) Elle retourne `idResponse=100` et `msgResponse="NON VALIDE"`
- C) Elle retourne `idResponse=0` et `msgResponse="SUCCES"`
- D) Elle ferme la connexion

<details><summary>✅ Réponse</summary>C) Elle retourne `idResponse=0` et `msgResponse="SUCCES"` (logique volontairement simplifiée du cours).</details>

---

**Q12. Que représente un "canal" (channel) en gRPC ?**

- A) Un simple fichier `.proto`
- B) Une abstraction pour gérer la communication entre client et serveur, réutilisable pour plusieurs appels RPC
- C) Une base de données distribuée
- D) Un type de message Protobuf

<details><summary>✅ Réponse</summary>B) Une abstraction de communication réutilisable, avec performances optimisées (multiplexage HTTP/2) et sécurité intégrée (TLS/SSL).</details>

---

## 10. Exercices de codage corrigés

> ⚠️ Exercices additionnels créés pour la pratique, avec correction, en s'appuyant sur les exemples du cours (`user.proto`, `Salutation.proto`, `Multiplication.proto`).

### Exercice 1 — Écrire un fichier `.proto` pour un RPC Unaire

**Énoncé :** Définir un service `Calculatrice` avec une méthode RPC unaire `addition(a, b)` qui retourne la somme des deux nombres.

**Correction :**

```protobuf
syntax = "proto3";
option java_package = "stub";

service Calculatrice {
  rpc addition (AdditionRequest) returns (AdditionResponse);
}

message AdditionRequest {
  int32 a = 1;
  int32 b = 2;
}

message AdditionResponse {
  int32 resultat = 1;
}
```

---

### Exercice 2 — Implémenter le service côté serveur

**Énoncé :** Implémenter la classe Java `CalculatriceService` correspondant au `.proto` de l'exercice 1.

**Correction :**

```java
public class CalculatriceService extends CalculatriceGrpc.CalculatriceImplBase {
    @Override
    public void addition(AdditionRequest request, StreamObserver<AdditionResponse> responseObserver) {
        int a = request.getA();
        int b = request.getB();

        AdditionResponse response = AdditionResponse.newBuilder()
            .setResultat(a + b)
            .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
```

---

### Exercice 3 — Démarrer le serveur gRPC

**Énoncé :** Écrire la classe `CalculatriceServer` qui démarre le serveur gRPC sur le port `9095` avec le service `CalculatriceService`.

**Correction :**

```java
public class CalculatriceServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(9095)
            .addService(new CalculatriceService())
            .build();
        server.start();
        System.out.println("Serveur demarre au port : " + server.getPort());
        server.awaitTermination();
    }
}
```

---

### Exercice 4 — Écrire un client gRPC (appel synchrone/bloquant)

**Énoncé :** Écrire un client gRPC qui appelle `addition(4, 7)` sur le serveur `Calculatrice` (port `9095`) et affiche le résultat.

**Correction :**

```java
public class CalculatriceClient {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9095)
            .usePlaintext().build();

        CalculatriceGrpc.CalculatriceBlockingStub stub = CalculatriceGrpc.newBlockingStub(channel);

        AdditionRequest request = AdditionRequest.newBuilder()
            .setA(4).setB(7).build();

        AdditionResponse response = stub.addition(request);
        System.out.println("Résultat : " + response.getResultat());

        channel.shutdown();
    }
}
```

---

### Exercice 5 — Convertir en Server-Streaming

**Énoncé :** Modifier le service `Calculatrice` pour ajouter une méthode `compterJusqua(limite)` en **server-streaming**, qui envoie au client tous les entiers de 1 à `limite`, un par un.

**Correction — `.proto` :**

```protobuf
service Calculatrice {
  rpc addition (AdditionRequest) returns (AdditionResponse);
  rpc compterJusqua (CompteurRequest) returns (stream CompteurResponse);   // ← ajout
}

message CompteurRequest {
  int32 limite = 1;
}

message CompteurResponse {
  int32 valeur = 1;
}
```

**Correction — Service :**

```java
@Override
public void compterJusqua(CompteurRequest request, StreamObserver<CompteurResponse> responseObserver) {
    int limite = request.getLimite();
    for (int i = 1; i <= limite; i++) {
        CompteurResponse response = CompteurResponse.newBuilder().setValeur(i).build();
        responseObserver.onNext(response);
    }
    responseObserver.onCompleted();
}
```

---

### Exercice 6 — Vrai/Faux avec justification

Pour chaque affirmation, dire si elle est **vraie** ou **fausse** et justifier.

1. _"En gRPC, chaque requête ouvre une nouvelle connexion TCP, comme en HTTP/1."_
    
    <details><summary>✅ Réponse</summary>**Faux.** gRPC s'appuie sur HTTP/2, qui permet le multiplexage : plusieurs requêtes/réponses passent par une seule connexion TCP réutilisable (le canal).</details>
2. _"Dans le modèle Server-Streaming, c'est le client qui envoie plusieurs messages."_
    
    <details><summary>✅ Réponse</summary>**Faux.** C'est l'inverse : le client envoie **une seule requête**, et le **serveur** répond par un flux de plusieurs messages.</details>
3. _"Le mot-clé `stream` dans un fichier `.proto` peut s'appliquer aussi bien au paramètre d'entrée qu'au type de retour d'une méthode RPC."_
    
    <details><summary>✅ Réponse</summary>**Vrai.** `rpc message (stream SalutRequest) returns (SalutResponse)` (client-streaming) et `rpc GetMultiplicationTable (...) returns (stream MultiplicationResponse)` (server-streaming) l'illustrent tous deux.</details>
4. _"BloomRPC permet de tester un service gRPC sans écrire de code client Java."_
    
    <details><summary>✅ Réponse</summary>**Vrai.** C'est un client graphique qui charge le fichier `.proto` et permet d'envoyer des requêtes (Unary, Client Streaming, Server Streaming...) directement depuis l'interface.</details>
5. _"Protocol Buffers est un format texte lisible comme JSON."_
    
    <details><summary>✅ Réponse</summary>**Faux.** Protobuf est un format **binaire**, plus compact et plus rapide à traiter que JSON (qui, lui, est textuel).</details>

---

## 11. Récapitulatif visuel — Résumé express

|Concept|Point clé à retenir|
|---|---|
|gRPC|Framework RPC via HTTP/2, créé par Google (2016)|
|Stub|Composant client offrant les mêmes méthodes que le serveur|
|Protocol Buffer|Sérialisation binaire, fichiers `.proto`, génère le code des stubs|
|HTTP/2|Multiplexage, compression d'en-têtes, format binaire|
|Streaming|Plusieurs échanges dans une seule requête/connexion|
|Canal (Channel)|Communication réutilisable, performante et sécurisée (TLS/SSL)|
|RPC Unaire|1 requête → 1 réponse|
|Client-Streaming|N requêtes (flux) → 1 réponse|
|Server-Streaming|1 requête → N réponses (flux)|
|Bidirectional Streaming|N requêtes ↔ N réponses (flux simultané)|
|Mots-clés `.proto`|`message`, `service`, `rpc`, `stream`, `repeated`|
|Outils|`protoc` (compilation), BloomRPC (test client graphique)|

---

_Fin de la fiche de révision — Partie 4 : gRPC_
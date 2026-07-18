---
title: Spring Framework & Spring Boot
subtitle: Partie I – Les Fondements de Spring Framework
author: Nom de l'auteur
version: "1.0"
date: "2026"
---
# Les Fondements de Spring Framework

# 1. Les exigences d'un projet informatique

## Définition

Les exigences d'un projet informatique représentent **l'ensemble des besoins que l'application doit satisfaire** afin de répondre aux attentes des utilisateurs, des développeurs et de l'entreprise.

---

## Types d'exigences

### 1. Exigences fonctionnelles

**Définition :**  
Décrivent **ce que l'application doit faire**.

**Exemples (Bank Management System) :**

- Ajouter un client.
    
- Créer un compte bancaire.
    
- Effectuer un dépôt.
    
- Effectuer un retrait.
    
- Réaliser un virement.
    
- Consulter le solde.
    
- Générer un historique des transactions.
    

---

### 2. Exigences techniques (Non fonctionnelles)

**Définition :**  
Décrivent **comment l'application doit fonctionner**.

**Exemples :**

- Temps de réponse inférieur à 2 secondes.
    
- Disponibilité 24h/24.
    
- Sécurité des données.
    
- Sauvegarde automatique.
    
- Haute performance.
    
- Facilité de maintenance.
    

---

### 3. Exigences financières

**Définition :**  
Concernent le **budget du projet**.

**Exemples :**

- Coût des serveurs.
    
- Hébergement Cloud.
    
- Licence de logiciels.
    
- Développement.
    
- Maintenance.
    
- Formation des utilisateurs.
    

---

## Exemple

Une banque souhaite développer une application.

| Type          | Exemple               |
| ------------- | --------------------- |
| Fonctionnelle | Effectuer un virement |
| Technique     | Réponse < 2 secondes  |
| Financière    | Budget : 20 000 €     |

---

# 2. Inversion de Contrôle (IoC)

## Définition

L'**Inversion de Contrôle (IoC)** est un principe selon lequel **ce n'est plus le développeur qui crée les objets**, mais **Spring**.

Autrement dit :

> **Spring contrôle la création et la gestion des objets.**

---

## Sans IoC

Le développeur crée les objets.

```java
BanqueRepository repository = new BanqueRepository();

BanqueService service = new BanqueService(repository);
```

Schéma

```
Main

↓

new Repository()

↓

new Service()
```

---

## Avec IoC

```java
@Repository
public class BanqueRepository{
}

@Service
public class BanqueService{

    private final BanqueRepository repository;

    public BanqueService(BanqueRepository repository){
        this.repository = repository;
    }

}
```

Schéma

```
Spring

↓

Crée Repository

↓

Crée Service

↓

Injection automatique
```

---

## Avantages

- Réduction du couplage.
    
- Maintenance facilitée.
    
- Tests plus simples.
    
- Code plus propre.
    

---

# 3. Les transactions (@Transactional)

```java
import org.springframework.transaction.annotation.Transactional;
```

## Définition

Une transaction est un **ensemble d'opérations exécutées comme une seule opération logique**.

> **Toutes les opérations réussissent (Commit) ou toutes sont annulées (Rollback).**

---

## Exemple

Ahmed possède **1000 DH**.

Il veut envoyer **300 DH** à Sara.

Étapes :

1. Retirer 300 DH du compte Ahmed.
    
2. Ajouter 300 DH au compte Sara.
    

Si l'étape 2 échoue :

- Ahmed ne doit pas perdre son argent.
    

Grâce à `@Transactional`, Spring annule automatiquement l'opération.

```java
@Transactional
public void virement(){

    retirer(300);

    deposer(300);

}
```

---

## Schéma

```
BEGIN

↓

Retrait

↓

Dépôt

↓

COMMIT
```

Si erreur

```
BEGIN

↓

Retrait

↓

Erreur

↓

ROLLBACK
```

---

# 4. Le couplage

## Définition

Le couplage représente le **niveau de dépendance entre deux classes**.

Question à se poser :

> **Si je modifie une classe, devrai-je modifier une autre ?**

- Oui → Couplage fort.
    
- Non → Couplage faible.
    

---

## Couplage fort

```java
public class BanqueService{

    private BanqueRepository repository =
            new BanqueRepository();

}
```

Le service crée directement son Repository.

Si Repository change :

Le service doit être modifié.

---

## Couplage faible

```java
public interface IRepository{

    void save();

}
```

```java
public class BanqueService{

    private IRepository repository;

    public BanqueService(IRepository repository){

        this.repository = repository;

    }

}
```

Le service dépend uniquement de l'interface.

---

## Comparaison

|Couplage fort|Couplage faible|
|---|---|
|Dépendance directe|Dépendance à une interface|
|Peu flexible|Très flexible|
|Maintenance difficile|Maintenance facile|

---

# 5. Injection de Dépendances (DI)

## Définition

L'Injection de Dépendances consiste à **fournir les objets nécessaires à une classe au lieu qu'elle les crée elle-même**.

---

## Sans DI

```java
private BanqueRepository repository =
        new BanqueRepository();
```

---

## Avec DI

```java
private BanqueRepository repository;

public BanqueService(BanqueRepository repository){

    this.repository = repository;

}
```

Spring fournit automatiquement l'objet.

---

# Types d'injection

## 1. Constructor Injection (Recommandée)

```java
@Service
public class BanqueService{

    private final BanqueRepository repository;

    public BanqueService(BanqueRepository repository){

        this.repository = repository;

    }

}
```

✅ La plus utilisée.

---

## 2. Setter Injection

```java
@Service
public class BanqueService{

    private BanqueRepository repository;

    public void setRepository(BanqueRepository repository){

        this.repository = repository;

    }

}
```

Utilisée lorsque la dépendance est optionnelle.

---

## 3. Field Injection

```java
@Autowired
private BanqueRepository repository;
```

Simple mais moins recommandée dans les nouveaux projets.

---

# 6. Les principales annotations Spring

| Annotation        | Rôle                        | Exemple                   |
| ----------------- | --------------------------- | ------------------------- |
| `@Component`      | Déclare un Bean générique   | Classe utilitaire         |
| `@Service`        | Couche métier               | `BanqueService`           |
| `@Repository`     | Accès aux données           | `BanqueRepository`        |
| `@Controller`     | Contrôleur MVC              | Pages HTML                |
| `@RestController` | API REST                    | Retourne du JSON          |
| `@Autowired`      | Injection automatique       | Injection d'un Repository |
| `@Qualifier`      | Choisir un Bean précis      | EmailService              |
| `@Primary`        | Bean par défaut             | NotificationService       |
| `@Configuration`  | Classe de configuration     | AppConfig                 |
| `@Bean`           | Création manuelle d'un Bean | DataSource                |
| `@Lazy`           | Création à la demande       | NotificationService       |

---

# À retenir

✅ Les exigences définissent les besoins du projet.

✅ IoC signifie que **Spring crée les objets**.

✅ DI signifie que **Spring injecte les objets**.

✅ `@Transactional` garantit la cohérence des données.

✅ Le couplage faible est préférable au couplage fort.

✅ L'injection par constructeur est la méthode recommandée.

✅ Les annotations Spring permettent de déclarer et de gérer automatiquement les Beans.
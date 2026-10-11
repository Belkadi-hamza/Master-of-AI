# Logiciel
> Un logiciel est un ensemble d'entites necessaire au fonctionnement d'un processus de traitement automatique d'informations.

# Processus
>Un ensemble d'activites qui conduisent a la production d'un logiciel.

**Étapes du processus : **
1. Analyse de besoin
2. Conception
3. Codage 
4. Tests
5. Maintenance
---
# Modèles linéaires

## 1. Modèle en cascade

```mermaid
flowchart TD
    A["📋 Analyse<br>des besoins"] --> B["🔍 Analyse<br>du système"]
    B --> C["📐 Conception"]
    C --> D["💻 Implémentation &<br>tests unitaires"]
    D --> E["✅ Validation &<br>tests d'intégration"]
    E --> F["🔧 Exploitation &<br>maintenance"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style E fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style F fill:#fce4ec,stroke:#c62828,stroke-width:2px
```

>**Pas de validation intermédiaire. Haut risque : erreurs coûteuses !**

**Quand l'utiliser ?**
- Quand les besoins sont connus et stables
- Lors de la création d'une nouvelle version d'un produit existant
- Quand la technologie à utiliser est maîtrisée
- Lors du portage d'un produit sur une autre plateforme
## 2. Modèle en V

> Validations intermédiaires pour prévenir les erreurs tardives : meilleure planification et gestion.

```mermaid
flowchart TD
    A["📋 Expression<br>des besoins"] --> B["📝 Spécifications"]
    B --> C["📐 Analyse<br>Conception"]
    C --> D["💻 Implémentation"]
    D --> E["✅ Validation<br>finale"]
    E --> F["🔍 Validation<br>Analyse"]
    F --> G["📊 Validation<br>fonctionnelle"]
    G --> H["🎯 Validation<br>besoins"]

    A -.->|"Correspondance"| H
    B -.->|"Correspondance"| G
    C -.->|"Correspondance"| F
    D -.->|"Correspondance"| E

    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style E fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style F fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style G fill:#e0f7fa,stroke:#00695c,stroke-width:2px
    style H fill:#ffcc80,stroke:#e65100,stroke-width:2px
```
**Quand l'utiliser ?**
- Quand les besoins sont connus à l'avance
- Les technologies à utiliser sont connues à l'avance
- Quand le produit à développer a de très hautes exigences de qualité
---
# Modèles itératifs
## 1. Modèle de développement incrémental
```mermaid
flowchart TD
    A["📋 Spécifications"] --> B["📐 Conception"]
    B --> C["💻 Implémentation"]
    C --> D["🧪 Tests"]
    D -->|"🔁 Incrément suivant"| A
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

**Quand l'utiliser ?**
- Quand la plupart des spécifications sont connues à l'avance et vont être sujettes à de faibles évolutions.
- Quand on veut rapidement un produit fonctionnel.
- Pour des projets de longues durées.
- Pour des projets impliquant de nouvelles technologies.

## 2. Modèle de développement en spirale

```mermaid
flowchart TD
    A["🎯 Objectifs"] --> B["⚠️ Analyse<br>des risques"]
    B --> C["💻 Développement<br>& Tests"]
    C --> D["📋 Planification<br>de l'itération suivante"]
    D --> A

    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

## 3. Prototypage jetable
>**Idée :** fournir rapidement un prototype exécutable pour permettre une validation concrète (ici expérimentale) et non sur papier (document).

```mermaid
flowchart TD
    A["📐 Spécification<br>schématique"] --> B["💻 Codage du<br>prototype"]
    B --> C["📊 Évaluation du<br>prototype"]
    C --> D["✅ Acceptation<br>du système"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

## 4. Prototypage évolutif

```mermaid
flowchart TD
    A["📐 Spécification<br>schématique"] --> B["💻 Codage du<br>prototype"]
    B --> C["📊 Évaluation du<br>prototype"]
    C --> D["📝 Spécification<br>du système"]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style D fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

---
# Méthodes Agiles

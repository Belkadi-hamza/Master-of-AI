# Types of Charts in Markdown

Markdown supports various chart types through different syntaxes and extensions. Here are the main types with examples:

## 1. **Flowchart** (Mermaid)
```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
```

---

## 2. **Sequence Diagram** (Mermaid)
```mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice->>John: See you later!
```

---

## 3. **Class Diagram** (Mermaid)
```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
```

---

## 4. **State Diagram** (Mermaid)
```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

---

## 5. **ER Diagram** (Mermaid)
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

---

## 6. **Gantt Chart** (Mermaid)
```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2023-01-01, 30d
    Another task     :after a1, 20d
    section Another
    Task in sec      :2023-01-12, 12d
    another task     :24d
```

---

## 7. **Pie Chart** (Mermaid)
```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

---

## 8. **Timeline** (Mermaid)
```mermaid
timeline
    title History of Social Media
    2004 : Facebook
    2005 : YouTube
    2006 : Twitter
    2010 : Instagram
```

---

## 9. **Git Graph** (Mermaid)
```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

---

## 10. **Mindmap** (Mermaid)
```mermaid
mindmap
  root((Mindmap))
    Origins
      Long history
      Popularisation
        British popular psychology
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
          Creative techniques
          Strategic planning
          Argument mapping
```

---

## 11. **Quadrant Chart** (Mermaid)
```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```

---

## 12. **Requirement Diagram** (Mermaid)
```mermaid
requirementDiagram
    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }
    element test_entity {
    type: simulation
    }
    test_entity - satisfies -> test_req
```

---

## 13. **User Journey** (Mermaid)
```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

---

## 14. **XY Chart** (Mermaid)
```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 400 --> 1100
    bar [500, 600, 750, 820, 900, 1050, 1100, 950, 870, 780, 650, 550]
    line [400, 450, 500, 550, 600, 650, 700, 650, 600, 550, 500, 450]
```

---

## 15. **Table** (Standard Markdown)
```markdown
| Feature   | Status | Priority |
|-----------|--------|----------|
| Login     | ✅     | High     |
| Dashboard | 🚧     | Medium   |
| Reports   | ❌     | Low      |
```

---

## 16. **Code Block with Syntax Highlighting**
```json
{
  "name": "Markdown Charts",
  "version": "1.0",
  "types": ["flowchart", "sequence", "class", "state", "er", "gantt", "pie"]
}
```

---

## 17. **ASCII Art Charts**
```
        ▲
        │
   High │    ╔═══════╗
        │    ║  Core  ║
  Cost │    ║Features║
        │    ╚═══╤═══╝
        │        │
   Low  │────────┼────────►
        │   Low  │  High
        │  Value │  Value
        ▼
```

---

## 18. **Admonitions/Callouts** (with emojis)
> [!NOTE]
> This is a note about Markdown charts

> [!TIP]
> Use Mermaid for advanced diagrams

> [!IMPORTANT]
> Not all Markdown renderers support Mermaid

> [!WARNING]
> Some charts may not render in all platforms

> [!CAUTION]
> Check compatibility before using

---

**Note:** Mermaid charts (1-14) require a Markdown renderer that supports Mermaid.js (like GitHub, GitLab, or Obsidian). Standard Markdown tables and code blocks work everywhere.
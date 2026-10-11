# PHASE 4 — AGENTIC AI, TOOL CALLING, LANGGRAPH ET MCP

# 0. OBJECTIF GÉNÉRAL

À la fin de la Phase 3, tu sais construire :

```text
User
 ↓
LLM
 ↓
RAG
 ↓
Vector Database
 ↓
Answer
```

C'est déjà un système LLM.

Mais maintenant imagine que l'utilisateur dit :

> « Vérifie les disponibilités du médecin, trouve le créneau de demain à 15h, réserve-le et confirme le rendez-vous. »

Le système doit :

```text
Comprendre la demande
        ↓
Décider quoi faire
        ↓
Choisir les bons outils
        ↓
Appeler les outils
        ↓
Analyser les résultats
        ↓
Décider de l'étape suivante
        ↓
Éventuellement demander une validation humaine
        ↓
Terminer la tâche
```

C'est le domaine de :

# Agentic AI

---

# 1. CHATBOT VS AGENT

Cette distinction doit être parfaitement claire.

## Chatbot classique

```text
User
 ↓
LLM
 ↓
Answer
```

Le LLM génère principalement une réponse.

---

## RAG

```text
User
 ↓
Retriever
 ↓
Context
 ↓
LLM
 ↓
Answer
```

Le système consulte des connaissances externes.

---

## Agent

```text
                  User
                    ↓
                  Agent
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        Tool      Tool      Tool
          │         │         │
          └─────────┼─────────┘
                    ↓
                  Result
                    ↓
                  Agent
                    ↓
              Next decision
                    ↓
                  Answer
```

L'agent peut sélectionner des outils et poursuivre une boucle de travail.

Les frameworks actuels décrivent justement un agent comme un LLM équipé d'instructions et d'outils, avec éventuellement des garde-fous, du routage/délégation et des sorties structurées.

---

# 2. UN AGENT N'EST PAS « UN LLM QUI RÉFLÉCHIT »

Erreur fréquente :

> Agent = LLM + prompt très long

Non.

Un véritable système agentique possède généralement plusieurs éléments :

```text
Agent
├── Model
├── Instructions
├── Tools
├── State
├── Memory
├── Control flow
├── Guardrails
├── Evaluation
└── Observability
```

C'est l'ensemble qui crée le système.

---

# 3. LE CONCEPT LE PLUS IMPORTANT : TOOL CALLING

Supposons :

```text
User:
What is the weather in Paris?
```

L'agent peut décider :

```text
Need weather information
        ↓
Call weather tool
        ↓
Get result
        ↓
Generate answer
```

Le modèle ne « possède » pas directement la météo.

Il appelle un outil.

---

# 4. QU'EST-CE QU'UN TOOL ?

Un tool est une fonction que l'agent peut appeler.

Exemple :

```python
def get_weather(city: str) -> dict:
    ...
```

Ou :

```python
def search_customer(customer_id: int) -> dict:
    ...
```

Ou :

```python
def book_appointment(
    doctor_id: int,
    date: str,
    time: str
) -> dict:
    ...
```

Le modèle reçoit une description du tool et de ses paramètres.

---

# 5. TOOL DESCRIPTION

Un tool doit avoir une description claire.

Exemple conceptuel :

```text
Tool name:
get_doctor_availability

Description:
Return available appointment slots for a doctor
between two dates.

Arguments:
doctor_id: integer
start_date: date
end_date: date
```

Le modèle doit comprendre :

```text
QUAND utiliser le tool
+
COMMENT l'appeler
+
QUELS PARAMÈTRES fournir
```

---

# 6. TOOL SCHEMA

Un outil peut être représenté conceptuellement par :

```json
{
  "name": "get_doctor_availability",
  "description": "Get available appointment slots.",
  "parameters": {
    "type": "object",
    "properties": {
      "doctor_id": {
        "type": "integer"
      },
      "date": {
        "type": "string"
      }
    },
    "required": [
      "doctor_id",
      "date"
    ]
  }
}
```

Le modèle ne doit pas générer n'importe quels arguments.

Le schéma sert à structurer l'appel.

---

# 7. LA BOUCLE D'UN AGENT

Comprends cette boucle par cœur :

```text
                    START
                      │
                      ▼
                   User
                      │
                      ▼
                    LLM
                      │
                ┌─────┴─────┐
                │           │
             Answer      Tool call
                            │
                            ▼
                           Tool
                            │
                            ▼
                        Tool result
                            │
                            ▼
                           LLM
                            │
                      ┌─────┴─────┐
                      │           │
                   Answer      Tool call
```

La boucle continue jusqu'à ce que la tâche soit terminée.

---

# 8. EXEMPLE CONCRET

Utilisateur :

> « Combien de commandes a eu le client 1042 cette semaine ? »

L'agent :

```text
1. Comprendre la question
2. Identifier qu'une DB est nécessaire
3. Appeler get_orders()
4. Recevoir les données
5. Calculer le nombre
6. Répondre
```

Le LLM n'a pas besoin de connaître la base directement.

Il demande :

```text
get_orders(customer_id=1042)
```

---

# 9. TOOL CALLING MANUEL

Avant les frameworks, comprends le mécanisme.

```python
def get_orders(customer_id: int):
    return [
        {"id": 1, "status": "delivered"},
        {"id": 2, "status": "pending"},
        {"id": 3, "status": "delivered"},
    ]
```

Puis ton orchestration fait :

```text
LLM
 ↓
tool_call
 ↓
Python function
 ↓
result
 ↓
LLM
```

Cette logique fondamentale restera vraie même lorsque tu utiliseras un framework.

---

# 10. TYPES DE TOOLS

Un agent peut utiliser :

## Data tools

```text
SQL
MongoDB
Vector DB
REST API
GraphQL
Search
```

## Action tools

```text
send_email
create_ticket
book_appointment
cancel_order
update_database
```

## Computation tools

```text
calculator
Python
statistics
data analysis
```

## Enterprise tools

```text
CRM
ERP
Calendar
HR systems
Internal APIs
```

---

# 11. INFORMATION VS ACTION

Cette distinction est extrêmement importante.

### Read-only tool

```text
search_orders()
get_customer()
get_available_slots()
```

Faible risque.

### Write/action tool

```text
book_appointment()
delete_customer()
send_email()
cancel_order()
```

Plus risqué.

L'agent ne devrait pas traiter les deux exactement de la même manière.

---

# 12. HUMAN-IN-THE-LOOP

Pour une action sensible :

```text
Agent
 ↓
Wants to send email
 ↓
ASK HUMAN
 ↓
Approve?
 ├── Yes → execute
 └── No  → stop
```

LangGraph fournit des mécanismes d'interruption permettant de mettre en pause l'exécution à un point précis et de la reprendre après une entrée humaine ; l'état peut être persisté pendant cette pause.

---

# 13. QUAND DEMANDER L'APPROBATION ?

Par exemple :

```text
search documentation
→ no approval

read database
→ maybe no approval

create appointment
→ depending on policy

send email
→ approval

delete record
→ approval

financial transaction
→ approval
```

Une bonne architecture définit clairement ces niveaux.

---

# 14. GUARDRAILS

Un guardrail est une protection qui vérifie une condition.

Exemple :

```text
User input
 ↓
Safety check
 ↓
Agent
```

ou :

```text
Agent output
 ↓
Validation
 ↓
Final response
```

Les frameworks actuels proposent des validations d'entrée et de sortie, et certaines implémentations permettent de faire échouer rapidement une exécution lorsqu'un contrôle n'est pas satisfait.

---

# 15. EXEMPLE DE GUARDRAIL

Règle :

```text
The appointment agent must never provide medical diagnosis.
```

Utilisateur :

> « Est-ce que j'ai un cancer ? »

Le système doit faire :

```text
Guardrail
   ↓
Reject / redirect
```

et non :

```text
LLM
 ↓
medical diagnosis
```

Dans ton projet médical, reste strictement sur les tâches **administratives** :

```text
booking
cancellation
availability
FAQ clinique
reminders
```

---

# 16. STATE

Voici une autre notion fondamentale.

Supposons :

```text
User:
I want to book an appointment.

Agent:
Which doctor?

User:
Dr. Smith.

Agent:
Which date?

User:
Tomorrow.
```

Le système doit conserver :

```text
doctor = Dr. Smith
date = tomorrow
```

C'est le :

# State

---

# 17. QU'EST-CE QUE LE STATE ?

Le state représente l'état actuel du workflow.

Exemple :

```python
state = {
    "user_message": "...",
    "intent": "appointment_booking",
    "doctor_id": 42,
    "date": "2026-10-09",
    "selected_slot": None,
    "booking_id": None
}
```

Avec LangGraph, le state est une structure partagée entre les différents nœuds du workflow.

---

# 18. STATE VS MEMORY

Ne confonds pas :

```text
State
```

et :

```text
Memory
```

### State

Concerne le travail actuel.

```text
Current task
```

### Short-term memory

Conserve la continuité d'une conversation/thread.

### Long-term memory

Conserve une information utile sur plusieurs interactions.

LangGraph distingue notamment les checkpoints pour la mémoire court terme/thread et les stores pour les données persistantes à long terme.

---

# 19. EXEMPLE

## State

```text
current appointment
```

## Short-term memory

```text
This conversation
```

## Long-term memory

```text
User prefers morning appointments.
```

---

# 20. WORKFLOW DÉTERMINISTE VS AGENTIQUE

Tout ne doit pas devenir un agent.

C'est une règle très importante.

### Workflow déterministe

```text
Upload
 ↓
Extract
 ↓
Validate
 ↓
Store
```

Pas besoin de LLM pour chaque étape.

### Workflow agentique

```text
Question
 ↓
Decide what tool to use
 ↓
Tool
 ↓
Inspect result
 ↓
Decide next action
```

LangGraph est précisément conçu pour mélanger des étapes déterministes écrites en code avec des étapes pilotées par le LLM au sein d'un même graphe.

---

# 21. NE PAS UTILISER UN AGENT PARTOUT

Mauvais :

```text
LLM
 ↓
Agent
 ↓
Agent
 ↓
Agent
 ↓
Agent
```

pour :

```text
"Additionne 2 + 2"
```

Meilleur :

```text
Calculator tool
 ↓
4
```

L'AI Engineer doit savoir **où mettre de l'IA et où ne pas en mettre**.

---

# 22. ROUTING

Premier cas pratique :

```text
User
 ↓
Router
 ├── FAQ
 ├── Booking
 ├── Billing
 └── Complaint
```

L'agent décide quel chemin prendre.

---

# 23. ROUTER VS HANDOFF

Deux stratégies très importantes.

## Router

Un contrôleur choisit :

```text
Question
 ↓
Specialist
```

## Handoff

Un agent transmet réellement la conversation à un spécialiste.

Les systèmes d'agents modernes proposent des mécanismes de handoff pour déléguer une tâche à un agent spécialisé ; OpenAI distingue notamment le modèle « manager avec agents comme tools » du modèle « handoff », où un spécialiste prend la main.

---

# 24. MANAGER PATTERN

Architecture :

```text
                   Manager
                  /   |    \
                 /    |     \
                ▼     ▼      ▼
             Billing FAQ   Booking
             Agent  Agent    Agent
```

Le Manager conserve le contrôle.

---

# 25. HANDOFF PATTERN

```text
Triage Agent
     │
     ├── billing → Billing Agent
     │
     ├── booking → Booking Agent
     │
     └── FAQ → FAQ Agent
```

Le spécialiste prend alors en charge la tâche.

---

# 26. QUAND UTILISER MULTI-AGENT ?

Utilise plusieurs agents lorsque les responsabilités sont réellement distinctes.

Exemple :

```text
Research Agent
Code Agent
Data Agent
Planning Agent
```

Évite :

```text
Agent 1
Agent 2
Agent 3
```

si tous font exactement la même chose.

---

# 27. LANGGRAPH

Maintenant on arrive à l'outil principal de cette phase.

LangGraph permet de modéliser un workflow agentique sous forme de graphe composé notamment de :

```text
State
Nodes
Edges
```

Les nœuds font le travail et les arêtes définissent la suite de l'exécution.

---

# 28. GRAPHE SIMPLE

Imagine :

```text
START
  ↓
Classify
  ↓
Answer
  ↓
END
```

Ou :

```text
START
  ↓
Router
 ├── FAQ ──→ Answer
 └── Booking → Book → Confirm
```

---

# 29. PREMIER EXEMPLE LANGGRAPH

Architecture :

```text
START
  ↓
greet
  ↓
END
```

Code conceptuel :

```python
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END


class State(TypedDict):
    message: str


def greet(state: State):
    return {
        "message": f"Hello: {state['message']}"
    }


builder = StateGraph(State)

builder.add_node("greet", greet)

builder.add_edge(START, "greet")
builder.add_edge("greet", END)

graph = builder.compile()
```

---

# 30. NODES

Un node peut être :

```text
LLM call
Tool execution
Python function
Database query
Validation
Reranker
Human approval
```

LangGraph ne force donc pas chaque node à contenir un LLM.

---

# 31. EDGES

Une edge indique :

```text
What happens next?
```

Exemple :

```text
retrieve
 ↓
generate
```

ou conditionnelle :

```text
router
 ├── booking
 └── faq
```

---

# 32. CONDITIONAL EDGES

Conceptuellement :

```python
def route(state):
    if state["intent"] == "booking":
        return "booking"

    return "faq"
```

Puis :

```python
builder.add_conditional_edges(
    "router",
    route,
    {
        "booking": "booking",
        "faq": "faq"
    }
)
```

Tu commences ainsi à construire de véritables workflows.

---

# 33. LES BOUCLES

Une grande force d'un agent est la possibilité d'avoir :

```text
Agent
 ↓
Tool
 ↓
Result
 ↓
Agent
 ↓
Another tool
 ↓
Result
```

Donc le graphe peut contenir des cycles contrôlés.

Exemple :

```text
START
 ↓
Agent
 ↓
Need tool?
 ├── No → END
 └── Yes
       ↓
      Tool
       ↓
      Agent
```

---

# 34. DURABLE EXECUTION

Imagine que ton agent doit faire :

```text
10 actions
```

et qu'il plante à l'action 8.

Un bon runtime doit permettre de reprendre proprement le workflow.

LangGraph est conçu pour des agents long-running/stateful et fournit des mécanismes de persistance/checkpoints permettant notamment de reprendre après interruption ou panne.

---

# 35. CHECKPOINT

Conceptuellement :

```text
Step 1 → checkpoint
Step 2 → checkpoint
Step 3 → checkpoint
Step 4 → checkpoint
```

Si l'application tombe :

```text
Resume from checkpoint
```

plutôt que :

```text
restart everything
```

---

# 36. HUMAN-IN-THE-LOOP AVEC LANGGRAPH

Architecture :

```text
Agent
 ↓
Tool selected
 ↓
Sensitive action
 ↓
INTERRUPT
 ↓
Human
 ↓
Approve
 ↓
Resume
 ↓
Execute
```

C'est très pertinent pour :

```text
send email
delete data
book appointment
financial action
```

LangGraph persiste l'état lors des interruptions afin de permettre une reprise durable.

---

# 37. MEMORY AVEC LANGGRAPH

Tu dois comprendre deux niveaux.

## Short-term

```text
Thread
 ↓
Messages
 ↓
State
```

## Long-term

```text
User
 ↓
Preferences
 ↓
Stored information
```

LangGraph documente cette distinction entre checkpointer et store.

---

# 38. MCP — MODEL CONTEXT PROTOCOL

Maintenant une notion essentielle de 2026 :

# MCP

MCP est un protocole ouvert pour connecter des applications IA à des systèmes externes.

Il standardise notamment l'accès à :

```text
Tools
Resources
Prompts
```

Le protocole officiel actuel est la spécification `2026-07-28`.

---

# 39. POURQUOI MCP ?

Sans standard :

```text
Agent
 ├── custom code → Database
 ├── custom code → Calendar
 ├── custom code → Search
 └── custom code → CRM
```

Avec MCP :

```text
                 AI APPLICATION
                       │
                    MCP Client
                       │
            ┌──────────┼──────────┐
            ▼          ▼          ▼
        MCP Server  MCP Server  MCP Server
          DB         Calendar      CRM
```

MCP standardise la manière dont l'application découvre et utilise ces capacités.

---

# 40. LES TROIS PRIMITIVES MCP

## 1. Tools

Pour agir.

```text
search_database
send_email
calculate
create_ticket
```

Les tools MCP permettent aux modèles d'interagir avec des systèmes externes comme des bases de données, APIs ou services de calcul.

---

## 2. Resources

Pour fournir du contexte/données.

```text
file://...
database://...
document://...
```

Les resources sont conçues pour exposer des données/contextes qu'une application hôte peut incorporer selon ses besoins.

---

## 3. Prompts

Des templates de workflow/instructions réutilisables.

```text
summarize_document
analyze_ticket
generate_report
```

MCP définit les prompts comme des templates structurés avec des entrées attendues.

---

# 41. MCP SERVER

Tu peux créer un serveur MCP en Python.

Le SDK Python actuel est en v2 stable et permet de construire des serveurs exposant tools, resources et prompts.

Exemple conceptuel :

```python
from mcp.server import MCPServer

mcp = MCPServer("Clinic Tools")


@mcp.tool()
def get_available_slots(
    doctor_id: int,
    date: str
) -> list[str]:
    """Return available appointment slots."""
    ...
```

Le principe est extrêmement simple :

```text
Python function
      ↓
MCP tool
```

---

# 42. MCP CLIENT

Un client MCP peut :

```text
connect
 ↓
discover capabilities
 ↓
list tools
 ↓
call tool
 ↓
read resource
```

Le SDK Python actuel propose un `Client` pour communiquer avec un serveur MCP, en local ou via différents transports, et utilise la négociation de protocole appropriée.

---

# 43. ARCHITECTURE AGENT + MCP

```text
                     USER
                       │
                       ▼
                    AGENT
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
      Local Python Tool       MCP Client
                                  │
                    ┌─────────────┼────────────┐
                    ▼             ▼            ▼
               MCP Server    MCP Server   MCP Server
                  CRM          Calendar       DB
```

Ton agent peut donc utiliser :

```text
local tools
+
MCP tools
```

---

# 44. POURQUOI MCP EST IMPORTANT POUR TON PROFIL

Pour toi, le but n'est pas :

> « Je connais le mot MCP. »

Tu dois savoir construire :

```text
MCP server
+
MCP client
+
Agent
```

et expliquer :

```text
Agent decides
 ↓
MCP exposes standardized capability
 ↓
External system executes
 ↓
Result returns
 ↓
Agent continues
```

---

# 45. MCP ET SÉCURITÉ

Un tool agentique peut avoir un impact réel.

Exemple :

```text
delete_database_record()
```

Tu ne dois jamais considérer :

```text
"LLM called the tool"
```

comme une autorisation suffisante.

Il faut penser :

```text
Authentication
Authorization
Validation
Scope
Approval
Audit logs
```

Le protocole MCP récent a justement renforcé plusieurs aspects de la sécurité et de l'autorisation dans la spécification 2026-07-28.

---

# 46. BLOC MULTI-AGENT

Tu vas maintenant construire plusieurs spécialistes.

Exemple :

```text
                  TRIAGE AGENT
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
      FAQ Agent    Booking Agent   Billing Agent
```

---

# 47. FAQ AGENT

Responsabilité :

```text
RAG
Knowledge base
Citations
```

---

# 48. BOOKING AGENT

Responsabilité :

```text
Calendar
Availability
Create appointment
Cancellation
```

---

# 49. BILLING AGENT

Responsabilité :

```text
Customer billing
Invoices
Payment status
```

---

# 50. TOUT NE DOIT PAS ÊTRE MULTI-AGENT

Architecture excessive :

```text
Triage Agent
  ↓
Planning Agent
  ↓
Research Agent
  ↓
Tool Agent
  ↓
Validation Agent
  ↓
Answer Agent
```

Cela ajoute :

```text
Latency
Cost
Complexity
Debugging difficulty
```

Utilise plusieurs agents uniquement lorsque les responsabilités sont réellement différentes.

---

# 51. SUBGRAPHS

LangGraph permet également de composer des graphes plus petits comme des sous-graphes, ce qui est utile notamment pour organiser des systèmes multi-agents.

Conceptuellement :

```text
Main Graph
   │
   ├── FAQ Subgraph
   ├── Booking Subgraph
   └── Billing Subgraph
```

Très intéressant pour un projet avancé.

---

# 52. AGENT EVALUATION

Un agent est plus difficile à évaluer qu'un classifieur.

Pourquoi ?

Parce qu'il peut prendre plusieurs chemins.

Exemple :

```text
Question
 ↓
Tool A
 ↓
Tool B
 ↓
Tool C
 ↓
Answer
```

Ou :

```text
Question
 ↓
Tool B
 ↓
Answer
```

Les deux peuvent être corrects.

---

# 53. CE QU'IL FAUT ÉVALUER

## Final answer

```text
Correctness
Relevance
Completeness
```

## Tool selection

```text
Did the agent choose the correct tool?
```

## Tool arguments

```text
Were the parameters correct?
```

## Workflow

```text
Did the agent take unnecessary steps?
```

## Safety

```text
Did it execute unauthorized actions?
```

---

# 54. TRAJECTORY EVALUATION

Très important.

Tu peux évaluer :

```text
Expected:
Question
 → search_customer
 → get_orders
 → answer
```

Actual :

```text
Question
 → search_customer
 → search_customer
 → calculator
 → get_orders
 → answer
```

Même si la réponse finale est correcte, le trajet est inefficace.

---

# 55. TRACE

Une trace doit permettre de voir :

```text
Run
 ├── LLM call
 ├── Tool call
 ├── Tool result
 ├── LLM call
 ├── Handoff
 └── Final answer
```

L'OpenAI Agents SDK fournit par exemple un tracing intégré des générations LLM, appels d'outils, handoffs, guardrails et événements personnalisés.

L'objectif général est le même quel que soit le framework utilisé :

> comprendre exactement ce que l'agent a fait.

---

# 56. COST CONTROL

Un agent peut faire :

```text
10 LLM calls
```

pour répondre à une question simple.

Tu dois donc mesurer :

```text
LLM calls
Tool calls
Input tokens
Output tokens
Latency
Cost
```

Objectif :

```text
minimum necessary steps
```

---

# 57. LOOP LIMIT

Un agent mal conçu peut boucler :

```text
Agent
 ↓
Tool
 ↓
Agent
 ↓
Tool
 ↓
Agent
 ↓
Tool
...
```

Tu dois donc prévoir :

```text
max_steps
max_tool_calls
timeout
budget
```

---

# 58. TIMEOUT

Exemple :

```text
Agent
 ↓
External API
 ↓
timeout
```

Le workflow doit gérer le problème :

```text
retry
fallback
error
human intervention
```

---

# 59. RETRY

Tous les outils n'ont pas le même comportement.

Pour une erreur réseau temporaire :

```text
retry
```

peut être raisonnable.

Pour :

```text
delete_record()
```

une répétition aveugle peut être dangereuse.

Il faut réfléchir à l'**idempotence**.

---

# 60. IDEMPOTENCE

Une opération idempotente peut être répétée sans produire plusieurs effets indésirables.

Exemple conceptuel :

```text
set_status(order=42, status="cancelled")
```

peut être plus sûr à répéter que :

```text
charge_credit_card(100)
```

Tu dois apprendre à réfléchir en termes de systèmes, pas seulement de LLM.

---

# 61. PROJET PRINCIPAL DE LA PHASE 4

# ⭐ CLINIC OPERATIONS AGENT

Je te recommande ce projet parce qu'il réutilise directement ton idée de Voice Agent tout en ajoutant la vraie couche agentique.

Attention :

**Le projet ne fait pas de diagnostic médical.**

Il gère uniquement les opérations administratives.

---

# 62. FONCTIONNALITÉS

L'utilisateur peut demander :

```text
"Je veux prendre rendez-vous avec le Dr Smith demain."
```

ou :

```text
"Annule mon rendez-vous de vendredi."
```

ou :

```text
"Quels sont les horaires de la clinique ?"
```

ou :

```text
"Quels documents dois-je apporter ?"
```

---

# 63. ARCHITECTURE

```text
                         USER
                          │
                          ▼
                     FastAPI / UI
                          │
                          ▼
                     TRIAGE AGENT
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       FAQ Agent      Booking Agent    Cancellation
          │               │                │
          ▼               ▼                ▼
         RAG          Calendar Tool       DB
          │               │                │
          └───────────────┼────────────────┘
                          │
                          ▼
                     Final Response
```

---

# 64. VERSION AVANCÉE

Ajoute MCP :

```text
                    Agent
                      │
                MCP Client
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Calendar       DB         Clinic
       MCP Server   MCP Server   MCP Server
```

Tu montres alors :

```text
Agents
+
Tool Calling
+
LangGraph
+
MCP
+
RAG
+
API
+
Database
```

---

# 65. ARCHITECTURE LANGGRAPH

Ton graphe pourrait être :

```text
START
  │
  ▼
TRIAGE
  │
  ├──────────────┐
  ▼              ▼
FAQ           BOOKING
  │              │
  ▼              ▼
RAG           GET SLOTS
  │              │
  ▼              ▼
ANSWER       SELECT SLOT
                 │
                 ▼
             HUMAN APPROVAL
              ┌────┴────┐
              ▼         ▼
           APPROVE     REJECT
              │         │
              ▼         ▼
           BOOK       CANCEL
              │
              ▼
           CONFIRM
              │
              ▼
             END
```

---

# 66. STATE DU PROJET

Exemple :

```python
class ClinicState(TypedDict):
    user_message: str
    intent: str | None
    doctor_id: int | None
    date: str | None
    available_slots: list[str]
    selected_slot: str | None
    appointment_id: str | None
    approval_status: str | None
    answer: str | None
```

---

# 67. TOOLS DU PROJET

```text
get_doctors()
get_doctor_availability()
get_patient_appointments()
book_appointment()
cancel_appointment()
get_clinic_information()
```

---

# 68. RISQUE DES TOOLS

Classe-les :

|Tool|Type|Risque|
|---|---|---|
|get_doctors|Read|Faible|
|get_availability|Read|Faible|
|get_clinic_info|Read|Faible|
|get_patient_appointments|Read|Moyen|
|book_appointment|Write|Élevé|
|cancel_appointment|Write|Élevé|

Pour les deux derniers :

```text
human approval
```

peut être intégré.

---

# 69. AJOUT DU RAG

Le FAQ Agent réutilise ton projet de Phase 3 :

```text
Question
 ↓
Retriever
 ↓
Qdrant
 ↓
Top chunks
 ↓
LLM
 ↓
Answer + citation
```

Tu obtiens :

```text
Agent
+
RAG
```

---

# 70. AJOUT DE MCP

Expose par MCP :

```text
Calendar
Database
Clinic information
```

Exemple :

```text
clinic-mcp-server/
│
├── server.py
├── tools/
│   ├── calendar.py
│   ├── appointments.py
│   └── clinic.py
└── README.md
```

Le serveur MCP peut être testé avec l'outil MCP Inspector ; la documentation officielle actuelle fournit un parcours de développement et de test local.

---

# 71. VERSION MICRO-SERVICES

Comme tu veux développer tes projets sous forme de mini-services, voici une architecture particulièrement intéressante :

```text
                    API Gateway
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
         Agent        RAG Service   MCP Server
         Service          │             │
            │             ▼             │
            │          Qdrant            │
            │                           │
            ├──────────────┬────────────┘
            │              │
            ▼              ▼
        Calendar       PostgreSQL
        Service          Service
```

Mais ne construis pas cette architecture complexe dès le premier jour.

Commence par :

```text
monolith
 ↓
modular application
 ↓
agent
 ↓
tools
 ↓
MCP
 ↓
microservices
```

---

# 72. STRUCTURE DU PROJET

```text
clinic-operations-agent/
│
├── app/
│   ├── main.py
│   │
│   ├── agent/
│   │   ├── graph.py
│   │   ├── state.py
│   │   ├── prompts.py
│   │   └── nodes/
│   │
│   ├── tools/
│   │   ├── calendar.py
│   │   ├── appointments.py
│   │   └── clinic.py
│   │
│   ├── rag/
│   │   ├── retriever.py
│   │   └── prompts.py
│   │
│   ├── api/
│   │   └── routes.py
│   │
│   └── core/
│       ├── config.py
│       └── logging.py
│
├── mcp_server/
│   ├── server.py
│   └── tools/
│
├── evaluation/
│   ├── test_cases.json
│   └── evaluate.py
│
├── tests/
│
├── README.md
├── requirements.txt
└── .env.example
```

---

# 73. PHASE DE DÉVELOPPEMENT DU PROJET

## Version 1

Simple agent :

```text
User
 ↓
LLM
 ↓
Answer
```

Objectif :

comprendre le runtime.

---

## Version 2

Ajoute un tool :

```text
Agent
 ↓
calculator
```

---

## Version 3

Plusieurs tools :

```text
Agent
 ├── calculator
 ├── database
 └── search
```

---

## Version 4

Ajoute state :

```text
Agent
 ↓
Stateful workflow
```

---

## Version 5

Passe à LangGraph :

```text
State
+
Nodes
+
Edges
```

---

## Version 6

Ajoute RAG :

```text
Agent
+
RAG
```

---

## Version 7

Ajoute human approval :

```text
Agent
 ↓
Sensitive action
 ↓
Human
```

---

## Version 8

Ajoute MCP :

```text
Agent
 ↓
MCP Client
 ↓
MCP Servers
```

---

## Version 9

Ajoute evaluation :

```text
Final answer
+
Tool selection
+
Tool arguments
+
Trajectory
+
Latency
+
Cost
```

---

# 74. PROJET FINAL

Ton projet final doit pouvoir faire :

```text
USER
 │
 ▼
TRIAGE AGENT
 │
 ├── FAQ
 │    ↓
 │   RAG
 │
 ├── BOOKING
 │    ↓
 │   Calendar
 │
 └── CANCELLATION
      ↓
     Database

All external tools
        ↓
       MCP

Sensitive actions
        ↓
 Human approval

Everything
        ↓
Evaluation
        ↓
Tracing
```

Là, tu as un véritable **Agentic AI System**.

---

# 75. ÉVALUATION DU PROJET

Crée au moins 50 scénarios.

Exemple :

```json
{
  "input": "I want to book an appointment tomorrow",
  "expected_intent": "booking",
  "expected_tool": "get_doctor_availability"
}
```

Puis mesure :

```text
intent accuracy
tool selection accuracy
argument accuracy
task completion
hallucination rate
average steps
latency
cost
```

---

# 76. TRAJECTORY DATASET

Conserve le déroulement :

```text
Input
 ↓
Agent decision
 ↓
Tool
 ↓
Tool result
 ↓
Agent decision
 ↓
Final
```

Exemple :

```text
User
 ↓
Triage
 ↓
get_availability
 ↓
3 slots returned
 ↓
select slot
 ↓
approval
 ↓
book appointment
 ↓
confirm
```

Cela sera extrêmement utile en entretien.

---

# 77. QUESTIONS D'ENTRETIEN — NIVEAU 1

Tu dois pouvoir répondre à :

### Qu'est-ce qu'un AI Agent ?

### Quelle différence entre chatbot, RAG et agent ?

### Qu'est-ce que le tool calling ?

### Pourquoi utiliser des tools ?

### Comment fonctionne la boucle agentique ?

### Qu'est-ce que le state ?

### Quelle différence entre state et memory ?

### Qu'est-ce qu'un workflow déterministe ?

### Pourquoi ne pas transformer chaque workflow en agent ?

---

# 78. QUESTIONS D'ENTRETIEN — NIVEAU 2

### Pourquoi utiliser LangGraph ?

### Qu'est-ce qu'un node ?

### Qu'est-ce qu'une edge ?

### Qu'est-ce qu'une conditional edge ?

### Comment gérer une boucle ?

### Pourquoi utiliser des checkpoints ?

### Comment implémenter human-in-the-loop ?

### Comment gérer une panne au milieu d'un workflow ?

### Comment limiter les boucles infinies ?

---

# 79. QUESTIONS D'ENTRETIEN — NIVEAU 3

### Qu'est-ce que MCP ?

### Quelle différence entre MCP tool et REST API ?

### Quel problème MCP résout-il ?

### Que sont les MCP tools ?

### Que sont les MCP resources ?

### Que sont les MCP prompts ?

### Qu'est-ce qu'un MCP server ?

### Qu'est-ce qu'un MCP client ?

### Comment sécuriser un MCP tool ?

---

# 80. QUESTIONS D'ENTRETIEN — NIVEAU 4

### Quand utiliser un agent unique ?

### Quand utiliser plusieurs agents ?

### Manager vs handoff ?

### Comment évaluer un agent ?

### Qu'est-ce qu'une trajectory ?

### Comment mesurer l'efficacité d'un agent ?

### Comment contrôler le coût ?

### Comment empêcher une action dangereuse ?

### Comment auditer un agent ?

---

# 81. COMPÉTENCES À MAÎTRISER

## Agent Fundamentals

```text
□ Agent architecture
□ Tool calling
□ Tool schemas
□ Agent loop
□ Routing
□ State
□ Memory
□ Guardrails
```

## LangGraph

```text
□ StateGraph
□ State
□ Nodes
□ Edges
□ Conditional edges
□ Loops
□ Checkpoints
□ Persistence
□ Interrupts
□ Human-in-the-loop
□ Subgraphs
```

## MCP

```text
□ MCP concept
□ MCP server
□ MCP client
□ Tools
□ Resources
□ Prompts
□ Discovery
□ Transports
□ Security
```

## Multi-Agent

```text
□ Router
□ Manager
□ Handoff
□ Specialist agents
□ Subgraphs
□ Multi-agent evaluation
```

## Production

```text
□ Timeouts
□ Retries
□ Tool validation
□ Authorization
□ Logging
□ Tracing
□ Cost control
□ Step limits
```

---

# 82. ORDRE D'APPRENTISSAGE

Ne commence pas directement par MCP.

Suis :

```text
1. Tool calling
       ↓
2. Agent loop
       ↓
3. State
       ↓
4. Routing
       ↓
5. LangGraph
       ↓
6. Persistence
       ↓
7. Human-in-the-loop
       ↓
8. Guardrails
       ↓
9. Multi-agent
       ↓
10. MCP fundamentals
       ↓
11. MCP server
       ↓
12. MCP client
       ↓
13. Agent + MCP
       ↓
14. Agent evaluation
       ↓
15. Production architecture
```

---

# 83. PLANNING SUR 8 SEMAINES

## Semaine 1

```text
Tool calling
Agent loop
Tool schemas
```

Projet :

```text
Simple Tool Agent
```

---

## Semaine 2

```text
State
Memory
Routing
```

Projet :

```text
Customer Support Agent
```

---

## Semaine 3

```text
LangGraph
Nodes
Edges
Conditional edges
Loops
```

Projet :

```text
Workflow Agent
```

---

## Semaine 4

```text
Persistence
Checkpoint
Human-in-the-loop
Guardrails
```

Projet :

```text
Approval Agent
```

---

## Semaine 5

```text
Multi-agent
Manager
Handoff
Specialists
```

Projet :

```text
Multi-Agent Support System
```

---

## Semaine 6

```text
MCP
Server
Client
Tools
Resources
Prompts
```

Projet :

```text
Custom MCP Server
```

Le SDK Python MCP actuel fournit justement un parcours officiel pour construire, tester et connecter un serveur MCP ; sa branche stable actuelle est v2.

---

## Semaine 7

```text
Agent
+
LangGraph
+
MCP
+
RAG
```

---

## Semaine 8

Projet final :

# Clinic Operations Agent

```text
Agent
+
LangGraph
+
RAG
+
Tools
+
MCP
+
Human approval
+
Evaluation
```

---

# 84. STACK TECHNIQUE

Pour toi, je recommande :

```text
Python
FastAPI
Pydantic
LangGraph
LangChain components where useful
Qdrant
PostgreSQL
MCP Python SDK
pytest
Docker
Git
```

### Framework principal

**LangGraph**

Parce qu'il t'apprend l'orchestration et le state plutôt que seulement l'appel d'un agent préfabriqué. La documentation actuelle le présente comme un runtime bas niveau d'orchestration pour des applications agentiques stateful.

### Protocol

**MCP**

Pour apprendre l'interopérabilité entre agents et systèmes externes.

---

# 85. CE QUE TU NE DOIS PAS FAIRE

## Erreur 1

Créer immédiatement 10 agents.

```text
Agent 1
Agent 2
Agent 3
...
Agent 10
```

Apprends d'abord un agent unique.

---

## Erreur 2

Mettre le LLM partout.

Certaines étapes doivent rester déterministes.

---

## Erreur 3

Laisser l'agent exécuter toutes les actions sans contrôle.

---

## Erreur 4

Ne pas limiter le nombre de tool calls.

---

## Erreur 5

Ne pas enregistrer les traces.

---

## Erreur 6

Ne pas tester les mauvais scénarios.

---

# 86. RÈGLE D'ARCHITECTURE

À chaque fois que tu ajoutes une fonctionnalité, pose cette question :

> Est-ce qu'il faut réellement un LLM ici ?

Exemple :

```text
Calculate price
→ function

Validate date
→ Python

Check permission
→ deterministic rule

Understand natural language
→ LLM

Choose among several tools
→ LLM / agent
```

Cette manière de penser est fondamentale pour un AI Engineer.

---

# 87. CE QUE TU DOIS SAVOIR EXPLIQUER À UN RECRUTEUR

À la fin de la Phase 4, tu dois pouvoir dire :

> « J'ai construit un système agentique stateful avec LangGraph. Le modèle peut sélectionner des outils selon l'intention de l'utilisateur, l'état du workflow est conservé entre les étapes, les actions sensibles passent par une validation humaine et les outils externes sont exposés via MCP. J'ai également évalué la sélection des tools, les arguments, le taux de réussite, la latence et le coût. »

Cette phrase démontre beaucoup plus qu'une simple liste :

```text
LangChain
LangGraph
MCP
Agents
LLM
```

---

# 88. TON PROFIL APRÈS LA PHASE 4

```text
                  AI ENGINEER
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   SOFTWARE          AI/ML            GENAI
   ENGINEERING                        │
       │               │              │
     Python          PyTorch         LLM
     FastAPI         NLP             RAG
     SQL             Transformers    Embeddings
     Testing         Evaluation      Vector DB
     Git
       │
       └────────────────┬────────────────
                        │
                    AGENTIC AI
                        │
                ┌───────┼────────┐
                │       │        │
             Tools   LangGraph   MCP
                │       │        │
             Memory   State     External
             Guard.   Routing   Systems
                │       │        │
                └───────┼────────┘
                        │
                   Evaluation
                        │
                    Production
```

---

# 89. RÉSULTAT ATTENDU

Après cette phase, ton évolution est :

```text
Phase 1
Software Engineering
        ↓
Phase 2
Deep Learning + NLP
        ↓
Phase 3
LLM + RAG
        ↓
Phase 4
Agentic AI
        ↓
AI Engineer
```

La Phase 4 est terminée lorsque tu peux construire sans tutoriel :

```text
User
 ↓
Agent
 ↓
Understand task
 ↓
Choose tool
 ↓
Execute tool
 ↓
Inspect result
 ↓
Choose next step
 ↓
Ask human if necessary
 ↓
Use RAG if necessary
 ↓
Return structured answer
```

et surtout lorsque tu peux expliquer **pourquoi chaque étape existe**.

---

# 90. CHECKLIST FINALE

```text
□ Je comprends ce qu'est un agent
□ Je comprends tool calling
□ Je peux créer mes propres tools
□ Je comprends agent loops
□ Je comprends state
□ Je comprends memory
□ Je peux construire un graph LangGraph
□ Je peux utiliser conditional routing
□ Je peux créer des boucles
□ Je comprends checkpoints
□ Je peux implémenter human-in-the-loop
□ Je comprends guardrails
□ Je comprends multi-agent
□ Je comprends manager vs handoff
□ Je peux construire un MCP server
□ Je comprends MCP client
□ Je comprends tools/resources/prompts
□ Je peux connecter agent + MCP
□ Je sais évaluer un agent
□ Je sais mesurer coût et latence
□ Je sais limiter les boucles
□ Je sais sécuriser les actions
```

---

# 91. PROJET DE PORTFOLIO FINAL

Le projet doit être présenté comme :

# AI-Powered Clinic Operations Platform

### Technologies

```text
Python
FastAPI
LangGraph
LLM
RAG
Qdrant
PostgreSQL
MCP
Docker
pytest
```

### Capacités

```text
Intent detection
RAG FAQ
Appointment search
Appointment booking
Cancellation
Calendar integration
Human approval
Structured output
Traceability
Evaluation
```

### Architecture

```text
                         USER
                           │
                           ▼
                      FastAPI API
                           │
                           ▼
                     LangGraph Agent
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
            RAG           Tools        Routing
             │             │
             ▼             ▼
           Qdrant        MCP Client
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         Calendar          DB          Clinic Info
          MCP Server     MCP Server    MCP Server
                           │
                           ▼
                    Sensitive Action?
                       /        \
                     YES         NO
                      │           │
                   Human        Execute
                   Approval
                      │
                      ▼
                   Execute
                      │
                      ▼
                   Answer
```

Ce projet devient alors un **excellent pont vers la Phase 5**, où tu vas apprendre à industrialiser tout ce que tu viens de construire avec **MLOps/LLMOps, Docker avancé, CI/CD, MLflow, cloud, Kubernetes, monitoring, tracing et observability**.
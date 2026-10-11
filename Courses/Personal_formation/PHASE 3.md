# PHASE 3 — LLM ENGINEERING ET RAG

## 0. Objectif de la phase

Après les deux premières phases, ton parcours devient :

```text
Phase 1
Software Engineering
        ↓
Python / FastAPI / SQL / Git / Tests
        ↓
Phase 2
AI / Deep Learning / NLP
        ↓
PyTorch / Transformers / BERT
        ↓
Phase 3
LLM Engineering / RAG
```

L'objectif de cette phase est de savoir construire une application :

```text
                USER
                  │
                  ▼
              FastAPI
                  │
                  ▼
             LLM Service
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
      Retrieval         Prompt
          │                │
          ▼                │
     Vector DB             │
          │                │
          └───────┬────────┘
                  ▼
                 LLM
                  │
                  ▼
               Answer
```

Une architecture RAG ajoute des connaissances externes au modèle au moment de la requête : les documents sont transformés en représentations vectorielles, recherchés par similarité, puis fournis au modèle comme contexte. Les systèmes de retrieval modernes utilisent notamment des vector stores pour indexer ces données.

---

# 1. CE QUE TU DOIS SAVOIR AVANT DE COMMENCER

Tu dois déjà être capable de comprendre :

```text
Python
FastAPI
Git
SQL
pytest
PyTorch
NLP
Tokenization
Embeddings
Transformers
BERT
Fine-tuning
```

La Phase 3 ne doit donc pas être :

> « Je découvre ce qu'est un modèle de langage. »

Elle doit être :

> « Je comprends comment intégrer et exploiter un LLM dans une application logicielle. »

---

# 2. LES 8 BLOCS DE LA PHASE 3

```text
BLOC 1
LLM Fundamentals
        ↓
BLOC 2
Prompt Engineering
        ↓
BLOC 3
LLM APIs
        ↓
BLOC 4
Embeddings
        ↓
BLOC 5
Vector Databases
        ↓
BLOC 6
RAG Pipeline
        ↓
BLOC 7
RAG Evaluation
        ↓
BLOC 8
Production RAG Application
```

Les agents, le tool calling complexe et LangGraph seront étudiés ensuite.

---

# 3. BLOC 1 — COMPRENDRE LES LLM

## 3.1 Qu'est-ce qu'un Large Language Model ?

Un LLM est essentiellement un modèle qui apprend à traiter et générer des séquences de tokens.

Une abstraction simple :

```text
Texte
  ↓
Tokenisation
  ↓
Tokens
  ↓
Transformer
  ↓
Probabilités
  ↓
Token suivant
```

Par exemple :

```text
"The capital of France is"
```

Le modèle produit une distribution de probabilités pour le token suivant.

Conceptuellement :

```text
Paris       0.91
London      0.02
Berlin      0.01
Madrid      0.01
...
```

Puis le processus continue.

---

# 4. TOKEN

Tu as déjà étudié la tokenisation en Phase 2.

Pour un LLM, il est important de comprendre que le modèle ne reçoit pas directement :

```text
"Bonjour, comment allez-vous ?"
```

Il reçoit une séquence d'identifiants :

```text
[token_1, token_2, token_3, ...]
```

Un mot n'est pas nécessairement un token.

Exemple conceptuel :

```text
"playing"
↓
["play", "ing"]
```

Le découpage dépend du tokenizer et du modèle.

---

# 5. CONTEXT WINDOW

Un LLM ne peut pas nécessairement traiter une quantité infinie de tokens dans une seule requête.

Il existe une limite de contexte.

Conceptuellement :

```text
System instructions
+
Conversation
+
Documents
+
Question
```

doivent tenir dans le contexte accepté par le modèle.

Cela devient essentiel dans RAG.

Pourquoi ?

Parce qu'on ne veut pas envoyer :

```text
1000 documents
```

au LLM pour chaque question.

On veut plutôt :

```text
1000 documents
      ↓
Retrieval
      ↓
Top relevant chunks
      ↓
LLM
```

---

# 6. PRETRAINING VS INSTRUCTION TUNING

Tu dois distinguer :

```text
Pretraining
```

et :

```text
Instruction tuning / post-training
```

## Pretraining

Le modèle apprend sur énormément de texte.

Conceptuellement :

```text
Large corpus
    ↓
Token sequences
    ↓
Transformer
    ↓
Next-token prediction
```

## Instruction tuning

Le modèle apprend à mieux suivre des instructions.

Exemple :

```text
User:
Explain RAG.

Assistant:
...
```

---

# 7. BASE MODEL VS INSTRUCT MODEL

Un modèle de base est conçu pour continuer du texte.

Un modèle instruct/chat est davantage préparé pour suivre des consignes et dialoguer.

C'est pourquoi tu ne dois pas utiliser n'importe quel checkpoint simplement parce que son nom contient « LLM ».

Hugging Face rappelle notamment que les modèles conversationnels utilisent des **chat templates** adaptés à leur format d'entraînement ; le mauvais format peut dégrader fortement le comportement du modèle.

---

# 8. CHAT TEMPLATE

Conceptuellement, tu peux avoir :

```python
messages = [
    {
        "role": "system",
        "content": "You are an AI assistant."
    },
    {
        "role": "user",
        "content": "What is RAG?"
    }
]
```

Le tokenizer transforme cette structure dans le format attendu par le modèle.

Hugging Face fournit `apply_chat_template()` pour effectuer cette transformation, et souligne que le template doit correspondre au format utilisé lors de l'entraînement du modèle.

Tu dois donc comprendre :

```text
messages
   ↓
chat template
   ↓
tokens
   ↓
model
```

---

# 9. BLOC 2 — PROMPT ENGINEERING

Tu dois arrêter de penser :

> « Prompt = une phrase magique. »

Le prompt est plutôt une **interface de contrôle du comportement du modèle**.

Une structure utile :

```text
Role
+
Task
+
Context
+
Constraints
+
Output format
+
Examples
```

Exemple :

```text
SYSTEM

You are a customer support assistant.

TASK

Classify the customer's intent.

CONTEXT

Customer message:
...

CONSTRAINTS

Choose exactly one label.

OUTPUT

Return JSON:
{
  "intent": "...",
  "confidence": ...
}
```

---

# 10. ZERO-SHOT

Aucune démonstration spécifique.

```text
Classify this message:
"I want to cancel my appointment."
```

Le modèle doit comprendre la tâche sans exemple.

---

# 11. FEW-SHOT

Tu fournis quelques exemples.

```text
Example 1:
"I want to cancel my appointment."
→ appointment_cancellation

Example 2:
"I need a new appointment."
→ appointment_booking

Now classify:
"I don't want to keep my appointment."
```

Le modèle utilise ces exemples pour comprendre le format et la tâche.

---

# 12. SYSTEM / USER / ASSISTANT

Tu dois comprendre les rôles :

```text
system
user
assistant
```

Conceptuellement :

```text
SYSTEM
→ comportement général

USER
→ demande

ASSISTANT
→ réponse
```

Les chat templates des modèles modernes encodent précisément ces rôles dans la séquence de tokens.

---

# 13. PROMPT ENGINEERING À APPRENDRE

Tu dois maîtriser :

```text
Zero-shot
Few-shot
Role prompting
Instruction prompting
Structured output
Output constraints
Examples
Context injection
Prompt templates
```

Et surtout :

```text
Prompt ≠ solution universelle
```

Un mauvais retrieval ne sera pas réparé par un prompt extraordinairement long.

---

# 14. STRUCTURED OUTPUT

Une application professionnelle ne veut pas toujours une réponse libre.

Elle peut demander :

```json
{
  "intent": "appointment_booking",
  "priority": "high",
  "language": "fr"
}
```

Les APIs modernes proposent des mécanismes de **Structured Outputs** permettant de contraindre la sortie à un schéma défini ; OpenAI recommande notamment le JSON Schema pour obtenir des sorties conformes à la structure attendue.

Pour ton profil AI Engineer, c'est très important.

---

# 15. POURQUOI STRUCTURED OUTPUT ?

Sans structure :

```text
The customer wants to book an appointment.
I think the priority is medium...
```

Avec structure :

```json
{
  "intent": "appointment_booking",
  "priority": "medium"
}
```

Ton backend peut alors manipuler le résultat.

```text
LLM
 ↓
Structured JSON
 ↓
Pydantic
 ↓
Python
 ↓
Database
```

---

# 16. BLOC 3 — LLM API

Tu dois maintenant apprendre à appeler un LLM depuis Python.

Architecture :

```text
Python Application
      │
      ▼
LLM API
      │
      ▼
Model
      │
      ▼
Response
```

Le fournisseur importe moins que la compréhension des concepts.

Tu dois comprendre :

```text
API key
model
messages/input
temperature
max output
streaming
errors
timeouts
retries
rate limits
cost
```

---

# 17. API KEY

Jamais :

```python
api_key = "sk-..."
```

directement dans ton dépôt.

Utilise :

```env
LLM_API_KEY=...
```

puis :

```python
import os

api_key = os.getenv("LLM_API_KEY")
```

---

# 18. TEMPERATURE

Conceptuellement, la température contrôle le degré de variation dans l'échantillonnage.

Très simplifié :

```text
Temperature faible
→ sorties plus déterministes

Temperature plus élevée
→ sorties plus variées
```

Pour des tâches structurées :

```text
classification
extraction
JSON
```

on privilégie généralement un comportement plus déterministe.

Pour des tâches créatives, davantage de variation peut être utile.

---

# 19. TOKEN USAGE

Chaque requête a un coût computationnel.

Tu dois apprendre à distinguer :

```text
Input tokens
+
Output tokens
=
Token usage
```

Pourquoi est-ce important ?

Parce qu'en production :

```text
10 utilisateurs
```

et :

```text
100 000 utilisateurs
```

n'ont pas du tout le même coût.

---

# 20. LATENCY

Une application LLM doit également mesurer le temps de réponse.

```text
Request
   ↓
Network
   ↓
LLM processing
   ↓
Response
```

Tu dois mesurer :

```text
Latency
Time to first token
Total generation time
```

Plus tard, cela rejoindra ton observability.

---

# 21. STREAMING

Sans streaming :

```text
Request
   ↓
wait
   ↓
complete response
```

Avec streaming :

```text
Request
   ↓
token
token
token
token
...
```

Pour les interfaces conversationnelles, cela améliore la perception de rapidité.

---

# 22. ERROR HANDLING

Ton application doit gérer :

```text
Timeout
Authentication error
Rate limit
Invalid request
Model unavailable
Network error
```

Architecture :

```text
Client
 ↓
LLM Service
 ↓
try
 ↓
API call
 ↓
except
 ↓
structured error
```

---

# 23. BLOC 4 — EMBEDDINGS

C'est le cœur de RAG.

Un embedding transforme une donnée en vecteur numérique.

```text
Text
 ↓
Embedding Model
 ↓
Vector
```

Par exemple :

```text
"How do I reset my password?"
```

devient un vecteur :

```text
[0.12, -0.43, 0.77, ...]
```

Les embeddings représentent les relations sémantiques entre textes ; ils sont utilisés pour la recherche, le clustering, la recommandation, la classification et d'autres tâches.

---

# 24. EMBEDDING SPACE

Imagine un espace :

```text
              password reset
                   ●
                  ●
              ●
                         ● account access


                                       ● appointment
                                 ● booking
```

Les textes sémantiquement proches se retrouvent proches dans cet espace.

Qdrant décrit justement la recherche vectorielle comme une recherche de similarité entre objets représentés par des embeddings.

---

# 25. SIMILARITÉ VECTORIELLE

Une métrique courante est la similarité cosinus.

Formule :

```text
cosine_similarity(A,B)
=
(A · B) / (||A|| ||B||)
```

Intuition :

```text
≈ 1
→ très similaire

≈ 0
→ peu similaire

≈ -1
→ direction opposée
```

En pratique, la métrique et l'index dépendent du système utilisé.

---

# 26. CHOISIR UN EMBEDDING MODEL

Tu dois comprendre qu'il existe :

```text
Proprietary embedding models
Open-source embedding models
Multilingual embedding models
Domain-specific embeddings
```

Pour ton projet multilingue :

```text
French
English
Darija
```

il faut particulièrement regarder :

```text
Multilingual performance
Dimension
Latency
Cost
License
```

OpenAI documente par exemple `text-embedding-3-small` et `text-embedding-3-large`, avec des dimensions par défaut respectives de 1536 et 3072, et la possibilité de réduire la dimension avec le paramètre `dimensions`.

---

# 27. NE CONFONDS PAS TROIS CHOSES

Très important :

```text
Embedding Model
        ≠
LLM
        ≠
Vector Database
```

### Embedding model

Transforme :

```text
text → vector
```

### Vector database

Stocke :

```text
vector + metadata
```

et permet la recherche.

### LLM

Transforme notamment :

```text
prompt + context → answer
```

---

# 28. BLOC 5 — VECTOR DATABASE

Une vector database est conçue pour stocker et rechercher efficacement des vecteurs.

Exemple :

```text
Document chunk
      ↓
Embedding
      ↓
Vector DB
```

Qdrant organise notamment les données sous forme de **collections** contenant des **points**, chaque point pouvant associer un vecteur à un payload contenant des métadonnées.

---

# 29. QDRANT

Pour ton parcours, je recommande d'apprendre :

```text
Qdrant
```

comme première vraie vector database.

Pourquoi ?

Parce qu'elle est simple à lancer localement et possède un client Python officiel. Qdrant propose également des fonctionnalités de recherche dense, sparse, multi-vector, filtrage par payload et reranking dans ses outils/documentations.

---

# 30. STRUCTURE D'UN POINT QDRANT

Conceptuellement :

```json
{
  "id": "doc_001_chunk_04",
  "vector": [0.13, -0.22, ...],
  "payload": {
    "document": "faq.pdf",
    "page": 4,
    "section": "Password Reset",
    "language": "en"
  }
}
```

Le :

```text
vector
```

sert à la recherche.

Le :

```text
payload
```

sert notamment aux métadonnées et au filtrage.

---

# 31. COLLECTION

Une collection contient des points partageant une configuration vectorielle.

Conceptuellement :

```text
Collection
   │
   ├── point 1
   ├── point 2
   ├── point 3
   └── ...
```

Exemple :

```text
customer_support_docs
```

---

# 32. UPSERT

Tu dois comprendre le principe :

```text
create collection
       ↓
generate embeddings
       ↓
insert/upsert points
```

Puis :

```text
query vector
       ↓
similarity search
       ↓
top-k results
```

---

# 33. TOP-K

Supposons :

```text
Question
 ↓
Embedding
 ↓
Vector Search
```

Le système peut retourner :

```text
Top 5 chunks
```

par exemple :

```text
1. chunk 34 — score 0.91
2. chunk 79 — score 0.88
3. chunk 11 — score 0.86
4. chunk 52 — score 0.83
5. chunk 93 — score 0.81
```

Ces chunks deviennent le contexte potentiel du LLM.

---

# 34. PAYLOAD FILTERING

Exemple :

```text
Search only documents where:

language = "fr"
```

ou :

```text
department = "HR"
```

Qdrant prend en charge les payload indexes et le filtrage associé à la recherche vectorielle.

Cela devient très intéressant en environnement entreprise.

---

# 35. DENSE VS SPARSE

Tu dois comprendre la différence générale.

### Dense retrieval

Basé sur des embeddings.

```text
meaning
```

### Sparse retrieval

Basé sur des signaux lexicaux/mots-clés.

Qdrant documente notamment la recherche sparse et le BM25 pour les cas où les termes exacts ou les identifiants sont importants.

---

# 36. POURQUOI HYBRID SEARCH ?

Imagine :

```text
Question:

"Quel est le code produit XJ-2049 ?"
```

Une recherche sémantique peut être moins bonne sur un identifiant exact.

Mais :

```text
BM25 / keyword
```

est très bon pour le terme exact.

Donc :

```text
Dense Search
+
Sparse Search
↓
Hybrid Search
```

Qdrant fournit précisément des tutoriels sur la recherche hybride et le reranking.

---

# 37. BLOC 6 — RAG

RAG signifie :

**Retrieval-Augmented Generation**

L'idée :

```text
LLM
+
External Knowledge
=
RAG
```

Au lieu de demander directement :

```text
Question → LLM
```

on fait :

```text
Question
   ↓
Retrieval
   ↓
Relevant documents
   ↓
Prompt + Context
   ↓
LLM
   ↓
Answer
```

OpenAI décrit le retrieval comme une recherche par similarité sémantique sur des données indexées dans des vector stores, particulièrement utile lorsqu'elle est combinée à un modèle pour synthétiser une réponse.

---

# 38. RAG OFFLINE PIPELINE

Avant même qu'un utilisateur pose une question :

```text
Documents
   ↓
Load
   ↓
Parse
   ↓
Clean
   ↓
Chunk
   ↓
Embed
   ↓
Store
```

C'est la partie **indexation**.

---

# 39. RAG ONLINE PIPELINE

Quand l'utilisateur pose une question :

```text
User Question
      ↓
Query Embedding
      ↓
Vector Search
      ↓
Top-K Chunks
      ↓
Optional Reranking
      ↓
Prompt Construction
      ↓
LLM
      ↓
Answer
```

Tu dois parfaitement distinguer :

```text
Indexing pipeline
```

et :

```text
Query pipeline
```

---

# 40. DOCUMENT LOADING

Les documents peuvent être :

```text
PDF
DOCX
HTML
TXT
Markdown
CSV
Web pages
```

Chaque format peut nécessiter une stratégie de parsing différente.

---

# 41. CHUNKING

C'est une des compétences les plus importantes de RAG.

Pourquoi ?

Parce qu'un document entier peut être trop gros.

On le divise :

```text
Document
   ↓
Chunk 1
Chunk 2
Chunk 3
...
Chunk N
```

---

# 42. EXEMPLE DE CHUNKING

Document :

```text
20 pages
```

On peut commencer avec :

```text
chunk_size = 500 tokens
overlap = 50 tokens
```

Conceptuellement :

```text
Chunk 1
[1 -------- 500]

Chunk 2
[451 ------ 950]

Chunk 3
[901 ----- 1400]
```

L'overlap permet de conserver une continuité entre morceaux.

Mais il ne faut pas croire qu'une valeur universelle existe.

Le chunking dépend :

```text
document structure
task
retrieval quality
model
language
domain
```

---

# 43. CHUNKING SÉMANTIQUE

Une autre approche consiste à respecter les structures du document :

```text
Title
 ↓
Section
 ↓
Paragraph
 ↓
Subsection
```

Plutôt que de couper arbitrairement tous les `N` tokens.

Pour des documents techniques ou administratifs, cette approche peut souvent préserver davantage de contexte.

---

# 44. MÉTADONNÉES

Ne stocke pas uniquement :

```text
text
```

Stocke également :

```text
document_id
page
section
language
source
created_at
category
```

Exemple :

```json
{
  "document_id": "policy_001",
  "page": 12,
  "section": "Leave Policy",
  "language": "fr"
}
```

Cela permet ensuite :

```text
filter
citation
debugging
traceability
```

---

# 45. LE PROMPT RAG

Après retrieval :

```text
SYSTEM

Answer using only the provided context.

CONTEXT

[Chunk 1]
...

[Chunk 2]
...

QUESTION

...
```

Le LLM reçoit donc :

```text
Question
+
Retrieved Context
```

---

# 46. LE PROBLÈME DE L'HALLUCINATION

Une hallucination est une réponse qui semble crédible mais qui n'est pas correctement fondée.

Exemple :

```text
Question:
Quelle est la politique interne X ?

Retrieved context:
aucune information

LLM:
"La politique X autorise..."
```

Un bon système doit éviter ce comportement.

Par exemple :

```text
No relevant information found.
```

plutôt que d'inventer.

---

# 47. GROUNDEDNESS

Une réponse RAG devrait idéalement être fondée sur les informations récupérées.

Conceptuellement :

```text
Question
 ↓
Relevant context
 ↓
Answer
```

et non :

```text
Question
 ↓
LLM memory
 ↓
invented answer
```

---

# 48. CITATIONS

Ton RAG doit retourner les sources.

Exemple :

```text
Answer:
The annual leave period is 22 days.

Sources:
[1] HR_Policy.pdf — page 12
[2] Employee_Handbook.pdf — page 7
```

C'est une fonctionnalité extrêmement importante pour les applications professionnelles.

---

# 49. ARCHITECTURE RAG COMPLÈTE

```text
                      DOCUMENTS
                          │
                          ▼
                    Document Loader
                          │
                          ▼
                       Parser
                          │
                          ▼
                       Chunker
                          │
                          ▼
                    Embedding Model
                          │
                          ▼
                     Vector DB
                          │
                          │
             ┌────────────┘
             │
             ▼
           USER
             │
             ▼
         Question
             │
             ▼
      Query Embedding
             │
             ▼
        Vector Search
             │
             ▼
          Top-K
             │
             ▼
          Reranker
             │
             ▼
      Context Selection
             │
             ▼
       Prompt Builder
             │
             ▼
             LLM
             │
             ▼
          Answer
             │
             ▼
         Citations
```

---

# 50. RERANKING

La première recherche peut récupérer :

```text
Top 20
```

mais les 20 résultats ne sont pas tous réellement pertinents.

Un reranker peut réordonner :

```text
20 candidates
      ↓
relevance scoring
      ↓
Top 5
```

Pipeline :

```text
Dense/Sparse Retrieval
          ↓
      Top 20
          ↓
       Reranker
          ↓
        Top 5
```

Qdrant fournit actuellement des tutoriels dédiés au hybrid search et au reranking, ce qui en fait une bonne technologie d'apprentissage pour cette partie.

---

# 51. BLOC 7 — RAG EVALUATION

C'est ici que ton projet devient beaucoup plus sérieux.

Ne fais pas :

```text
I asked 3 questions
and it worked.
```

Tu dois créer un dataset d'évaluation.

Exemple :

```text
Question
Ground truth
Relevant document
Expected answer
```

---

# 52. RETRIEVAL EVALUATION

Tu veux vérifier :

> Est-ce que le système récupère les bons documents ?

Métriques utiles :

```text
Recall@K
Precision@K
MRR
NDCG
```

Pour commencer, concentre-toi surtout sur :

```text
Recall@K
Precision@K
```

---

# 53. GENERATION EVALUATION

Une fois le contexte récupéré :

```text
Question
+
Context
→
Answer
```

il faut évaluer :

```text
Answer relevance
Faithfulness
Correctness
Groundedness
```

---

# 54. ÉVALUATION EN DEUX ÉTAPES

Très important :

```text
                RAG
                 │
        ┌────────┴─────────┐
        ▼                  ▼
   Retrieval             Generation
        │                  │
        ▼                  ▼
 Recall@K              Relevance
 Precision@K           Faithfulness
```

Ne mélange pas les deux.

Un mauvais résultat peut venir :

```text
retrieval failure
```

ou :

```text
generation failure
```

---

# 55. ANALYSE D'ERREURS

Exemple :

```text
Question:
What is the refund policy?
```

Système :

```text
Retrieved:
Document A
Document C
Document D
```

Mais le bon document était :

```text
Document B
```

Alors :

```text
Retrieval problem
```

À l'inverse :

```text
Correct document retrieved
+
Wrong answer
```

alors :

```text
Generation problem
```

Cette distinction est fondamentale.

---

# 56. LATENCY ET COST EVALUATION

Un RAG professionnel doit également mesurer :

```text
Retrieval latency
LLM latency
Total latency
Input tokens
Output tokens
Estimated cost
```

Donc ton tableau de benchmark peut devenir :

|Configuration|Recall@5|Answer relevance|Faithfulness|Latency|Cost|
|---|--:|--:|--:|--:|--:|
|RAG v1|—|—|—|—|—|
|RAG + reranker|—|—|—|—|—|
|Hybrid RAG|—|—|—|—|—|

---

# 57. PROJET PRINCIPAL DE LA PHASE 3

# ⭐ AI Research Assistant

C'est le projet que je te recommande de réaliser.

L'utilisateur dépose :

```text
PDF
DOCX
TXT
Markdown
```

Puis demande :

```text
What are the main limitations of this approach?
```

Le système :

```text
1. Search documents
2. Retrieve relevant chunks
3. Generate answer
4. Cite sources
5. Refuse unsupported claims
```

---

# 58. ARCHITECTURE DU PROJET

```text
                       USER
                         │
                         ▼
                     FastAPI
                         │
               ┌─────────┴─────────┐
               │                   │
               ▼                   ▼
          Upload API          Question API
               │                   │
               ▼                   ▼
          Ingestion            Retriever
               │                   │
          ┌────┴────┐              │
          ▼         ▼              ▼
       Parser    Chunker       Vector DB
                    │              │
                    ▼              ▼
                Embeddings      Top-K
                                   │
                                   ▼
                               Reranker
                                   │
                                   ▼
                              Prompt Builder
                                   │
                                   ▼
                                   LLM
                                   │
                                   ▼
                                Answer
                                   │
                                   ▼
                                Sources
```

---

# 59. TECHNOLOGIES DU PROJET

Je recommande :

```text
Python
FastAPI
Pydantic
Qdrant
Sentence Transformers / embedding API
LLM API
PyPDF / document parser
pytest
Git
Docker
```

Docker sera utilisé ici comme intégration de l'application, mais son industrialisation complète restera dans la phase MLOps.

---

# 60. STRUCTURE DU PROJET

```text
ai-research-assistant/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── upload.py
│   │   └── query.py
│   │
│   ├── services/
│   │   ├── ingestion_service.py
│   │   ├── retrieval_service.py
│   │   ├── llm_service.py
│   │   └── rag_service.py
│   │
│   ├── schemas/
│   │   ├── document.py
│   │   └── query.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── logging.py
│   │
│   └── infrastructure/
│       ├── vector_db.py
│       └── embeddings.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── evaluation/
│   ├── questions.json
│   └── evaluate.py
│
├── tests/
│
├── notebooks/
│
├── requirements.txt
├── .env.example
├── Dockerfile
└── README.md
```

---

# 61. API DU PROJET

## POST /documents

Upload :

```text
PDF
```

Réponse :

```json
{
  "document_id": "doc_001",
  "status": "indexed"
}
```

---

## POST /query

Request :

```json
{
  "question": "What is the main limitation of the proposed method?"
}
```

Response :

```json
{
  "answer": "...",
  "sources": [
    {
      "document": "paper.pdf",
      "page": 8
    }
  ]
}
```

---

## GET /health

```json
{
  "status": "ok",
  "vector_db": "connected",
  "llm": "available"
}
```

---

# 62. ÉTAPE 1 — INGESTION

Commence par :

```text
PDF
 ↓
Text extraction
 ↓
Clean text
```

Ne commence pas directement avec LangChain.

Fais d'abord une version simple en Python afin de comprendre la pipeline.

---

# 63. ÉTAPE 2 — CHUNKING

Test plusieurs stratégies :

```text
500 tokens
50 overlap
```

puis :

```text
800 tokens
100 overlap
```

Compare la qualité du retrieval.

Tu es en train de faire de l'expérimentation d'AI Engineering.

---

# 64. ÉTAPE 3 — EMBEDDINGS

Pipeline :

```text
Chunk
 ↓
Embedding model
 ↓
Vector
```

Puis :

```text
Vector
+
Metadata
 ↓
Qdrant
```

Qdrant permet de stocker des vecteurs avec des payloads et d'effectuer ensuite des recherches par similarité.

---

# 65. ÉTAPE 4 — RETRIEVAL

Question :

```text
"What is the proposed architecture?"
```

Pipeline :

```text
question
 ↓
embedding
 ↓
Qdrant
 ↓
top 5 chunks
```

Retourne pour chaque résultat :

```text
score
document_id
page
text
```

---

# 66. ÉTAPE 5 — PROMPT BUILDING

Construis :

```text
SYSTEM:
Answer using only the provided context.

CONTEXT:
[Chunk 1]
[Chunk 2]
[Chunk 3]

QUESTION:
...
```

Puis envoie au LLM.

---

# 67. ÉTAPE 6 — SOURCES

Ne retourne pas uniquement :

```text
answer
```

Retourne :

```text
answer
+
sources
+
document
+
page
```

Ainsi ton RAG devient traçable.

---

# 68. ÉTAPE 7 — REFUS DE RÉPONDRE

Ajoute une règle :

```text
If the answer cannot be supported by the retrieved context,
say that the information was not found.
```

C'est une première défense contre les hallucinations.

Mais attention :

**un prompt n'est pas une garantie de sécurité ou de factualité.**

C'est pourquoi tu dois mesurer le comportement avec une vraie évaluation.

---

# 69. ÉTAPE 8 — TESTS

Teste :

```text
Relevant question
Irrelevant question
Ambiguous question
Question with no answer
Very long question
Empty question
Multiple documents
Duplicate documents
```

---

# 70. ÉTAPE 9 — BENCHMARK

Crée par exemple :

```text
50 questions
```

Pour chacune :

```json
{
  "question": "...",
  "expected_document": "paper.pdf",
  "expected_page": 8,
  "expected_answer": "..."
}
```

Puis lance automatiquement l'évaluation.

---

# 71. EXPÉRIENCE 1 — BASELINE

Version :

```text
Chunking
+
Dense retrieval
+
LLM
```

Mesure :

```text
Recall@5
Answer relevance
Faithfulness
Latency
Cost
```

---

# 72. EXPÉRIENCE 2 — HYBRID SEARCH

Version :

```text
Dense
+
BM25
```

Puis compare avec la baseline.

Qdrant documente actuellement la recherche hybride, ainsi que des parcours avec reranking.

---

# 73. EXPÉRIENCE 3 — RERANKING

Version :

```text
Dense / Hybrid
      ↓
Top 20
      ↓
Reranker
      ↓
Top 5
      ↓
LLM
```

Compare :

```text
before reranking
vs
after reranking
```

---

# 74. EXPÉRIENCE 4 — METADATA FILTERING

Ajoute :

```text
language
document type
date
department
topic
```

Question :

```text
Search only French documents.
```

Puis :

```text
filter
+
vector search
```

---

# 75. CE QU'IL FAUT APPRENDRE AVEC LANGCHAIN

LangChain peut être utile, mais ne commence pas avec lui.

Ordre :

```text
1. Construire un RAG sans framework
2. Comprendre chaque étape
3. Puis reconstruire avec LangChain
```

Pourquoi ?

Parce que sinon tu risques d'apprendre :

```python
retriever.invoke(...)
```

sans savoir ce qui se passe.

Tu dois d'abord comprendre :

```text
loader
chunker
embedder
vector store
retriever
prompt
LLM
parser
```

puis laisser le framework les orchestrer.

---

# 76. LLAMAINDEX

Même principe.

À découvrir après compréhension du RAG fondamental.

Ne cherche pas :

> « Quel framework RAG est le meilleur ? »

Cherche :

> « Quelles abstractions RAG sont réellement nécessaires ? »

---

# 77. CE QUE TU DOIS SAVOIR FAIRE SANS FRAMEWORK

Tu dois être capable d'écrire conceptuellement :

```python
documents = load_documents()

chunks = chunk_documents(documents)

vectors = embed(chunks)

vector_db.upsert(vectors)

query_vector = embed([question])

results = vector_db.search(query_vector, top_k=5)

prompt = build_prompt(question, results)

answer = llm.generate(prompt)
```

Quand tu comprends cela, LangChain devient beaucoup plus facile.

---

# 78. LLM ENGINEERING ≠ PROMPT ENGINEERING

Très important.

Un Prompt Engineer peut principalement travailler sur :

```text
prompts
```

Un AI Engineer doit gérer :

```text
LLM
+
retrieval
+
embeddings
+
APIs
+
databases
+
latency
+
cost
+
evaluation
+
security
```

C'est exactement pourquoi cette phase est importante pour ton objectif.

---

# 79. ERREURS FRÉQUENTES À ÉVITER

## Erreur 1

Utiliser un énorme prompt pour compenser un mauvais retrieval.

```text
Bad retrieval
+
Huge prompt
≠
Good RAG
```

## Erreur 2

Mettre tout le document dans le prompt.

```text
100 pages
↓
LLM
```

Mauvaise stratégie dans beaucoup de cas.

---

## Erreur 3

Utiliser uniquement la similarité vectorielle.

Certains termes exacts nécessitent du lexical search.

```text
Product ID
Error code
Legal clause
Version number
```

Le hybrid retrieval peut être pertinent.

---

## Erreur 4

Ne pas conserver les métadonnées.

Tu ne peux alors plus facilement :

```text
cite
filter
debug
trace
```

---

## Erreur 5

Ne jamais évaluer.

Un chatbot qui répond correctement à 5 questions n'est pas une évaluation.

---

# 80. BLOC SÉCURITÉ

Avant de considérer ton RAG comme professionnel, comprends au minimum :

```text
Prompt injection
Data leakage
Unauthorized document access
Sensitive information
Malicious documents
Tool/data access boundaries
```

Exemple conceptuel :

```text
Document:
"Ignore all previous instructions..."
```

Le système ne doit pas automatiquement traiter ce texte comme une instruction système.

Il doit rester du :

```text
DATA
```

et non devenir :

```text
SYSTEM CONTROL
```

---

# 81. BLOC COÛT

À chaque requête, réfléchis :

```text
How many tokens?
How many retrieved chunks?
Which model?
How much latency?
How much cost?
```

Une optimisation simple peut être :

```text
Top 20
↓
Reranker
↓
Top 5
↓
LLM
```

plutôt que :

```text
Top 20
↓
LLM
```

---

# 82. BLOC CONTEXT MANAGEMENT

Tu dois éviter :

```text
Question
+
20 chunks énormes
```

Préférer :

```text
Question
+
few high-quality chunks
```

Donc :

```text
retrieval quality
```

est souvent plus important que simplement augmenter :

```text
top_k
```

---

# 83. PROJET FINAL — VERSION 1

```text
PDF
 ↓
Parser
 ↓
Chunker
 ↓
Embeddings
 ↓
Qdrant
 ↓
Dense retrieval
 ↓
LLM
 ↓
Answer
```

---

# 84. PROJET FINAL — VERSION 2

```text
PDF
 ↓
Semantic chunking
 ↓
Embeddings
 ↓
Qdrant
 ↓
Hybrid Search
 ↓
Reranking
 ↓
LLM
 ↓
Citations
```

---

# 85. PROJET FINAL — VERSION 3

```text
Documents
 ↓
Ingestion pipeline
 ↓
Versioned dataset
 ↓
Embedding pipeline
 ↓
Vector DB
 ↓
Retriever
 ↓
Reranker
 ↓
Prompt Builder
 ↓
LLM
 ↓
Structured Output
 ↓
Citations
 ↓
FastAPI
 ↓
Evaluation
 ↓
Monitoring
```

C'est cette version qui doit finir sur ton GitHub.

---

# 86. STRUCTURE DU README

Ton README doit expliquer :

```text
# AI Research Assistant

## 1. Problem

## 2. Architecture

## 3. Data ingestion

## 4. Chunking strategy

## 5. Embedding model

## 6. Vector database

## 7. Retrieval strategy

## 8. Reranking

## 9. LLM

## 10. Prompt design

## 11. Evaluation

## 12. Results

## 13. API

## 14. Installation

## 15. Limitations
```

---

# 87. TABLEAU D'EXPÉRIENCES

Ton projet doit contenir quelque chose comme :

|Version|Retrieval|Reranker|Recall@5|Faithfulness|Latency|
|---|---|---|--:|--:|--:|
|V1|Dense|No|—|—|—|
|V2|Hybrid|No|—|—|—|
|V3|Hybrid|Yes|—|—|—|

Cela montre que tu fais de l'ingénierie plutôt que de simplement suivre un tutoriel.

---

# 88. QUESTIONS D'ENTRETIEN

À la fin de cette phase, tu dois être capable d'expliquer :

### Qu'est-ce qu'un LLM ?

### Pourquoi les LLM utilisent-ils des tokens ?

### Qu'est-ce qu'une context window ?

### Quelle différence entre base model et instruct model ?

### Pourquoi utiliser un chat template ?

Les modèles conversationnels utilisent des formats de messages spécifiques, encodés par leur tokenizer/chat template.

### Qu'est-ce qu'un embedding ?

### Quelle différence entre embedding model et LLM ?

### Comment fonctionne une vector database ?

### Qu'est-ce que la similarité cosinus ?

### Dense vs sparse retrieval ?

### Qu'est-ce que BM25 ?

### Pourquoi hybrid search ?

### Qu'est-ce que RAG ?

### Pourquoi avons-nous besoin du chunking ?

### Comment choisir la taille des chunks ?

### Pourquoi conserver les métadonnées ?

### Qu'est-ce qu'un reranker ?

### Comment mesurer la qualité du retrieval ?

### Comment mesurer la qualité de la génération ?

### Quelle différence entre retrieval failure et generation failure ?

### Comment limiter les hallucinations dans un RAG ?

### Pourquoi les citations sont-elles importantes ?

### Comment réduire le coût d'une application LLM ?

### Comment exposer un RAG avec FastAPI ?

---

# 89. CHECKLIST DE COMPÉTENCES

## LLM

```text
□ LLM fundamentals
□ Tokens
□ Context window
□ Pretraining concept
□ Instruct models
□ Chat templates
□ API usage
□ Temperature
□ Token usage
□ Streaming
□ Error handling
```

## Prompt Engineering

```text
□ System prompts
□ User prompts
□ Zero-shot
□ Few-shot
□ Prompt templates
□ Structured output
□ Constraints
```

## Embeddings

```text
□ Embedding concept
□ Vector space
□ Cosine similarity
□ Embedding model selection
□ Multilingual embeddings
```

## Vector Database

```text
□ Qdrant
□ Collections
□ Points
□ Vectors
□ Payload
□ Similarity search
□ Top-K
□ Filtering
□ Dense retrieval
□ Sparse retrieval
```

## RAG

```text
□ Document ingestion
□ Parsing
□ Chunking
□ Embedding
□ Indexing
□ Retrieval
□ Reranking
□ Prompt construction
□ Grounded generation
□ Citations
```

## Evaluation

```text
□ Recall@K
□ Precision@K
□ Relevance
□ Faithfulness
□ Error analysis
□ Latency
□ Cost
```

---

# 90. ORDRE D'APPRENTISSAGE

Ne saute pas directement à LangChain.

Suis exactement :

```text
1. LLM fundamentals
        ↓
2. Prompt engineering
        ↓
3. LLM API
        ↓
4. Structured output
        ↓
5. Embeddings
        ↓
6. Vector similarity
        ↓
7. Qdrant
        ↓
8. Document ingestion
        ↓
9. Chunking
        ↓
10. Basic RAG
        ↓
11. Hybrid RAG
        ↓
12. Reranking
        ↓
13. Citations
        ↓
14. RAG evaluation
        ↓
15. FastAPI RAG
        ↓
16. Docker
```

---

# 91. PLANNING RECOMMANDÉ

## Semaine 1

```text
LLM fundamentals
+
Prompt engineering
+
API
```

Mini-projet :

```text
LLM Text Analyzer
```

Entrée :

```text
customer message
```

Sortie structurée :

```json
{
  "language": "...",
  "intent": "...",
  "sentiment": "..."
}
```

---

## Semaine 2

```text
Embeddings
+
Vector similarity
+
Qdrant
```

Mini-projet :

### Semantic Search Engine

```text
Documents
 ↓
Embeddings
 ↓
Qdrant
 ↓
Search
```

Objectif :

rechercher par sens et non seulement par mots exacts. Qdrant fournit justement un parcours « Semantic Search 101 » ainsi que des tutoriels plus avancés sur hybrid search et reranking.

---

## Semaine 3

```text
Document parsing
+
Chunking
+
RAG
```

Projet :

```text
Simple RAG
```

---

## Semaine 4

```text
Hybrid search
+
Reranking
+
Metadata filtering
```

Projet :

```text
Advanced RAG
```

---

## Semaine 5

```text
RAG evaluation
+
Error analysis
+
Benchmarks
```

---

## Semaine 6

```text
FastAPI
+
Structured output
+
Citations
+
Tests
```

---

## Semaine 7–8

Projet complet :

# AI Research Assistant

```text
Documents
 ↓
Ingestion
 ↓
Chunking
 ↓
Embedding
 ↓
Qdrant
 ↓
Hybrid Retrieval
 ↓
Reranking
 ↓
LLM
 ↓
Structured response
 ↓
Citations
 ↓
FastAPI
```

---

# 92. TECHNOLOGIES À MAÎTRISER

### Niveau obligatoire

```text
Python
FastAPI
LLM API
Embeddings
Qdrant
RAG
Pydantic
Git
```

### Niveau intermédiaire

```text
LangChain
LlamaIndex
Hybrid Search
Reranking
RAG evaluation
```

### À découvrir seulement

```text
LangGraph
Agents
MCP
Multi-Agent Systems
```

Ces derniers appartiennent à la **Phase 4**.

---

# 93. TON OBJECTIF DE FIN DE PHASE

Tu dois être capable de regarder une question comme :

> « Comment construire un assistant IA capable de répondre aux questions à partir de 10 000 documents d'entreprise ? »

et construire mentalement :

```text
                 Documents
                     ↓
                 Ingestion
                     ↓
                  Chunking
                     ↓
                Embeddings
                     ↓
                  Qdrant
                     ↓
             Hybrid Retrieval
                     ↓
                 Reranking
                     ↓
              Prompt Builder
                     ↓
                    LLM
                     ↓
            Structured Output
                     ↓
                 Citations
                     ↓
                 FastAPI
                     ↓
                Evaluation
```

C'est exactement le changement de niveau recherché.

---

# 94. PHASE 3 → TON PROFIL

Avant :

```text
AI Student
+
ML
+
Deep Learning
+
NLP
```

Après :

```text
AI Engineer Candidate
        │
        ├── Machine Learning
        ├── Deep Learning
        ├── NLP
        ├── Transformers
        ├── LLM
        ├── Embeddings
        ├── RAG
        ├── Vector Databases
        ├── FastAPI
        └── Evaluation
```

Et la suite logique sera :

```text
PHASE 4
Agents
+
Tool Calling
+
LangGraph
+
MCP
+
Agent Evaluation
```

puis :

```text
PHASE 5
MLOps / LLMOps
+
Docker
+
CI/CD
+
MLflow
+
Cloud
+
Observability
```

---

# 95. RÈGLE D'OR DE CETTE PHASE

Ne deviens pas :

> « quelqu'un qui sait utiliser ChatGPT API ».

Deviens :

> « quelqu'un qui sait concevoir un système LLM fiable autour d'un modèle. »

La différence est énorme.

```text
                 LLM
                  │
        ┌─────────┼──────────┐
        │         │          │
     Retrieval  Tools     Evaluation
        │         │          │
        └─────────┼──────────┘
                  │
                API
                  │
               Database
                  │
              Monitoring
```

Le LLM est **un composant** du système, pas le système entier.
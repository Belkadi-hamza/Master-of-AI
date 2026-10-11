# PHASE 2 — DEEP LEARNING, NLP ET TRANSFORMERS

## 0. Objectif de la phase

Après la Phase 1, tu sais construire une application Python structurée avec une API.

La Phase 2 ajoute le cœur **AI/Deep Learning**.

L'objectif n'est pas seulement de savoir utiliser :

```python
model.fit(...)
```

mais de comprendre ce qui se passe derrière :

```text
Données
   ↓
Prétraitement
   ↓
Tokenisation
   ↓
Représentation numérique
   ↓
Réseau de neurones
   ↓
Loss
   ↓
Backpropagation
   ↓
Optimisation
   ↓
Évaluation
   ↓
Inference
   ↓
API
```

À la fin de cette phase, tu dois être capable de construire un projet NLP de bout en bout :

```text
                    TEXT
                     │
                     ▼
                Preprocessing
                     │
                     ▼
                Tokenization
                     │
                     ▼
                 Embeddings
                     │
                     ▼
                Transformer
                     │
                     ▼
                 Classifier
                     │
                     ▼
                  Prediction
                     │
                     ▼
                  FastAPI
```

---

# 1. Ce que tu dois déjà connaître

Tu as déjà travaillé avec :

- Machine Learning classique ;
    
- classification ;
    
- StandardScaler ;
    
- PCA ;
    
- SVM ;
    
- arbres de décision ;
    
- déséquilibre des classes ;
    
- Computer Vision ;
    
- DenseNet ;
    
- Grad-CAM ;
    
- FastAPI ;
    
- Docker/MLOps.
    

Donc nous n'allons pas refaire :

```text
Python débutant
Pandas débutant
régression logistique débutante
CNN débutant
```

La Phase 2 doit plutôt te faire progresser vers :

```text
PyTorch
   ↓
Deep Learning avancé
   ↓
NLP
   ↓
Embeddings
   ↓
Attention
   ↓
Transformers
   ↓
BERT / CamemBERT
   ↓
Fine-tuning
   ↓
Deployment
```

---

# 2. Architecture générale de la phase

La phase est organisée en 8 blocs.

```text
BLOC 1
PyTorch Fundamentals
        ↓
BLOC 2
Neural Network Training
        ↓
BLOC 3
NLP Fundamentals
        ↓
BLOC 4
Word Embeddings
        ↓
BLOC 5
Attention Mechanism
        ↓
BLOC 6
Transformers
        ↓
BLOC 7
BERT / Hugging Face
        ↓
BLOC 8
NLP Production Project
```

---

# 3. BLOC 1 — PYTORCH

## 3.1 Pourquoi PyTorch ?

Pour ton objectif AI Engineer, PyTorch doit devenir l'un de tes frameworks principaux.

Tu dois être capable de comprendre un modèle et son entraînement, même lorsque tu n'utilises pas un modèle pré-entraîné.

---

# 4. TENSOR

Le concept fondamental de PyTorch est le Tensor.

Un tensor généralise :

```text
scalaire → vecteur → matrice → tenseur
```

Exemple :

```python
import torch

x = torch.tensor([1, 2, 3])

print(x)
```

Shape :

```python
print(x.shape)
```

Résultat :

```text
torch.Size([3])
```

Matrice :

```python
x = torch.tensor([
    [1, 2],
    [3, 4]
])
```

Shape :

```text
(2, 2)
```

---

# 5. OPERATIONS SUR LES TENSORS

Tu dois comprendre :

```python
x + y
x - y
x * y
x @ y
```

ainsi que :

```python
reshape()
view()
flatten()
squeeze()
unsqueeze()
transpose()
```

Exemple :

```python
x = torch.randn(2, 3)

print(x.shape)

x = x.reshape(3, 2)

print(x.shape)
```

---

# 6. CPU ET GPU

Tu dois comprendre la différence entre :

```text
CPU
GPU
```

Avec PyTorch :

```python
device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)
```

Puis :

```python
model = model.to(device)
x = x.to(device)
```

C'est important pour l'entraînement Deep Learning.

---

# 7. AUTOGRAD

PyTorch sait calculer automatiquement les gradients.

Exemple :

```python
x = torch.tensor(
    2.0,
    requires_grad=True
)

y = x ** 2

y.backward()

print(x.grad)
```

Mathématiquement :

```text
y = x²

dy/dx = 2x

pour x = 2 :

dy/dx = 4
```

PyTorch calcule automatiquement cette dérivée.

---

# 8. POURQUOI LES GRADIENTS ?

L'apprentissage d'un réseau neuronal suit cette logique :

```text
Prediction
   ↓
Loss
   ↓
Gradient
   ↓
Update weights
```

Formellement :

```text
w_new = w_old - η ∂L/∂w
```

où :

- `w` = poids ;
    
- `L` = fonction de coût ;
    
- `η` = learning rate.
    

---

# 9. NN.MODULE

Les modèles PyTorch héritent généralement de :

```python
torch.nn.Module
```

Exemple :

```python
import torch
import torch.nn as nn


class SimpleNetwork(nn.Module):

    def __init__(self):
        super().__init__()

        self.layer1 = nn.Linear(10, 32)
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(32, 2)

    def forward(self, x):

        x = self.layer1(x)
        x = self.relu(x)
        x = self.layer2(x)

        return x
```

Architecture :

```text
10 features
    ↓
Linear
    ↓
32 neurons
    ↓
ReLU
    ↓
2 outputs
```

---

# 10. LOSS FUNCTIONS

Tu dois connaître les principales.

## Classification binaire

```python
nn.BCEWithLogitsLoss()
```

## Classification multiclasses

```python
nn.CrossEntropyLoss()
```

## Régression

```python
nn.MSELoss()
```

Tu dois savoir expliquer pourquoi la fonction utilisée dépend du problème.

---

# 11. OPTIMIZERS

Commence par :

```text
SGD
Adam
AdamW
```

Exemple :

```python
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)
```

Tu dois comprendre :

```text
learning rate
momentum
weight decay
```

---

# 12. TRAINING LOOP

C'est une compétence essentielle.

Tu dois être capable d'écrire une boucle d'entraînement manuellement.

Structure :

```python
for epoch in range(num_epochs):

    model.train()

    for X, y in train_loader:

        optimizer.zero_grad()

        outputs = model(X)

        loss = criterion(outputs, y)

        loss.backward()

        optimizer.step()
```

Tu dois savoir expliquer chaque ligne.

---

# 13. MODEL.TRAIN() ET MODEL.EVAL()

Très important.

Pendant l'entraînement :

```python
model.train()
```

Pendant l'évaluation :

```python
model.eval()
```

Et pour éviter le calcul des gradients :

```python
with torch.no_grad():
    outputs = model(X)
```

---

# 14. DATASET ET DATALOADER

Tu dois comprendre :

```text
Dataset
   ↓
DataLoader
   ↓
Batch
   ↓
Model
```

Exemple conceptuel :

```python
from torch.utils.data import Dataset, DataLoader
```

Le `Dataset` représente tes données.

Le `DataLoader` s'occupe notamment de :

- batching ;
    
- shuffle ;
    
- itération ;
    
- chargement des exemples.
    

---

# 15. TRAIN / VALIDATION / TEST

Tu dois toujours penser :

```text
Dataset complet
      │
      ├── Train
      ├── Validation
      └── Test
```

Rôle :

### Train

Apprendre les paramètres.

### Validation

Choisir les hyperparamètres.

### Test

Mesurer la performance finale.

---

# 16. OVERFITTING

Tu dois comprendre :

```text
Training accuracy ↑
Validation accuracy ↓
```

C'est généralement un signal d'overfitting.

Solutions :

```text
Regularization
Dropout
Early stopping
Data augmentation
More data
Weight decay
Smaller model
```

---

# 17. PROJET COURT 1 — PYTORCH

Avant le NLP, construis un petit modèle.

## Projet

### Binary Classification with PyTorch

Entrées :

```text
10 features
```

Sortie :

```text
0 / 1
```

Implémente toi-même :

```text
Dataset
DataLoader
Model
Loss
Optimizer
Training loop
Validation
Test
Save model
Load model
```

### Objectif

Ne cherche pas une performance spectaculaire.

L'objectif est de comprendre **le mécanisme d'apprentissage**.

---

# 18. BLOC 2 — NLP FUNDAMENTALS

Maintenant on passe au texte.

Un ordinateur ne comprend pas directement :

```text
"Le client veut annuler son rendez-vous."
```

Il faut convertir le langage en représentation numérique.

---

# 19. TOKENISATION

La tokenisation consiste à diviser le texte en unités.

Exemple :

```text
"Je veux réserver un rendez-vous"
```

peut devenir :

```text
["Je", "veux", "réserver", "un", "rendez-vous"]
```

Les modèles modernes utilisent généralement des tokenizers subword.

Exemple conceptuel :

```text
"internationalisation"
```

peut être découpé en plusieurs sous-unités.

---

# 20. VOCABULAIRE

On associe des IDs aux tokens :

```text
"je"       → 101
"veux"     → 102
"réserver" → 103
```

Le texte devient alors :

```text
[101, 102, 103, ...]
```

---

# 21. BAG OF WORDS

Avant les Transformers, on peut représenter un document par la présence de mots.

Exemple :

Documents :

```text
D1 = "chat noir"
D2 = "chien noir"
```

Vocabulaire :

```text
chat
chien
noir
```

Représentation :

```text
D1 = [1, 0, 1]
D2 = [0, 1, 1]
```

Limitation :

L'ordre et le contexte sont mal représentés.

---

# 22. TF-IDF

Tu connais déjà TF-IDF.

Formule classique :

```text
TF-IDF(t,d) = TF(t,d) × IDF(t)
```

avec :

```text
IDF(t) = log(N / df(t))
```

où :

- `N` = nombre de documents ;
    
- `df(t)` = nombre de documents contenant le terme.
    

TF-IDF reste très utile comme **baseline**.

Pour ton projet NLP, on fera :

```text
TF-IDF + Logistic Regression
```

puis :

```text
Transformer
```

Cela permettra une vraie comparaison.

---

# 23. LIMITATION DU TF-IDF

Considérons :

```text
"Le patient n'est pas malade."
```

et :

```text
"Le patient est malade."
```

Les mots sont presque les mêmes.

Mais le sens est très différent.

TF-IDF ne comprend pas réellement ce contexte.

C'est l'une des raisons pour lesquelles les embeddings contextuels et les Transformers sont importants.

---

# 24. WORD EMBEDDINGS

Un embedding représente un mot par un vecteur dense.

Exemple :

```text
"doctor"
→
[0.12, -0.51, 0.82, ...]
```

Un embedding peut contenir des centaines de dimensions.

L'idée :

```text
mot
 ↓
vecteur
```

Des mots sémantiquement proches doivent avoir des représentations proches dans l'espace appris.

---

# 25. WORD2VEC

Deux idées principales :

```text
CBOW
Skip-gram
```

### CBOW

Contexte → mot

```text
"I drink ___ every morning"
```

Le modèle prédit :

```text
coffee
```

### Skip-gram

Mot → contexte

```text
coffee
 ↓
drink
morning
cup
```

Tu dois comprendre le concept, mais **ne passe pas des semaines dessus**.

---

# 26. CONTEXTUAL EMBEDDINGS

Les modèles modernes changent une chose fondamentale.

Le mot peut avoir une représentation différente selon son contexte.

Exemple :

```text
bank of the river
```

vs :

```text
bank account
```

Le mot est le même, mais son sens change.

Les Transformers permettent d'obtenir des représentations dépendantes du contexte.

---

# 27. BLOC 3 — ATTENTION

C'est probablement le concept le plus important de la Phase 2.

Tu dois réellement comprendre l'attention avant d'apprendre BERT/GPT.

---

# 28. LE PROBLÈME DU CONTEXTE

Phrase :

```text
"Le médecin parle au patient parce qu'il est inquiet."
```

Qui est inquiet ?

Un modèle doit comprendre les relations entre les mots.

L'attention permet à chaque token de regarder les autres tokens et de déterminer lesquels sont importants.

---

# 29. QUERY, KEY, VALUE

L'attention utilise :

```text
Query
Key
Value
```

La formule centrale :

```text
Attention(Q,K,V)
=
softmax(QKᵀ / √dₖ)V
```

Tu dois connaître cette formule.

Mais plus important :

tu dois comprendre ce qu'elle signifie.

---

# 30. INTUITION

Pour un token donné :

```text
Query
  ↓
Cherche les tokens pertinents
  ↓
Compare avec les Keys
  ↓
Obtient des scores
  ↓
Softmax
  ↓
Combine les Values
```

Donc :

```text
Token
 ↓
Regarde les autres tokens
 ↓
Donne plus de poids aux tokens pertinents
```

---

# 31. SELF-ATTENTION

Dans le self-attention :

```text
Q, K, V
```

proviennent de la même séquence.

Exemple :

```text
"The animal didn't cross the road because it was tired."
```

Le modèle peut apprendre une relation entre :

```text
it
```

et :

```text
animal
```

selon les représentations apprises.

---

# 32. MULTI-HEAD ATTENTION

Une seule attention peut apprendre certaines relations.

Avec plusieurs heads :

```text
             Input
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
    Head 1   Head 2   Head 3
       │       │        │
       └───────┼────────┘
               ▼
           Concatenate
               │
               ▼
             Linear
```

Chaque head peut apprendre différents types de relations.

---

# 33. POSITIONAL ENCODING

L'attention seule ne donne pas naturellement l'ordre des mots.

Or :

```text
"Le chien mange le chat"
```

est différent de :

```text
"Le chat mange le chien"
```

Il faut donc injecter une information de position.

Conceptuellement :

```text
Token Embedding
       +
Position Embedding
       ↓
Transformer Input
```

---

# 34. BLOC 4 — TRANSFORMER

Architecture conceptuelle :

```text
Input Tokens
     │
     ▼
Token Embeddings
     +
Positional Information
     │
     ▼
Self-Attention
     │
     ▼
Feed Forward Network
     │
     ▼
Normalization
     │
     ▼
Repeat
```

Tu dois comprendre les composants :

```text
Self-Attention
Multi-Head Attention
Feed Forward
Residual Connections
Layer Normalization
Positional Encoding
```

---

# 35. ENCODER ET DECODER

Architecture Transformer originale :

```text
Encoder
   ↓
Decoder
```

Mais les modèles modernes peuvent être de plusieurs types.

### Encoder-only

Exemple :

```text
BERT
CamemBERT
```

Très utile pour :

```text
classification
NER
semantic representation
```

### Decoder-only

Exemples :

```text
GPT family
```

Utilisé notamment pour :

```text
text generation
chat
reasoning
```

### Encoder-decoder

Exemples :

```text
T5
```

Utilisé pour :

```text
translation
summarization
text-to-text tasks
```

---

# 36. BERT

BERT est essentiel pour comprendre l'évolution du NLP moderne.

Architecture :

```text
Text
 ↓
Tokenizer
 ↓
Transformer Encoder
 ↓
Contextual Embeddings
 ↓
Task Head
```

Pour la classification :

```text
Text
 ↓
BERT
 ↓
Classification Head
 ↓
Class
```

---

# 37. FINE-TUNING

Tu n'as généralement pas besoin de partir d'un Transformer avec des poids aléatoires.

Tu peux utiliser un modèle pré-entraîné.

```text
Pretrained Model
       ↓
Your Dataset
       ↓
Fine-tuning
       ↓
Specialized Model
```

Par exemple :

```text
CamemBERT
      ↓
French customer-support dataset
      ↓
Intent classification
```

---

# 38. TRANSFER LEARNING

Conceptuellement :

```text
Internet-scale training
        ↓
General language knowledge
        ↓
Fine-tuning
        ↓
Specific business task
```

C'est l'un des concepts les plus importants à retenir.

---

# 39. HUGGING FACE

Hugging Face sera ton outil principal dans cette partie.

Tu dois apprendre à utiliser :

```text
transformers
datasets
tokenizers
evaluate
```

Puis comprendre :

```text
AutoTokenizer
AutoModel
AutoModelForSequenceClassification
Trainer
TrainingArguments
```

---

# 40. TOKENIZER HUGGING FACE

Exemple :

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained(
    "bert-base-uncased"
)

text = "AI is changing healthcare."

tokens = tokenizer(text)

print(tokens)
```

Puis :

```python
inputs = tokenizer(
    text,
    padding=True,
    truncation=True,
    return_tensors="pt"
)
```

Tu dois comprendre chaque argument.

---

# 41. SEQUENCE CLASSIFICATION

Architecture :

```text
Input text
    ↓
Tokenizer
    ↓
Transformer
    ↓
Classification head
    ↓
Logits
    ↓
Class probabilities
```

Exemple :

```text
"Je veux annuler mon rendez-vous"
              ↓
       Cancel Appointment
```

---

# 42. LOGITS

Le modèle peut retourner :

```text
[-1.2, 2.7, 0.4]
```

Ce ne sont pas encore nécessairement des probabilités.

Pour une classification multiclasses, on utilise généralement :

```text
softmax(logits)
```

Exemple conceptuel :

```text
Class A → 0.02
Class B → 0.91
Class C → 0.07
```

Prediction :

```text
Class B
```

---

# 43. MÉTRIQUES NLP

Ne te contente pas de l'accuracy.

Pour ton projet, utilise :

```text
Accuracy
Precision
Recall
F1-score
Confusion Matrix
```

Pour plusieurs classes, examine aussi :

```text
macro F1
weighted F1
```

Pourquoi ?

Une classe peut avoir beaucoup moins d'exemples qu'une autre.

---

# 44. DATA IMBALANCE

Tu as déjà étudié ce problème en ML classique.

Il reste valable en NLP.

Exemple :

```text
Password reset       1000
Appointment          700
Billing              300
Complaint             80
```

Une accuracy globale peut masquer les mauvaises performances sur :

```text
Complaint
```

Tu dois donc examiner les métriques par classe.

---

# 45. BLOC 5 — NLP PIPELINE

Ton pipeline doit ressembler à :

```text
Raw Text
   ↓
Cleaning
   ↓
Label validation
   ↓
Train/Validation/Test Split
   ↓
Tokenization
   ↓
Dataset
   ↓
Model
   ↓
Training
   ↓
Evaluation
```

---

# 46. ATTENTION AU DATA LEAKAGE

Exemple dangereux :

```text
Dataset
 ↓
Vectorization
 ↓
Train/Test Split
```

selon la méthode utilisée, certaines statistiques peuvent être apprises à partir des données de test.

Le principe général reste :

```text
Split first
 ↓
Fit preprocessing on train
 ↓
Transform validation/test
```

Pour les Transformers, attention aussi aux doublons entre train et test.

---

# 47. PROJET PRINCIPAL — MULTILINGUAL NLP

# Moroccan Customer Support Intelligence

C'est le projet que je te recommande pour valider toute cette phase.

## Objectif

Construire une application capable d'analyser des messages clients en :

```text
Français
Anglais
Darija
```

Elle doit prédire :

```text
Language
Intent
Sentiment
Priority
```

Exemple :

```text
"بغيت نلغي الموعد ديالي"
```

Résultat :

```text
Language: Darija
Intent: Appointment Cancellation
Sentiment: Neutral
Priority: Medium
```

---

# 48. VERSION 1 — BASELINE

Commence volontairement avec un modèle simple.

```text
Text
 ↓
TF-IDF
 ↓
Logistic Regression
 ↓
Intent
```

Pourquoi ?

Pour avoir une baseline.

Tu pourras ensuite dire :

```text
TF-IDF baseline:
F1 = X

Transformer:
F1 = Y
```

Tu montres ainsi que tu sais comparer les architectures.

---

# 49. VERSION 2 — PYTORCH

Construis un petit réseau neuronal.

```text
Text
 ↓
Embedding
 ↓
Neural Network
 ↓
Classifier
```

Objectif :

comprendre comment un modèle neuronal apprend à partir de représentations de texte.

---

# 50. VERSION 3 — TRANSFORMER

Utilise un modèle pré-entraîné adapté au français/multilingue.

Architecture :

```text
Text
 ↓
Tokenizer
 ↓
Pretrained Transformer
 ↓
Classification Head
 ↓
Intent
```

Pour le français, tu peux étudier :

```text
CamemBERT
```

Pour plusieurs langues :

```text
Multilingual BERT
```

---

# 51. VERSION 4 — MULTI-TASK LEARNING

Une amélioration intéressante :

un même système peut prédire plusieurs tâches.

```text
                 Transformer
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
       Intent      Sentiment    Priority
```

Tu peux commencer par des modèles séparés avant de tester une architecture multi-task.

---

# 52. VERSION 5 — FASTAPI

Ton modèle devient un service.

Architecture :

```text
                   Client
                     │
                     ▼
                  FastAPI
                     │
             ┌───────┴────────┐
             ▼                ▼
       NLP Service       Validation
             │
             ▼
        Transformer
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
    Intent  Sent. Priority
```

Endpoint :

```text
POST /predict
```

---

# 53. EXEMPLE D'API

Request :

```json
{
  "text": "Je veux annuler mon rendez-vous"
}
```

Response :

```json
{
  "language": "fr",
  "intent": "appointment_cancellation",
  "sentiment": "neutral",
  "priority": "medium"
}
```

---

# 54. STRUCTURE DU PROJET

```text
multilingual-nlp/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   └── routes.py
│   │
│   ├── services/
│   │   └── nlp_service.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   └── ml/
│       ├── tokenizer.py
│       ├── model.py
│       └── predictor.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
│
├── training/
│   ├── train.py
│   └── evaluate.py
│
├── tests/
│   ├── test_api.py
│   └── test_model.py
│
├── artifacts/
│
├── requirements.txt
├── README.md
└── .gitignore
```

Tu réutilises ici les principes appris en Phase 1.

---

# 55. CE QUE TU DOIS COMPRENDRE AVANT D'UTILISER UN TRANSFORMER

Tu dois pouvoir expliquer :

```text
Token
   ↓
Embedding
   ↓
Position
   ↓
Q/K/V
   ↓
Self-Attention
   ↓
Multi-Head Attention
   ↓
Feed Forward
   ↓
Residual Connection
   ↓
LayerNorm
```

Puis :

```text
Transformer
   ↓
BERT
   ↓
Fine-tuning
   ↓
Classification
```

Si tu sais uniquement écrire :

```python
AutoModelForSequenceClassification.from_pretrained(...)
```

sans comprendre l'architecture, la compétence est superficielle.

---

# 56. MINI-EXERCICES THÉORIQUES

## Exercice 1

Explique la différence entre :

```text
TF-IDF
Word2Vec
BERT
```

Tu dois arriver à :

```text
TF-IDF
→ représentation basée sur les statistiques des mots

Word2Vec
→ représentation dense apprise à partir du contexte

BERT
→ représentation contextualisée basée sur Transformer
```

---

## Exercice 2

Explique :

```text
CNN
RNN
Transformer
```

### CNN

Excellent historique pour les images, mais peut aussi traiter certaines séquences.

### RNN

Traite une séquence de manière récurrente.

### Transformer

Utilise principalement l'attention pour modéliser les relations entre tokens.

---

# 57. MINI-EXERCICE — ATTENTION

Phrase :

```text
"The doctor called the patient because he was worried."
```

Question :

À quels tokens le modèle doit-il probablement accorder de l'attention pour interpréter :

```text
"he"
```

Ne cherche pas uniquement la réponse.

Explique comment les scores d'attention peuvent permettre de capturer les relations contextuelles.

---

# 58. MINI-EXERCICE — FINE-TUNING

Situation :

Tu possèdes :

```text
20 000 messages clients
```

avec :

```text
10 intentions
```

Question :

Est-il préférable de :

```text
A. entraîner un Transformer depuis zéro
B. utiliser un modèle pré-entraîné et le fine-tuner
```

Dans ce contexte, tu dois être capable d'expliquer pourquoi le transfert de connaissances est généralement le point de départ pratique.

---

# 59. EXPÉRIENCE À RÉALISER

Pour ton projet principal, fais impérativement cette comparaison :

```text
MODEL 1
TF-IDF + Logistic Regression

MODEL 2
PyTorch Neural Network

MODEL 3
Pretrained Transformer + Fine-tuning
```

Crée un tableau :

|Modèle|Accuracy|Precision|Recall|Macro F1|Latency|
|---|--:|--:|--:|--:|--:|
|TF-IDF + LR|—|—|—|—|—|
|PyTorch NN|—|—|—|—|—|
|Transformer|—|—|—|—|—|

Ce tableau est très intéressant en entretien.

Tu peux expliquer :

> « J'ai commencé par une baseline classique, puis j'ai testé un réseau neuronal et enfin un Transformer pré-entraîné. J'ai comparé non seulement la performance mais également la latence et les coûts de déploiement. »

C'est beaucoup plus professionnel que :

> « J'ai utilisé BERT parce qu'il est meilleur. »

---

# 60. MODEL CARD

À la fin du projet, crée une fiche modèle.

Exemple :

```text
Model Name:
Multilingual Customer Intent Classifier

Base Model:
Transformer

Languages:
French / English / Darija

Task:
Intent Classification

Training Data:
20,000 messages

Classes:
10

Metrics:
Accuracy:
Macro F1:

Limitations:
- dialect variation
- spelling errors
- code-switching
```

Cette habitude prépare directement aux phases MLOps et Responsible AI.

---

# 61. EXPÉRIMENTATION

Tu dois conserver :

```text
experiment_001
experiment_002
experiment_003
```

avec :

```text
model
learning_rate
batch_size
epochs
max_length
dataset_version
F1
latency
```

Cela préparera naturellement ta prochaine phase MLOps.

---

# 62. ERREUR ANALYSIS

Ne t'arrête pas au score.

Prends les erreurs :

```text
True:
appointment_cancellation

Predicted:
appointment_reschedule
```

et essaye de comprendre pourquoi.

Crée :

```text
Confusion Matrix
+
Examples of misclassified samples
```

C'est une excellente pratique d'AI Engineer.

---

# 63. DATASET QUALITY

Avant l'entraînement, vérifie :

```text
Duplicates
Missing labels
Empty text
Wrong labels
Language mismatch
Class imbalance
Very long samples
Very short samples
```

Le modèle ne compensera pas automatiquement une mauvaise qualité de données.

---

# 64. PERFORMANCE VS COMPLEXITY

Tu dois apprendre à réfléchir ainsi :

```text
Model accuracy
      vs
Inference latency
      vs
Memory
      vs
Cost
      vs
Maintenance
```

Par exemple :

```text
TF-IDF
+ rapide
+ simple
+ faible coût

Transformer
+ meilleur contexte
+ meilleure représentation
- plus lourd
- plus coûteux
```

Le meilleur modèle n'est pas toujours le modèle le plus complexe.

---

# 65. BLOC 6 — MODEL SERVING

Une fois ton Transformer entraîné :

```text
Saved Model
     ↓
Load Model
     ↓
Inference
```

Ton API ne doit pas réentraîner le modèle.

Architecture :

```text
Application startup
       ↓
Tokenizer loaded
       ↓
Model loaded
       ↓
API ready
       ↓
Request
       ↓
Tokenize
       ↓
Inference
       ↓
Response
```

---

# 66. MODEL VERSIONING

Commence à versionner :

```text
model_v1
model_v2
model_v3
```

Exemple :

```text
v1 → TF-IDF
v2 → PyTorch
v3 → Transformer
```

Puis dans la réponse API :

```json
{
  "prediction": "appointment_cancellation",
  "model_version": "v3"
}
```

Cela sera directement utile dans la Phase 5 MLOps.

---

# 67. INFERENCE MODE

En production, utilise :

```python
model.eval()
```

et :

```python
with torch.no_grad():
    ...
```

Pour certaines architectures et scénarios, des optimisations supplémentaires existent, mais pour ton niveau actuel, ces deux concepts doivent être parfaitement acquis.

---

# 68. CE QUE TU DOIS APPRENDRE EN PRIORITÉ

## Priorité A — obligatoire

```text
PyTorch
Tensor
Dataset
DataLoader
nn.Module
Loss
Optimizer
Backpropagation
Training loop
GPU
```

## Priorité B — obligatoire

```text
NLP
Tokenization
Embeddings
TF-IDF
Word2Vec concept
Text classification
F1
Confusion matrix
```

## Priorité C — obligatoire

```text
Attention
Q/K/V
Self-Attention
Multi-Head Attention
Transformer
```

## Priorité D — très importante

```text
BERT
CamemBERT
Hugging Face
Fine-tuning
Transformers
```

## Priorité E — intégration

```text
FastAPI
Model serving
Model version
Inference
```

---

# 69. CE QUE TU NE DOIS PAS APPRENDRE MAINTENANT EN PROFONDEUR

Ne te disperse pas avec :

```text
GPT architecture entière
RLHF avancé
Distributed training complexe
CUDA programming
TensorRT avancé
Multi-GPU optimization
```

Tu les découvriras plus tard.

Ton objectif actuel est :

```text
Comprendre
↓
Construire
↓
Évaluer
↓
Déployer
```

---

# 70. PLANNING RECOMMANDÉ

## Semaine 1 — PyTorch

```text
Day 1
Tensor

Day 2
Autograd

Day 3
nn.Module

Day 4
Loss + Optimizer

Day 5
Dataset + DataLoader

Day 6
Training loop

Day 7
Mini-project
```

---

## Semaine 2 — Deep Learning

```text
Forward propagation
Backpropagation
Activation functions
Batch size
Learning rate
Epoch
Overfitting
Regularization
Early stopping
```

Puis projet classification.

---

## Semaine 3 — NLP classique

```text
Tokenization
Bag of Words
TF-IDF
Word embeddings
Word2Vec concept
Text classification
NLP evaluation
```

Puis baseline du projet.

---

## Semaine 4 — Attention

```text
Sequence modeling
Attention
Query
Key
Value
Self-attention
Multi-head attention
Positional encoding
```

Cette semaine doit être principalement consacrée à la compréhension.

---

## Semaine 5 — Transformers

```text
Transformer architecture
Encoder
Decoder
BERT
GPT
T5
```

Puis Hugging Face.

---

## Semaine 6 — Fine-tuning

```text
Tokenizer
Dataset
Training
Evaluation
Fine-tuning
Model saving
Inference
```

---

## Semaine 7 — Projet NLP

```text
Dataset
 ↓
Baseline
 ↓
Transformer
 ↓
Evaluation
 ↓
Error analysis
```

---

## Semaine 8 — Production

```text
FastAPI
 ↓
Transformer
 ↓
Prediction
 ↓
Tests
 ↓
Model version
```

---

# 71. CHECKLIST FINALE

À la fin de la phase, tu dois pouvoir cocher :

## PyTorch

```text
□ Je peux créer un Tensor
□ Je comprends les shapes
□ Je comprends autograd
□ Je peux créer un nn.Module
□ Je peux définir une loss
□ Je peux utiliser Adam/AdamW
□ Je peux écrire une training loop
□ Je sais utiliser Dataset/DataLoader
□ Je peux utiliser GPU
□ Je sais sauvegarder/charger un modèle
```

## NLP

```text
□ Je comprends TF-IDF
□ Je comprends embeddings
□ Je comprends tokenization
□ Je comprends Word2Vec
□ Je peux construire un classifieur de texte
□ Je sais analyser les erreurs
```

## Transformers

```text
□ Je comprends Q/K/V
□ Je comprends self-attention
□ Je comprends multi-head attention
□ Je comprends positional encoding
□ Je comprends encoder/decoder
□ Je comprends BERT
□ Je comprends fine-tuning
□ Je sais utiliser Hugging Face
```

## Production

```text
□ Je peux charger le modèle dans une API
□ Je peux faire une prédiction via POST /predict
□ Je peux retourner la classe et la probabilité
□ Je peux versionner le modèle
□ Je peux tester l'API
```

---

# 72. QUESTIONS D'ENTRETIEN À SAVOIR RÉPONDRE

À la fin de cette phase, tu dois pouvoir répondre à :

### Pourquoi utiliser PyTorch ?

### Qu'est-ce qu'un tensor ?

### Comment fonctionne la backpropagation ?

### Quelle différence entre epoch, batch et iteration ?

### Quelle différence entre training et evaluation ?

### Pourquoi utilise-t-on `model.eval()` ?

### Qu'est-ce qu'un embedding ?

### Quelle différence entre TF-IDF et embedding ?

### Quelle différence entre Word2Vec et BERT ?

### Qu'est-ce que l'attention ?

### Pourquoi Q, K et V ?

### Explique la formule :

```text
Attention(Q,K,V)
=
softmax(QKᵀ / √dₖ)V
```

### Pourquoi plusieurs attention heads ?

### Pourquoi les Transformers utilisent-ils une information de position ?

### Quelle différence entre BERT et GPT ?

### Qu'est-ce que le fine-tuning ?

### Pourquoi utiliser un modèle pré-entraîné ?

### Comment évaluer un classifieur NLP déséquilibré ?

### Comment déployer un Transformer dans une API ?

---

# 73. LIVRABLE FINAL DE LA PHASE 2

À la fin, ton GitHub doit contenir un projet professionnel comme :

```text
multilingual-customer-intelligence/
│
├── data/
├── notebooks/
│
├── src/
│   ├── data/
│   ├── preprocessing/
│   ├── training/
│   ├── evaluation/
│   └── inference/
│
├── app/
│   ├── main.py
│   ├── api/
│   └── services/
│
├── models/
│
├── tests/
│
├── requirements.txt
├── README.md
├── .env.example
└── .gitignore
```

Et le README doit montrer :

```text
Problem
   ↓
Dataset
   ↓
Baseline
   ↓
Transformer
   ↓
Experiments
   ↓
Evaluation
   ↓
Error Analysis
   ↓
API
   ↓
Inference
```

---

# 74. LE RÉSULTAT POUR TON PROFIL

Après Phase 1 :

```text
Software Engineering
+ FastAPI
+ SQL
+ Testing
+ Git
```

Après Phase 2 :

```text
Software Engineering
+
Machine Learning
+
Deep Learning
+
NLP
+
Transformers
+
Fine-tuning
+
API
```

Tu commenceras alors à avoir un profil qui ressemble réellement à :

```text
                  AI ENGINEER
                       │
        ┌──────────────┼───────────────┐
        │              │               │
    SOFTWARE          ML             NLP
    ENGINEERING       /DL              │
        │              │          TRANSFORMERS
     FastAPI         PyTorch       BERT
     Testing         Training      Fine-tuning
     Git             Evaluation    Hugging Face
        │              │               │
        └──────────────┼───────────────┘
                       │
                    API
                       │
                   Production
```

La **prochaine phase logique** sera ensuite **Phase 3 — LLM Engineering + RAG**, où on passera de « construire un modèle NLP » à « construire des applications basées sur des LLM », avec embeddings, vector databases, retrieval, reranking et évaluation RAG.
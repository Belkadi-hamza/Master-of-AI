# INTRODUCTION TO ML

**Pr. BEN LAHMAR El Habib**

---
## What is machine learning?
- Algorithms types
- Learning techniques: an overview
- Data Preparation (Data pre-processing)

---
## The Four Paradigms of Scientific Discovery

Scientific discovery has evolved through four major paradigms over time:

```mermaid
timeline
    title Four Paradigms of Scientific Discovery
    1st Paradigm : Empirical Science (Pre-1600s)
                : Direct observation & physical experimentation
    2nd Paradigm : Model-Based Theoretical Science (1600s–1950s)
                : Analytical models & theoretical laws
    3rd Paradigm : Computational Science / Simulations (1950s–2000s)
                : Computer simulations of complex phenomena
    4th Paradigm : Data-Driven Science (2000s–Present)
                : Massive data exploration & processing
```

### The Data Lifecycle
The lifecycle surrounding data-driven science consists of:

```mermaid
flowchart TD
    A["📥 Acquisition & Modelling"] --> B["🤝 Collaboration & Visualisation"]
    B --> C["🔍 Analysis & Data Mining"]
    C --> D["📤 Dissemination & Sharing"]
    D --> E["📦 Archiving & Preserving"]
    E --> A
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style C fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style D fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style E fill:#fce4ec,stroke:#c62828,stroke-width:2px
```
---

## What We Talk About When We Talk About "Learning"

* **Core Definition:** Learning general models from data consisting of particular examples.
* **Data Context:** Data is cheap and abundant (data warehouses, data marts); knowledge is expensive and scarce.
* **Retail Example:** Translating customer transactions into consumer behavior patterns:
  * *"People who bought 'Da Vinci Code' also bought 'The Five People You Meet in Heaven'"* (e.g., Amazon recommendation systems).
* **Objective:** Build a model that is a good and useful approximation of reality.

---
  
## What is Machine Learning?

### Context within Artificial Intelligence

* **Artificial Intelligence (AI):** The overarching field encompassing logical systems and knowledge-based systems.
- **Logical Systems:** Propositional & predicate logic (e.g., $A \lor B = \neg(\neg A \land \neg B)$, $A \implies B = \neg A \lor B$).
  * *Knowledge-Based Systems:* Expert systems and rule networks.
* **Machine Learning (ML):** A branch of artificial intelligence concerned with the design and development of algorithms that allow computers to evolve behaviors based on empirical data.
  * Because intelligence requires knowledge, it is necessary for computers to acquire knowledge automatically.
* **Deep Learning (DL):** A subfield nested within Machine Learning utilizing deep multi-layered neural networks.

### Traditional Programming vs. Machine Learning

```mermaid
flowchart LR
    subgraph Traditional["Traditional Programming"]
        direction TB
        A1["Data"] --> C1["Computer"]
        B1["Program"] --> C1
        C1 --> D1["Output"]
    end

    subgraph ML["Machine Learning"]
        direction TB
        A2["Data"] --> C2["Computer"]
        B2["Output"] --> C2
        C2 --> D2["Program (Model)"]
    end

    Traditional --- ML
```


### Definition and Foundations

> **Machine Learning:** The study of algorithms that improve their performance at some task with experience.

* **Goal:** Optimize a performance criterion using example data or past experience.
* **Role of Statistics:** Inference from a sample.
* **Role of Computer Science:** 
  * Efficient algorithms to solve the optimization problem.
  * Representing and evaluating the model for inference.

---

## Machine Learning System Architecture & Pipeline

### Learning System Model

**Training Phase:**  
`Input Samples` → `System` → `Learning Method` → `Trained System`

**Testing Phase:**  
`Input Samples` → `Trained Learning Method` → `Predictions / Outputs`

### Standard Machine Learning Pipeline

# A Standard Machine Learning Pipeline

```mermaid
flowchart TD
    A["Data Preparation (Images, Text, etc.)"] --> B["Feature Extraction"]
    
    B --> C["Model Training"]
    B --> D["Test Data"]
    
    C <--> E["Model"]
    D <--> E
    
    E --> F["Predictions"]
    
    F -.->|Feedback Loop| B
    B -.->|Feedback Loop| A
    
    %% Styling for gears/iteration
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#fb7,stroke:#333,stroke-width:2px
```

   
* **Note:** Feature extraction is a critical step in traditional machine learning pipelines.

---
## Training and Testing Dynamics

### Data Split Relationships
- **Data Acquisition:** Sampling from the *Universal Set* (unobserved).
- **Training Set:** Observed data used to train the system.
- **Testing Set:** Unobserved data reserved for practical evaluation.

### Fundamentals
- **Training Process:** The mechanism enabling the system to learn patterns from data.
- **No Free Lunch Theorem:** 
  - Training set and testing set are assumed to come from the same probability distribution.
  - All learning algorithms must make prior assumptions or biases to generalize beyond the training data.

### Data Flow 

```mermaid
flowchart TD
    A[One Dataset] --> B[Training Data]
    A --> C[Test Data]
    
    B --> D[ML Algorithm]
    D --> E[Classifier]
    
    C --> F[Evaluation Results]
    E --> F
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style E fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style F fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    
```


---

## Factors Affecting Performance

Several factors impact model performance:
* Types of training data provided
* The form and extent of initial background knowledge
* The type of feedback provided
* The learning algorithms used

### Core Pillars
1. **Modeling:** Formulation of hypotheses and representation.
2. **Optimization:** Search and parameter fitting.
3. **Algorithms:**
   * Success depends heavily on algorithm design.
   * Algorithms control the search strategy to discover and construct knowledge structures.
   * Algorithms must extract useful and generalizable information from training examples.

---

## Taxonomy of Machine Learning Algorithms

### 1. Supervised Learning
* **Data Format:** Given dataset $\{(x_n \in \mathbb{R}^d, y_n \in \mathbb{R})\}_{n=1}^N$.
* **Characteristics:** Training data includes desired target outputs (labels).
* **Tasks:**
  * **Classification:** Predicting discrete labels/categories.
  * **Regression:** Predicting continuous real values.

### 2. Unsupervised Learning
* **Data Format:** Given dataset $\{x_n \in \mathbb{R}^d\}_{n=1}^N$.
* **Characteristics:** Training data does **not** include target outputs/labels.
* **Tasks:**
  * Clustering
  * Probability distribution estimation
  * Finding associations in features
  * Dimensionality reduction

### 3. Semi-Supervised Learning
* **Characteristics:** Training dataset contains a large amount of unlabeled data and a small amount of labeled data.

### 4. Reinforcement Learning
* **Characteristics:** Decision-making agent interacting with an environment to maximize cumulative reward over time.
* **Tasks:** Autonomous control, games (chess, Go), robotics.

---

## Structural Workflow of Learning Types

### Supervised Learning Workflow
```mermaid
flowchart LR
    A[Training Text Documents, Images, Sounds] --> B[Feature Vectors]
    C[Labels] --> B
    B --> D[Machine Learning Algorithm]
    D --> E[Predictive Model]
    
    F[New Text Document, Image, Sound] --> G[Feature Vector]
    G --> E
    E --> H[Expected Label]
```

### Unsupervised Learning Workflow
```mermaid
flowchart LR
    A[Training Text Documents, Images, Sounds] --> B[Feature Vectors]
    B --> C[Machine Learning Algorithm]
    C --> D[Model]
    
    E[New Text Document, Image, Sound] --> F[Feature Vector]
    F --> D
    D --> G[Likelihood / Cluster ID / Better Representation]
```

---

## Optimization Objectives & Error Measurement

### Supervised Learning

- **Objective:** Minimize out-of-sample error ($E_{\text{out}}$) or maximize probabilistic likelihood.

- **In-Sample Classification Error:**
  $$
  \text{error} = \frac{1}{N} \sum_{n=1}^{N} \left[ y_n \neq g(x_n) \right]
  $$

- **Generalization Bound (VC Theory):**
  $$
  E_{\text{out}}(g) \le E_{\text{in}}(g) + O\left(\sqrt{\frac{d_{\text{VC}}}{N} \ln N}\right)
  $$

  - $E_{\text{in}}$: Error on training set.
  - $E_{\text{out}}$: Error on testing set.
  - $d_{\text{VC}}$: Vapnik-Chervonenkis dimension (model complexity).

---

### Unsupervised Learning

- **Objectives:**
  - Minimum quantization error
  - Minimum distance
  - Maximum A Posteriori (MAP)
  - Maximum Likelihood Estimation (MLE)


### Underfitting vs. Overfitting (Fixed Sample Size $N$)

```
  Error
    ▲
    │      \                 /  E_out (Testing Error)
    │       \   Optimal     /
    │        \  Capacity   /
    │─────────\───│───────/──────────────
    │          \  │      /  High Variance
    │ High Bias \ │     /   (Overfitting)
    │(Underfitting\   /
    │             \│/
    │───────────────*────────────────── E_in (Training Error)
    └─────────────────────────────────────►
                               d_VC (Model Complexity)
```



```mermaid
flowchart LR
    subgraph Complexity["Model Complexity →"]
        direction LR
        A[Low<br>High Bias<br>Underfitting] --- B[Optimal<br>Capacity] --- C[High<br>High Variance<br>Overfitting]
    end

    subgraph Error["Error"]
        direction TB
        D[E_out - Testing Error] 
        E[E_in - Training Error]
    end

    A -.->|High Error| D
    C -.->|High Error| D
    B -.->|Low Error| D
    E -.->|Decreases| C
```
---

## Learning Techniques Overview

### Supervised Learning Categories & Algorithms
* **Linear Classifiers / Numerical Functions:** 
	* Logistic Regression
	* Linear SVM, Perceptron.
* **Parametric / Probabilistic Functions:**
	* Naïve Bayes
	* Gaussian Discriminant Analysis (GDA)
	  * Hidden Markov Models (HMM)
	  * Probabilistic Graphical Models
* **Non-parametric / Instance-Based Functions:**
	  * K-Nearest Neighbors ($k$-NN)
	  * Kernel Regression
	  * Kernel Density Estimation
	  * Local Regression
* **Non-Metric / Symbolic Functions:**
  * Decision Trees
  * Classification and Regression Trees (CART)
* **Aggregation / Ensemble Methods:**
  * Bagging (Bootstrap Aggregation)
  * AdaBoost
  * Random Forest

### Unsupervised Learning Categories & Algorithms
* **Clustering:**
  * K-Means Clustering
  * Spectral Clustering
  * Hierarchical Clustering
  * DBSCAN
* **Density Estimation:**
  * Gaussian Mixture Models (GMM)
  * Graphical Models
* **Dimensionality Reduction:**
  * Principal Component Analysis (PCA)
  * Factor Analysis
  * Singular Value Decomposition (SVD)
  * Isomap / LLE

### Reinforcement Learning
* **Core Concepts:**
  * **Policies:** Action selection rules mapping situations to actions.
  * **Utility / Value Estimation:** Quantifying state/action desirability.
  * **Feedback:** Delayed reward signals (no instant correct label).
  * **Credit Assignment Problem:** Determining which past action contributed to success/failure.
* **Applications:** Game playing (e.g., Chess, Go), robotics navigation in a maze, multi-agent control under partial observability.

---

## Machine Learning in a Nutshell

Every machine learning algorithm consists of **three core components**:

```mermaid
flowchart TB
    A[Machine Learning Algorithm]
    
    A --> B[Representation]
    A --> C[Evaluation]
    A --> D[Optimization]
    
    subgraph Rep[" "]
        direction LR
        B1[Decision Trees]
        B2[Rules / Logic]
        B3[Memory-based]
        B4[Graphical Models]
        B5[Neural Networks]
        B6[SVMs]
        B7[Ensembles]
    end
    
    subgraph Eval[" "]
        direction LR
        C1[Accuracy]
        C2[Precision/Recall]
        C3[MSE]
        C4[Likelihood]
        C5[Posterior]
        C6[Cost/Utility]
        C7[Margin]
        C8[Entropy/KL]
    end
    
    subgraph Opt[" "]
        direction LR
        D1[Greedy Search]
        D2[Gradient Descent]
        D3[Linear Programming]
    end
    
    B --- Rep
    C --- Eval
    D --- Opt
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
```



---

## Summary Hierarchy of ML Types & Applications

```mermaid
flowchart TD
    ML[Machine Learning]

    ML --> SL[Supervised Learning]
    ML --> UL[Unsupervised Learning]
    ML --> RL[Reinforcement / Optimization]

    SL --> CT[Continuous Target]
    SL --> Cat[Categorical Target]

    CT --> Reg[Regression]
    Reg --> H[Housing Price Prediction]

    Cat --> Class[Classification]
    Class --> M[Medical Imaging]
    Class --> T[Text Classification]
    Class --> L[Lane-finding on GPS Data]

    UL --> NoTarget[No Target Variable]
    NoTarget --> Cluster[Clustering]
    NoTarget --> Assoc[Association]

    Cluster --> CS[Customer Segmentation]
    Cluster --> MB[Market Basket Analysis]

    Assoc --> MB2[Market Basket Analysis]

    RL --> Control[Control / Optimization]
    Control --> DC[Driverless Cars]
    Control --> OM[Optimization Marketing]
```

---

## Steps in Developing a Machine Learning Application

```mermaid
flowchart TD
    A[Collect Data] --> B[Prepare Input Data]
    B --> C[Analyze Input Data]
    C --> D[Filter Garbage<br>Clean Data]
    D --> E[Train Algorithm]
    E --> F[Test Algorithm]
    F --> G{Performance<br>Satisfactory?}
    G -->|Yes| H[Deploy / Use It]
    G -->|No| I[Tune Hyperparameters]
    I --> E
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style E fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style F fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style G fill:#e8eaf6,stroke:#283593,stroke-width:2px
    style H fill:#e0f7fa,stroke:#00695c,stroke-width:2px
    style I fill:#fff8e1,stroke:#e65100,stroke-width:2px
```

---

## Algorithm Selection Guides

```mermaid
flowchart TD
    START[Start] --> Q1{Target<br>Variable<br>Available?}
    
    Q1 -->|NO| Q2{Need to<br>Specify k?}
    Q1 -->|YES| Q3{Classification<br>or<br>Regression?}
    
    Q2 -->|YES| KMEANS[k-means / k-modes]
    Q2 -->|NO| DBSCAN[DBSCAN / Hierarchical]
    
    Q3 -->|Classification| CLASS[Classification Algorithms]
    Q3 -->|Regression| REG[Regression Algorithms]
    
    KMEANS --> GMM[Gaussian Mixture Model<br>if probability needed]
    
    DBSCAN --> HIER[Hierarchical<br>if no k needed]
    
    CLASS --> DT[Decision Tree<br>if explainable]
    CLASS --> SVM[Linear SVM<br>if accuracy & small data]
    CLASS --> LR[Logistic Regression<br>if probability needed]
    
    REG --> LINREG[Linear Regression<br>if explainable]
    REG --> RF[Random Forest<br>if accuracy]
    REG --> NN[Neural Network<br>if large data]
    
    style START fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Q1 fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style Q2 fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style Q3 fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

---

## Industry Insights: State of Data Science & Machine Learning

*(Based on the 2018 Kaggle Survey)*

### Top Designations Across Countries
Primary job titles reported across major global regions:
1. Data Scientist
2. Software Engineer
3. Data Analyst
4. Research Scientist
5. Consultant / Research Assistant / Data Engineer

### Education Levels
Across most surveyed countries (US, India, European Union, China, etc.):
* **Master's Degree** represents the highest proportion of practitioners (~40–55%).
* **Bachelor's Degree** follows as the second largest group (~30–45%).
* **Doctoral Degree (PhD)** comprises ~10–25% (higher in research-centric regions).

---

## Data Preparation and Pre-processing

### The Process for Data Preparation & Feature Engineering

```mermaid
flowchart TD
    A[Define ML Problem<br>& Propose Solution] --> B[Construct Dataset]
    
    B --> B1["Collect raw data"]
    B --> B2["Identify feature & label sources"]
    B --> B3["Select a sampling strategy"]
    B --> B4["Split the data"]
    
    B --> C[Transform Data]
    
    C --> C1["Explore and clean your data"]
    C --> C2["Feature engineering"]
    
    C --> D[Train a Model]
    D --> E[Make Predictions]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style E fill:#e0f7fa,stroke:#00695c,stroke-width:2px
```

---

## Constructing Your Dataset

### Self-Check Concept 1: Feature Selection Strategy
* **Question:** You're on a brand-new ML project, about to select your first features. How many features should you pick?
* **Analysis of Options:**
  1. *Pick as many features as you can:* Incorrect. Leads to the **Curse of Dimensionality**—as dimensionality increases, volume grows exponentially, making available data sparse and hindering the learning of true relationships.
  2. *Pick 4–6 features:* Sub-optimal for a baseline start.
  3. **Best Practice:** **Start small with 1–3 features** that seem to have strong predictive power. Starting with minimal features verifies that the ML pipeline functions as intended and establishes a solid baseline without unnecessary complications.

### Self-Check Concept 2: Correlation vs. Causation
* **Scenario:** A positive correlation exists between app downloads and app review impressions. Does seeing the review *cause* downloads?
* **Key Takeaway:** You cannot determine causation solely from observational data.
* **Solution:** Conduct an A/B test or controlled experiment comparing user behavior between groups exposed and not exposed to the review.

---

## Data Set Size and Quality

> **"Garbage in, garbage out"** — A machine learning model is strictly bounded by the quality and representativeness of its data.

### Data Set Size Examples

| Application / Dataset | Size (Number of Examples) |
| :--- | :--- |
| **Iris Flower Dataset** | 150 (total set) |
| **MovieLens (20M set)** | 20,000,263 |
| **Google Gmail SmartReply** | 238,000,000 (training set) |
| **Google Books Ngram** | 468,000,000,000 |
| **Google Translate** | Trillions of tokens |

* *Rule of Thumb:* A model should ideally train on **at least an order of magnitude more examples than trainable parameters**. Simple models trained on large datasets generally outperform complex models trained on small datasets.

---

## Measuring Data Quality

Quality in ML is empirical: **A quality dataset is one that enables success on the target business problem.**

### Core Pillars of Data Quality
1. **Reliability**
2. **Feature Representation**
3. **Minimizing Skew**

---

## 1. Reliability
Reliability is the degree of trust in data integrity.

### Measurement Questions
1. **How common are label errors?** (Human labeling errors).
2. **Are features noisy?** (e.g., GPS fluctuations).
3. **Is data properly filtered for the problem domain?** (e.g., removing web bot traffic unless training a bot/spam detector).

### Factors Causing Unreliability
* **Omitted Values:** Missing fields (e.g., unentered house age).
* **Duplicate Examples:** Server log duplicates.
* **Bad Labels:** Human mistagging (e.g., mistaking an oak tree for a maple).
* **Bad Feature Values:** Data entry errors (extra digits) or faulty sensor readings (thermometer placed in direct sunlight).

---

## 2. Feature Representation
Representation is the mapping of raw data into numeric, expressive features.

* Key Considerations:
  * How is data presented to the model?
  * Should numeric values be normalized / standardized?
  * How are extreme outliers handled?

---

## 3. Training vs. Serving Skew
* **Definition:** Divergence in model performance between offline training time and live serving time.
* **Causes:** Subtle discrepancies in feature calculations, data leakage, or unrepresentative training traffic.
* **Prevention:** Use only features available at actual prediction time during training.

---

## Identifying Labels and Label Sources

### Direct vs. Derived Labels
* **Direct Label:** Directly measures the target attribute (e.g., *"User is a Taylor Swift fan"*).
* **Derived Label:** Measures a proxy event (e.g., *"User watched a Taylor Swift video on YouTube"*).
* *Caution:* Model efficacy is directly constrained by how closely the derived proxy correlates with the true underlying state.

### Types of Label Sources
* **Events:** e.g., *"Did the user click the top search result?"*
* **Attributes:** e.g., *"Will the advertiser spend more than \$X next week?"*

### Human-Labeled Data Trade-offs

| Advantages (+) | Disadvantages (-) |
| :--- | :--- |
| Can handle complex, subjective tasks | Expensive and time-consuming |
| Forces clear problem definition | Requires multiple annotation iterations |

---

## Sampling and Splitting Data

### Sampling Granularity
When downsampling massive datasets (e.g., search logs):
* **Query Level:** Random query sampling.
* **Session Level:** Preserves sequential query context (required for features like *"previous query"*).
* **User Level:** Preserves cross-day user history (required for features like *"user behavior over past week"*).

---

## Imbalanced Data

An **imbalanced dataset** occurs when target classes possess significantly unequal proportions.

### Degrees of Imbalance

| Degree of Imbalance | Minority Class Proportion |
| :--- | :--- |
| **Mild** | 20% – 40% of dataset |
| **Moderate** | 1% – 20% of dataset |
| **Extreme** | < 1% of dataset |

### Risks of Imbalanced Data
* In extreme cases (e.g., 1 positive in 200 fraud cases, or 0.5%), a model can achieve 99.5% accuracy simply by predicting the majority class ("not fraud") for every sample.
* Gradient updates become dominated by majority class samples, leading to poor learning on minority class signals.

---

## Downsampling and Upweighting Strategy

To correct class imbalance during training:

1. **Step 1: Downsample the Majority Class**
   * Train on a smaller subset of majority class examples.
   * *Example:* Reduce negative samples by a factor of 20 (taking $1/10$ or $1/20$ of negative samples), bringing the positive ratio to ~10%.

2. **Step 2: Upweight the Downsampled Class**
   * Apply an example weight to the downsampled class equal to the downsampling factor.
   * $$	ext{Example Weight} = 	ext{Original Weight} 	imes 	ext{Downsampling Factor}$$
   * An example weight of 20 treats that single instance as 20 identical instances when computing loss.

```mermaid
flowchart TD
    A[Original Dataset<br>Imbalanced Classes] --> B{Identify<br>Dominant Class}
    B --> C[1. Downsample]
    C --> D[Extract subset<br>of dominant class]
    D --> E[Balanced Dataset<br>with fewer majority examples]
    E --> F[2. Upweight]
    F --> G[Assign higher weights<br>to downsampled items]
    G --> H[Train Model with<br>Weighted Examples]
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style B fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style E fill:#e0f7fa,stroke:#00695c,stroke-width:2px
    style F fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style G fill:#fce4ec,stroke:#c62828,stroke-width:2px
    style H fill:#e8eaf6,stroke:#283593,stroke-width:2px
```

### Benefits of Downsampling + Upweighting
* **Faster Convergence:** The model sees minority samples more frequently per epoch.
* **Disk Space Efficiency:** Consolidates majority instances, leaving storage space to collect richer minority samples.
* **Model Calibration:** Upweighting preserves probabilistic output calibration matching true distributions.

---

## Data Splitting and Cluster Skew

### When Random Splitting Fails
* **Cluster Skew:** When dataset examples naturally cluster (e.g., multiple news stories covering the same event), a standard **random split** places elements of the same cluster into both training and test sets, causing data leakage and overly optimistic test scores.
* **Time-Based Splitting:** Split data chronologically (e.g., train on past data, test on future data) to evaluate true predictive capabilities on unseen temporal data.

---

## Model Generalization: Overfitting & Underfitting

```
   Underfitted            Good Fit / Robust          Overfitted
   (High Bias)                 (Ideal)            (High Variance)
 ┌──────────────┐          ┌──────────────┐       ┌──────────────┐
 │  ▲           │          │  ▲           │       │  ▲  /\       │
 │  │ \         │          │  │  \───┐    │       │  │ /  \/\    │
 │  │  \        │          │  │       \   │       │  │/      \   │
 │  └─────────► │          │  └─────────► │       │  └─────────► │
 └──────────────┘          └──────────────┘       └──────────────┘
```

### Summary of Model States

| Property | Underfitting | Overfitting |
| :--- | :--- | :--- |
| **Training Performance** | Poor | Very High |
| **Testing Performance** | Poor | Poor |
| **Bias / Variance** | High Bias, Low Variance | Low Bias, High Variance |
| **Cause** | Model is too simple to capture patterns | Model memorizes noise and training specifics |

### Strategies to Limit Overfitting
1. **Resampling Techniques:** Use $K$-Fold Cross-Validation.
2. **Validation Holdout:** Reserve an independent validation dataset for hyperparameter tuning.
3. **Regularization:** Penalize model complexity.
4. **Simplification:** Reduce feature space and tree depth.

---

## Summary of Data Science Building Blocks

* **Overfitting:** Excessive reliance on training data; fails to generalize to unseen data.
* **Underfitting:** Failure to capture underlying structures in training data.
* **High Variance:** Model predictions fluctuate drastically based on training data variations.
* **High Bias:** Oversimplified assumptions cause the model to ignore training data signals.
* **Validation Set:** Essential for model tuning without contaminating the test set evaluation.

---

## Web Scraping Tools Overview

Techniques for automated web data extraction during ML dataset creation:
* **APIs:** Standardized interfaces for structured data retrieval.
* **Beautiful Soup:** Python library designed for quick extraction and parsing of data from HTML/XML documents.
* **Scrapy:** Full-fledged open-source web crawling and scraping framework for large-scale data extraction.



# [[00 - Table des Matières]]
# TD6 : Monitoring, observabilité, gouvernance et ouverture LLMOps

## Partie I : Partie théorique

### Exercice 1 : QCM

*Choisir une seule bonne réponse*

| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|---|---|---|---|---|---|---|---|
| B | A | B | B | B | B | C | B |

---

**Q1. Le monitoring sert principalement à :**

A. entraîner un modèle plus rapidement
B. détecter si un système sort d'un comportement attendu
C. remplacer la gouvernance des données
D. supprimer les logs

**Q2. L'observabilité permet surtout de :**

A. comprendre pourquoi un problème se produit
B. uniquement visualiser des dashboards
C. supprimer les tests de qualité
D. augmenter automatiquement l'accuracy

**Q3. Parmi les éléments suivants, lequel est une métrique ?**

A. "Erreur de connexion à la base"
B. CPU utilisé à 82 %
C. message texte d'un log
D. description d'un dataset

**Q4. Le data drift correspond à :**

A. une baisse du nombre de serveurs
B. un changement de distribution des données d'entrée
C. une erreur de syntaxe Python
D. une suppression volontaire du modèle

**Q5. Le concept drift signifie que :**

A. les logs sont trop nombreux
B. la relation entre les variables d'entrée et la cible change
C. le schéma de la base est identique
D. Grafana ne reçoit plus de métriques

---

**Q6. OpenLineage est principalement utilisé pour :**

A. entraîner des réseaux de neurones
B. tracer le parcours des données et des jobs
C. créer des conteneurs Docker
D. optimiser les hyperparamètres

**Q7. Dans une logique FinOps, on cherche à suivre :**

A. uniquement l'accuracy
B. uniquement les logs applicatifs
C. les coûts liés aux ressources et à la valeur produite
D. uniquement les notebooks

**Q8. Dans un système RAG, un indicateur important est :**

A. le nombre de ports ouverts
B. le nombre de documents récupérés et leur pertinence
C. la couleur du dashboard
D. le nom du fichier Dockerfile

---

### Exercice 2 : Questions directes

1. Expliquez la différence entre monitoring et observabilité.
2. Donnez trois exemples de logs utiles dans une API de prédiction.
3. Donnez quatre métriques utiles pour surveiller un pipeline de données.
4. Expliquez pourquoi un modèle peut devenir obsolète même si son code n'a pas changé.
5. Pourquoi les labels réels ne sont-ils pas toujours disponibles immédiatement ?
6. Pourquoi la gouvernance est-elle importante dans un système ML ?
7. Donnez deux exemples de coûts à survei****ller dans un système ML en production.
8. Donnez trois risques propres aux systèmes LLM.

---

### Exercice 3 : Définitions à produire

Définir clairement les notions suivantes :

1. monitoring ;
2. observabilité ;
3. logging ;
4. métrique ;
5. alerte ;
6. data drift ;
7. prediction drift ;
8. concept drift ;
9. metadata ;
10. data lineage ;
11. gouvernance des données ;
12. LLMOps.

---

### Exercice 4 : Analyse de signaux

Classer les éléments suivants dans les catégories : log, métrique, alerte, trace, métadonnée.

| Élément                                                            | Catégorie attendue |
| ------------------------------------------------------------------ | ------------------ |
| "Pipeline sales daily terminé avec succès"                         | Log                |
| Latence moyenne API = 240 ms                                       | Métrique           |
| Taux d'erreur supérieur à 5 % pendant 10 minutes                   | Alerte             |
| Chemin complet d'une requête API entre gateway, service ML et base | Trace              |
| Propriétaire du dataset : équipe Finance                           | Métadonnée         |
| Nombre de lignes ingérées aujourd'hui : 98 450                     | Métrique           |
| "Échec de connexion à PostgreSQL"                                  | Log                |
| Dataset marqué comme contenant des données personnelles            | Métadonnée         |
| Notification envoyée à l'équipe DataOps après échec de pipeline    | Alerte             |

---

### Exercice 5 : Mini étude de cas

Une entreprise déploie un modèle de prédiction du churn client. Le modèle avait une AUC de 0,87 lors de l'entraînement. Trois mois après le déploiement, les équipes métiers constatent que les campagnes de rétention deviennent moins efficaces.

Les observations suivantes sont disponibles :

- le service API fonctionne normalement ;
- la latence moyenne est stable ;
- le taux d'erreur est faible ;
- la proportion de clients prédits "à risque" a fortement augmenté ;
- plusieurs variables comportementales ont changé de distribution ;
- les labels réels de churn arrivent avec un délai de 45 jours ;
- le coût d'inférence a doublé car le nombre de requêtes a augmenté.

**Questions :**

1. Pourquoi le monitoring technique seul ne suffit-il pas ?
2. Quels types de drift peut-on suspecter ?
3. Quelles métriques faudrait-il ajouter ?
4. Quelle boucle de feedback proposer ?
5. Quels éléments FinOps faut-il surveiller ?
6. Quels éléments de gouvernance faut-il documenter ?

---

## Partie II : Corrigé suggéré (proposition)

### Exercice 1 : QCM — Réponses

| Question | Réponse | Justification |
|---|---|---|
| Q1 | **B** | Le monitoring détecte les écarts par rapport à un comportement attendu. |
| Q2 | **A** | L'observabilité permet de comprendre l'état interne et la cause des problèmes. |
| Q3 | **B** | CPU utilisé à 82 % est une mesure quantitative collectée régulièrement. |
| Q4 | **B** | Le data drift = changement de distribution des données d'entrée. |
| Q5 | **B** | Le concept drift = changement de la relation entre X et y. |
| Q6 | **B** | OpenLineage trace le parcours des données et des jobs (lineage). |
| Q7 | **C** | FinOps = suivi des coûts liés aux ressources et à la valeur produite. |
| Q8 | **B** | Dans un RAG, le retrieval (nombre de documents, pertinence) est un indicateur clé. |

---

### Exercice 2 : Questions directes — Éléments de réponse

**1. Différence entre monitoring et observabilité**

- **Monitoring** : surveillance continue à partir d'indicateurs prédéfinis (métriques, logs, traces) pour détecter les anomalies. Il répond à la question « Est-ce que quelque chose ne va pas ? »
- **Observabilité** : capacité à comprendre l'état interne d'un système à partir des signaux qu'il produit. Elle répond à la question « Pourquoi cela ne va pas ? » et permet le diagnostic et la résolution.

**2. Trois exemples de logs utiles dans une API de prédiction**

- Log d'entrée : données d'entrée reçues (features, request_id).
- Log de sortie : prédiction produite, version du modèle utilisée.
- Log de performance : latence de la requête, statut (success/error), coût d'inférence.

**3. Quatre métriques utiles pour surveiller un pipeline de données**

- Volume ingéré (nombre de lignes).
- Fraîcheur (âge de la dernière donnée).
- Taux de nulls / qualité des données.
- Durée d'exécution du job / taux de succès.

**4. Pourquoi un modèle peut devenir obsolète même si son code n'a pas changé**

- Les données d'entrée changent (data drift).
- La relation entre les variables et la cible change (concept drift).
- Les comportements des utilisateurs ou du marché évoluent.
- Les distributions des prédictions changent (prediction drift).

**5. Pourquoi les labels réels ne sont-ils pas toujours disponibles immédiatement ?**

- Le phénomène à prédire peut prendre du temps à se produire (churn après plusieurs semaines, défaut de crédit après plusieurs mois).
- La collecte et la validation des labels prennent du temps.
- Dans certains cas, le label n'est jamais observé directement (maintenance, incident futur).

**6. Pourquoi la gouvernance est-elle importante dans un système ML ?**

- Assurer une utilisation fiable, sécurisée et responsable des données et des modèles.
- Garantir la traçabilité, l'auditabilité et la conformité.
- Gérer les versions de modèles, les datasets d'entraînement, les risques de biais.
- Définir les rôles, les droits d'accès et les politiques de rétention.

**7. Deux exemples de coûts à surveiller dans un système ML en production**

- Coût d'inférence (par prédiction, par requête, tokens pour les LLM).
- Coût des ressources cloud (CPU, mémoire, stockage, réseau).

**8. Trois risques propres aux systèmes LLM**

- Hallucinations (réponses non vérifiables).
- Prompt injection (sécurité).
- Fuite d'informations sensibles.
- Coût variable (tokens).
- Biais dans les réponses.
- Dépendance à des modèles externes.

---

### Exercice 3 : Définitions à produire — Éléments de réponse

1. **Monitoring** : surveillance continue d'un système à partir d'indicateurs prédéfinis (métriques, logs, traces) afin de détecter rapidement les anomalies et maintenir son bon fonctionnement.

2. **Observabilité** : capacité à comprendre l'état interne d'un système à partir des signaux qu'il produit (logs, métriques, traces, événements, métadonnées, lineage).

3. **Logging** : enregistrement des événements importants produits par une application, un pipeline ou un modèle en production.

4. **Métrique** : mesure quantitative collectée régulièrement (ex. CPU, latence, volume, drift).

5. **Alerte** : notification déclenchée lorsqu'un indicateur dépasse un seuil ou révèle un comportement anormal nécessitant une action.

6. **Data drift** : changement dans la distribution statistique des données d'entrée.

7. **Prediction drift** : changement dans la distribution des prédictions du modèle.

8. **Concept drift** : changement de la relation entre les variables d'entrée et la variable cible (la même donnée n'a plus la même signification).

9. **Metadata** : données qui décrivent d'autres données (structure, sens, source, fréquence, responsabilité, contraintes de qualité, usages autorisés).

10. **Data lineage** : traçabilité du parcours d'une donnée, depuis sa source jusqu'à ses transformations et ses usages finaux.

11. **Gouvernance des données** : ensemble des règles, rôles, processus et contrôles permettant d'assurer une utilisation fiable, sécurisée et responsable des données et des modèles.

12. **LLMOps** : application des principes MLOps aux systèmes fondés sur des modèles de langage, avec des objets spécifiques à surveiller (prompts, réponses, contexte RAG, hallucinations, coût en tokens, etc.).

---

### Exercice 4 : Analyse de signaux — Corrigé

| Élément | Catégorie attendue |
|---|---|
| "Pipeline sales daily terminé avec succès" | **Log** |
| Latence moyenne API = 240 ms | **Métrique** |
| Taux d'erreur supérieur à 5 % pendant 10 minutes | **Alerte** |
| Chemin complet d'une requête API entre gateway, service ML et base | **Trace** |
| Propriétaire du dataset : équipe Finance | **Métadonnée** |
| Nombre de lignes ingérées aujourd'hui : 98 450 | **Métrique** |
| "Échec de connexion à PostgreSQL" | **Log** |
| Dataset marqué comme contenant des données personnelles | **Métadonnée** |
| Notification envoyée à l'équipe DataOps après échec de pipeline | **Alerte** |

---

### Exercice 5 : Mini étude de cas — Corrigé proposé

**1. Pourquoi le monitoring technique seul ne suffit-il pas ?**

Le monitoring technique (API, latence, taux d'erreur) indique que le service fonctionne, mais il ne dit rien sur la qualité des prédictions ni sur leur pertinence métier. Ici, l'API est stable, mais les campagnes de rétention deviennent moins efficaces : le modèle est techniquement opérationnel mais fonctionnellement dégradé. Il faut un monitoring des données, des prédictions et de la performance ML.

**2. Quels types de drift peut-on suspecter ?**

- **Data drift** : plusieurs variables comportementales ont changé de distribution.
- **Prediction drift** : la proportion de clients prédits "à risque" a fortement augmenté.
- **Concept drift** (possible) : la relation entre les variables et le churn a pu changer, rendant le modèle moins pertinent.

**3. Quelles métriques faudrait-il ajouter ?**

- Score de drift sur les variables d'entrée (data drift).
- Distribution des prédictions (prediction drift).
- Performance du modèle lorsque les labels arrivent (AUC, précision, rappel après 45 jours).
- Performance par segment (segments clients).
- Taux de conversion des campagnes de rétention (métrique business).
- Coût par prédiction et coût total d'inférence.

**4. Quelle boucle de feedback proposer ?**

Une boucle de feedback continue (Kaizen) :

- **Définir** les KPIs métier et ML.
- **Mesurer** les performances et les drifts.
- **Détecter** les anomalies (data drift, prediction drift, baisse d'efficacité).
- **Analyser** les causes (variables impactées, segments).
- **Corriger** : réentraîner le modèle avec des données récentes.
- **Redéployer** la nouvelle version.
- **Capitaliser** les enseignements.

**5. Quels éléments FinOps faut-il surveiller ?**

- Coût d'inférence (par prédiction, par requête).
- Coût des ressources cloud (CPU, mémoire, stockage).
- Coût par utilisateur / par campagne.
- Coût total mensuel et tendance.
- Valeur produite (gain des campagnes de rétention) vs coût.

**6. Quels éléments de gouvernance faut-il documenter ?**

- Versions du modèle et datasets d'entraînement.
- Métriques d'évaluation et validation avant production.
- Risques de biais et performance par segment.
- Lineage des données et des transformations.
- Propriétaires des données et des modèles.
- Politiques d'accès et de rétention.
- Procédures de réentraînement et de remplacement du modèle.
- Logs d'audit et traçabilité des décisions.
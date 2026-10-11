## 📄 Document support

> Cette étude cartographique vise à explorer le champ de recherche sur l'utilisation de l'IA pour la détection de fraude dans les transactions bancaires. La stratégie de recherche a mobilisé six bases de données (Scopus, IEEE Xplore, ACM DL, ScienceDirect, SpringerLink, Web of Science) avec l'équation : `("fraud detection" OR "anomaly detection") AND ("machine learning" OR "deep learning" OR "artificial intelligence") AND ("banking" OR "financial transaction")`. Sur 850 articles identifiés, 762 ont été exclus après application des critères d'inclusion/exclusion (période 2015-2024, articles en anglais, études empiriques, indexées Scopus/WoS ; exclusion des articles non scientifiques, doublons et documents sans résultats exploitables). 88 articles ont été retenus. L'extraction des données a été réalisée à l'aide d'un formulaire structuré (référence, méthode, type de données, résultats, limites), avec vérification croisée entre chercheurs. Les résultats montrent une prédominance des méthodes de Random Forest et de réseaux de neurones (deep learning), utilisées respectivement en 34% et 28% des études. La majorité des travaux (61%) utilisent des données transactionnelles internes aux banques, tandis que 22% utilisent des jeux de données publics (souvent déséquilibrés, avec très peu de cas de fraude réels). Une tendance nette apparaît vers l'utilisation de techniques de rééquilibrage des classes (SMOTE, undersampling) pour pallier ce déséquilibre. Un gap important est identifié : peu d'études (6%) évaluent l'explicabilité (interprétabilité) des modèles de détection, alors que cette dimension est cruciale pour la conformité réglementaire dans le secteur bancaire. Les principales limites relevées concernent la faible généralisabilité des modèles d'une banque à l'autre, et la rareté des données réelles de fraude partagées publiquement pour des raisons de confidentialité.

---

## 📝 Exercice 1 — Compréhension du document support (4 points)

### 1.1 Quel est l'objectif essentiel d'une étude cartographique systématique, tel qu'illustré ici ? (1 pt)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong> Fournir une vue d'ensemble structurée d'un domaine de recherche (ici, l'IA pour la détection de fraude bancaire), en identifiant :</p>

<ul>
  <li>La quantité de travaux existants</li>
  <li>Leur classification (méthodes, données, tendances)</li>
  <li>Les lacunes (gaps) du champ</li>
</ul>

</details>

---

### 1.2 Citez les étapes principales de la démarche de cartographie systématique appliquées dans ce document. (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<ol>
  <li>Définir la question / le champ cartographique</li>
  <li>Élaborer la stratégie de recherche (bases + équation booléenne)</li>
  <li>Sélectionner rigoureusement les études (critères d'inclusion/exclusion)</li>
  <li>Extraire les données via un formulaire structuré</li>
  <li>Synthétiser sous forme de tendances, clusters et gap</li>
</ol>

</details>

---

### 1.3 Relevez deux questions de recherche qui pourraient être formulées à partir de ce document et précisez brièvement leur intérêt. (1 pt)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<ul>
  <li>
    <strong>Exemple 1 :</strong> « Quelles méthodes de machine learning sont les plus utilisées pour la détection de fraude bancaire ? »<br>
    <em>Intérêt :</em> orienter le choix méthodologique des futures recherches.
  </li>
  <li>
    <strong>Exemple 2 :</strong> « Quelle est la part des études évaluant l'explicabilité des modèles de détection de fraude ? »<br>
    <em>Intérêt :</em> révéler un gap crucial pour la conformité réglementaire.
  </li>
</ul>

</details>

---

## 📝 Exercice 2 — Analyse méthodologique du support (6 points)

### 2.1 Expliquez, à partir du document, le rôle de la stratégie de recherche dans cette étude cartographique. (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong> La stratégie de recherche permet d'identifier les études pertinentes en construisant une équation booléenne combinant les concepts clés :</p>

<ul>
  <li>Fraude / anomalie</li>
  <li>IA / ML / DL</li>
  <li>Banque / transaction</li>
</ul>

<p>Interrogée sur six bases de données scientifiques, elle garantit que le corpus rassemblé est <strong>pertinent</strong> et <strong>traçable</strong>, condition indispensable pour que la cartographie soit scientifiquement défendable.</p>

</details>

---

### 2.2 Présentez deux critères d'inclusion et deux critères d'exclusion utilisés dans l'étude. Pourquoi sont-ils importants ? (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<table>
  <thead>
    <tr>
      <th>Critère</th>
      <th>Type</th>
      <th>Pourquoi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2015-2024</td>
      <td>Inclusion</td>
      <td>Actualité</td>
    </tr>
    <tr>
      <td>Études empiriques Scopus/WoS</td>
      <td>Inclusion</td>
      <td>Qualité scientifique</td>
    </tr>
    <tr>
      <td>Documents non scientifiques</td>
      <td>Exclusion</td>
      <td>Manque de rigueur</td>
    </tr>
    <tr>
      <td>Doublons entre bases</td>
      <td>Exclusion</td>
      <td>Fausseraient le comptage</td>
    </tr>
  </tbody>
</table>

<p><strong>Importance :</strong> ces critères garantissent la <strong>transparence</strong> et la <strong>reproductibilité</strong> de la sélection.</p>

</details>

---

### 2.3 Quel est le rôle du formulaire d'extraction des données dans ce type de travail ? (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong> Le formulaire d'extraction standardise la collecte d'informations :</p>

<ul>
  <li>Méthode</li>
  <li>Type de données</li>
  <li>Résultats</li>
  <li>Limites</li>
</ul>

<p><strong>Avantages :</strong></p>

<ul>
  <li>Comparaison rigoureuse entre études</li>
  <li>Vérification croisée entre chercheurs</li>
  <li>Sans lui, la synthèse resterait subjective</li>
</ul>

</details>

---

## 📝 Exercice 3 — Questions englobant l'ensemble du module (6 points)

### 3.1 En vous appuyant sur ce document, expliquez la différence entre une étude cartographique et une revue systématique de littérature (RSL). (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<table>
  <thead>
    <tr>
      <th>Critère</th>
      <th>Cartographie</th>
      <th>RSL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Objectif</td>
      <td>Explorer largement</td>
      <td>Répondre précisément</td>
    </tr>
    <tr>
      <td>Question</td>
      <td>Large</td>
      <td>Ciblée</td>
    </tr>
    <tr>
      <td>Protocole</td>
      <td>Souple</td>
      <td>Strict</td>
    </tr>
    <tr>
      <td>Résultat</td>
      <td>Carte + gap</td>
      <td>Réponse argumentée</td>
    </tr>
  </tbody>
</table>

<p><strong>Exemple :</strong></p>

<ul>
  <li><strong>Cartographie :</strong> « Que sait-on sur l'IA pour la fraude bancaire ? »</li>
  <li><strong>RSL :</strong> « Quelles techniques d'explicabilité sont applicables aux modèles de détection de fraude ? »</li>
</ul>

<p><strong>Formule :</strong> <em>La cartographie ouvre le champ ; la RSL l'approfondit sur un point précis.</em></p>

</details>

---

### 3.2 À partir des résultats présentés (notamment le gap sur l'explicabilité), proposez un exemple de problème de recherche qui pourrait prolonger cette étude. (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<p><strong>Constat :</strong> Peu d'études (6%) évaluent l'explicabilité, pourtant cruciale pour la conformité réglementaire.</p>

<p><strong>Problème de recherche :</strong></p>

<blockquote>
  Peu d'études évaluent l'explicabilité des modèles de détection de fraude, alors que cette dimension est essentielle pour la conformité bancaire.
</blockquote>

<p><strong>Question associée :</strong></p>

<blockquote>
  Dans quelle mesure des techniques d'IA explicable (SHAP, LIME) permettent-elles de rendre interprétables les modèles de détection de fraude sans dégrader leur performance ?
</blockquote>

</details>

---

### 3.3 Si vous vouliez transformer ce prolongement en recherche appliquée, quel design de recherche et quel protocole expérimental pourriez-vous envisager ? Répondez de manière concise. (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<table>
  <thead>
    <tr>
      <th>Élément</th>
      <th>Détail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Design</strong></td>
      <td>Étude comparative/expérimentale</td>
    </tr>
    <tr>
      <td><strong>Objectif</strong></td>
      <td>Mesurer le compromis performance/explicabilité</td>
    </tr>
    <tr>
      <td><strong>Données</strong></td>
      <td>Transactions réelles ou publiques rééquilibrées (SMOTE)</td>
    </tr>
    <tr>
      <td><strong>Modèles</strong></td>
      <td>Random Forest, réseau de neurones</td>
    </tr>
    <tr>
      <td><strong>Explicabilité</strong></td>
      <td>SHAP, LIME</td>
    </tr>
    <tr>
      <td><strong>Métriques performance</strong></td>
      <td>F1-score, précision, rappel</td>
    </tr>
    <tr>
      <td><strong>Métriques explicabilité</strong></td>
      <td>Évaluation par experts métier</td>
    </tr>
    <tr>
      <td><strong>Validation</strong></td>
      <td>Validation croisée</td>
    </tr>
  </tbody>
</table>

</details>

---

## 📝 Exercice 4 — De la rédaction scientifique à la communication scientifique (4 points)

### 4.1 Montrez comment ce document pourrait servir de base à la rédaction d'un article scientifique. Citez au moins quatre parties qu'un tel article devrait contenir. (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<table>
  <thead>
    <tr>
      <th>Partie</th>
      <th>Contenu issu du document</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Introduction</strong></td>
      <td>Importance de la fraude + gap explicabilité</td>
    </tr>
    <tr>
      <td><strong>Méthodologie</strong></td>
      <td>Bases, équation, critères inclusion/exclusion</td>
    </tr>
    <tr>
      <td><strong>Résultats</strong></td>
      <td>Répartition méthodes, types de données</td>
    </tr>
    <tr>
      <td><strong>Discussion</strong></td>
      <td>Limites de généralisabilité, perspectives</td>
    </tr>
  </tbody>
</table>

<p><strong>Parties minimales d'un article :</strong></p>

<ol>
  <li>Introduction</li>
  <li>Méthodologie</li>
  <li>Résultats</li>
  <li>Discussion</li>
  <li>Conclusion (+ résumé)</li>
</ol>

</details>

---

### 4.2 Si vous deviez présenter ce travail sous forme de communication scientifique, quels éléments essentiels retiendriez-vous pour une présentation orale courte ? (2 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé :</strong></p>

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Élément</th>
      <th>Durée indicative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Contexte + gap explicabilité</td>
      <td>1 min</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Stratégie de recherche (1 slide)</td>
      <td>1 min</td>
    </tr>
    <tr>
      <td>3</td>
      <td>2-3 résultats clés visuels</td>
      <td>2 min</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Conclusion + piste de recherche</td>
      <td>1 min</td>
    </tr>
  </tbody>
</table>

<p><strong>Astuce :</strong> Privilégier les visuels (graphiques, tableaux) plutôt que le texte.</p>

</details>

---

## 📝 Exercice 5 — Question de synthèse (4 points)

### En vous appuyant sur le document support et sur les notions étudiées dans le module, expliquez la progression suivante : de l'idée de recherche au problème de recherche, puis de la cartographie vers la RSL, des designs de recherche vers les protocoles expérimentaux, et enfin vers la rédaction et la communication scientifiques. (4 pts)

<details>
<summary>👁️ Voir le corrigé</summary>

<p><strong>Corrigé (structure de réponse attendue) :</strong></p>

<pre>
1. IDÉE GÉNÉRALE
   └── L'IA peut détecter la fraude bancaire

2. PROBLÈME DE RECHERCHE
   ├── Délimiter : explicabilité des modèles
   ├── Population : banques de détail
   ├── Problématique : manque d'études sur l'explicabilité
   ├── Question : Dans quelle mesure l'IA explicable... ?
   └── Variables : VI (type de modèle) / VD (explicabilité + performance)
       └── Indicateurs : F1-score, score d'interprétabilité

3. ÉTUDE CARTOGRAPHIQUE
   ├── Explorer le champ
   └── Repérer le gap sur l'explicabilité

4. RSL CIBLÉE
   ├── Approfondir le gap
   └── Synthétiser les techniques d'IA explicable

5. DESIGN DE RECHERCHE
   └── Relier problème ↔ données ↔ méthode

6. PROTOCOLE EXPÉRIMENTAL
   ├── Dataset : transactions + SMOTE
   ├── Nettoyage + sélection de variables
   ├── Modélisation : RF, NN
   ├── Explicabilité : SHAP, LIME
   ├── Métriques : F1, précision, rappel
   └── Validation croisée

7. RÉDACTION SCIENTIFIQUE
   └── Article : intro, méthode, résultats, discussion, conclusion

8. COMMUNICATION SCIENTIFIQUE
   └── Oral : problème, méthode, résultats clés
</pre>

<p><strong>Phrase de synthèse :</strong></p>

<blockquote>
  Une recherche rigoureuse relie constamment la formulation du problème, l'ancrage dans la littérature, la rigueur méthodologique et la valorisation par l'écriture et l'oral.
</blockquote>

</details>

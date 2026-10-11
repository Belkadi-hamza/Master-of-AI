## Partie I : Partie théorique

### 1. QCM Choisir une seule bonne réponse

| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|----|----|----|----|----|----|----|----|
| a  |    |    |    |    |    |    |    |
| b  |    |    |    |    |    |    |    |
| c  |    |    |    |    |    |    |    |
| d  |    |    |    |    |    |    |    |

**Q1. La reproductibilité d'un projet ML concerne principalement :**

a) uniquement les performances du modèle  
b) uniquement le code source  
c) le code, les données, les dépendances, les configurations et les artefacts  
d) uniquement le dataset final

**Q2. Le suivi des expériences permet principalement :**

a) de remplacer complètement les tests  
b) de conserver les hyperparamètres, métriques et artefacts d'un run  
c) de supprimer le besoin de versionner le code  
d) d'améliorer automatiquement les performances

**Q3. Le versionnement des modèles est utile pour :**

a) éviter l'évaluation  
b) comparer plusieurs itérations et permettre un retour arrière  
c) supprimer la nécessité d'un registry  
d) remplacer le monitoring

**Q4. Un model registry sert à :**

a) stocker des dashboards BI  
b) gérer les jeux de données bruts uniquement  
c) enregistrer, versionner et gouverner les modèles  
d) entraîner automatiquement tous les modèles

**Q5. Le packaging d'un projet ML vise notamment à :**

a) rendre le projet plus difficile à modifier  
b) empêcher toute réutilisation  
c) encapsuler le projet ou le modèle dans une forme exécutable et réutilisable  
d) remplacer les pipelines

**Q6. Le lien entre reproductibilité et auditabilité signifie que :**

a) un modèle auditable n'a pas besoin de versionnement  
b) un audit sérieux exige des traces sur la construction et l'évaluation du modèle  
c) la reproductibilité remplace les exigences réglementaires  
d) l'auditabilité concerne uniquement les bases de données

**Q7. Dans un pipeline ML reproductible, quelle étape doit être explicitement tracée ?**

a) uniquement l'entraînement  
b) uniquement le déploiement  
c) les entrées, transformations, paramètres, artefacts et résultats  
d) uniquement la métrique finale

**Q8. L'approche build once, run many renforce principalement :**

a) l'ambiguïté des environnements  
b) la portabilité et la stabilité d'exécution  
c) la dépendance au poste local  
d) la suppression du packaging

---

### B. Questions directes

1. Définir la reproductibilité en contexte MLOps.

2. Pourquoi un bon score de modèle ne suffit-il pas dans un projet industriel ?

3. Quelles différences faites-vous entre versionnement du code, versionnement des données et versionnement des modèles ?

4. En quoi le tracking des expériences améliore-t-il la collaboration ?

5. Quel est le rôle d'un registry dans la gestion du cycle de vie ?

6. Pourquoi le packaging est-il une étape intermédiaire importante avant le déploiement ?

7. En quoi la reproductibilité prépare-t-elle la CI/CD ML ?

8. Pourquoi la traçabilité est-elle importante en cas d'incident en production ?

---

### C. Définitions à fournir

Donner une définition précise des termes suivants :

1. Reproductibilité  
2. Traçabilité des expériences  
3. Dataset version  
4. Model version  
5. Model registry  
6. Packaging  
7. Pipeline ML  
8. Auditabilité  
9. Artefact ML  
10. Cycle de vie du modèle

---

### D. Questions d'analyse

1. Un étudiant affirme : « Si le code est sur Git, alors le projet est reproductible. » Discutez cette affirmation.

2. Expliquez pourquoi un fichier modèle seul n'est pas suffisant pour garantir la reproductibilité.

3. Comparez un notebook exploratoire et un pipeline reproductible sous l'angle de l'ingénierie.

4. Analysez le lien entre versionnement des données et qualité des résultats.

5. Montrez en quoi le packaging participe déjà à la préparation au déploiement.

---

### E. Mini étude de cas

**Cas proposé**

Une équipe de data science a développé un modèle de classification pour prédire le churn client. Après plusieurs semaines, le meilleur modèle est annoncé. Cependant :

- le dataset a été modifié plusieurs fois sans archive claire ;
- les hyperparamètres finaux ne sont pas documentés ;
- le modèle est sauvegardé sous le nom `final_model_v2_really_final.pkl` ;
- les dépendances sont installées manuellement sur un poste local ;
- aucun registre n'est utilisé ;
- le score annoncé ne peut pas être reproduit par un autre membre de l'équipe.

**Questions**

1. Identifiez au moins cinq problèmes MLOps présents dans ce cas.

2. Classez ces problèmes selon les dimensions suivantes : code, données, dépendances, modèles, résultats.

3. Proposez une stratégie d'amélioration en cinq étapes.

4. Expliquez quel serait le rôle d'un pipeline et d'un registry dans ce contexte.

5. Indiquez les éléments minimaux à enregistrer pour rendre le projet auditable.
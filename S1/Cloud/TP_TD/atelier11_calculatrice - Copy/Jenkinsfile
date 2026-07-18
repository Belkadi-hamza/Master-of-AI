pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code depuis GitHub...'
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                echo 'Installation des dépendances...'
                bat 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                echo 'Exécution des tests...'
                bat 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Build de l\'application...'
                bat 'echo Build terminé avec succès'
            }
        }
    }
    
    post {
        success {
            echo 'Bravo, déploiement réussi !'
        }
        failure {
            echo 'Le build a échoué. Vérifiez les logs.'
        }
    }
}
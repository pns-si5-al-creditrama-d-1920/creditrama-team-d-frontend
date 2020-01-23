pipeline {
    agent {
        label "jenkins-nodejs"
    }
    environment {
        VERSION = "${currentBuild.number}"
    }
    stages {
        stage('Install dependencies') {
            steps {
                container('nodejs') {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                container('nodejs') {
                    sh 'npm run test'
                }
            }
        }
        stage('Build') {
            steps {
                container('nodejs') {
                    sh 'npm run build-prod'
                }
            }
        }
    }
}
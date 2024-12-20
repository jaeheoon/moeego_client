pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'CI=false npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t moeego_client .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop moeego_client || true'
                sh 'docker rm moeego_client || true'
                sh 'docker run -d -p 80:80 -p 443:443 --name moeego_client moeego_client'
            }
        }
    }
}

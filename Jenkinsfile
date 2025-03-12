pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "jskim4695/ethereal_trail" // Docker 이미지 이름
        DOCKER_REGISTRY = "docker.io/jskim4695/ethereal_trail" // Docker Registry URL
        DEPLOY_DIR = "/Ethereal-Trail_BE"
    }

    stages {
        stage('Checkout') {
            steps {
                // Git 레포지토리에서 소스 코드를 가져옴
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Node.js 의존성 설치
                sh 'npm install'
            }
        }

        stage('Build TypeScript') {
            steps {
                // TypeScript 코드를 JavaScript로 빌드
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def status = sh(script: 'npm test', returnStatus: true)
                    if (status != 0) {
                        error "Tests failed with status ${status}"
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Docker 이미지를 빌드
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
            }
        }

        stage('Push to Registry') {
            steps {
                // Docker 이미지를 Registry에 푸시
                withCredentials([string(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                    echo ${DOCKER_PASSWORD} | docker login ${DOCKER_REGISTRY} -u ${DOCKER_USERNAME} --password-stdin
                    docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
                    docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                cd ${DEPLOY_DIR}
                docker-compose pull || echo "Pull failed, using existing image"
                docker-compose down || echo "Failed to stop old containers"
                docker-compose up -d || echo "Failed to start new containers"
                """
            }
        }
    }
    post {
        always {
            // 빌드 로그 압축 및 저장
            archiveArtifacts artifacts: '**/logs/*.log', fingerprint: true
        }
    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "${DOCKER_IMAGE_NAME}" // Docker 이미지 이름
        DOCKER_REGISTRY = "docker.io/jskim4695/ethereal_trail" // Docker Registry URL
        SERVER_USER = "ubuntu"
        SERVER_IP = "43.201.54.1"
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

        stage('Run Tests') {
            steps {
                // 테스트 실행
                sh 'npm test'
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
                withCredentials([string(credentialsId: 'docker-registry-credentials', variable: 'DOCKER_PASSWORD')]) {
                    sh """
                    echo ${DOCKER_PASSWORD} | docker login ${DOCKER_REGISTRY} -u your-docker-username --password-stdin
                    docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                // 서버로 Docker 이미지를 배포
                sshagent(['ssh-server-credentials']) {
                    sh """
                    ssh ${SERVER_USER}@${SERVER_IP} "docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER} && docker stop ${DOCKER_IMAGE} || true && docker rm ${DOCKER_IMAGE} || true && docker run -d --name ${DOCKER_IMAGE} -p 3000:3000 ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    """
                }
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

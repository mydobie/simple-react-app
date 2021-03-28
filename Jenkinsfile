pipeline {
    agent {
        docker {
            image 'node:14.15-buster'
            args '-u root:root'
        }
    }
    // environment {
    //     ARTIFACTORY = credentials('artifactory.umn.edu')
    //     ARTIFACTORY_PASS = "${ARTIFACTORY_PSW}"
    //     ARTIFACTORY_USER = 'appdev'
    // }
    stages {
        stage('checkout') {
            steps {
                checkout([
                        $class                           : 'GitSCM',
                        branches                         : scm.branches,
                        doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                        extensions                       : [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
                        userRemoteConfigs                : scm.userRemoteConfigs,
                ])
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm_config_cache=npm-cache npm ci'
                sh 'node -v > node_version'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Code Coverage') {
            steps{
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                sh 'node utils/testCoverage.js'
                }
            }
        }
        stage('Code Linting') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                sh 'npm run lint'
                }
            }
        }
        stage('NPM Audit') {
            steps {
                sh 'npm run npmAudit'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build:ci'
            }
        }
       
        // stage('Push to Artifactory - Green channel') {
        //     when { tag "v*" }
        //     steps {
        //         script{
        //             sh 'npm run createTar'
        //             def version = "${TAG_NAME}".substring(1)
        //             def upload = $/curl -X PUT -u $ARTIFACTORY_USER:$ARTIFACTORY_PASS -T ./archive/simple-react-app-"${version}".tgz "https://artifactory.umn.edu/artifactory/appdev-generic-private-local/edu.umn.oit/simple-react-app/green/BETA/simple-react-app-${version}.tgz"/$
        //             sh upload
        //         }
        //      }
        // }
    }
}
pipeline {
  agent any
  tools { nodejs 'node20' }
  triggers { pollSCM('H/2 * * * *') }
  stages {
    stage('Checkout')    { steps { checkout scm } }
    stage('Instalación') { steps { sh 'npm ci' } }
    stage('Análisis')    { steps { sh 'npm run lint' } }
    stage('Pruebas')     { steps { sh 'npm test' } }
    stage('Build')       { steps { sh 'npm run build' } }
  }
  post {
    success { echo 'Build exitoso' }
    failure { echo 'El pipeline detectó errores' }
  }
}
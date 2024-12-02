# Projet Microservices avec Docker
Ce projet comprend deux services principaux : le backend et le frontend, chacun étant géré par des conteneurs Docker.

# Pré-requis

Docker et Docker Compose installés sur votre machine.
Un éditeur de texte comme Visual Studio Code (optionnel mais recommandé).

# Instructions

# 1. Construction des images Docker
Backend
Naviguez dans le répertoire backend et construisez l'image Docker avec la commande suivante :

docker build -t backend-service:latest .
Frontend
Naviguez dans le répertoire frontend et construisez l'image Docker avec la commande suivante :

docker build -t frontend-service:latest .
# 2. Lancement des services avec Docker Compose
Pour démarrer tous les services (backend et frontend), exécutez la commande suivante dans le répertoire principal contenant le fichier docker-compose.yaml :

docker compose up --build
# 3. Affichage des conteneurs en cours d'exécution
Pour voir les conteneurs actifs, utilisez :


docker ps

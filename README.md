## Exemple de script Bash

Voici un script Bash simple pour exécuter une commande Docker :

```bash
#!/bin/bash

# Construction de l'image Docker pour le backend
docker build -t users-api:v2 ./backend

# Construction de l'image Docker pour le frontend
docker build -t users-api:v1 ./frontend

# Liste les images Docker
docker images

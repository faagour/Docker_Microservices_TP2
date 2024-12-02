## Explication de la création des images 

On doit suivre les étapes suivantes.

```bash
#!/bin/bash

# Construction de l'image Docker pour le backend
docker build -t users-back:v2 ./backend

# Construction de l'image Docker pour le frontend
docker build -t users-front:v1 ./frontend

# Liste les images Docker
docker images

# Pour lancer docker compose:

docker compose up --build

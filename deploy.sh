# !/bin/bash

# Pull latest changes
git pull

# Cleanup docker
sudo docker system prune -f

# Deploy
sudo docker-compose up -d --build
#!/bin/sh

# cd into projects folder
cd ~/itesm-socioformador-feb-jun-2024-Croods

# Remove frontend folder
rm -rf knowx

# cd into projects folder
cd api

# git pull
git pull

# Spin docker containers down to prevent errors
sudo docker compose -f docker-compose.yml down

# Compose docker containers back up
sudo docker compose -f docker-compose.yml up -d --build

echo "API REDEPLOYED!"
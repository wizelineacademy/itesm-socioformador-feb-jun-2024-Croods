#!/bin/bash

# cd into projects folder
cd /root/itesm-socioformador-feb-jun-2024-Croods/api

# git pull
git pull && git reset origin/main --hard

rm -rf knowx

# Spin docker containers down to prevent errors
sudo docker compose -f docker-compose.yml down

# Compose docker containers back up
sudo docker compose -f docker-compose.yml up -d --build

echo "API REDEPLOYED!"

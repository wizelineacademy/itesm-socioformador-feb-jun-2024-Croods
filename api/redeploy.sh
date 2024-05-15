#!/bin/bash

# cd into projects folder
cd /root/itesm-socioformador-feb-jun-2024-Croods/api

# git fetch
git fetch && git reset origin/main --hard

# Spin docker containers down to prevent errors
docker compose -f docker-compose.yml down

# Compose docker containers back up
docker compose -f docker-compose.yml up -d --build

echo "API REDEPLOYED!"

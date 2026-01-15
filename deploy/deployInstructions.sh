#!/bin/bash

# Create Project directory
mkdir -pv deploy/envServices/

# Create compose files
wget https://raw.githubusercontent.com/michcatg/front-coa-iis/refs/heads/main/compose.yml \
    -O compose.yml
wget https://raw.githubusercontent.com/michcatg/front-coa-iis/refs/heads/main/compose_prod.yml \
    -O compose_prod.yml

# Create env files
wget https://raw.githubusercontent.com/michcatg/front-coa-iis/refs/heads/main/deploy/envServices/.env.portal.prod.example \
    -O deploy/envServices/.env.portal.prod

wget https://raw.githubusercontent.com/michcatg/front-coa-iis/refs/heads/main/deploy/.env.prod.example \
    -O .env

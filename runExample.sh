#!/bin/bash
#######################################################################################
#    INSTRUCCIONES DE PRUEBA PARA CORRER EL PROYECTO LOCALMENTE USANDO DOCKER COMPOSE #
#                             AMBITENTE DE PRODUCCIÓN Y DESARROLLO                    #
#######################################################################################
# prod
docker compose -f compose.yml -f compose_prod.yml --env-file=./deploy/.env.prod up -d
docker compose -f compose.yml -f compose_prod.yml --env-file=./deploy/.env.prod down
# dev
docker compose -f compose.yml -f compose_dev.yml --env-file=./deploy/.env.dev up -d
docker compose -f compose.yml -f compose_dev.yml --env-file=./deploy/.env.dev down

# Portal biblioteca IIS UNAM | Concurso de oposición abierto
El siguietne documento describe las instrucciones de despliegue del servicio del portal en un entorno de microservicios utilizando docker y docker compose.

Esta documentación corresponde al repositorio front-coa-iis ubicado en https://github.com/michcatg/front-coa-iis

## Pre-requisitos
* Contar con un servicio de strapi corriendo y accesible en la misma red virtual, además de su configuración asociada

* Contar con un servicio de omekas corriendo y accesible en la misma red virtual, además de su configuración asociada

* Contar con el proxy inverso tarefik debidamente configurado y corriendo

* Contar con un dominio (real o de pruebas), con el que se registrará el servicio en el proxy inverso y desde el que será accesible en la red de consulta

## Despliegue

*  Crear un directorio para el proyecto

  `mkdir portalIIS`

* Correr el script `deploy/deployInstructions.sh` en la raiz del directorio del proyecto

* Personalizar la configuración de todos los archivos creados de acuerdo con el ambiente disponible
  * `deploy/envServices/.env.portal.prod` que contiene datos de entorno propios del servicio del protal
  * `.env`que contiene datos de entorno de despliegue del contenedor

* Correr el servicio

  `docker compose up -d`
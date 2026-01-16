# Infraestructura de despliegue Omeka-S

## Descripción

El presente repositorio contiene los archivos necesarios para la configuración de infraestructura y el despliegue de un portal web. Este portal está diseñado para centralizar la consulta y explotación de contenidos digitales provenientes de Omeka S y Strapi. 

El desarrollo forma parte del sistema implementado para el Concurso de Oposición Abierto, destinado a cubrir una plaza de Técnico Académico Ordinario, Asociado "C", de Tiempo Completo, Interino, en el área de Programación del Departamento de Cómputo del Instituto de Investigaciones Sociales, con número de registro 02002-28.


Los otros componentes que forman parte del proyecto son:

Componente  | Enlace al repositorio
------------|--------------------------
Omeka S | https://github.com/michcatg/omekas-infrastructure/
CMS Headless (Strapi)   | https://github.com/michcatg/strapi-coa

El objetivo de este repositorio es permitir el despliegue del portal web  mediante
contenedores Docker, utilizando imágenes propias, conforme a las bases del concurso. Asímismo,el repositorio incluye Los archivos necesarios para la creación de la imagen.

## Imagen del despliegue
El despliegue del portal web se realiza construyendo un contenedor a partir de la siguiente imagen:
- **Servidor web (Nginx)**
  Imagen: https://hub.docker.com/r/mitchcatg/portal-coa-iis
  Archivo de construcción: [Containerfile](Containerfile)

## Requisitos
Para el despliegue del portal es necesario contar con:

- Docker
- Docker compose
- Servicio de Strapi del proyecto, en ejecución, accesible dentro de la misma red virtual y correctamente configurado.
- Servicio de Omeka S en ejecución, accesible dentro de la misma red virtual y correctamente configurado.
- Proxy inverso Traefik debidamente configurado y en funcionamiento.
- Dominio (real o de pruebas) para registrar el servicio en el proxy inverso y permitir el acceso desde la red de consulta.

## Instalación y despliegue

- Crear un directorio para el proyecto
  ```sh
  mkdir portalIIS
  ```

- Ejecutar el script `deploy/deployInstructions.sh` en la raiz del directorio del proyecto

- Personalizar la configuración de todos los archivos generados según el entorno disponible:
  - `deploy/envServices/.env.portal.prod`: contiene las variables de entorno específicas del servicio del portal.
  - `.env`: contiene las variables de entorno para el despliegue del contenedor.

- Iniciar el servicio
  ```sh
  docker compose -f compose.yml -f compose_prod.yml up -d`
  ```
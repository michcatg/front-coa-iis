#!/bin/sh
envsubst < /app/config.template.js > /app/config.js
exec nginx -g 'daemon off;'
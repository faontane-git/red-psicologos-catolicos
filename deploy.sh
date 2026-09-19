#!/bin/bash
set -e

echo "========================================================="
echo "   Despliegue de Red de Psicólogos Católicos (Latam)    "
echo "   Preparado por: Ing. Fabrizzio Ontaneda                "
echo "========================================================="

echo "1. Descargando últimos cambios desde Git..."
git pull origin main

echo "2. Construyendo e iniciando contenedores con Docker..."
docker compose up -d --build

echo "3. Verificando estado de los servicios..."
docker compose ps

echo ""
echo "¡Despliegue exitoso! La plataforma está activa en el puerto 80."
echo "Puedes acceder desde el navegador con la IP pública de tu VPS."

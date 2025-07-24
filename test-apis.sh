#!/bin/bash

# Script de testing para APIs de Presupuestos
# Uso: bash test-apis.sh

echo "🧪 Iniciando testing de APIs de Presupuestos..."
echo "================================================"

# Health Check
echo "1. Testing Health Check..."
response=$(curl -s http://localhost:3000/api/health)
echo "Respuesta: $response"
echo ""

# Configuración
echo "2. Testing Configuración..."
response=$(curl -s http://localhost:3000/api/config)
echo "Respuesta: $response"
echo ""

# Roles de Mano de Obra - Lista
echo "3. Testing Lista de Roles..."
response=$(curl -s http://localhost:3000/api/labor-roles)
echo "Respuesta: $response"
echo ""

# Crear Rol de Ejemplo
echo "4. Testing Crear Rol..."
response=$(curl -s -X POST http://localhost:3000/api/labor-roles \
  -H "Content-Type: application/json" \
  -d '{
    "roleName": "Maestro Eléctrico TEST",
    "baseSalary": 850000,
    "transportationBonus": 50000,
    "foodBonus": 30000,
    "toolsWearBonus": 25000,
    "socialSecurityTax": 28.5,
    "workdaysPerMonth": 20,
    "hoursPerDay": 9
  }')
echo "Respuesta: $response"
echo ""

echo "✅ Testing completado!"
echo "Para más pruebas detalladas, revisa docs/testing-api.md"

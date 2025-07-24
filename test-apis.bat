@echo off
echo.
echo 🧪 Test rápido de APIs de Presupuestos...
echo ================================================

echo.
echo 1. Testing Health Check...
curl -s http://localhost:3000/api/health
echo.

echo.
echo 2. Testing Config...
curl -s http://localhost:3000/api/config
echo.

echo.
echo 3. Testing Labor Roles (Lista)...
curl -s http://localhost:3000/api/labor-roles
echo.

echo.
echo ✅ Test completado!
echo Para crear roles, usa: docs/testing-api.md
pause

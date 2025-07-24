# Script de testing para APIs de Presupuestos (PowerShell)
# Uso: .\test-apis.ps1

Write-Host "🧪 Iniciando testing de APIs de Presupuestos..." -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow

# Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Configuración
Write-Host "2. Testing Configuración..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/config" -Method GET
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Roles de Mano de Obra - Lista
Write-Host "3. Testing Lista de Roles..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/labor-roles" -Method GET
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Crear Rol de Ejemplo
Write-Host "4. Testing Crear Rol..." -ForegroundColor Cyan
$body = @{
    roleName = "Maestro Eléctrico TEST"
    baseSalary = 850000
    transportationBonus = 50000
    foodBonus = 30000
    toolsWearBonus = 25000
    socialSecurityTax = 28.5
    workdaysPerMonth = 20
    hoursPerDay = 9
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/labor-roles" -Method POST -Body $body -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Respuesta: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ Testing completado!" -ForegroundColor Green
Write-Host "Para más pruebas detalladas, revisa docs/testing-api.md" -ForegroundColor Yellow

# Test simple con curl - Funciona mejor que Invoke-WebRequest
Write-Host "🧪 Test rápido de APIs..." -ForegroundColor Yellow

# Test Health Check (simple)
Write-Host "1. Health Check..." -ForegroundColor Cyan
curl -s http://localhost:3000/api/health
Write-Host ""

# Test Config (simple)
Write-Host "2. Config..." -ForegroundColor Cyan  
curl -s http://localhost:3000/api/config
Write-Host ""

Write-Host "✅ Test completado!" -ForegroundColor Green

# start_local.ps1
# Script para levantar el entorno de desarrollo local (MySQL en Docker + Apps Local)

Write-Host "--- 🐉 Iniciando Entorno Local Pitaya Pilot Kit ---" -ForegroundColor Cyan

# 1. Crear .env para la API localmente conectada a MySQL Docker
$apiEnv = "apps/api/.env"
$envContent = 'DATABASE_URL="mysql://root:root@localhost:3306/pitaya_db"'
Set-Content -Path $apiEnv -Value $envContent
Write-Host "[1] .env creado en apps/api/" -ForegroundColor Green

# 2. Levantar la base de datos en Docker (Solo MySQL)
Write-Host "[2] Iniciando MySQL en Docker..." -ForegroundColor White
docker-compose up -d mysql

Write-Host "Esperando 5 segundos a que MySQL esté disponible..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# 3. Lanzar Backend (API) en una nueva ventana
Write-Host "[3] Lanzando Backend API (Puerto 3010)..." -ForegroundColor White
Start-Process powershell -WindowStyle Normal -ArgumentList "-NoExit", "-Command", "cd apps/api; Write-Host 'Instalando dependencias...' -ForegroundColor Cyan; npm install; npx prisma generate; Write-Host 'Sincronizando base de datos...' -ForegroundColor Yellow; npx prisma db push; Write-Host 'Iniciando Backend...' -ForegroundColor Green; npm run start:dev"

# 4. Lanzar Frontend (Dashboard) en una nueva ventana
Write-Host "[4] Lanzando Frontend Dashboard (Puerto 3000)..." -ForegroundColor White
Start-Process powershell -WindowStyle Normal -ArgumentList "-NoExit", "-Command", "cd apps/dashboard; Write-Host 'Instalando dependencias...' -ForegroundColor Cyan; npm install; Write-Host 'Iniciando Frontend...' -ForegroundColor Green; npm run dev"

Write-Host "`n--- ✅ Ventanas desplegadas. Todo listo ---" -ForegroundColor Green
Write-Host "API: http://localhost:3010" -ForegroundColor Cyan
Write-Host "Dashboard: http://localhost:3000" -ForegroundColor Cyan
Write-Host "MySQL: localhost:3306 (user: root / pass: root)" -ForegroundColor Yellow

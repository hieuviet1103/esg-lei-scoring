# Test Proxy Configuration
# Kiểm tra xem proxy có hoạt động đúng không

Write-Host "🧪 Testing Proxy Configuration..." -ForegroundColor Cyan
Write-Host ""

# Read backend URL from .env if exists
$backendUrl = "http://localhost:3000"
$envFile = "frontend\.env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile -Raw
    if ($envContent -match 'VITE_API_URL\s*=\s*(.+)') {
        $backendUrl = $matches[1].Trim()
        Write-Host "📄 Found .env file, using: $backendUrl" -ForegroundColor Cyan
    }
} else {
    Write-Host "📄 No .env file, using default: $backendUrl" -ForegroundColor Gray
}
Write-Host ""

# Test 1: Backend Health Check
Write-Host "1️⃣ Testing Backend (Direct)..." -ForegroundColor Yellow
Write-Host "   URL: $backendUrl/api/health" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/api/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Backend is running on $backendUrl" -ForegroundColor Green
        Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Backend is NOT running on $backendUrl!" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
    Write-Host "   → Please start backend: cd backend && npm run dev" -ForegroundColor Yellow
    Write-Host "   → Or update VITE_API_URL in frontend\.env" -ForegroundColor Yellow
}

Write-Host ""

# Test 2: Frontend Proxy (if frontend is running)
Write-Host "2️⃣ Testing Frontend Proxy..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173/api/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Frontend proxy is working" -ForegroundColor Green
        Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ⚠️ Frontend is NOT running or proxy error" -ForegroundColor Yellow
    Write-Host "   Error: $_" -ForegroundColor Gray
    Write-Host "   → Please start frontend: cd frontend && npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Check Vite Config
Write-Host "3️⃣ Checking Vite Config..." -ForegroundColor Yellow
if (Test-Path "frontend/vite.config.ts") {
    $viteConfig = Get-Content "frontend/vite.config.ts" -Raw
    if ($viteConfig -match "proxy.*'/api'") {
        Write-Host "   ✅ Vite proxy config found" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Vite proxy config NOT found!" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ vite.config.ts NOT found!" -ForegroundColor Red
}

Write-Host ""

# Test 4: Check Nginx Config
Write-Host "4️⃣ Checking Nginx Config..." -ForegroundColor Yellow
if (Test-Path "frontend/nginx.conf") {
    $nginxConfig = Get-Content "frontend/nginx.conf" -Raw
    if ($nginxConfig -match "location /api") {
        Write-Host "   ✅ Nginx proxy config found" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Nginx proxy config NOT found!" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ nginx.conf NOT found!" -ForegroundColor Red
}

Write-Host ""

# Test 5: Check API Client Config
Write-Host "5️⃣ Checking API Client Config..." -ForegroundColor Yellow
if (Test-Path "frontend/src/lib/api.ts") {
    $apiConfig = Get-Content "frontend/src/lib/api.ts" -Raw
    if ($apiConfig -match "baseURL.*['\`"]/api['\`"]") {
        Write-Host "   ✅ API client uses '/api' baseURL" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ API client baseURL might be incorrect" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ api.ts NOT found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Development Mode:" -ForegroundColor Yellow
Write-Host "  Browser → http://localhost:5173/api/* " -ForegroundColor Gray
Write-Host "  Vite Proxy → http://localhost:3000/api/*" -ForegroundColor Gray
Write-Host ""
Write-Host "Production Mode:" -ForegroundColor Yellow
Write-Host "  Browser → http://yourdomain.com/api/*" -ForegroundColor Gray
Write-Host "  Nginx Proxy → http://backend:3000/api/*" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Client always calls: /api/*" -ForegroundColor Green
Write-Host "🔒 Backend URL is hidden from client" -ForegroundColor Green
Write-Host ""
Write-Host "📖 See PROXY_CONFIGURATION.md for details" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan


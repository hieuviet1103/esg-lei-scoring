# Seed Sample Products
# Seeds 2 products: 1 PASS, 1 FAIL for Leadership Dashboard testing

Write-Host "🌱 Seeding Sample Products..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  NOTE: This will clear existing data and reseed!" -ForegroundColor Yellow
Write-Host ""

# Check if backend directory exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: backend directory not found!" -ForegroundColor Red
    Write-Host "   Please run this script from project root." -ForegroundColor Yellow
    exit 1
}

# Navigate to backend
Push-Location backend

try {
    Write-Host "📦 Step 1: Generate Prisma Client..." -ForegroundColor Yellow
    npm run db:generate
    if ($LASTEXITCODE -ne 0) {
        throw "Prisma generate failed"
    }
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
    Write-Host ""

    Write-Host "🗄️  Step 2: Push Schema to Database..." -ForegroundColor Yellow
    npm run db:push
    if ($LASTEXITCODE -ne 0) {
        throw "Prisma push failed"
    }
    Write-Host "✅ Schema pushed to database" -ForegroundColor Green
    Write-Host ""

    Write-Host "🌱 Step 3: Running Seed Script..." -ForegroundColor Yellow
    npm run db:seed
    if ($LASTEXITCODE -ne 0) {
        throw "Seed failed"
    }
    Write-Host ""

    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ Seeding Completed Successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Created Products:" -ForegroundColor Cyan
    Write-Host "  1. ✅ Tour Nhật Bản (PASS)" -ForegroundColor Green
    Write-Host "     - LEI: 85/100" -ForegroundColor Gray
    Write-Host "     - ESG: 78/100" -ForegroundColor Gray
    Write-Host "     - KPI: 90/100" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. ❌ Tour Đà Lạt (FAIL)" -ForegroundColor Red
    Write-Host "     - LEI: 45/100" -ForegroundColor Gray
    Write-Host "     - ESG: 60/100" -ForegroundColor Gray
    Write-Host "     - KPI: 40/100" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Start backend:  cd backend && npm run dev" -ForegroundColor Yellow
    Write-Host "  2. Start frontend: cd frontend && npm run dev" -ForegroundColor Yellow
    Write-Host "  3. Visit: http://localhost:5173/leadership" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📖 Documentation: docs\SEED_PRODUCTS.md" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check PostgreSQL is running" -ForegroundColor Gray
    Write-Host "  2. Check DATABASE_URL in backend/.env" -ForegroundColor Gray
    Write-Host "  3. Try: npm install (in backend folder)" -ForegroundColor Gray
    Write-Host "  4. See docs\SEED_PRODUCTS.md for details" -ForegroundColor Gray
    exit 1
} finally {
    Pop-Location
}


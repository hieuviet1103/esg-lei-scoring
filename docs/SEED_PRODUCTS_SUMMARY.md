# 🌱 Seed Sample Products - Quick Summary

## 🎯 What's New

Updated `backend/src/seed.ts` to include **2 sample products** for testing Leadership Dashboard.

## 📊 Products Created

### ✅ Product 1: PASS (High Quality)
```
Name:     Tour Nhật Bản Mùa Hoa Anh Đào Premium
Code:     VTR-TOUR-2026-001
BU:       VieTravel Hà Nội
PO:       Nguyễn Văn A

Scores:
  LEI: 85/100 ✅ (Threshold: ≥80)
  ESG: 78/100 ✅ (Threshold: ≥75)
  KPI: 90/100 ✅ (Threshold: ≥80)

Status: PASS ✅ (All frameworks passed)
```

### ❌ Product 2: FAIL (Low Quality)
```
Name:     Tour Đà Lạt 3 Ngày 2 Đêm Budget
Code:     VTR-TOUR-2026-002
BU:       VieTravel HCM
PO:       Trần Thị B

Scores:
  LEI: 45/100 ❌ (Threshold: ≥80)
  ESG: 60/100 ⚠️  (Threshold: ≥75)
  KPI: 40/100 ⚠️  (Threshold: ≥80)

Status: FAIL ❌ (LEI failed, others warning)
```

## 🚀 Quick Run

### ⚠️ Important
**Seed script tự động xóa tất cả data cũ** trước khi tạo data mới!

### Option 1: Use Script (Recommended)
```powershell
.\seed-sample-products.ps1
```

### Option 2: Manual
```bash
cd backend
npm run db:generate
npm run db:push
npm run db:seed  # Auto clears & reseeds
```

## ✅ After Seeding

You will have:
- ✅ 2 products in database
- ✅ 6 scores (3 per product: LEI, ESG, KPI)
- ✅ 14 score details (breakdown per criteria)
- ✅ Complete form schema
- ✅ 3 scoring frameworks
- ✅ 1 workflow definition

## 🧪 Test Leadership Dashboard

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Visit: `http://localhost:5173/leadership`

**You will see**:
- Total Products: **2**
- Passed: **1** (50%)
- Failed: **1** (50%)
- Pending: **0**

## 📖 Full Documentation

See **SEED_PRODUCTS.md** for:
- Complete product details
- Data structure breakdown
- Troubleshooting guide
- Customization instructions

---

**Status**: ✅ Ready to seed!

**Command**: `.\seed-sample-products.ps1`


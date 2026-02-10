# 🌱 Seed Sample Products

## Tổng Quan

File `backend/src/seed.ts` đã được cập nhật với 2 sản phẩm mẫu để test Leadership Dashboard.

## 📊 Sản Phẩm Mẫu

### 1. ✅ Sản Phẩm ĐẠT CHUẨN (PASS)

**Product Code**: `VTR-TOUR-2026-001`  
**Tên**: Tour Nhật Bản Mùa Hoa Anh Đào Premium  
**BU**: VieTravel Hà Nội  
**PO**: Nguyễn Văn A  

**Điểm Số**:
- 💚 **LEI**: 85/100 (PASS - Threshold ≥80)
  - LEI1: 18/20
  - LEI2: 17/20
  - LEI3: 18/20
  - LEI4: 16/20
  - LEI5: 16/20

- 💚 **ESG**: 78/100 (PASS - Threshold ≥75)
  - E (Environment): 25/30
  - S (Social): 32/40
  - G (Governance): 21/30

- 💚 **KPI**: 90/100 (PASS - Threshold ≥80)
  - Pass Rate: 90/100

**Overall Status**: ✅ **PASS** (All frameworks passed)

---

### 2. ❌ Sản Phẩm KHÔNG ĐẠT (FAIL)

**Product Code**: `VTR-TOUR-2026-002`  
**Tên**: Tour Đà Lạt 3 Ngày 2 Đêm Budget  
**BU**: VieTravel HCM  
**PO**: Trần Thị B  

**Điểm Số**:
- ❤️ **LEI**: 45/100 (FAIL - Threshold ≥80)
  - LEI1: 8/20
  - LEI2: 9/20
  - LEI3: 10/20
  - LEI4: 9/20
  - LEI5: 9/20

- 💛 **ESG**: 60/100 (WARN - Threshold ≥75)
  - E (Environment): 18/30
  - S (Social): 24/40
  - G (Governance): 18/30

- 💛 **KPI**: 40/100 (WARN - Threshold ≥80)
  - Pass Rate: 40/100

**Overall Status**: ❌ **FAIL** (LEI failed, others warning)

---

## 🚀 Cách Chạy Seed

### Option 1: Full Reset & Seed

```bash
# 1. Reset database (xóa tất cả data)
cd backend
npm run db:push -- --force-reset

# 2. Run seed
npm run db:seed

# Output sẽ hiển thị:
# ✅ Form created: PRODUCT_EVAL
# ✅ LEI Framework created
# ✅ ESG Framework created
# ✅ KPI Framework created
# ✅ Workflow created
# ✅ Product 1 created (PASS): Tour Nhật Bản...
# ✅ Product 2 created (FAIL): Tour Đà Lạt...
# 📊 Summary:
#   - Product 1 (PASS): LEI=85, ESG=78, KPI=90
#   - Product 2 (FAIL): LEI=45, ESG=60, KPI=40
# 🎉 Seeding completed successfully!
```

### Option 2: Keep Existing Data

```bash
# Chỉ chạy seed (nếu DB đã có schema)
cd backend
npm run db:seed
```

### Option 3: From Project Root

```bash
# Full stack setup
npm run db:generate
npm run db:push
npm run db:seed
```

---

## 🧪 Test Leadership Dashboard

Sau khi seed, bạn có thể test Leadership Dashboard:

### 1. Start Backend & Frontend

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 2. Truy Cập Leadership Dashboard

```
http://localhost:5173/leadership
```

**Bạn sẽ thấy**:
- 📊 Statistics Cards:
  - Tổng Sản Phẩm: **2**
  - Đạt Chuẩn: **1** (50%)
  - Không Đạt: **1** (50%)
  - Chờ Đánh Giá: **0**

- 📋 Products Table:
  - Row 1: Nhật Bản | LEI=85 ↗️ | ESG=78 ↗️ | ✅ Đạt
  - Row 2: Đà Lạt | LEI=45 ↘️ | ESG=60 ↘️ | ❌ Không đạt

### 3. Test Review Flow

**Product 1 (PASS)**:
```
1. Click "Xem chi tiết" on Nhật Bản
2. See green status card "ĐẠT CHUẨN"
3. See high scores (85, 78, 90)
4. Click "Phê Duyệt"
5. Confirm → Success!
```

**Product 2 (FAIL)**:
```
1. Click "Xem chi tiết" on Đà Lạt
2. See red status card "KHÔNG ĐẠT"
3. See low scores (45, 60, 40)
4. Click "Thêm Nhận Xét"
5. Enter: "LEI score quá thấp, cần cải thiện trải nghiệm"
6. Click "Từ Chối"
7. Confirm → Recorded!
```

### 4. Test Filters

**Filter by Status**:
```
- Select "Đạt chuẩn" → Shows only Nhật Bản
- Select "Không đạt" → Shows only Đà Lạt
- Select "Tất cả" → Shows both
```

**Filter by Framework**:
```
- Select "LEI" → Shows both with LEI scores
- Select "ESG" → Shows both with ESG scores
- Select "KPI" → Shows both with KPI scores
```

---

## 📊 Data Structure

### Database Tables Populated

```
✅ Form & FormVersion
   - PRODUCT_EVAL form with full schema

✅ FormFields (5+ fields)
   - product_code, product_name, line, owner_bu, po
   - lei_1, lei_2, lei_3, lei_4, lei_5

✅ ScoreFrameworks (3)
   - LEI (Living Experience Index)
   - ESG (Environment, Social, Governance)
   - KPI (Key Performance Indicators)

✅ ScoreModels & ScoreCriteria
   - LEI Model with 5 criteria
   - ESG Model with 3 criteria (E/S/G)
   - KPI Model with 1 criteria

✅ WorkflowDefinition
   - PRODUCT_EVAL_APPROVAL workflow

✅ Products (2)
   - VTR-TOUR-2026-001 (PASS)
   - VTR-TOUR-2026-002 (FAIL)

✅ ProductVersions (2)
   - Version 1 for each product

✅ ProductFieldValues (10 per product)
   - Identity fields + LEI scores

✅ ProductScores (6 total)
   - 3 scores per product (LEI, ESG, KPI)

✅ ProductScoreDetails (14 total)
   - Breakdown per criteria
```

---

## 🔧 Troubleshooting

### Error: "Unique constraint failed"

**Cause**: Data đã tồn tại

**Solution**: Reset database
```bash
cd backend
npm run db:push -- --force-reset
npm run db:seed
```

### Error: "Foreign key constraint failed"

**Cause**: Schema không match

**Solution**: Regenerate Prisma client
```bash
cd backend
npm run db:generate
npm run db:push
npm run db:seed
```

### Error: "Cannot find module"

**Cause**: Dependencies chưa install

**Solution**: Install packages
```bash
cd backend
npm install
```

---

## 📝 Customize Seeds

### Thêm Products Khác

Edit `backend/src/seed.ts` và thêm sau Product 2:

```typescript
const product3 = await prisma.product.create({
  data: {
    code: 'YOUR_CODE',
    name: 'Your Product Name',
    formCode: 'PRODUCT_EVAL',
    status: 'ACTIVE',
    versions: {
      create: {
        versionNo: 1,
        isActive: true,
        configSnapshot: PRODUCT_EVAL_SCHEMA,
        fieldValues: {
          create: [
            // Your field values...
          ],
        },
        scores: {
          create: [
            // Your scores...
          ],
        },
      },
    },
  },
});
```

### Thay Đổi Scores

Modify scores trong seed file:

```typescript
// Change LEI score
totalScore: 85,  // → Change to your value (0-100)

// Change criteria scores
{ criteriaCode: 'LEI1', score: 18, maxScore: 20, status: 'PASS' },
// → Adjust score and status
```

---

## ✅ Verification Checklist

After seeding, verify:

- [ ] Backend running: `http://localhost:3000/api/health`
- [ ] Database has 2 products: `SELECT * FROM products;`
- [ ] Frontend shows 2 products: `/leadership`
- [ ] Product 1 shows PASS status
- [ ] Product 2 shows FAIL status
- [ ] Filters work correctly
- [ ] Review page opens for both products
- [ ] Approve/Reject buttons work

---

## 🎉 Done!

Giờ bạn có:
- ✅ 2 sản phẩm mẫu trong database
- ✅ 1 product đạt chuẩn (PASS)
- ✅ 1 product không đạt (FAIL)
- ✅ Leadership Dashboard ready to test!

**Happy Testing! 🚀**


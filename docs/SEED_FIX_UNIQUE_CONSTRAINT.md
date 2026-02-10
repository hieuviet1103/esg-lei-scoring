# 🔧 Fix: Unique Constraint Error When Seeding

## ❌ The Error

```
Error seeding database: PrismaClientKnownRequestError: 
Unique constraint failed on the fields: (`code`)
```

## 🎯 Root Cause

Form với code `PRODUCT_EVAL` đã tồn tại trong database. Seed script cố tạo form mới với cùng code → Conflict!

## ✅ Solution Applied

### Updated Seed Script

File `backend/src/seed.ts` đã được update để **tự động xóa data cũ** trước khi seed:

```typescript
async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (NEW!)
  console.log('Clearing existing data...');
  await prisma.productScoreDetail.deleteMany({});
  await prisma.productScore.deleteMany({});
  // ... clear all tables in correct order
  await prisma.form.deleteMany({});
  console.log('✅ Existing data cleared');

  // Then create new data...
}
```

### Benefits

✅ **No more unique constraint errors**  
✅ **Clean state every time**  
✅ **Consistent test data**  
✅ **Idempotent seeding** (can run multiple times)

## 🚀 How to Run Now

### Just Run Seed

```bash
cd backend
npm run db:seed
```

**That's it!** Seed script handles everything:
1. Clears existing data
2. Creates fresh form
3. Creates frameworks
4. Creates 2 sample products

### Or Use Script

```powershell
.\seed-sample-products.ps1
```

## 📊 What Gets Cleared

The seed script clears tables in this order (to respect foreign keys):

```
1. productScoreDetail
2. productScore
3. productFieldValue
4. productVersion
5. product
6. workflowAction
7. workflowInstance
8. workflowDefinition
9. scoreCriteria
10. scoreModel
11. scoreFramework
12. formField
13. formVersion
14. form
```

## 🎯 No More Errors!

**Before**:
```
❌ Unique constraint failed on the fields: (`code`)
```

**After**:
```
✅ Existing data cleared
✅ Form created: PRODUCT_EVAL
✅ Product 1 created (PASS)
✅ Product 2 created (FAIL)
🎉 Seeding completed successfully!
```

## 🔄 Alternative: Manual Clear

If you prefer to clear manually:

```bash
# Option 1: Reset entire database
cd backend
npm run db:push -- --force-reset
npm run db:seed

# Option 2: Use Prisma Studio to delete data
npx prisma studio
# → Manually delete records
```

## ⚠️ Important Notes

### Data Loss Warning

Running seed will **DELETE ALL** existing data:
- All products
- All scores
- All forms
- All workflows

**Use with caution in production!**

### Development Only

This auto-clear behavior is for **development/testing only**.

For production, you should:
- Use migrations
- Seed only initial config data
- Never delete existing data

## ✅ Verification

After seeding, verify:

```bash
# Check products count
cd backend
npx prisma studio
# → Navigate to Product table
# → Should see 2 products
```

Or use API:

```bash
curl http://localhost:3000/api/products
# Should return 2 products
```

## 📖 Updated Documentation

See:
- `docs/SEED_PRODUCTS.md` - Complete guide (updated)
- `docs/SEED_PRODUCTS_SUMMARY.md` - Quick summary

---

**Status**: ✅ Fixed!

**Action**: Just run `npm run db:seed` or `.\seed-sample-products.ps1`

**Result**: Clean seed every time, no errors!


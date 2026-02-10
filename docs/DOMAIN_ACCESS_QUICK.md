# 🌐 Domain Access - Quick Fix

## ❌ Lỗi Bạn Gặp

```
Blocked request. This host ("test-3.hivietravel.vn") is not allowed.
```

## ✅ Đã Fix! (1 Phút)

### Bước 1: Restart Dev Server ⚡

```powershell
# Trong terminal frontend, dừng server (Ctrl+C)
# Sau đó chạy lại:
cd frontend
npm run dev
```

**Đó là tất cả!** File `vite.config.ts` đã được update.

### Bước 2: Test 🧪

```
http://test-3.hivietravel.vn:5173
```

## 🔧 Đã Thay Đổi Gì?

File `frontend/vite.config.ts` đã thêm:

```typescript
server: {
  allowedHosts: [
    'test-3.hivietravel.vn',     // ✅ Your domain
    '.hivietravel.vn',           // ✅ All subdomains
    'localhost',
    '127.0.0.1',
  ],
}
```

## 🎯 Kết Quả

Giờ bạn có thể truy cập qua:
- ✅ `http://localhost:5173`
- ✅ `http://127.0.0.1:5173`
- ✅ `http://test-3.hivietravel.vn:5173`
- ✅ `http://*.hivietravel.vn:5173` (bất kỳ subdomain nào)

## 🐛 Vẫn Lỗi?

### Check 1: Đã Restart?
```powershell
# Phải restart dev server!
cd frontend
npm run dev
```

### Check 2: Domain Resolve?
```powershell
ping test-3.hivietravel.vn
# Should return IP address
```

### Check 3: Port Accessible?
```powershell
netstat -ano | findstr :5173
# Should show process listening
```

## 📖 Chi Tiết

Xem **VITE_DOMAIN_ACCESS.md** để biết thêm về:
- Security considerations
- DNS setup
- Multiple domains
- Production deployment

---

**That's it! 🎉**

Just **restart dev server** and access via domain!


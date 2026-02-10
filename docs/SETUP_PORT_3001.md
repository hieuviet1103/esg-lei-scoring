# 🚀 Setup Backend Port 3001 - Quick Guide

## Your Situation

Backend chạy trên **port 3001** thay vì 3000.

## ✅ Giải Pháp (2 Phút)

### Option 1: Dùng Script (Khuyên Dùng) ⚡

```powershell
# Chạy script này
.\setup-env.ps1 -BackendPort 3001
```

Script sẽ tự động:
- ✅ Tạo file `frontend/.env`
- ✅ Set `VITE_API_URL=http://localhost:3001`
- ✅ Hướng dẫn bước tiếp theo

### Option 2: Thủ Công 📝

**Bước 1**: Tạo file `frontend/.env`

```powershell
cd frontend
New-Item -Path ".env" -ItemType File -Force
```

**Bước 2**: Mở `frontend/.env` và thêm:

```env
VITE_API_URL=http://localhost:3001
```

**Bước 3**: Lưu file

## 🔄 Restart Frontend

```powershell
# Nếu frontend đang chạy:
# 1. Dừng lại (Ctrl+C trong terminal)
# 2. Start lại:
cd frontend
npm run dev
```

**Quan trọng**: Vite chỉ đọc `.env` khi start!

## ✅ Kiểm Tra

```powershell
# Test proxy
.\test-proxy.ps1
```

Bạn sẽ thấy:
```
📄 Found .env file, using: http://localhost:3001
1️⃣ Testing Backend (Direct)...
   URL: http://localhost:3001/api/health
   ✅ Backend is running on http://localhost:3001
```

## 🎯 Kết Quả

```
Browser Request:  http://localhost:5173/api/products
                           ↓
Vite Proxy:       http://localhost:3001/api/products  ← Port 3001!
                           ↓
Backend:          Handle /api/products
```

## 🐛 Nếu Không Hoạt Động

### Check 1: File .env Tồn Tại?
```powershell
Test-Path frontend\.env
# Should return: True
```

### Check 2: Nội Dung Đúng?
```powershell
Get-Content frontend\.env
# Should show: VITE_API_URL=http://localhost:3001
```

### Check 3: Đã Restart?
```powershell
# Dừng frontend (Ctrl+C)
# Start lại
cd frontend
npm run dev
```

### Check 4: Backend Chạy Đúng Port?
```powershell
curl http://localhost:3001/api/health
# Should return: {"status":"ok",...}
```

## 📖 Chi Tiết

Xem **CHANGE_BACKEND_PORT.md** để biết thêm:
- Multiple environments
- Troubleshooting chi tiết
- Advanced configuration

## ✅ Checklist

- [ ] Tạo `frontend/.env` với `VITE_API_URL=http://localhost:3001`
- [ ] Restart frontend dev server
- [ ] Test: `.\test-proxy.ps1`
- [ ] Check console log khi frontend start
- [ ] Test trong browser: `http://localhost:5173/api/health`

## 🎉 Done!

Frontend giờ sẽ proxy tất cả requests `/api/*` đến **localhost:3001** thay vì 3000!

---

**Quick Commands**:
```powershell
# Setup
.\setup-env.ps1 -BackendPort 3001

# Restart
cd frontend
npm run dev

# Test
.\test-proxy.ps1
```

**All done! 🚀**


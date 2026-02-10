# 🔧 Thay Đổi Backend Port

## Tình Huống

Backend của bạn **không chạy trên port 3000** mà chạy trên port khác (ví dụ: **3001**, 4000, 8080...).

## ✅ Giải Pháp Nhanh (3 Bước)

### Bước 1: Tạo File `.env`

**Option A: Dùng Script (Khuyên dùng)**
```powershell
# Tạo .env với port 3001
.\setup-env.ps1 -BackendPort 3001

# Hoặc port khác
.\setup-env.ps1 -BackendPort 4000
```

**Option B: Tạo Thủ Công**
```powershell
# Tạo file frontend/.env
cd frontend
New-Item -Path ".env" -ItemType File -Force
```

Sau đó mở `frontend/.env` và thêm:
```env
# Backend API URL
VITE_API_URL=http://localhost:3001
```

### Bước 2: Restart Frontend Dev Server

```powershell
# Nếu frontend đang chạy, dừng lại (Ctrl+C)
# Sau đó start lại:
cd frontend
npm run dev
```

**Lưu ý**: Vite sẽ tự động đọc file `.env` khi start.

### Bước 3: Test

```powershell
# Test proxy hoạt động
.\test-proxy.ps1

# Hoặc manual test
curl http://localhost:5173/api/health
```

## 🔍 Cách Hoạt Động

### Trước (Default)
```
Browser → localhost:5173/api/*
         → Vite proxy
         → localhost:3000/api/*  ← Default
```

### Sau (Custom Port)
```
Browser → localhost:5173/api/*
         → Vite proxy
         → localhost:3001/api/*  ← Từ VITE_API_URL
```

## ⚙️ Chi Tiết Kỹ Thuật

### 1. Vite Config (`frontend/vite.config.ts`)

```typescript
proxy: {
  '/api': {
    // Đọc từ env var, fallback về 3000
    target: process.env.VITE_API_URL || 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

### 2. Environment Variable

Vite đọc env vars với prefix `VITE_`:
- ✅ `VITE_API_URL` → Được expose cho config
- ❌ `API_URL` → Không được expose

### 3. File `.env` Priority

Vite đọc theo thứ tự:
1. `.env.local` (highest priority, gitignored)
2. `.env.development` / `.env.production`
3. `.env` (lowest priority)

**Khuyên dùng**: `.env.local` cho local development

## 🎯 Use Cases

### Backend Port Khác

```env
# frontend/.env
VITE_API_URL=http://localhost:3001
```

### Backend Trên Remote Server

```env
# frontend/.env
VITE_API_URL=http://192.168.1.100:3000
```

### Backend Với Domain

```env
# frontend/.env
VITE_API_URL=http://api.local.dev
```

### HTTPS Backend

```env
# frontend/.env
VITE_API_URL=https://localhost:3443
```

## 🐛 Troubleshooting

### Problem 1: Env Var Không Được Đọc

**Symptoms**: Proxy vẫn gọi đến localhost:3000

**Solutions**:
```powershell
# 1. Check file .env tồn tại
Test-Path frontend\.env

# 2. Check nội dung file
Get-Content frontend\.env

# 3. Restart dev server (QUAN TRỌNG!)
# Vite chỉ đọc .env khi start
cd frontend
npm run dev
```

### Problem 2: Proxy Error

**Symptoms**: `ECONNREFUSED` hoặc `ECONNRESET`

**Solutions**:
```powershell
# 1. Check backend đang chạy đúng port
curl http://localhost:3001/api/health

# 2. Check VITE_API_URL đúng port
Get-Content frontend\.env

# 3. Check firewall không block
```

### Problem 3: CORS Error

**Symptoms**: CORS policy blocked

**Solutions**:
```typescript
// Đảm bảo dùng relative path trong api.ts
// ✅ Correct
baseURL: '/api'

// ❌ Wrong (bypass proxy)
baseURL: 'http://localhost:3001/api'
```

## 📋 Checklist

Khi thay đổi backend port:

- [ ] Tạo file `frontend/.env` với `VITE_API_URL`
- [ ] Restart frontend dev server
- [ ] Test: `curl http://localhost:5173/api/health`
- [ ] Check console log: "Proxying: GET /api/health -> ..."
- [ ] Backend running on correct port
- [ ] No CORS errors in browser

## 🔄 Multiple Environments

### Development (Port 3001)
```env
# frontend/.env.development
VITE_API_URL=http://localhost:3001
```

### Staging (Remote)
```env
# frontend/.env.staging
VITE_API_URL=https://api.staging.yourdomain.com
```

### Production
Production dùng Nginx proxy, không cần env var.

## 💡 Tips

### Tip 1: Gitignore
```gitignore
# .gitignore
frontend/.env.local
frontend/.env*.local
```

→ `.env.local` không bị commit, an toàn cho local config

### Tip 2: Template File
```env
# frontend/.env.example (commit this)
VITE_API_URL=http://localhost:3000

# Team members copy to .env.local
cp frontend/.env.example frontend/.env.local
```

### Tip 3: Console Log
```typescript
// vite.config.ts
console.log('Backend URL:', process.env.VITE_API_URL);
```

→ Xem backend URL khi start

### Tip 4: Dynamic Port
```typescript
// vite.config.ts
const backendPort = process.env.BACKEND_PORT || '3000';
target: `http://localhost:${backendPort}`
```

```env
# frontend/.env
BACKEND_PORT=3001
VITE_API_URL=http://localhost:${BACKEND_PORT}  # ❌ Không work
```

→ Env var không support interpolation, phải dùng full URL

## 📝 Summary

| Scenario | Solution |
|----------|----------|
| Backend port 3001 | `VITE_API_URL=http://localhost:3001` |
| Backend port 4000 | `VITE_API_URL=http://localhost:4000` |
| Remote backend | `VITE_API_URL=http://192.168.1.100:3000` |
| HTTPS backend | `VITE_API_URL=https://localhost:3443` |

**Key Points:**
- ✅ Tạo `frontend/.env` với `VITE_API_URL`
- ✅ Restart dev server sau khi đổi `.env`
- ✅ Test với `.\test-proxy.ps1`
- ✅ Check console log có "Proxying:" message

---

## 🚀 Quick Commands

```powershell
# Setup cho port 3001
.\setup-env.ps1 -BackendPort 3001

# Restart frontend
cd frontend
npm run dev

# Test
.\test-proxy.ps1
```

**Done! 🎉**

---

*Last updated: 2026-02-10*


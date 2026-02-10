# 🌐 Vite Dev Server - Domain Access Configuration

## ❌ Vấn Đề

Khi truy cập Vite dev server qua **domain** (thay vì localhost), bạn gặp lỗi:

```
Blocked request. This host ("test-3.hivietravel.vn") is not allowed.
To allow this host, add "test-3.hivietravel.vn" to `server.allowedHosts` in vite.config.js.
```

## 🔒 Tại Sao Vite Block?

Vite dev server có **security feature** để ngăn chặn DNS rebinding attacks:
- Mặc định chỉ allow: `localhost`, `127.0.0.1`
- Block tất cả domains khác
- Đây là best practice cho development server

## ✅ Giải Pháp

### Đã Fix! (Bạn Không Cần Làm Gì)

File `frontend/vite.config.ts` đã được cập nhật:

```typescript
server: {
  host: true,
  port: 5173,
  allowedHosts: [
    'test-3.hivietravel.vn',      // Your specific domain
    '.hivietravel.vn',            // All *.hivietravel.vn subdomains
    'localhost',                   // Default
    '127.0.0.1',                   // Default
  ],
  // ... proxy config
}
```

## 🔄 Restart Dev Server

**Quan trọng**: Sau khi thay đổi vite.config.ts, bạn cần restart:

```powershell
# Dừng dev server (Ctrl+C)
# Start lại
cd frontend
npm run dev
```

## ✅ Test

### Option 1: Browser
```
http://test-3.hivietravel.vn:5173
```

### Option 2: cURL
```powershell
curl http://test-3.hivietravel.vn:5173/api/health
```

## 🎯 Cách Hoạt Động

### Trước (Blocked)
```
Browser → http://test-3.hivietravel.vn:5173
         ↓
Vite    → ❌ Host not in allowedHosts → 403 Forbidden
```

### Sau (Allowed)
```
Browser → http://test-3.hivietravel.vn:5173
         ↓
Vite    → ✅ Host in allowedHosts → Allow
         ↓
React App
```

## 🔧 Thêm Domain Khác

Nếu bạn cần thêm domain khác:

```typescript
allowedHosts: [
  'test-3.hivietravel.vn',
  '.hivietravel.vn',           // Wildcard: *.hivietravel.vn
  'another-domain.com',        // Specific domain
  '.another-domain.com',       // Wildcard: *.another-domain.com
  'localhost',
  '127.0.0.1',
],
```

### Wildcard Pattern

- `'.hivietravel.vn'` → Matches:
  - ✅ `test-3.hivietravel.vn`
  - ✅ `dev.hivietravel.vn`
  - ✅ `staging.hivietravel.vn`
  - ✅ `any-subdomain.hivietravel.vn`
  - ❌ `hivietravel.vn` (không có subdomain)

- `'hivietravel.vn'` → Matches:
  - ✅ `hivietravel.vn` (exact match only)

## 🌐 Common Use Cases

### Use Case 1: Development Domain
```typescript
allowedHosts: [
  'dev.yourapp.com',
  'localhost',
]
```

### Use Case 2: Multiple Subdomains
```typescript
allowedHosts: [
  '.yourapp.com',  // *.yourapp.com
  'localhost',
]
```

### Use Case 3: Local Network Access
```typescript
allowedHosts: [
  '192.168.1.100',  // Your local IP
  'localhost',
]
```

### Use Case 4: Allow All (NOT RECOMMENDED)
```typescript
allowedHosts: 'all'  // ⚠️ Security risk!
```

## 🔐 Security Considerations

### ✅ Good Practice
```typescript
// Specific domains only
allowedHosts: [
  'test-3.hivietravel.vn',
  '.hivietravel.vn',
  'localhost',
]
```

### ⚠️ Be Careful
```typescript
// Too permissive
allowedHosts: 'all'
```

**Why?** Allowing all hosts opens you to DNS rebinding attacks.

### 🛡️ Best Practices

1. **Development**: List specific domains
2. **Production**: Use Nginx/Apache, not Vite dev server
3. **Team**: Use `.env` for custom domains
4. **Security**: Never use `allowedHosts: 'all'` unless necessary

## 🌐 DNS Setup

Để domain hoạt động, bạn cần:

### Option 1: Hosts File (Local)
```
# Windows: C:\Windows\System32\drivers\etc\hosts
# Linux/Mac: /etc/hosts

127.0.0.1 test-3.hivietravel.vn
```

### Option 2: Real DNS (Production-like)
- Add A record: `test-3.hivietravel.vn` → Your server IP
- Wait for DNS propagation

### Option 3: Local DNS Server
- Use dnsmasq
- Configure wildcard: `*.hivietravel.vn` → 127.0.0.1

## 🔄 Full Workflow

### 1. DNS Setup
```
# Add to hosts file
127.0.0.1 test-3.hivietravel.vn
```

### 2. Vite Config (✅ Already Done)
```typescript
allowedHosts: ['test-3.hivietravel.vn', ...]
```

### 3. Start Dev Server
```powershell
cd frontend
npm run dev
```

### 4. Access via Domain
```
http://test-3.hivietravel.vn:5173
```

## 🐛 Troubleshooting

### Problem 1: Still Getting "Blocked request"

**Solution**:
```powershell
# 1. Check vite.config.ts saved
Get-Content frontend\vite.config.ts | Select-String "allowedHosts"

# 2. Restart dev server (MUST DO!)
cd frontend
npm run dev

# 3. Clear browser cache
Ctrl+Shift+Delete → Clear cache
```

### Problem 2: Domain Not Resolving

**Solution**:
```powershell
# Check DNS
ping test-3.hivietravel.vn

# Should return: 127.0.0.1 or your server IP
```

### Problem 3: Port Not Accessible

**Solution**:
```powershell
# Check Vite running
netstat -ano | findstr :5173

# Check firewall
# Add rule to allow port 5173
```

### Problem 4: API Proxy Not Working

**Solution**:
```typescript
// In vite.config.ts, ensure:
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,  // ← Important for domain access
  }
}
```

## 📊 Configuration Summary

| Setting | Development | Production |
|---------|-------------|------------|
| Server | Vite dev server | Nginx/Apache |
| allowedHosts | Specific domains | N/A (Nginx handles) |
| SSL | Not needed | Required |
| Port | 5173 | 80/443 |

## 🚀 Production Note

**Important**: Vite dev server is for **development only**!

For production:
- ✅ Use `npm run build`
- ✅ Deploy to Nginx/Apache
- ✅ Configure proper domain in Nginx
- ❌ Don't use Vite dev server in production

Production với Nginx (đã có config sẵn trong `frontend/nginx.conf`):
```nginx
server {
    listen 80;
    server_name test-3.hivietravel.vn;
    # ... nginx config
}
```

## ✅ Current Configuration

Your current setup:
- ✅ Domain: `test-3.hivietravel.vn`
- ✅ Wildcard: `*.hivietravel.vn`
- ✅ Backend: `localhost:3001`
- ✅ Frontend: `port 5173`

## 🎉 Summary

**What Changed**:
```typescript
// Added to vite.config.ts
allowedHosts: [
  'test-3.hivietravel.vn',
  '.hivietravel.vn',
  'localhost',
  '127.0.0.1',
]
```

**What To Do**:
1. ✅ Config updated (done!)
2. 🔄 Restart dev server
3. 🌐 Access via domain
4. ✅ Enjoy!

---

**Access URLs**:
- Via localhost: `http://localhost:5173`
- Via domain: `http://test-3.hivietravel.vn:5173`
- API health: `http://test-3.hivietravel.vn:5173/api/health`

**All ready! 🎉**

---

*Last updated: 2026-02-10*


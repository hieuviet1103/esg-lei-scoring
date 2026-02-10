# 🔒 Proxy Configuration - Giấu Backend URL

## Tổng Quan

Project này sử dụng **proxy pattern** để giấu backend URL khỏi client, tránh CORS issues, và bảo mật hơn.

## 🎯 Lợi Ích

1. **Bảo mật**: Client không biết backend URL thật
2. **Tránh CORS**: Same-origin requests
3. **Linh hoạt**: Đổi backend URL không cần rebuild frontend
4. **Đơn giản**: Client chỉ cần gọi `/api/*`

## 🏗️ Kiến Trúc

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │ GET /api/products
       ↓
┌─────────────────────┐
│   Frontend Server   │
│  Vite/Nginx Proxy   │
└──────┬──────────────┘
       │ Forward to Backend
       │ GET http://backend:3000/api/products
       ↓
┌─────────────────┐
│    Backend      │
│  Express API    │
│  Port 3000      │
└─────────────────┘
```

## ⚙️ Cấu Hình Chi Tiết

### 1. Frontend API Client (`frontend/src/lib/api.ts`)

```typescript
const api = axios.create({
  baseURL: '/api',  // ← Chỉ dùng relative path
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});
```

**Giải thích**:
- `baseURL: '/api'` → Tất cả requests sẽ đi qua `/api/*`
- Client không biết backend URL thật
- Requests: `/api/products`, `/api/forms`, etc.

### 2. Development Mode (`frontend/vite.config.ts`)

```typescript
server: {
  host: true,
  port: 5173,
  proxy: {
    '/api': {
      target: process.env.VITE_API_URL || 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**Cách hoạt động**:
```
Browser request:  http://localhost:5173/api/products
                           ↓
Vite proxy:       http://localhost:3000/api/products
                           ↓
Backend handles:  /api/products
```

**Environment Variables** (Optional):
```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
```

### 3. Production Mode (`frontend/nginx.conf`)

```nginx
location /api {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

**Cách hoạt động**:
```
Browser request:  http://yourdomain.com/api/products
                           ↓
Nginx proxy:      http://backend:3000/api/products
                           ↓
Backend handles:  /api/products
```

### 4. Backend Routes (`backend/src/index.ts`)

```typescript
app.use('/api/forms', formRoutes);
app.use('/api/products', productRoutes);
app.use('/api/scoring', scoringRoutes);
app.use('/api/workflows', workflowRoutes);
```

**Tất cả routes đều có prefix `/api`**

## 🔄 Request Flow

### Example: Get All Products

```
1. Frontend code:
   productsApi.getAll()  
   → axios.get('/products')
   → với baseURL='/api' → GET /api/products

2. Browser:
   GET http://localhost:5173/api/products

3. Vite Proxy (Dev) hoặc Nginx (Prod):
   Forward → GET http://localhost:3000/api/products

4. Backend:
   app.use('/api/products', productRoutes)
   → Handle request
   → Return JSON response

5. Response back to Frontend:
   ← JSON data
```

## 🧪 Testing Proxy

### Development

```bash
# Terminal 1: Start Backend
cd backend
npm run dev
# → Backend running on http://localhost:3000

# Terminal 2: Start Frontend
cd frontend
npm run dev
# → Frontend running on http://localhost:5173

# Terminal 3: Test
curl http://localhost:5173/api/health
# → Should return: {"status":"ok",...}

# Check browser console
# → Should see proxy logs if configured
```

### Production (Docker)

```bash
# Start all services
docker-compose up -d

# Test through Nginx
curl http://localhost/api/health

# Check logs
docker-compose logs frontend
docker-compose logs backend
```

## 🐛 Troubleshooting

### Problem 1: 404 Not Found

**Symptoms**: GET /api/products → 404

**Causes**:
- ❌ Backend không chạy
- ❌ Backend routes thiếu `/api` prefix
- ❌ Proxy target sai

**Solutions**:
```bash
# Check backend is running
curl http://localhost:3000/api/health

# Check proxy target in vite.config.ts
target: 'http://localhost:3000'  # ← Must be backend URL

# Check backend routes have /api prefix
app.use('/api/products', ...)  # ← Must have /api
```

### Problem 2: CORS Error

**Symptoms**: CORS policy blocked

**Causes**:
- ❌ Proxy không hoạt động
- ❌ Frontend gọi trực tiếp backend URL

**Solutions**:
```typescript
// ✅ Correct: Use relative path
const api = axios.create({ baseURL: '/api' });

// ❌ Wrong: Direct backend URL
const api = axios.create({ baseURL: 'http://localhost:3000/api' });
```

### Problem 3: Connection Refused

**Symptoms**: ECONNREFUSED

**Causes**:
- ❌ Backend chưa start
- ❌ Backend port khác 3000
- ❌ Proxy target sai

**Solutions**:
```bash
# Start backend first
cd backend && npm run dev

# Check backend port
# In backend/src/index.ts: app.listen(3000)

# Update proxy target if needed
# In vite.config.ts: target: 'http://localhost:3000'
```

### Problem 4: Timeout

**Symptoms**: Request timeout sau 30s

**Causes**:
- ❌ Backend xử lý quá lâu
- ❌ Database không phản hồi

**Solutions**:
```typescript
// Tăng timeout nếu cần
const api = axios.create({
  baseURL: '/api',
  timeout: 60000, // 60 seconds
});
```

## 📊 Proxy Headers

Các headers được forward tự động:

### Development (Vite)
```
Host: localhost:5173
Origin: http://localhost:5173
Referer: http://localhost:5173/...
```

### Production (Nginx)
```
Host: yourdomain.com
X-Real-IP: <client-ip>
X-Forwarded-For: <client-ip>
X-Forwarded-Proto: https
```

## 🔐 Security Best Practices

### 1. Không expose backend URL
```typescript
// ❌ Bad: Hardcoded backend URL
const api = axios.create({
  baseURL: 'http://10.0.0.5:3000/api'
});

// ✅ Good: Use proxy
const api = axios.create({
  baseURL: '/api'
});
```

### 2. Rate Limiting
```nginx
# In nginx.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api {
    limit_req zone=api burst=20;
    proxy_pass http://backend:3000;
}
```

### 3. API Key/Token
```typescript
// In api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 Advanced Configuration

### Multiple Backends

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
  '/api/v2': {
    target: 'http://localhost:4000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/v2/, '/api'),
  },
}
```

### WebSocket Proxy

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true, // Enable WebSocket proxy
  },
}
```

### Conditional Proxy

```typescript
proxy: {
  '/api': {
    target: process.env.NODE_ENV === 'production'
      ? 'https://api.production.com'
      : 'http://localhost:3000',
    changeOrigin: true,
  },
}
```

## 📝 Summary

| Environment | Frontend | Proxy | Backend |
|-------------|----------|-------|---------|
| **Development** | http://localhost:5173 | Vite proxy | http://localhost:3000 |
| **Production** | http://yourdomain.com | Nginx proxy | http://backend:3000 |

**Client always calls**: `/api/*`

**Proxy forwards to**: Backend URL + `/api/*`

---

## ✅ Checklist

- [x] `api.ts` dùng `baseURL: '/api'`
- [x] `vite.config.ts` có proxy config
- [x] `nginx.conf` có location `/api`
- [x] Backend routes có prefix `/api`
- [x] Không hardcode backend URL trong frontend
- [x] Test cả dev và prod mode

---

**Proxy đã được cấu hình đúng! 🎉**

*Last updated: 2026-02-10*


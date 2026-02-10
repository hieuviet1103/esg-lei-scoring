# 🔒 Proxy Configuration - Quick Reference

## ✅ Current Configuration (Đã Chuẩn)

### Frontend API Client
```typescript
// frontend/src/lib/api.ts
baseURL: '/api'  // ✅ Correct
```

### Development Proxy (Vite)
```typescript
// frontend/vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:3000',  // ✅ Backend URL
    changeOrigin: true,
  }
}
```

### Production Proxy (Nginx)
```nginx
# frontend/nginx.conf
location /api {
    proxy_pass http://backend:3000;  # ✅ Backend service
}
```

## 🔄 Request Flow

```
Client Code:          productsApi.getAll()
                              ↓
API Client:           GET /api/products
                              ↓
Browser:              GET http://localhost:5173/api/products
                              ↓
Proxy (Dev/Prod):     → http://localhost:3000/api/products
                              ↓
Backend:              Handle /api/products
```

## 🧪 Quick Test

```powershell
# Run test script
.\test-proxy.ps1

# Or manual test
curl http://localhost:5173/api/health
curl http://localhost:3000/api/health
```

## 📝 Key Points

✅ Client dùng relative path `/api`  
✅ Vite proxy forward đến backend (dev)  
✅ Nginx proxy forward đến backend (prod)  
✅ Backend URL bị giấu khỏi client  
✅ Không có CORS issues  

## 🚫 Common Mistakes

❌ **Sai**: Hardcode backend URL trong client
```typescript
baseURL: 'http://localhost:3000/api'  // ❌ Wrong
```

✅ **Đúng**: Dùng relative path
```typescript
baseURL: '/api'  // ✅ Correct
```

---

❌ **Sai**: Backend routes không có `/api` prefix
```typescript
app.use('/products', productRoutes);  // ❌ Wrong
```

✅ **Đúng**: Tất cả routes có `/api` prefix
```typescript
app.use('/api/products', productRoutes);  // ✅ Correct
```

---

❌ **Sai**: Proxy target sai
```typescript
target: 'http://localhost:5173'  // ❌ Wrong (frontend URL)
```

✅ **Đúng**: Target phải là backend
```typescript
target: 'http://localhost:3000'  // ✅ Correct (backend URL)
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Not Found | Check backend is running, routes have /api prefix |
| CORS Error | Check using `/api` not full URL |
| ECONNREFUSED | Start backend first: `cd backend && npm run dev` |
| Timeout | Check backend responding, increase timeout if needed |

## 📖 Full Documentation

See **PROXY_CONFIGURATION.md** for complete guide

---

**Proxy đã được cấu hình chuẩn và sẵn sàng! ✅**


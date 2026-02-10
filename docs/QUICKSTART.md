# 🚀 Quick Start - Phục hồi Project

## Bạn đã làm mất files? Đừng lo!

Tôi đã tạo lại các file core. Làm theo hướng dẫn này để chạy project:

## Bước 1: Cài đặt dependencies

```bash
npm install
```

## Bước 2: Setup PostgreSQL

```bash
# Option 1: Docker (khuyên dùng)
docker run --name postgres-dynamic -e POSTGRES_DB=dynamic_product -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14

# Option 2: PostgreSQL local - tạo database thủ công
```

## Bước 3: Setup Database

```bash
npm run db:generate
npm run db:push  
npm run db:seed
```

## Bước 4: Chạy Application

```bash
npm run dev
```

**Xong!** Mở browser: http://localhost:5173

## Các file đã được phục hồi:

✅ package.json (root)
✅ backend/package.json
✅ backend/tsconfig.json
✅ backend/prisma/schema.prisma
✅ backend/src/index.ts
✅ backend/src/routes/* (4 files)
✅ backend/src/services/* (2 files)
✅ backend/src/seed.ts
✅ frontend/package.json
✅ frontend/tsconfig.json
✅ frontend/vite.config.ts
✅ frontend/index.html
✅ frontend/tailwind.config.js
✅ Docker files (docker-compose.yml, Dockerfiles)

## Nếu còn thiếu file gì

Tôi đã tạo các file quan trọng nhất. Nếu còn thiếu frontend components/pages, hãy cho tôi biết file nào cần tạo tiếp!

## Commands hữu ích

```bash
# Development
npm run dev              # Chạy cả backend + frontend

# Database  
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to DB
npm run db:seed          # Seed initial data

# Docker
docker-compose up -d     # Start with Docker
```

## Nếu gặp lỗi

1. **Database connection error**: Kiểm tra PostgreSQL đang chạy
2. **Prisma error**: Chạy `npm run db:generate`
3. **Port already in use**: Đổi port trong backend/.env

Chúc bạn thành công! 🎉


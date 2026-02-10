# 🐳 Docker Deployment Guide

## Quick Start

### Production Mode

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

**Access:**
- Frontend: http://localhost
- Backend API: http://localhost:3000/api
- PostgreSQL: localhost:5432

### Development Mode (with hot reload)

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

**Access:**
- Frontend: http://localhost:5173 (Vite dev server)
- Backend API: http://localhost:3000/api
- PostgreSQL: localhost:5432

---

## Services

### 1. PostgreSQL Database
- **Image**: `postgres:14-alpine`
- **Port**: 5432
- **Database**: `dynamic_product`
- **User/Password**: `postgres/postgres`
- **Volume**: `postgres_data` (persisted)

### 2. Backend API
- **Built from**: `./backend/Dockerfile`
- **Port**: 3000
- **Auto-runs**: 
  - Prisma generate
  - Database push
  - Seed initial data

### 3. Frontend
- **Built from**: `./frontend/Dockerfile`
- **Web Server**: Nginx
- **Port**: 80 (production) or 5173 (development)

---

## Docker Commands Cheatsheet

### Build & Start
```bash
# Production
docker-compose up -d --build

# Development
docker-compose -f docker-compose.dev.yml up -d --build

# Build specific service
docker-compose build backend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Execute Commands in Container
```bash
# Backend shell
docker-compose exec backend sh

# Run Prisma commands
docker-compose exec backend npx prisma studio
docker-compose exec backend npx prisma migrate dev

# PostgreSQL shell
docker-compose exec postgres psql -U postgres -d dynamic_product
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Stop & Remove
```bash
# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove containers + volumes + images
docker-compose down -v --rmi all
```

### View Status
```bash
# List running containers
docker-compose ps

# View resource usage
docker stats

# Inspect service
docker-compose inspect backend
```

---

## Database Management

### Backup Database
```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres dynamic_product > backup.sql

# Or using docker directly
docker exec dynamic-product-db pg_dump -U postgres dynamic_product > backup.sql
```

### Restore Database
```bash
# Restore from backup
cat backup.sql | docker-compose exec -T postgres psql -U postgres dynamic_product

# Or using docker directly
cat backup.sql | docker exec -i dynamic-product-db psql -U postgres dynamic_product
```

### Reset Database
```bash
# Method 1: Remove volume and restart
docker-compose down -v
docker-compose up -d

# Method 2: Drop and recreate
docker-compose exec postgres psql -U postgres -c "DROP DATABASE dynamic_product;"
docker-compose exec postgres psql -U postgres -c "CREATE DATABASE dynamic_product;"
docker-compose restart backend
```

### Access Prisma Studio
```bash
# From host (if backend is running)
docker-compose exec backend npx prisma studio

# Access at http://localhost:5555
```

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Common issues:
# 1. Database not ready - wait for healthcheck
# 2. Prisma generation failed - rebuild
docker-compose build --no-cache backend
docker-compose up backend
```

### Database connection refused
```bash
# Check if postgres is healthy
docker-compose ps

# Check postgres logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres pg_isready -U postgres
```

### Port already in use
```bash
# Change ports in docker-compose.yml
# For example, change 80:80 to 8080:80

# Or stop conflicting service
# Windows
netstat -ano | findstr :80
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:80 | xargs kill
```

### Frontend can't reach backend
```bash
# Check nginx config
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# Check if backend is accessible from frontend container
docker-compose exec frontend wget -q -O- http://backend:3000/api/health

# Restart frontend
docker-compose restart frontend
```

### Out of disk space
```bash
# Clean up Docker
docker system prune -a --volumes

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

### Hot reload not working (dev mode)
```bash
# Ensure volumes are mounted correctly
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d

# Check if files are synced
docker-compose exec backend ls -la /app/src
```

---

## Environment Variables

### Production (.env)
```env
# Backend
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/dynamic_product?schema=public
PORT=3000
NODE_ENV=production

# Frontend
VITE_API_URL=http://localhost:3000
```

### Custom Configuration
```bash
# Use .env file
docker-compose --env-file .env.production up -d

# Override via command line
DATABASE_URL="postgresql://..." docker-compose up -d
```

---

## Performance Optimization

### Build Cache
```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker-compose build

# Multi-stage builds are already optimized in Dockerfiles
```

### Resource Limits
```yaml
# Add to docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          memory: 256M
```

### Network Optimization
```bash
# Use host network for better performance (Linux only)
# Add to service:
network_mode: host
```

---

## Production Deployment

### On a VPS/Server

1. **Install Docker & Docker Compose**
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo apt install docker-compose -y
```

2. **Clone Repository**
```bash
git clone <repo-url>
cd dynamic_product
```

3. **Configure Environment**
```bash
# Edit docker-compose.yml with production settings
# - Change passwords
# - Update POSTGRES_PASSWORD
# - Configure VITE_API_URL for your domain
```

4. **Start Services**
```bash
docker-compose up -d
```

5. **Setup Domain (Optional)**
```nginx
# /etc/nginx/sites-available/dynamic-product
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

6. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Using Docker Hub

```bash
# Build and tag
docker build -t yourusername/dynamic-product-backend:latest ./backend
docker build -t yourusername/dynamic-product-frontend:latest ./frontend

# Push to Docker Hub
docker push yourusername/dynamic-product-backend:latest
docker push yourusername/dynamic-product-frontend:latest

# Update docker-compose.yml to use images instead of build
# image: yourusername/dynamic-product-backend:latest
```

---

## Monitoring

### Health Checks
```bash
# Check all services health
docker-compose ps

# Test endpoints
curl http://localhost:3000/api/health
curl http://localhost/health
```

### Logs Aggregation
```bash
# Export logs
docker-compose logs --no-color > logs.txt

# Send to log aggregator (e.g., ELK stack)
# Configure logging driver in docker-compose.yml
```

---

## Security Best Practices

1. **Change default passwords**
   - Update `POSTGRES_PASSWORD` in docker-compose.yml
   - Use secrets for production

2. **Use environment variables for secrets**
   ```bash
   docker-compose --env-file .env.production up -d
   ```

3. **Run as non-root user**
   ```dockerfile
   USER node
   ```

4. **Scan images for vulnerabilities**
   ```bash
   docker scan dynamic-product-backend
   ```

5. **Limit container resources**
   ```yaml
   deploy:
     resources:
       limits:
         memory: 512M
   ```

---

## Useful Links

- Docker Docs: https://docs.docker.com
- Docker Compose: https://docs.docker.com/compose
- Nginx: https://nginx.org/en/docs
- PostgreSQL: https://www.postgresql.org/docs

---

**Happy Dockerizing! 🐳**


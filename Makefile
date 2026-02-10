.PHONY: help build up down restart logs clean dev prod

# Default target
help:
	@echo "🐳 Dynamic Product Evaluation - Docker Commands"
	@echo ""
	@echo "Production:"
	@echo "  make build       - Build all Docker images"
	@echo "  make up          - Start all services (production)"
	@echo "  make down        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make logs        - View logs (tail -f)"
	@echo ""
	@echo "Development:"
	@echo "  make dev         - Start development environment with hot reload"
	@echo "  make dev-logs    - View development logs"
	@echo "  make dev-down    - Stop development environment"
	@echo ""
	@echo "Database:"
	@echo "  make db-backup   - Backup database to backup.sql"
	@echo "  make db-restore  - Restore database from backup.sql"
	@echo "  make db-reset    - Reset database (WARNING: deletes all data)"
	@echo "  make db-shell    - Open PostgreSQL shell"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean       - Remove all containers, volumes, and images"
	@echo "  make ps          - List running containers"
	@echo "  make shell-be    - Open backend container shell"
	@echo "  make shell-fe    - Open frontend container shell"

# Production commands
build:
	@echo "🔨 Building Docker images..."
	docker-compose build

up:
	@echo "🚀 Starting services (production)..."
	docker-compose up -d
	@echo "✅ Services started!"
	@echo "   Frontend: http://localhost"
	@echo "   Backend:  http://localhost:3000/api"

down:
	@echo "🛑 Stopping services..."
	docker-compose down

restart:
	@echo "♻️  Restarting services..."
	docker-compose restart

logs:
	docker-compose logs -f

prod: build up
	@echo "🎉 Production environment is ready!"

# Development commands
dev:
	@echo "🚀 Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "✅ Development environment started!"
	@echo "   Frontend: http://localhost:5173"
	@echo "   Backend:  http://localhost:3000/api"

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-down:
	@echo "🛑 Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

dev-restart:
	@echo "♻️  Restarting development services..."
	docker-compose -f docker-compose.dev.yml restart

# Database commands
db-backup:
	@echo "💾 Creating database backup..."
	docker-compose exec postgres pg_dump -U postgres dynamic_product > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup created!"

db-restore:
	@echo "📥 Restoring database from backup.sql..."
	cat backup.sql | docker-compose exec -T postgres psql -U postgres dynamic_product
	@echo "✅ Database restored!"

db-reset:
	@echo "⚠️  WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "\n🔄 Resetting database..."; \
		docker-compose down -v; \
		docker-compose up -d; \
		echo "✅ Database reset complete!"; \
	fi

db-shell:
	@echo "🐘 Opening PostgreSQL shell..."
	docker-compose exec postgres psql -U postgres dynamic_product

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	docker-compose exec backend npx prisma studio

# Maintenance commands
clean:
	@echo "🧹 Cleaning up Docker resources..."
	docker-compose down -v --rmi all
	@echo "✅ Cleanup complete!"

ps:
	docker-compose ps

shell-be:
	@echo "🐚 Opening backend shell..."
	docker-compose exec backend sh

shell-fe:
	@echo "🐚 Opening frontend shell..."
	docker-compose exec frontend sh

# Utility commands
check:
	@echo "🔍 Checking services health..."
	@curl -f http://localhost:3000/api/health && echo "✅ Backend healthy" || echo "❌ Backend unhealthy"
	@curl -f http://localhost/health && echo "✅ Frontend healthy" || echo "❌ Frontend unhealthy"

test:
	@echo "🧪 Running tests..."
	docker-compose exec backend npm test

# Install/Setup
install:
	@echo "📦 Installing dependencies..."
	cd backend && npm install
	cd frontend && npm install
	@echo "✅ Dependencies installed!"

setup: install
	@echo "⚙️  Setting up project..."
	@echo "Please ensure PostgreSQL is running..."
	@echo "Run 'make dev' or 'make up' to start services"


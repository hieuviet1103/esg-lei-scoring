# Script to restore all missing project files
# Run: .\restore-files.ps1

Write-Host "🔄 Restoring project files..." -ForegroundColor Green

# Create backend seed.ts (simplified version)
$seedContent = @'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const form = await prisma.form.create({
    data: {
      code: 'PRODUCT_EVAL',
      name: 'Product Evaluation Form',
      status: 'active',
      versions: {
        create: {
          versionNo: 1,
          isActive: true,
          configJson: { schema: {}, rules: {} }
        }
      }
    }
  });
  
  await prisma.scoreFramework.create({
    data: {
      code: 'LEI',
      name: 'Living Experience Index',
      maxScore: 100,
      isActive: true,
      models: {
        create: {
          formVersionId: form.versions[0].id,
          modelName: 'LEI Model',
          passThreshold: 80,
          warnThreshold: 70,
          isActive: true,
          criteria: {
            create: [
              { code: 'human_interaction', name: 'Human Interaction', maxPoints: 20, orderNo: 1, ruleJson: {} },
              { code: 'active_participation', name: 'Active Participation', maxPoints: 20, orderNo: 2, ruleJson: {} },
              { code: 'local_space', name: 'Local Space', maxPoints: 20, orderNo: 3, ruleJson: {} },
              { code: 'story_emotion', name: 'Story & Emotion', maxPoints: 20, orderNo: 4, ruleJson: {} },
              { code: 'non_copyable', name: 'Non-copyable', maxPoints: 20, orderNo: 5, ruleJson: {} }
            ]
          }
        }
      }
    }
  });
  
  console.log('Seeding complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
'@

$seedContent | Out-File -FilePath "backend/src/seed.ts" -Encoding UTF8
Write-Host "✅ Created backend/src/seed.ts"

# Create frontend package.json
$frontendPkg = @'
{
  "name": "frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "axios": "^1.7.2",
    "@tanstack/react-query": "^5.45.1",
    "zustand": "^4.5.2",
    "lucide-react": "^0.395.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4"
  }
}
'@

$frontendPkg | Out-File -FilePath "frontend/package.json" -Encoding UTF8
Write-Host "✅ Created frontend/package.json"

Write-Host "`n🎉 Basic files restored! Run the following commands:" -ForegroundColor Green
Write-Host "1. npm install" -ForegroundColor Yellow
Write-Host "2. npm run db:generate" -ForegroundColor Yellow
Write-Host "3. npm run db:push" -ForegroundColor Yellow
Write-Host "4. npm run db:seed" -ForegroundColor Yellow
Write-Host "5. npm run dev" -ForegroundColor Yellow
'@

$frontendPkg | Out-File -FilePath "restore-files.ps1" -Encoding UTF8
Write-Host "✅ Created restore-files.ps1"


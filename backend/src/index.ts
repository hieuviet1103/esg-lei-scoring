import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import formRoutes from './routes/form.routes.js';
import productRoutes from './routes/product.routes.js';
import scoringRoutes from './routes/scoring.routes.js';
import workflowRoutes from './routes/workflow.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/products', productRoutes);
app.use('/api/scoring', scoringRoutes);
app.use('/api/workflows', workflowRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const isWindows = process.platform === "win32";
const listenOptions: any = {
  port,
  host: "0.0.0.0"// isWindows ? "127.0.0.1" : "0.0.0.0",
};
// Start server
app.listen(listenOptions, () => {

  console.log(process.env.DATABASE_URL);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});


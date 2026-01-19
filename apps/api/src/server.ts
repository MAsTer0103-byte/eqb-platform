import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import pino from 'pino';
import { config } from 'dotenv';

// Load environment variables
config();

// Import routes
import authRouter from './routes/auth';
import appointmentsRouter from './routes/appointments';
import clientsRouter from './routes/clients';
import backlogRouter from './routes/backlog';
import adminRouter from './routes/admin';

// Import job initializer
import { initializeBacklogJobs } from './jobs/backlogJob';
import { initializeEmailJobs } from './jobs/emailJob';

const logger = pino();

const app: Express = express();
const PORT = process.env.API_PORT || 3001;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// CORS
app.use(cors({
  origin: process.env.WEB_BASE_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/backlog', backlogRouter);
app.use('/api/admin', adminRouter);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    statusCode: 404,
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({
    error: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ============================================================================
// SERVER
// ============================================================================

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📊 API running in ${process.env.NODE_ENV || 'development'} mode`);
  
  // Initialize backlog job scheduler
  initializeBacklogJobs();
  logger.info('⏰ Backlog job scheduler initialized');
  
  // Initialize email notification jobs
  initializeEmailJobs();
  logger.info('📧 Email notification jobs initialized');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;

import Queue from 'bull';
import { logger } from '../utils/logger';

// Redis connection configuration
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create queues
export const backlogQueue = new Queue('backlog', REDIS_URL, {
  defaultJobOptions: {
    removeOnComplete: 100, // Keep last 100 completed jobs
    removeOnFail: 500, // Keep last 500 failed jobs
    attempts: 3, // Retry failed jobs 3 times
    backoff: {
      type: 'exponential',
      delay: 5000, // Initial delay of 5 seconds
    },
  },
});

// Queue event handlers
backlogQueue.on('completed', (job, result) => {
  logger.info(`Job ${job.id} completed:`, result);
});

backlogQueue.on('failed', (job, err) => {
  logger.error(`Job ${job?.id} failed:`, err);
});

backlogQueue.on('error', (error) => {
  logger.error('Queue error:', error);
});

// Clean up old jobs periodically
backlogQueue.clean(24 * 60 * 60 * 1000, 'completed'); // Remove completed jobs older than 24h
backlogQueue.clean(7 * 24 * 60 * 60 * 1000, 'failed'); // Remove failed jobs older than 7 days

logger.info('Bull queues initialized');

export default backlogQueue;

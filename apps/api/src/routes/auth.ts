/**
 * Authentication Routes
 * Handles login, signup, and token refresh
 */
import { Router, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';
import authService from '../services/authService';
import { createResponse } from '../types/api';
import pino from 'pino';

const logger = pino();
const router = Router();

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const CallbackSchema = z.object({
  profile: z.object({
    sub: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    picture: z.string().optional(),
  }),
});

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /auth/callback
 * Called by Auth0 after successful authentication
 */
router.post('/callback', async (req, res: Response) => {
  try {
    const validation = CallbackSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json(
        createResponse(false, 400, undefined, {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request',
          details: validation.error.errors,
        })
      );
    }

    const { profile } = validation.data;

    // Get or create user
    const user = await authService.getOrCreateUser(profile);

    logger.info(`User authenticated: ${user.email}`);

    return res.json(
      createResponse(true, 200, {
        user,
        message: 'Authentication successful',
      })
    );
  } catch (error) {
    logger.error('Auth callback error:', error);
    return res.status(500).json(
      createResponse(false, 500, undefined, {
        code: 'AUTH_ERROR',
        message: 'Authentication failed',
      })
    );
  }
});

/**
 * GET /auth/me
 * Get current authenticated user
 */
router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(
        createResponse(false, 401, undefined, {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      );
    }

    const user = await authService.getUserById(req.user.sub);

    if (!user) {
      return res.status(404).json(
        createResponse(false, 404, undefined, {
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      );
    }

    return res.json(
      createResponse(true, 200, { user })
    );
  } catch (error) {
    logger.error('Get me error:', error);
    return res.status(500).json(
      createResponse(false, 500, undefined, {
        code: 'SERVER_ERROR',
        message: 'Failed to get user',
      })
    );
  }
});

/**
 * POST /auth/logout
 * Logout user (primarily for frontend)
 */
router.post('/logout', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    logger.info(`User logged out: ${req.user?.email}`);

    return res.json(
      createResponse(true, 200, { message: 'Logged out successfully' })
    );
  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(500).json(
      createResponse(false, 500, undefined, {
        code: 'SERVER_ERROR',
        message: 'Logout failed',
      })
    );
  }
});

export default router;

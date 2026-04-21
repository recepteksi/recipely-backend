import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import type { Container } from '@presentation/server/bootstrap';
import { logger } from '@presentation/server/logger';
import { authRoutes } from '@presentation/routes/auth.routes';
import { healthRoutes } from '@presentation/routes/health.routes';
import { recipesRoutes } from '@presentation/routes/recipes.routes';
import { errorHandler } from '@presentation/middlewares/error-handler';

export function createApp(container: Container): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  // TODO: tighten CORS origin allowlist for production — permissive here for mobile dev.
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '256kb' }));
  app.use(pinoHttp({ logger }));

  // WHY: /health stays at root — Docker healthcheck + external LB probes target /health.
  app.use('/health', healthRoutes(container.controllers.health));

  // WHY: product routes live under /api/v1 so we can introduce /api/v2 without breaking clients.
  const v1 = express.Router();
  v1.use('/auth', authRoutes(container.controllers.auth));
  v1.use('/recipes', recipesRoutes(container.controllers.recipes));
  app.use('/api/v1', v1);

  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Route not found' } });
  });
  app.use(errorHandler);

  return app;
}

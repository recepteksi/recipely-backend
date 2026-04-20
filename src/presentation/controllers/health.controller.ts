import type { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';

export class HealthController {
  constructor(private readonly prisma: PrismaClient) {}

  liveness = (_req: Request, res: Response): void => {
    res.status(200).json({ status: 'ok' });
  };

  readiness = async (_req: Request, res: Response): Promise<void> => {
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
      res.status(200).json({ status: 'ready' });
    } catch {
      res.status(503).json({ status: 'db_unreachable' });
    }
  };
}

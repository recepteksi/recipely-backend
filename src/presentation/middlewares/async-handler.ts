import type { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// WHY: Express 4 does not forward rejected promises to the error middleware — wrap once here.
export const asyncHandler =
  (fn: AsyncRouteHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };

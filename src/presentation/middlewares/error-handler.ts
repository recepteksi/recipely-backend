import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Failure, UnknownFailure, ValidationFailure } from '@core/failure';
import { failureToHttp } from '@presentation/http/failure-to-http';

// WHY: single exit point for every error — turns thrown errors into Result-like HTTP responses.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const failure = toFailure(err);
  const { status, body } = failureToHttp(failure);
  res.status(status).json(body);
}

function toFailure(err: unknown): Failure {
  if (err instanceof Failure) return err;
  if (err instanceof ZodError) {
    const first = err.issues[0];
    const field = first?.path.join('.') || undefined;
    return new ValidationFailure(first?.message ?? 'Invalid request', field);
  }
  if (err instanceof Error) return new UnknownFailure(err.message);
  return new UnknownFailure('Unknown error');
}

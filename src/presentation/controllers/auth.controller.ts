import type { Request, Response } from 'express';
import type { RegisterUseCase } from '@application/auth/use-cases/register-use-case';
import type { LoginUseCase } from '@application/auth/use-cases/login-use-case';
import {
  LoginBodySchema,
  RegisterBodySchema,
} from '@presentation/validators/auth.validators';
import { failureToHttp } from '@presentation/http/failure-to-http';

export class AuthController {
  constructor(
    private readonly register: RegisterUseCase,
    private readonly login: LoginUseCase,
  ) {}

  handleRegister = async (req: Request, res: Response): Promise<void> => {
    const body = RegisterBodySchema.parse(req.body);
    const result = await this.register.execute(body);
    if (!result.ok) {
      const { status, body: err } = failureToHttp(result.failure);
      res.status(status).json(err);
      return;
    }
    res.status(201).json(result.value);
  };

  handleLogin = async (req: Request, res: Response): Promise<void> => {
    const body = LoginBodySchema.parse(req.body);
    const result = await this.login.execute(body);
    if (!result.ok) {
      const { status, body: err } = failureToHttp(result.failure);
      res.status(status).json(err);
      return;
    }
    res.status(200).json(result.value);
  };
}

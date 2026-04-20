import { Failure } from '@core/failure/failure';

export class ValidationFailure extends Failure {
  readonly code = 'validation';
  constructor(
    readonly message: string,
    readonly field?: string,
  ) {
    super();
  }
}

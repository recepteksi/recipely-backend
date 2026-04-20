import { Failure } from '@core/failure/failure';

export class UnauthorizedFailure extends Failure {
  readonly code = 'unauthorized';
  constructor(readonly message: string = 'Unauthorized') {
    super();
  }
}

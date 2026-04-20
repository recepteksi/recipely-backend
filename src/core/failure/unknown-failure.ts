import { Failure } from '@core/failure/failure';

export class UnknownFailure extends Failure {
  readonly code = 'unknown';
  constructor(readonly message: string = 'Unknown error') {
    super();
  }
}

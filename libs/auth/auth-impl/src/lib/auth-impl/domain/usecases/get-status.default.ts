import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { GetStatusUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class GetStatusUseCaseDefault extends GetStatusUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): Promise<Either<Error, boolean>> {
    return this.repository.getAuthStatus();
  }
}

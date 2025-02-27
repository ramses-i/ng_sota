import { Injectable } from '@angular/core';
import { LogoutUseCase } from '@ng-sota/auth-api';
import { Either } from 'fp-ts/Either';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCaseDefault extends LogoutUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(): Promise<Either<Error, boolean>> {
    return this.repository.doLogout();
  }
}

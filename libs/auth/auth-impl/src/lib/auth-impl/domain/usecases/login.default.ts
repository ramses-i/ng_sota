import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { LoginUseCase } from '@ng-sota/auth-api';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCaseDefault extends LoginUseCase {
  constructor(private repository: AuthRepository) {
    super();
  }

  execute(username: string, password: string): Promise<Either<Error, boolean>> {
    return this.repository.doLogin(username, password);
  }
}

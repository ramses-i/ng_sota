import { Injectable } from '@angular/core';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { AuthRepository } from '@ng-sota/login-domain';
import { Either } from 'fp-ts/Either';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryDefault extends AuthRepository {
  constructor(private authRepo: AuthRemoteDataSource) {
    super();
  }

  override async login(
    email: string,
    password: string
  ): Promise<Either<Error, boolean>> {
    return this.authRepo.login(email, password);
  }
}

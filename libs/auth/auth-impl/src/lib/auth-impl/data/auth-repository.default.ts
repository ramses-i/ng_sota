import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { AuthRepository } from '../domain/repository/auth.repository';
import { AuthRemoteDataSource } from './auth-remote.datasource';
import { AuthUser } from '@ng-sota/auth-api';
import { boolean, string } from 'fp-ts';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryDefault extends AuthRepository {
  constructor(private authRemoteDataSource: AuthRemoteDataSource) {
    super();
  }

  override async doLogin(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>> {
    return this.authRemoteDataSource.doLogin(username, password);
  }

  override async doLogout(): Promise<Either<Error, boolean>> {
    return this.authRemoteDataSource.doLogout();
  }

  override async getAuthStatus(): Promise<Either<Error, boolean>> {
    return this.authRemoteDataSource.getAuthStatus();
  }

  override async getUser(): Promise<Either<Error, AuthUser>> {
    return this.authRemoteDataSource.getUser();
  }

  checkSession(): Observable<boolean> {
    return this.authRemoteDataSource.checkSession();
  }
}

import { AuthRemoteDataSource } from '../auth-remote.datasource';
import { Injectable } from '@angular/core';
import { LoginError } from '@ng-sota/login-domain';
import { Either, left, right } from 'fp-ts/Either';
import { AuthService } from '@ng-sota/supabase';

@Injectable({ providedIn: 'root' })
export class AuthRemoteDataSourceDefault extends AuthRemoteDataSource {
  constructor(private authService: AuthService) {
    super();
  }

  override async login(
    email: string,
    password: string
  ): Promise<Either<Error, boolean>> {
    try {
      await this.authService.login(email, password);
      return right(this.authService.isAuthenticated());
    } catch (error) {
      return left(new LoginError('Supabase Auth Error 1'));
    }
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from '@ng-sota/supabase';
import { AuthRemoteDataSource } from '../auth-remote.datasource';
import { Either, left, right } from 'fp-ts/Either';
import { AuthError, AuthUser } from '@ng-sota/auth-api';

@Injectable({ providedIn: 'root' })
export class AuthRemoteDataSourceDefault extends AuthRemoteDataSource {
  constructor(private authService: AuthService) {
    super();
  }

  override async doLogin(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>> {
    try {
      await this.authService.login(username, password);
      return right(this.authService.isAuthenticated());
    } catch (error) {
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }

  override async doLogout(): Promise<Either<Error, boolean>> {
    try {
      await this.authService.logout();
      return right(true);
    } catch (error) {
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }

  override async getAuthStatus(): Promise<Either<Error, boolean>> {
    try {
      return right(this.authService.isAuthenticated());
    } catch (error) {
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }

  override async getUser(): Promise<Either<Error, AuthUser>> {
    try {
      const user: AuthUser = {
        id: this.authService.currentUserId(),
        name: 'unknown',
        avatar: 'https://i.pravatar.cc/150',
      };
      return right(user);
    } catch (error) {
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }
}

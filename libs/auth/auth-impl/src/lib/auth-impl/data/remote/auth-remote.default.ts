import { Injectable } from '@angular/core';
import { AuthService } from '@ng-sota/supabase';
import { AuthRemoteDataSource } from '../auth-remote.datasource';
import { Either, left, right } from 'fp-ts/Either';
import { AuthError } from '@ng-sota/auth-api';
import { Observable } from 'rxjs';

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
      console.error('doLogin:', error);
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }

  override async doLogout(): Promise<Either<Error, boolean>> {
    try {
      await this.authService.logout();
      return right(true);
    } catch (error) {
      console.error('doLogout:', error);
      return left(new AuthError('Supabase Auth Error 1'));
    }
  }

  override isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  override getUserId(): string {
    return this.authService.currentUserId();
  }

  checkSession(): Observable<boolean> {
    return this.authService.checkSession();
  }
}

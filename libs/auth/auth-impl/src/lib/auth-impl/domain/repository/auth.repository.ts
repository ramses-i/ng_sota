import { Either } from 'fp-ts/Either';
import { AuthUser } from '@ng-sota/auth-api';
import { Observable } from 'rxjs';

export abstract class AuthRepository {
  abstract doLogin(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>>;

  abstract doLogout(): Promise<Either<Error, boolean>>;

  abstract checkSession(): Observable<boolean>;

  abstract isAuthenticated(): boolean;

  abstract getUserId(): string;
}

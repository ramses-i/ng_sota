import { Either } from 'fp-ts/Either';
import { AuthUser } from '@ng-sota/auth-api';

export abstract class AuthRepository {
  abstract doLogin(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>>;

  abstract doLogout(): Promise<Either<Error, boolean>>;

  abstract getAuthStatus(): Promise<Either<Error, boolean>>;

  abstract getUser(): Promise<Either<Error, AuthUser>>;
}

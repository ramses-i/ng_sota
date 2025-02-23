import { Either } from 'fp-ts/Either';
import { Observable } from 'rxjs';

export abstract class AuthRemoteDataSource {
  abstract doLogin(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>>;

  abstract doLogout(): Promise<Either<Error, boolean>>;

  abstract isAuthenticated(): boolean;

  abstract getUserId(): string;

  abstract checkSession(): Observable<boolean>;
}

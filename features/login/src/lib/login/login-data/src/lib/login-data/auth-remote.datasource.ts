import { Either } from 'fp-ts/Either';

export abstract class AuthRemoteDataSource {
  abstract login(
    email: string,
    password: string
  ): Promise<Either<Error, boolean>>;
}

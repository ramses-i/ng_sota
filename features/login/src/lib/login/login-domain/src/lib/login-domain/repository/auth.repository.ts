import { Either } from 'fp-ts/Either';

export abstract class AuthRepository {
  abstract login(
    email: string,
    password: string
  ): Promise<Either<Error, boolean>>;
}

import { Either } from 'fp-ts/Either';

export abstract class LoginUseCase {
  abstract execute(
    username: string,
    password: string
  ): Promise<Either<Error, boolean>>;
}

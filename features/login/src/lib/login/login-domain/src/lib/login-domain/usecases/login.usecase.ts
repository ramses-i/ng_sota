import { Either } from 'fp-ts/Either';
import { LoginError } from '../errors/login.error';

export abstract class LoginUseCase {
  abstract execute(
    mail: string,
    password: string
  ): Promise<Either<LoginError, boolean>>;
}

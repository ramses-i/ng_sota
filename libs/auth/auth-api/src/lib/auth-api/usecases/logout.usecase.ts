import { Either } from 'fp-ts/Either';

export abstract class LogoutUseCase {
  abstract execute(): Promise<Either<Error, boolean>>;
}

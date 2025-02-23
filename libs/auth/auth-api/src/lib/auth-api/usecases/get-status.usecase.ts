import { Either } from 'fp-ts/Either';

export abstract class GetStatusUseCase {
  abstract execute(): Promise<Either<Error, boolean>>;
}

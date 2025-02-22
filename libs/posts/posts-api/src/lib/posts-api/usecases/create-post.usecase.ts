import { Either } from 'fp-ts/Either';

export abstract class CreatePostUseCase {
  abstract execute(content: string): Promise<Either<Error, boolean>>;
}

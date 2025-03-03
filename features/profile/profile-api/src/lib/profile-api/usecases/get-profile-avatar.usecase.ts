import { Either } from 'fp-ts/lib/Either';

export abstract class GetProfileAvatarUseCase {
  abstract execute(): Promise<Either<Error, string>>;
}

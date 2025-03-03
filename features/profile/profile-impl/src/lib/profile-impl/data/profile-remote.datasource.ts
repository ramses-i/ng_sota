import { Either } from 'fp-ts/Either';

export abstract class ProfileRemoteDatasource {
  abstract getAvatar(userId: string): Promise<Either<Error, string>>;
}

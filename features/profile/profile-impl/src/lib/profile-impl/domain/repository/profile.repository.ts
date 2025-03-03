import {Either} from "fp-ts/Either";

export abstract class ProfileRepository {
    abstract getAvatar(userId: string): Promise<Either<Error, string>>;
}

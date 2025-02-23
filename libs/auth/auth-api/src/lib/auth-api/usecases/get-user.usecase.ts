import { Either } from 'fp-ts/Either';
import {AuthUser} from "../models/auth-user.model";

export abstract class GetUserUseCase {
    abstract execute(): Promise<Either<Error, AuthUser>>;
}

import { Either } from 'fp-ts/Either';
import { Posts } from '../models/post.model';

export abstract class GetPostsUseCase {
  abstract execute(): Promise<Either<Error, Posts>>;
}

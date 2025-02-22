import { Either } from 'fp-ts/Either';
import { DPosts } from '../models/post.model';

export abstract class GetUserPostsUseCase {
  abstract execute(userId: string): Promise<Either<Error, DPosts>>;
}

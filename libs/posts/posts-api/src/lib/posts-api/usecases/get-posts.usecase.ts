import { Either } from 'fp-ts/Either';
import { DPosts } from '../models/post.model';

export abstract class GetPostsUseCase {
  abstract execute(): Promise<Either<Error, DPosts>>;
}

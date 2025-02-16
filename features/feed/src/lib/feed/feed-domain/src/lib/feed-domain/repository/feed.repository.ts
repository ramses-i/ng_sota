import { Either } from 'fp-ts/Either';
import { Posts } from '../models/post.model';

export abstract class FeedRepository {
  abstract getPosts(): Promise<Either<Error, Posts>>;
  abstract getPostsFromUser(userId: string): Promise<Either<Error, Posts>>;
  abstract createPost(content: string): Promise<Either<Error, boolean>>;
}

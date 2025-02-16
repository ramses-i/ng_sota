import { Either } from 'fp-ts/Either';
import { Posts } from '@ng-sota/feed-domain';

export abstract class FeedRemoteDataSource {
  abstract getPosts(): Promise<Either<Error, Posts>>;
  abstract getPostsFromUser(userId: string): Promise<Either<Error, Posts>>;
  abstract createPost(content: string): Promise<Either<Error, boolean>>;
}

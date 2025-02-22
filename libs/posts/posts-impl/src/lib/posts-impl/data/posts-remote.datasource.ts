import { Either } from 'fp-ts/Either';
import { DPosts } from '@ng-sota/posts-api';

export abstract class PostsRemoteDataSource {
  abstract getPosts(): Promise<Either<Error, DPosts>>;

  abstract getPostsFromUser(userId: string): Promise<Either<Error, DPosts>>;

  abstract createPost(content: string): Promise<Either<Error, boolean>>;
}

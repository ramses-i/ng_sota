import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { FeedRepository, Posts } from '@ng-sota/feed-domain';
import { FeedRemoteDataSource } from './feed-remote.default';

@Injectable({ providedIn: 'root' })
export class FeedRepositoryDefault extends FeedRepository {
  constructor(private feedRemoteDataSource: FeedRemoteDataSource) {
    super();
  }

  override async getPosts(): Promise<Either<Error, Posts>> {
    return this.feedRemoteDataSource.getPosts();
  }

  override async getPostsFromUser(
    userId: string
  ): Promise<Either<Error, Posts>> {
    return this.feedRemoteDataSource.getPostsFromUser(userId);
  }

  override async createPost(content: string): Promise<Either<Error, boolean>> {
    return this.feedRemoteDataSource.createPost(content);
  }
}

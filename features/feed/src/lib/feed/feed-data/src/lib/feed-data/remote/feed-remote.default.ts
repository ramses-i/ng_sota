import { Injectable } from '@angular/core';
import { FeedRemoteDataSource } from '../feed-remote.default';
import { Either, left, right } from 'fp-ts/Either';
import { FeedError, Posts } from '@ng-sota/feed-domain';
import { PostsService } from '@ng-sota/supabase';

@Injectable({ providedIn: 'root' })
export class FeedRemoteDataSourceDefault extends FeedRemoteDataSource {
  constructor(private postsService: PostsService) {
    super();
  }

  override async getPosts(): Promise<Either<Error, Posts>> {
    try {
      const result = await this.postsService.getPosts();
      console.log(result);
      return right({
        items: [],
      });
    } catch (error) {
      return left(new FeedError('getPosts Call Error 1'));
    }
  }

  override async getPostsFromUser(
    userId: string
  ): Promise<Either<Error, Posts>> {
    try {
      const result = await this.postsService.getPostById(userId);
      console.log(result);
      return right({
        items: [],
      });
    } catch (error) {
      return left(new FeedError('getPostsFromUser Call Error 1'));
    }
  }

  override async createPost(content: string): Promise<Either<Error, boolean>> {
    try {
      const result = await this.postsService.createPost(content);
      console.log(result);
      return right(true);
    } catch (error) {
      return left(new FeedError('getPostsFromUser Call Error 1'));
    }
  }
}

import { Injectable } from '@angular/core';
import { FeedRemoteDataSource } from '../feed-remote.default';
import { Either, left, right } from 'fp-ts/Either';
import { FeedError, Posts } from '@ng-sota/feed-domain';
import { PostsService } from '@ng-sota/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { PostResponse } from './model/response/post.response';
import { PostsResponseToDomain } from './mapper/post.mapper';

@Injectable({ providedIn: 'root' })
export class FeedRemoteDataSourceDefault extends FeedRemoteDataSource {
  constructor(private postsService: PostsService) {
    super();
  }

  override async getPosts(): Promise<Either<Error, Posts>> {
    try {
      const result: PostgrestResponse<PostResponse> =
        await this.postsService.getPosts();
      console.log('Raw Supabase Response: ', result);

      if (result.error) {
        return left(new FeedError(result.error.message));
      }

      return right(PostsResponseToDomain(result.data));
    } catch (error) {
      return left(new FeedError('getPosts Call Error 1'));
    }
  }

  override async getPostsFromUser(
    userId: string
  ): Promise<Either<Error, Posts>> {
    try {
      const result = await this.postsService.getPostsByUser(userId);
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

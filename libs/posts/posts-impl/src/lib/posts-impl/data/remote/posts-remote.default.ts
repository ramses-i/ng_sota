import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/Either';
import { PostsService } from '@ng-sota/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { PostResponse } from './model/response/post.response';
import { PostsResponseToDomain } from './mapper/post.mapper';
import { PostsRemoteDataSource } from '../posts-remote.datasource';
import { PostsError } from '../../../../../../posts-api/src/lib/posts-api/errors/posts.error';
import {DPosts} from "@ng-sota/posts-api";

@Injectable({ providedIn: 'root' })
export class PostsRemoteDataSourceDefault extends PostsRemoteDataSource {
  constructor(private postsService: PostsService) {
    super();
  }

  override async getPosts(): Promise<Either<Error, DPosts>> {
    try {
      const result: PostgrestResponse<PostResponse> =
        await this.postsService.getPosts();
      console.log('Raw Supabase Response: ', result);

      if (result.error) {
        return left(new PostsError(result.error.message));
      }

      return right(PostsResponseToDomain(result.data));
    } catch (error) {
      return left(new PostsError('getPosts Call Error 1'));
    }
  }

  override async getPostsFromUser(
    userId: string
  ): Promise<Either<Error, DPosts>> {
    try {
      const result = await this.postsService.getPostsByUser(userId);
      console.log(result);
      return right({
        items: [],
      });
    } catch (error) {
      return left(new PostsError('getPostsFromUser Call Error 1'));
    }
  }

  override async createPost(content: string): Promise<Either<Error, boolean>> {
    try {
      const result = await this.postsService.createPost(content);
      console.log(result);
      return right(true);
    } catch (error) {
      return left(new PostsError('getPostsFromUser Call Error 1'));
    }
  }
}

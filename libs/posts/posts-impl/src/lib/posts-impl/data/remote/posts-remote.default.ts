import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/Either';
import { PostsService } from '@ng-sota/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { PostResponse } from './model/response/post.response';
import { PostsResponseToDomain } from './mapper/post.mapper';
import { PostsRemoteDataSource } from '../posts-remote.datasource';
import { DPosts, PostsError } from '@ng-sota/posts-api';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsRemoteDataSourceDefault extends PostsRemoteDataSource {
  constructor(private postsService: PostsService) {
    super();
  }

  override async getPosts(): Promise<Either<Error, DPosts>> {
    try {
      const result: PostgrestResponse<PostResponse> =
        await this.postsService.getPosts();

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
      const result: PostgrestResponse<PostResponse> =
        await this.postsService.getPostsByUser(userId);

      if (result.error) {
        return left(new PostsError(result.error.message));
      }

      return right(PostsResponseToDomain(result.data));
    } catch (error) {
      return left(new PostsError('getPostsFromUser Call Error 1'));
    }
  }

  override async createPost(content: string): Promise<Either<Error, boolean>> {
    try {
      const result: PostgrestResponse<PostResponse> =
        await this.postsService.createPost(content);

      if (result.error) {
        return left(new PostsError(result.error.message));
      }

      return right(result.status == HttpStatusCode.Created);
    } catch (error) {
      return left(new PostsError('createPost Call Error 1'));
    }
  }
}

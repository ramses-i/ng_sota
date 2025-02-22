import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { PostsRepository } from '../domain/repository/posts.repository';
import { DPosts } from '@ng-sota/posts-api';
import { PostsRemoteDataSource } from './posts-remote.datasource';

@Injectable({ providedIn: 'root' })
export class PostsRepositoryDefault extends PostsRepository {
  constructor(private feedRemoteDataSource: PostsRemoteDataSource) {
    super();
  }

  override async getPosts(): Promise<Either<Error, DPosts>> {
    return this.feedRemoteDataSource.getPosts();
  }

  override async getPostsFromUser(
    userId: string
  ): Promise<Either<Error, DPosts>> {
    return this.feedRemoteDataSource.getPostsFromUser(userId);
  }

  override async createPost(content: string): Promise<Either<Error, boolean>> {
    return this.feedRemoteDataSource.createPost(content);
  }
}

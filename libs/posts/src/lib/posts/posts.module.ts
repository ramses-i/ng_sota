import { Provider } from '@angular/core';
import {
  CreatePostUseCase,
  GetPostsUseCase,
  GetUserPostsUseCase,
} from '@ng-sota/posts-api';
import {
  CreatePostUseCaseDefault,
  GetPostsUseCaseDefault,
  GetUserPostsUseCaseDefault,
  PostsRemoteDataSource,
  PostsRemoteDataSourceDefault,
} from '@ng-sota/posts-impl';
import { PostsRepository } from '@ng-sota/posts-impl';
import { PostsRepositoryDefault } from '@ng-sota/posts-impl';

export const postDependencies: Provider[] = [
  {
    provide: PostsRepository,
    useClass: PostsRepositoryDefault,
  },
  {
    provide: PostsRemoteDataSource,
    useClass: PostsRemoteDataSourceDefault,
  },
  {
    provide: GetPostsUseCase,
    useClass: GetPostsUseCaseDefault,
  },
  {
    provide: GetUserPostsUseCase,
    useClass: GetUserPostsUseCaseDefault,
  },
  {
    provide: CreatePostUseCase,
    useClass: CreatePostUseCaseDefault,
  },
];

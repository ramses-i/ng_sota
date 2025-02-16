import { NgModule } from '@angular/core';
import { GetPostsUseCase } from './usecases/get-posts.usecase';
import { GetPostsUseCaseDefault } from './usecases/impl/get-posts.default';
import { GetUserPostsUseCase } from './usecases/get-user-posts.usecase';
import { GetUserPostsUseCaseDefault } from './usecases/impl/get-user-posts.default';
import { CreatePostUseCaseDefault } from './usecases/impl/create-post.default';
import { CreatePostUseCase } from './usecases/create-post.usecase';

@NgModule({
  providers: [
    /* Dependency Injection */
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
  ],
})
export class FeedDomainModule {}

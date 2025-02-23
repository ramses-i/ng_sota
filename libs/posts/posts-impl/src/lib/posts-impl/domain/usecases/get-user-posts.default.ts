import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { DPosts, GetUserPostsUseCase } from '@ng-sota/posts-api';
import { PostsRepository } from '../repository/posts.repository';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';

@Injectable({
  providedIn: 'root',
})
export class GetUserPostsUseCaseDefault extends GetUserPostsUseCase {
  constructor(
    private repository: PostsRepository,
    private getUserId: GetAuthUserIdUseCase
  ) {
    super();
  }

  override async execute(userId: string): Promise<Either<Error, DPosts>> {
    return this.repository.getPostsFromUser(
      userId != '' ? userId : this.getUserId.execute()
    );
  }
}

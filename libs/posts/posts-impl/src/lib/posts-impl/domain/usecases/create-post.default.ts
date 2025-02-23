import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { PostsRepository } from '../repository/posts.repository';
import { CreatePostUseCase } from '@ng-sota/posts-api';
import { GetAuthUserIdUseCase } from '@ng-sota/auth-api';

@Injectable({
  providedIn: 'root',
})
export class CreatePostUseCaseDefault extends CreatePostUseCase {
  constructor(
    private repository: PostsRepository,
    private getUserId: GetAuthUserIdUseCase
  ) {
    super();
  }

  override async execute(content: string): Promise<Either<Error, boolean>> {
    const userId = this.getUserId.execute();
    return this.repository.createPost(userId, content);
  }
}

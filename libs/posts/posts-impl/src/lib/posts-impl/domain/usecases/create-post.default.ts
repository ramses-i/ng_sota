import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { PostsRepository } from '../repository/posts.repository';
import { CreatePostUseCase } from '@ng-sota/posts-api';

@Injectable({
  providedIn: 'root',
})
export class CreatePostUseCaseDefault extends CreatePostUseCase {
  constructor(private repository: PostsRepository) {
    super();
  }

  override async execute(content: string): Promise<Either<Error, boolean>> {
    return this.repository.createPost(content);
  }
}

import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { PostsRepository } from '../repository/posts.repository';
import { DPosts, GetPostsUseCase } from '@ng-sota/posts-api';

@Injectable({
  providedIn: 'root',
})
export class GetPostsUseCaseDefault extends GetPostsUseCase {
  constructor(private repository: PostsRepository) {
    super();
  }

  override async execute(): Promise<Either<Error, DPosts>> {
    return this.repository.getPosts();
  }
}

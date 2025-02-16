import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { GetPostsUseCase } from '../get-posts.usecase';
import { FeedRepository } from '../../repository/feed.repository';
import { Posts } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class GetPostsUseCaseDefault extends GetPostsUseCase {
  constructor(private repository: FeedRepository) {
    super();
  }

  override async execute(): Promise<Either<Error, Posts>> {
    return this.repository.getPosts();
  }
}

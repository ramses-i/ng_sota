import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { FeedRepository } from '../../repository/feed.repository';
import { Posts } from '../../models/post.model';
import { GetUserPostsUseCase } from '../get-user-posts.usecase';

@Injectable({
  providedIn: 'root',
})
export class GetUserPostsUseCaseDefault extends GetUserPostsUseCase {
  constructor(private repository: FeedRepository) {
    super();
  }

  override async execute(
    userId: string
  ): Promise<Either<Error, Posts>> {
    return this.repository.getPostsFromUser(userId);
  }
}

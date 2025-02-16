import { Injectable } from '@angular/core';
import { Either } from 'fp-ts/Either';
import { FeedRepository } from '../../repository/feed.repository';
import { CreatePostUseCase } from '../create-post.usecase';

@Injectable({
  providedIn: 'root',
})
export class CreatePostUseCaseDefault extends CreatePostUseCase {
  constructor(private repository: FeedRepository) {
    super();
  }

  override async execute(content: string): Promise<Either<Error, boolean>> {
    return this.repository.createPost(content);
  }
}

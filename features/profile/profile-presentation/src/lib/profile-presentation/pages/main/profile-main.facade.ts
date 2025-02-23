import { Injectable, signal } from '@angular/core';
import { Posts }from '@ng-sota/ui';
import { DPosts, GetUserPostsUseCase, PostsError } from '@ng-sota/posts-api';
import { match } from 'fp-ts/Either';
import { DPostsToPosts } from '@ng-sota/posts-ui';

@Injectable({ providedIn: 'root' })
export class ProfileMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  posts = signal<Posts>({ items: [] });

  constructor(private getUserPosts: GetUserPostsUseCase) {}

  async getUserFeed() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.getUserPosts.execute('');

    match(
      (error: PostsError) => this.errorMessage.set(error.message),
      (posts: DPosts) => this.posts.set(DPostsToPosts(posts))
    )(result);

    this.isLoading.set(false);
  }
}

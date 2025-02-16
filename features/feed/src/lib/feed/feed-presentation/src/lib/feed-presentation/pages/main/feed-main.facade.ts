import { Injectable, signal } from '@angular/core';
import { match } from 'fp-ts/Either';
import {
  CreatePostUseCase, FeedError,
  GetPostsUseCase,
  Posts,
} from '@ng-sota/feed-domain';

@Injectable({ providedIn: 'root' })
export class FeedMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  posts = signal<Posts | null>(null);

  constructor(
    private getPosts: GetPostsUseCase,
    private createPost: CreatePostUseCase
  ) {}

  async getFeed() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.getPosts.execute();

    match(
      (error: FeedError) => this.errorMessage.set(error.message),
      (posts: Posts) => this.posts.set(posts)
    )(result);

    this.isLoading.set(false);
  }

  async publishPost(content: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.createPost.execute(content);

    match(
      (error: FeedError) => this.errorMessage.set(error.message),
      (isCreated: boolean) => {
        if (isCreated) {
          console.log('Successfully published');
          this.getFeed();
        } else {
          console.log('Error creating post');
        }
      }
    )(result);

    this.isLoading.set(false);
  }
}

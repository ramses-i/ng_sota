import { Injectable, signal } from '@angular/core';
import { match } from 'fp-ts/Either';
import { Posts } from 'shared/ui/src';
import {
  CreatePostUseCase,
  DPosts,
  GetPostsUseCase,
  PostsError,
} from '@ng-sota/posts-api';
import { DPostsToPosts } from '@ng-sota/posts-ui';

@Injectable({ providedIn: 'root' })
export class FeedMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  posts = signal<Posts>({ items: [] });

  constructor(
    private getPosts: GetPostsUseCase,
    private createPost: CreatePostUseCase
  ) {}

  async getFeed() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.getPosts.execute();

    match(
      (error: PostsError) => this.errorMessage.set(error.message),
      (posts: DPosts) => this.posts.set(DPostsToPosts(posts))
    )(result);

    this.isLoading.set(false);
  }

  async publishPost(content: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.createPost.execute(content);

    match(
      (error: PostsError) => this.errorMessage.set(error.message),
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

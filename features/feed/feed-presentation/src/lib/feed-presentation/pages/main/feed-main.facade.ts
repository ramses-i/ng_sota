import { Injectable, signal } from '@angular/core';
import { match } from 'fp-ts/Either';
import { Posts } from '@ng-sota/ui';
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
  avatar = signal<string>('https://i.pravatar.cc/300');

  constructor(
    private getPosts: GetPostsUseCase,
    private createPost: CreatePostUseCase
  ) {}

  async getUserAvatar() {
    // TODO: Create profile-api , profile-impl and GetCurrentUser
  }

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
          this.getFeed();
        } else {
          this.errorMessage.set(
            'Could not create post, please try again later.'
          );
        }
      }
    )(result);

    this.isLoading.set(false);
  }
}

import { Component, Input } from '@angular/core';
import { PostComponent } from '../../molecules/post/post.component';
import { Post, Posts } from '@ng-sota/feed-domain';

@Component({
  imports: [PostComponent],
  selector: 'lib-post-list',
  template: `
      <section>
          @if (publishedPosts.length === 0) {
              <h1 class="text-black dark:text-white font-bold font-2xl text-center">No posts available</h1>
          } @else {
              @for (post of publishedPosts; track post.id) {
                  <lib-post
                          username="{{ post.userId }}"
                          date="{{ post.createdAt }}"
                          content="{{ post.content }}"
                  ></lib-post>
              }
          }
      </section>
  `,
})
export class PostListComponent {
  @Input() posts!: Posts;

  get publishedPosts(): Post[] {
    return this.posts.items;
  }
}

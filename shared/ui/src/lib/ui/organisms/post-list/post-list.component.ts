import { Component, Input } from '@angular/core';
import { PostComponent } from '../../molecules/post/post.component';
import { Post, Posts } from '../../model/posts.model';

@Component({
  imports: [PostComponent],
  selector: 'lib-post-list',
  template: `
    <section>
      @if (publishedPosts.length === 0) {
      <h1 class="text-black dark:text-white font-bold font-2xl text-center">
        No posts available
      </h1>
      } @else { @for (post of publishedPosts; track post.id) {
      <lib-post
        avatarUrl="{{ post.user.avatar }}"
        username="{{ post.user.name }}"
        date="{{ post.publishDate }}"
        content="{{ post.content }}"
      ></lib-post>
      } }
    </section>
  `,
})
export class PostListComponent {
  @Input() posts!: Posts;

  get publishedPosts(): Post[] {
    return this.posts.items;
  }
}

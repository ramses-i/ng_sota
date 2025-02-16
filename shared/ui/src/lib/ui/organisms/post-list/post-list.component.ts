import { Component } from '@angular/core';
import { PostComponent } from '../../molecules/post/post.component';

@Component({
  imports: [PostComponent],
  selector: 'lib-post-list',
  template: `
    <section>
      <lib-post
        username="User 1"
        date="2024-02-16"
        content="This is a sample post."
      ></lib-post>
    </section>
  `,
})
export class PostListComponent {}

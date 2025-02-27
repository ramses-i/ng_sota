import { Component, Input } from '@angular/core';
import { PostFormComponent } from '../../organisms/post-form/post-form.component';
import { PostListComponent } from '../../organisms/post-list/post-list.component';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { Posts } from '../../model/posts.model';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';

@Component({
  imports: [
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
    SpinnerComponent,
  ],
  selector: 'lib-feed-template',
  template: `
    <lib-navbar [avatar]="avatar"></lib-navbar>
    <main class="pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div class="max-w-screen-xl mx-auto">
        <lib-post-form (publishPost)="onPublishPost($event)" />
        @if (isLoading) {
        <lib-spinner />
        } @else {
        <lib-post-list [posts]="posts" />
        }
      </div>
    </main>
  `,
})
export class FeedTemplateComponent {
  @Input() avatar!: string;
  @Input() posts!: Posts;
  @Input() isLoading = false;

  onPublishPost(postForm: { postBox: string }) {
    // Sample only
  }
}

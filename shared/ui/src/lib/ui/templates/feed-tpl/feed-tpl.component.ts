import { Component } from '@angular/core';
import { PostFormComponent } from '../../organisms/post-form/post-form.component';
import { PostListComponent } from '../../organisms/post-list/post-list.component';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';

@Component({
  imports: [NavbarComponent, PostFormComponent, PostListComponent],
  selector: 'lib-feed-template',
  template: `
    <lib-navbar></lib-navbar>
    <main class="pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div class="max-w-screen-xl mx-auto">
        <lib-post-form></lib-post-form>
        <lib-post-list></lib-post-list>
      </div>
    </main>
  `,
})
export class FeedTemplateComponent {}

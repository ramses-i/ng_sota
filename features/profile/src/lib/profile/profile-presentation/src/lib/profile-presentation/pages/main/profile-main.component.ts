import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
} from '@ng-sota/ui';
import { ProfileMainFacade } from './profile-main.facade';

@Component({
  selector: 'lib-profile-main',
  imports: [
    CommonModule,
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
  ],
  template: `
    <lib-navbar></lib-navbar>
    <main class="pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div class="max-w-screen-xl mx-auto">
        <lib-post-form></lib-post-form>
        <lib-post-list [posts]="posts()"></lib-post-list>
      </div>
    </main>
  `,
})
export class ProfileMainComponent {
  posts = computed(() => this.controller.posts());

  constructor(private controller: ProfileMainFacade) {}
}

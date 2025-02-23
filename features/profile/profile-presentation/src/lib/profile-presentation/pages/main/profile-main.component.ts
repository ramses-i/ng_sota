import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
}from '@ng-sota/ui';
import { ProfileMainFacade } from './profile-main.facade';

@Component({
  selector: 'lib-profile-main',
  imports: [
    CommonModule,
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
  ],
  templateUrl: './profile-main.component.html',
})
export class ProfileMainComponent {
  posts = computed(() => this.controller.posts());

  constructor(private controller: ProfileMainFacade) {
    this.controller.getUserFeed();
  }

  onPublishPost(postForm: { postBox: string }) {
    this.controller.publishPost(postForm.postBox);
  }
}

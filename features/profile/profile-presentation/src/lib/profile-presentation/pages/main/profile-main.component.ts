import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
  SpinnerComponent,
} from '@ng-sota/ui';
import { ProfileMainFacade } from './profile-main.facade';

@Component({
  selector: 'lib-profile-main',
  imports: [
    CommonModule,
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
    SpinnerComponent,
  ],
  templateUrl: './profile-main.component.html',
})
export class ProfileMainComponent {
  errorMessage = computed(() => this.controller.errorMessage());
  isLoading = computed(() => this.controller.isLoading());
  posts = computed(() => this.controller.posts());
  avatar = computed(() => this.controller.avatar());

  constructor(private controller: ProfileMainFacade) {
    this.controller.getUserFeed();
  }

  onPublishPost(postForm: { postBox: string }) {
    this.controller.publishPost(postForm.postBox);
  }
}

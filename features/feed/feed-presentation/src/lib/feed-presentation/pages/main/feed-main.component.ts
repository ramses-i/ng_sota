import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
  SpinnerComponent,
} from '@ng-sota/ui';
import { FeedMainFacade } from './feed-main.facade';

@Component({
  selector: 'lib-feed-main',
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    PostFormComponent,
    PostListComponent,
  ],
  templateUrl: './feed-main.component.html',
  styleUrl: './feed-main.component.css',
})
export class FeedMainComponent {
  errorMessage = computed(() => this.controller.errorMessage());
  isLoading = computed(() => this.controller.isLoading());
  posts = computed(() => this.controller.posts());
  avatar = computed(() => this.controller.avatar());

  constructor(private controller: FeedMainFacade) {
    this.controller.getUserAvatar();
    this.controller.getFeed();
  }

  onPublishPost(postForm: { postBox: string }) {
    this.controller.publishPost(postForm.postBox);
  }
}

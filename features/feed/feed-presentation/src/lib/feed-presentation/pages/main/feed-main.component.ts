import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
}from '@ng-sota/ui';
import { FeedMainFacade } from './feed-main.facade';

@Component({
  selector: 'lib-feed-main',
  imports: [
    CommonModule,
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
  ],
  templateUrl: './feed-main.component.html',
  styleUrl: './feed-main.component.css',
})
export class FeedMainComponent {
  posts = computed(() => this.controller.posts());

  constructor(private controller: FeedMainFacade) {
    this.controller.getFeed();
  }
}

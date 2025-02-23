import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
} from 'shared/ui/src';
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
}

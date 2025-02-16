import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  PostFormComponent,
  PostListComponent,
} from '@ng-sota/ui';

@Component({
  selector: 'lib-profile-main',
  imports: [
    CommonModule,
    NavbarComponent,
    PostFormComponent,
    PostListComponent,
  ],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.css',
})
export class ProfileMainComponent {}

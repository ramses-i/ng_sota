import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';

@Component({
  selector: 'lib-user-profile-button',
  imports: [RouterLink, AvatarComponent],
  template: `
    <a [routerLink]="profileLink">
      <button
        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
      >
        <lib-avatar [src]="avatarUrl"></lib-avatar>
      </button>
    </a>
  `,
})
export class UserProfileButtonComponent {
  @Input() avatarUrl: string = 'https://i.pravatar.cc/150';
  @Input() profileLink: string = '/profile';
}

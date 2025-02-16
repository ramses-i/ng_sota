import { Component } from '@angular/core';
import { UserProfileButtonComponent } from '../../molecules/user-profile/user-profile.component';
import { NavItemComponent } from '../../molecules/nav-item/nav-item.component';

@Component({
  imports: [NavItemComponent, UserProfileButtonComponent],
  selector: 'lib-navbar',
  template: `
    <nav class="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
      >
        <lib-user-profile-button ></lib-user-profile-button>
        <ul class="hidden md:flex md:space-x-8">
          <lib-nav-item link="/feed" label="Home"></lib-nav-item>
        </ul>
      </div>
    </nav>
  `,
})
export class NavbarComponent {}

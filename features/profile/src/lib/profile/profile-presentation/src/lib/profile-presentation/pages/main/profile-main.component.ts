import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@ng-sota/ui';

@Component({
  selector: 'lib-profile-main',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.css',
})
export class ProfileMainComponent {
  constructor(private router: Router) {}

  onFeed() {
    this.router.navigate(['/feed']);
  }
}

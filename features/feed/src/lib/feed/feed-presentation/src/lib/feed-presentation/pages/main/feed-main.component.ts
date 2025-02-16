import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@ng-sota/ui';

@Component({
  selector: 'lib-feed-main',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './feed-main.component.html',
  styleUrl: './feed-main.component.css',
})
export class FeedMainComponent {
  constructor(private router: Router) {}

  onProfile() {
    this.router.navigate(['/profile']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-profile-presentation',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './profile-presentation.component.html',
  styleUrl: './profile-presentation.component.css',
})
export class ProfilePresentationComponent {}

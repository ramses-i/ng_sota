import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-login-presentation',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './login-presentation.component.html',
  styleUrl: './login-presentation.component.css',
})
export class LoginPresentationComponent {}

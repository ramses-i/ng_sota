import {Component, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMainFacade } from './login-main.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@ng-sota/ui';

@Component({
  selector: 'lib-login-main',
  imports: [CommonModule, ReactiveFormsModule, LoginFormComponent],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.css',
})
export class LoginMainComponent {

  error = computed(() => this.loginFacade.errorMessage());

  constructor(private loginFacade: LoginMainFacade) {}

  onLogin(credentials: { email: string; password: string }) {
    this.loginFacade.login(credentials.email, credentials.password);
  }

}

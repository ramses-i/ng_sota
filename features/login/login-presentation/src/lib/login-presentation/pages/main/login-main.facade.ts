import { Injectable, signal } from '@angular/core';
import { match } from 'fp-ts/Either';
import { Router } from '@angular/router';
import { AuthError, LoginUseCase } from 'libs/auth/auth-api/src';

@Injectable({ providedIn: 'root' })
export class LoginMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private loginUseCase: LoginUseCase, private router: Router) {}

  async login(email: string, password: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.loginUseCase.execute(email, password);

    match(
      (error: AuthError) => this.errorMessage.set(error.message),
      (isAuthorized: boolean) => {
        if (isAuthorized) {
          this.router.navigate(['/feed']);
        } else {
          console.error('Credentials were not authorized');
        }
      }
    )(result);

    this.isLoading.set(false);
  }
}

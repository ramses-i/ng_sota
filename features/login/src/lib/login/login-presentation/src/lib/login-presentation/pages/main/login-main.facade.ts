import { Injectable, signal } from '@angular/core';
import { LoginError, LoginUseCase } from '@ng-sota/login-domain';
import { match } from 'fp-ts/Either';
import { Router } from '@angular/router';
import { AuthService } from '@ng-sota/core';

@Injectable({ providedIn: 'root' })
export class LoginMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private loginUseCase: LoginUseCase,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/feed']);
    }
  }

  async login(email: string, password: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.loginUseCase.execute(email, password);

    match(
      (error: LoginError) => this.errorMessage.set(error.message),
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

import { Injectable, signal } from '@angular/core';
import { match } from 'fp-ts/Either';
import { Router } from '@angular/router';
import { AuthError, LogoutUseCase } from '@ng-sota/auth-api';

@Injectable({ providedIn: 'root' })
export class LogoutMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private logoutUseCase: LogoutUseCase, private router: Router) {}

  async logout() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const result = await this.logoutUseCase.execute();

    match(
      (error: AuthError) => this.errorMessage.set(error.message),
      (isCompleted: boolean) => {
        this.router.navigate(['/auth']);
        console.log('Logout completed: ' + isCompleted);
      }
    )(result);

    this.isLoading.set(false);
  }
}

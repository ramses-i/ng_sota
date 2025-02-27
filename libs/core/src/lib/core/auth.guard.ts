import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CheckSessionUseCase } from '@ng-sota/auth-api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private session: CheckSessionUseCase, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.session.execute().pipe(
      map((isAuthenticated) => {
        console.log(
          'AuthGuard: isAuthenticated:',
          isAuthenticated,
          'Ruta:',
          state.url
        );

        if (
          isAuthenticated &&
          state.url.startsWith('/auth') &&
          state.url !== '/auth/out'
        ) {
          this.router.navigate(['/feed']);
          return false;
        }

        if (!isAuthenticated && !state.url.startsWith('/auth')) {
          this.router.navigate(['/auth']);
          return false;
        }

        return true;
      }),
      first()
    );
  }
}

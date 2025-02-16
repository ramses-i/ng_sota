import { Route } from '@angular/router';
import { AuthGuard } from '@ng-sota/core';

export const appRoutes: Route[] = [
  {
    canActivate: [AuthGuard],
    path: 'auth',
    loadChildren: () => import('@ng-sota/login').then((m) => m.LoginModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'feed',
    loadChildren: () => import('@ng-sota/feed').then((m) => m.FeedModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'profile',
    loadChildren: () => import('@ng-sota/profile').then((m) => m.ProfileModule),
  },
  { path: '**', redirectTo: 'auth' },
];

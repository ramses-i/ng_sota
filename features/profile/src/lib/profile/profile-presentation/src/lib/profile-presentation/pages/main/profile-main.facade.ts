import { Injectable, signal } from '@angular/core';
import { Posts } from '@ng-sota/ui';

@Injectable({ providedIn: 'root' })
export class ProfileMainFacade {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  posts = signal<Posts>({ items: [] });
}

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { postDependencies } from '@ng-sota/posts';
import { authDependencies } from '@ng-sota/auth';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@ng-sota/supabase';
import { profileDependencies } from '@ng-sota/profile-impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: SupabaseClient, useValue: supabase },
    authDependencies,
    postDependencies,
    profileDependencies,
  ],
};

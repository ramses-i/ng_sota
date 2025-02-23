import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private supabase: SupabaseClient) {
    this.checkSession();
    this.listenToAuthChanges();
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Error al iniciar sesión: ' + JSON.stringify(error));
    }

    if (data.user) {
      this.userSubject.next(data.user);
    } else {
      throw new Error('No se recibió usuario en la respuesta de Supabase');
    }
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  currentUserId(): string {
    return this.userSubject.value?.id ?? '';
  }

  checkSession(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.supabase.auth
        .getSession()
        .then(({ data }) => {
          if (data.session) {
            this.userSubject.next(data.session.user);
          }
          observer.next(!!data.session);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error retrieving session:', error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  private listenToAuthChanges() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(
        'Auth change event:',
        event,
        'Session null?:',
        session != null
      );
      this.userSubject.next(session?.user ?? null);
    });
  }
}

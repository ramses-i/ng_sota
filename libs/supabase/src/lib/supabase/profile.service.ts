import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private supabase: SupabaseClient) {}

  async getProfile(userId: string) {
    return this.supabase.from('profile').select('*').eq('user_id', userId);
  }
}

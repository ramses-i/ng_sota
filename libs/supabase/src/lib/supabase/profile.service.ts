import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private supabase: SupabaseClient) {}

  async getAvatar(userId: string) {
    return this.supabase.from('profile').select('avatar').eq('user_id', userId);
  }
}

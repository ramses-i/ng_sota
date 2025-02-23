import { Injectable } from '@angular/core';
import { supabase } from './supabase.config';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async getProfile(userId: string) {
    return this.supabase.from('profile').select('*').eq('user_id', userId);
  }
}

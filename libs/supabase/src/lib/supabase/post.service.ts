import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase.config';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async getPosts() {
    return this.supabase.from('posts_with_users').select('*');
  }

  async getPostsByUser(userId: string) {
    return this.supabase
      .from('posts_with_users')
      .select('*')
      .eq('user_id', userId);
  }

  async createPost(userId: string, content: string) {
    return this.supabase
      .from('posts')
      .insert([
        {
          content: content,
          user_id: userId,
          device: 'Web',
          location: 'Location',
          tou_compliant: true,
        },
      ])
      .select();
  }
}

import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private supabase: SupabaseClient) {}

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

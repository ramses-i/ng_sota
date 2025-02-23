import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private supabase: SupabaseClient;

  constructor(private authService: AuthService) {
    this.supabase = supabase;
  }

  async getPosts() {
    return this.supabase.from('posts_with_users').select('*');
  }

  async getPostsByUser(userId: string) {
    const user = userId.length == 0 ? this.authService.currentUserId() : userId;
    return this.supabase
      .from('posts_with_users')
      .select('*')
      .eq('user_id', user);
  }

  async createPost(content: string) {
    const title = 'Title';
    const userId = this.authService.currentUserId();
    return this.supabase
      .from('posts')
      .insert([{ title, content, user_id: userId }]);
  }

  async deletePost(id: string) {
    return this.supabase.from('posts').delete().eq('id', id);
  }
}

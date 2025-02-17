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
    return this.supabase.from('posts').select('*');
  }

  async getPostsByUser(userId: string) {
    const currentUser = this.authService.currentUserId();
    if (userId.length == 0) {
      return this.supabase.from('posts').select('*').eq('id', currentUser);
    } else {
      return this.supabase.from('posts').select('*').eq('id', userId);
    }
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

import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../config/supabase.config';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async getPosts() {
    return this.supabase.from('posts').select('*');
  }

  async getPostById(id: string) {
    return this.supabase.from('posts').select('*').eq('id', id).single();
  }

  async createPost(title: string, content: string, userId: string) {
    return this.supabase
      .from('posts')
      .insert([{ title, content, user_id: userId }]);
  }

  async updatePost(id: string, title: string, content: string) {
    return this.supabase.from('posts').update({ title, content }).eq('id', id);
  }

  async deletePost(id: string) {
    return this.supabase.from('posts').delete().eq('id', id);
  }
}

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://myproject.supabase.co',
  'myprojectoken',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

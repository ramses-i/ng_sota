import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'URL',
  'TOKEN',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

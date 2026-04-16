import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Visitor tracking may not work.');
}

// Ensure the URL is a valid string before creating the client to prevent runtime crashes
const safeUrl = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://example.supabase.co';
const safeKey = supabaseAnonKey || 'missing-key';

export const supabase = createClient(safeUrl, safeKey);

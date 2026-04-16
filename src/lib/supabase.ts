import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Visitor tracking may not work.');
}

// Ensure the URL is a valid string before creating the client to prevent runtime crashes
const safeUrl = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://example.supabase.co';
const safeKey = supabaseAnonKey || 'missing-key';

// Basic validation to ensure the key looks like a Supabase JWT (starts with eyJ)
// This prevents 401 errors from obvious misconfigurations (e.g. using other service keys)
const isValidKey = supabaseAnonKey && (supabaseAnonKey.startsWith('eyJ') || supabaseAnonKey === 'missing-key');

if (!isValidKey && supabaseAnonKey) {
  console.warn('Supabase key format appears invalid. Expected a JWT (starting with "eyJ").');
}

export const supabase = createClient(
  safeUrl, 
  isValidKey ? safeKey : 'invalid-key-placeholder'
);

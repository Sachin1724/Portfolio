import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Note: We avoid throwing an error at the top level to allow the Next.js build 
// process to complete. Environment variables must be set in your host (Vercel) 
// for the application to function correctly at runtime.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

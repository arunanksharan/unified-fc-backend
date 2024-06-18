import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing environment variable SUPABASE_URL');
}
if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// export const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

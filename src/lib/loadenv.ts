export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const HUDDLE_API_KEY = process.env.HUDDLE_API_KEY || '';
export const HUDDLE_PROJECT_ID = process.env.HUDDLE_PROJECT_ID || '';
export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || '';
export const FARCASTER_DEVELOPER_MNEMONIC =
  process.env.FARCASTER_DEVELOPER_MNEMONIC || '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const POSTGRES_DB = process.env.POSTGRES_DB || '';
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const PGADMIN_DEFAULT_EMAIL = process.env.PGADMIN_DEFAULT_EMAIL || '';
export const PGADMIN_DEFAULT_PASSWORD =
  process.env.PGADMIN_DEFAULT_PASSWORD || '';

export const REDIS_HOST = process.env.REDIS_HOST || 'redis';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

export const NESTJS_PORT = process.env.NESTJS_PORT || '5000';
export const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '1d';

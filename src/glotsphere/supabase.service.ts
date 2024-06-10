// src/glotsphere/supabase.service.ts

import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );

  async saveToSuccessTable(data: any): Promise<void> {
    const { error } = await this.supabase.from('success_table').insert([data]);
    if (error) throw new Error(error.message);
  }

  async saveToFailureTable(data: any): Promise<void> {
    const { error } = await this.supabase.from('failure_table').insert([data]);
    if (error) throw new Error(error.message);
  }
}

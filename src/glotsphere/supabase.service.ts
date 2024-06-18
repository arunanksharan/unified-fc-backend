// src/glotsphere/supabase.service.ts

import { supabase } from '@/lib/supabase/supabase.client';
import { Injectable } from '@nestjs/common';
import {
  CreateTranslationRequestSupabaseType,
  SB_TABLE_TRANSLATED_TEXT,
  SB_TABLE_TRANSLATION_REQUEST,
  SB_TABLE_USER_SIGNERS,
  TranslatedTextType,
} from './types/types';
// import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = supabase;

  async createTranslationRequest({
    cast_text,
    languages,
    fid,
  }: CreateTranslationRequestSupabaseType): Promise<any> {
    const { data, error } = await this.supabase
      .from(SB_TABLE_TRANSLATION_REQUEST)
      .insert([{ cast_text, languages, fid }])
      .select();
    if (error) throw new Error(error.message);
    return data;
  }

  async saveTranslatedText(entries: TranslatedTextType[]): Promise<void> {
    const { data, error } = await this.supabase
      .from(SB_TABLE_TRANSLATED_TEXT)
      .insert(entries)
      .select();

    if (error) throw new Error(error.message);
    console.log('Translated text saved:', data);
  }

  async getSignerData(fid: string) {
    const { data, error } = await this.supabase
      .from(SB_TABLE_USER_SIGNERS)
      .select('*')
      .eq('fid', fid)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}

// src/glotsphere/supabase.service.ts
import {
  CreateSignerInDBDto,
  UserSignerSBResponseDto,
} from '@/glotsphere/dto/user-signer.dto';

import { supabase } from '@/lib/supabase/supabase.client';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import {
  SB_TABLE_TRANSLATED_TEXT,
  SB_TABLE_TRANSLATION_REQUEST,
  SB_TABLE_USER_SIGNERS,
} from './constants/constants';

import {
  CreateTranslationRequestSupabaseType,
  TranslatedTextType,
} from './types/types';

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

  async createSignerInDB(createSignerInDBDto: CreateSignerInDBDto) {
    console.log('createSignerInDBDto', createSignerInDBDto);

    console.log('saving in supabase user_signers....');
    console.log(createSignerInDBDto);
    const { data, error } = await this.supabase
      .from(SB_TABLE_USER_SIGNERS)
      .insert(createSignerInDBDto)
      .select();
    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async updateSignerInDB(signer_uuid: string) {
    console.log('updateSignerInDBDto', signer_uuid);
    const { data, error } = await this.supabase
      .from(SB_TABLE_USER_SIGNERS)
      .update({ status: 'approved' })
      .eq('signer_uuid', signer_uuid)
      .select();
    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async getSignerForFidFromDB(fid: string): Promise<UserSignerSBResponseDto[]> {
    // Todo: Add developer_fid filter to separate signers by app as well
    const { data, error }: PostgrestResponse<UserSignerSBResponseDto> =
      await this.supabase
        .from(SB_TABLE_USER_SIGNERS)
        .select('*')
        .eq('user_fid', fid);
    if (error) throw new Error(error.message);

    console.log('Inside SB service getSignerForFidFromDB:', data);

    return data;
  }
}

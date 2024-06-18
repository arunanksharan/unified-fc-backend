export type GPTTranslatedTextType = {
  [key: string]: string;
};

export type TranslatedTextType = {
  language: string;
  cast_text: string;
  is_translated: boolean;
  is_casted: false;
  request_id: string;
};

export type CreateTranslationRequestSupabaseType = {
  cast_text: string;
  languages: string;
  fid: string;
};

export type GetTranslationFromOpenaiRequest = {
  castText: string;
  languages: string[];
};

export const SB_TABLE_TRANSLATION_REQUEST = 'translation_request';
export const SB_TABLE_TRANSLATED_TEXT = 'translated_text';
export const SB_TABLE_USER_SIGNERS = 'user_signers';

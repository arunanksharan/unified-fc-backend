export type GPTTranslatedTextType = {
  [key: string]: string;
};

export type AssignedRoomType = {
  roomId: string;
  fid: string;
};

export type CreateNewRoomRequestSupabaseType = {
  roomId: string;
  roomStatus: 'VACANT | HALF | FULL';
  fid: string;
};

export const SB_TABLE_ROOMS = 'room';
export const SB_TABLE_ROOM_USER_MAPPING = 'room_user';
// export const SB_TABLE_TRANSLATED_TEXT = 'translated_text';
// export const SB_TABLE_USER_SIGNERS = 'user_signers';

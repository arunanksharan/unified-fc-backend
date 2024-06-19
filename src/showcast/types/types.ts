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

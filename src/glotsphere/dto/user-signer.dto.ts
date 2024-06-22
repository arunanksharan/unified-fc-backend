import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateSignerDto {
  @IsString()
  fid: string;
}

export class CreateSignerInDBDto {
  @IsString()
  signer_uuid: string;

  @IsString()
  public_key: string;

  @IsString()
  status: string;

  @IsString()
  signer_approval_url?: string;

  @IsString()
  developer_fid?: string;

  @IsString()
  user_fid?: string;
}

export class UserSignerGetResponseDto {
  @IsString()
  signer_uuid: string;

  @IsString()
  public_key: string;

  @IsString()
  status: string;

  @IsString()
  signer_approval_url?: string;

  @IsString()
  fid?: string;
}

export class UserSignerSBDto {
  @IsString()
  signer_uuid: string;

  @IsString()
  public_key: string;

  @IsString()
  status: string;

  @IsString()
  signer_approval_url?: string;

  @IsString()
  developer_fid?: string;

  @IsString()
  user_fid?: string;
}

export class UserSignerSBResponseDto {
  @IsUUID()
  id: string;

  @IsDateString()
  created_at: string;

  @IsString()
  signer_uuid: string;

  @IsString()
  public_key: string;

  @IsString()
  status: string;

  @IsString()
  signer_approval_url?: string;

  @IsString()
  developer_fid?: string;

  @IsString()
  user_fid?: string;
}

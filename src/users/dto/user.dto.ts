import { IsString } from 'class-validator';

export class CreateUserResponseDto {
  @IsString()
  id: string;

  @IsString()
  fid: string;

  @IsString()
  name?: string;

  @IsString()
  pfp?: string;
}

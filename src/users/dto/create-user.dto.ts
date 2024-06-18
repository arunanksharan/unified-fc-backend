import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fid: string;

  @IsString()
  name?: string;

  @IsString()
  pfp?: string;
}

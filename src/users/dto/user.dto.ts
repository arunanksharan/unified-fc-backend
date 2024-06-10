import { IsString } from 'class-validator';

export class UserWithApiKeyResponseDto {
  @IsString()
  id: string;

  @IsString()
  ethAddress: string;

  @IsString()
  domain: string;

  @IsString()
  apiKey: string;

  @IsString()
  apiSecret: string;
}

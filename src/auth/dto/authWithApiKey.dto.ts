import { IsString } from 'class-validator';

export class AuthWithApiKeyRequestDto {
  @IsString()
  apiKey: string;

  @IsString()
  apiSecret: string;
}

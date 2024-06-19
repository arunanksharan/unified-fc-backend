import { IsString } from 'class-validator';

// Redunadant since pulling this data from the request header
export class AuthWithApiKeyRequestDto {
  @IsString()
  'x-api-key': string;

  @IsString()
  'x-nonce': string;

  @IsString()
  'x-signature': string;
}

import { IsString } from 'class-validator';

export class DeveloperWithApiKeyResponseDto {
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

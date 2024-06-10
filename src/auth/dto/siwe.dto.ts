import { IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString()
  message: string;

  @IsString()
  signature: string;

  @IsString()
  domain: string;

  @IsString()
  nonce: string;

  @IsString()
  ethAddress: string;
}

export class SignupResponseDto {
  @IsString()
  message: string;

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

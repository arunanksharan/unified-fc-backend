import { IsString } from 'class-validator';

export class SignupDevRequestDto {
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

export class SignupDevResponseDto {
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

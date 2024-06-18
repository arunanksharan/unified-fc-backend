import { IsArray, IsString } from 'class-validator';

export class CreateCastDto {
  // two parameters - castText as string and languages as string[]
  @IsString()
  castText: string;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsString()
  fid: string;
}

export class CastByNeynarDto {
  @IsString()
  castText: string;

  @IsString()
  signerUuid: string;

  @IsString()
  fid: string;
}

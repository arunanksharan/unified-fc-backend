import { IsArray, IsString } from 'class-validator';

export class CreateGlotsphereDto {
  // two parameters - castText as string and languages as string[]
  @IsString()
  castText: string;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsString()
  fid: string;
}

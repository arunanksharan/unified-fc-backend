import { IsString } from 'class-validator';

export class CreateShowcastDto {
  @IsString()
  readonly fid: string;

  @IsString()
  readonly actionType: string;

  @IsString()
  readonly roomId: string;
}

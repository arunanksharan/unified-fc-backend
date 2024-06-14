import { PartialType } from '@nestjs/mapped-types';
import { DeveloperWithApiKeyResponseDto } from './create-developer.dto';

export class UpdateDeveloperDto extends PartialType(
  DeveloperWithApiKeyResponseDto,
) {}

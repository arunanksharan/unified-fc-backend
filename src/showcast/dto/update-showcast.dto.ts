import { PartialType } from '@nestjs/mapped-types';
import { CreateShowcastDto } from './create-showcast.dto';

export class UpdateShowcastDto extends PartialType(CreateShowcastDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCastDto } from './create-glotsphere.dto';

export class UpdateGlotsphereDto extends PartialType(CreateCastDto) {}

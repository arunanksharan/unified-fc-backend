import { PartialType } from '@nestjs/mapped-types';
import { CreateGlotsphereDto } from './create-glotsphere.dto';

export class UpdateGlotsphereDto extends PartialType(CreateGlotsphereDto) {}

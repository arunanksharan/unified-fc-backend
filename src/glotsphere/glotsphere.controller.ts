import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { CreateGlotsphereDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';

@Controller('glotsphere')
export class GlotsphereController {
  constructor(private readonly glotsphereService: GlotsphereService) {}

  @Post()
  create(@Body() createGlotsphereDto: CreateGlotsphereDto) {
    return this.glotsphereService.create(createGlotsphereDto);
  }

  @Get()
  findAll() {
    return this.glotsphereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.glotsphereService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGlotsphereDto: UpdateGlotsphereDto,
  ) {
    return this.glotsphereService.update(+id, updateGlotsphereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.glotsphereService.remove(+id);
  }
}

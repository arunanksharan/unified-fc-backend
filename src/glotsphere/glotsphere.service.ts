import { Injectable } from '@nestjs/common';
import { CreateGlotsphereDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';

@Injectable()
export class GlotsphereService {
  create(createGlotsphereDto: CreateGlotsphereDto) {
    return 'This action adds a new glotsphere';
  }

  findAll() {
    return `This action returns all glotsphere`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glotsphere`;
  }

  update(id: number, updateGlotsphereDto: UpdateGlotsphereDto) {
    return `This action updates a #${id} glotsphere`;
  }

  remove(id: number) {
    return `This action removes a #${id} glotsphere`;
  }
}

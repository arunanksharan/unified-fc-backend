import { Injectable } from '@nestjs/common';
import { CreateCastDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';

@Injectable()
export class GlotsphereService {
  create(createGlotsphereDto: CreateCastDto) {
    console.log('createGlotsphereDto', createGlotsphereDto);
    return 'This action adds a new glotsphere';
  }

  findAll() {
    return `This action returns all glotsphere`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glotsphere`;
  }

  update(id: number, updateGlotsphereDto: UpdateGlotsphereDto) {
    console.log('updateGlotsphereDto', updateGlotsphereDto);
    return `This action updates a #${id} glotsphere`;
  }

  remove(id: number) {
    return `This action removes a #${id} glotsphere`;
  }
}

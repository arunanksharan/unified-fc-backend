import { Injectable } from '@nestjs/common';
import { CreateShowcastDto } from './dto/create-showcast.dto';
import { UpdateShowcastDto } from './dto/update-showcast.dto';

@Injectable()
export class ShowcastService {
  create(createShowcastDto: CreateShowcastDto) {
    console.log('createShowcastDto', createShowcastDto);
    return 'This action adds a new showcast';
  }

  findAll() {
    return `This action returns all showcast`;
  }

  findOne(id: number) {
    return `This action returns a #${id} showcast`;
  }

  update(id: number, updateShowcastDto: UpdateShowcastDto) {
    console.log('updateShowcastDto', updateShowcastDto);
    return `This action updates a #${id} showcast`;
  }

  remove(id: number) {
    return `This action removes a #${id} showcast`;
  }
}

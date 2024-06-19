import { Injectable } from '@nestjs/common';
import { CreateShowcastDto } from './dto/create-showcast.dto';
import { UpdateShowcastDto } from './dto/update-showcast.dto';
import { SupabaseService } from './supabase.service';

@Injectable()
export class ShowcastService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAssignedRoom(fid: string) {
    console.log('fid', fid);
    const userRoom =
      await this.supabaseService.getCurrentlyAssignedUserRoom(fid);
    console.log('roomId in showcast service line 13', userRoom);
    const roomId = userRoom[0].room_id;
    return roomId;
  }
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

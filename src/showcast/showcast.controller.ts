import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShowcastService } from './showcast.service';
import { CreateShowcastDto } from './dto/create-showcast.dto';
import { UpdateShowcastDto } from './dto/update-showcast.dto';
import { QueueUserShowcastDto } from './dto/queue-showcast.dto';
import { BullQueueService } from './bull-queue.service';

@Controller('showcast')
export class ShowcastController {
  constructor(
    private readonly showcastService: ShowcastService,
    private readonly bullQueueService: BullQueueService,
  ) {}

  @Post('queue')
  async queue(@Body() queueShowcastDto: QueueUserShowcastDto) {
    const job = await this.bullQueueService.addUserToQueueJob(queueShowcastDto);
    return { message: 'Translation in progress', jobId: job.id };
  }

  @Get('getRoom')
  async getRoom(@Query('fid') fid: string) {
    console.log('fid in getRoom', fid);
    const roomId = await this.showcastService.getAssignedRoom(fid);
    return { roomId };
  }

  @Post()
  create(@Body() createShowcastDto: CreateShowcastDto) {
    return this.showcastService.create(createShowcastDto);
  }

  @Get()
  findAll() {
    return this.showcastService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showcastService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShowcastDto: UpdateShowcastDto,
  ) {
    return this.showcastService.update(+id, updateShowcastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showcastService.remove(+id);
  }
}

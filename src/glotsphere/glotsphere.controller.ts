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
import { BullQueueService } from './bull-queue.service';

/**
 * @dev GlotsphereController is a class that defines the routes for the Glotsphere service
 * Glotsphere service is used to convert the text into multiple languages using the Glotsphere service & post it to Farcaster using Neynar
 * Translation via ChatGPT takes upto 30 seconds. Hence, it is difficult to ensure realtime translation service.
 * Caster -> create(cast, languages) -> Bull Producer Queue -> Redis
 * Bull Consumer Queue -> GPT -> translated cast into Supabase -> post to Neynar -> Mark cast as posted
 */

@Controller('glotsphere')
export class GlotsphereController {
  constructor(
    private readonly glotsphereService: GlotsphereService,
    private readonly bullQueueService: BullQueueService,
  ) {}

  @Post()
  async create(@Body() createGlotsphereDto: CreateGlotsphereDto) {
    /**
     * @dev create mthod is called by the caster to convert the text into multiple languages using the Glotsphere service & post it to Farcaster using Neynar
     *
     * createGlotsphereDto is an object with two properties: castText and languages
     * castText is a string and languages is an array of strings
     *
     */
    const job =
      await this.bullQueueService.addTranslationJob(createGlotsphereDto);
    return { message: 'Translation in progress', jobId: job.id };
    // return this.glotsphereService.create(createGlotsphereDto);
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

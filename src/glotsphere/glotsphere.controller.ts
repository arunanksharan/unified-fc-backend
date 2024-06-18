import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { CreateCastDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';
import { BullQueueService } from './bull-queue.service';
import { APIKeyAuthGuard } from '@/auth/guard/apiKey-auth.guard';

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

  @UseGuards(APIKeyAuthGuard)
  @Get('test')
  async test() {
    return 'Testing Glotsphere Controller';
  }

  @UseGuards(APIKeyAuthGuard)
  @Post('create')
  async create(@Body() createCastDto: CreateCastDto) {
    /**
     * @dev create method is called by the caster to convert the text into multiple languages using the Glotsphere service & post it to Farcaster using Neynar
     *
     * createGlotsphereDto is an object with two properties: castText and languages
     * castText is a string and languages is an array of strings
     *
     */
    console.log('gs C-39-createGlotsphereDto', createCastDto);
    const job = await this.bullQueueService.addTranslationJob(createCastDto);
    return { message: 'Translation in progress', jobId: job.id };
  }

  /**
   * The below given CRUD operations are not being used right now.
   * This will be added over time as per the requirements.
   */
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

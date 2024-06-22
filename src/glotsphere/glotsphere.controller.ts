import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { CreateCastDto } from './dto/create-glotsphere.dto';
import { UpdateGlotsphereDto } from './dto/update-glotsphere.dto';
import { BullQueueService } from './bull-queue.service';
import { CreateSignerDto } from './dto/user-signer.dto';
import { NeynarService } from './neynar.service';
// import { APIKeyAuthGuard } from '@/auth/guard/apiKey-auth.guard';

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
    private readonly neynarService: NeynarService,
  ) {}

  // @UseGuards(APIKeyAuthGuard)
  @Get('test')
  async test() {
    return 'Testing Glotsphere Controller';
  }

  // @UseGuards(APIKeyAuthGuard)
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

  @Post('user/signer/create')
  async createSigner(@Body() createSignerDto: CreateSignerDto) {
    console.log('createSignerDto', createSignerDto);
    const signer = await this.glotsphereService.createSigner(createSignerDto);
    return { message: 'Signer created', signer: signer };
  }

  @Get('user/signer/get')
  async getSignerForFid(@Query('fid') fid: string) {
    console.log('signer_uuid inside gs control 66 /signer/get', fid);
    const signer = await this.glotsphereService.getSignerForFidFromDB(fid);
    console.log('Signer:', signer);

    return { message: 'Signer retrieved', signer: signer };
  }

  @Get('user/signer/update')
  async updateSigner(@Query('signer_uuid') signer_uuid: string) {
    const signer = await this.glotsphereService.updateSignerInDB(signer_uuid);
    return { message: 'Signer update', signer };
  }

  @Get('user/signer/get/status')
  async getSignerStatus(@Query('signer_uuid') signer_uuid: string) {
    const signer = await this.neynarService.getSignerStatus(signer_uuid);
    console.log('Status:', signer);
    return { message: 'Signer retrieved', signer };
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

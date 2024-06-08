// src/glotsphere/bull-queue.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateGlotsphereDto } from './dto/create-glotsphere.dto';
import { SupabaseService } from './supabase.service'; // Assume this service handles Supabase interactions
import { TranslationService } from './translation.service';

@Injectable()
export class BullQueueService implements OnModuleInit {
  constructor(
    @InjectQueue('translation')
    private readonly translationQueue: Queue,
    private readonly supabaseService: SupabaseService,
    private readonly translationService: TranslationService,
  ) {}

  onModuleInit() {
    this.processTranslationJobs();
  }

  async addTranslationJob(createCastDto: CreateGlotsphereDto) {
    return this.translationQueue.add(createCastDto);
  }

  async processTranslationJobs() {
    this.translationQueue.process(async (job) => {
      try {
        const { cast, languages, fid } = job.data;
        const translatedTexts = await this.translationService.getTranslation({
          cast,
          languagesArray: languages,
        });

        await this.supabaseService.saveToSuccessTable({
          cast,
          translatedTexts,
          fid,
        });
        await this.callNeynarsApi(cast, translatedTexts); // Placeholder for API call
        await job.remove();
      } catch (error) {
        console.error('Translation failed', error);
        await this.supabaseService.saveToFailureTable(job.data);
      }
    });
  }

  private async callNeynarsApi(
    cast: string,
    translatedTexts: any,
  ): Promise<void> {
    // Placeholder function to post data to Neynar's API
    // Implement the actual API calling logic here
    console.log('Posting data to Neynar API');
    console.log('Cast:', cast);
    console.log('Translated Texts:', translatedTexts);
  }
}

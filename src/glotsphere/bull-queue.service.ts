// src/glotsphere/bull-queue.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateCastDto, CastByNeynarDto } from './dto/create-glotsphere.dto';
import { SupabaseService } from './supabase.service';
import { TranslationService } from './translation.service';
import { GPTTranslatedTextType, TranslatedTextType } from './types/types';
import { NeynarService } from './neynar.service';

@Injectable()
export class BullQueueService implements OnModuleInit {
  constructor(
    @InjectQueue('translation')
    private readonly translationQueue: Queue,
    @InjectQueue('casting')
    private readonly castingQueue: Queue,
    private readonly supabaseService: SupabaseService,
    private readonly translationService: TranslationService,
    private readonly neynarService: NeynarService,
  ) {}

  onModuleInit() {
    this.processTranslationJobs();
    this.processCastingJobs();
  }

  async addTranslationJob(createCastDto: CreateCastDto) {
    /**
     * @dev addTranslationJob is called by /create route to add translation job to the queue
     */
    console.log('Adding translation job to queue', createCastDto);
    return this.translationQueue.add(createCastDto, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  async processTranslationJobs() {
    /**
     * @dev processTranslationJobs is called by onModuleInit to process translation jobs from the queue - it calls openai translation api with the prompt and returns the translated text - {"hindi": "translated text", "spanish": "translated text}
     */
    this.translationQueue.process(async (job) => {
      try {
        // Extract data from the job: castText, languages, fid
        const { castText, languages, fid } = job.data; // languages is an array here

        // Add to supabase translation_request table
        const languagesString = languages.join(', '); // languages column expects a comma separated string
        const request_data =
          await this.supabaseService.createTranslationRequest({
            cast_text: castText,
            languages: languagesString,
            fid,
          });
        console.log('Request data:', request_data);
        const requestId = await request_data[0].id;

        const translatedTexts: GPTTranslatedTextType =
          await this.translationService.getTranslation({
            castText,
            languages: languages,
          });
        console.log('Translated Texts:', translatedTexts);
        const entries: TranslatedTextType[] = Object.entries(
          translatedTexts,
        ).map(([language, translatedText]) => ({
          language: language,
          cast_text: translatedText,
          is_translated: true,
          is_casted: false,
          request_id: requestId as string,
        }));

        await this.supabaseService.saveTranslatedText(
          // SAMPLE_TRANSLATED_TEXTS,
          entries,
        );

        // Add to casting queue
        // fetch signer_uuid for fid
        const signer = await this.supabaseService.getSignerForFidFromDB(fid);
        // need tranlsated text, fid, signer_uuid
        // if (error) throw new Error(error.message);

        for (const entry of entries) {
          await this.addCastingJob({
            fid: fid,
            signerUuid: signer[0].signer_uuid,
            castText: entry.cast_text,
          });
        }
      } catch (error) {
        console.error('Translation failed', error);
      }
    });
  }

  async addCastingJob(castByNeynarDto: CastByNeynarDto) {
    console.log('Adding casting job to queue');
    return this.castingQueue.add(castByNeynarDto, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  async processCastingJobs() {
    console.log('Processing casting jobs');
    this.castingQueue.process(async (job) => {
      try {
        const { castText, signerUuid, fid } = job.data;

        // Add to casting queue
        // fetch signer_uuid for fid
        console.log('Casting job:', castText, signerUuid, fid);
        const resNeynar = await this.neynarService.publishCast(
          signerUuid,
          castText,
        );
        console.log('Neynar response:', resNeynar);
        if (resNeynar.status === 200) {
          // Update supabase with the casted text}
          console.log('Updating supabase with casted text');
        }
      } catch (error) {}
    });
  }
}

import { Module } from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { GlotsphereController } from './glotsphere.controller';
import { BullModule } from '@nestjs/bull';
import { BullQueueService } from './bull-queue.service';
import { TranslationService } from './translation.service';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'translation',
      // Additional configuration like Redis connection settings can go here
    }),
    // other imports
  ],
  controllers: [GlotsphereController],
  providers: [
    GlotsphereService,
    SupabaseService,
    BullQueueService,
    TranslationService,
  ],
})
export class GlotsphereModule {}

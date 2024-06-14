import { Module } from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { GlotsphereController } from './glotsphere.controller';
import { BullModule } from '@nestjs/bull';
import { BullQueueService } from './bull-queue.service';
import { TranslationService } from './translation.service';
import { SupabaseService } from './supabase.service';
import { NeynarService } from './neynar.service';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'translation',
      },
      { name: 'casting' },
    ),
  ],
  controllers: [GlotsphereController],
  providers: [
    GlotsphereService,
    SupabaseService,
    BullQueueService,
    TranslationService,
    NeynarService,
  ],
})
export class GlotsphereModule {}

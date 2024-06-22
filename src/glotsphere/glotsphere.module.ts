import { Module } from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { GlotsphereController } from './glotsphere.controller';
import { BullModule } from '@nestjs/bull';
import { BullQueueService } from './bull-queue.service';
import { TranslationService } from './translation.service';
import { NeynarService } from './neynar.service';
import { SupabaseService } from './supabase.service';

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
    BullQueueService,
    TranslationService,
    NeynarService,
    SupabaseService,
  ],
})
export class GlotsphereModule {}

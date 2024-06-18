import { Module } from '@nestjs/common';
import { ShowcastService } from './showcast.service';
import { ShowcastController } from './showcast.controller';
import { BullModule } from '@nestjs/bull';
import { SupabaseService } from './supabase.service';
import { BullQueueService } from './bull-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  controllers: [ShowcastController],
  providers: [ShowcastService, SupabaseService, BullQueueService],
})
export class ShowcastModule {}

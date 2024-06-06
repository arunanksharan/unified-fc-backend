import { Module } from '@nestjs/common';
import { GlotsphereService } from './glotsphere.service';
import { GlotsphereController } from './glotsphere.controller';

@Module({
  controllers: [GlotsphereController],
  providers: [GlotsphereService],
})
export class GlotsphereModule {}

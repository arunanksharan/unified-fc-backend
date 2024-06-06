import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlotsphereModule } from './glotsphere/glotsphere.module';

@Module({
  imports: [GlotsphereModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

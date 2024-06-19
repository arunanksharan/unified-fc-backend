import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlotsphereModule } from './glotsphere/glotsphere.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import { DeveloperModule } from './developer/developer.module';
import { ShowcastModule } from './showcast/showcast.module';
import { REDIS_PASSWORD } from './lib/loadenv';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: REDIS_PASSWORD,
      },
    }),
    GlotsphereModule,
    AuthModule,
    UsersModule,
    DeveloperModule,
    ShowcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

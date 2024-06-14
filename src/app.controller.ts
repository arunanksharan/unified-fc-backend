import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { APIKeyAuthGuard } from './auth/guard/apiKey-auth.guard';

@UseGuards(APIKeyAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

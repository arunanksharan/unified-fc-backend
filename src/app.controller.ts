import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { APIKeyAuthGuard } from './auth/guard/apiKey-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(APIKeyAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

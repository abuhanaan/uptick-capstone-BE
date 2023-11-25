import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/admin/home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatistics(): Object {
    return this.appService.getStats();
  }
}

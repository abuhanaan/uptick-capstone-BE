import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/admin/home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getStatistics(): Object {
    return this.appService.getStats();
  }
}

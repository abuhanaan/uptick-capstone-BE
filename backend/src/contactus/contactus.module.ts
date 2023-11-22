import { Module } from '@nestjs/common';
import { ContactusService } from './services/contactus.service';
import { ContactusController } from './controllers/contactus.controller';

@Module({
  controllers: [ContactusController],
  providers: [ContactusService],
})
export class ContactusModule {}

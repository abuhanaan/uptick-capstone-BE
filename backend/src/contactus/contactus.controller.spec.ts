import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './controllers/contactus.controller';
import { EmailService } from './services/contactus.service';

describe('ContactusController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [EmailService],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

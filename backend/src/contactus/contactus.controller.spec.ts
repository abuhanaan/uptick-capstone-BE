import { Test, TestingModule } from '@nestjs/testing';
import { ContactusController } from './controllers/contactus.controller';
import { ContactusService } from './services/contactus.service';

describe('ContactusController', () => {
  let controller: ContactusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactusController],
      providers: [ContactusService],
    }).compile();

    controller = module.get<ContactusController>(ContactusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

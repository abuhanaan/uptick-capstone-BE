import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsController } from './controllers/programs.controller';
import { ProgramsService } from './services/programs.service';

describe('ProgramsController', () => {
  let controller: ProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [ProgramsService],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

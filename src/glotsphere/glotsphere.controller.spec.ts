import { Test, TestingModule } from '@nestjs/testing';
import { GlotsphereController } from './glotsphere.controller';
import { GlotsphereService } from './glotsphere.service';

describe('GlotsphereController', () => {
  let controller: GlotsphereController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlotsphereController],
      providers: [GlotsphereService],
    }).compile();

    controller = module.get<GlotsphereController>(GlotsphereController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

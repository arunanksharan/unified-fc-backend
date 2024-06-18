import { Test, TestingModule } from '@nestjs/testing';
import { ShowcastController } from './showcast.controller';
import { ShowcastService } from './showcast.service';

describe('ShowcastController', () => {
  let controller: ShowcastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowcastController],
      providers: [ShowcastService],
    }).compile();

    controller = module.get<ShowcastController>(ShowcastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

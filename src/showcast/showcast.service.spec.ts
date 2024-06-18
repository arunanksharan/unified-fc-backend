import { Test, TestingModule } from '@nestjs/testing';
import { ShowcastService } from './showcast.service';

describe('ShowcastService', () => {
  let service: ShowcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowcastService],
    }).compile();

    service = module.get<ShowcastService>(ShowcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

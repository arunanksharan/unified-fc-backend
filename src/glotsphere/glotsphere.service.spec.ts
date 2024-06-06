import { Test, TestingModule } from '@nestjs/testing';
import { GlotsphereService } from './glotsphere.service';

describe('GlotsphereService', () => {
  let service: GlotsphereService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlotsphereService],
    }).compile();

    service = module.get<GlotsphereService>(GlotsphereService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

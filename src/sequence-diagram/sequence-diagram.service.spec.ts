import { Test, TestingModule } from '@nestjs/testing';
import { SequenceDiagramService } from './sequence-diagram.service';

describe('SequenceDiagramService', () => {
  let service: SequenceDiagramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SequenceDiagramService],
    }).compile();

    service = module.get<SequenceDiagramService>(SequenceDiagramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

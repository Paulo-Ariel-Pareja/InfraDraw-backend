import { Test, TestingModule } from '@nestjs/testing';
import { SequenceDiagramController } from './sequence-diagram.controller';
import { SequenceDiagramService } from './sequence-diagram.service';

describe('SequenceDiagramController', () => {
  let controller: SequenceDiagramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequenceDiagramController],
      providers: [SequenceDiagramService],
    }).compile();

    controller = module.get<SequenceDiagramController>(SequenceDiagramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

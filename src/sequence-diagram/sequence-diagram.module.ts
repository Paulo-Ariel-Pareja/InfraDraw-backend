import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceDiagramService } from './sequence-diagram.service';
import { SequenceDiagramController } from './sequence-diagram.controller';
import {
  SequenceDiagram,
  SequenceDiagramSchema,
} from './entities/sequence-diagram.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SequenceDiagram.name, schema: SequenceDiagramSchema },
    ]),
  ],
  controllers: [SequenceDiagramController],
  providers: [SequenceDiagramService],
})
export class SequenceDiagramModule {}

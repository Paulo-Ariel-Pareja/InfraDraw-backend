import { PartialType } from '@nestjs/mapped-types';
import { CreateSequenceDiagramDto } from './create-sequence-diagram.dto';

export class UpdateSequenceDiagramDto extends PartialType(CreateSequenceDiagramDto) {}

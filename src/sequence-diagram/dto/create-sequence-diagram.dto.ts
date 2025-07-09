import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSequenceDiagramDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  mermaidCode: string;

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  createdBy: string;
}

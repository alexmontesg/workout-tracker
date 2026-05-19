import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSetDto {
  @IsNumber()
  exerciseId!: number;

  @IsDateString()
  timestamp!: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  restTimeSeconds?: number;
}

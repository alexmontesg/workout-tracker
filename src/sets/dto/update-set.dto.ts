import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSetDto {
  @IsOptional()
  @IsNumber()
  exerciseId?: number;

  @IsOptional()
  @IsDateString()
  timestamp?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  restTimeSeconds?: number;
}

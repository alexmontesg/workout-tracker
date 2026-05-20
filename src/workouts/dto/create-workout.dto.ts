import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsDateString()
  date!: Date;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

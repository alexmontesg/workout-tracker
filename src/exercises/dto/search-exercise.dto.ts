import { IsNumber, IsOptional } from 'class-validator';

export class SearchExerciseDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  muscleId?: number;
}

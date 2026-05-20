import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

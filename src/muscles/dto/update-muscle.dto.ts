import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMuscleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}

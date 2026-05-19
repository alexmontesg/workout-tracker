import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExerciseTrackingType } from '../exercise.entity';

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  muscleIds?: number[];

  @IsOptional()
  @IsEnum(ExerciseTrackingType)
  type?: ExerciseTrackingType;
}

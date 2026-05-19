import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ExerciseTrackingType } from '../exercise.entity';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsNumber({}, { each: true })
  muscleIds!: number[];

  @IsEnum(ExerciseTrackingType)
  type!: ExerciseTrackingType;
}

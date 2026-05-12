import { MusclesEnum } from '../exercise.entity';

export class CreateExerciseDto {
  name!: string;
  muscles!: MusclesEnum[];
}

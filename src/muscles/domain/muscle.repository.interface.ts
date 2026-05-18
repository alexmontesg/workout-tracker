import { Muscle } from '../muscle.entity';
import { CreateMuscleDto } from '../dto/create-muscle.dto';
import { UpdateMuscleDto } from '../dto/update-muscle.dto';

export const MUSCLE_REPOSITORY = 'MUSCLE_REPOSITORY';

export interface IMuscleRepository {
  findAll(): Promise<Muscle[]>;
  findById(id: number): Promise<Muscle | null>;
  create(dto: CreateMuscleDto): Promise<Muscle>;
  update(muscle: Muscle, dto: UpdateMuscleDto): Promise<Muscle>;
  remove(muscle: Muscle): Promise<Muscle>;
  findLinkedExerciseCount(muscleId: number): Promise<number>;
}

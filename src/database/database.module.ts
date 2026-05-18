import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { Muscle } from '../muscles/muscle.entity';
import { TypeOrmExerciseRepository } from './repositories/typeorm-exercise.repository';
import { TypeOrmMuscleRepository } from './repositories/typeorm-muscle.repository';
import { EXERCISE_REPOSITORY } from '../exercises/domain/exercise.repository.interface';
import { MUSCLE_REPOSITORY } from '../muscles/domain/muscle.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Muscle])],
  providers: [
    { provide: EXERCISE_REPOSITORY, useClass: TypeOrmExerciseRepository },
    { provide: MUSCLE_REPOSITORY, useClass: TypeOrmMuscleRepository },
  ],
  exports: [EXERCISE_REPOSITORY, MUSCLE_REPOSITORY],
})
export class DatabaseModule {}

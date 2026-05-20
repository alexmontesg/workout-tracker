import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { Muscle } from '../muscles/muscle.entity';
import { Set } from '../sets/set.entity';
import { Serie } from '../series/serie.entity';
import { Workout } from '../workouts/workout.entity';
import { TypeOrmExerciseRepository } from './repositories/typeorm-exercise.repository';
import { TypeOrmMuscleRepository } from './repositories/typeorm-muscle.repository';
import { TypeOrmSetRepository } from './repositories/typeorm-set.repository';
import { TypeOrmSerieRepository } from './repositories/typeorm-serie.repository';
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository';
import { EXERCISE_REPOSITORY } from '../exercises/domain/exercise.repository.interface';
import { MUSCLE_REPOSITORY } from '../muscles/domain/muscle.repository.interface';
import { SET_REPOSITORY } from '../sets/domain/set.repository.interface';
import { SERIE_REPOSITORY } from '../series/domain/serie.repository.interface';
import { WORKOUT_REPOSITORY } from '../workouts/domain/workout.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Muscle, Set, Serie, Workout])],
  providers: [
    { provide: EXERCISE_REPOSITORY, useClass: TypeOrmExerciseRepository },
    { provide: MUSCLE_REPOSITORY, useClass: TypeOrmMuscleRepository },
    { provide: SET_REPOSITORY, useClass: TypeOrmSetRepository },
    { provide: SERIE_REPOSITORY, useClass: TypeOrmSerieRepository },
    { provide: WORKOUT_REPOSITORY, useClass: TypeOrmWorkoutRepository },
  ],
  exports: [
    EXERCISE_REPOSITORY,
    MUSCLE_REPOSITORY,
    SET_REPOSITORY,
    SERIE_REPOSITORY,
    WORKOUT_REPOSITORY,
  ],
})
export class DatabaseModule {}

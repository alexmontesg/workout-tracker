import { DataSource } from 'typeorm';
import {
  Exercise,
  ExerciseTrackingType,
  MusclesEnum,
} from '../../src/exercises/exercise.entity';

export async function seedExercises(dataSource: DataSource) {
  const repo = dataSource.getRepository(Exercise);

  const exercises = [
    {
      name: 'Bench Press',
      muscles: [MusclesEnum.CHEST, MusclesEnum.SHOULDER],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Squat',
      muscles: [MusclesEnum.LEGS],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Deadlift',
      muscles: [MusclesEnum.BACK, MusclesEnum.LEGS],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Pull Up',
      muscles: [MusclesEnum.BACK, MusclesEnum.SHOULDER],
      type: ExerciseTrackingType.BODYWEIGHT_REPS,
    },
    {
      name: 'Push Up',
      muscles: [MusclesEnum.CHEST, MusclesEnum.SHOULDER],
      type: ExerciseTrackingType.BODYWEIGHT_REPS,
    },
    {
      name: 'Plank',
      muscles: [MusclesEnum.CORE],
      type: ExerciseTrackingType.TIME,
    },
    {
      name: 'Running',
      muscles: [MusclesEnum.LEGS],
      type: ExerciseTrackingType.DISTANCE,
    },
  ];

  for (const exercise of exercises) {
    const exists = await repo.findOne({
      where: { name: exercise.name },
    });

    if (!exists) {
      await repo.save(repo.create(exercise));
    }
  }

  console.log('✅ Exercises seeded');
}

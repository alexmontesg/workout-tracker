import { DataSource } from 'typeorm';
import {
  Exercise,
  ExerciseTrackingType,
} from '../../src/exercises/exercise.entity';
import { Muscle } from '../../src/muscles/muscle.entity';

export async function seedExercises(dataSource: DataSource) {
  const exerciseRepo = dataSource.getRepository(Exercise);
  const muscleRepo = dataSource.getRepository(Muscle);

  const muscles = await muscleRepo.find();
  const muscleMap = new Map(muscles.map((m) => [m.name, m]));

  const exercises = [
    {
      name: 'Bench Press',
      muscleNames: ['chest', 'shoulder'],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Squat',
      muscleNames: ['legs'],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Deadlift',
      muscleNames: ['back', 'legs'],
      type: ExerciseTrackingType.WEIGHT_REPS,
    },
    {
      name: 'Pull Up',
      muscleNames: ['back', 'shoulder'],
      type: ExerciseTrackingType.BODYWEIGHT_REPS,
    },
    {
      name: 'Push Up',
      muscleNames: ['chest', 'shoulder'],
      type: ExerciseTrackingType.BODYWEIGHT_REPS,
    },
    {
      name: 'Plank',
      muscleNames: ['core'],
      type: ExerciseTrackingType.TIME,
    },
    {
      name: 'Running',
      muscleNames: ['legs'],
      type: ExerciseTrackingType.DISTANCE,
    },
  ];

  for (const exercise of exercises) {
    const exists = await exerciseRepo.findOne({
      where: { name: exercise.name },
    });

    if (!exists) {
      const muscles = exercise.muscleNames
        .map((name) => muscleMap.get(name))
        .filter(Boolean) as Muscle[];

      await exerciseRepo.save(
        exerciseRepo.create({
          name: exercise.name,
          muscles,
          type: exercise.type,
        }),
      );
    }
  }

  console.log('✅ Exercises seeded');
}

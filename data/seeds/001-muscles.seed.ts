import { DataSource } from 'typeorm';
import { Muscle } from '../../src/muscles/muscle.entity';

const muscleNames = ['chest', 'back', 'shoulder', 'legs', 'core'];

export async function seedMuscles(dataSource: DataSource) {
  const repo = dataSource.getRepository(Muscle);

  for (const name of muscleNames) {
    const exists = await repo.findOne({ where: { name } });
    if (!exists) {
      await repo.save(repo.create({ name }));
    }
  }

  console.log('✅ Muscles seeded');
}

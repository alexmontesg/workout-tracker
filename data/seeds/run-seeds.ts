import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { seedMuscles } from './001-muscles.seed';
import { seedExercises } from './002-exercises.seed';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  await seedMuscles(dataSource);
  await seedExercises(dataSource);
  await app.close();
}

run().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

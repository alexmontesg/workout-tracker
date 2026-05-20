import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { Application } from 'express';
import request from 'supertest';
import { DatabaseModule } from '../src/database/database.module';
import { ExercisesModule } from '../src/exercises/exercises.module';
import { MusclesModule } from '../src/muscles/muscles.module';
import { SetsModule } from '../src/sets/sets.module';
import { SeriesModule } from '../src/series/series.module';
import { WorkoutsModule } from '../src/workouts/workouts.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
        }),
        DatabaseModule,
        ExercisesModule,
        MusclesModule,
        SetsModule,
        SeriesModule,
        WorkoutsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /exercises returns 200 and an empty array', async () => {
    const server = app.getHttpServer() as Application;
    const response = await request(server).get('/exercises');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('GET /muscles returns 200 and an empty array', async () => {
    const server = app.getHttpServer() as Application;
    const response = await request(server).get('/muscles');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /workouts creates a workout and returns it', async () => {
    const server = app.getHttpServer() as Application;
    const response = await request(server)
      .post('/workouts')
      .send({ date: '2026-05-20T10:00:00Z', name: 'Morning Push' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: 'Morning Push',
      endDate: null,
    });
    expect(response.body.id).toBeDefined();
    expect(response.body.sets).toEqual([]);
  });

  it('POST /workouts sets default name when not provided', async () => {
    const server = app.getHttpServer() as Application;
    const response = await request(server)
      .post('/workouts')
      .send({ date: '2026-05-20T10:00:00Z' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Workout on 2026-05-20');
  });

  it('GET /workouts returns all workouts', async () => {
    const server = app.getHttpServer() as Application;
    const response = await request(server).get('/workouts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /workouts/:id returns a workout', async () => {
    const server = app.getHttpServer() as Application;
    const createRes = await request(server)
      .post('/workouts')
      .send({ date: '2026-05-20T10:00:00Z' });
    const workoutId = createRes.body.id;

    const response = await request(server).get(`/workouts/${workoutId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(workoutId);
  });

  it('DELETE /workouts/:id deletes a workout', async () => {
    const server = app.getHttpServer() as Application;
    const createRes = await request(server)
      .post('/workouts')
      .send({ date: '2026-05-20T10:00:00Z' });
    const workoutId = createRes.body.id;

    const response = await request(server).delete(`/workouts/${workoutId}`);

    expect(response.status).toBe(200);

    const getRes = await request(server).get(`/workouts/${workoutId}`);
    expect(getRes.status).toBe(404);
  });

  it('POST /workouts/:workoutId/sets creates a set in the workout', async () => {
    const server = app.getHttpServer() as Application;

    const exerciseRes = await request(server)
      .post('/exercises')
      .send({
        name: 'Bench Press',
        type: 'weight_reps',
        muscleIds: [],
      });
    const exerciseId = exerciseRes.body.id;

    const workoutRes = await request(server)
      .post('/workouts')
      .send({ date: '2026-05-20T10:00:00Z' });
    const workoutId = workoutRes.body.id;

    const response = await request(server)
      .post(`/workouts/${workoutId}/sets`)
      .send({
        exerciseId,
        timestamp: '2026-05-20T10:05:00Z',
        notes: 'First set',
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      notes: 'First set',
    });
  });
});

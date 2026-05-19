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
});

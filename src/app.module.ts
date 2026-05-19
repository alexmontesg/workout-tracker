import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { SetsModule } from './sets/sets.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DatabaseModule,
    ExercisesModule,
    MusclesModule,
    SetsModule,
    SeriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

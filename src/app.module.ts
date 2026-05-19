import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { SeriesModule } from './series/series.module';
import { SetsModule } from './sets/sets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3',
        database: config.get<string>('database.path')!,
        autoLoadEntities: true,
        synchronize: config.get<boolean>('database.synchronize')!,
      }),
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

import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { Muscle } from '../muscles/muscle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Muscle])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}

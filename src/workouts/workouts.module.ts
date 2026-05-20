import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SetsModule } from '../sets/sets.module';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { WorkoutSetsController } from './workout-sets.controller';

@Module({
  imports: [DatabaseModule, SetsModule],
  controllers: [WorkoutsController, WorkoutSetsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}

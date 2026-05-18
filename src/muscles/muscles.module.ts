import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muscle } from './muscle.entity';
import { Exercise } from '../exercises/exercise.entity';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Muscle, Exercise])],
  controllers: [MusclesController],
  providers: [MusclesService],
})
export class MusclesModule {}

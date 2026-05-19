import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}

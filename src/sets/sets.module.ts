import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [SetsService],
  exports: [SetsService],
})
export class SetsModule {}

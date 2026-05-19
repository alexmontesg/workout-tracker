import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SetsController],
  providers: [SetsService],
  exports: [SetsService],
})
export class SetsModule {}

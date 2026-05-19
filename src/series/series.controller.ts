import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Controller('sets/:setId/series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  async getBySetId(@Param('setId') setId: number) {
    return await this.seriesService.getBySetId(setId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.seriesService.getOne(id);
  }

  @Post()
  async create(
    @Param('setId') setId: number,
    @Body() dto: CreateSerieDto,
  ) {
    return await this.seriesService.create(setId, dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSerieDto,
  ) {
    return await this.seriesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.seriesService.remove(id);
  }
}

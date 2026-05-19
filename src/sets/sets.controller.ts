import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Get()
  async getAll() {
    return await this.setsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.setsService.getOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSetDto) {
    return await this.setsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateSetDto) {
    return await this.setsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.setsService.remove(id);
  }
}

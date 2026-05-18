import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';

@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Get()
  async findAll() {
    return await this.musclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.musclesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateMuscleDto) {
    return await this.musclesService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateMuscleDto) {
    return await this.musclesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.musclesService.remove(id);
  }
}

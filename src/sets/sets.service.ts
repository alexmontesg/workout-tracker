import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ISetRepository } from './domain/set.repository.interface';
import { SET_REPOSITORY } from './domain/set.repository.interface';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Injectable()
export class SetsService {
  constructor(
    @Inject(SET_REPOSITORY)
    private readonly setRepository: ISetRepository,
  ) {}

  async getAll() {
    return await this.setRepository.findAll();
  }

  async getOne(id: number) {
    const set = await this.setRepository.findById(id);
    if (!set) throw new NotFoundException(`Set #${id} not found`);
    return set;
  }

  async create(dto: CreateSetDto) {
    return await this.setRepository.create(dto);
  }

  async update(id: number, dto: UpdateSetDto) {
    const set = await this.getOne(id);
    if (
      dto.exerciseId !== undefined &&
      dto.exerciseId !== set.exercise.id &&
      set.series.length > 0
    ) {
      throw new BadRequestException(
        'Cannot change exercise after series have been added to the set',
      );
    }
    return await this.setRepository.update(set, dto);
  }

  async remove(id: number) {
    const set = await this.getOne(id);
    return await this.setRepository.remove(set);
  }
}

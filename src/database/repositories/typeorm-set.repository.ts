import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Set } from '../../sets/set.entity';
import { ISetRepository } from '../../sets/domain/set.repository.interface';
import { CreateSetDto } from '../../sets/dto/create-set.dto';
import { UpdateSetDto } from '../../sets/dto/update-set.dto';

@Injectable()
export class TypeOrmSetRepository implements ISetRepository {
  constructor(
    @InjectRepository(Set)
    private readonly repo: Repository<Set>,
  ) {}

  async findAll(): Promise<Set[]> {
    return await this.repo.find({
      relations: ['exercise', 'series'],
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Set | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['exercise', 'series'],
    });
  }

  async create(dto: CreateSetDto): Promise<Set> {
    const set = this.repo.create({
      exercise: { id: dto.exerciseId },
      timestamp: dto.timestamp,
      notes: dto.notes ?? null,
      restTimeSeconds: dto.restTimeSeconds ?? null,
      series: [],
    });
    return await this.repo.save(set);
  }

  async update(set: Set, dto: UpdateSetDto): Promise<Set> {
    const update: Record<string, unknown> = {};
    if (dto.exerciseId !== undefined) update.exercise = { id: dto.exerciseId };
    if (dto.timestamp !== undefined) update.timestamp = dto.timestamp;
    if (dto.notes !== undefined) update.notes = dto.notes;
    if (dto.restTimeSeconds !== undefined)
      update.restTimeSeconds = dto.restTimeSeconds;

    Object.assign(set, update);
    return await this.repo.save(set);
  }

  async remove(set: Set): Promise<Set> {
    return await this.repo.remove(set);
  }
}

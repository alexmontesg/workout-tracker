import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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

  private getRepo(entityManager?: EntityManager): Repository<Set> {
    return entityManager ? entityManager.getRepository(Set) : this.repo;
  }

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

  async create(dto: CreateSetDto, entityManager?: EntityManager): Promise<Set> {
    const repo = this.getRepo(entityManager);
    const set = repo.create({
      exercise: { id: dto.exerciseId },
      timestamp: dto.timestamp,
      notes: dto.notes ?? null,
      restTimeSeconds: dto.restTimeSeconds ?? null,
      series: [],
    });
    return await repo.save(set);
  }

  async update(
    set: Set,
    dto: UpdateSetDto,
    entityManager?: EntityManager,
  ): Promise<Set> {
    const repo = this.getRepo(entityManager);
    const update: Record<string, unknown> = {};
    if (dto.exerciseId !== undefined) update.exercise = { id: dto.exerciseId };
    if (dto.timestamp !== undefined) update.timestamp = dto.timestamp;
    if (dto.notes !== undefined) update.notes = dto.notes;
    if (dto.restTimeSeconds !== undefined)
      update.restTimeSeconds = dto.restTimeSeconds;

    Object.assign(set, update);
    return await repo.save(set);
  }

  async remove(set: Set, entityManager?: EntityManager): Promise<Set> {
    const repo = this.getRepo(entityManager);
    return await repo.remove(set);
  }
}

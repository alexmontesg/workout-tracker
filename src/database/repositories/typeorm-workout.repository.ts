import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Workout } from '../../workouts/workout.entity';
import { IWorkoutRepository } from '../../workouts/domain/workout.repository.interface';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from '../../workouts/dto/update-workout.dto';

@Injectable()
export class TypeOrmWorkoutRepository implements IWorkoutRepository {
  constructor(
    @InjectRepository(Workout)
    private readonly repo: Repository<Workout>,
  ) {}

  private getRepo(entityManager?: EntityManager): Repository<Workout> {
    return entityManager ? entityManager.getRepository(Workout) : this.repo;
  }

  async findAll(): Promise<Workout[]> {
    return await this.repo.find({
      relations: ['sets', 'sets.series', 'sets.exercise'],
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Workout | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['sets', 'sets.series', 'sets.exercise'],
    });
  }

  async create(
    dto: CreateWorkoutDto,
    entityManager?: EntityManager,
  ): Promise<Workout> {
    const repo = this.getRepo(entityManager);
    const workout = repo.create({
      date: dto.date,
      endDate: null,
      name: dto.name,
      notes: dto.notes ?? null,
      sets: [],
    });
    return await repo.save(workout);
  }

  async update(
    workout: Workout,
    dto: UpdateWorkoutDto,
    entityManager?: EntityManager,
  ): Promise<Workout> {
    const repo = this.getRepo(entityManager);
    const update: Record<string, unknown> = {};
    if (dto.name !== undefined) update.name = dto.name;
    if (dto.notes !== undefined) update.notes = dto.notes;

    Object.assign(workout, update);
    return await repo.save(workout);
  }

  async remove(
    workout: Workout,
    entityManager?: EntityManager,
  ): Promise<Workout> {
    const repo = this.getRepo(entityManager);
    return await repo.remove(workout);
  }
}

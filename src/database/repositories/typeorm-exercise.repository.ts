import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from '../../exercises/exercise.entity';
import { Muscle } from '../../muscles/muscle.entity';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository.interface';
import { CreateExerciseDto } from '../../exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from '../../exercises/dto/update-exercise.dto';
import { SearchExerciseDto } from '../../exercises/dto/search-exercise.dto';

@Injectable()
export class TypeOrmExerciseRepository implements IExerciseRepository {
  constructor(
    @InjectRepository(Exercise)
    private readonly repo: Repository<Exercise>,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return await this.repo.find({ relations: ['muscles'] });
  }

  async search({ muscleId, id }: SearchExerciseDto): Promise<Exercise[]> {
    const qb = this.repo
      .createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.muscles', 'muscle');

    if (id) {
      qb.andWhere('exercise.id = :id', { id });
    }

    if (muscleId) {
      const subQuery = qb
        .subQuery()
        .select('e.id')
        .from(Exercise, 'e')
        .leftJoin('e.muscles', 'm')
        .where('m.id = :muscleId')
        .getQuery();
      qb.andWhere(`exercise.id IN ${subQuery}`, { muscleId });
    }

    return await qb.getMany();
  }

  async findById(id: number): Promise<Exercise | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['muscles'],
    });
  }

  async create(dto: CreateExerciseDto): Promise<Exercise> {
    const { muscleIds, ...rest } = dto;
    const muscles = await this.repo.manager
      .getRepository(Muscle)
      .findBy({ id: In(muscleIds) });
    if (muscles.length !== muscleIds.length) {
      throw new NotFoundException('One or more muscle IDs not found');
    }
    const exercise = this.repo.create({ ...rest, muscles });
    return await this.repo.save(exercise);
  }

  async update(exercise: Exercise, dto: UpdateExerciseDto): Promise<Exercise> {
    const { muscleIds, ...rest } = dto;
    Object.assign(exercise, rest);
    if (muscleIds) {
      const muscles = await this.repo.manager
        .getRepository(Muscle)
        .findBy({ id: In(muscleIds) });
      if (muscles.length !== muscleIds.length) {
        throw new NotFoundException('One or more muscle IDs not found');
      }
      exercise.muscles = muscles;
    }
    return await this.repo.save(exercise);
  }

  async remove(exercise: Exercise): Promise<Exercise> {
    return await this.repo.remove(exercise);
  }

  async findByIds(ids: number[]): Promise<Muscle[]> {
    return await this.repo.manager
      .getRepository(Muscle)
      .findBy({ id: In(ids) });
  }
}

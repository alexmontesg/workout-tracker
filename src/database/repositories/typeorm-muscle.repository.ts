import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muscle } from '../../muscles/muscle.entity';
import { Exercise } from '../../exercises/exercise.entity';
import { IMuscleRepository } from '../../muscles/domain/muscle.repository.interface';
import { CreateMuscleDto } from '../../muscles/dto/create-muscle.dto';
import { UpdateMuscleDto } from '../../muscles/dto/update-muscle.dto';

@Injectable()
export class TypeOrmMuscleRepository implements IMuscleRepository {
  constructor(
    @InjectRepository(Muscle)
    private readonly repo: Repository<Muscle>,
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>,
  ) {}

  async findAll(): Promise<Muscle[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Muscle | null> {
    return await this.repo.findOneBy({ id });
  }

  async create(dto: CreateMuscleDto): Promise<Muscle> {
    return await this.repo.save(dto);
  }

  async update(muscle: Muscle, dto: UpdateMuscleDto): Promise<Muscle> {
    Object.assign(muscle, dto);
    return await this.repo.save(muscle);
  }

  async remove(muscle: Muscle): Promise<Muscle> {
    return await this.repo.remove(muscle);
  }

  async findLinkedExerciseCount(muscleId: number): Promise<number> {
    const count = await this.exerciseRepo
      .createQueryBuilder('exercise')
      .leftJoin('exercise.muscles', 'muscle')
      .where('muscle.id = :id', { id: muscleId })
      .getCount();
    return count;
  }
}

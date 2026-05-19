import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from '../../series/serie.entity';
import { ISerieRepository } from '../../series/domain/serie.repository.interface';
import { CreateSerieDto } from '../../series/dto/create-serie.dto';
import { UpdateSerieDto } from '../../series/dto/update-serie.dto';

@Injectable()
export class TypeOrmSerieRepository implements ISerieRepository {
  constructor(
    @InjectRepository(Serie)
    private readonly repo: Repository<Serie>,
  ) {}

  async findBySetId(setId: number): Promise<Serie[]> {
    return await this.repo.find({
      where: { set: { id: setId } },
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Serie | null> {
    return await this.repo.findOne({ where: { id }, relations: ['set'] });
  }

  async create(dto: CreateSerieDto & { setId: number }): Promise<Serie> {
    const { setId, ...rest } = dto;
    const serie = this.repo.create({
      ...rest,
      set: { id: setId },
      reps: rest.reps ?? null,
      weight: rest.weight ?? null,
      durationSeconds: rest.durationSeconds ?? null,
      meters: rest.meters ?? null,
    });
    return await this.repo.save(serie);
  }

  async update(serie: Serie, dto: UpdateSerieDto): Promise<Serie> {
    const update: Record<string, unknown> = {};
    if (dto.type !== undefined) update.type = dto.type;
    if (dto.reps !== undefined) update.reps = dto.reps;
    if (dto.weight !== undefined) update.weight = dto.weight;
    if (dto.durationSeconds !== undefined)
      update.durationSeconds = dto.durationSeconds;
    if (dto.meters !== undefined) update.meters = dto.meters;

    Object.assign(serie, update);
    return await this.repo.save(serie);
  }

  async remove(serie: Serie): Promise<Serie> {
    return await this.repo.remove(serie);
  }
}

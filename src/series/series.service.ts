import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ISerieRepository } from './domain/serie.repository.interface';
import { SERIE_REPOSITORY } from './domain/serie.repository.interface';
import type { ISetRepository } from '../sets/domain/set.repository.interface';
import { SET_REPOSITORY } from '../sets/domain/set.repository.interface';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { ExerciseTrackingType } from '../exercises/exercise.entity';

@Injectable()
export class SeriesService {
  constructor(
    @Inject(SERIE_REPOSITORY)
    private readonly serieRepository: ISerieRepository,
    @Inject(SET_REPOSITORY)
    private readonly setRepository: ISetRepository,
  ) {}

  async getBySetId(setId: number) {
    return await this.serieRepository.findBySetId(setId);
  }

  async getOne(id: number) {
    const serie = await this.serieRepository.findById(id);
    if (!serie) throw new NotFoundException(`Serie #${id} not found`);
    return serie;
  }

  async create(setId: number, dto: CreateSerieDto) {
    const set = await this.setRepository.findById(setId);
    if (!set) throw new NotFoundException(`Set #${setId} not found`);

    this.validateFields(set.exercise.type, dto);

    return await this.serieRepository.create({ ...dto, setId });
  }

  async update(id: number, dto: UpdateSerieDto) {
    const serie = await this.getOne(id);
    return await this.serieRepository.update(serie, dto);
  }

  async remove(id: number) {
    const serie = await this.getOne(id);
    return await this.serieRepository.remove(serie);
  }

  private validateFields(
    trackingType: ExerciseTrackingType,
    dto: CreateSerieDto,
  ) {
    switch (trackingType) {
      case ExerciseTrackingType.TIME:
        if (dto.durationSeconds === undefined) {
          throw new BadRequestException(
            'Time-based exercises require durationSeconds',
          );
        }
        if (dto.weight !== undefined || dto.reps !== undefined || dto.meters !== undefined) {
          throw new BadRequestException(
            'Time-based exercises only accept durationSeconds',
          );
        }
        break;

      case ExerciseTrackingType.WEIGHT_REPS:
        if (dto.weight === undefined || dto.reps === undefined) {
          throw new BadRequestException(
            'Weight/reps exercises require weight and reps',
          );
        }
        if (dto.durationSeconds !== undefined || dto.meters !== undefined) {
          throw new BadRequestException(
            'Weight/reps exercises only accept weight and reps',
          );
        }
        break;

      case ExerciseTrackingType.BODYWEIGHT_REPS:
        if (dto.reps === undefined) {
          throw new BadRequestException(
            'Bodyweight exercises require reps',
          );
        }
        if (
          dto.weight !== undefined ||
          dto.durationSeconds !== undefined ||
          dto.meters !== undefined
        ) {
          throw new BadRequestException(
            'Bodyweight exercises only accept reps',
          );
        }
        break;

      case ExerciseTrackingType.DISTANCE:
        if (dto.meters === undefined) {
          throw new BadRequestException(
            'Distance exercises require meters',
          );
        }
        if (
          dto.weight !== undefined ||
          dto.reps !== undefined ||
          dto.durationSeconds !== undefined
        ) {
          throw new BadRequestException(
            'Distance exercises only accept meters',
          );
        }
        break;

      case ExerciseTrackingType.ASSISTED:
        if (dto.weight === undefined || dto.reps === undefined) {
          throw new BadRequestException(
            'Assisted exercises require weight and reps',
          );
        }
        if (dto.durationSeconds !== undefined || dto.meters !== undefined) {
          throw new BadRequestException(
            'Assisted exercises only accept weight and reps',
          );
        }
        break;
    }
  }
}

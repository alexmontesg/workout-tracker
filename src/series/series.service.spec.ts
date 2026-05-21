import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { SeriesService } from './series.service';
import {
  SERIE_REPOSITORY,
  ISerieRepository,
} from './domain/serie.repository.interface';
import {
  SET_REPOSITORY,
  ISetRepository,
} from '../sets/domain/set.repository.interface';
import { Serie, SerieType } from './serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { ExerciseTrackingType } from '../exercises/exercise.entity';
import { Set } from '../sets/set.entity';

function createMockSerieRepository(): jest.Mocked<ISerieRepository> {
  return {
    findBySetId: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
}

function createMockSetRepository(): jest.Mocked<ISetRepository> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByWorkoutId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
}

function createSerie(overrides?: Partial<Serie>): Serie {
  return {
    id: 1,
    set: { id: 1 } as Set,
    type: SerieType.EFFECTIVE,
    reps: null,
    weight: null,
    durationSeconds: null,
    meters: null,
    ...overrides,
  };
}

function createSet(overrides?: Partial<Set>): Set {
  return {
    id: 1,
    workout: { id: 1 } as Set['workout'],
    exercise: { id: 1, name: 'Test', type: 'weight_reps', muscles: [] },
    timestamp: new Date('2026-01-01'),
    notes: null,
    restTimeSeconds: null,
    series: [],
    ...overrides,
  } as Set;
}

describe('SeriesService', () => {
  let service: SeriesService;
  let serieRepo: jest.Mocked<ISerieRepository>;
  let setRepo: jest.Mocked<ISetRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        { provide: SERIE_REPOSITORY, useValue: createMockSerieRepository() },
        { provide: SET_REPOSITORY, useValue: createMockSetRepository() },
      ],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
    serieRepo = module.get<jest.Mocked<ISerieRepository>>(SERIE_REPOSITORY);
    setRepo = module.get<jest.Mocked<ISetRepository>>(SET_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBySetId', () => {
    it('should return all series for a set', async () => {
      const series = [createSerie({ id: 1 }), createSerie({ id: 2 })];
      serieRepo.findBySetId.mockResolvedValue(series);

      const result = await service.getBySetId(1);

      expect(result).toEqual(series);
    });
  });

  describe('getOne', () => {
    it('should return the serie when found', async () => {
      const serie = createSerie({ id: 1 });
      serieRepo.findById.mockResolvedValue(serie);

      const result = await service.getOne(1);

      expect(result).toEqual(serie);
    });

    it('should throw NotFoundException when not found', async () => {
      serieRepo.findById.mockResolvedValue(null);

      await expect(service.getOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should accept durationSeconds for time exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Plank',
          type: ExerciseTrackingType.TIME,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = {
        type: SerieType.EFFECTIVE,
        durationSeconds: 60,
      };
      const created = createSerie({ id: 1, durationSeconds: 60 });
      serieRepo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should reject non-durationSeconds fields for time exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Plank',
          type: ExerciseTrackingType.TIME,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = {
        type: SerieType.EFFECTIVE,
        weight: 80,
        reps: 10,
      };

      await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
    });

    it('should accept weight and reps for weight_reps exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Bench Press',
          type: ExerciseTrackingType.WEIGHT_REPS,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = {
        type: SerieType.EFFECTIVE,
        weight: 80,
        reps: 10,
      };
      const created = createSerie({ id: 1, weight: 80, reps: 10 });
      serieRepo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should reject missing weight for weight_reps exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Bench Press',
          type: ExerciseTrackingType.WEIGHT_REPS,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, reps: 10 };

      await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
    });

    it('should accept reps only for bodyweight_reps exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Push Up',
          type: ExerciseTrackingType.BODYWEIGHT_REPS,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, reps: 20 };
      const created = createSerie({ id: 1, reps: 20 });
      serieRepo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should reject extra fields for bodyweight_reps exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Push Up',
          type: ExerciseTrackingType.BODYWEIGHT_REPS,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = {
        type: SerieType.EFFECTIVE,
        reps: 20,
        weight: 10,
      };

      await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
    });

    it('should accept meters for distance exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Running',
          type: ExerciseTrackingType.DISTANCE,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, meters: 1000 };
      const created = createSerie({ id: 1, meters: 1000 });
      serieRepo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should reject non-meters fields for distance exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Running',
          type: ExerciseTrackingType.DISTANCE,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, reps: 5 };

      await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
    });

    it('should accept weight (negative) and reps for assisted exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Assisted Pull Up',
          type: ExerciseTrackingType.ASSISTED,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = {
        type: SerieType.EFFECTIVE,
        weight: -20,
        reps: 10,
      };
      const created = createSerie({ id: 1, weight: -20, reps: 10 });
      serieRepo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should reject missing weight for assisted exercise', async () => {
      const set = createSet({
        exercise: {
          id: 1,
          name: 'Assisted Pull Up',
          type: ExerciseTrackingType.ASSISTED,
          muscles: [],
        },
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, reps: 10 };

      await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ForbiddenException when parent workout is finished', async () => {
      const set = createSet({
        workout: { id: 1, endDate: new Date() } as Set['workout'],
      });
      setRepo.findById.mockResolvedValue(set);
      const dto: CreateSerieDto = { type: SerieType.EFFECTIVE, reps: 10 };

      await expect(service.create(1, dto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should return the updated serie when found', async () => {
      const existing = createSerie({ id: 1 });
      const dto: UpdateSerieDto = { reps: 12 };
      const updated = createSerie({ id: 1, reps: 12 });
      serieRepo.findById.mockResolvedValue(existing);
      serieRepo.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when serie does not exist', async () => {
      serieRepo.findById.mockResolvedValue(null);

      await expect(service.update(999, { reps: 5 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when parent workout is finished', async () => {
      const existing = createSerie({ id: 1 });
      serieRepo.findById.mockResolvedValue(existing);
      setRepo.findById.mockResolvedValue(
        createSet({
          workout: { id: 1, endDate: new Date() } as Set['workout'],
        }),
      );

      await expect(
        service.update(1, { reps: 10 }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should return the removed serie', async () => {
      const serie = createSerie({ id: 1 });
      serieRepo.findById.mockResolvedValue(serie);
      serieRepo.remove.mockResolvedValue(serie);

      const result = await service.remove(1);

      expect(result).toEqual(serie);
    });

    it('should throw NotFoundException when serie does not exist', async () => {
      serieRepo.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when parent workout is finished', async () => {
      const serie = createSerie({ id: 1 });
      serieRepo.findById.mockResolvedValue(serie);
      setRepo.findById.mockResolvedValue(
        createSet({
          workout: { id: 1, endDate: new Date() } as Set['workout'],
        }),
      );

      await expect(service.remove(1)).rejects.toThrow(ForbiddenException);
    });
  });
});

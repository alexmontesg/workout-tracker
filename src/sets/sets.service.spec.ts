import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ExerciseTrackingType } from '../exercises/exercise.entity';
import {
  ISetRepository,
  SET_REPOSITORY,
} from './domain/set.repository.interface';
import {
  WORKOUT_REPOSITORY,
  IWorkoutRepository,
} from '../workouts/domain/workout.repository.interface';
import { Set } from './set.entity';
import { SetsService } from './sets.service';

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

function createMockWorkoutRepository(): jest.Mocked<IWorkoutRepository> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
}

function createSet(overrides?: Partial<Set>): Set {
  return {
    id: 1,
    workout: { id: 1 } as Set['workout'],
    exercise: {
      id: 1,
      name: 'Test',
      type: ExerciseTrackingType.WEIGHT_REPS,
      muscles: [],
    },
    timestamp: new Date('2026-01-01'),
    notes: null,
    restTimeSeconds: null,
    series: [],
    ...overrides,
  };
}

describe('SetsService', () => {
  let service: SetsService;
  let repo: jest.Mocked<ISetRepository>;
  let workoutRepo: jest.Mocked<IWorkoutRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetsService,
        { provide: SET_REPOSITORY, useValue: createMockSetRepository() },
        { provide: WORKOUT_REPOSITORY, useValue: createMockWorkoutRepository() },
      ],
    }).compile();

    service = module.get<SetsService>(SetsService);
    repo = module.get<jest.Mocked<ISetRepository>>(SET_REPOSITORY);
    workoutRepo = module.get<jest.Mocked<IWorkoutRepository>>(
      WORKOUT_REPOSITORY,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByWorkoutId', () => {
    it('should return all sets for a workout', async () => {
      const sets = [createSet({ id: 1 }), createSet({ id: 2 })];
      repo.findByWorkoutId.mockResolvedValue(sets);

      const result = await service.getByWorkoutId(1);

      expect(result).toEqual(sets);
    });

    it('should return an empty array when no sets in workout', async () => {
      repo.findByWorkoutId.mockResolvedValue([]);

      const result = await service.getByWorkoutId(1);

      expect(result).toEqual([]);
    });
  });

  describe('getOne', () => {
    it('should return the set when found', async () => {
      const set = createSet({ id: 1 });
      repo.findById.mockResolvedValue(set);

      const result = await service.getOne(1);

      expect(result).toEqual(set);
    });

    it('should throw NotFoundException when not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return the created set when workout exists', async () => {
      workoutRepo.findById.mockResolvedValue({ id: 1 } as never);
      const dto: CreateSetDto = {
        exerciseId: 1,
        timestamp: new Date('2026-01-01'),
      };
      const created = createSet({ id: 1 });
      repo.create.mockResolvedValue(created);

      const result = await service.create(1, dto);

      expect(result).toEqual(created);
    });

    it('should throw NotFoundException when workout does not exist', async () => {
      workoutRepo.findById.mockResolvedValue(null);

      await expect(
        service.create(999, {
          exerciseId: 1,
          timestamp: new Date('2026-01-01'),
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when workout is finished', async () => {
      workoutRepo.findById.mockResolvedValue({
        id: 1,
        endDate: new Date(),
      } as never);
      const dto: CreateSetDto = {
        exerciseId: 1,
        timestamp: new Date('2026-01-01'),
      };

      await expect(service.create(1, dto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should return the updated set when found', async () => {
      const existing = createSet({ id: 1 });
      const dto: UpdateSetDto = { notes: 'Updated notes' };
      const updated = createSet({ id: 1, notes: 'Updated notes' });
      repo.findById.mockResolvedValue(existing);
      repo.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when set does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.update(999, { notes: 'Nope' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when parent workout is finished', async () => {
      const existing = createSet({
        workout: { id: 1, endDate: new Date() } as Set['workout'],
      });
      repo.findById.mockResolvedValue(existing);

      await expect(
        service.update(1, { notes: 'Should not work' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw error when changing exerciseId and series exist', async () => {
      const existing = createSet({
        id: 1,
        exercise: {
          id: 1,
          name: 'Test',
          type: ExerciseTrackingType.WEIGHT_REPS,
          muscles: [],
        },
        series: [{ id: 1 }] as Set['series'],
      });
      repo.findById.mockResolvedValue(existing);

      await expect(service.update(1, { exerciseId: 2 })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should return the removed set', async () => {
      const set = createSet({ id: 1 });
      repo.findById.mockResolvedValue(set);
      repo.remove.mockResolvedValue(set);

      const result = await service.remove(1);

      expect(result).toEqual(set);
    });

    it('should throw NotFoundException when set does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when parent workout is finished', async () => {
      const set = createSet({
        workout: { id: 1, endDate: new Date() } as Set['workout'],
      });
      repo.findById.mockResolvedValue(set);

      await expect(service.remove(1)).rejects.toThrow(ForbiddenException);
    });
  });
});

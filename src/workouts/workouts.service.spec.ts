import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import {
  WORKOUT_REPOSITORY,
  IWorkoutRepository,
} from './domain/workout.repository.interface';
import { Workout } from './workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

function createMockWorkoutRepository(): jest.Mocked<IWorkoutRepository> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
}

function createWorkout(overrides?: Partial<Workout>): Workout {
  return {
    id: 1,
    date: new Date('2026-05-20'),
    endDate: null,
    name: 'Test Workout',
    notes: null,
    sets: [],
    ...overrides,
  };
}

describe('WorkoutsService', () => {
  let service: WorkoutsService;
  let repo: jest.Mocked<IWorkoutRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: WORKOUT_REPOSITORY,
          useValue: createMockWorkoutRepository(),
        },
      ],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
    repo = module.get<jest.Mocked<IWorkoutRepository>>(WORKOUT_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all workouts', async () => {
      const workouts = [createWorkout({ id: 1 }), createWorkout({ id: 2 })];
      repo.findAll.mockResolvedValue(workouts);

      const result = await service.getAll();

      expect(result).toEqual(workouts);
    });

    it('should return an empty array when no workouts exist', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.getAll();

      expect(result).toEqual([]);
    });
  });

  describe('getOne', () => {
    it('should return the workout when found', async () => {
      const workout = createWorkout({ id: 1 });
      repo.findById.mockResolvedValue(workout);

      const result = await service.getOne(1);

      expect(result).toEqual(workout);
    });

    it('should throw NotFoundException when not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw with a message containing the workout id', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getOne(999)).rejects.toThrow(
        'Workout #999 not found',
      );
    });
  });

  describe('create', () => {
    it('should return the created workout with provided name', async () => {
      const dto: CreateWorkoutDto = {
        date: new Date('2026-05-20'),
        name: 'Morning Push',
      };
      const created = createWorkout({ id: 1, name: 'Morning Push' });
      repo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
    });

    it('should set default name when name is empty', async () => {
      const dto: CreateWorkoutDto = {
        date: new Date('2026-05-20'),
        name: '',
      };
      const created = createWorkout({
        id: 1,
        name: 'Workout on 2026-05-20',
      });
      repo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
    });

    it('should set default name when name is not provided', async () => {
      const dto: CreateWorkoutDto = {
        date: new Date('2026-05-20'),
      };
      const created = createWorkout({
        id: 1,
        name: 'Workout on 2026-05-20',
      });
      repo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
    });
  });

  describe('update', () => {
    it('should return the updated workout when found', async () => {
      const existing = createWorkout({ id: 1 });
      const dto: UpdateWorkoutDto = { name: 'Updated Name' };
      const updated = createWorkout({ id: 1, name: 'Updated Name' });
      repo.findById.mockResolvedValue(existing);
      repo.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when workout does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(
        service.update(999, { name: 'Nope' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return the removed workout', async () => {
      const workout = createWorkout({ id: 1 });
      repo.findById.mockResolvedValue(workout);
      repo.remove.mockResolvedValue(workout);

      const result = await service.remove(1);

      expect(result).toEqual(workout);
    });

    it('should throw NotFoundException when workout does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('finish', () => {
    it('should set endDate on active workout', async () => {
      const active = createWorkout({ id: 1, endDate: null });
      repo.findById.mockResolvedValue(active);
      repo.update.mockImplementation(async (w) => w);

      const result = await service.finish(1);

      expect(result.endDate).toBeInstanceOf(Date);
    });

    it('should update endDate on already finished workout', async () => {
      const finished = createWorkout({
        id: 1,
        endDate: new Date('2026-05-19'),
      });
      repo.findById.mockResolvedValue(finished);
      repo.update.mockImplementation(async (w) => w);

      const result = await service.finish(1);

      expect(result.endDate).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException when workout does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.finish(999)).rejects.toThrow(NotFoundException);
    });
  });
});

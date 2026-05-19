import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import {
  EXERCISE_REPOSITORY,
  IExerciseRepository,
} from './domain/exercise.repository.interface';
import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { SearchExerciseDto } from './dto/search-exercise.dto';

function createMockExerciseRepository(): jest.Mocked<IExerciseRepository> {
  return {
    findAll: jest.fn(),
    search: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByIds: jest.fn(),
  };
}

function createExercise(overrides?: Partial<Exercise>): Exercise {
  return {
    id: 1,
    name: 'Bench Press',
    muscles: [],
    type: 'weight_reps' as Exercise['type'],
    ...overrides,
  };
}

describe('ExercisesService', () => {
  let service: ExercisesService;
  let repo: jest.Mocked<IExerciseRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: EXERCISE_REPOSITORY,
          useValue: createMockExerciseRepository(),
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    repo = module.get<jest.Mocked<IExerciseRepository>>(EXERCISE_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllExercises', () => {
    it('should return an empty array when no exercises exist', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.getAllExercises();

      expect(result).toEqual([]);
    });

    it('should return all exercises', async () => {
      const exercises = [
        createExercise({ id: 1 }),
        createExercise({ id: 2, name: 'Squat' }),
      ];
      repo.findAll.mockResolvedValue(exercises);

      const result = await service.getAllExercises();

      expect(result).toEqual(exercises);
    });
  });

  describe('search', () => {
    it('should return filtered exercises', async () => {
      const criteria: SearchExerciseDto = { muscleId: 1 };
      const results = [createExercise({ id: 1 })];
      repo.search.mockResolvedValue(results);

      const result = await service.search(criteria);

      expect(result).toEqual(results);
    });
  });

  describe('getExercise', () => {
    it('should return the exercise when found', async () => {
      const exercise = createExercise({ id: 1 });
      repo.findById.mockResolvedValue(exercise);

      const result = await service.getExercise(1);

      expect(result).toEqual(exercise);
    });

    it('should throw NotFoundException when not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getExercise(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createExercise', () => {
    it('should return the created exercise', async () => {
      const dto: CreateExerciseDto = {
        name: 'Squat',
        muscleIds: [1],
        type: 'weight_reps' as Exercise['type'],
      };
      const created = createExercise({ id: 3, name: 'Squat' });
      repo.create.mockResolvedValue(created);

      const result = await service.createExercise(dto);

      expect(result).toEqual(created);
    });
  });

  describe('updateExercise', () => {
    it('should return the updated exercise when found', async () => {
      const existing = createExercise({ id: 1 });
      const dto: UpdateExerciseDto = { name: 'Updated Bench' };
      const updated = createExercise({ id: 1, name: 'Updated Bench' });
      repo.findById.mockResolvedValue(existing);
      repo.update.mockResolvedValue(updated);

      const result = await service.updateExercise(1, dto);

      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when exercise does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(
        service.updateExercise(999, { name: 'Nope' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeExercise', () => {
    it('should return the removed exercise', async () => {
      const exercise = createExercise({ id: 1 });
      repo.findById.mockResolvedValue(exercise);
      repo.remove.mockResolvedValue(exercise);

      const result = await service.removeExercise(1);

      expect(result).toEqual(exercise);
    });

    it('should throw NotFoundException when exercise does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.removeExercise(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

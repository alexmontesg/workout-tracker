import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { MusclesService } from './muscles.service';
import {
  MUSCLE_REPOSITORY,
  IMuscleRepository,
} from './domain/muscle.repository.interface';
import { Muscle } from './muscle.entity';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';

function createMockMuscleRepository(): jest.Mocked<IMuscleRepository> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findLinkedExerciseCount: jest.fn(),
  };
}

function createMuscle(overrides?: Partial<Muscle>): Muscle {
  return { id: 1, name: 'Test Muscle', ...overrides };
}

describe('MusclesService', () => {
  let service: MusclesService;
  let repo: jest.Mocked<IMuscleRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusclesService,
        { provide: MUSCLE_REPOSITORY, useValue: createMockMuscleRepository() },
      ],
    }).compile();

    service = module.get<MusclesService>(MusclesService);
    repo = module.get<jest.Mocked<IMuscleRepository>>(MUSCLE_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an empty array when no muscles exist', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should return all muscles', async () => {
      const muscles = [
        createMuscle({ id: 1 }),
        createMuscle({ id: 2, name: 'Biceps' }),
      ];
      repo.findAll.mockResolvedValue(muscles);

      const result = await service.findAll();

      expect(result).toEqual(muscles);
    });
  });

  describe('findOne', () => {
    it('should return the muscle when found', async () => {
      const muscle = createMuscle({ id: 1 });
      repo.findById.mockResolvedValue(muscle);

      const result = await service.findOne(1);

      expect(result).toEqual(muscle);
    });

    it('should throw NotFoundException when not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw with a message containing the muscle id', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Muscle #999 not found',
      );
    });
  });

  describe('create', () => {
    it('should return the created muscle', async () => {
      const dto: CreateMuscleDto = { name: 'Biceps' };
      const created = createMuscle({ id: 3, name: 'Biceps' });
      repo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
    });
  });

  describe('update', () => {
    it('should return the updated muscle when found', async () => {
      const existing = createMuscle({ id: 1 });
      const dto: UpdateMuscleDto = { name: 'Updated Muscle' };
      const updated = createMuscle({ id: 1, name: 'Updated Muscle' });
      repo.findById.mockResolvedValue(existing);
      repo.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when muscle does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.update(999, { name: 'Nope' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove and return the muscle when no linked exercises', async () => {
      const muscle = createMuscle({ id: 1 });
      repo.findById.mockResolvedValue(muscle);
      repo.findLinkedExerciseCount.mockResolvedValue(0);
      repo.remove.mockResolvedValue(muscle);

      const result = await service.remove(1);

      expect(result).toEqual(muscle);
    });

    it('should throw ConflictException when linked exercises exist', async () => {
      const muscle = createMuscle({ id: 1 });
      repo.findById.mockResolvedValue(muscle);
      repo.findLinkedExerciseCount.mockResolvedValue(2);

      await expect(service.remove(1)).rejects.toThrow(ConflictException);
    });

    it('should throw with a message containing the count of linked exercises', async () => {
      const muscle = createMuscle({ id: 1 });
      repo.findById.mockResolvedValue(muscle);
      repo.findLinkedExerciseCount.mockResolvedValue(2);

      await expect(service.remove(1)).rejects.toThrow(
        'Cannot delete muscle #1: linked to 2 exercise(s)',
      );
    });

    it('should throw NotFoundException when muscle does not exist', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});

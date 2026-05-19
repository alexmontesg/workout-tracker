import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SetsService } from './sets.service';
import {
  SET_REPOSITORY,
  ISetRepository,
} from './domain/set.repository.interface';
import { Set } from './set.entity';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

function createMockSetRepository(): jest.Mocked<ISetRepository> {
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
    exercise: { id: 1, name: 'Test', type: 'weight_reps', muscles: [] },
    timestamp: new Date('2026-01-01'),
    notes: null,
    restTimeSeconds: null,
    series: [],
    ...overrides,
  } as Set;
}

describe('SetsService', () => {
  let service: SetsService;
  let repo: jest.Mocked<ISetRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetsService,
        { provide: SET_REPOSITORY, useValue: createMockSetRepository() },
      ],
    }).compile();

    service = module.get<SetsService>(SetsService);
    repo = module.get<jest.Mocked<ISetRepository>>(SET_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all sets', async () => {
      const sets = [createSet({ id: 1 }), createSet({ id: 2 })];
      repo.findAll.mockResolvedValue(sets);

      const result = await service.getAll();

      expect(result).toEqual(sets);
    });

    it('should return an empty array when no sets exist', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.getAll();

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
    it('should return the created set', async () => {
      const dto: CreateSetDto = {
        exerciseId: 1,
        timestamp: new Date('2026-01-01'),
      };
      const created = createSet({ id: 1 });
      repo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
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

      await expect(
        service.update(999, { notes: 'Nope' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw error when changing exerciseId and series exist', async () => {
      const existing = createSet({
        id: 1,
        exercise: { id: 1, name: 'Test', type: 'weight_reps', muscles: [] },
        series: [{ id: 1 }] as Set['series'],
      });
      repo.findById.mockResolvedValue(existing);

      await expect(
        service.update(1, { exerciseId: 2 }),
      ).rejects.toThrow(BadRequestException);
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
  });
});

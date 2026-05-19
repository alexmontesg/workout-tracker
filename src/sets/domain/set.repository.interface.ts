import { Set } from '../set.entity';
import { CreateSetDto } from '../dto/create-set.dto';
import { UpdateSetDto } from '../dto/update-set.dto';

export const SET_REPOSITORY = 'SET_REPOSITORY';

export interface ISetRepository {
  findAll(): Promise<Set[]>;
  findById(id: number): Promise<Set | null>;
  create(dto: CreateSetDto): Promise<Set>;
  update(set: Set, dto: UpdateSetDto): Promise<Set>;
  remove(set: Set): Promise<Set>;
}

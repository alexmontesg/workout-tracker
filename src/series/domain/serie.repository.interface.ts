import { Serie } from '../serie.entity';
import { CreateSerieDto } from '../dto/create-serie.dto';
import { UpdateSerieDto } from '../dto/update-serie.dto';

export const SERIE_REPOSITORY = 'SERIE_REPOSITORY';

export interface ISerieRepository {
  findBySetId(setId: number): Promise<Serie[]>;
  findById(id: number): Promise<Serie | null>;
  create(dto: CreateSerieDto & { setId: number }): Promise<Serie>;
  update(serie: Serie, dto: UpdateSerieDto): Promise<Serie>;
  remove(serie: Serie): Promise<Serie>;
}

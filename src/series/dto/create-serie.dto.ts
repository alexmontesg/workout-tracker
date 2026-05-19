import { SerieType } from '../serie.entity';

export class CreateSerieDto {
  type!: SerieType;
  reps?: number;
  weight?: number;
  durationSeconds?: number;
  meters?: number;
}

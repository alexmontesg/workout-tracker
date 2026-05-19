import { SerieType } from '../serie.entity';

export class UpdateSerieDto {
  type?: SerieType;
  reps?: number;
  weight?: number;
  durationSeconds?: number;
  meters?: number;
}

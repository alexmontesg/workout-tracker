import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { SerieType } from '../serie.entity';

export class CreateSerieDto {
  @IsEnum(SerieType)
  type!: SerieType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  reps?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  durationSeconds?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  meters?: number;
}

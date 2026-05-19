import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMuscleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

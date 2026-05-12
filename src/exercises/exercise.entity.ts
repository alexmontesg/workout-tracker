import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Temp, should be another table
export enum MusclesEnum {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDER = 'shoulder',
  LEGS = 'legs',
  CORE = 'core',
}

export enum ExerciseTrackingType {
  TIME = 'time',
  WEIGHT_REPS = 'weight_reps',
  BODYWEIGHT_REPS = 'bodyweight_reps',
  DISTANCE = 'distance',
  ASSISTED = 'assisted',
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'simple-array' })
  muscles!: MusclesEnum[];

  @Column()
  type!: ExerciseTrackingType;
}

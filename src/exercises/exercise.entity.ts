import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Muscle } from '../muscles/muscle.entity';

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

  @ManyToMany(() => Muscle)
  @JoinTable()
  muscles!: Muscle[];

  @Column()
  type!: ExerciseTrackingType;
}

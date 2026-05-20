import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { Serie } from '../series/serie.entity';
import { Workout } from '../workouts/workout.entity';

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Workout, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutId' })
  workout!: Workout;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exerciseId' })
  exercise!: Exercise;

  @Column('datetime')
  timestamp!: Date;

  @Column('text', { nullable: true })
  notes!: string | null;

  @Column('real', { nullable: true })
  restTimeSeconds!: number | null;

  @OneToMany(() => Serie, (serie) => serie.set)
  series!: Serie[];
}

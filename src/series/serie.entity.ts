import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Set } from '../sets/set.entity';

export enum SerieType {
  WARMUP = 'warmup',
  EFFECTIVE = 'effective',
  FAILURE = 'failure',
  DROP = 'drop',
}

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Set, (set) => set.series, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setId' })
  set!: Set;

  @Column({ type: 'simple-enum', enum: SerieType })
  type!: SerieType;

  @Column({ type: 'real', nullable: true })
  reps!: number | null;

  @Column({ type: 'real', nullable: true })
  weight!: number | null;

  @Column({ type: 'real', nullable: true })
  durationSeconds!: number | null;

  @Column({ type: 'real', nullable: true })
  meters!: number | null;
}

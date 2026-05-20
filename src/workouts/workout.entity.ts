import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Set } from '../sets/set.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('datetime')
  date!: Date;

  @Column('datetime', { nullable: true })
  endDate!: Date | null;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  notes!: string | null;

  @OneToMany(() => Set, (set) => set.workout)
  sets!: Set[];
}

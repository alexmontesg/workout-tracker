import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MusclesEnum {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDER = 'shoulder',
  LEGS = 'legs',
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'simple-array' })
  muscles!: MusclesEnum[];
}

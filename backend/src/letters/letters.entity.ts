import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Letter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  createdAt: Date;
}

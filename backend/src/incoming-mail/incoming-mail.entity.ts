import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IncomingMail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  createdAt: Date;
}

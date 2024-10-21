import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  nomeComum: string;

  @Column({ length: 500 })
  nomeOficial: string;

  @Column('boolean')
  membroUN: boolean;

  @Column({ length: 500 })
  subRegian: string;

  @Column({ length: 500 })
  nomeNativo: string;
}

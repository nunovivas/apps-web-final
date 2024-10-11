import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  tituloLivro: string;

  @Column('int')
  ano: number;

  @Column('int')
  numeroLeituras: number;

  @Column('int')
  views: number;

  @Column('decimal')
  mediaClassificacao: number;
}

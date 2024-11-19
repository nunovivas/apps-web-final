import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iotData')
export class IotDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nomeDevice: string;

  @Column({ length: 100 })
  nomeMetrica: string;

  @Column('boolean')
  valor: number;

  @Column()
  dataRegisto: Date;
}

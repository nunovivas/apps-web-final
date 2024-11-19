import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateIotDatumDto {
  @IsString()
  nomeDevice: string;

  @IsString()
  nomeMetrica: string;

  @IsNumber()
  valor: number;

  @IsDate()
  dataRegisto: Date;
}

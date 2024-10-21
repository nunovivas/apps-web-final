import { IsBoolean, IsString } from 'class-validator';

export class CreatePaisDto {
  @IsString()
  name: string;

  @IsString()
  nomeComum: string;

  @IsString()
  nomeOficial: string;

  @IsBoolean()
  membroUN: boolean;

  @IsString()
  subRegian: string;

  @IsString()
  nomeNativo: string;
}

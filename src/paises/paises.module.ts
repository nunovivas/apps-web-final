import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { Pais } from './entities/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pais])], // added by nuno
  controllers: [PaisesController],
  providers: [PaisesService],
  exports: [PaisesService], // added by nuno
})
export class PaisesModule {}

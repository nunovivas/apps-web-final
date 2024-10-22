import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PaisesModule } from 'src/paises/paises.module';

@Module({
  //imports: [TypeOrmModule.forFeature([Book])], // added by nuno
  //controllers: ,
  imports: [HttpModule, PaisesModule], // changed by nuno
  providers: [ImporterService], // changed by nuno
  exports: [ImporterService], // added by nuno
})
export class CountriesModule {}

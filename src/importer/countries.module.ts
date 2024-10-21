import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  //imports: [TypeOrmModule.forFeature([Book])], // added by nuno
  //controllers: ,
  imports: [HttpModule], // changed by nuno
  providers: [CountriesService], // changed by nuno
  exports: [CountriesService], // added by nuno
})
export class CountriesModule {}

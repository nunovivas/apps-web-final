import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { PaisesService } from 'src/paises/paises.service';
import { Country } from 'src/interfaces/country.interface';
import { CreatePaisDto } from 'src/paises/dto/create-pais.dto';

@Injectable()
export class ImporterService {
  constructor(
    private readonly httpService: HttpService,
    private readonly paisesService: PaisesService,
  ) {}

  // getEuropeanCountries(): Observable<any> {
  //   return this.httpService
  //     .get('https://restcountries.com/v3.1/region/europe')
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  async getEuropeanCountries(): Promise<string> {
    let countriesData: any;
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get('https://restcountries.com/v3.1/region/europe'),
      );
      countriesData = response.data;
      console.log('Got Countries');
      //importar os paises para a base de dados
      await this.paisesService.removeAll();
      countriesData.forEach(async (country: Country) => {
        let nativeName = 'sem informação';
        if (country.name && country.name.nativeName) {
          const nativeNames = Object.values(country.name.nativeName) as {
            official: string;
          }[];
          if (nativeNames.length > 0 && nativeNames[0].official) {
            nativeName = nativeNames[0].official;
          }
        }
        console.log(
          'Nome: ' + country.name.common + ' nome oficial: ' + nativeName,
        );
        const novoPais: CreatePaisDto = new CreatePaisDto();
        novoPais.nomeComum = country.name.common;
        novoPais.nomeOficial = country.name.official;
        novoPais.membroUN = country.unMember;
        novoPais.subRegian = country.subregion;
        novoPais.nomeNativo = nativeName;
        console.log(novoPais);
        await this.paisesService.create(novoPais);
      });
      return 'Paise importados com sucesso!';
    } catch (error) {
      console.error('Error fetching/treating European countries:', error);
      return 'NOT OK';
    }
  }
}

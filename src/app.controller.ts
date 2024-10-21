import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ImporterService } from './importer/importer.service';
import { Country } from './interfaces/country.interface';
import { CreatePaisDto } from './paises/dto/create-pais.dto';
import { PaisesService } from './paises/paises.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly importerService: ImporterService,
    private readonly paisesService: PaisesService,
  ) {}

  @Get('import')
  importData(): string {
    this.appService.logImport();
    return 'Import endpoint hit!';
  }

  @Get('books')
  async getBooks(): Promise<any> {
    return 'Original API is down';
    //return await this.appService.getBooksByPortugueseAuthors();
  }
  @Get('importapaises')
  async getEuropeanCountries(): Promise<any> {
    const countries = await this.importerService
      .getEuropeanCountries()
      .toPromise();
    // remove todos os paises
    await this.paisesService.removeAll();
    countries.forEach(async (country: Country) => {
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
    return { countries };
  }
}

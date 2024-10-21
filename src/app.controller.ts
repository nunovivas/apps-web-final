import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CountriesService } from './importer/countries.service';
import { Country } from './interfaces/country.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly countriesService: CountriesService,
  ) {}

  @Get('import')
  importData(): string {
    this.appService.logImport();
    return 'Import endpoint hit!';
  }

  @Get('books')
  async getBooks(): Promise<any> {
    return await this.appService.getBooksByPortugueseAuthors();
  }
  @Get('paises')
  async getEuropeanCountries(): Promise<any> {
    const countries = await this.countriesService
      .getEuropeanCountries()
      .toPromise();
    countries.forEach((country: Country) => {
      let officialName = 'sem informação';
      if (country.name && country.name.nativeName) {
        const nativeNames = Object.values(country.name.nativeName) as {
          official: string;
        }[];
        if (nativeNames.length > 0 && nativeNames[0].official) {
          officialName = nativeNames[0].official;
        }
      }
      console.log('Nome: ' + country.name.common + ' nome oficial: ' + officialName);
    });
    return { countries };
  }
}

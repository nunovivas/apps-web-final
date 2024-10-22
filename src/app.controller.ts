import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ImporterService } from './importer/importer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly importerService: ImporterService,
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
    const response = await this.importerService.getEuropeanCountries();
    // remove todos os paises
    return { response };
  }
}

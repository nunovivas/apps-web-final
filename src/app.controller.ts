import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('import')
  importData(): string {
    this.appService.logImport();
    return 'Import endpoint hit!';
  }

  @Get('books')
  async getBooks(): Promise<any> {
    return await this.appService.getBooksByPortugueseAuthors();
  }
}

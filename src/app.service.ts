import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  logImport(): void {
    console.log('Imported!');
  }
}

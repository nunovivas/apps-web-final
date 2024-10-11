import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable() // Nota Nuno : Decorator makes the class available for dependency injection. This means that instances of the class can be automatically created and injected into other classes that depend on it.
export class AppService {
  logImport(): void {
    console.log('Imported!');
  }

  async getBooksByPortugueseAuthors(): Promise<any> {
    try {
      const response = await axios.get(
        'https://openlibrary.org/search.json?author=portuguese&limit=1000',
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching books by Portuguese authors:', error);
      throw error;
    }
  }
}

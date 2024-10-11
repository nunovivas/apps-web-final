import { DataSource } from 'typeorm';
import { Photo } from './entities/book.entity';

export const photoProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'],
  },
];

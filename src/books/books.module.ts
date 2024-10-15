import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // added by nuno
  controllers: [BooksController],
  providers: [BooksService], // changed by nuno
  exports: [BooksService], // added by nuno
})
export class BooksModule {}

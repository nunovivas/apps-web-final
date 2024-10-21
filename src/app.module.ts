import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CountriesModule } from './importer/countries.module';

// more info about connection here: https://stackoverflow.com/questions/62646494/nestjs-typeormmodule-unable-to-connect-to-the-database-retrying-er-parse-er
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      //host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Mysql1234!',
      database: 'livros',
      //entities: [Book],
      autoLoadEntities: true,
      synchronize: false, //changed by nuno
    }),
    BooksModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

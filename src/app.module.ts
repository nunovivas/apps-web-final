import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CountriesModule } from './importer/importer.module';
import { PaisesModule } from './paises/paises.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
      database: 'paises',
      //entities: [Book],
      autoLoadEntities: true,
      synchronize: false, //changed by nuno - cria as tabelas
      dropSchema: false, // This will drop the schema and recreate it
    }),
    //BooksModule,
    CountriesModule,
    PaisesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

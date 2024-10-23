import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('OPEN API para Aplicações Web')
    .setDescription(
      'Documentação OPENAPI para o projeto de Aplicações Web.\n A pedido do Professor foram adicionados descritivos para os endpoints de Paises. Atenção que para aceder a certos endpoints é preciso bearer token!Está um botão definido para isso mesmo.',
    )
    .addBearerAuth()
    .setVersion('1.1.2')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    // .setTermsOfService(
    //   'O uso desta aplicação é livre sempre que dentro do ambito da disciplina de Aplicações Web',
    // )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

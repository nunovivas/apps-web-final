<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Projecto Final da Cadeira de Aplicações Web

### Objectivo
Ter uma aplicação de backend que, integre dados de um serviço web, os processe (em forma de sumarização e filtragem) e os disponibilize através de REST-API. 
Ter tudo num único sistema / serviço.
### Serviço Web
Este será, em princípio, o serviço web disponível em openlibrary.org o qual permite pesquisar uma base de dados mundial de livros e outras publicações. A ideia será importar dados de autores de um só Pais (em princípio e se possível Portugal), resumi-los em informação de Autor/Titulo/Ano de publicação/Leituras/Média de avaliações e disponibilizar esta informação via um endpoint REST.API.
Este end-point, terá, portanto, as seguintes funcionalidades e características:
1.	Estará presente em ../localhost/searchbooks e terá as funcionalidades de filtrar (usando parâmetros) por:
a.	Ano;
b.	Autor;
c.	Título;
d.	Numero de leituras; 
e.	Média de classificação;
2.	Um integrador que funcionará por “Schedule” e que importará todos os dados.
3.	Uma BD própria em MySQL;
4.	Irá funcionar em localhost, na porta 3001;
5.	Baseado na Framework Nest.JS;
6.	O gestor de pacotes será o NPM;

### Base de dados

A base de dados, implementada em MySQL, terá as seguintes características:
1.	Nome da BD: integralivros;
2.	Nome de utilizador e password a serem definidos à posteriori;
3.	Uma única tabela chamada de livros com os seguintes campos:
a.	Pkid;
b.	TituloLivro;
c.	Ano;
d.	NumeroLeituras;
e.	MediaClassificacao;


### Pré-requisitos

1.	NodeJS instalado na máquina, versão 16 ou superior (https://nodejs.org/en)
2.	NestJS instalado na máquina, versãom 20 ou superior (https://docs.nestjs.com)



## Licença (em inglês)

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

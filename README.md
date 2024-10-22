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
#### Objectivos - posteriori
Ter login, com token JWT, integrado na aplicação. Todos os pedidos protegidos por token.

## Tradução / Mappings
name.common = nomeComum
name.official = nomeOficial
unMember = membroUn
subRegion = subRegiao
name.nativeName.[].official = nomeNativo

Notas:
usar o comando npx @nestjs/cli g resource paises em vez de nest
(problemas por causa do anaconda)

### Serviço Web - Opção 1 (desenvolvimento parado por falha no serviço web de origem)
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

### Serviço Web - Opção 2
 A meio do projeto e como o serviço originalmente definido está indisponivel, optou-se por usar outro, relacionado com informação sobre paises.
A aplicação importa portanto paises (Europeus), filtra os dados e insere-os numa base de dados local destinada para o efeito.
Tem um endpoint proprio "paises", onde é possivel fazer várias pesquisas.
Faz uma pesquisa "deep" no objecto recebido para ir buscar o nome original do Pais.

### Base de dados - Opção 1

A base de dados, implementada em MySQL, terá as seguintes características:
1.	Nome da BD: paises;
2.	Nome de utilizador e password a serem definidos à posteriori;
3.	Uma única tabela chamada de pais. Os campos estão definidos via código na entidade Pais.


### Pré-requisitos

1.	NodeJS instalado na máquina, versão 16 ou superior (https://nodejs.org/en)
2.	NestJS instalado na máquina, versãom 20 ou superior (https://docs.nestjs.com)
3. MySQL instalado localmente.
4. Axios e outras livrarias definidas em package.json instalada na máquina
5. Uso do NPM como package manager



## Licença (em inglês)

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

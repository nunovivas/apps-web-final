import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Endpoints de Paises - São pesquisados diretamente na BD MYSQL')
@ApiBearerAuth() // esta linha permite usar o bearer token configurado no ficheiro auth.guard.ts
@UseGuards(AuthGuard)
@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @ApiOperation({
    summary: 'Criar um pais diretamente na BD',
    description: 'Este endpoint permite criar um novo país na base de dados.',
  })
  @Post()
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisesService.create(createPaisDto);
  }

  @ApiOperation({
    summary: 'Listar todos os países',
    description:
      'Este endpoint retorna uma lista de todos os países na base de dados.',
  })
  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @ApiOperation({
    summary: 'Obter um país pelo ID',
    description:
      'Este endpoint retorna um país específico com base no ID fornecido.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisesService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Listar todos os países membros da ONU',
    description:
      'Este endpoint retorna uma lista de todos os países que são membros da ONU.',
  })
  @Get('findAllByMembroUN/:membroUN')
  findAllByMembroUN(@Param('membroUN') membroUN: string) {
    return this.paisesService.findAllByMembroUN(membroUN === 'true');
  }

  @ApiOperation({
    summary: 'Atualizar um país pelo ID',
    description:
      'Este endpoint permite atualizar as informações de um país específico com base no ID fornecido.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaisDto: UpdatePaisDto) {
    return this.paisesService.update(+id, updatePaisDto);
  }

  @ApiOperation({
    summary: 'Remover um país pelo ID',
    description:
      'Este endpoint permite remover um país específico com base no ID fornecido.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisesService.remove(+id);
  }
}

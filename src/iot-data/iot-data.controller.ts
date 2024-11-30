import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IotDataService } from './iot-data.service';
import { CreateIotDatumDto } from './dto/create-iot-datum.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
//import { UpdateIotDatumDto } from './dto/update-iot-datum.dto';

@ApiTags('Endpoints para o projecto de IOT')
@ApiBearerAuth() // esta linha permite usar o bearer token configurado no ficheiro auth.guard.ts
@UseGuards(AuthGuard)
@Controller('iot-data')
export class IotDataController {
  constructor(private readonly iotDataService: IotDataService) {}

  @ApiOperation({
    summary: 'Criar uma leitura diretamente na BD',
    description:
      'Este endpoint permite criar uma nova leitura na base de dados.',
  })
  @ApiBody({
    description: 'Dados da leitura de IOT',
    schema: {
      example: {
        nomeDevice: 'Medidor de qualidade do ar da aula de IOT',
        nomeMetrica: 'PM2.5',
        valor: 25,
        dataRegisto: '2023-11-26T12:00:00Z',
      },
    },
  })
  @Post()
  create(@Body() createIotDatumDto: CreateIotDatumDto) {
    return this.iotDataService.create(createIotDatumDto);
  }

  @Get()
  findAll() {
    return this.iotDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iotDataService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIotDatumDto: UpdateIotDatumDto) {
  //   return this.iotDataService.update(+id, updateIotDatumDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iotDataService.remove(+id);
  }
}

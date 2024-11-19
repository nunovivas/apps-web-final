import { PartialType } from '@nestjs/swagger';
import { CreateIotDatumDto } from './create-iot-datum.dto';

export class UpdateIotDatumDto extends PartialType(CreateIotDatumDto) {}

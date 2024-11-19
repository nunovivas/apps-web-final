import { Module } from '@nestjs/common';
import { IotDataService } from './iot-data.service';
import { IotDataController } from './iot-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IotDatum } from './entities/iot-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IotDatum])], // added by nuno
  controllers: [IotDataController],
  providers: [IotDataService],
  exports: [IotDataService], // added by nuno
})
export class IotDataModule {}

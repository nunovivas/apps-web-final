import { Injectable } from '@nestjs/common';
import { CreateIotDatumDto } from './dto/create-iot-datum.dto';
import { IotDatum } from './entities/iot-datum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { UpdateIotDatumDto } from './dto/update-iot-datum.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class IotDataService {
  private lastEmailTimestamp: number = 0;
  constructor(
    @InjectRepository(IotDatum)
    private readonly iotRepository: Repository<IotDatum>,
  ) {}
  async create(createIotDatumDto: CreateIotDatumDto) {
    if (
      createIotDatumDto.nomeMetrica == 'PM2.5' ||
      createIotDatumDto.nomeMetrica == 'PM10'
    ) {
      if (createIotDatumDto.valor > 20) {
        const currentTime = Date.now();
        if (currentTime - this.lastEmailTimestamp > 3600000) {
          // 1 hour in milliseconds
          await this.sendEmail(createIotDatumDto.valor);
          console.log('Email sent');
          this.lastEmailTimestamp = currentTime;
        }
      }
    }
    const iotDatum = this.iotRepository.create(createIotDatumDto);
    return this.iotRepository.save(iotDatum);
  }

  findAll() {
    return this.iotRepository.find();
  }

  findOne(id: number) {
    return this.iotRepository.findOneBy({ id });
  }

  // update(id: number, updateIotDatumDto: UpdateIotDatumDto) {
  //   return `This action updates a #${id} iotDatum`;
  // }

  remove(id: number) {
    return `This action removes a #${id} iotDatum`;
  }

  private async sendEmail(value: number) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nuno.vivas@gmail.com',
        pass: 'vtzq swie aewl snjy',
      },
    });

    const mailOptions = {
      from: 'nuno.vivas@gmail.com',
      to: 'nuno.vivas@gmail.com',
      subject: 'Value Exceeded Threshold',
      text: `The value ${value} has exceeded the threshold of 20.`,
    };

    await transporter.sendMail(mailOptions);
  }
}

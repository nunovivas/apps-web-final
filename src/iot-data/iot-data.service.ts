import { Injectable } from '@nestjs/common';
import { CreateIotDatumDto } from './dto/create-iot-datum.dto';
import { IotDatum } from './entities/iot-datum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { UpdateIotDatumDto } from './dto/update-iot-datum.dto';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class IotDataService {
  private lastEmailTimestamp: number = 0;
  private qualidadeAr = 'Boa';
  constructor(
    @InjectRepository(IotDatum)
    private readonly iotRepository: Repository<IotDatum>,
  ) {}
  async create(createIotDatumDto: CreateIotDatumDto) {
    if (
      createIotDatumDto.nomeMetrica == 'PM2.5' ||
      createIotDatumDto.nomeMetrica == 'PM10'
    ) {
      if (createIotDatumDto.valor > 25) {
        if (createIotDatumDto.nomeMetrica == 'PM2.5') {
          if (createIotDatumDto.valor > 50) {
            this.qualidadeAr = 'Péssima';
          } else if (createIotDatumDto.valor > 25) {
            this.qualidadeAr = 'Moderada';
          } else {
            this.qualidadeAr = 'Boa';
          }
        } else {
          //PM10
          if (createIotDatumDto.valor > 100) {
            this.qualidadeAr = 'Péssima';
          } else if (createIotDatumDto.valor > 50) {
            this.qualidadeAr = 'Moderada';
          } else {
            this.qualidadeAr = 'Boa';
          }
        }
        const currentTime = Date.now();
        if (currentTime - this.lastEmailTimestamp > 3600000) {
          // 1 hour in milliseconds
          await this.sendEmail(
            createIotDatumDto.nomeDevice,
            createIotDatumDto.valor,
            createIotDatumDto.nomeMetrica,
            this.qualidadeAr,
          );
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

  private async sendEmail(
    nomeAparelho: string,
    valorRegistado: number,
    metrica: string,
    qualidadeAr: string,
  ) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nuno.vivas@gmail.com',
        pass: 'vtzq swie aewl snjy',
      },
    });

    const mailOptions = {
      from: 'nuno.vivas@gmail.com',
      to: 'nuno.vivas@gmail.com,joanagabriel390@gmail.com,andre_canhoto@live.com.pt',
      subject: `Qualidade do ar ${qualidadeAr}`,
      html: `
      <h1>Qualidade do Ar: ${qualidadeAr}</h1>
      <p>O valor registado no aparelho <strong>${nomeAparelho}</strong> foi de <strong>${valorRegistado}</strong>.</p>
      <p>Assim a métrica <strong>${metrica}</strong> excedeu os limites definidos por lei e está classificado como de qualidade <strong>${qualidadeAr}</strong>.</p>
      <p>-</p>
      <p>Decreto Lei nº 47/2017 de 10 de maio, disponivel em https://diariodarepublica.pt/dr/detalhe/decreto-lei/47-2017-106982550</p>
      <img src="cid:unique@nodemailer.com" alt="Descriptive Alt Text" style="width:200px; height:100px;" />
      <p> Projecto de IOT dos alunos Joana, André e Nuno</p>
      `,
      attachments: [
        {
          filename: 'image.jpg',
          path: path.join(__dirname, '..', 'images/logoUALG.jpg'),
          cid: 'unique@nodemailer.com', // same cid value as in the html img src
        },
      ],
    };
    await transporter.sendMail(mailOptions);
  }
}

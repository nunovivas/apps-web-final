import { Injectable, OnModuleInit } from '@nestjs/common';
import { IotDataService } from '../iot-data/iot-data.service';
import { CreateIotDatumDto } from '../iot-data/dto/create-iot-datum.dto';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(private readonly iotDataService: IotDataService) {}

  onModuleInit() {
    console.log('Connecting to MQTT broker');
    this.connectToBroker();
  }

  private connectToBroker() {
    this.client = mqtt.connect('mqtt://10.37.132.2');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe('Leituras', (err) => {
        if (err) {
          console.error('Failed to subscribe to topic', err);
        } else {
          console.log('Subscribed to topic');
        }
      });
    });

    this.client.on('message', (topic, message) => {
      console.log('Received message:', message.toString());
      this.handleMessage(topic, message.toString());
    });
  }

  private async handleMessage(topic: string, message: string) {
    const data: CreateIotDatumDto = JSON.parse(message);
    await this.iotDataService.create(data);
  }
}

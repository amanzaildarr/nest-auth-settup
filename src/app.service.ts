import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World, This is Pest-Easy!!!!';
  }
  getEnv() {
    return this.configService;
  }
}

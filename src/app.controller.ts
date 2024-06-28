import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiExcludeEndpoint()
  healthCheck() {
    return this.appService.getHello();
  }

  @Get('environment')
  @ApiExcludeEndpoint()
  getEnv() {
    return this.appService.getEnv();
  }
}

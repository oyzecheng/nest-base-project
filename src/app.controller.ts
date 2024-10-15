import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import ConfigEnum from './enum/configEnum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): {
    a: any;
    message: string;
    env: ConfigService<Record<string, unknown>, false>;
  } {
    return {
      message: this.appService.getHello(),
      env: this.configService.get('DATABASE_URL'),
      a: process.env.NODE_ENV,
    };
  }
}

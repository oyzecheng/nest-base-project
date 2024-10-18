import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private redis: RedisService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    await this.redis.set('test', 'test redis value');
    return {
      message: this.appService.getHello(),
      test: await this.redis.get('test'),
      has: await this.redis.has('test'),
    };
  }
}

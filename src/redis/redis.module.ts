import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigurableModuleClass } from './redis.module.defintion';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule extends ConfigurableModuleClass {}

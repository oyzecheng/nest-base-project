import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RedisModuleOptions } from './interfaces/redis.module.options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RedisModuleOptions>()
    .setExtras({ isGlobal: false }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .setClassMethodName('forRoot')
    .build();

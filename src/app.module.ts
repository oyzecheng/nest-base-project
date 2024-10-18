import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExampleModule } from './example/example.module';
import * as dotenv from 'dotenv';
import { RedisModule } from './redis/redis.module';
import ConfigEnum from './enum/configEnum';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    RedisModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          port: config.get(ConfigEnum.REDIS_PORT),
          host: config.get(ConfigEnum.REDIS_HOST),
          username: config.get(ConfigEnum.REDIS_USERNAME),
          password: config.get(ConfigEnum.REDIS_PASSWORD),
          namespace: 'nest-base-project',
        };
      },
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

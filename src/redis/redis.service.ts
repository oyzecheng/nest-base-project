import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './redis.module.defintion';
import { RedisModuleOptions } from './interfaces/redis.module.options';
import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';

@Injectable()
export class RedisService {
  private keyv: Keyv;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: RedisModuleOptions,
  ) {
    const { port, host, username, password, namespace } = this.options;
    const keyvRedis = new KeyvRedis(
      `redis://${username}:${password}@${host}:${port}`,
    );
    this.keyv = new Keyv({ store: keyvRedis, namespace });

    this.keyv.on('error', (err) => {
      console.log('keyv error: ', err);
    });
  }

  set<T>(key: string, value: T, ttl?: number) {
    return this.keyv.set<T>(key, value, ttl);
  }

  get<T>(key: string, options?: { raw: false }) {
    return this.keyv.get<T>(key, options);
  }

  delete(key: string | string[]) {
    return this.keyv.delete(key);
  }

  clear() {
    return this.keyv.clear();
  }

  has(key: string) {
    return this.keyv.has(key);
  }

  disconnect() {
    return this.keyv.disconnect();
  }
}

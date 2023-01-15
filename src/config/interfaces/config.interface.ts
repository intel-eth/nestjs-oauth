/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { RedisOptions } from 'ioredis';
import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  db: MikroOrmModuleOptions;
  redis: RedisOptions;
  jwt: IJwt;
  emailService: IEmailConfig;
  throttler: ThrottlerModuleOptions;
  testing: boolean;
}

/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule, MailerModule],
  providers: [AuthService],
})
export class AuthModule {}

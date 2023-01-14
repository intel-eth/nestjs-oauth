/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { faker } from '@faker-js/faker';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { isJWT, isUUID } from 'class-validator';
import { CommonModule } from '../../common/common.module';
import { config } from '../../config';
import { validationSchema } from '../../config/config.schema';
import { IUser } from '../../users/interfaces/user.interface';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { IAccessToken } from '../interfaces/access-token.interface';
import { IEmailToken } from '../interfaces/email-token.interface';
import { IRefreshToken } from '../interfaces/refresh-token.interface';
import { JwtService } from '../jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema,
          load: [config],
        }),
        CommonModule,
      ],
      providers: [JwtService, CommonModule],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  const user = {
    id: 1,
    email: faker.internet.email().toLowerCase(),
    credentials: {
      version: 2,
    },
  } as IUser;

  describe('access tokens', () => {
    let token: string;

    it('should generate a token', async () => {
      token = await service.generateToken(user, TokenTypeEnum.ACCESS);
      expect(token).toBeDefined();
      expect(isJWT(token)).toBe(true);
    });

    it('should verify a token', async () => {
      const decoded = await service.verifyToken<IAccessToken>(
        token,
        TokenTypeEnum.ACCESS,
      );
      expect(decoded).toBeDefined();
      expect(decoded.id).toEqual(user.id);
      expect(decoded.sub).toEqual(user.email);
      expect(decoded.aud).toEqual(process.env.DOMAIN);
      expect(decoded.iss).toEqual(process.env.APP_ID);
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });

    it('should throw an error if the token is invalid', async () => {
      const invalidToken = token + 'invalid';
      await expect(
        service.verifyToken<IAccessToken>(invalidToken, TokenTypeEnum.ACCESS),
      ).rejects.toThrow('Invalid token');
    });
  });

  describe('refresh tokens', () => {
    let token: string;

    it('should generate a token', async () => {
      token = await service.generateToken(user, TokenTypeEnum.REFRESH);
      expect(token).toBeDefined();
      expect(isJWT(token)).toBe(true);
    });

    it('should verify a token', async () => {
      const decoded = await service.verifyToken<IRefreshToken>(
        token,
        TokenTypeEnum.REFRESH,
      );
      expect(decoded).toBeDefined();
      expect(decoded.id).toEqual(user.id);
      expect(decoded.version).toEqual(user.credentials.version);
      expect(decoded.tokenId).toBeDefined();
      expect(isUUID(decoded.tokenId)).toBe(true);
      expect(decoded.sub).toEqual(user.email);
      expect(decoded.aud).toEqual(process.env.DOMAIN);
      expect(decoded.iss).toEqual(process.env.APP_ID);
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });

    it('should throw an error if the token is invalid', async () => {
      const invalidToken = token + 'invalid';
      await expect(
        service.verifyToken<IRefreshToken>(invalidToken, TokenTypeEnum.REFRESH),
      ).rejects.toThrow('Invalid token');
    });
  });

  describe('confirmation tokens', () => {
    let token: string;

    it('should generate a token', async () => {
      token = await service.generateToken(user, TokenTypeEnum.CONFIRMATION);
      expect(token).toBeDefined();
      expect(isJWT(token)).toBe(true);
    });

    it('should verify a token', async () => {
      const decoded = await service.verifyToken<IEmailToken>(
        token,
        TokenTypeEnum.CONFIRMATION,
      );
      expect(decoded).toBeDefined();
      expect(decoded.id).toEqual(user.id);
      expect(decoded.version).toEqual(user.credentials.version);
      expect(decoded.sub).toEqual(user.email);
      expect(decoded.aud).toEqual(process.env.DOMAIN);
      expect(decoded.iss).toEqual(process.env.APP_ID);
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });

    it('should throw an error if the token is invalid', async () => {
      const invalidToken = token + 'invalid';
      await expect(
        service.verifyToken<IEmailToken>(
          invalidToken,
          TokenTypeEnum.CONFIRMATION,
        ),
      ).rejects.toThrow('Invalid token');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

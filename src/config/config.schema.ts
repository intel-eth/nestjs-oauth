/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import Joi from 'joi';

export const validationSchema = Joi.object({
  APP_ID: Joi.string().uuid({ version: 'uuidv4' }).required(),
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DOMAIN: Joi.string().domain().required(),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  JWT_ACCESS_TIME: Joi.number().required(),
  JWT_CONFIRMATION_SECRET: Joi.string().required(),
  JWT_CONFIRMATION_TIME: Joi.number().required(),
  JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
  JWT_RESET_PASSWORD_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_TIME: Joi.number().required(),
  REFRESH_COOKIE: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_SECURE: Joi.bool().required(),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASSWORD: Joi.string().required(),
});
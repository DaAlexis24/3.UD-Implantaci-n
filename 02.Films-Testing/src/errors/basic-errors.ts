import { env } from '../config/env.ts';
import debug from 'debug';
import { HttpError } from './http-error.ts';

const log = debug(`${env.PROJECT_NAME}:basic-errors`);
log('Defining basic errors...');

export const INTERNAL_ERROR = new HttpError(
  500,
  'Internal Server Error',
  'An unexpected error occurred while processing the request',
);

export const NOT_FOUND_ERROR = new HttpError(
  404,
  'Not Found',
  'The request resource not found',
);

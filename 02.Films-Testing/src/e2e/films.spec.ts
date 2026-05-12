import { env } from '../config/env';
import { seed } from '../config/db-test.seed';
import request from 'supertest';
import { connectDB } from '../config/db-config';
import { createApp } from '../app';
// Lo hacemos para no tener problema de tipado con la variable app
import type { Express } from 'express';

describe('Given a router for films', () => {
  let app: Express;
  const urlBase = '/api/films';

  beforeEach(async () => {
    // Inicializamos una app con la conexión - Assert
    const prisma = await connectDB();
    app = createApp(prisma);
    await seed();
  });

  test('Valid DB in test environment', () => {
    // Verificamos si nos conectamos a la BD correcta
    expect(env.PGDATABASE).toBe('films_db_test');
  });

  test('[GET] /api/films', async () => {
    await request(app).get(urlBase).expect(200);
  });
  test('[GET] /api/films/1', async () => {
    await request(app).get(`${urlBase}/1`).expect(200);
  });
});

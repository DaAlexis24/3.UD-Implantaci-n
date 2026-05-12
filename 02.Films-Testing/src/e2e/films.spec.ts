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
    const response = await request(app).get(urlBase).expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
  });
  test('[GET] /api/films/1', async () => {
    const response = await request(app).get(`${urlBase}/1`).expect(200);
    expect(response.body.id).toBe(1);
  });

  test('[GET] /api/films/100', async () => {
    await request(app).get(`${urlBase}/100`).expect(500);
  });

  test('[POST] /api/films', async () => {
    await request(app).post(urlBase).send({}).expect(201);
  });
});

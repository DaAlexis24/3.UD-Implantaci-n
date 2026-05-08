import type { AppPrismaClient } from '../../config/db-config';
import { FilmsRepo } from './films.repo';

describe('Given a instance of FilmRepo Class', () => {
  // Assert
  const prismaMock = {
    film: {
      findMany: vitest.fn().mockResolvedValue([]),
      findUniqueOrThrow: vitest.fn().mockResolvedValue({}),
      create: vitest.fn().mockResolvedValue({}),
      update: vitest.fn().mockResolvedValue({}),
      delete: vitest.fn().mockResolvedValue({}),
    },
  } as unknown as AppPrismaClient;

  const repo = new FilmsRepo(prismaMock);

  describe('When method getAllFilms is called', () => {
    test('Then it return an array of Films', async () => {
      // Act
      const films = await repo.getAllFilms();
      // Assert
      expect(films).toEqual([]);
    });
  });

  describe('When method getFilmById is called', () => {
    test('Then it return the film', async () => {
      // Act
      const film = await repo.getFilmById(1);
      // Assert
      expect(film).toEqual({});
    });
  });
});

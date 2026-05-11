import { type Mock, vi } from 'vitest';
import type { AppPrismaClient } from '../../config/db-config';
import { FilmsRepo } from './films.repo';
import type { FilmCreateDTO, FilmUpdateDTO } from '../entities/film.dto';

describe('Given a instance of FilmRepo Class', () => {
  let repo: FilmsRepo;
  let prismaMock: AppPrismaClient;

  beforeEach(() => {
    prismaMock = {
      film: {
        findMany: vi.fn().mockResolvedValue([]),
        findUniqueOrThrow: vi.fn().mockResolvedValue({}),
        create: vi.fn().mockResolvedValue({}),
        update: vi.fn().mockResolvedValue({}),
        delete: vi.fn().mockResolvedValue({}),
      },
    } as unknown as AppPrismaClient;
    repo = new FilmsRepo(prismaMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test que verifica si el repo esta inicializado, es recomendable pero no es obligatorio
  describe('When we instantiate it', () => {
    test('Then it should be defined', () => {
      // Act & Assert
      expect(repo).toBeDefined();
    });
    test('Then it should be a instance of FilmRepo', () => {
      // Act & Assert
      expect(repo).toBeInstanceOf(FilmsRepo);
    });
  });

  describe('When method getAllFilms is called', () => {
    test('Then it return an array of Films', async () => {
      // Act
      const films = await repo.getAllFilms();
      // Assert
      expect(films).toEqual([]);
    });
  });

  describe('When method getFilmByID is called', () => {
    describe('And the film with the given id exists', () => {
      test('Then it return the film', async () => {
        // Act
        const film = await repo.getFilmById(1);
        // Assert de implementacion
        expect(prismaMock.film.findUniqueOrThrow).toHaveBeenCalled();
        // Assert
        expect(film).toEqual({});
      });
    });
    describe('And the film with the given id NOT exists', () => {
      test('Then it throw an error', async () => {
        // Arrange
        (prismaMock.film.findUniqueOrThrow as Mock).mockRejectedValueOnce(
          new Error('Film not found'),
        );
        // Act & Assert
        await expect(repo.getFilmById(999)).rejects.toThrow('Film not found');
      });
    });
  });

  describe('When method createFilm is called', () => {
    describe('And there are a genre in data', () => {
      test('Then it return the created film', async () => {
        // Act
        const film = await repo.createFilm({
          genres: ['Action'],
        } as FilmCreateDTO);
        // Assert
        expect(film).toEqual({});
      });
    });
    describe('And there are a NOT genre in data', () => {
      test('Then it return the created film', async () => {
        // Act
        const film = await repo.createFilm({} as FilmCreateDTO);
        // Assert
        expect(film).toEqual({});
      });
    });
  });

  describe('When method updateFilm is called', () => {
    describe('And the film with the given id exists', () => {
      test('Then it return the updated film', async () => {
        // Act
        const film = await repo.updateFilm(1, {
          genres: ['Action'],
        } as FilmUpdateDTO);
        // Assert
        expect(film).toEqual({});
      });
    });
    describe('And the film with the given id NOT exists', () => {
      test('Then it throw an error', async () => {
        // Arrange
        (prismaMock.film.update as Mock).mockRejectedValueOnce(
          new Error('Film not found'),
        );
        // Act & Assert
        await expect(repo.updateFilm(999, {} as FilmCreateDTO)).rejects.toThrow(
          'Film not found',
        );
      });
    });
  });

  describe('When method deleteFilm is called', () => {
    describe('And the film with the given id exists', () => {
      test('Then it return the deleted film', async () => {
        // Act
        const film = await repo.deleteFilm(1);
        // Assert
        expect(film).toEqual({});
      });
    });
    describe('And the film with the given id NOT exists', () => {
      test('Then it throw an error', async () => {
        // Arrange
        (prismaMock.film.delete as Mock).mockRejectedValueOnce(
          new Error('Film not found'),
        );
        // Act & Assert
        await expect(repo.deleteFilm(999)).rejects.toThrow('Film not found');
      });
    });
  });
});

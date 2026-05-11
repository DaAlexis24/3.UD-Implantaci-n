import type { Request, Response, NextFunction } from 'express';
import type { FilmsRepo } from '../repo/films.repo';
import { FilmsController } from './films.controller';
import { InternalServerError } from '../../errors/http-error';

describe('Given a instantiated Films Controller', () => {
  let controller: FilmsController;
  let repo: FilmsRepo;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    repo = {} as FilmsRepo;
    controller = new FilmsController(repo);
    req = {} as Request;
    res = {
      json: vitest.fn(),
      // Fluent, Función que es parte de un objeto que devuelve la misma función
      status: vitest
        .fn()
        .mockReturnValue({ json: vitest.fn(), send: vitest.fn() }),
    } as unknown as Response;
    next = vitest.fn() as NextFunction;
  });

  describe('When we instantiate it', () => {
    test('Then it should be defined', () => {
      // Act & Assert
      expect(controller).toBeDefined();
    });
    test('Then it should be a instance of FilmRepo', () => {
      // Act & Assert
      expect(controller).toBeInstanceOf(FilmsController);
    });
  });

  describe('When method getAllFilms is called', () => {
    describe('And repo return valid data', () => {
      test('Then it call json with a list of films', async () => {
        // Arrange
        repo.getAllFilms = vitest.fn().mockResolvedValueOnce([]);
        // Act
        await controller.getAllFilms(req, res, next);
        // Assert
        expect(repo.getAllFilms).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe('And repo throw an Error', () => {
      test('Then it return a error ', async () => {
        // Assert
        repo.getAllFilms = vitest
          .fn()
          .mockRejectedValueOnce(new Error('Any error message'));
        // Act
        await controller.getAllFilms(req, res, next);
        // Assert
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({} as InternalServerError),
        );
      });
    });
  });
});

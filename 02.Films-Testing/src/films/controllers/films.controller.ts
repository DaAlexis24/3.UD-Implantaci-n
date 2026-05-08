import { env } from '../../config/env.ts';
import debug from 'debug';
import type { FilmsRepo } from '../repo/films.repo.ts';
import type { Request, Response, NextFunction } from 'express';
import type { Film } from '../entities/film.entity.ts';
import type { FilmUpdateDTO } from '../entities/film.dto.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { NotFoundError, InternalServerError } from '../../errors/http-error.ts';

const log = debug(`${env.PROJECT_NAME}:controller:films`);
log('Loading Films Controller...');

export class FilmsController {
  #repo: FilmsRepo;
  constructor(repo: FilmsRepo) {
    this.#repo = repo;
  }

  async getAllFilms(_req: Request, res: Response, next: NextFunction) {
    try {
      log('Getting all films...');
      const films: Film[] = await this.#repo.getAllFilms();
      return res.json(films);
    } catch (error) {
      const internalError = new InternalServerError('Failed to get all films', {
        cause: error,
      });
      log('Error when getting all films: %O', internalError.message);
      return next(internalError);
    }
  }

  async getFilmById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Get Film: %O', id);
      const film: Film = await this.#repo.getFilmById(id);
      return res.json(film);
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Film Requested not found', {
          cause: error,
        });
        log('Error getting film by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const internalError = new InternalServerError(
        'Failed to get film by id',
        { cause: error },
      );
      log('Error getting film by id: %s', internalError.message);
      return next(internalError);
    }
  }

  async createFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const filmData = req.body;
      log('Creating film: %0', filmData);
      const newFilm: Film = await this.#repo.createFilm(filmData);
      return res.status(201).json(newFilm);
    } catch (error) {
      const internalError = new InternalServerError('Failed to create film', {
        cause: error,
      });
      log('Error creating film by id: %s', internalError.message);
      return next(internalError);
    }
  }

  async updateFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Updating film with ID: %O', id);
      const filmData: FilmUpdateDTO = req.body; // Validate this data in a real application
      const film: Film = await this.#repo.updateFilm(id, filmData);
      return res.json(film);
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Film for update not found', {
          cause: error,
        });
        log(
          'Error because film for updating not found: %s',
          notFoundError.message,
        );
        return next(notFoundError);
      }
      const internalError = new InternalServerError('Failed to update film', {
        cause: error,
      });
      log('Error updating film: %s', internalError.message);
      return next(internalError);
    }
  }

  async deleteFilm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Deleting film with ID: %O', id);
      await this.#repo.deleteFilm(id);
      return res.status(204).end();
    } catch (error) {
      log('Error getting film by id: %O', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Film for deletion not found', {
          cause: error,
        });
        log('Error deleting film: %s', notFoundError.message);
        return next(notFoundError);
      }
      const internalError = new InternalServerError('Failed to delete film', {
        cause: error,
      });
      log('Error deleting films: %s', internalError.message);
      return next(internalError);
    }
  }
}

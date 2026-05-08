import { env } from '../../config/env.ts';
import debug from 'debug';
import type { GenresRepo } from '../repo/genres.repo.ts';
import type { Request, Response, NextFunction } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/http-error.ts';
import type { Genre, GenreDetail } from '../entities/genre.entity.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

const log = debug(`${env.PROJECT_NAME}:controller:genres`);
log('Loading Genres Controller..');

export class GenresController {
  #repo: GenresRepo;
  constructor(repo: GenresRepo) {
    this.#repo = repo;
  }

  async getAllGenres(_req: Request, res: Response, next: NextFunction) {
    try {
      log('Getting all genres...');
      const genres: Genre[] = await this.#repo.getAllGenres();
      return res.json(genres);
    } catch (error) {
      const finalError = new InternalServerError(
        'Error when fetching all genres',
        { cause: error },
      );
      log('Error when getting all genres: %s', finalError.message);
      return next(finalError);
    }
  }

  async getGenreById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      log('Get Genre: %s', id);
      const genre: GenreDetail = await this.#repo.getGenreById(id);
      return res.json(genre);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre Not Found', {
          cause: error,
        });
        log('Error when searching genre by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError(
        'Error when fetching all genres',
        { cause: error },
      );
      log('Error when getting all genres: %s', finalError.message);
      return next(finalError);
    }
  }

  async createGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const genreData = req.body;
      log('Creating genre: %0', genreData);
      const newGenre: Genre = await this.#repo.createGenre(genreData);
      return res.status(201).json(newGenre);
    } catch (error) {
      const finalError = new InternalServerError('Error creating genre', {
        cause: error,
      });
      log('Error creating genre: %s', finalError.message);
      return next(finalError);
    }
  }

  async updateGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const name: string = req.body.name;
      // Validated previously with zod middleware
      log('Updating genre with ID: %s', id);
      const genre: Genre = await this.#repo.updateGenre(id, name);
      return res.json(genre);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre for update not found', {
          cause: error,
        });
        log('Error updating genre: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError('Failed to update genre', {
        cause: error,
      });
      log('Error updating genre: %s', finalError.message);
      return next(finalError);
    }
  }

  async deleteGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // Validate this data in a real application
      log('Deleting genre with ID: %O', id);
      await this.#repo.deleteGenre(id);
      return res.status(204).end();
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const notFoundError = new NotFoundError('Genre Not Found', {
          cause: error,
        });
        log('Error deleting genre by id: %s', notFoundError.message);
        return next(notFoundError);
      }
      const finalError = new InternalServerError('Error deleting genre', {
        cause: error,
      });
      log('Error deleting genre: %s', finalError.message);
      return next(finalError);
    }
  }
}

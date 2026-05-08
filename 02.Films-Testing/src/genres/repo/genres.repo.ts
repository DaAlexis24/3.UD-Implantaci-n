import { env } from '../../config/env.ts';
import debug from 'debug';
import type { AppPrismaClient } from '../../config/db-config';
import type { Genre, GenreDetail } from '../entities/genre.entity.ts';
import type { GenreCreateDTO } from '../entities/genre.dto.ts';
const log = debug(`${env.PROJECT_NAME}:repo:genres`);
log('Loading Genres Repo');

export class GenresRepo {
  #prisma: AppPrismaClient;
  constructor(prisma: AppPrismaClient) {
    this.#prisma = prisma;
  }

  async getAllGenres(): Promise<Genre[]> {
    log('Getting all genres...');
    return await this.#prisma.genre.findMany();
  }

  async getGenreById(id: number): Promise<GenreDetail> {
    log('Getting genre with id %d', id);
    return await this.#prisma.genre.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        films: {
          include: {
            genres: {
              omit: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async createGenre(genreData: GenreCreateDTO): Promise<Genre> {
    log('Creating genre with name %s', genreData.name);
    return await this.#prisma.genre.create({
      data: {
        name: genreData.name,
      },
    });
  }

  async updateGenre(id: number, name: GenreCreateDTO['name']): Promise<Genre> {
    log('Updating genre with id %s', id);
    return await this.#prisma.genre.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async deleteGenre(id: number): Promise<Genre> {
    log('Deleting genre with id %d', id);
    return await this.#prisma.genre.delete({
      where: {
        id,
      },
    });
  }
}

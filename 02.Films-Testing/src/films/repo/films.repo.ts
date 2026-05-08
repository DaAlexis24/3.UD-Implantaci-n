import { env } from '../../config/env.ts';
import debug from 'debug';
import type { AppPrismaClient } from '../../config/db-config';
import type { Film } from '../entities/film.entity.ts';
import type { FilmCreateDTO, FilmUpdateDTO } from '../entities/film.dto.ts';

const log = debug(`${env.PROJECT_NAME}:repo:films`);
log('Loading Films Repo');

export class FilmsRepo {
  #prisma: AppPrismaClient;
  constructor(prisma: AppPrismaClient) {
    this.#prisma = prisma;
  }

  // selecciono todas las películas
  async getAllFilms(): Promise<Film[]> {
    log('Getting all films!');
    return this.#prisma.film.findMany({
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
        // reviews: {
        //   omit: {
        //     filmID: true,
        //     userID: true,
        //   },
        // },
      },
    }) as Promise<Film[]>;
  }

  async getFilmById(id: number): Promise<Film> {
    log('Getting film with id %d', id);
    return await this.#prisma.film.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
      },
    });
  }

  async createFilm(filmData: FilmCreateDTO): Promise<Film> {
    log('Creating fil with title %s', filmData.title);
    const result = await this.#prisma.film.create({
      data: {
        title: filmData.title,
        year: filmData.year,
        director: filmData.director,
        duration: filmData.duration,
        poster: filmData.poster,
        rate: filmData.rate,
        genres: {
          connect: filmData.genres?.map((genre) => ({ name: genre })) ?? [],
        },
      },
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
      },
    });

    return result;
  }

  async updateFilm(id: number, filmData: FilmUpdateDTO): Promise<Film> {
    log('Updating film with id %d', id);
    return await this.#prisma.film.update({
      where: {
        id,
      },
      data: {
        title: filmData.title,
        year: filmData.year,
        director: filmData.director,
        duration: filmData.duration,
        poster: filmData.poster,
        rate: filmData.rate,
        genres: filmData.genres && {
          set: filmData.genres?.map((genre) => ({ name: genre })) ?? [],
        },
      },
      include: {
        genres: {
          omit: {
            id: true,
          },
        },
      },
    });
  }

  async deleteFilm(id: number): Promise<Film> {
    log('Deleting film with id %d', id);
    return await this.#prisma.film.delete({
      where: {
        id,
      },
    });
  }
}

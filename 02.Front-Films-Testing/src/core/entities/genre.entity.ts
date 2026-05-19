import { z } from 'zod';

export const GenreModelSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const GenreDetailFilmModelSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  director: z.string(),
  duration: z.number(),
  poster: z.string().nullable(),
  rate: z.instanceof(Number),
});

export const GenreDetailModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  films: z.array(GenreDetailFilmModelSchema),
});

export type Genre = z.infer<typeof GenreModelSchema>;
export type GenreDetail = z.infer<typeof GenreDetailModelSchema>;

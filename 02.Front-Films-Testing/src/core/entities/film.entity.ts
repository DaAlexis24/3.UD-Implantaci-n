import { z } from 'zod';
import { GenreModelSchema } from './genre.entity';

const FilmReviewProfileModelSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
});

const FilmReviewUserModelSchema = z
  .object({
    profile: FilmReviewProfileModelSchema.nullable(),
  })
  .nullable();

const FilmReviewModelSchema = z.object({
  review: z.string(),
  rate: z.instanceof(Number),
  date: z.date(),
  user: FilmReviewUserModelSchema,
});

export const FilmModelSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  director: z.string(),
  duration: z.number(),
  poster: z.string().nullable(),
  rate: z.instanceof(Number),
  genres: z.array(GenreModelSchema.omit({ id: true })).optional(),
  reviews: z.array(FilmReviewModelSchema).optional(),
});

export type Film = z.infer<typeof FilmModelSchema>;

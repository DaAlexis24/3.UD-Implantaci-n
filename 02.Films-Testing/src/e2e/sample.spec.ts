import { env } from '../config/env';
import { seed } from '../config/db-test.seed';

test('Sample', () => {
  seed();
  expect(env.PGDATABASE).toBe('films_db_test');
});

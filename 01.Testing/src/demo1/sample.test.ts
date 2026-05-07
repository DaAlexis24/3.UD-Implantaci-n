// import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { add } from './sample.ts';

describe('Given add function', () => {
  beforeAll(() => {
    //  Setup
  });

  afterAll(() => {
    // Cleanup env
  });

  describe('When adding 2 and 3', () => {
    test('Then it should return 5', () => {
      const result = add(2, 3);
      // Add your EXPECTATIONS here
      expect(result).toBe(5);
    });
  });

  // AAA
  test('It should add 10 and 5 correctly returning 15', () => {
    // Arrange
    const a = 10;
    const b = 5;
    const expected = 15;
    // Act
    const result = add(a, b);
    // Add
    expect(result).toBe(expected);
  });
});

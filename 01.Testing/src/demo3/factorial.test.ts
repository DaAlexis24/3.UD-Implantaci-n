import { factorial } from './factorial.ts';

describe('Given Factorial function', () => {
  describe('When it get 0', () => {
    test('Then it should return 1', () => {
      // Arrange
      expect(factorial(0)).toBe(1);
    });
  });
  test('When it get 1, then should return 1', () => {
    expect(factorial(1)).toBe(1);
  });
  test('When it get 5, then should return 120', () => {
    expect(factorial(5)).toBe(120);
  });
  test('When it get 20, then should return 2.432.902.008.176.640.000', () => {
    expect(factorial(20)).toBe(2_432_902_008_176_640_000);
  });
  test('When it get 171, then should throw an Error', () => {
    expect(() => factorial(171)).toThrow('Invalid input');
  });
  test('When it get -2, then should throw and Error', () => {
    expect(() => factorial(-2)).toThrow('Invalid input');
  });
  test('When it get 2.2, then should throw and Error', () => {
    expect(() => factorial(2.2)).toThrow('Invalid input');
  });
});

describe('factorial', () => {
  test.each([
    [0, 1],
    [1, 1],
    [2, 2],
    [5, 120],
  ])('should return %i when n is %i', (n, expected) => {
    expect(factorial(n)).toBe(expected);
  });
});

describe('factorial with each and objects', () => {
  test.each([
    { n: 0, expected: 1 },
    { n: 1, expected: 1 },
    { n: 2, expected: 2 },
    { n: 5, expected: 120 },
  ])('should return $expected when n is $n', ({ n, expected }) => {
    expect(factorial(n)).toBe(expected);
  });
});

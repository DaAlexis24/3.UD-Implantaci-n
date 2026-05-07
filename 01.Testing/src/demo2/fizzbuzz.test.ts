/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 */

import { fizzbuzz } from './fizzbuzz.ts';

describe('Given FizzBuzz function', () => {
  describe('When it receives 3', () => {
    test('Then it should return Fizz', () => {
      // Arrange
      const input = 3;
      const expectedOutput = 'Fizz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
});

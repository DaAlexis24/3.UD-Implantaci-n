/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 */

import { vi } from 'vitest';
import { fizzbuzz, fizzBuzzSerie } from './fizzbuzz.ts';

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
  describe('When it receives 9', () => {
    test('Then it should return Fizz', () => {
      // Arrange
      const input = 9;
      const expectedOutput = 'Fizz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 5', () => {
    test('Then it should return Buzz', () => {
      // Arrange
      const input = 5;
      const expectedOutput = 'Buzz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 10', () => {
    test('Then it should return Buzz', () => {
      // Arrange
      const input = 10;
      const expectedOutput = 'Buzz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 15', () => {
    test('Then it should return FizzBuzz', () => {
      // Arrange
      const input = 15;
      const expectedOutput = 'FizzBuzz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 30', () => {
    test('Then it should return FizzBuzz', () => {
      // Arrange
      const input = 30;
      const expectedOutput = 'FizzBuzz';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 1', () => {
    test('Then it should return 1', () => {
      // Arrange
      const input = 1;
      const expectedOutput = '1';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
  describe('When it receives 13', () => {
    test('Then it should return 13', () => {
      // Arrange
      const input = 13;
      const expectedOutput = '13';
      // Act
      const result = fizzbuzz(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
});

describe('Given fizzBuzzSerie function', () => {
  describe('When its calls 10 times', () => {
    test('Then console.log would be call 10 times ', () => {
      //Arrange
      const limit = 10;
      vi.spyOn(console, 'log');
      // Act
      fizzBuzzSerie(limit);
      // Assert
      expect(console.log).toHaveBeenCalledTimes(limit);
    });
  });
});

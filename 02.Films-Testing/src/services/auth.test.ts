import type { TokenPayload } from '../types/login';
import { AuthService } from './auth';
describe('Given method hash from class AuthService', () => {
  describe('When it is executed', () => {
    test('Then return a string', async () => {
      // Arrange
      const password = '123456';
      // Act
      const hash = await AuthService.hash(password);
      // Assert
      expect(hash).toBeTypeOf('string');
      expect(hash.length).toBeGreaterThan(password.length);
    });
  });
});

describe('Given method compare from class AuthService', () => {
  describe('When it is executed with a valid password', () => {
    test('Then it would return true', async () => {
      // Arrange
      const password = '123456';
      const hash = await AuthService.hash(password);
      // Act
      const result = await AuthService.compare(password, hash);
      // Assert
      expect(result).toBe(true);
    });
  });

  describe('When it is executed with a invalid password', () => {
    test('Then it would return false', async () => {
      // Arrange
      const password = '123456';
      const hash = await AuthService.hash('Otra cosa');
      // Act
      const result = await AuthService.compare(password, hash);
      // Assert
      expect(result).toBe(false);
    });
  });
});

describe('Given method generateTokenAsync from class Auth Service', () => {
  describe('When it is executed', () => {
    test('Then it would return a token (string)', async () => {
      //Arrange
      const algToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const payload = { id: 12 } as TokenPayload;
      // Act
      const token = await AuthService.generateTokenAsync(payload);
      // Assert
      expect(token).toBeTypeOf('string');
      expect(token).toContain(algToken);
    });
  });
});

describe('Given method verifyToken from class AuthService', () => {
  describe('When it executed with valid token', () => {
    test('Then it would return payload', async () => {
      // Arrange
      const payloadMock = { id: 12 } as TokenPayload;
      const token = await AuthService.generateTokenAsync(payloadMock);
      // Act
      const { iat, ...result } = await AuthService.verifyTokenAsync(token);
      // Assert
      expect(iat).toBeTypeOf('number');
      expect(result).toEqual(payloadMock);
    });
  });

  describe('When it is executed with INVALID token', () => {
    test('Then it would reject the promise', () => {
      // Arrange
      const badToken = 'no soy un token';
      // Act + Assert
      expect(AuthService.verifyTokenAsync(badToken)).rejects.toThrow();
    });
  });
});

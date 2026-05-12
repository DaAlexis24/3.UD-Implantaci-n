import type { Request, Response, NextFunction } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { HttpError } from '../errors/http-error';
import { AuthService } from '../services/auth';
import type { TokenPayload } from '../types/login';

describe('Given a instance of AuthInterceptor class', () => {
  // Arrange
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    // Arrange
    req = {
      header: vitest.fn().mockReturnValue('Bearer Token'),
    } as unknown as Request;
    res = {} as Response;
    next = vitest.fn() as NextFunction;

    authInterceptor = new AuthInterceptor();
  });
  describe('And method authenticate is called', () => {
    describe('When the user data are ok', () => {
      test('Then next would be called without arguments', async () => {
        // Arrange
        vitest.spyOn(AuthService, 'verifyTokenAsync').mockResolvedValue({
          id: '1',
        } as unknown as TokenPayload);
        // Act
        await authInterceptor.authenticate(req, res, next);
        // Assert
        expect(req.user).toStrictEqual({ id: '1' });
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe('When the req have NOT authorization header', () => {
      test('Then next would be called with arguments', async () => {
        // Assert
        req.header = vitest.fn().mockReturnValue('Test');
        // Act
        await authInterceptor.authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({} as HttpError),
        );
      });
    });

    describe('When the req have authorization header NOT Bearer', () => {
      test('Then next would be called with arguments', async () => {
        // Assert
        req.header = vitest.fn().mockReturnValue('No_Bearer Token');
        // Act
        await authInterceptor.authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({} as HttpError),
        );
      });
    });

    describe('When the req have authorization header with NOT valid token', () => {
      test('Then next would be called with arguments', async () => {
        // Arrange
        vitest
          .spyOn(AuthService, 'generateTokenAsync')
          .mockRejectedValueOnce(new Error());
        // Act
        await authInterceptor.authenticate(req, res, next);
        // Assert
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({} as HttpError),
        );
      });
    });
  });
});

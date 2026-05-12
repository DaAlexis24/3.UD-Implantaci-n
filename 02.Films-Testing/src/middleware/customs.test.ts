import { customHeaders } from './customs';
import type { Request, Response, NextFunction } from 'express';

describe('Given customHeader middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = { setHeader: vitest.fn() } as unknown as Response;
    next = vitest.fn() as NextFunction;
  });

  describe('When the middleware has created and called', () => {
    test('Then next would be called without arguments', () => {
      // Arrange
      const project = '';
      const middleware = customHeaders(project);
      // Act
      middleware(req, res, next);
      // Assert
      expect(next).toHaveBeenCalledWith();
    });

    test('And the middleware would return setHeader with information', () => {
      const project = '';
      const middleware = customHeaders(project);

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith('X-Project', project);
    });
  });
});

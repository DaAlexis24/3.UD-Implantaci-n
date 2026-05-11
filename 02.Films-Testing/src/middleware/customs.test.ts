import { customHeaders } from './customs';
import type { Request, Response, NextFunction } from 'express';

describe('Given customHeaders function', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = { setHeader: vitest.fn() } as unknown as Response;
    next = vitest.fn() as NextFunction;
  });

  describe('When it receives a string', () => {
    test('Then it return a res with a X-Project header and project', () => {
      // Arrange
      const project = '';
      // Act
      customHeaders(project);
      // Assert
      expect(res.setHeader).toHaveBeenCalledWith('X-Project', project);
      expect(next).toHaveBeenCalled();
    });
  });
});

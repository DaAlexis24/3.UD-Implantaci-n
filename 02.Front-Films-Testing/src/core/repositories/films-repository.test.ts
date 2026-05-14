import { FilmsRepository } from './films-repository';

describe('Given an instance of Films repository', () => {
  const repo = new FilmsRepository();
  describe('When method getAll is called', () => {
    describe('And fetch response is ok', () => {
      beforeEach(() => {
        // Arrange
        // Mock fetch usando Vitest
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
          ok: true,
          json: vi.fn().mockResolvedValueOnce([]),
        } as unknown as Response);
      });

      test('Then it return data', async () => {
        // Act
        const films = await repo.getAll();
        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(films).toBeInstanceOf(Array);
      });
    });

    describe('And fetch response is NOT ok', () => {
      beforeEach(() => {
        // Arrange
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
          ok: false,
        } as unknown as Response);
      });
      test('Then it reject the promise', async () => {
        // Act - Assert
        await expect(repo.getAll()).rejects.toThrow();
      });
    });
  });
});

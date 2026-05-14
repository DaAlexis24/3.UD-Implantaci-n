import { getByRole, getByText } from '@testing-library/dom';
import { Header } from './header';

Header.render();
const container = document.createElement('div');
container.innerHTML = '<app-header></app-header>';

describe('Given an instance of Header', () => {
  describe('When it is render in a container', () => {
    test('Then we can test it with the testing library', () => {
      const e = getByRole(container, 'banner');
      expect(e).toBeInstanceOf(HTMLElement);

      getByText(container, /claro/i);
    });
  });
});

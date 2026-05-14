import { Footer } from './footer';
import {
  getAllByRole,
  getByRole,
  getByTestId,
  getByText,
} from '@testing-library/dom';

customElements.define('app-footer', Footer);
const container = document.createElement('div');
container.innerHTML = '<app-footer></app-footer>';

test('Footer', () => {
  getByRole(container, 'contentinfo', {
    name: 'main-footer',
  });
  getByText(container, /Alcobendas/);
  //   getByTitle(container, 'pataa');
  getByTestId(container, 'footer');

  const items = getAllByRole(container, 'listitem');
  expect(items.length).toBe(4);
});

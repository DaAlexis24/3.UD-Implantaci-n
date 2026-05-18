import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Counter } from './counter';

describe('Given Header component', () => {
  const render = (
    element: HTMLElement = document.createElement(Counter.selector),
  ) => {
    element.setAttribute('counterId', '12');
    Counter.register(); // customElements.define('app-header', Header);
    document.body.append(element);
    return element;
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('registers safely when called more than once', () => {
    expect(() => {
      Counter.register();
      Counter.register();
    }).not.toThrow();
  });

  test('element could be instantiated', () => {
    const element = render();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element).toBeInstanceOf(Counter);
  });

  describe('When the component has been render', () => {
    beforeEach(() => {
      render();
    });

    test('Then the heading has the id 12', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent(/12/);
    });

    test('Then the button is in the document', () => {
      const btnElement = screen.getByRole('button');
      expect(btnElement).toBeInTheDocument();
      // Se usa cuando lo que mostramos en el HTML es un cambio de estado, en este caso se da cuando haces click en el botón
      const outputElement = screen.getByRole('status');
      expect(outputElement).toBeInTheDocument();
    });

    test('Then the counter button could be increased if it clicked', async () => {
      const btnElement = screen.getByRole('button');
      const outputElement = screen.getByRole('status');
      expect(outputElement).toHaveValue('0');
      await userEvent.click(btnElement);
      expect(outputElement).toHaveValue('1');
    });
  });
});

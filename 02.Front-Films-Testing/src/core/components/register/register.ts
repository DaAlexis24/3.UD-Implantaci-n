import {
  RegisterUserModelSchema,
  type RegisterUser,
} from '../../entities/user.entity';
import './register.css';

export class Register extends HTMLElement {
  static selector = 'app-register';
  static register() {
    if (customElements.get(Register.selector) === undefined) {
      customElements.define(Register.selector, Register);
    }
  }

  #template!: string;

  constructor() {
    super();
    this.#setTemplate();
  }

  connectedCallback() {
    this.#render();
    this.#registerEvent();
  }

  #setTemplate(): void {
    this.#template = /*html*/ `
      <form class="register" aria-label="registro de usuario">
        <h2>Registro</h2>
        <label>
          Email
          <input type="email" name="email" required autocomplete="email" />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            required
            autocomplete="new-password"
          />
        </label>
        <label>
          Rol
          <select disabled aria-describedby="role-info">
            <option value="USER" selected>Usuario</option>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <input type="hidden" name="role" value="USER" />
          <span id="role-info">El registro crea siempre usuarios.</span>
        </label>
        <fieldset>
          <legend>Perfil</legend>
          <label>
            Nombre
            <input type="text" name="firstName" autocomplete="given-name" />
          </label>
          <label>
            Apellidos
            <input type="text" name="surname" autocomplete="family-name" />
          </label>
          <label>
            Avatar
            <input type="file" name="avatar" autocomplete="photo" />
          </label>
        </fieldset>
        <p class="register__error" aria-live="polite"></p>
        <button type="submit">Crear cuenta</button>
      </form>
    `;
  }

  #render(): void {
    this.innerHTML = this.#template;
  }

  #registerEvent() {
    const form = this.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', this.#handleSubmit);
  }

  #handleSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userData = this.#getUserData(formData);
    const result = RegisterUserModelSchema.safeParse(userData);

    if (!result.success) {
      this.#handleError(result.error.message);
      return;
    }

    this.#clearError();
    
    this.dispatchEvent(
      new CustomEvent<RegisterUser>('user:register', {
        detail: result.data,
        bubbles: true,
        composed: true,
      }),
    );

    form.reset();
  };

  #getUserData(formData: FormData): RegisterUser {
    const firstName = formData.get('firstName')?.toString() ?? '';
    const surname = formData.get('surname')?.toString() ?? '';
    const avatar = formData.get('avatar') as File | null;

    const profile = {
      firstName,
      surname,
      ...(avatar ? { avatar } : {}),
    };

    return {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      role: formData.get('role')?.toString() as RegisterUser['role'],
      profile: Object.values(profile).some(Boolean) ? profile : undefined,
    };
  }

  #handleError(message: string) {
    const errorElement = this.querySelector('.register__error');
    if (errorElement) {
      errorElement.textContent = message;
    }
    this.#dispatchInvalidRegisterEvent(message);
  }

  #clearError() {
    const errorElement = this.querySelector('.register__error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  #dispatchInvalidRegisterEvent(message: string) {
    this.dispatchEvent(
      new CustomEvent('invalid-register-user', {
        bubbles: true,
        detail: { message },
      }),
    );
  }
}

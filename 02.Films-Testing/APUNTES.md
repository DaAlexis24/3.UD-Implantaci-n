# Test Films

## Auth Test

Podemos generar mocks dentro de nuestros tests.

## FilmsRepo - Testing

El problema que tiene usar constantes que están fuera del contexto del testing es que no se cumplen las buenas prácticas a la hora de realizar un test.

Para resolver ello se recomienda usar el bloque beforeEach para definir el mock y el repositorio, y un afterEach para limpiar el mock.

> [!IMPORTANT]
> Los tests tienen que ser completamente **independientes** uno del otro, ya que Vitest los realiza de manera simultánea y eso puede generar problemas cuando se usa un mock para la simulación.

### Diferencias en Happy Path y Sad Path

El Happy Path se da cuando solo existe un escenario para testear, como se da en este test:

```ts
describe('When method getAllFilms is called', () => {
    test('Then it return an array of Films', async () => {
        // Act
        const films = await repo.getAllFilms();
        // Assert
        expect(films).toEqual([]);
    });
});
```

Acá solo buscamos que getAllFilms nos devuelva un array, no se conecta a ninguna base de datos u otro medio externo, también a ello se le conoce como **test unitario**

Los Sad Path, en cambio, son tests que tienen 2 o más posibles salidas, como en este caso:

```ts
describe('When method getFilmByID is called', () => {
    describe('And the film with the given id exists', () => {
        test('Then it return the film', async () => {
            // Act
            const film = await repo.getFilmById(1);
            // Assert de implementacion
            expect(prismaMock.film.findUniqueOrThrow).toHaveBeenCalled();
            // Assert
            expect(film).toEqual({});
        });
    });
    describe('And the film with the given id NOT exists', () => {
        test('Then it throw an error', async () => {
            // Arrange
            (prismaMock.film.findUniqueOrThrow as Mock).mockRejectedValueOnce(
                new Error('Film not found'),
            );
            // Act & Assert
            await expect(repo.getFilmById(999)).rejects.toThrow(
                'Film not found',
            );
        });
    });
});
```

En este caso es un test de un método que nos puede devolver un objeto si existe o nos devuelve un throw si no es así, para ello tenemos que conectarnos a la base de datos que estamos usando, para ello está el Mock.

## ReviewRepo - Testing

En este caso usaremos los métodos de test como **toHaveBeenCalled** para cerciorarnos que estamos llamando a la función cuando realizamos el test.

Recordemos que los mocks de Vitest funcionan como un spy, así que el método anterior es super importante.

## UsersRepo - Testing

Tenemos un inconveniente en este test, ya que tenemos que importar algo que nos viene de fuera de nuestro entorno de trabajo, el servicio **Auth Service**

Así que vamos a separar este test, por fines académicos, en 2 variantes: Unitarios o Integración.

## Test para Controllers

En este caso lo que hacemos es inicializar el controlador, el repositorio y los tipos nativos de Express que se usan a la hora de controlar la entrada, salida y paso de datos, así que vamos a definir las variables iniciales con su tipo correspondiente.

```ts
let controller: FilmsController;
let repo: FilmsRepo;
let req: Request;
let res: Response;
let next: NextFunction;
```

Luego los instanciamos en el **BeforeEach**

```ts
beforeEach(() => {
    repo = {} as FilmsRepo;
    controller = new FilmsController(repo);
    req = {} as Request;
    res = {
        json: vitest.fn(),
        status: vitest
            .fn()
            .mockReturnValue({ json: vitest.fn(), send: vitest.fn() }),
    } as unknown as Response;
    next = vitest.fn() as NextFunction;
});
```

## Test End to End

Al tener un API REST, este test se puede realizar con herramientas externas como Postman. O también podemos buscar algo más integrado con nuestro entorno de pruebas, aquí entran los **super Tests**

Estos archivos suelen estar definidos como **.spec** o **.e2e**

Sirve para testear rutas o los endpoints de una aplicación

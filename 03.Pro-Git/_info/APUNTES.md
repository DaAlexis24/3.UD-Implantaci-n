# PRO Git

## Breve resumen

Git es un SCV (Sistema de Control de Versiones) distribuido.

Git funciona con 3 áreas distintas.

- Working Area
- Staging Area
- Repository

Las 2 primeras pertenecen al **mundo de los archivos**, ya que solo vamos a trabajar con ellos en estos espacios. Los comandos que se usan usualmente en este "mundo" son: `git status`, `git add` y `git restore --staged </file>`

Para pasar los archivos del staging area al repository usamos el más que conocido `git commit -m </descripción del commit>`.

Para verificar el estado de los commits de un repository usaremos el comando `git log`, ya que en este "mundo" ya no trabajamos con archivos, sino como commits. Si queremos información exacta de un commit en específico usamos `git show`

> [!IMPORTANT]
> Siempre tenemos que tener los ficheros **.gitignore** y **README.md** cuando creemos un repositorio

Los estados de un archivo en Git son:

- Untracked: Archivos recientemente creados y por ello Git no tiene información de ellos.
- Tracked: Son ficheros que ya han sido guardados en un commit, por ello Git tiene información de ellos. Entre este estado tenemos:
  - Modified: Si se realiza un cambio en algún fichero, Git lo detecta y guarda una versión posterior del archivo, para que el usuario lo pueda comparar.
  - Staged: Cuando realizamos `git add` y seleccionamos al fichero, se selecciona este estado, para indicarnos que esta listo para guardarlo en un commit.

## Semántica de los Commits

En un entorno de un proyecto, lo recomendable a la hora de realizar tus commits es seguir un patrón determinado según la modificación que se realice en el proyecto. Esto lo podemos revisar en el blog de [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

## Referenciamos revisiones y paths

### Anatomía de los comandos

Un comando de Git tiene como estructura:

- Comando y opciones
- Flags
- Paths
- Referencias

### Paths

Son los ficheros y directorios a los que queremos incluir en nuestro commit pero de manera general

### Referencias

Son los commits y las ramas a los que queremos hacer referencia. Existen distintos tipos

- Absolutas: Identifica un commit o su sub-cadena usando los primos 5 caracteres de su hash
- Simbólicas: Son las etiquetas de Git. HEAD para la rama actual, las demás ramas que tiene el proyecto y las tags
- Relativas: Nos ayuda a la hora de acceder a commits anteriores o posteriores según el caso. Usan la virgulilla (~) y el circunflejo (^), aunque este no tanto. Los ejemplos más comunes son: `HEAD~1` para ir al padre del commit actual, `HEAD~n` para el "n" ésimo padre del commit actual.

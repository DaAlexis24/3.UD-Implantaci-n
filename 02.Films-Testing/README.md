# Films - Lógica del negocio

API de películas, géneros, reviews y usuarios (perfil)

## Organización de Relaciones

- Películas -- n:n --> géneros
- [Películas -- n:n --> usuarios]
- Películas -- 1:n --> reviews
- Usuarios -- 1:n --> reviews
- Perfil -- 1:1 --> Usuarios

## Endpoints y Grados de Protección

- [GET] /api/peliculas
- [GET] /api/peliculas/:id
- [POST] /api/peliculas (Admin/Editor)
- [PATCH] /api/peliculas/:id (Admin/Editor)
- [DELETE] /api/peliculas/:id (Admin/Editor)

- [POST] /api/auth/registro
- [POST] /api/auth/login

- [GET] /api/user/:id (Owner or Anyone)
- [PATCH] /api/user/:id (Owner)
- [DELETE] /api/user/:id (Owner/Admin)

- [GET] /api/reviews/film/:filmId (User)
- [GET] /api/reviews/user/:userId (User)
- [GET] /api/reviews/:filmId/:userId (User)
- [POST] /api/reviews/:filmId/ (Owner) => Token: userId
- [PATCH] /api/reviews/:filmId/ (Owner) => Token: userId
- [DELETE] /api/reviews/:filmId/ (Owner/Admin) => Token: userId

Los Tokens tienen como desventaja su caducidad, aunque sea finita, permite que cualquiera que lo tenga haga lo que quieran.

Como solución, se pueden usar las API KEYS, ya que se pueden cancelar

## Stack

Prisma

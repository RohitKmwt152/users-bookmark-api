## Users Bookmark API (NestJS + Prisma)

A RESTful API to manage users and their bookmarks. Built with NestJS 11, Prisma ORM, PostgreSQL, and JWT authentication.

### Tech stack

- **Runtime**: Node.js, TypeScript
- **Framework**: NestJS
- **ORM**: Prisma
- **DB**: PostgreSQL (Docker)
- **Auth**: JWT (argon2 password hashing)
- **Testing**: Jest, Supertest, Pactum (e2e)

### Requirements

- Node.js 18+
- Docker (for local Postgres)

### Getting started

1) Install dependencies

```bash
npm install
```

2) Environment variables

Create `.env` for development and `.env.test` for e2e tests. Example values:

```bash
# .env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/nestjs?schema=public"
JWT_SECRET="super-secret-jwt"
PORT=3000
```

```bash
# .env.test
DATABASE_URL="postgresql://postgres:123456@localhost:5433/nestjs?schema=public"
JWT_SECRET="test-jwt-secret"
PORT=3333
```

3) Start Postgres in Docker and apply migrations

```bash
npm run db:dev:up
npm run prisma:dev:deploy
```

4) Run the app

```bash
# development
npm run start

# watch mode (uses .env.test by default in this repo)
npm run start:dev

# production build
npm run build && npm run start:prod
```

### NPM scripts

- `db:dev:up`: start dev Postgres (docker-compose)
- `db:dev:rm`: remove dev Postgres container/volume
- `db:dev:restart`: recreate dev DB and deploy migrations
- `prisma:dev:deploy`: apply migrations to dev DB
- `db:test:up`: start test Postgres (port 5433)
- `db:test:restart`: recreate test DB and deploy migrations
- `prisma:test:deploy`: apply migrations to test DB (via dotenv)
- `start`, `start:dev`, `start:prod`: run application
- `build`: compile TypeScript
- `lint`: run ESLint with auto-fix
- `format`: run Prettier
- `test`, `test:watch`, `test:cov`: unit tests
- `test:e2e`: e2e tests (uses `.env.test` and starts watching)

### API overview

Base URL: `http://localhost:${PORT}` (defaults to `3000`). Routes marked with 🔒 require `Authorization: Bearer <token>`.

#### Auth

- `POST /auth/signup` — register with `{ email, password }`
- `POST /auth/signin` — login with `{ email, password }`; returns JWT

#### Users 🔒

- `GET /users/me` — get authenticated user
- `PATCH /users` — update profile with `{ firstName?, lastName?, email? }`

#### Bookmarks 🔒

- `GET /bookmark` — list bookmarks
- `GET /bookmark/:id` — get bookmark by id
- `POST /bookmark` — create `{ title, link, description? }`
- `PATCH /bookmark/:id` — update bookmark
- `DELETE /bookmark/:id` — delete bookmark (204)

### Database schema (Prisma)

- `User`: `id`, `email` (unique), `password`, `firstName?`, `lastName?`
- `Bookmark`: `id`, `title`, `link`, `description?`, `userId`

Migrations live in `prisma/migrations`. The Prisma client is generated to `generated/prisma`.

### Docker

`docker-compose.yml` defines two Postgres services:

- `dev-db`: exposed on `5432`
- `test-db`: exposed on `5433`

Data is persisted in the `postgres_data` volume.

### Testing

```bash
# unit tests
npm run test

# e2e tests (ensures test DB is ready and uses .env.test)
npm run test:e2e

# coverage
npm run test:cov
```

### Notes

- Global validation is enabled with `ValidationPipe` and `whitelist: true`.
- Hashing uses `argon2`. Keep `JWT_SECRET` safe in production.
- Default port is taken from `PORT` or falls back to `3000`.

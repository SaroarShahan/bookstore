# Bookstore API

A Node.js Bookstore API built with Express, Sequelize, PostgreSQL, and a layered
controller/service/repository structure.

## Features

- Express application class with route, middleware, health check, and global setup
- `src/Index.js` process entrypoint with process-level error handlers
- `src/server.js` server lifecycle helpers for start and stop
- Book routes mounted under `/api/v1/books`
- Book controller, service, and repository layers
- Sequelize models for users and books
- Sequelize migrations for `users` and `books`
- Environment variable support with `dotenv`

## Requirements

- Node.js
- npm
- PostgreSQL

## Getting Started

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Update `.env` with your local values:

```env
DB_NAME=bookstore
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
DB_LOGGING=false
HOST=localhost
PORT=4000
IS_LOCAL=true
```

Run migrations:

```bash
npm run migrate
```

Start the development server:

```bash
npm run dev
```

Start the server with Node:

```bash
npm start
```

The server uses `PORT` from `.env`, or falls back to `4000`.

## API Endpoints

Health check:

```http
GET /health
```

Book routes:

```http
GET    /api/v1/books
POST   /api/v1/books
GET    /api/v1/books/:id
PATCH  /api/v1/books/:id
DELETE /api/v1/books/:id
```

Create book request body:

```json
{
  "slug": "clean-code",
  "title": "Clean Code",
  "description": "A handbook of agile software craftsmanship",
  "authorId": 1
}
```

List books supports pagination:

```http
GET /api/v1/books?page=1&limit=20
```

## Project Structure

```text
.
├── migrations/
│   ├── 20260817174500-create-users.js
│   └── 20260817184631-create-books.js
├── src/
│   ├── Index.js
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── BookController.js
│   │   └── UserController.js
│   ├── models/
│   │   ├── BookModel.js
│   │   ├── UserModel.js
│   │   └── index.js
│   ├── repository/
│   │   └── BookRepository.js
│   ├── routes/
│   │   ├── BookRoutes.js
│   │   └── index.js
│   ├── services/
│   │   └── BookServices.js
│   └── utils/
│       └── index.js
├── package.json
└── README.md
```

## Application Flow

The API starts from `src/Index.js`.

```text
Index.js
└── server.js
    └── app.js
        └── routes/index.js
            └── routes/BookRoutes.js
                └── controllers/BookController.js
                    └── services/BookServices.js
                        └── repository/BookRepository.js
                            └── models/BookModel.js
```

`BookController` handles request/response and error forwarding. `BookServices`
handles business logic and response shaping. `BookRepository` handles Sequelize
model operations.

## Sequelize Commands

Run migrations:

```bash
npm run migrate
```

Undo the latest migration:

```bash
npm run migrate:undo
```

Undo all migrations:

```bash
npm run migrate:undo:all
```

Generate a migration:

```bash
npm run migration:gen -- create-table-name
```

Generate a model:

```bash
npm run model:gen -- Book --attributes title:string
```

## Database

Database connection settings are loaded from `.env` in:

- `src/config/db.js`
- `src/config/config.js`

This project includes `pg` and `pg-hstore` for PostgreSQL.

## Scripts

```bash
npm run dev
npm start
npm run migrate
npm run migrate:undo
npm run migrate:undo:all
```

## License

MIT

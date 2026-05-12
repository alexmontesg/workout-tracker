# Workout Tracker

A NestJS + TypeORM + SQLite API for tracking workouts and exercises. Built as a hands-on project for learning NestJS.

## Stack

- **NestJS 11** — modular architecture, decorators, dependency injection
- **TypeORM** — ORM with SQLite (`better-sqlite3`)
- **TypeScript** — strict mode, decorators for metadata

## Getting started

```bash
npm install
npm run start:dev
```

The server starts on `http://localhost:3000`.

## API

| Method | Path          | Description          |
|--------|---------------|----------------------|
| GET    | `/exercises`  | List all exercises   |
| POST   | `/exercises`  | Create an exercise   |

### Exercise schema

```json
{
  "name": "Bench Press",
  "muscles": ["chest", "triceps", "shoulders"]
}
```

## Scripts

| Command           | Action               |
|-------------------|----------------------|
| `npm run start`   | Start production     |
| `npm run start:dev` | Watch mode       |
| `npm run test`    | Unit tests           |
| `npm run test:e2e`| End-to-end tests     |
| `npm run test:cov`| Test coverage        |

## Project structure

```
src/
├── main.ts                 # App bootstrap
├── app.module.ts           # Root module
└── exercises/              # Exercises feature module
    ├── exercise.entity.ts
    ├── exercises.module.ts
    ├── exercises.controller.ts
    ├── exercises.service.ts
    └── dto/
        └── create-exercise.dto.ts
```

## Why

The app has full CRUD backend for Workouts, Sets, Series, Exercises, and Muscles, but the frontend lacks a workout container — sets are created as orphans without a session context. Users have no way to group exercises into a gym session, track active workouts, or review past sessions. This makes the app unusable for its core purpose: tracking a workout from start to finish.

## What Changes

- **New landing page** (`/`) with "Start Workout" button and recent finished workouts list
- **New active workout page** (`/workouts/[id]`) showing all sets grouped under a workout with ability to add sets, edit name/notes, and finish the workout
- **Sets nested under workouts** — `/workouts/[id]/sets/new` and `/workouts/[id]/sets/[setId]` replace standalone `/sets` and `/sets/[id]`
- **Workout lifecycle** — start (creates empty workout), active (editable), finished (immutable, no undo)
- **Mobile-first layout** — touch-friendly, thumb-zone actions, minimal chrome
- **Exercises/muscles pages left in place** as admin-only, accessible by direct URL but not promoted from workout flow

## Capabilities

### New Capabilities
- `workout-lifecycle`: Starting, viewing, finishing workouts; auto-generation of date/name; post-completion immutability
- `workout-home`: Landing page with start CTA and recent finished workouts list
- `workout-api-proxy`: Next.js API proxy routes for workout CRUD endpoints
- `workout-schemas`: Shared Zod schemas for workout creation, update, and response types

### Modified Capabilities
- `set-serie-ui`: Rework routes to nest under `/workouts/[id]/`, adapt create-set-form to accept `workoutId`, add workout context to set detail page
- `ui-components`: Add navigation shell (top bar with back button) and workout-specific components (set card, workout header)

## Impact

- **Frontend routes**: New `app/page.tsx`, `app/workouts/` directory; remove or redirect standalone `app/sets/` page
- **API proxy**: New `app/api/workouts/` route handlers for `POST /workouts`, `GET /workouts/:id`, `PATCH /workouts/:id`, `POST /workouts/:id/finish`
- **Shared package**: New Zod schemas in `packages/shared/src/schemas/workout.ts`; new API functions in `packages/shared/src/api/workouts.ts`
- **Backend**: No changes needed — workout CRUD already exists in NestJS (`src/workouts/`)
- **Components**: New workout components under `components/workouts/`; adapt existing `components/sets/` components

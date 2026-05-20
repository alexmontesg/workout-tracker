## 1. Shared Package — Workout Schemas & API

- [x] 1.1 Create `packages/shared/src/schemas/workout.ts` with `WorkoutSchema`, `CreateWorkoutSchema`, `UpdateWorkoutSchema` and derived types
- [x] 1.2 Create `packages/shared/src/api/workouts.ts` with `createWorkout`, `listWorkouts`, `getWorkout`, `updateWorkout`, `finishWorkout` functions
- [x] 1.3 Export workout schemas and API functions from `packages/shared/src/index.ts`

## 2. Workout API Proxy Routes

- [x] 2.1 Create `apps/web/app/api/workouts/route.ts` with GET (list) and POST (create) handlers
- [x] 2.2 Create `apps/web/app/api/workouts/[id]/route.ts` with GET, PATCH handlers
- [x] 2.3 Create `apps/web/app/api/workouts/[id]/finish/route.ts` with POST handler
- [x] 2.4 Create `apps/web/app/api/workouts/[id]/sets/route.ts` with POST handler (proxy for creating a set within a workout)

## 3. New UI Components

- [x] 3.1 Create `components/layout/top-bar.tsx` — top navigation bar with back button and title
- [x] 3.2 Create `components/workouts/workout-header.tsx` — editable workout name/date header
- [x] 3.3 Create `components/workouts/set-card.tsx` — set summary card for workout detail view
- [x] 3.4 Create `components/workouts/workout-home.tsx` — home page content with Start Workout CTA and recent workouts list

## 4. New Pages

- [x] 4.1 Create `app/page.tsx` — landing page with Start Workout button + recent finished workouts
- [x] 4.2 Create `app/workouts/[id]/page.tsx` — workout detail page with header, set cards, add/finish actions
- [x] 4.3 Create `app/workouts/[id]/layout.tsx` — layout applying top-bar for workout routes

## 5. Nested Set Pages (under workouts)

- [x] 5.1 Create `app/workouts/[id]/sets/new/page.tsx` — adapted create-set form with workout context
- [x] 5.2 Create `app/workouts/[id]/sets/[setId]/page.tsx` — set detail page with series table, back to workout
- [x] 5.3 Adapt `components/sets/create-set-form.tsx` to accept optional `workoutId` prop and POST to `/api/workouts/[id]/sets`

## 6. Route Cleanup

- [x] 6.1 Remove standalone `app/sets/page.tsx` (redirect to `/`)
- [x] 6.2 Remove standalone `app/sets/[id]/page.tsx` (redirect to `/`)
- [x] 6.3 Remove standalone `app/api/sets/route.ts` and `app/api/sets/[id]/route.ts` (sets are now created via `/api/workouts/[id]/sets`)

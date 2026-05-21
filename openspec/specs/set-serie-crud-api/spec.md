## ADDED Requirements

### Requirement: CRUD for Sets
The API SHALL expose full CRUD endpoints for Sets at `/sets`.

#### Scenario: Create a set
- **WHEN** a POST request is made to `/sets` with `exerciseId`, `timestamp`, and optional `notes` and `restTimeSeconds`
- **THEN** a new Set SHALL be created and returned with a `201` status

#### Scenario: List all sets
- **WHEN** a GET request is made to `/sets`
- **THEN** an array of Sets SHALL be returned, each with its nested Series

#### Scenario: Get a single set
- **WHEN** a GET request is made to `/sets/:id`
- **THEN** the Set with that id SHALL be returned with its nested Series
- **WHEN** the id does not exist
- **THEN** a `404` error SHALL be returned

#### Scenario: Update a set (notes, restTimeSeconds, timestamp)
- **WHEN** a PATCH request is made to `/sets/:id` with `notes`, `restTimeSeconds`, or `timestamp`
- **THEN** the Set SHALL be updated and returned

#### Scenario: Cannot change exercise after series exist
- **WHEN** a PATCH request is made to `/sets/:id` with a different `exerciseId` and the set already has series
- **THEN** the request SHALL fail with a `400` or `409` error

#### Scenario: Delete a set
- **WHEN** a DELETE request is made to `/sets/:id`
- **THEN** the Set and all its Series SHALL be deleted

### Requirement: Nested CRUD for Series under a Set
The API SHALL expose CRUD endpoints for Series nested under `/sets/:id/series`.

#### Scenario: Create a serie under a set
- **WHEN** a POST request is made to `/sets/:id/series` with `type` and tracking fields appropriate for the set's exercise
- **THEN** a new Serie SHALL be created and returned with a `201` status
- **WHEN** the provided tracking fields do not match the parent exercise's tracking type
- **THEN** the request SHALL fail with a `400` error

#### Scenario: List series for a set
- **WHEN** a GET request is made to `/sets/:id/series`
- **THEN** an array of Series for that Set SHALL be returned

#### Scenario: Update a serie
- **WHEN** a PATCH request is made to `/sets/:id/series/:serieId` with new fields
- **THEN** the Serie SHALL be updated and returned

#### Scenario: Delete a serie
- **WHEN** a DELETE request is made to `/sets/:id/series/:serieId`
- **THEN** the Serie SHALL be deleted

### Requirement: Service-layer validation of Serie fields
The Serie service SHALL validate that the incoming fields match the parent exercise's tracking type.

#### Scenario: Reject invalid field combination for time type
- **WHEN** a POST request is made to create a Serie under a `time`-type exercise with `weight` and `reps` instead of `durationSeconds`
- **THEN** the request SHALL fail with a `400` error explaining the required fields

#### Scenario: Accept valid field combination for weight_reps type
- **WHEN** a POST request is made to create a Serie under a `weight_reps`-type exercise with `weight` and `reps`
- **THEN** the Serie SHALL be created successfully

#### Scenario: Reject missing required fields
- **WHEN** a POST request is made to create a Serie under a `weight_reps`-type exercise with only `reps` and no `weight`
- **THEN** the request SHALL fail with a `400` error

### Requirement: Series ordered by insertion
Series SHALL be returned in insertion order (ascending by auto-increment id). No sort order field exists.

#### Scenario: Series returned in creation order
- **WHEN** multiple series are created under a set
- **THEN** GET /sets/:id/series SHALL return them in ascending id order

### Requirement: Zod schemas for Set and Serie
The shared package SHALL contain Zod schemas for Set, Serie, CreateSetInput, UpdateSetInput, CreateSerieInput, UpdateSerieInput.

#### Scenario: Set Zod schema exists
- **WHEN** inspecting `packages/shared/src/schemas/`
- **THEN** a `set.ts` file SHALL exist with Zod schemas for Set, CreateSetInput, and UpdateSetInput

#### Scenario: Serie Zod schema exists
- **WHEN** inspecting `packages/shared/src/schemas/`
- **THEN** a `serie.ts` file SHALL exist with Zod schemas for Serie, CreateSerieInput, and UpdateSerieInput

### Requirement: API client functions for Set and Serie
The shared package SHALL contain HTTP client functions for Sets and Series.

#### Scenario: Set API client functions exist
- **WHEN** inspecting `packages/shared/src/api/`
- **THEN** a `sets.ts` file SHALL exist with `listSets`, `getSet`, `createSet`, `updateSet`, `deleteSet` functions

#### Scenario: Serie API client functions exist
- **WHEN** inspecting `packages/shared/src/api/`
- **THEN** a `series.ts` file SHALL exist with `listSeries`, `createSerie`, `updateSerie`, `deleteSerie` functions

### Requirement: Series CRUD blocked on finished workouts

The series endpoints SHALL reject create, update, and delete operations when the parent set belongs to a finished workout.

#### Scenario: Create serie on finished workout set returns 403
- **WHEN** a POST request is made to `/sets/:setId/series` and the set's parent workout has an `endDate`
- **THEN** the request SHALL fail with a `403 Forbidden` error

#### Scenario: Update serie on finished workout set returns 403
- **WHEN** a PATCH request is made to `/sets/:setId/series/:serieId` and the set's parent workout has an `endDate`
- **THEN** the request SHALL fail with a `403 Forbidden` error

#### Scenario: Delete serie on finished workout set returns 403
- **WHEN** a DELETE request is made to `/sets/:setId/series/:serieId` and the set's parent workout has an `endDate`
- **THEN** the request SHALL fail with a `403 Forbidden` error

### Requirement: Set CRUD blocked on finished workouts

The set endpoints SHALL reject create, update, and delete operations when the parent workout is finished.

#### Scenario: Update set on finished workout returns 403
- **WHEN** a PATCH request is made to `/workouts/:workoutId/sets/:id` and the parent workout has an `endDate`
- **THEN** the request SHALL fail with a `403 Forbidden` error

#### Scenario: Delete set from finished workout returns 403
- **WHEN** a DELETE request is made to `/workouts/:workoutId/sets/:id` and the parent workout has an `endDate`
- **THEN** the request SHALL fail with a `403 Forbidden` error

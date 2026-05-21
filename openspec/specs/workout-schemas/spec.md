## ADDED Requirements

### Requirement: Workout shared Zod schemas exist
The shared package SHALL provide Zod schemas for workout data structures.

#### Scenario: WorkoutSchema defines workout shape
- **WHEN** WorkoutSchema is used to validate a workout object
- **THEN** it SHALL validate fields: `id` (number), `date` (ISO datetime string), `endDate` (nullable ISO datetime string), `name` (string), `notes` (nullable string)
- **THEN** it SHALL be exported as `WorkoutSchema` from `@workspace/shared`

#### Scenario: CreateWorkoutSchema defines creation input
- **WHEN** CreateWorkoutSchema is used to validate creation input
- **THEN** it SHALL accept optional `name` and `notes` fields
- **THEN** it SHALL auto-set `date` to current datetime if not provided
- **THEN** `endDate` SHALL NOT be settable via creation

#### Scenario: UpdateWorkoutSchema defines update input
- **WHEN** UpdateWorkoutSchema is used to validate update input
- **THEN** it SHALL accept optional `name` and `notes` fields

### Requirement: Workout API functions exist in shared package
The shared package SHALL provide typed API functions for workout endpoints.

#### Scenario: createWorkout sends POST
- **WHEN** `createWorkout(input)` is called
- **THEN** a POST request SHALL be sent to `/workouts` with the input data
- **THEN** the created Workout SHALL be returned

#### Scenario: listWorkouts sends GET
- **WHEN** `listWorkouts()` is called
- **THEN** a GET request SHALL be sent to `/workouts`
- **THEN** an array of Workout SHALL be returned

#### Scenario: getWorkout sends GET by ID
- **WHEN** `getWorkout(id)` is called
- **THEN** a GET request SHALL be sent to `/workouts/[id]`
- **THEN** the Workout SHALL be returned with nested sets

#### Scenario: updateWorkout sends PATCH
- **WHEN** `updateWorkout(id, input)` is called
- **THEN** a PATCH request SHALL be sent to `/workouts/[id]`
- **THEN** the updated Workout SHALL be returned

#### Scenario: finishWorkout sends POST to finish
- **WHEN** `finishWorkout(id)` is called
- **THEN** a POST request SHALL be sent to `/workouts/[id]/finish`
- **THEN** the finished Workout SHALL be returned

### Requirement: Workout types are exported
The shared package SHALL export TypeScript types derived from Zod schemas.

#### Scenario: Workout type is exported
- **WHEN** importing from `@workspace/shared`
- **THEN** `Workout`, `CreateWorkoutInput`, and `UpdateWorkoutInput` types SHALL be available

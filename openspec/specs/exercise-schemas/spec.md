## ADDED Requirements

### Requirement: Exercise schemas exist in shared package
The system SHALL provide Zod schemas for the Exercise domain entity in the shared package, including the related Muscle type.

#### Scenario: ExerciseSchema validates correct data
- **WHEN** a valid exercise object `{ id: 1, name: "Bench Press", type: "weight_reps", muscles: [{ id: 1, name: "Chest" }] }` is parsed with ExerciseSchema
- **THEN** the parse SHALL succeed and return the typed object

#### Scenario: ExerciseSchema rejects invalid type
- **WHEN** an object with an invalid `type` value is parsed with ExerciseSchema
- **THEN** the parse SHALL fail with a validation error

### Requirement: CreateExerciseSchema validates creation input
The system SHALL provide a Zod schema for creating an exercise that requires name, type, and muscleIds.

#### Scenario: Valid create input succeeds
- **WHEN** `{ name: "Bench Press", type: "weight_reps", muscleIds: [1, 2] }` is parsed with CreateExerciseSchema
- **THEN** the parse SHALL succeed

#### Scenario: Missing name is rejected
- **WHEN** `{ type: "weight_reps", muscleIds: [1] }` is parsed with CreateExerciseSchema
- **THEN** the parse SHALL fail

#### Scenario: Missing type is rejected
- **WHEN** `{ name: "Bench Press", muscleIds: [1] }` is parsed with CreateExerciseSchema
- **THEN** the parse SHALL fail

#### Scenario: Invalid type is rejected
- **WHEN** `{ name: "Bench Press", type: "invalid", muscleIds: [1] }` is parsed with CreateExerciseSchema
- **THEN** the parse SHALL fail

#### Scenario: Empty muscleIds is rejected
- **WHEN** `{ name: "Bench Press", type: "weight_reps", muscleIds: [] }` is parsed with CreateExerciseSchema
- **THEN** the parse SHALL fail

### Requirement: UpdateExerciseSchema validates update input
The system SHALL provide a Zod schema for updating an exercise where all fields are optional.

#### Scenario: Valid update input succeeds
- **WHEN** `{ name: "Updated", type: "time", muscleIds: [1] }` is parsed with UpdateExerciseSchema
- **THEN** the parse SHALL succeed

#### Scenario: Empty object is valid
- **WHEN** `{}` is parsed with UpdateExerciseSchema
- **THEN** the parse SHALL succeed

#### Scenario: Partial update with only name
- **WHEN** `{ name: "Updated" }` is parsed with UpdateExerciseSchema
- **THEN** the parse SHALL succeed

#### Scenario: Invalid type in update is rejected
- **WHEN** `{ type: "bogus" }` is parsed with UpdateExerciseSchema
- **THEN** the parse SHALL fail

### Requirement: TypeScript exercise types are derived from schemas
The system SHALL export TypeScript types inferred from each Zod schema.

#### Scenario: Exercise type is available
- **WHEN** a module imports `Exercise` from the shared package
- **THEN** it SHALL be a TypeScript type with `id`, `name`, `type`, and `muscles` properties

#### Scenario: CreateExerciseInput type is available
- **WHEN** a module imports `CreateExerciseInput` from the shared package
- **THEN** it SHALL be a TypeScript type with `name`, `type`, and `muscleIds`

#### Scenario: UpdateExerciseInput type is available
- **WHEN** a module imports `UpdateExerciseInput` from the shared package
- **THEN** it SHALL be a TypeScript type with optional `name`, `type`, and `muscleIds`

### Requirement: Typed API functions exist for exercises
The system SHALL provide typed functions in the shared package for all exercise CRUD operations.

#### Scenario: listExercises returns typed Exercise array
- **WHEN** `listExercises()` is called
- **THEN** it SHALL make a GET request to `/exercises`
- **THEN** it SHALL return an array of Exercise objects

#### Scenario: getExercise returns single exercise
- **WHEN** `getExercise(1)` is called
- **THEN** it SHALL make a GET request to `/exercises/1`
- **THEN** it SHALL return the Exercise object

#### Scenario: createExercise sends POST
- **WHEN** `createExercise(input)` is called
- **THEN** it SHALL make a POST request to `/exercises` with the input body

#### Scenario: updateExercise sends PATCH
- **WHEN** `updateExercise(1, input)` is called
- **THEN** it SHALL make a PATCH request to `/exercises/1` with the input body

#### Scenario: deleteExercise sends DELETE
- **WHEN** `deleteExercise(1)` is called
- **THEN** it SHALL make a DELETE request to `/exercises/1`

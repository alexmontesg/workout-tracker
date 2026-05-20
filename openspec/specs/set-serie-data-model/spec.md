## ADDED Requirements

### Requirement: Set entity definition
A Set SHALL be a TypeORM entity mapped to a `set` table with an auto-generated primary key, a foreign key to Workout, a foreign key to Exercise, a timestamp, optional free-text notes, and optional rest time in seconds.

#### Scenario: Set entity structure
- **WHEN** inspecting `Set` entity
- **THEN** it SHALL have columns: `id` (PK, auto-increment), `workoutId` (FK → Workout), `exerciseId` (FK → Exercise), `timestamp` (Date), `notes` (string, nullable), `restTimeSeconds` (number, nullable)
- **THEN** it SHALL declare `@ManyToOne(() => Workout, { onDelete: 'CASCADE' })` with `workoutId` foreign key
- **THEN** it SHALL declare `@ManyToOne(() => Exercise)` with `exerciseId` foreign key
- **THEN** it SHALL declare `@OneToMany(() => Serie, serie => serie.set)` with cascade delete

### Requirement: Serie entity definition
A Serie SHALL be a TypeORM entity mapped to a `serie` table with an auto-generated primary key, a foreign key to Set, a type enum (warmup/effective/failure/drop), and nullable tracking fields.

#### Scenario: Serie entity structure
- **WHEN** inspecting `Serie` entity
- **THEN** it SHALL have columns: `id` (PK, auto-increment), `setId` (FK → Set), `type` (enum: warmup, effective, failure, drop), `reps` (number, nullable), `weight` (number, nullable), `durationSeconds` (number, nullable), `meters` (number, nullable)
- **THEN** it SHALL declare `@ManyToOne(() => Set, set => set.series)` with `setId` foreign key

### Requirement: Serie type enum
The Serie type SHALL be a string enum with values: `warmup`, `effective`, `failure`, `drop`.

#### Scenario: Serie type enum defined
- **WHEN** inspecting the `Serie` entity file
- **THEN** a `SerieType` enum SHALL exist with values `warmup = 'warmup'`, `effective = 'effective'`, `failure = 'failure'`, `drop = 'drop'`

### Requirement: Column mapping to tracking types
Serie tracking columns SHALL map to Exercise tracking types as follows:
- `time` → `durationSeconds` must be provided
- `weight_reps` → `weight` and `reps` must be provided (`weight` is positive)
- `bodyweight_reps` → `reps` must be provided
- `distance` → `meters` must be provided
- `assisted` → `weight` and `reps` must be provided (`weight` is negative, representing counterbalance)

#### Scenario: Time tracking uses durationSeconds
- **WHEN** an Exercise has `type = 'time'`
- **THEN** its Serie SHALL use `durationSeconds` as the tracking field

#### Scenario: Weight reps uses weight and reps
- **WHEN** an Exercise has `type = 'weight_reps'`
- **THEN** its Serie SHALL use `weight` (positive number) and `reps`

#### Scenario: Bodyweight reps uses reps only
- **WHEN** an Exercise has `type = 'bodyweight_reps'`
- **THEN** its Serie SHALL use `reps` only (`weight` and other fields are null)

#### Scenario: Distance uses meters
- **WHEN** an Exercise has `type = 'distance'`
- **THEN** its Serie SHALL use `meters` as the tracking field

#### Scenario: Assisted uses weight (negative) and reps
- **WHEN** an Exercise has `type = 'assisted'`
- **THEN** its Serie SHALL use `weight` (negative number representing counterbalance) and `reps`

### Requirement: Cascade delete Set → Serie
Removing a Set SHALL cascade-delete all its child Series. Removing a Workout SHALL cascade-delete all its child Sets (and their Series).

#### Scenario: Delete set removes series
- **WHEN** a DELETE request is made to `/workouts/:workoutId/sets/:id`
- **THEN** all Series belonging to that Set SHALL be deleted from the database

#### Scenario: Delete workout removes sets and series
- **WHEN** a DELETE request is made to `/workouts/:id`
- **THEN** all Sets belonging to that Workout SHALL be deleted
- **THEN** all Series belonging to those Sets SHALL be deleted

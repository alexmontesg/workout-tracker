## ADDED Requirements

### Requirement: Repository interface per entity
Each entity SHALL have a corresponding repository interface in its feature module's domain layer, defining typed query methods for all data access operations.

#### Scenario: Exercise repository interface exists
- **WHEN** inspecting the `exercises/domain/` directory
- **THEN** an `IExerciseRepository` interface SHALL be declared with methods for `findAll`, `search`, `create`, and `findByIds`

#### Scenario: Muscle repository interface exists
- **WHEN** inspecting the `muscles/domain/` directory
- **THEN** an `IMuscleRepository` interface SHALL be declared with methods for `findAll`, `findById`, `create`, `update`, `remove`, and `findLinkedExerciseCount`

### Requirement: Repository implementation per entity
Each repository interface SHALL have a TypeORM implementation class in the shared `database/` module.

#### Scenario: Exercise repository implemented
- **WHEN** inspecting the `database/repositories/` directory
- **THEN** a `TypeOrmExerciseRepository` class SHALL exist that implements `IExerciseRepository` using TypeORM's `Repository<Exercise>`

#### Scenario: Muscle repository implemented
- **WHEN** inspecting the `database/repositories/` directory
- **THEN** a `TypeOrmMuscleRepository` class SHALL exist that implements `IMuscleRepository` using TypeORM's `Repository<Muscle>` and `Repository<Exercise>`

### Requirement: Services depend on interfaces not ORM
Services SHALL inject repository interfaces, never TypeORM `Repository` objects directly. All ORM-specific code SHALL be confined to the infrastructure layer.

#### Scenario: ExercisesService uses IExerciseRepository
- **WHEN** inspecting `ExercisesService`
- **THEN** its constructor SHALL accept `IExerciseRepository` (via `@Inject(EXERCISE_REPOSITORY)`), not `Repository<Exercise>`

#### Scenario: MusclesService uses IMuscleRepository
- **WHEN** inspecting `MusclesService`
- **THEN** its constructor SHALL accept `IMuscleRepository` (via `@Inject(MUSCLE_REPOSITORY)`), not `Repository<Muscle>` or `Repository<Exercise>`

### Requirement: Repository interface for Set
A `ISetRepository` interface SHALL be declared in the sets module's domain layer with typed query methods.

#### Scenario: Set repository interface exists
- **WHEN** inspecting the `sets/domain/` directory
- **THEN** an `ISetRepository` interface SHALL be declared with methods for `findAll`, `findById`, `create`, `update`, `remove`

### Requirement: Repository interface for Serie
A `ISerieRepository` interface SHALL be declared in the series module's domain layer with typed query methods.

#### Scenario: Serie repository interface exists
- **WHEN** inspecting the `series/domain/` directory
- **THEN** an `ISerieRepository` interface SHALL be declared with methods for `findBySetId`, `findById`, `create`, `update`, `remove`

### Requirement: Repository implementation for Set
A `TypeOrmSetRepository` SHALL implement `ISetRepository` using TypeORM's `Repository<Set>`.

#### Scenario: Set repository implemented
- **WHEN** inspecting the `database/repositories/` directory
- **THEN** a `TypeOrmSetRepository` class SHALL exist that implements `ISetRepository` using TypeORM's `Repository<Set>`
- **THEN** it SHALL eager-load series and exercise relations

### Requirement: Repository implementation for Serie
A `TypeOrmSerieRepository` SHALL implement `ISerieRepository` using TypeORM's `Repository<Serie>`.

#### Scenario: Serie repository implemented
- **WHEN** inspecting the `database/repositories/` directory
- **THEN** a `TypeOrmSerieRepository` class SHALL exist that implements `ISerieRepository` using TypeORM's `Repository<Serie>`

### Requirement: Services depend on interfaces not ORM
SetService and SerieService SHALL inject repository interfaces, never TypeORM `Repository` objects directly.

#### Scenario: SetsService uses ISetRepository
- **WHEN** inspecting `SetsService`
- **THEN** its constructor SHALL accept `ISetRepository` (via `@Inject(SET_REPOSITORY)`), not `Repository<Set>`

#### Scenario: SeriesService uses ISerieRepository
- **WHEN** inspecting `SeriesService`
- **THEN** its constructor SHALL accept `ISerieRepository` (via `@Inject(SERIE_REPOSITORY)`), not `Repository<Serie>`

### Requirement: Shared database module owns entity registrations
A `DatabaseModule` SHALL centrally register all TypeORM entities via `TypeOrmModule.forFeature()` and provide all repository implementations.

#### Scenario: DatabaseModule registers all entities
- **WHEN** inspecting `DatabaseModule`
- **THEN** it SHALL import `TypeOrmModule.forFeature([Exercise, Muscle, Set, Serie])`
- **THEN** it SHALL provide `TypeOrmExerciseRepository` mapped to token `EXERCISE_REPOSITORY`
- **THEN** it SHALL provide `TypeOrmMuscleRepository` mapped to token `MUSCLE_REPOSITORY`
- **THEN** it SHALL provide `TypeOrmSetRepository` mapped to token `SET_REPOSITORY`
- **THEN** it SHALL provide `TypeOrmSerieRepository` mapped to token `SERIE_REPOSITORY`

### Requirement: No cross-module entity imports in feature modules
Feature modules SHALL NOT import entity classes from other feature modules. All cross-entity data access SHALL be handled through repository interfaces from the `DatabaseModule`.

#### Scenario: ExercisesModule does not import Muscle entity
- **WHEN** inspecting `ExercisesModule`
- **THEN** it SHALL NOT import `TypeOrmModule.forFeature([Muscle])` or reference the `Muscle` entity directly

#### Scenario: MusclesModule does not import Exercise entity
- **WHEN** inspecting `MusclesModule`
- **THEN** it SHALL NOT import `TypeOrmModule.forFeature([Exercise])` or reference the `Exercise` entity directly

### Requirement: Existing API behavior preserved
All existing HTTP endpoints, request/response shapes, and error behavior SHALL remain unchanged after the refactoring.

#### Scenario: All exercises endpoint unchanged
- **WHEN** a GET request is made to `/exercises`
- **THEN** the response SHALL match the pre-refactoring shape (array of exercises with nested muscles)

#### Scenario: Search exercises endpoint unchanged
- **WHEN** a GET request is made to `/exercises/search?muscleId=1`
- **THEN** the response SHALL match the pre-refactoring shape

#### Scenario: Create exercise endpoint unchanged
- **WHEN** a POST request is made to `/exercises` with `name`, `type`, `muscleIds`
- **THEN** the response SHALL match the pre-refactoring shape and status

#### Scenario: List muscles endpoint unchanged
- **WHEN** a GET request is made to `/muscles`
- **THEN** the response SHALL match the pre-refactoring shape

#### Scenario: Delete muscle with linked exercises fails
- **WHEN** a DELETE request is made to `/muscles/:id` where the muscle is linked to exercises
- **THEN** the request SHALL fail with a conflict error (same as before)

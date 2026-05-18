### Requirement: Template pattern for service unit tests
Each service spec SHALL follow this structure:
1. Factory function `createMock<Repository>()` that returns a jest-mocked implementation of the repository interface
2. Factory function `create<Entity>(overrides?)` that returns a plain object matching the entity shape
3. `beforeEach` block that compiles a `TestingModule` and extracts the service and mock repository
4. `afterEach` block that calls `jest.clearAllMocks()`
5. Tests grouped by service method via `describe` blocks
6. Assertions on return values or thrown exceptions only (no call verification)

#### Scenario: Follow template structure
- **WHEN** a new service spec is created
- **THEN** it SHALL use `Test.createTestingModule` with mocked dependencies
- **AND** it SHALL use factory helpers for mock repositories and test entities
- **AND** it SHALL assert on outputs only

### Requirement: Mock repository factory
A `createMockMuscleRepository()` factory SHALL return an object implementing `IMuscleRepository` with all methods as `jest.fn()` stubs. The factory SHALL NOT require arguments — callers override specific methods per test via `.mockResolvedValue()`.

#### Scenario: Factory produces usable mock
- **WHEN** `createMockMuscleRepository()` is called
- **THEN** it SHALL return an object with `findAll`, `findById`, `create`, `update`, `remove`, `findLinkedExerciseCount` as `jest.fn()` functions

### Requirement: Test entity factory
A `createMuscle(overrides?)` factory SHALL return a plain object matching the `Muscle` entity shape (id, name). Default values SHALL be sensible (e.g., id: 1, name: 'Test Muscle'). Overrides SHALL merge with defaults.

#### Scenario: Factory with defaults
- **WHEN** `createMuscle()` is called without arguments
- **THEN** it SHALL return `{ id: 1, name: 'Test Muscle' }`

#### Scenario: Factory with overrides
- **WHEN** `createMuscle({ id: 5, name: 'Biceps' })` is called
- **THEN** it SHALL return `{ id: 5, name: 'Biceps' }`

### Requirement: MusclesService.findAll returns all muscles
The service SHALL return whatever the repository's `findAll()` resolves to.

#### Scenario: Returns empty array
- **WHEN** `findAll()` is called and repository returns `[]`
- **THEN** it SHALL return `[]`

#### Scenario: Returns all muscles
- **WHEN** `findAll()` is called and repository returns `[muscle1, muscle2]`
- **THEN** it SHALL return `[muscle1, muscle2]`

### Requirement: MusclesService.findOne returns muscle by id
The service SHALL return the muscle from `repo.findById(id)` when found. It SHALL throw `NotFoundException` when not found.

#### Scenario: Returns muscle when found
- **WHEN** `findOne(1)` is called and `repo.findById(1)` resolves to a muscle
- **THEN** it SHALL return that muscle

#### Scenario: Throws NotFoundException when not found
- **WHEN** `findOne(999)` is called and `repo.findById(999)` resolves to `null`
- **THEN** it SHALL throw `NotFoundException` with message matching `Muscle #999 not found`

### Requirement: MusclesService.create returns created muscle
The service SHALL delegate to `repo.create(dto)` and return the result.

#### Scenario: Returns created muscle
- **WHEN** `create({ name: 'Biceps' })` is called and repository creates and returns the muscle
- **THEN** it SHALL return the created muscle

### Requirement: MusclesService.update updates and returns muscle
The service SHALL call `findOne` to verify existence, then delegate to `repo.update()`. It SHALL throw `NotFoundException` when the muscle doesn't exist.

#### Scenario: Returns updated muscle when found
- **WHEN** `update(1, { name: 'Biceps' })` is called and the muscle exists
- **THEN** it SHALL return the updated muscle

#### Scenario: Throws NotFoundException when not found
- **WHEN** `update(999, { name: 'Biceps' })` is called and `repo.findById(999)` resolves to `null`
- **THEN** it SHALL throw `NotFoundException`

### Requirement: MusclesService.remove deletes muscle with no linked exercises
The service SHALL call `findOne` to verify existence, check `findLinkedExerciseCount`, then delegate to `repo.remove()`. It SHALL throw `NotFoundException` when not found and `ConflictException` when linked exercises exist.

#### Scenario: Removes muscle when no linked exercises
- **WHEN** `remove(1)` is called, `findById` returns a muscle, and `findLinkedExerciseCount` returns 0
- **THEN** it SHALL return the removed muscle

#### Scenario: Throws ConflictException when linked exercises exist
- **WHEN** `remove(1)` is called, `findById` returns a muscle, and `findLinkedExerciseCount` returns 2
- **THEN** it SHALL throw `ConflictException` with message matching `Cannot delete muscle #1: linked to 2 exercise(s)`

#### Scenario: Throws NotFoundException when not found
- **WHEN** `remove(999)` is called and `repo.findById(999)` resolves to `null`
- **THEN** it SHALL throw `NotFoundException`

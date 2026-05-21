## ADDED Requirements

### Requirement: User can start a workout
The system SHALL allow starting a new workout from the home page with a single action.

#### Scenario: Start workout creates empty workout and redirects
- **WHEN** the user clicks "Start Workout" on the home page
- **THEN** a POST request SHALL be sent to `/api/workouts` with `date` set to current datetime and no `endDate`
- **THEN** the backend SHALL auto-generate a default name ("Workout on {date}") if none provided
- **THEN** on success, the user SHALL be redirected to `/workouts/[id]` where `[id]` is the new workout's ID

### Requirement: Active workout page shows workout info and sets
The page at `/workouts/[id]` SHALL display the workout header and a list of set cards.

#### Scenario: Display workout header with name, date, and edit
- **WHEN** a user navigates to `/workouts/[id]`
- **THEN** the page SHALL display the workout date (formatted)
- **THEN** the workout name SHALL be displayed as editable inline text
- **WHEN** the user edits the name
- **THEN** a PATCH request SHALL be sent to `/api/workouts/[id]` with the new name
- **THEN** the name SHALL update optimistically

#### Scenario: Display set cards for workout
- **WHEN** a user navigates to `/workouts/[id]`
- **THEN** all sets belonging to the workout SHALL be fetched and displayed as cards
- **THEN** each set card SHALL show the exercise name, series count, and weight/reps summary
- **WHEN** the workout has no sets
- **THEN** an empty state SHALL be displayed with a prompt to add a set

#### Scenario: Tap set card navigates to set detail
- **WHEN** the user taps a set card
- **THEN** the user SHALL be navigated to `/workouts/[id]/sets/[setId]`

### Requirement: User can add a set to a workout
The system SHALL allow adding a new exercise set to the active workout.

#### Scenario: Add Set button navigates to new set page
- **WHEN** the user taps "Add Exercise" on the workout page
- **THEN** the user SHALL be navigated to `/workouts/[id]/sets/new`

### Requirement: User can finish a workout
The system SHALL allow finishing an active workout, making it immutable.

#### Scenario: Finish workout sets endDate and redirects
- **WHEN** the user taps "Finish Workout" on the workout page
- **THEN** a confirmation prompt SHALL appear asking "Are you sure? This workout will be closed and cannot be edited."
- **WHEN** the user confirms
- **THEN** a POST request SHALL be sent to `/api/workouts/[id]/finish`
- **THEN** on success, the user SHALL be redirected to the home page (`/`)
- **THEN** the workout SHALL appear in the recent finished workouts list

#### Scenario: Finished workout is immutable
- **WHEN** a finished workout's page is loaded
- **THEN** the "Add Exercise" button SHALL NOT be displayed
- **THEN** the "Finish Workout" button SHALL be hidden
- **THEN** the workout name SHALL NOT be editable
- **THEN** set cards SHALL NOT link to editable set detail pages

### Requirement: Workout page distinguishes active vs finished state
The workout page SHALL visually differentiate between active and finished workouts.

#### Scenario: Active workout shows edit and add controls
- **WHEN** the workout has no `endDate`
- **THEN** the page SHALL show "Add Exercise" button
- **THEN** the page SHALL show "Finish Workout" button
- **THEN** the workout name SHALL be editable inline

#### Scenario: Finished workout shows read-only state
- **WHEN** the workout has an `endDate`
- **THEN** the page SHALL display the end date/time
- **THEN** all controls SHALL be hidden
- **THEN** the page SHALL indicate it is a completed workout

### Requirement: Backend enforces finished workout immutability

The backend SHALL reject all mutating operations on finished workouts (those with a non-null `endDate`).

#### Scenario: Update finished workout name returns 403
- **WHEN** a PATCH request is sent to `/workouts/:id` with a new name for a finished workout
- **THEN** the request SHALL fail with a `403 Forbidden` error

#### Scenario: Add set to finished workout returns 403
- **WHEN** a POST request is sent to `/workouts/:id/sets` for a finished workout
- **THEN** the request SHALL fail with a `403 Forbidden` error

#### Scenario: Add series to set in finished workout returns 403
- **WHEN** a POST request is sent to `/sets/:id/series` where the parent set belongs to a finished workout
- **THEN** the request SHALL fail with a `403 Forbidden` error

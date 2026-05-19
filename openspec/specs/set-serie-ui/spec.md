## ADDED Requirements

### Requirement: Create-set form at /sets
The page at `/sets` SHALL display a form to create a new set with exercise selection, timestamp, rest time, and notes.

#### Scenario: Display create form
- **WHEN** a user navigates to `/sets`
- **THEN** a form SHALL be displayed with Exercise select, Timestamp input (defaulting to now), Rest Time input (seconds), and Notes textarea

#### Scenario: Create set redirects to detail page
- **WHEN** the user fills the form and submits
- **THEN** a POST request SHALL be sent to `/api/sets`
- **THEN** on success, the user SHALL be redirected to `/sets/[id]` where `[id]` is the created set's ID

#### Scenario: Timestamp defaults to now with backdate option
- **WHEN** the create set form loads
- **THEN** the timestamp input SHALL default to the current date and time
- **THEN** the user SHALL be able to change it to a past date/time

### Requirement: Set detail page at /sets/[id]
The page at `/sets/[id]` SHALL display set information and an inline series table editor.

#### Scenario: Display set info and series table
- **WHEN** a user navigates to `/sets/[id]`
- **THEN** the page SHALL display the exercise name, timestamp, rest time, and notes
- **THEN** a series table SHALL be displayed below the set info

#### Scenario: Page loads existing series
- **WHEN** the set detail page loads
- **THEN** existing series for that set SHALL be fetched and displayed in the table

#### Scenario: Series table columns adapt to exercise tracking type
- **WHEN** the set has an exercise with tracking type `weight_reps` or `assisted`
- **THEN** the series table SHALL show columns: Type, Weight, Reps
- **WHEN** the set has an exercise with tracking type `time`
- **THEN** the series table SHALL show columns: Type, Duration (s)
- **WHEN** the set has an exercise with tracking type `bodyweight_reps`
- **THEN** the series table SHALL show columns: Type, Reps
- **WHEN** the set has an exercise with tracking type `distance`
- **THEN** the series table SHALL show columns: Type, Meters

#### Scenario: Empty new row at bottom
- **WHEN** the series table is rendered
- **THEN** an empty row SHALL be displayed as the last row with type defaulting to `effective`
- **THEN** only one empty row SHALL exist at any time

#### Scenario: Auto-save serie on field completion
- **WHEN** the user fills all required fields for the exercise tracking type in the empty row and the last required field loses focus
- **THEN** a POST request SHALL be sent to `/api/sets/[id]/series` with the row data
- **THEN** on success, the row SHALL appear as committed and a new empty row SHALL appear below

#### Scenario: Auto-save on edit
- **WHEN** the user clicks a saved serie row
- **THEN** the row SHALL become editable
- **WHEN** the user fills all required fields and the last required field loses focus
- **THEN** a PATCH request SHALL be sent to `/api/sets/[id]/series/[serieId]`
- **WHEN** the user blurs before completing all fields
- **THEN** the row SHALL revert to its last saved state

#### Scenario: Saved rows show edit and delete actions
- **WHEN** a serie row is in saved (non-editing) state
- **THEN** it SHALL display Edit and Delete action buttons

#### Scenario: Delete serie with confirmation
- **WHEN** the user clicks Delete on a saved serie row
- **THEN** a confirmation prompt SHALL appear
- **WHEN** confirmed, a DELETE request SHALL be sent to `/api/sets/[id]/series/[serieId]`
- **THEN** the row SHALL be removed from the table

#### Scenario: Saving indicator shown during auto-save
- **WHEN** an auto-save request is in flight
- **THEN** the row SHALL display a saving indicator (e.g. "saving..." text or spinner)

#### Scenario: Error toast on failed save
- **WHEN** an auto-save request fails
- **THEN** a toast error SHALL be displayed with the error message
- **THEN** the row SHALL not be committed

### Requirement: Colored serie type badges
Serie types SHALL be displayed as colored badges in the series table.

#### Scenario: Type badge shows color per type
- **WHEN** a serie has type `warmup`
- **THEN** its badge SHALL be blue
- **WHEN** a serie has type `effective`
- **THEN** its badge SHALL be green
- **WHEN** a serie has type `failure`
- **THEN** its badge SHALL be red
- **WHEN** a serie has type `drop`
- **THEN** its badge SHALL be orange

#### Scenario: Type dropdown defaults to effective
- **WHEN** a new empty serie row appears
- **THEN** the type dropdown SHALL default to `effective`

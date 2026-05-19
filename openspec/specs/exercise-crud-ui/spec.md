## ADDED Requirements

### Requirement: Exercises list page fetches initial data via RSC
The system SHALL provide a page at `/exercises` that fetches the full list of exercises server-side and renders an interactive client component.

#### Scenario: RSC fetches exercises on initial load
- **WHEN** a user navigates to `/exercises`
- **THEN** the server SHALL fetch the exercise list directly from the NestJS API
- **THEN** the server SHALL pass the initial data to the client component as props

### Requirement: Exercises are displayed in a table
The system SHALL display all exercises in a table with columns for name, type, muscles, and actions (edit, delete).

#### Scenario: Table shows all exercises
- **WHEN** the exercises page loads with exercises
- **THEN** the table SHALL render a row for each exercise with its name, type, and linked muscles
- **THEN** the muscles column SHALL show the first 2 muscle names as badges, followed by a "+N more" badge if there are additional muscles

#### Scenario: Empty state
- **WHEN** no exercises exist
- **THEN** the table SHALL show an empty state message

### Requirement: User can create an exercise via dialog
The system SHALL provide a "Create Exercise" button that opens a dialog with a form to add a new exercise.

#### Scenario: Open create dialog
- **WHEN** the user clicks "Create Exercise"
- **THEN** a dialog SHALL open with name input, type dropdown, and muscle multi-select

#### Scenario: Create exercise submits to API
- **WHEN** the user fills in name, selects a type, picks muscles, and submits
- **THEN** a POST request SHALL be sent to `/api/exercises`
- **THEN** the dialog SHALL close
- **THEN** the table SHALL update to include the new exercise

#### Scenario: Create exercise requires name
- **WHEN** the user submits the form with an empty name
- **THEN** the form SHALL display a validation error
- **THEN** no API request SHALL be made

#### Scenario: Create exercise requires type
- **WHEN** the user submits the form without selecting a type
- **THEN** the form SHALL display a validation error

#### Scenario: Create dialog can be cancelled
- **WHEN** the user clicks "Cancel"
- **THEN** the dialog SHALL close without submitting

### Requirement: User can edit an exercise via dialog
The system SHALL provide an edit action per exercise row that opens a dialog pre-filled with current values.

#### Scenario: Open edit dialog
- **WHEN** the user clicks "Edit" on an exercise row
- **THEN** a dialog SHALL open with name, type, and muscles pre-filled

#### Scenario: Edit exercise submits to API
- **WHEN** the user changes fields and submits
- **THEN** a PATCH request SHALL be sent to `/api/exercises/:id`
- **THEN** the dialog SHALL close
- **THEN** the table SHALL update to reflect the change

#### Scenario: Edit dialog can be cancelled
- **WHEN** the user clicks "Cancel"
- **THEN** the dialog SHALL close without changes

### Requirement: User can delete an exercise with confirmation
The system SHALL provide a delete action per exercise row that requires confirmation.

#### Scenario: Delete with confirmation
- **WHEN** the user clicks "Delete" on an exercise row
- **THEN** a confirmation dialog SHALL appear

#### Scenario: Confirm delete removes exercise
- **WHEN** the user confirms deletion
- **THEN** a DELETE request SHALL be sent to `/api/exercises/:id`
- **THEN** the table SHALL remove the deleted exercise

#### Scenario: Cancel delete does nothing
- **WHEN** the user cancels the delete confirmation
- **THEN** no API request SHALL be made

### Requirement: Mutations show loading state
The system SHALL show loading indicators during API mutations.

#### Scenario: Loading state during mutation
- **WHEN** the user submits any mutation form
- **THEN** the submit button SHALL show a loading state
- **THEN** the button SHALL be disabled until the request completes

### Requirement: Toast notifications for success and error
The system SHALL display toast notifications after successful or failed mutations.

#### Scenario: Success toast after mutation
- **WHEN** a mutation succeeds
- **THEN** a success toast SHALL appear

#### Scenario: Error toast on failure
- **WHEN** a mutation fails
- **THEN** an error toast SHALL appear with the error message

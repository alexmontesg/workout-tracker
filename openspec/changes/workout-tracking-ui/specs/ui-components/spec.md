## ADDED Requirements

### Requirement: Top navigation bar component
The system SHALL provide a top navigation bar component for the workout flow.

#### Scenario: Top bar shows back button and current page title
- **WHEN** the top bar is rendered on a workout detail page
- **THEN** it SHALL display a back arrow button linking to the home page
- **THEN** it SHALL display the workout date as the title

#### Scenario: Top bar on home page
- **WHEN** the top bar is rendered on the home page
- **THEN** it SHALL display the app name "Workout Tracker" as the title
- **THEN** no back button SHALL be shown

### Requirement: Set card component for workout detail
The system SHALL provide a set card component to display a set within the workout detail view.

#### Scenario: Set card shows exercise info and series summary
- **WHEN** a set card is rendered
- **THEN** it SHALL display the exercise name
- **THEN** it SHALL display the series count (e.g. "3 series")
- **THEN** it SHALL display a summary of weight/reps (e.g. "80kg×8, 85kg×6")
- **THEN** it SHALL display the rest time if set
- **THEN** it SHALL display a right arrow affordance indicating it's tappable

#### Scenario: Set card is tappable
- **WHEN** the user taps a set card
- **THEN** the user SHALL be navigated to `/workouts/[id]/sets/[setId]`

### Requirement: Workout header component
The system SHALL provide a workout header component for the workout detail page.

#### Scenario: Active workout header shows editable name
- **WHEN** the workout is active (no endDate)
- **THEN** the header SHALL display the workout date prominently
- **THEN** the workout name SHALL be displayed as editable inline text
- **WHEN** the user taps the name
- **THEN** it SHALL become an editable text input
- **WHEN** the user finishes editing and blurs
- **THEN** a PATCH request SHALL be sent to update the workout name
- **THEN** the input SHALL revert to display mode

#### Scenario: Finished workout header shows read-only info
- **WHEN** the workout is finished (has endDate)
- **THEN** the header SHALL display the workout name as plain text (not editable)
- **THEN** it SHALL display both start and end dates

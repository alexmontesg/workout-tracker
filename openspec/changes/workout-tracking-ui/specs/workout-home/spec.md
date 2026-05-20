## ADDED Requirements

### Requirement: Home page shows Start Workout CTA
The landing page at `/` SHALL display a prominent call-to-action to start a new workout.

#### Scenario: Start Workout button is prominent
- **WHEN** the user navigates to `/`
- **THEN** a "Start Workout" button SHALL be displayed as the primary action
- **THEN** the button SHALL be large and centered, suitable for thumb tap on mobile

### Requirement: Home page lists recent finished workouts
The landing page at `/` SHALL display a list of recently finished workouts.

#### Scenario: Recent workouts appear below CTA
- **WHEN** the user navigates to `/`
- **THEN** a "Recent Workouts" section SHALL be displayed below the Start Workout button
- **THEN** each recent workout SHALL show the date, name, and number of sets
- **THEN** workouts SHALL be ordered by date (most recent first)
- **THEN** workouts with no `endDate` SHALL NOT appear in the recent list

#### Scenario: Empty state when no finished workouts
- **WHEN** the user navigates to `/` and has no finished workouts
- **THEN** the recent workouts section SHALL show an empty state message

#### Scenario: Tap recent workout navigates to its page
- **WHEN** the user taps a recent workout in the list
- **THEN** the user SHALL be navigated to `/workouts/[id]`

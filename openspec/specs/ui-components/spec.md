## ADDED Requirements

### Requirement: Select dropdown component
The system SHALL provide a reusable Select component wrapping `@base-ui/react/select` styled to match the existing UI pattern.

#### Scenario: Select renders with placeholder
- **WHEN** a Select is rendered with a placeholder
- **THEN** the placeholder text SHALL be displayed when no option is selected

#### Scenario: Select opens options on click
- **WHEN** the user clicks on the Select trigger
- **THEN** a dropdown list of options SHALL appear

#### Scenario: Select calls onChange when option is chosen
- **WHEN** the user selects an option
- **THEN** the onChange callback SHALL be called with the selected value
- **THEN** the popover SHALL close
- **THEN** the trigger SHALL display the selected option text

### Requirement: Badge component
The system SHALL provide a reusable Badge component for displaying small labels.

#### Scenario: Badge renders with text
- **WHEN** a Badge is rendered with text content
- **THEN** it SHALL display a styled pill/badge element with the text

#### Scenario: Badge supports variants
- **WHEN** a Badge is rendered with `variant="secondary"`
- **THEN** it SHALL apply secondary styling

### Requirement: MultiSelect combobox with badges
The system SHALL provide a reusable MultiSelect component that allows searching, selecting multiple items displayed as removable badges.

#### Scenario: MultiSelect shows search input
- **WHEN** the MultiSelect is rendered
- **THEN** it SHALL show a text input with a placeholder

#### Scenario: MultiSelect filters options as user types
- **WHEN** the user types in the search input
- **THEN** the dropdown options SHALL be filtered to match the typed text

#### Scenario: MultiSelect adds selected items as badges
- **WHEN** the user clicks an option in the dropdown
- **THEN** the option SHALL be added to the selected items
- **THEN** the selected item SHALL appear as a badge
- **THEN** the option SHALL be removed from the available list

#### Scenario: MultiSelect removes item when badge X is clicked
- **WHEN** the user clicks the X on a selected badge
- **THEN** the item SHALL be removed from the selected list
- **THEN** the item SHALL reappear in the available options

#### Scenario: MultiSelect shows filtered options in popover
- **WHEN** the user focuses on the search input
- **THEN** a dropdown popover SHALL appear with available options

#### Scenario: MultiSelect calls onChange with selected IDs
- **WHEN** items are selected or removed
- **THEN** the onChange callback SHALL be called with the array of selected IDs

#### Scenario: MultiSelect shows empty state when all are selected
- **WHEN** all available options are selected
- **THEN** the dropdown SHALL show an empty state message

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

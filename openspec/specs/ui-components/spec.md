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

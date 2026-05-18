## ADDED Requirements

### Requirement: Create exercise with muscle links
The system SHALL allow creating an exercise linked to one or more muscles by their IDs.

#### Scenario: Create exercise with multiple muscles
- **WHEN** a POST request is made to `/exercises` with a JSON body containing `name`, `type`, and `muscleIds: [1, 2]`
- **THEN** the exercise SHALL be created with a ManyToMany relationship to the specified muscles
- **THEN** the response SHALL include the linked muscles in the `muscles` property

### Requirement: Search exercises by muscle ID
The system SHALL allow searching exercises that are linked to a specific muscle, using a proper join query.

#### Scenario: Search exercises by muscle
- **WHEN** a GET request is made to `/exercises/search?muscleId=1`
- **THEN** the response SHALL include all exercises linked to muscle with ID 1, even if they also have other muscles

### Requirement: Exercise response includes linked muscles
When retrieving exercises, the linked muscles SHALL be included in the response.

#### Scenario: Get all exercises includes muscles
- **WHEN** a GET request is made to `/exercises`
- **THEN** each exercise in the response SHALL include a `muscles` array with the linked muscle objects

### Requirement: Muscle deletion respects exercise links
The join table SHALL enforce referential integrity between exercises and muscles.

#### Scenario: Cannot delete muscle linked to exercise
- **WHEN** a DELETE request is made to `/muscles/:id` where the muscle is linked to one or more exercises
- **THEN** the request SHALL fail with an error

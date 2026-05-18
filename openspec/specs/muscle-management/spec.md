## ADDED Requirements

### Requirement: List all muscles
The system SHALL provide an endpoint to retrieve all available muscle groups.

#### Scenario: Get all muscles
- **WHEN** a GET request is made to `/muscles`
- **THEN** the response SHALL be an array of muscle objects, each with `id` and `name`

### Requirement: Create a muscle
The system SHALL allow creating a new muscle group.

#### Scenario: Create a new muscle
- **WHEN** a POST request is made to `/muscles` with a JSON body containing `name`
- **THEN** a new muscle record SHALL be created and returned with its generated `id`
- **THEN** the response status SHALL be 201

### Requirement: Update a muscle
The system SHALL allow updating an existing muscle group's name.

#### Scenario: Update an existing muscle
- **WHEN** a PATCH request is made to `/muscles/:id` with a JSON body containing `name`
- **THEN** the muscle record SHALL be updated with the new name

### Requirement: Delete a muscle
The system SHALL allow deleting a muscle group.

#### Scenario: Delete an existing muscle
- **WHEN** a DELETE request is made to `/muscles/:id`
- **THEN** the muscle record SHALL be removed from the database

#### Scenario: Delete a muscle that is linked to exercises
- **WHEN** a DELETE request is made to `/muscles/:id` and the muscle is referenced by one or more exercises
- **THEN** the request SHALL fail (referential integrity enforced by the join table)

### Requirement: Get a single muscle
The system SHALL allow retrieving a single muscle group by ID.

#### Scenario: Get muscle by ID
- **WHEN** a GET request is made to `/muscles/:id`
- **THEN** the response SHALL contain the muscle object with `id` and `name`

### Requirement: Pre-seeded muscles
The system SHALL start with the 5 default muscle groups: chest, back, shoulder, legs, core.

#### Scenario: Initial muscles exist after seeding
- **WHEN** the seed script has been run
- **THEN** the muscles endpoint SHALL return at least the 5 default muscle groups

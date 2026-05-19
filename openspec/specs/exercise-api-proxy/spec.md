## ADDED Requirements

### Requirement: Route Handler proxies GET /api/exercises to NestJS
The system SHALL provide a Next.js Route Handler at `/api/exercises` that proxies GET requests to NestJS and returns the exercise list.

#### Scenario: GET /api/exercises returns exercises
- **WHEN** a GET request is made to `/api/exercises`
- **THEN** the handler SHALL call the NestJS backend at `/exercises`
- **THEN** it SHALL return the array of exercises with status 200

### Requirement: Route Handler proxies GET /api/exercises/:id to NestJS
The system SHALL provide a Next.js Route Handler at `/api/exercises/[id]` that proxies GET requests to NestJS.

#### Scenario: GET /api/exercises/:id returns single exercise
- **WHEN** a GET request is made to `/api/exercises/1`
- **THEN** the handler SHALL call the NestJS at `/exercises/1`
- **THEN** it SHALL return the exercise object with status 200

#### Scenario: GET /api/exercises/:id returns 404 for missing exercise
- **WHEN** a GET request is made to `/api/exercises/999`
- **THEN** the handler SHALL forward the 404 from NestJS

### Requirement: Route Handler proxies POST /api/exercises to NestJS
The system SHALL provide a Next.js Route Handler at `/api/exercises` that proxies POST requests to NestJS.

#### Scenario: POST /api/exercises creates an exercise
- **WHEN** a POST request is sent to `/api/exercises` with valid exercise data
- **THEN** the handler SHALL forward to NestJS POST `/exercises`
- **THEN** it SHALL return the created exercise with status 201

### Requirement: Route Handler proxies PATCH /api/exercises/:id to NestJS
The system SHALL provide a Next.js Route Handler at `/api/exercises/[id]` that proxies PATCH requests to NestJS.

#### Scenario: PATCH /api/exercises/:id updates an exercise
- **WHEN** a PATCH request is sent to `/api/exercises/1` with updated fields
- **THEN** the handler SHALL forward to NestJS PATCH `/exercises/1`
- **THEN** it SHALL return the updated exercise with status 200

### Requirement: Route Handler proxies DELETE /api/exercises/:id to NestJS
The system SHALL provide a Next.js Route Handler at `/api/exercises/[id]` that proxies DELETE requests to NestJS.

#### Scenario: DELETE /api/exercises/:id deletes an exercise
- **WHEN** a DELETE request is sent to `/api/exercises/1`
- **THEN** the handler SHALL forward to NestJS DELETE `/exercises/1`
- **THEN** it SHALL return status 200

## ADDED Requirements

### Requirement: Workout API proxy routes exist
Next.js API routes SHALL proxy Workout CRUD requests to the NestJS backend.

#### Scenario: POST /api/workouts creates a workout
- **WHEN** a POST request is sent to `/api/workouts` with workout data
- **THEN** the request SHALL be forwarded to `POST http://localhost:3001/workouts`
- **THEN** the response from the backend SHALL be returned to the client

#### Scenario: GET /api/workouts/[id] fetches workout with sets
- **WHEN** a GET request is sent to `/api/workouts/[id]`
- **THEN** the request SHALL be forwarded to `GET http://localhost:3001/workouts/[id]`
- **THEN** the response from the backend SHALL be returned to the client

#### Scenario: PATCH /api/workouts/[id] updates workout
- **WHEN** a PATCH request is sent to `/api/workouts/[id]` with workout data
- **THEN** the request SHALL be forwarded to `PATCH http://localhost:3001/workouts/[id]`
- **THEN** the response from the backend SHALL be returned to the client

#### Scenario: POST /api/workouts/[id]/finish finishes workout
- **WHEN** a POST request is sent to `/api/workouts/[id]/finish`
- **THEN** the request SHALL be forwarded to `POST http://localhost:3001/workouts/[id]/finish`
- **THEN** the response from the backend SHALL be returned to the client

### Requirement: Workout list endpoint exists
The system SHALL provide an endpoint to list all workouts for the home page.

#### Scenario: GET /api/workouts lists all workouts
- **WHEN** a GET request is sent to `/api/workouts`
- **THEN** the request SHALL be forwarded to `GET http://localhost:3001/workouts`
- **THEN** the response from the backend SHALL be returned to the client

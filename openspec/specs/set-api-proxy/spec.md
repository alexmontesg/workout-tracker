## ADDED Requirements

### Requirement: GET /api/sets proxy
The Next.js Route Handler at `/api/sets` SHALL forward GET requests to the NestJS backend.

#### Scenario: Forward GET /api/sets to backend
- **WHEN** a GET request is made to `/api/sets`
- **THEN** the handler SHALL forward to `GET /sets` on the NestJS backend
- **THEN** the response SHALL be returned as-is

### Requirement: POST /api/sets proxy
The Next.js Route Handler at `/api/sets` SHALL forward POST requests to the NestJS backend.

#### Scenario: Forward POST /api/sets to backend
- **WHEN** a POST request with a JSON body is made to `/api/sets`
- **THEN** the handler SHALL forward to `POST /sets` on the NestJS backend
- **THEN** the response SHALL be returned with the appropriate status code

### Requirement: GET /api/sets/[id] proxy
The Next.js Route Handler at `/api/sets/[id]` SHALL forward GET requests to the NestJS backend.

#### Scenario: Forward GET /api/sets/[id] to backend
- **WHEN** a GET request is made to `/api/sets/42`
- **THEN** the handler SHALL forward to `GET /sets/42` on the NestJS backend
- **THEN** the response SHALL be returned as-is

### Requirement: PATCH /api/sets/[id] proxy
The Next.js Route Handler at `/api/sets/[id]` SHALL forward PATCH requests to the NestJS backend.

#### Scenario: Forward PATCH /api/sets/[id] to backend
- **WHEN** a PATCH request with a JSON body is made to `/api/sets/42`
- **THEN** the handler SHALL forward to `PATCH /sets/42` on the NestJS backend
- **THEN** the response SHALL be returned as-is

### Requirement: DELETE /api/sets/[id] proxy
The Next.js Route Handler at `/api/sets/[id]` SHALL forward DELETE requests to the NestJS backend.

#### Scenario: Forward DELETE /api/sets/[id] to backend
- **WHEN** a DELETE request is made to `/api/sets/42`
- **THEN** the handler SHALL forward to `DELETE /sets/42` on the NestJS backend
- **THEN** the response SHALL be returned as-is

### Requirement: POST /api/sets/[id]/series/[serieId] proxy
The Next.js Route Handler at `/api/sets/[id]/series/[serieId]` SHALL forward POST requests to the NestJS backend.

#### Scenario: Forward POST /api/sets/42/series to backend
- **WHEN** a POST request with a JSON body is made to `/api/sets/42/series`
- **THEN** the handler SHALL forward to `POST /sets/42/series` on the NestJS backend
- **THEN** the response SHALL be returned with the appropriate status code

### Requirement: PATCH /api/sets/[id]/series/[serieId] proxy
The Next.js Route Handler at `/api/sets/[id]/series/[serieId]` SHALL forward PATCH requests to the NestJS backend.

#### Scenario: Forward PATCH /api/sets/42/series/7 to backend
- **WHEN** a PATCH request with a JSON body is made to `/api/sets/42/series/7`
- **THEN** the handler SHALL forward to `PATCH /sets/42/series/7` on the NestJS backend
- **THEN** the response SHALL be returned as-is

### Requirement: DELETE /api/sets/[id]/series/[serieId] proxy
The Next.js Route Handler at `/api/sets/[id]/series/[serieId]` SHALL forward DELETE requests to the NestJS backend.

#### Scenario: Forward DELETE /api/sets/42/series/7 to backend
- **WHEN** a DELETE request is made to `/api/sets/42/series/7`
- **THEN** the handler SHALL forward to `DELETE /sets/42/series/7` on the NestJS backend
- **THEN** the response SHALL be returned as-is

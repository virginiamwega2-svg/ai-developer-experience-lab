# AI Developer Experience Lab

A practical project for learning AI APIs, developer experience, technical documentation, API testing, and troubleshooting.

## What this project demonstrates

This project focuses on building and documenting a small API while applying Developer Experience principles.

It currently includes:

* REST API endpoints
* Request validation with Zod
* Automated API tests with Vitest and Supertest
* Success and error response testing
* Developer-focused documentation

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm run dev
```
The server should start at:

http://localhost:3000

You should see:

Server running on http://localhost:3000

## API

The API currently provides a `/hello` endpoint with GET and POST operations.

### GET `/hello`

Returns a default greeting.

#### Example request

```bash
curl http://localhost:3000/hello
```

#### Example response

```json
{
  "message": "Hello, Developer!"
}
```

The endpoint returns HTTP `200` when successful.

### POST `/hello`

Returns a personalized greeting.

#### Request

**Method:** `POST`

**Endpoint:**

```text
http://localhost:3000/hello
```

**Content-Type:**

```text
application/json
```

**Request body:**

```json
{
  "name": "Virginia"
}
```

#### Successful response

**Status:** `200 OK`

```json
{
  "message": "Hello, Virginia!"
}
```

#### Validation errors

If `name` is missing or is not a string, the API returns:

**Status:** `400 Bad Request`

```json
{
  "error": "Name is required"
}
```

#### PowerShell example

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

Expected result:

```text
Hello, Virginia!
```


Returns a personalized greeting when provided with a valid name.

#### Example request

```bash
curl -X POST http://localhost:3000/hello \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Virginia\"}"
```

#### Example response

```json
{
  "message": "Hello, Virginia!"
}
```

### Error handling

The API validates the `name` field.

If `name` is missing or is not a string, the API returns HTTP `400`.

#### Example request

```json
{
  "name": 123
}
```

#### Example response

```json
{
  "error": "Name is required"
}
```

## Testing

Run the automated tests with:

```bash
npm test
```

The current test suite verifies:

* `GET /hello` returns a successful response
* `POST /hello` accepts a valid name
* `POST /hello` rejects a non-string name
* `POST /hello` rejects a missing name

## Developer Experience Focus

This project treats API behavior as part of Developer Experience.

The goal is to make APIs easier to understand, test, integrate, and troubleshoot through clear documentation and predictable behavior.

### API validation

The OpenAPI specification is automatically validated with Redocly in GitHub Actions whenever changes are pushed or a pull request is opened.

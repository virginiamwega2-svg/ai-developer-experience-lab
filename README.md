# AI Developer Experience Lab

A practical project exploring **Developer Experience around APIs** — from building and testing an API to documenting it, identifying developer friction, improving the experience, and validating the documentation.

> **Build → Document → Test → Troubleshoot → Improve → Verify**

## What this project demonstrates

This project was built from both an **engineering** and **developer experience** perspective.

I built a small REST API and then used it as if I were a developer discovering the project for the first time.

That process helped me identify and fix real points of friction, including:

* A missing development command
* Shell-specific API examples
* Unclear failure scenarios
* Missing automated verification
* Documentation that needed to be checked against actual API behavior

The result is a working API supported by documentation, automated tests, troubleshooting guidance, OpenAPI documentation, and CI validation.

## Developer Experience workflow

The project follows a practical DevEx workflow:

**Build → Use → Find friction → Fix → Document → Test → Verify**

This means documentation was not treated as a separate task after development.

The API, documentation, tests, errors, troubleshooting guidance, and OpenAPI specification were evaluated together as part of the developer journey.

## What I built

* REST API with Express and TypeScript
* Request validation with Zod
* Automated API tests with Vitest and Supertest
* Developer-focused QuickStart documentation
* Troubleshooting documentation
* Developer Experience audit
* OpenAPI 3.0 API specification
* Interactive API documentation with Redocly
* Redocly API specification validation
* GitHub Actions CI for documentation validation
* Docs-as-code workflow using branches, pull requests, review, and merge

## Portfolio evidence

The repository contains the following evidence of the work:

| Evidence                                                     | What it demonstrates                          |
| ------------------------------------------------------------ | --------------------------------------------- |
| [`CASE-STUDY.md`](./CASE-STUDY.md)                           | Investigation, decisions, fixes, and outcomes |
| [`DEVEX-AUDIT.md`](./DEVEX-AUDIT.md)                         | Developer journey and friction analysis       |
| [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md)                 | Practical troubleshooting guidance            |
| [`openapi.yaml`](./openapi.yaml)                             | Machine-readable API documentation            |
| [`tests/`](./tests/)                                         | Automated verification of API behavior        |
| [`.github/workflows/docs.yml`](./.github/workflows/docs.yml) | Automated documentation validation            |

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

The server starts at:

```text
http://localhost:3000
```

You should see:

```text
Server running on http://localhost:3000
```

## API

The API provides a `/hello` endpoint with GET and POST operations.

### GET `/hello`

Returns a default greeting.

#### Request

```bash
curl http://localhost:3000/hello
```

#### Response

```json
{
  "message": "Hello, Developer!"
}
```

**Status:** `200 OK`

### POST `/hello`

Returns a personalized greeting.

#### Request

```json
{
  "name": "Virginia"
}
```

#### Response

```json
{
  "message": "Hello, Virginia!"
}
```

**Status:** `200 OK`

#### PowerShell example

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

### Validation errors

If `name` is missing or is not a string, the API returns:

**Status:** `400 Bad Request`

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

The test suite verifies:

* `GET /hello` returns a successful response
* `POST /hello` accepts a valid name
* `POST /hello` rejects a non-string name
* `POST /hello` rejects a missing name

The current suite contains **4 automated tests**.

## API documentation

The API is documented using the **OpenAPI Specification**.

The specification describes:

* GET `/hello`
* POST `/hello`
* Request body requirements
* Successful responses
* Validation errors
* Operation IDs
* Local development server

The specification is validated with **Redocly CLI**.

Interactive API documentation can also be generated from the OpenAPI specification.

## Continuous Integration

Documentation validation runs automatically through GitHub Actions when changes are pushed to `main` or when a pull request is opened.

The CI workflow validates:

```text
openapi.yaml
```

using Redocly.

This helps prevent API documentation from silently becoming invalid as the project changes.

## Why this project matters

The goal of this project was not simply to build another API.

It was to understand what happens **around the API**:

* Can a developer get started?
* Can they understand the API quickly?
* Do the examples actually work?
* Are errors understandable?
* Can they troubleshoot common problems?
* Can the documented behavior be verified automatically?
* Can documentation stay aligned with implementation?

This project treats those questions as part of building a good developer experience.

## Key lesson

**Documentation is not finished when it is written.**

It is finished when a developer can follow it, run the examples, understand the errors, and make progress without unnecessary friction.

That is the principle I am carrying forward into my work with **Developer Experience, technical documentation, APIs, SDKs, and AI developer tools**.

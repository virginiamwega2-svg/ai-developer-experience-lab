# Developer Experience Audit

## Project

AI Developer Experience Lab

## Audit Goal

Evaluate whether a developer can successfully get the API running and make requests using the project's documentation.

## Developer Journey Tested

1. Install dependencies with `npm install`
2. Start the API with `npm run dev`
3. Call `GET /hello`
4. Call `POST /hello`
5. Test an invalid POST request
6. Run the automated test suite

## Findings

### Finding 1 — Development command was missing

The README initially instructed developers to run:

```bash
npm run dev
```

However, the project did not have a `dev` script in `package.json`.

### Resolution

Added a development script using `tsx`:

```json
"dev": "tsx watch src/server.ts"
```

The API can now be started successfully with:

```bash
npm run dev
```

### Finding 2 — POST example was not PowerShell-friendly

The initial POST example used Unix-style multiline syntax with `\`.

When tested in PowerShell, the command failed because PowerShell handles command continuation differently.

### Resolution

Tested the request using PowerShell's `Invoke-RestMethod`:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

The request successfully returned:

```text
Hello, Virginia!
```

## Verified API Behavior

### GET /hello

Returns HTTP `200` with:

```json
{
  "message": "Hello, Developer!"
}
```

### POST /hello — valid request

Request:

```json
{
  "name": "Virginia"
}
```

Returns HTTP `200` with:

```json
{
  "message": "Hello, Virginia!"
}
```

### POST /hello — missing name

Request:

```json
{}
```

Returns HTTP `400` with:

```json
{
  "error": "Name is required"
}
```

## Automated Test Evidence

The test suite currently contains four tests.

```text
4 tests passed
```

The tests cover:

* GET `/hello` success behavior
* POST `/hello` success behavior
* Invalid `name` input
* Missing `name` input

## DevEx Lessons

This audit demonstrated that developer experience is not only about writing documentation.

It also involves:

* Testing documentation instructions
* Verifying API behavior
* Finding gaps between documentation and implementation
* Making setup instructions executable
* Considering different developer environments
* Documenting errors and troubleshooting paths
* Using automated tests to verify documented behavior

## Result

The API's setup and documented request flows were tested from a developer's perspective, and issues discovered during the audit were resolved or identified for documentation improvement.

## Troubleshooting Documentation Verification

After creating `TROUBLESHOOTING.md`, I followed the documented troubleshooting and API usage steps again.

### Verified

* `npm run dev` successfully starts the development server.
* `GET /hello` returns the expected greeting.
* Invalid `POST /hello` requests return a clear validation error.
* The PowerShell-compatible POST request successfully sends JSON to the API.
* Automated tests pass with 4/4 tests passing.

### Result

The documentation was tested from a developer's perspective rather than only being written.

This helped verify that the documented setup, API behavior, error handling, and troubleshooting steps are actionable.

## API Documentation Validation

The updated `POST /hello` API documentation was tested directly from PowerShell.

### Valid request

The documented request with a valid `name` successfully returned:

```json
{
  "message": "Hello, Virginia!"
}
```

### Invalid request

The documented validation example with a missing `name` successfully returned:

```json
{
  "error": "Name is required"
}
```

### Result

Both the success and error examples in the API documentation were verified against the running API.

This confirms that the documentation reflects the actual API behavior and can be followed successfully by a developer.

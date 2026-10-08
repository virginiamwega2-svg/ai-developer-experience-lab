# AI Developer Experience Lab — Case Study

## Problem

How can a small API provide a smooth developer experience from initial setup through successful API usage?

The goal of this project was to build a working API and evaluate the experience from a developer's perspective.

Rather than only checking whether the code worked, I wanted to test whether another developer could:

* Set up the project successfully
* Start the development server
* Understand how to use the API
* Follow the documented examples
* Understand validation errors
* Troubleshoot common problems
* Verify expected behavior through tests

The project became an opportunity to identify developer friction, improve the experience, and document the changes with evidence.

## Investigation

I approached the project as if I were a developer discovering the API for the first time.

I followed the documentation from setup through API usage and tested both successful and unsuccessful scenarios.

During this process, I found several points of friction.

### Finding 1: The documented development command did not work

The README instructed developers to run:

```bash
npm run dev
```

However, the project did not initially have a `dev` script configured.

This meant the documented onboarding path failed before the developer could even start the application.

### Finding 2: The API example was not PowerShell-friendly

The original POST request example used Unix-style `curl` syntax.

Because I was testing the project in Windows PowerShell, the example did not work as expected.

The API itself was working, but the documentation did not account for the developer's environment.

### Finding 3: Failure behavior needed to be tested

I also tested what happened when a developer sent an incomplete request.

For example:

```json
{}
```

The API returned:

```json
{
  "error": "Name is required"
}
```

This confirmed that validation errors were an important part of the developer experience and needed to be documented and tested.

### Finding 4: API behavior needed automated verification

Manual testing confirmed that the API worked, but I also wanted a repeatable way to verify its behavior.

I added automated tests covering successful and invalid requests.

The final test suite covered four scenarios:

* Successful GET request
* Successful POST request
* Invalid `name` value
* Missing `name` value

The result was:

```text
Test Files  1 passed
Tests       4 passed
```

## Fixes & Improvements

After identifying the friction points, I made changes to improve the developer experience.

### Fix 1: Added a development script

I added `tsx` and configured the project with a development script:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "test": "vitest"
  }
}
```

This allowed developers to start the application using the same command documented in the README.

### Fix 2: Improved API examples for PowerShell

I replaced the Unix-style `curl` example with a PowerShell-friendly request:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

This made the documented example match the environment I was using to test the project.

### Fix 3: Documented validation behavior

I documented the expected validation behavior for invalid and missing `name` values.

For example:

```json
{
  "error": "Name is required"
}
```

This gives developers a clear indication of what went wrong and what the API expects.

### Fix 4: Added automated API tests

I added automated tests using Vitest and Supertest to verify both successful and invalid requests.

The final test suite contains four tests covering the documented API behavior.

## Evidence & Verification

I verified the improvements by testing the developer journey again after making the changes.

### Development setup

Running:

```bash
npm run dev
```

starts the development server successfully.

The server starts at:

```text
http://localhost:3000
```

I also tested the documented API examples and verified that the API behaved as described.

### Test verification

The automated test suite passed all four tests:

```text
Test Files  1 passed
Tests       4 passed
```

### Documentation verification

I compared the documentation against the running application to verify that:

* The documented development command works.
* The documented API endpoints exist.
* The request examples match the expected request format.
* The documented responses match actual API behavior.
* Validation errors match the implementation.
* The troubleshooting guidance reflects problems encountered during testing.

## Outcome

The project now provides a more reliable developer journey from setup to successful API usage.

The main improvements were:

* The documented development command now works.
* The API examples work in the environment I used to test them.
* Validation behavior is clearly documented.
* Common setup and usage problems have troubleshooting guidance.
* API behavior is covered by automated tests.
* Documentation has been verified against the running application.

The project also now contains evidence of the development and documentation process through:

* `DEVEX-AUDIT.md`
* `TROUBLESHOOTING.md`
* Automated API tests
* Verified API examples
* OpenAPI documentation
* This case study

## Lessons Learned

### 1. Documentation needs to be tested

Writing documentation is not enough.

The instructions need to be followed in the same way a developer would follow them.

A command that looks correct in a README can still fail when someone actually runs it.

### 2. Developer environments matter

Documentation can be technically correct while still creating friction for developers using a different operating system or shell.

Considering the developer's environment is part of creating a good experience.

### 3. Errors are part of the developer experience

Clear validation errors can help developers understand and fix problems without searching through additional documentation.

API behavior and documentation therefore work together.

### 4. Tests can support documentation

Automated tests provide a repeatable way to verify that documented API behavior continues to work.

This makes tests useful not only for software quality, but also for maintaining trustworthy developer documentation.

### 5. DevEx is a continuous process

The biggest lesson from the project was that Developer Experience is not a final documentation task.

It is a continuous loop:

**Build → Document → Use → Find friction → Improve → Test → Verify**

The goal is not simply to produce documentation.

The goal is to help developers make progress with less unnecessary friction.

## Conclusion

This project started as a small API exercise.

It became an opportunity to investigate the developer experience around an API and understand how implementation, documentation, errors, testing, and troubleshooting work together.

The experience reinforced a principle I want to carry into future developer-focused work:

> **Don't just document the developer journey. Experience it yourself.**

That means building the thing, using it, breaking it, identifying friction, improving it, and verifying the result.

## OpenAPI & Interactive Documentation

I documented the API using the OpenAPI Specification and validated the specification with Redocly CLI.

The OpenAPI definition documents:

* GET `/hello`
* POST `/hello`
* Request body requirements
* Successful responses
* Validation errors
* Operation IDs
* Local development server

Redocly validation confirmed that the OpenAPI specification is valid.

The specification was also rendered as interactive API documentation, allowing developers to explore the endpoints and understand their requests and responses through a browser.

One Redocly warning remains for the localhost server URL because the API currently runs locally. This warning was intentionally retained because the documented server URL reflects the actual development environment.

### Evidence

* `openapi.yaml` — machine-readable API specification
* `redocly.yaml` — documentation tooling configuration
* Redocly CLI validation
* Interactive API documentation preview
* GitHub Actions CI validation

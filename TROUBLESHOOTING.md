# Troubleshooting

Common problems encountered while setting up and using the AI Developer Experience Lab.

## 1. `npm run dev` does not work

### Problem

You run:

```bash
npm run dev
```

and npm reports that the `dev` script does not exist.

### Cause

The project did not originally have a development script configured in `package.json`.

### Solution

Make sure `package.json` contains:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "test": "vitest"
}
```

If `tsx` is not installed, run:

```bash
npm install -D tsx
```

Then start the development server:

```bash
npm run dev
```

You should see:

```text
Server running on http://localhost:3000
```

---

## 2. PowerShell does not run the multiline `curl` example

### Problem

A Unix-style `curl` command using `\` for line continuation may fail in PowerShell.

### Cause

PowerShell handles command-line syntax differently from Bash and other Unix shells.

This means documentation written for one shell may not work correctly for another developer.

### Solution

Use PowerShell's native HTTP command:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

Expected response:

```text
Hello, Virginia!
```

### DevEx lesson

When writing developer documentation, consider the environment your users are working in.

A command that works on macOS or Linux may not work the same way on Windows PowerShell.

---

## 3. POST `/hello` returns a validation error

### Problem

A request such as:

```json
{}
```

returns:

```json
{
  "error": "Name is required"
}
```

### Cause

The `name` field is required by the API.

### Solution

Send a request containing a string `name`:

```json
{
  "name": "Virginia"
}
```

Example:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"name":"Virginia"}'
```

Expected response:

```json
{
  "message": "Hello, Virginia!"
}
```

---

## 4. Tests fail after changing API behavior

### Problem

An automated test may fail after changing an endpoint's response or validation behavior.

### Solution

Run the test suite:

```bash
npm test
```

Read the failing test carefully.

The test describes the behavior the API is currently expected to provide.

For example:

```text
Test Files 1 passed
Tests 4 passed
```

means the current API behavior is covered by four passing tests.

### DevEx lesson

Automated tests can act as an executable form of API documentation.

They help developers understand what behavior is expected and help prevent accidental changes.

---

## Troubleshooting approach

When something does not work:

1. Read the error message.
2. Identify what the developer was trying to do.
3. Reproduce the problem.
4. Find the underlying cause.
5. Fix the issue.
6. Test the fix.
7. Document the solution.

Good troubleshooting documentation should help developers solve problems without needing to ask for help.

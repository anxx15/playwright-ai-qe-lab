# Playwright AI QE Lab — Copilot Instructions

## Technology

- Playwright
- TypeScript
- Node.js
- Playwright Test

## Framework Architecture

- Tests belong under `tests/`.
- Page Objects belong under `pages/`.
- Reusable UI components belong under `components/`.
- Shared test dependencies belong under `fixtures/`.
- API clients belong under `api/`.
- Database clients and repositories belong under `database/`.
- Test data belongs under `test-data/`.
- Generic reusable utilities belong under `utils/`.

## Locator Rules

- Prefer `getByRole()`.
- Prefer `getByLabel()` for form fields.
- Use `getByText()` when appropriate.
- Use `getByTestId()` when a stable test identifier exists.
- Avoid XPath unless there is a specific reason.
- Avoid brittle CSS selectors.
- Do not use arbitrary `.nth()` unless the test intentionally targets a specific occurrence.

## Synchronization Rules

- Do not use `waitForTimeout()`.
- Prefer Playwright auto-waiting.
- Use web assertions to wait for expected UI state.
- Use event-based waiting for downloads, popups and network responses.

## Test Design

- Tests must be independent.
- Do not depend on execution order.
- Avoid shared mutable test data.
- Prefer API-based test-data setup where appropriate.
- Use DB validation selectively.
- Do not turn every test into a UI-to-DB end-to-end test.

## Page Object Rules

- Keep locators and page-specific behavior in Page Objects.
- Do not create unnecessary BasePage abstractions.
- Do not wrap simple Playwright methods without adding meaningful behavior.
- Keep business intent visible in tests.

## API Testing

- Use Playwright `APIRequestContext`.
- Create reusable API clients for domain operations.
- Validate response status and meaningful business data.
- Include negative and boundary scenarios.

## Database Testing

- Separate DB connectivity from domain repositories.
- Use parameterized SQL.
- Never hardcode database credentials.
- Do not log passwords, tokens or secrets.

## AI Code Generation

When generating code:

1. Follow this architecture.
2. Reuse existing utilities and fixtures.
3. Do not create duplicate abstractions.
4. Explain assumptions when requirements are unclear.
5. Prefer maintainable code over the shortest code.
6. Do not weaken assertions simply to make tests pass.

## Failure Analysis

When analyzing a failure:

1. Identify the failure.
2. Determine whether it may be a test, application, environment, data or synchronization issue.
3. Explain the evidence.
4. Propose a fix.
5. Do not modify assertions merely to make the test pass.


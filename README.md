# Playwright AI QE Lab

A Playwright-based QA automation lab for browser and API testing, built with TypeScript and Playwright Test. The project is structured to support scalable test automation with clear separation between tests, page objects, fixtures, API clients, and reusable utilities.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test

## Project Structure

```text
playwright-ai-qe-lab/
│
├── .github/
│   ├── copilot-instructions.md
│   └── prompts/
│       ├── generate-test.md
│       ├── review-test.md
│       └── analyze-failure.md
│
├── tests/                # End-to-end and API tests
├── pages/                # Page Object Models
├── components/           # Reusable UI components
├── fixtures/             # Shared test fixtures and setup
├── api/                  # API clients and request helpers
├── database/             # Database connectivity and repositories
├── test-data/            # Test data and fixtures
├── utils/                # Generic utilities
├── config/
│
├── docs/
│   ├── architecture.md
│   ├── day-01.md
│   ├── ...
│   ├── day-12.md
│   └── interview-notes.md
│
├── playwright.config.ts
├── package.json
└── README.md
```

## Prerequisites

Before running the suite, make sure you have:

- Node.js 18+ installed
- npm or yarn available
- A browser environment supported by Playwright
- Any required app or API services running locally or in your test environment

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

Run the full test suite:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test tests/example.spec.ts
```

Run with a headed browser:

```bash
npx playwright test --headed
```

Run only a specific test name:

```bash
npx playwright test -g "adds item to cart"
```

Generate and view the HTML report:

```bash
npx playwright show-report
```

## Testing Guidelines

This project follows the established automation conventions:

- Prefer `getByRole()` and `getByLabel()` for selectors
- Keep locators in Page Object files
- Prefer stable, accessible selectors over brittle CSS/XPath
- Use Playwright auto-waiting instead of `waitForTimeout()`
- Keep tests independent and isolated
- Validate meaningful business outcomes, not just UI presence
- Use API and fixture-based setup where appropriate

## Example Test Pattern

```ts
import { test, expect } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('demo-user');
  await page.getByLabel('Password').fill('demo-password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Page Objects

Page Objects should encapsulate page-specific behavior and locators. Keep the test reading like business behavior rather than low-level interaction details.

Example pattern:

```ts
export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput() {
    return this.page.getByLabel('Username');
  }

  get passwordInput() {
    return this.page.getByLabel('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## CI and Automation

This project is intended to be used in CI pipelines with Playwright's built-in reporting and retries. Typical CI usage includes:

- Install dependencies
- Install Playwright browsers
- Run tests
- Publish HTML or JUnit reports as artifacts

## Notes

- Do not expose secrets or credentials in test code or logs
- Keep database credentials out of source control
- Prefer parameterized, maintainable test data
- Improve reliability by favoring explicit user flows and assertion-driven testing

## Contributing

When adding or modifying tests:

1. Follow the project folder structure
2. Reuse existing fixtures, utilities, and API clients
3. Prefer readable and maintainable code over shortcuts
4. Add meaningful assertions and negative scenarios when relevant
5. Ensure tests remain independent and reliable

## License

This project is for learning and QA automation experimentation. Update or replace this section if your repository is intended to use a specific license.

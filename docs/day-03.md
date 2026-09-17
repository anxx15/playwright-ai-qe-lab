Selenium mindset
    ↓
TestNG/JUnit
    ↓
BaseTest
    ↓
@BeforeMethod
    ↓
Driver
    ↓
Page Objects

Playwright
    ↓
Playwright Test
    ↓
playwright.config.ts
    ↓
Fixtures
    ↓
Browser Context
    ↓
    Page
    ↓
    Tests

@playwright/test gives us Test runner
    Assertions
    Fixtures
    Parallel execution
    Retries
    Projects
    Reporting
    Tracing
    Screenshots
    Video
    Configuration

                    playwright
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
        Playwright library    Playwright Test
              ↓                     ↓
              └──────────┬──────────┘

testDir: './tests',
test.describe()
    You can group tests of similar kind

test.beforeEach() 
    every test needs to open the transaction page

test.afterEach()
    Common uses include:
        cleanup
        logging
        screenshots
        custom reporting
        diagnostic information

beforeAll vs beforeEach
    beforeEach Runs before every test.
    beforeAll Runs once for the group.

playwright.config.ts
    Central configuration for Playwright execution.

Retries are not a solution to flaky tests.
    Retries are a diagnostic/containment mechanism.
    If 20% of your tests need retries, your framework has a reliability problem.

workers: 3
    parallel execution.
    npx playwright test --workers=3


                    Test Suite
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
          Worker 1  Worker 2  Worker 3
             │         │         │
           Test A    Test B    Test C

Fixtures
    built-in fixtures in playwright:
    page
    browser
    context
    request
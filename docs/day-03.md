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

Fixture vs Page Object
    Page Object represents UI behaviour.
    Fixture provides Test dependencies/resources.

Explain Playwright fixtures to a Selenium Java developer who is familiar with TestNG @BeforeMethod and Page Objects. Show the architectural difference and explain when a custom fixture should be used.
    In Selenium/TestNG:
        @BeforeMethod
            ↓
        Create WebDriver
            ↓
        Create Page Objects
            ↓
        Run test

    In Playwright:
        Playwright Test
                ↓
            Built-in fixtures
                ↓
            Browser Context
                ↓
                Page
                ↓
                Test


    A fixture is a test dependency that Playwright creates and manages for you.
        test('example', async ({ page }) => {
            await page.goto('/login');
        });
    Here, page is a built-in fixture. Playwright creates an isolated page before the test and cleans it up afterward.

    Fixture vs Page Object
    Page Object: contains UI actions and locators.
    Fixture: creates and provides dependencies such as Page Objects, authenticated users, or test data.

        Page Object  = How to interact with the UI
        Fixture      = How to prepare and provide dependencies

    When to Create a Custom Fixture
    Use a custom fixture when setup is reusable and has a lifecycle:

    Logged-in users
    Admin/customer roles
    Page Objects
    Test data
    API clients
    Database setup and cleanup
    Use beforeEach for simple setup, such as opening a page:


    Use a custom fixture when the setup itself should become a reusable dependency.

You have 2,000 Playwright tests. They need to run in parallel on 10 workers in Jenkins. Some tests need authentication, some need API clients, and some need test data. How would you architect your framework?

                        Playwright Test
                          │
                    Configuration
                          │
             ┌────────────┴────────────┐
             ↓                         ↓
        Projects                   Workers
             │
        Test execution
             │
        ┌────┴────┐
        ↓         ↓
    Fixtures   Test Data
        │
   ┌────┼────┐
   ↓    ↓    ↓
 Page  API   DB


 Playwright isn't just Selenium with a different API. Playwright Test gives you a test execution architecture—fixtures, isolation, projects, configuration, parallelism and reporting—that should shape how you design the framework.
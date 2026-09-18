Playwright Framework Architecture
=================================
                                        Playwright Test
                                                │
                                            Test / Spec
                                                │
                                    ┌───────────┴───────────┐
                                    │                       │
                                Fixtures                Test Data
                                    │
                                Page / Component
                                    │
                                Application UI

                                    ┌───────────────┐
                                    │   Test / E2E  │
                                    └───────┬───────┘
                                            │
                                ┌───────────┼───────────┐
                                │           │           │
                                UI          API          DB
                                │           │           │
                            Pages       API Client   DB Utility


    import { Page } from '@playwright/test';

    export class LoginPage {

        constructor(private page: Page) {}

        async login(username: string, password: string) {

            await this.page.getByLabel('Username').fill(username);
            await this.page.getByLabel('Password').fill(password);
            await this.page.getByRole('button', { name: 'Login' }).click();
        }
    }

        const loginPage = new LoginPage(page);
        await loginPage.login('anup', 'password');

Page Object vs Component Object
    Page Object represents a significant application page/workflow.
    Component Object represents a reusable UI component.
    POM describes application behavior. Fixtures provide test dependencies.
        Test
            │
            └── transactionPage fixture
                    │
                    └── TransactionPage
                                │
                                └── Playwright Page

combine POM + Fixture
                     TEST
                        │
                        ▼
                    Test Fixture
                        │
                        ▼
                    Page Object
                        │
                        ▼
                Playwright Page
                        │
                        ▼
                    Browser


test data
Utilities are for genuinely reusable technical functions.
    utils/
        dateUtils.ts
        randomData.ts
        fileUtils.ts
        pollingUtils.ts
    And don't put application behavior into utilities.
    If the code knows about the application's UI, it probably belongs in a page/component object.

Configuration
    playwright.config.ts
            │
            ├── baseURL
            ├── browser
            ├── workers
            ├── retries
            ├── timeout
            ├── reporter
            └── projects

| Selenium Java          | Playwright                                    |
| ---------------------- | --------------------------------------------- |
| WebDriver              | Browser/Page/Context                          |
| PageFactory            | Usually unnecessary                           |
| `@FindBy`              | Locators                                      |
| BasePage               | Often unnecessary                             |
| BaseTest               | Fixtures/config                               |
| DriverFactory          | Playwright config/fixtures                    |
| ThreadLocal WebDriver  | Playwright worker/context isolation           |
| TestNG `@BeforeMethod` | `beforeEach` / fixtures                       |
| TestNG DataProvider    | Loops / parameterized data                    |
| Maven profiles         | Config/projects/env                           |
| Selenium Grid          | Playwright workers/sharding/CI infrastructure |
| Explicit waits         | Auto-waiting + web assertions                 |
| Screenshot utilities   | Built-in screenshot/trace capabilities        |
| ---------------------- | --------------------------------------------- |

What is Page Object Model?
    Page Object Model (POM) is a design pattern where you create a class for each application page/component, keeping its locators and UI actions together. POM is a design pattern that encapsulates page-specific locators and interactions into reusable objects, keeping test cases focused on business behavior and improving maintainability.

Why use POM in Playwright?
    I use POM in Playwright to encapsulate UI locators and interactions, keeping tests focused on business behavior and making the automation suite easier to maintain and scale.

What's the difference between a Page Object and a Component Object?
    For an enterprise framework, Component Objects become particularly useful when the same widgets/components appear across many applications or pages.

What's the difference between a fixture and a Page Object?
    Page Object = “How do I interact with the application?”
    Fixture = “What does my test need, and how do I set it up/clean it up?”

Would you create a BasePage in Playwright? Why or why not?
    I would use a lightweight BasePage only for truly cross-cutting functionality such as navigation or common page-level behavior. I wouldn't use it as a dumping ground for generic Playwright operations because Playwright already provides those capabilities.

Where should locators live?
    In a POM-based Playwright framework, locators should generally live inside the Page Object or Component Object that owns them.

Where should test data live?
    For an enterprise Playwright framework, I would not put test data directly inside Page Objects.

    | Data type                | Where I'd keep it                      |
    | ------------------------ | -------------------------------------- |
    | Environment config       | `.env` / config                        |
    | Credentials/secrets      | Secret manager / environment variables |
    | Static test data         | `test-data/` JSON/TS files             |
    | Large datasets           | CSV/JSON/database                      |
    | Dynamic data             | Fixture or test-data factory           |
    | Expected business values | Test/spec or dedicated test-data file  |

How would you design a Playwright framework for 2,000 tests?
    Playwright Test
      │
      ├── Projects
      ├── Workers
      ├── Fixtures
      ├── POM
      ├── Components
      ├── API
      ├── DB
      ├── Test Data
      ├── Config
      ├── Reporting
      └── CI/CD

        Test = business scenario
        Page/Component = application interaction
        Fixture = dependency setup/lifecycle
        Utility = generic technical capability
        Test Data = input data
        Config = execution/environment configuration
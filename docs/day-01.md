Playwright Foundations + Your AI QE Workspace
=============================================
What is Playwright?
   Playwright enables reliable web automation for testing, scripting, and AI agents 

How is Playwright different from Selenium?
    The biggest difference is that Playwright was designed for modern web apps with built-in automation and waiting, while Selenium is an older, more generalized WebDriver-based approach. Selenium is WebDriver-based and has been the industry standard for a long time. Playwright provides a more integrated modern automation model, with auto-waiting, browser contexts, parallelism, network interception, and built-in debugging capabilities. The biggest practical difference I've noticed is that Playwright reduces the amount of synchronization and framework plumbing I need to write.

What is BrowserContext?
    A BrowserContext is an isolated browser session within a browser instance. It provides independent cookies, storage, and authentication state, making it useful for test isolation and testing multiple users or sessions in parallel.
    Browser = building → BrowserContext = apartment → Page = room.

    Each context has its own:

        Cookies
        Local storage
        Session storage
        Login/session state

                Browser
            ├── Context 1 → User A
            │    ├── Page
            │    └── Page
            │
            └── Context 2 → User B
                └── Page

What is auto-waiting?
    Playwright's auto-waiting automatically waits for elements to reach actionable states before performing actions, which reduces timing-related flakiness and the need for explicit waits.

Why should we avoid waitForTimeout()?
    We avoid fixed waits because they're both inefficient and unreliable. Instead, we synchronize against application state using Playwright's auto-waiting and web-first assertions.

Node.js = runtime that lets you run JavaScript/TypeScript outside the browser. Playwright runs on Node.js.
npm = Node Package Manager. Used to install Playwright and other libraries, manage dependencies, and run test scripts.
Node = engine, npm = package manager, Playwright = testing framework.

npm init playwright@latest --> install playwright
Playwright operations are asynchronous, so we normally use await to wait for the operation to complete.
npx playwright test, npx playwright test --headed, npx playwright test --ui

getByRole
    ↓
getByLabel
    ↓
getByPlaceholder
    ↓
getByText
    ↓
getByTestId
    ↓
CSS
    ↓
XPath

I rely on Playwright's auto-waiting(await) and web-first assertions (expect)rather than introducing fixed waits.

I prefer role-based(getByRole) locators because they are aligned with how users and assistive technologies perceive the UI.

I distinguish between validating navigation and validating page readiness. A URL check confirms routing, while a page-specific assertion confirms the expected UI state.

Environment-specific configuration should live outside the test so the same test artifact can run across environments.

It uses semantic role-based locators, Playwright's auto-waiting, web-first assertions, and avoids hard waits. The test is independent and expresses the user journey clearly. For a larger framework, I'd externalize environment configuration and establish conventions around test data, fixtures, and page/domain abstractions.

                    REQUIREMENT
                         ↓
                    AI / AGENT
                         ↓
                    TEST DESIGN
                         ↓
                    PLAYWRIGHT CODE
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
             UI                    API
              ↓                     ↓
              └──────────┬──────────┘
                         ↓
                        DB
                         ↓
                    TEST RESULT
                         ↓
                  AI ANALYSIS
                         ↓
                 FAILURE DIAGNOSIS
Advanced Browser Automation
===========================
A BrowserContext is an isolated browser session. A page is a tab.
    Browser
      ↓
    Context
      ↓
    Page

The context gives you isolation for:
    cookies
    local storage
    session storage
    authentication state

File upload
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByRole('button', { name: 'Upload' }).click()
    ]);

    await fileChooser.setFiles('test-data/sample.pdf');

Authentication Storage state
    await context.storageState({
        path: 'playwright/.auth/user.json'
    });

    storageState: 'playwright/.auth/user.json'


Network interception
    for mocking responses

Selenium → Playwright mapping
        | Selenium                     | Playwright                        |
        | ---------------------------- | --------------------------------- |
        | Window handles               | `Page` objects + page events      |
        | `switchTo().window()`        | Work with the returned `Page`     |
        | `switchTo().frame()`         | `frameLocator()`                  |
        | File upload via `sendKeys()` | `setInputFiles()`                 |
        | Download handling            | `download` event                  |
        | Cookies                      | `context.cookies()`               |
        | Local storage                | `page.evaluate()`                 |
        | Explicit waits               | Auto-wait + web assertions/events |
        | Intercepting traffic         | `page.route()`                    |
        | Browser profile/session      | `BrowserContext`                  |
        | Login every test             | Reusable `storageState`           |


What is a BrowserContext? Why is BrowserContext important for parallel testing?
    A BrowserContext is an isolated browser session that provides independent cookies, storage, and authentication state. It helps with test isolation and multi-user scenarios. You can test multiple users independently without their sessions interfering with each other. Each context has its own:
        Cookies
        Local/session storage
        Authentication state
        Pages/tabs

How do you handle multiple tabs in Playwright? How is that different from Selenium window handles?
    In Playwright, each tab is a Page. You don't use Selenium's switchTo().window().

    const newTabPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Open Report' }).click();
    const newTab = await newTabPromise;
    await newTab.getByRole('heading', { name: 'Report' }).toBeVisible();

    BrowserContext
        ├── Page 1 → Main tab
        ├── Page 2 → New tab
        └── Page 3 → Another tab

    In Playwright, each tab or window is represented as a Page. I listen for the new page or popup event, capture the resulting Page object, and interact with it directly instead of switching window handles like Selenium.

How do you handle iframes?
    In Playwright, I use frameLocator() to interact with elements inside an iframe. I use frameLocator() to scope locators inside an iframe. Playwright handles the frame context, so I don't need explicit frame switching like Selenium.
    Selenium:
                switchTo().frame(...)
                    ↓
                interact
                    ↓
                switchTo().defaultContent()

    Playwright:
                frameLocator(...)
                    ↓
                interact directly

How do you upload a file? How do you capture a download?
    For uploads, I use setInputFiles() directly on the file input. For downloads, I listen for the download event before triggering the action, capture the Download object, and then validate or save the file.

How would you avoid logging in before every test? What is storageState?
    I use Playwright's storageState to authenticate once, persist the required session state, and reuse it across tests. This avoids repeating the login flow and makes the test suite faster while keeping authentication setup centralized.

    Instead of:
        Test 1 → Login → Test
        Test 2 → Login → Test
        Test 3 → Login → Test

    You authenticate once:
         Login once
            ↓
            Save storageState
            ↓
            auth.json
            ↓
            Test 1 ─┐
            Test 2 ─┼─ reuse authenticated session
            Test 3 ─┘  

            await page.goto('/login');
            await loginPage.login('user', 'password');

            await page.context().storageState({
            path: 'playwright/.auth/user.json'
            });

            use: {
                storageState: 'playwright/.auth/user.json'
            }

How do you mock an API response?
    I use page.route() to intercept network requests and route.fulfill() to return a controlled response. This allows me to test UI behavior deterministically without depending on the actual backend.

    await page.route('**/api/users', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
            { id: 1, name: 'Anup' }
            ])
        });
    });

    await page.goto('/users');

When would you mock an API instead of calling the real API?
How do you wait for a specific network response?
Why should you avoid waitForTimeout()?
    I avoid waitForTimeout() because it's a fixed, arbitrary delay. I prefer Playwright's auto-waiting and web-first assertions, which synchronize with the actual application state.
How would you design authentication for 2,000 parallel tests?


                 BROWSER
                    │
             BROWSER CONTEXT
                    │
          ┌─────────┴─────────┐
          │                   │
        PAGE 1              PAGE 2
          │                   │
     ┌────┴────┐         ┌────┴────┐
     │         │         │         │
   UI        Network    UI       Network
     │         │
     ▼         ▼
  Locators   API/mock

                      TEST
                      │
                  FIXTURE
                      │
             ┌────────┴────────┐
             │                 │
          PAGE OBJ          API CLIENT
             │                 │
        COMPONENTS            API
             │
        PLAYWRIGHT PAGE
             │
        BROWSER CONTEXT
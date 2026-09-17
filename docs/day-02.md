                DOM
                 ↓
What does the user/business identify this element as?
                 ↓
        Choose stable locator
                 ↓
            Perform action
                 ↓
        Assert meaningful result

page.getByRole(...)
    <button>Login</button>
    await page.getByRole('button', {name: 'Login'}).click();

    Find a BUTTON, whose accessible name is LOGIN.

    button
    link
    heading
    textbox
    checkbox
    radio
    combobox
    list
    listitem
    dialog
    tab
    menuitem

page.getByLabel(...)
    <label for="username">Username</label>
    <input id="username">

    await page.getByLabel('Username').fill('username_value')

getByPlaceholder()
    <input placeholder="Enter username">
    await page.getByPlaceholder('Enter username').fill('anup');

getByText()
    Payment successful

    await expect(
        page.getByText('Payment successful')
    ).toBeVisible();

getByTestId()
    <button data-testid="submit-payment">
        Submit
    </button>

    page.getByTestId('submit-payment')


    Development team
            +
        QE team
            ↓
Agreed testability strategy
            ↓
    Stable test IDs

Locator chaining (relative locator from Selenium)
    Payment
        Submit (and multiple submit buttons on the page)

    const paymentSection = page.getByRole('region', {
        name: 'Payment'
    });

    await paymentSection
        .getByRole('button', { name: 'Submit' })
    .click();

filter()
    Apple
    Samsung
    Google

    page.getByRole('listitem').filter({hasText: 'Apple'});

    const samsung = page
        .getByRole('listitem')
        .filter({ hasText: 'Samsung' });

    await samsung.getByRole('button', { name: 'Buy' }).click();

Strictness — VERY important
    await page.getByRole('button', { name: 'Submit' }).nth(1).click();

Dynamic elements
    Don't do:page.locator('#button_928374')
    Maybe:page.getByRole('button', { name: 'Submit' })
    or a meaningful CSS attribute.

Frames- application has an iframe:
    const frame = page.frameLocator('#payment-frame');
    await frame.getByLabel('Card Number').fill('4111111111111111');

Tables
    Transaction ID | Status
    -------------------------
    12345          | Success
    12346          | Failed
    12347          | Pending

    const row = page
        .getByRole('row')
        .filter({ hasText: '12346' });

    await expect(row).toContainText('Failed');

    page.getByRole('columnheader', { name: 'Name' })


You're a Selenium expert. Why wouldn't you just use CSS/XPath in Playwright?
    CSS/XPath are tied to page structure, while Playwright’s locators are often tied to user-visible semantics. I still use CSS or XPath when necessary, but in Playwright I prefer semantic locators like getByRole, getByLabel, and getByTestId because they’re generally more maintainable and less coupled to DOM implementation details.

Explain getByRole()
    Find the element whose role is button and whose accessible name is Login instead of HTML structure. getByRole() locates elements using their accessibility role and optionally their accessible name, making locators more semantic and generally more maintainable.

What's the difference between locator() and getByRole()?
    locator() Identifies an element using a CSS selector, XPath, or other selector. “I prefer getByRole() when the element has a meaningful accessible role because it makes the test reflect user behavior. I use locator() when I need more precise DOM-based selection or when role-based locators aren't appropriate.

What happens if a Playwright locator matches multiple elements?
    Playwright uses strict mode for actions and single-element assertions. If a locator resolves to multiple elements, it throws an error rather than guessing which element I intended.

How would you automate a dynamic table?
    const row = page.getByRole('row').filter({ hasText: 'Anup' });

    await expect(row).toContainText('Active');

    const row = page.getByRole('row').filter({ hasText: 'Anup' });

    await expect(
        row.getByRole('cell').nth(1)
    ).toHaveText('Active');

    Find the row using unique business data → scope the locator to that row → perform the action/assertion within the row.

What would you do if developers constantly change element IDs?
    If an element doesn't have a reliable user-facing identifier, give it a stable data-testid. I avoid coupling automation to implementation-specific IDs. I prioritize semantic locators such as roles and labels, and where those aren't reliable, I work with developers to establish stable test IDs as part of the application's automation contract.

When would you use getByTestId()?
    I’d use getByTestId() when there isn't a reliable user-facing locator like a role, label, or accessible name.

    Role → Label → Text/Placeholder → TestId → CSS/XPath

    I use getByTestId() when the element doesn't have a reliable user-facing attribute to locate it. It gives us a stable automation contract with developers without coupling the test to CSS classes or generated IDs.

How do you handle an iframe in Playwright?
    const frame = page.frameLocator('#payment-frame');

    await frame.getByLabel('Card number').fill('4111111111111111');
    await frame.getByRole('button', { name: 'Pay' }).click();

    const frame = page.frameLocator('iframe[title="Payment"]');
    await frame.getByLabel('Card number').fill('4111...');

    For iframe automation, I use Playwright's frameLocator() to scope locators inside the iframe. Unlike Selenium, I don't need to explicitly switch into and out of the frame.

How do you make locators maintainable in an enterprise framework?
    I keep locators semantic and resilient, avoid DOM-structure-dependent selectors, use stable test IDs where necessary, and centralize locator definitions so UI changes can be handled in one place rather than across hundreds of tests.
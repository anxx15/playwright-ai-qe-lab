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
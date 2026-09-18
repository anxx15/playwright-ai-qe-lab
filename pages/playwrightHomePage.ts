import { Page, Locator } from '@playwright/test';

export class PlaywrightHomePage {

    readonly page: Page;
    readonly getStartedButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.getStartedButton =
            page.getByRole('link', { name: 'Get started' });
    }

    async open() {

        await this.page.goto('/');
    }

    async clickGetStarted() {

        await this.getStartedButton.click();
    }
}
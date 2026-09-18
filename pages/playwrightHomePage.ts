import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly getStartedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
  }

  async open() {
    await this.page.goto('/');
  }

  async expectHomePageLoaded() {
    await expect(this.page).toHaveTitle(/Playwright/);
    await expect(this.getStartedButton).toBeVisible();
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  async expectDocsPageLoaded() {
    await expect(this.page).toHaveURL(/docs/);
  }
}
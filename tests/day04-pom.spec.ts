import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/playwrightHomePage';

test('open Playwright getting started page', async ({ page }) => {

    const homePage = new PlaywrightHomePage(page);

    await homePage.open();
    await expect(page).toHaveTitle(/Playwright/);
    await homePage.clickGetStarted();
    await expect(page).toHaveURL(/docs/);
});
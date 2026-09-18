import { test as base, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/playwrightHomePage';

type TestFixtures = {
  homePage: PlaywrightHomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new PlaywrightHomePage(page));
  },
});

export { expect };
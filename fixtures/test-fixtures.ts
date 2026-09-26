import { test as base, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/playwrightHomePage';
import { Client } from 'pg';

type TestFixtures = {
  homePage: PlaywrightHomePage;
  dbClient: Client;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new PlaywrightHomePage(page));
  },
});

export { expect };
import { test as base } from '@playwright/test';

type TestFixtures = {
  appName: string;
};

export const test = base.extend<TestFixtures>({
  appName: async ({}, use) => {
    await use('Playwright AI QE Lab');
  },
});

export { expect } from '@playwright/test';
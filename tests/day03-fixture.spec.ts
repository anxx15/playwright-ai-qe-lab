import { test, expect } from '../fixtures/test-fixtures';

test('use custom fixture', async ({ page, appName }) => {
  console.log(appName);

  await page.goto('/');

  await expect(page).toHaveTitle(/Playwright/);
});
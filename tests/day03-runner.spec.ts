import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify homepage title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('verify Get started link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Get started' })
    ).toBeVisible();
  });

});
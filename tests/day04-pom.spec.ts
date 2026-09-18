import { test, expect } from '../fixtures/test-fixtures';

test('open Playwright getting started page', async ({ homePage }) => {
  await homePage.open();
  await homePage.expectHomePageLoaded();
  await homePage.clickGetStarted();
  await homePage.expectDocsPageLoaded();
});
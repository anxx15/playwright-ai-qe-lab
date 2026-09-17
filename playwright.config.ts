import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// const envUrls = {
//   DEV: process.env.DEV_URL || 'https://dev.example.com',
//   QA: process.env.QA_URL || 'https://qa.example.com',
//   UAT: process.env.UAT_URL || 'https://uat.example.com',
//   PROD: process.env.PROD_URL || 'https://prod.example.com',
// };

// const targetEnvironment = (process.env.ENVIRONMENT || 'QA').toUpperCase();
// const baseURL = envUrls[targetEnvironment as keyof typeof envUrls] || envUrls.QA;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://playwright.dev/',
    headless: false,
    // viewport: { width: 1280, height: 720 },
    // ignoreHTTPSErrors: true,
    // video: 'retain-on-failure',
    // screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

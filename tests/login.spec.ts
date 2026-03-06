import { test, expect } from '@playwright/test';

test('Verify user can login to OrangeHRM system', async ({ page }) => {

// Step 1: Navigate to OrangeHRM login page
await page.goto('https://opensource-demo.orangehrmlive.com/');

// Step 2: Check page title
await expect(page).toHaveTitle(/OrangeHRM/);

// Step 3: Input login credentials
await page.fill('input[name="username"]', 'Admin');
await page.fill('input[name="password"]', 'admin123');

// Step 4: Click Login button
await page.click('button[type="submit"]');

// Step 5: Verify successful login
await expect(page).toHaveURL(/dashboard/);

});

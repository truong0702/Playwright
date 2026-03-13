import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, '../data/testData.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

for (const data of testData) {
  test(`Test Case: Login - Search - Add Product [${data.keyword}]`, async ({ page }) => {
    // 1. Đi tới trang chủ
    await page.goto('https://demo.nopcommerce.com/');

    // 2. Login
    await page.click('.ico-login');
    await page.fill('#Email', data.email);
    await page.fill('#Password', data.password);
    await page.click('button:has-text("Log in")');

    // 3. Search sản phẩm
    await page.fill('#small-searchterms', data.keyword);
    await page.press('#small-searchterms', 'Enter');

    // 4. Click vào sản phẩm đầu tiên và Add to cart
    await page.click('.product-item h2 a'); 
    await page.click('[id^="add-to-cart-button"]');

    // 5. Kiểm tra thông báo thành công (Assertion)
    const successBar = page.locator('.bar-notification.success');
    await expect(successBar).toBeVisible();
    await expect(successBar).toContainText('The product has been added to your shopping cart');
  });
}
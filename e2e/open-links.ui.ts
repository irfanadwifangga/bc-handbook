import { test, expect } from '@playwright/test';

test('tautan eksternal membuka tab baru dengan noopener', async ({ page, context }) => {
  await context.route('https://learn.microsoft.com/**', route => route.fulfill({ body: 'Microsoft Learn' }));
  await page.goto('/');
  const link = page.locator('.bc-footer-note').getByRole('link', { name: 'Microsoft Learn' });
  const [newTab] = await Promise.all([page.waitForEvent('popup'), link.click()]);
  await expect(newTab).toHaveURL('https://learn.microsoft.com/en-us/dynamics365/business-central/');
  expect(await newTab.evaluate(() => window.opener)).toBeNull();
  await expect(page).toHaveURL('/');
});

test('tautan bagian halaman berpindah di tab aktif', async ({ page, context }) => {
  await page.goto('/01-basic/01-navigasi/');
  const link = page.locator('main .sl-anchor-link[href="#contoh-praktik"]');
  await link.focus();
  await link.press('Enter');
  await expect(page).toHaveURL(/\/01-basic\/01-navigasi\/#contoh-praktik$/);
  expect(context.pages()).toHaveLength(1);
});

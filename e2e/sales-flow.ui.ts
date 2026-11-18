import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = '/01-basic/alur-sales/';

test('tahap manual, keyboard, reset dan aksesibilitas', async ({ page }, testInfo) => {
  await page.goto(route);
  const flow = page.locator('bc-flow');
  const current = flow.locator('[aria-current="step"]');
  const status = flow.getByRole('status');
  await expect(status).toContainText('Tahap 1 dari 6');
  await expect(flow.getByRole('button', { name: 'Sebelumnya', exact: true })).toBeDisabled();
  await flow.getByRole('button', { name: 'Berikutnya', exact: true }).click();
  await expect(current).toContainText('Order');
  await flow.locator('[data-stage="3"]').focus();
  await page.keyboard.press('Enter');
  await expect(current).toContainText('Invoice');
  await expect(status).toContainText('Dijeda');
  await expect(flow.locator('[data-panel]:visible')).toHaveCount(1);
  await flow.getByRole('button', { name: 'Ulangi', exact: true }).click();
  await expect(current).toContainText('Quote');
  await expect(status).toContainText('Dijeda');
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
  expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `.codex-tmp/sales-flow-${testInfo.project.name}.png`, fullPage: true });
});

test('putar, jeda mempertahankan waktu, akhir dan ulangi', async ({ page }) => {
  await page.clock.install();
  await page.goto(route);
  const flow = page.locator('bc-flow');
  const status = flow.getByRole('status');
  await flow.getByRole('button', { name: 'Putar', exact: true }).click();
  await page.clock.runFor(4000);
  await flow.getByRole('button', { name: 'Jeda', exact: true }).click();
  await page.clock.runFor(12000);
  await expect(status).toContainText('Tahap 1 dari 6');
  await flow.getByRole('button', { name: 'Putar', exact: true }).click();
  await page.clock.runFor(4100);
  await expect(status).toContainText('Tahap 2 dari 6');
  await flow.locator('[data-stage="5"]').click();
  await expect(status).toContainText('Dijeda');
  await expect(flow.getByRole('button', { name: 'Berikutnya', exact: true })).toBeDisabled();
  await flow.getByRole('button', { name: 'Putar', exact: true }).click();
  await page.clock.runFor(8100);
  await expect(status).toContainText('Dijeda');
  await expect(flow.getByRole('button', { name: 'Putar', exact: true })).toBeDisabled();
  await flow.getByRole('button', { name: 'Ulangi', exact: true }).click();
  await expect(status).toContainText('Tahap 1 dari 6');
  await expect(flow.getByRole('button', { name: 'Putar', exact: true })).toBeEnabled();
});

test('reduced motion dan tab tersembunyi', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  await expect(page.locator('.bc-flow-time')).toHaveCSS('visibility', 'hidden');
  await page.getByRole('button', { name: 'Putar', exact: true }).click();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('bc-flow').getByRole('status')).toContainText('Dijeda');
});

test('video dimuat setelah klik tanpa autoplay dan sumber tetap ada', async ({ page }) => {
  // Isolasi wrapper lokal; ini bukan bukti playback layanan video eksternal.
  await page.route('https://learn-video.azurefd.net/**', route => route.fulfill({ contentType: 'text/html', body: '<p>Player uji</p>' }));
  await page.goto(route);
  const video = page.locator('bc-reference-video');
  await expect(video.locator('iframe')).toHaveCount(0);
  await video.getByRole('button', { name: 'Muat video Microsoft Learn' }).click();
  await expect(video.locator('iframe')).toHaveAttribute('src', 'https://learn-video.azurefd.net/vod/player?id=37d3ec2a-71c2-4f0d-9a94-62c83805fbfa');
  await expect(video.locator('iframe')).toHaveAttribute('title', /Microsoft Learn/);
  await expect(video.getByRole('link', { name: 'buka sumber Microsoft Learn' })).toBeVisible();
  await expect(video.getByRole('button')).toBeHidden();
});

test('tanpa JavaScript semua tahap dan sumber tetap terbaca', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport, colorScheme: testInfo.project.use.colorScheme });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4323' + route);
    await expect(page.locator('bc-flow [data-panel]:visible')).toHaveCount(6);
    await expect(page.locator('.bc-flow-controls')).toBeHidden();
    await expect(page.getByRole('link', { name: 'buka sumber Microsoft Learn' })).toBeVisible();
  } finally { await context.close(); }
});

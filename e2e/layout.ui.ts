import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Build terlebih dahulu agar inventaris route mengikuti hasil situs yang sebenarnya.
const routes = readdirSync(resolve('dist'), { recursive: true })
  .filter(path => path.endsWith('.html'))
  .map(path => '/' + path.replaceAll('\\', '/').replace(/index\.html$/, ''));

for (const route of routes) {
  test(`layout ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const fits = await page.evaluate(() => document.body.scrollWidth <= innerWidth);
    expect(fits, 'Body harus muat tanpa scroll horizontal').toBe(true);
  });
}

for (const route of ['/03-expert/developer-al/', '/03-expert/admin-devops/', '/halaman-tidak-ada/', '/cheatsheets/tidak-ada/']) {
  test(`404 ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('404');
    expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('navigasi memakai border dan fokus tanpa bayangan', async ({ page }) => {
  await page.goto('/');
  for (const link of await page.locator('.pagination-links a').all()) {
    await expect(link).toHaveCSS('box-shadow', 'none');
  }
  await page.keyboard.press('Tab');
  await expect(page.locator('.sl-skip-link')).toBeFocused();
  await expect(page.locator('.sl-skip-link')).toHaveCSS('outline-style', 'solid');
  await expect(page.locator('.sl-skip-link')).toHaveCSS('box-shadow', 'none');
  await expect(page.locator('.sl-menu-button')).toHaveCSS('box-shadow', 'none');
});

test('istilah pada kolom pertama tidak terbelah di tengah kata', async ({ page }) => {
  await page.goto('/00-orientasi/');
  const cell = page.getByRole('cell', { name: 'Inventory', exact: true }).first();
  const lines = await cell.evaluate(element => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  });
  expect(lines).toBe(1);
});

test('aside memakai palet desain dan konten lolos axe', async ({ page }, testInfo) => {
  await page.goto('/00-orientasi/');
  const dark = testInfo.project.use.colorScheme === 'dark';
  const surface = dark ? 'rgb(17, 17, 17)' : 'rgb(250, 250, 250)';
  const info = dark ? 'rgb(96, 165, 250)' : 'rgb(29, 78, 216)';
  const warning = dark ? 'rgb(251, 191, 36)' : 'rgb(180, 83, 9)';
  await expect(page.locator('.starlight-aside--note')).toHaveCSS('background-color', surface);
  await expect(page.locator('.starlight-aside--note')).toHaveCSS('border-left-color', info);
  await expect(page.locator('.starlight-aside--caution')).toHaveCSS('background-color', surface);
  await expect(page.locator('.starlight-aside--caution')).toHaveCSS('border-left-color', warning);
  const scan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
});


test('label tema utuh dan footer mempunyai pemisah kata', async ({ page }) => {
  await page.goto('/');
  if ((page.viewportSize()?.width ?? 1280) < 800) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
  }
  const select = page.getByRole('combobox', { name: 'Pilih tema' }).filter({ visible: true });
  const fits = await select.evaluate(element => {
    const el = element as HTMLSelectElement;
    const style = getComputedStyle(el);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = style.fontSize + ' ' + style.fontFamily;
    const available = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    return context.measureText(el.selectedOptions[0].text).width <= available;
  });
  expect(fits, 'Label tema harus muat di area teks kontrol').toBe(true);
  await expect(page.locator('.bc-footer-note')).toContainText('cek Microsoft Learn');
});

test('shortcut dan dialog search tetap berfungsi', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Pencarian', exact: true });
  await expect(dialog).toBeVisible();
  const shortcuts = dialog.getByRole('navigation', { name: 'Tautan cepat' });
  await expect(shortcuts.getByRole('link')).toHaveCount(3);
  await expect(shortcuts).toBeVisible();
  await dialog.getByRole('textbox').fill('sandbox');
  await expect(shortcuts).toBeHidden();
  await expect(dialog.getByRole('link').first()).toBeVisible();
  await dialog.getByRole('textbox').fill('');
  await expect(shortcuts).toBeVisible();
  await dialog.getByRole('button', { name: 'Tutup', exact: true }).click();
  await expect(dialog).toBeHidden();
  await page.keyboard.press('Control+k');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  await page.keyboard.press('Control+k');
  await dialog.getByRole('textbox').fill('sandbox');
  const result = dialog.getByRole('link').first();
  await expect(result).toBeVisible();
  const resultUrl = new URL((await result.getAttribute('href'))!, page.url());
  const [newTab] = await Promise.all([page.waitForEvent('popup'), result.click()]);
  await expect(newTab).toHaveURL(resultUrl.href);
  await expect(page).toHaveURL('/');
});

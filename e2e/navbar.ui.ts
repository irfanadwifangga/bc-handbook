import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('navbar muat dan kontrol mudah diakses', async ({ page }, testInfo) => {
  await page.goto('/cheatsheets/');
  const header = page.getByRole('banner');
  const search = header.getByRole('button', { name: /^Pencarian/ });
  const cheatsheets = header.getByRole('link', { name: 'Cheatsheets', exact: true });
  const github = header.getByRole('link', { name: 'Profil GitHub' });
  await expect(cheatsheets).toHaveAttribute('aria-current', 'page');
  const desktop = testInfo.project.name.startsWith('desktop');
  const widths = desktop ? [1280, 1024, 800] : [360, 320];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 850 });
    let right = 0;
    for (const control of [header.getByRole('link', { name: 'BC Handbook' }), search, cheatsheets, github]) {
      await expect(control).toBeVisible();
      const bounds = (await control.boundingBox())!;
      expect(bounds.x + 1).toBeGreaterThanOrEqual(right);
      right = bounds.x + bounds.width;
      expect(right).toBeLessThanOrEqual(width);
      if (await control.getAttribute('aria-label')) {
        expect(bounds.height).toBeGreaterThanOrEqual(44);
        expect(bounds.width).toBeGreaterThanOrEqual(44);
      }
    }
  }
  await page.setViewportSize({ width: widths[0], height: 850 });

  await search.focus();
  await page.keyboard.press('Tab');
  await expect(cheatsheets).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(github).toBeFocused();
  if (!desktop) await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Pilih tema' })).toBeVisible();
  if (!desktop) await page.getByRole('button', { name: 'Menu', exact: true }).click();

  const axe = await new AxeBuilder({ page }).include('header.header').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(axe.violations).toEqual([]);
  await header.screenshot({ path: '.codex-tmp/navbar-' + testInfo.project.name + '.png' });
});

test('ikon GitHub membuka profil Irfan di tab baru', async ({ page, context }) => {
  const profile = 'https://github.com/irfanadwifangga';
  await context.route(profile, route => route.fulfill({ body: 'Profil GitHub' }));
  await page.goto('/');
  const github = page.getByRole('banner').getByRole('link', { name: 'Profil GitHub' });
  await expect(github).toHaveAttribute('href', profile);
  const [tab] = await Promise.all([page.waitForEvent('popup'), github.click()]);
  await expect(tab).toHaveURL(profile);
  await expect(page).toHaveURL('/');
});

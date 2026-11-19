import { test, expect } from '@playwright/test';

test('sidebar latihan mengikuti urutan tingkat dan nomor', async ({ page }) => {
  await page.goto('/latihan/basic/b8-laporan/');
  const links = await page.locator('.sidebar-content a').evaluateAll(anchors =>
    anchors.map(anchor => new URL((anchor as HTMLAnchorElement).href).pathname)
      .filter(path => path.startsWith('/latihan/'))
  );
  const levels = ['/latihan/basic/', '/latihan/intermediate/', '/latihan/expert/'];
  expect(links.filter(path => levels.includes(path))).toEqual(levels);
  expect(links.filter(path => /^\/latihan\/intermediate\/m\d+-/.test(path)).map(path =>
    Number(path.match(/\/m(\d+)-/)![1])
  )).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(links.indexOf('/latihan/intermediate/')).toBe(links.indexOf('/latihan/basic/b8-laporan/') + 1);
  expect(links.indexOf('/latihan/expert/')).toBe(links.indexOf('/latihan/intermediate/m10-job-queue/') + 1);
});

test('B8 menuju Intermediate dan dapat kembali', async ({ page }) => {
  await page.goto('/latihan/basic/b8-laporan/');
  const next = page.locator('.pagination-links a[rel~="next"]');
  await expect(next).toHaveAttribute('href', '/latihan/intermediate/');
  await next.click();
  await expect(page).toHaveURL(/\/latihan\/intermediate\/$/);
  await expect(page.locator('.pagination-links a[rel~="next"]')).toHaveAttribute('href', '/latihan/intermediate/m1-posting-groups/');
  await page.locator('.pagination-links a[rel~="prev"]').click();
  await expect(page).toHaveURL(/\/latihan\/basic\/b8-laporan\/$/);
});

test('M10 menuju Expert dan dapat kembali', async ({ page }) => {
  await page.goto('/latihan/intermediate/m10-job-queue/');
  const next = page.locator('.pagination-links a[rel~="next"]');
  await expect(next).toHaveAttribute('href', '/latihan/expert/');
  await next.click();
  await expect(page).toHaveURL(/\/latihan\/expert\/$/);
  await page.locator('.pagination-links a[rel~="prev"]').click();
  await expect(page).toHaveURL(/\/latihan\/intermediate\/m10-job-queue\/$/);
});

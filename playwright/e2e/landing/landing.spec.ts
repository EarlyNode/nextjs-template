import { expect, test } from '@playwright/test';

test.describe('Landing', () => {
  test('displays a landing page', async ({ page }) => {
    const url = `/`;
    await page.goto(url);

    expect(page.url()).toEqual('http://localhost:3000/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /this is a starter template/i,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: /earlynode/i }),
    ).toHaveAttribute('href', 'https://earlynode.com');

    await expect(page.getByRole('img')).toBeVisible();

    await page.close();
  });
});

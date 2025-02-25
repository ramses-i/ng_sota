import {expect, test} from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/auth');
    await page.getByRole('textbox', { name: 'name@company.com' }).click();
    await page
      .getByRole('textbox', { name: 'name@company.com' })
      .fill('user@mail.com');
    await page.getByRole('textbox', { name: '••••••••' }).click();
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
  });

  test('Debe crear publicacion', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Write a post...' }).click();
    await page.getByRole('textbox', { name: 'Write a post...' }).fill('post de prueba!');
    await page.getByRole('button', { name: 'Publish post' }).click();

    const postLocator = page.locator('text=post de prueba!').last();
    await expect(postLocator).toBeVisible({ timeout: 10000 });
  });
});

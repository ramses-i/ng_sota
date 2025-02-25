import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de autenticación
    await page.goto('http://localhost:4200/auth');
  });

  test('Debe iniciar sesión con credenciales válidas', async ({ page }) => {
    await page.getByRole('textbox', { name: 'name@company.com' }).click();
    await page
      .getByRole('textbox', { name: 'name@company.com' })
      .fill('user@mail.com');
    await page.getByRole('textbox', { name: '••••••••' }).click();
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('#errorForm')).toBeHidden()
    await expect(page).toHaveURL(/.*feed/);
  });

  test('Debe iniciar sesión con credenciales inválidas', async ({ page }) => {
    await page.getByRole('textbox', { name: 'name@company.com' }).click();
    await page
      .getByRole('textbox', { name: 'name@company.com' })
      .fill('user@mail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('admin');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('#errorForm')).toBeVisible();
  });

  test('Los campos son requeridos', async ({ page }) => {
    await page.getByRole('textbox', { name: 'name@company.com' }).click();
    await page.getByRole('textbox', { name: '••••••••' }).click();
    await page.getByRole('textbox', { name: 'name@company.com' }).click();
    await expect(page.getByText('Invalid email')).toBeVisible();
    await expect(page.getByText('Password required')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('super@canimmunize.ca', 'Console123!');
});

test('Cancel button should not save patient information.', async ({ page }) => {


});

test('Should not enable Save button without filling required fields', async ({ page }) => {

    //Create a parameter that can pass required fields value so that it could check in loop
      await page.getByRole('link', { name: 'Repository' }).click();
      
      await expect(page.getByRole('button', { name: 'plus New Patient' })).toBeEnabled();
      await page.getByRole('button', { name: 'plus New Patient' }).click();
      await page.getByLabel('First Name *').click();
      await page.getByLabel('First Name *').fill('test');
    
      await page.getByLabel('Last Name *').fill('test Abhash');
      await page.getByPlaceholder('YYYY-MM-DD').click();
      await page.getByPlaceholder('YYYY-MM-DD').fill('1994-01-05');
      await page.getByPlaceholder('YYYY-MM-DD').press('Enter');
      
      await page.getByLabel('Gender *').click();
      await page.getByLabel('New Patient').getByText('Male', { exact: true }).click();
     
      await page.getByLabel('Health Card Type*').click();
      await page.getByText('Manitoba').click();
      await page.getByLabel('Health Card Number *').click();
      await page.getByLabel('Health Card Number *').fill('564265193');
      
      // await page.getByLabel('Managing Organization*').click();
      // await page.getByText('Walmart_Pharmacy - Walmart').click();
      let numberOfSaveButtons = await page.locator('span').filter({ hasText: 'Save' }).count();
      await expect(page.locator('span').filter({ hasText: 'Save' }).last().isDisabled()).toBeTruthy();
     
    
      // await page.locator('span').filter({ hasText: 'Save' }).first().click();
    
    });
    
    test('Should enable Save button if all required fields are filled', async ({ page }) => {
    
      //Create a parameter that can pass required fields value so that it could check in loop
        await page.getByRole('link', { name: 'Repository' }).click();
          
        await page.getByRole('button', { name: 'plus New Patient' }).click();
        await page.getByLabel('First Name *').click();
        await page.getByLabel('First Name *').fill('test');
      
        await page.getByLabel('Last Name *').fill('test Abhash');
        await page.getByPlaceholder('YYYY-MM-DD').click();
        await page.getByPlaceholder('YYYY-MM-DD').fill('1994-01-05');
        await page.getByPlaceholder('YYYY-MM-DD').press('Enter');
        
        await page.getByLabel('Gender *').click();
        await page.getByLabel('New Patient').getByText('Male', { exact: true }).click();
       
        await page.getByLabel('Health Card Type*').click();
        await page.getByText('Manitoba').click();
        await page.getByLabel('Health Card Number *').click();
        await page.getByLabel('Health Card Number *').fill('564265193');
        
        await page.getByLabel('Managing Organization*').click();
        await page.getByText('Walmart_Pharmacy - Walmart').click();
    
        await expect(page.locator('span').filter({ hasText: 'Save' }).last()).toBeEnabled();
          
      });
    
      test('Should be able to delete patient from patient info page', async ({ page }) => {
    
      });
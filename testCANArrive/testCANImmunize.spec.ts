import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('super@canimmunize.ca');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Console123!');
  await page.getByRole('button', { name: 'Continue' }).click();
});

test('Should delete Patient record by Health card number', async ({ page }) => {
  await page.getByRole('link', { name: 'Appointments' }).click();
  await page.getByRole('cell', { name: 'Rajbhandari, Abhash' }).click();
  await page.getByRole('button', { name: 'delete Delete' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('#deleteReason').click();
  await page.locator('#deleteReason').fill('Testing purpose');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'plus New Patient' }).click();
  await page.getByLabel('First Name *').click();
  await page.getByLabel('First Name *').fill('test');
  await page.getByLabel('First Name *').press('Tab');
  await page.getByLabel('Last Name *').fill('test Abhash');
  await page.getByLabel('Last Name *').press('Tab');
  await page.getByLabel('Preferred Name').press('Tab');
  await page.locator('.ant-picker').click();
  await page.getByPlaceholder('YYYY-MM-DD').fill('1994-01-05');
  await page.getByPlaceholder('YYYY-MM-DD').press('Enter');
  await page.getByLabel('Gender *').click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByLabel('Health Card Type*').click();
  await page.getByLabel('Health Card Type*').fill('nova');
  await page.getByText('Nova Scotia').click();
  await page.getByLabel('Gender *').press('Escape');
  await page.getByLabel('Health Card Number *').click();
  await page.getByLabel('Health Card Number *').fill('564265193');
  await page.getByLabel('Managing Organization*').click();
  await page.getByText('Walmart_Pharmacy - Walmart').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Override' }).click();
  await page.getByLabel('Override Reason').click();
  await page.getByLabel('Override Reason').fill('testing');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('cell', { name: '(NS)' }).click();
  await page.getByRole('cell', { name: 'test', exact: true }).click();
  await page.getByRole('cell', { name: 'test Abhash' }).click();
  await page.getByText('test Abhash, test Edit DeleteCopy ID').click();
  await page.getByRole('button', { name: 'Proof of Vaccination' }).click();
  await page.getByRole('button', { name: 'Add Vaccination' }).click();
  
});


test('Should not enable Save button without filling required fields', async ({ page }) => {

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

test('Should show warning for existing patient while adding', async ({ page }) => {

  //Should be checking for duplicate health card number exists. If doesn't exists then create one.
  //Parameterize expected message if duplicate.

  //Create a parameter that can pass required fields value so that it could check in loop
    await page.getByRole('link', { name: 'Repository' }).click();
      
    await deletePatientFromRepository('564265193', page);

    await page.getByRole('button', { name: 'plus New Patient' }).click();
    await page.getByLabel('First Name *').click();
    await page.getByLabel('First Name *').fill('testing');
  
    await page.getByLabel('Last Name *').fill('test test');
    await page.getByPlaceholder('YYYY-MM-DD').click();
    await page.getByPlaceholder('YYYY-MM-DD').fill('1994-01-09');
    await page.getByPlaceholder('YYYY-MM-DD').press('Enter');
    
    await page.getByLabel('Gender *').click();
    await page.getByLabel('New Patient').getByText('Male', { exact: true }).click();
   
    await page.getByLabel('Health Card Type*').click();
    await page.getByText('Manitoba').click();
    await page.getByLabel('Health Card Number *').click();
    await page.getByLabel('Health Card Number *').fill('564265193');
    
    await page.getByLabel('Managing Organization*').click();
    await page.getByText('Walmart_Pharmacy - Walmart').click();
    let numberOfSaveButtons = await page.locator('span').filter({ hasText: 'Save' }).count();
    await expect(page.locator('span').filter({ hasText: 'Save' }).last()).toBeEnabled();
      
  
    await page.locator('span').filter({ hasText: 'Save' }).first().click();

    await expect(page.getByLabel('New Patient')).toContainText('This health card number already exists for another patient. Please confirm the information entered or call the clinic for help.');

  });

  test('Should display added patient in search result', async ({ page }) => {
    //delete all the patients with health card number 564265193

    //Add a new patient

    //Verify if the added patient is displayed in the search result
    await page.getByPlaceholder('Patient Search').click();
    await page.getByPlaceholder('Patient Search').fill('564265193');
    await page.getByRole('button', { name: 'search' }).click();

    
    //Verify Name, Email, DOB, Gender information is displayed correctly
    
    await expect(page.locator('tbody')).toContainText('test test, testing');
    
    await expect(page.locator('tbody')).toContainText('1994-01-09');
    await expect(page.locator('tbody')).toContainText('Male');
    await expect(page.locator('tbody')).toContainText('564265193');
    
  });



  async function deletePatientFromRepository(healthCardNumber, page) {
    await page.getByPlaceholder('Patient Search').click();
    await page.getByPlaceholder('Patient Search').fill(healthCardNumber);
    await page.getByRole('button', { name: 'search' }).click();
    let noOfMatches =  await page.getByRole('cell', { name: healthCardNumber }).count();
    for(let i=1;i<=noOfMatches; i++){
      await page.getByRole('cell', { name: healthCardNumber }).first().click();
      await page.getByRole('button', { name: 'delete Delete' }).click();
      await page.getByRole('button', { name: 'Yes' }).click();
      await page.locator('#deleteReason').click();
      await page.locator('#deleteReason').fill('Testing purpose');
      await page.getByRole('button', { name: 'OK' }).click();
      await page.getByLabel('Back').click();

      //Assert for the patient to be deleted successfully

    }
    
  }
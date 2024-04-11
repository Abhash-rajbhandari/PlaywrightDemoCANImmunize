import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('super@canimmunize.ca');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Console123!');
  await page.getByRole('button', { name: 'Continue' }).click();
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

test('Should show warning for existing patient while adding patient with same Health Card', async ({ page }) => {

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
    
    let resultcolumns = await page.getByRole('table').locator('tr');
    //.filter({has: page.getByRole('table', {includeHidden: false})});

    //Skipping the first row as it is doesn't hold any values.
    await expect(resultcolumns.nth(2)).toContainText('test test, testing');
    
    //add Email value too here.

    await expect(resultcolumns.nth(2)).toContainText('1994-01-09');
    await expect(resultcolumns.nth(2)).toContainText('Male');
    await expect(resultcolumns.nth(2)).toContainText('564265193');
    


  });

  test('Should match all information of patient after creating and searching a new patient', async({page})=>{

    await page.getByRole('link', { name: 'Repository' }).click();

    await page.getByPlaceholder('Patient Search').click();
    await page.getByPlaceholder('Patient Search').fill('564265193');

    let resultcolumns = await page.getByRole('table').locator('tr');
    //.filter({has: page.getByRole('table', {includeHidden: false})});

    //Skipping the first row as it is doesn't hold any values.
    await resultcolumns.nth(2).click();

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).locator('td').nth(0).textContent()
    ).toEqual('');
    
    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Last Name', {exact: true})}).locator('td').nth(1).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Preferred Name', {exact: true})}).locator('td').nth(2).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Date of Birth', {exact: true})}).locator('td').nth(0).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Gender', {exact: true})}).locator('td').nth(1).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Pronoun', {exact: true})}).locator('td').nth(2).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Health Card Number', {exact: true})}).locator('td').nth(0).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Email', {exact: true})}).locator('td').nth(1).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Phone', {exact: true})}).locator('td').nth(2).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Address', {exact: true})}).locator('td').nth(0).textContent()
    ).toEqual('');

    await expect(
      page.getByRole('row').filter({has: page.locator('th').getByText('Managing Organization', {exact: true})}).locator('td').nth(1).textContent()
    ).toEqual('');


    let managingOrganization = await page.getByRole('row').filter({has: page.locator('th').getByText('Managing Organization', {exact: true})}).locator('td').nth(1).textContent()
   

    //By using Class Name
    // let fromClasName = await page.locator(`//*[@class='ant-descriptions-item-content cy-patientManagingOrg']`).textContent();

    //Merging ClassName with Row number
    //let FirstnameByMerging = await page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).locator(`//*[@class='ant-descriptions-item-content cy-patientManagingOrg']`).textContent();

    //Grabbing the entire row and then asserting
    // let entireRow = await page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).textContent();
    
  });

  test('Should match all information of patient after creating a new patient', async({page})=>{

    //Create a new patient 

    //After creating verify patient info is openned.
    //To verify, check edit and delete button, check for header to have LastName, FirstName.
    
    await expect(page.locator('h2')).toContainText('test test, testing');
    await expect(page.getByRole('button', { name: 'edit Edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'delete Delete' })).toBeVisible();


    //After openning verify all the information is correct

    await page.goto('https://novascotia.flow.qa.canimmunize.dev/');
    await page.goto('https://novascotia.flow.qa.canimmunize.dev/home');
    await page.goto('https://canimm-test.us.auth0.com/u/login?state=hKFo2SBfeE5pQXdIRlFXR0k5UG1JRUh0bE5TVzhBcDdwRlBXNqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDlHaVZoVk1kTmI1NGNZLWpQU1NPWHFkNUVRNFI1Vmdvo2NpZNkgcmV0Tlk0cmtYV09LRmZqU2FWMVVyZnlySHptMUVQTDQ');
  });

  test('Should be able to delete patient from patient info page', async ({ page }) => {

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
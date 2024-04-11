import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { RepositoryPage } from '../pageObjects/repositoryPage';


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('super@canimmunize.ca', 'Console123!');
});

var userTestData = {
  FirstName: "Abhash",
  LastName: "Rajbhandari",
  PreferredName: "Abhash",
  Pronoun: "He/Him",
  DateOfBirth: "1994-01-05",
  Gender: "Male",
  HealthCardType: "Manitoba",
  HealthCardNumber: "564265193",
  ManagingOrganization: "Walmart_Pharmacy - Walmart",
  Email: "abhrajbhandari@gmail.com",
  PhoneNumber: "7807180054",
}

  test('Cancel button should not save patient information.', async ({ page }) => {
    const repositoryPage = new RepositoryPage(page);
    await repositoryPage.navigateRepositoryPage();
    //over riding health card number to make it different while searching
    userTestData.HealthCardNumber = "264222193";
    await repositoryPage.fillAllPatientRecords(userTestData);
    await repositoryPage.clickCancelButton();
    await repositoryPage.searchPatient(userTestData);
    //Verify that patient is not added in search results
    await repositoryPage.waitForResultToShow();
    await expect(await repositoryPage.isNoDataTextBoxVisible()).toBeTruthy();
    await expect(await repositoryPage.getPatientPresentInSearchResult(userTestData)).toBeHidden();

  });

  test('Should not enable Save button without filling required fields', async ({ page }) => {
      //Setting the default timeout to 2 minutes
      test.setTimeout(120000);
      const repositoryPage = new RepositoryPage(page);
      await repositoryPage.navigateRepositoryPage();

      //Verify FirstName Field is required
      await repositoryPage.fillAllPatientRecords(userTestData);    
      await repositoryPage.clearMandatoryFieldFirstName();
      await expect(await repositoryPage.isSaveButtonEnabled()).toBeFalsy();
      await repositoryPage.clickCancelButton();

      // Verify LastName Field is required
      await repositoryPage.fillAllPatientRecords(userTestData);
      await repositoryPage.clearMandatoryFieldLastName();
      await expect(await repositoryPage.isSaveButtonEnabled()).toBeFalsy();
      await repositoryPage.clickCancelButton();

      //Verify Birthdate Field is required
      await repositoryPage.fillAllPatientRecords(userTestData);
      await repositoryPage.clearMandatoryFieldBirthDate();
      await expect(await repositoryPage.isSaveButtonEnabled()).toBeFalsy();
      await repositoryPage.clickCancelButton();

      //Verify Gender Field is required
      //Looks like there is no clear button for Gender
      //We can revode this field while passing userTestData to verify 

      //Verify Health Card Type Field is required
      await repositoryPage.fillAllPatientRecords(userTestData);
      await repositoryPage.clearMandatoryFieldHealthCardType();
      await expect(await repositoryPage.isSaveButtonEnabled()).toBeFalsy();
      await repositoryPage.clickCancelButton();

      //Verify Health Card Number Field is required
      await repositoryPage.fillAllPatientRecords(userTestData);
      await repositoryPage.clearMandatoryFieldHealthCardNumber();
      await expect(await repositoryPage.isSaveButtonEnabled()).toBeFalsy();
      await repositoryPage.clickCancelButton();

      //Verify Managing Organization Field is required
      //Similar to Gender this field cannot be cleared
      //We can revode this field while passing userTestData to verify 

  });
    
  test('Should enable Save button if all required fields are filled', async ({ page }) => {      
    const repositoryPage = new RepositoryPage(page);
    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.fillAllPatientRecords(userTestData);    
    await expect(await repositoryPage.isSaveButtonEnabled()).toBeTruthy();          
  });
    
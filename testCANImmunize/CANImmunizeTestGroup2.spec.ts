import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { RepositoryPage } from '../pageObjects/repositoryPage';
import { PatientsDetailsPage } from '../pageObjects/patientsDetailsPage';
import { Helper } from '../helpers/helperMethods';
import dotenv from 'dotenv';

dotenv.config();

//Change this health card number back 
var userTestData1 = {
  FirstName: "Abhash",
  LastName: "Rajbhandari",
  PreferredName: "Abhash",
  Pronoun: "He/Him",
  DateOfBirth: "1994-01-05",
  Gender: "Male",
  HealthCardType: "Manitoba",    
  HealthCardNumber: "564265191",
  ManagingOrganization: "Walmart Pharmacy",
  Email: "abhrajbhandari@gmail.com",
  PhoneNumber: "7807180054"
}

var userTestData2 = {
  FirstName: "Abhash",
  LastName: "Rajbhandari",
  PreferredName: "Abhash",
  Pronoun: "He/Him",
  DateOfBirth: "1994-01-05",
  Gender: "Male",
  HealthCardType: "Manitoba",    
  HealthCardNumber: "564265192",
  ManagingOrganization: "Walmart Pharmacy",
  Email: "abhrajbhandari@gmail.com",
  PhoneNumber: "7807180054"
}

var userTestData3 = {
  FirstName: "Abhash",
  LastName: "Rajbhandari",
  PreferredName: "Abhash",
  Pronoun: "He/Him",
  DateOfBirth: "1994-01-05",
  Gender: "Male",
  HealthCardType: "Manitoba",    
  HealthCardNumber: "564265193",
  ManagingOrganization: "Walmart Pharmacy",
  Email: "abhrajbhandari@gmail.com",
  PhoneNumber: "7807180054"
}

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.UserId, process.env.Password);
  });

  async function createNewPatient(repositoryPage, testData){
    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.fillAllPatientRecords(testData);  
    await repositoryPage.clickSaveButton();
  }

  async function deletePatient(repositoryPage, patientsDetailsPage, testData){
    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.searchPatient(testData);``
    await repositoryPage.waitForResultToShow();
    if(!(await repositoryPage.isNoDataTextBoxVisible())){
      //Delete testData
      await expect(await repositoryPage.getPatientPresentInSearchResult(testData)).toBeVisible();
      await repositoryPage.openPatientDetailsByHealthCardNumber(testData.HealthCardNumber);
      await patientsDetailsPage.deletePatient();
    }  
  }

  test('Should match all information of patient after creating a new patient', async({page})=>{

    const repositoryPage = new RepositoryPage(page);
    const patientsDetailsPage = new PatientsDetailsPage(page);

    //Delete patient information if already present
    await deletePatient(repositoryPage, patientsDetailsPage, userTestData3);

    await createNewPatient(repositoryPage, userTestData3);

    //After creating verify patient info is openned.
    //To verify, check edit and delete button, check for header to have LastName, FirstName.
    let expectedFullName = userTestData3.LastName + ', ' + userTestData3.FirstName + ' (' + userTestData3.PreferredName + ')';
    await expect(await patientsDetailsPage.getFullNameInPatientDetailsPage()).toEqual(expectedFullName);
    await expect(await patientsDetailsPage.isEditButtonVisible()).toBeTruthy();
    await expect(await patientsDetailsPage.isDeleteButtonVisible()).toBeTruthy();

    //After openning verify all the information is correct
    await expect(await patientsDetailsPage.getFirstNameInPatientTable()).toEqual(userTestData3.FirstName);
    await expect(await patientsDetailsPage.getLastNameInPatientTable()).toEqual(userTestData3.LastName);
    await expect(await patientsDetailsPage.getPreferredNameInPatientTable()).toEqual(userTestData3.PreferredName);
    await expect(await patientsDetailsPage.getPronounInPatientTable()).toEqual(userTestData3.Pronoun);
    await expect(await patientsDetailsPage.getDateOfBirthInPatientTable()).toContain(Helper.convertDateFormatToMatchPatientInfo(userTestData3.DateOfBirth));
    await expect(await patientsDetailsPage.getGenderInPatientTable()).toEqual(userTestData3.Gender);
    await expect(await patientsDetailsPage.getHealthCardNumberInPatientTable()).toContain(userTestData3.HealthCardNumber);
    await expect(await patientsDetailsPage.getEmailIdInPatientTable()).toEqual(userTestData3.Email);
    await expect(await patientsDetailsPage.getPhoneNumberInPatientTable()).toEqual(Helper.formatPhoneNumber(userTestData3.PhoneNumber));
    await expect(await patientsDetailsPage.getManagingOrganizationInPatientTable()).toEqual(userTestData3.ManagingOrganization);
   
  });


   test('Should display added patient in search result', async({page})=>{
    
    const repositoryPage = new RepositoryPage(page);
    const patientsDetailsPage = new PatientsDetailsPage(page);
    //Delete patient information if already present
    await deletePatient(repositoryPage, patientsDetailsPage, userTestData1);

    await createNewPatient(repositoryPage, userTestData1);

    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.searchPatient(userTestData1);
    await expect(await repositoryPage.getPatientPresentInSearchResult(userTestData1)).toBeVisible();
  
    let expectedFullName = userTestData1.LastName + ', ' + userTestData1.FirstName + ' (' + userTestData1.PreferredName + ')';
    //Verify information in the search result is correct
    await expect(await repositoryPage.getNameOfPatientInSearchResult(userTestData1.HealthCardNumber)).toEqual(expectedFullName);
    await expect(await repositoryPage.getEmailOfPatientInSearchResult(userTestData1.HealthCardNumber)).toEqual(userTestData1.Email);
    await expect(await repositoryPage.getDOBOfPatientInSearchResult(userTestData1.HealthCardNumber)).toEqual(userTestData1.DateOfBirth);
    await expect(await repositoryPage.getGenderOfPatientInSearchResult(userTestData1.HealthCardNumber)).toEqual(userTestData1.Gender);

   });

  test('Should match all information of patient after creating and searching a new patient', async({ page })=>{
    
    const repositoryPage = new RepositoryPage(page);
    const patientsDetailsPage = new PatientsDetailsPage(page);
    //Delete patient information if already present
    await deletePatient(repositoryPage, patientsDetailsPage, userTestData2);

    await createNewPatient(repositoryPage, userTestData2);

    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.searchPatient(userTestData2);
    await expect(await repositoryPage.getPatientPresentInSearchResult(userTestData2)).toBeVisible();
    await repositoryPage.openPatientDetailsByHealthCardNumber(userTestData2.HealthCardNumber);
  
    //After openning verify all the information is correct
    await expect(await patientsDetailsPage.getFirstNameInPatientTable()).toEqual(userTestData2.FirstName);
    await expect(await patientsDetailsPage.getLastNameInPatientTable()).toEqual(userTestData2.LastName);
    await expect(await patientsDetailsPage.getPreferredNameInPatientTable()).toEqual(userTestData2.PreferredName);
    await expect(await patientsDetailsPage.getPronounInPatientTable()).toEqual(userTestData2.Pronoun);
    await expect(await patientsDetailsPage.getDateOfBirthInPatientTable()).toContain(Helper.convertDateFormatToMatchPatientInfo(userTestData2.DateOfBirth));
    await expect(await patientsDetailsPage.getGenderInPatientTable()).toEqual(userTestData2.Gender);
    await expect(await patientsDetailsPage.getHealthCardNumberInPatientTable()).toContain(userTestData2.HealthCardNumber);
    await expect(await patientsDetailsPage.getEmailIdInPatientTable()).toEqual(userTestData2.Email);
    await expect(await patientsDetailsPage.getPhoneNumberInPatientTable()).toEqual(Helper.formatPhoneNumber(userTestData2.PhoneNumber));
    await expect(await patientsDetailsPage.getManagingOrganizationInPatientTable()).toEqual(userTestData2.ManagingOrganization);

  });
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { RepositoryPage } from '../pageObjects/repositoryPage';
import { PatientsDetailsPage } from '../pageObjects/patientsDetailsPage';

//Change this health card number back 
var userTestData = {
  FirstName: "Abhash",
  LastName: "Rajbhandari",
  PreferredName: "Abhash",
  Pronoun: "He/Him",
  DateOfBirth: "1994-01-05",
  Gender: "Male",
  HealthCardType: "Manitoba",    
  HealthCardNumber: "774265193",
  ManagingOrganization: "Walmart_Pharmacy - Walmart",
  Email: "abhrajbhandari@gmail.com",
  PhoneNumber: "7807180054",
}

test.beforeAll(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('super@canimmunize.ca', 'Console123!');
    //Do a patient creation before running these three test cases
    const repositoryPage = new RepositoryPage(page);
    await createNewPatient(repositoryPage, userTestData)
});

  async function createNewPatient(repositoryPage, testData){
    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.fillAllPatientRecords(testData);  
    await repositoryPage.clickSaveButton();
  }

  test('Should match all information of patient after creating a new patient', async({page})=>{

    const patientsDetailsPage = new PatientsDetailsPage(page);

    //After creating verify patient info is openned.
    //To verify, check edit and delete button, check for header to have LastName, FirstName.
    let expectedFullName = userTestData.LastName + ', ' + userTestData.FirstName;
    await expect(await patientsDetailsPage.getFullNameInPatientDetailsPage()).toEqual(expectedFullName);
    await expect(await patientsDetailsPage.isEditButtonVisible()).toBeTruthy();
    await expect(await patientsDetailsPage.isDeleteButtonVisible()).toBeTruthy();

    //After openning verify all the information is correct
    await expect(patientsDetailsPage.getFirstNameInPatientTable()).toEqual(userTestData.FirstName);
    await expect(patientsDetailsPage.getLastNameInPatientTable()).toEqual(userTestData.LastName);
    await expect(patientsDetailsPage.getPreferredNameInPatientTable()).toEqual(userTestData.PreferredName);
    await expect(patientsDetailsPage.getPronounInPatientTable()).toEqual(userTestData.Pronoun);
    await expect(patientsDetailsPage.getDateOfBirthInPatientTable()).toContain(userTestData.DateOfBirth);
    await expect(patientsDetailsPage.getGenderInPatientTable()).toEqual(userTestData.Gender);
    await expect(patientsDetailsPage.getHealthCardNumberInPatientTable()).toEqual(userTestData.HealthCardNumber);
    await expect(patientsDetailsPage.getEmailIdInPatientTable()).toEqual(userTestData.Email);
    await expect(patientsDetailsPage.getPhoneNumberInPatientTable()).toEqual(userTestData.PhoneNumber);
    await expect(patientsDetailsPage.getManagingOrganizationInPatientTable()).toEqual(userTestData.ManagingOrganization);

   });


   test('Should display added patient in search result', async({page})=>{
    const repositoryPage = new RepositoryPage(page);
    const patientsDetailsPage = new PatientsDetailsPage(page);

    await repositoryPage.navigateRepositoryPage();
    await repositoryPage.searchPatient(userTestData);
    await repositoryPage.openFirstSearchResultPatient();
  
    //After openning verify all the information is correct
    await expect(patientsDetailsPage.getFirstNameInPatientTable()).toEqual(userTestData.FirstName);
    await expect(patientsDetailsPage.getLastNameInPatientTable()).toEqual(userTestData.LastName);
    await expect(patientsDetailsPage.getPreferredNameInPatientTable()).toEqual(userTestData.PreferredName);
    await expect(patientsDetailsPage.getPronounInPatientTable()).toEqual(userTestData.Pronoun);
    await expect(patientsDetailsPage.getDateOfBirthInPatientTable()).toContain(userTestData.DateOfBirth);
    await expect(patientsDetailsPage.getGenderInPatientTable()).toEqual(userTestData.Gender);
    await expect(patientsDetailsPage.getHealthCardNumberInPatientTable()).toEqual(userTestData.HealthCardNumber);
    await expect(patientsDetailsPage.getEmailIdInPatientTable()).toEqual(userTestData.Email);
    await expect(patientsDetailsPage.getPhoneNumberInPatientTable()).toEqual(userTestData.PhoneNumber);
    await expect(patientsDetailsPage.getManagingOrganizationInPatientTable()).toEqual(userTestData.ManagingOrganization);

   });



  test('Should match all information of patient after creating and searching a new patient', async({ page })=>{
    
    const repositoryPage = new RepositoryPage(page);
    const patientsDetailsPage = new PatientsDetailsPage(page);
   
    //Going back to reporsitory page to search
    await repositoryPage.navigateRepositoryPage();

    //Searching for the patient
    await repositoryPage.searchPatient(userTestData);
    await repositoryPage.openFirstSearchResultPatient();

    await expect(patientsDetailsPage.getFirstNameInPatientTable()).toEqual(userTestData.FirstName);
    await expect(patientsDetailsPage.getLastNameInPatientTable()).toEqual(userTestData.LastName);
    await expect(patientsDetailsPage.getPreferredNameInPatientTable()).toEqual(userTestData.PreferredName);
    await expect(patientsDetailsPage.getPronounInPatientTable()).toEqual(userTestData.Pronoun);
    await expect(patientsDetailsPage.getDateOfBirthInPatientTable()).toContain(userTestData.DateOfBirth);
    await expect(patientsDetailsPage.getGenderInPatientTable()).toEqual(userTestData.Gender);
    await expect(patientsDetailsPage.getHealthCardNumberInPatientTable()).toEqual(userTestData.HealthCardNumber);
    await expect(patientsDetailsPage.getEmailIdInPatientTable()).toEqual(userTestData.Email);
    await expect(patientsDetailsPage.getPhoneNumberInPatientTable()).toEqual(userTestData.PhoneNumber);
    await expect(patientsDetailsPage.getManagingOrganizationInPatientTable()).toEqual(userTestData.ManagingOrganization);
        
  });
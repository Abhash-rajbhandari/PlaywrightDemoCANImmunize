import { expect, Page, type Locator } from "@playwright/test";

export class RepositoryPage{

    readonly page: Page;
    readonly repositoryLink: Locator;
    readonly addNewPatientButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly preferredNameTextBox: Locator;
    readonly pronounTextBox: Locator;
    readonly dateOfBirthTextBox: Locator;
    readonly genderDropDownMenu: Locator;
    readonly genderMaleDropDownItem: Locator;
    readonly healthCardNumber: Locator;
    readonly emailId: Locator;
    readonly phoneNumber: Locator;
    readonly healthCardTypeDropDownMenu: Locator;
    readonly healthCardTypeManitobaItem: Locator;
    readonly managingOrganizationDropDown: Locator;
    readonly walmartPharmaAsManagingOrganizationDropDownItem: Locator;
    readonly overrideButton: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;
    readonly sureToCloseYesButton: Locator;
    readonly clearBirthdayCircleButton: Locator;
    readonly clearHealthCardTypeCircleButton: Locator;
    readonly patientSearchTextBox: Locator;
    readonly patientSearchButton: Locator;
    readonly searchResultColumns: Locator;
    readonly searchResultFirstItem: Locator;


    constructor (page: Page){
        this.repositoryLink = page.getByRole('link', { name: 'Repository' });        
        this.addNewPatientButton = page.getByRole('button', { name: 'plus New Patient' });
        this.firstNameTextBox = page.getByLabel('First Name *');
        this.lastNameTextBox = page.getByLabel('Last Name *');
        this.preferredNameTextBox = page.getByLabel('Preferred Name');
        this.pronounTextBox = page.getByLabel('Pronoun');
        this.dateOfBirthTextBox = page.getByPlaceholder('YYYY-MM-DD');
        this.genderDropDownMenu = page.getByLabel('Gender *');
        this.genderMaleDropDownItem = page.getByLabel('New Patient').getByText('Male', { exact: true });
        this.emailId = page.getByRole('textbox', { name: 'Email :' });
        this.phoneNumber = page.getByLabel('Phone');
        this.healthCardNumber = page.getByLabel('Health Card Number *');
        this.healthCardTypeDropDownMenu = page.getByLabel('Health Card Type*');
        this.healthCardTypeManitobaItem = page.getByText('Manitoba');
        this.managingOrganizationDropDown = page.getByLabel('Managing Organization*');
        this.walmartPharmaAsManagingOrganizationDropDownItem = page.getByText('Walmart_Pharmacy - Walmart');
        this.overrideButton = page.getByRole('button', { name: 'Override' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.sureToCloseYesButton = page.getByRole('button', { name: 'Yes' });
        this.clearBirthdayCircleButton = page.getByRole('button', { name: 'close-circle' });
        // this.clearHealthCardTypeCircleButton = page.getByLabel('New Patient').getByLabel('close-circle').locator('path').nth(1);
        //this Selector can be made better 
        this.clearHealthCardTypeCircleButton = page.locator(`(//*[@data-icon='close-circle'])[3]`);
        this.patientSearchTextBox = page.getByPlaceholder('Patient Search');
        this.patientSearchButton = page.getByRole('button', { name: 'search' });
        this.searchResultColumns = page.getByRole('row');
        this.searchResultFirstItem = page.getByRole('table').locator('tr').nth(2);
    }

    async navigateRepositoryPage(){
        await this.repositoryLink.click();
    }

    async searchPatient(userTestData){
        await this.patientSearchTextBox.click()
        await this.patientSearchTextBox.fill(userTestData.HealthCardNumber);
        await this.patientSearchButton.click();
    }

    async openFirstSearchResultPatient(){
        await this.searchResultFirstItem.click();
    }

    async isAnyPatientsAvailable(){
        let numberOfColumnsAvailable = await this.searchResultColumns.count();
        if(await this.searchResultColumns.count()>2)
            return true;
        else
            return false;
    }

    async fillAllPatientRecords(userTestData){
      
        await expect(this.addNewPatientButton).toBeEnabled();

        await this.addNewPatientButton.click();
        await this.firstNameTextBox.click();
        await this.firstNameTextBox.fill(userTestData.FirstName);        
        await this.lastNameTextBox.fill(userTestData.LastName);
        await this.pronounTextBox.fill(userTestData.Pronoun);
        await this.preferredNameTextBox.fill(userTestData.PreferredName);
        await this.dateOfBirthTextBox.click();
        await this.dateOfBirthTextBox.fill(userTestData.DateOfBirth);
        await this.dateOfBirthTextBox.press('Enter');
        await this.emailId.fill(userTestData.Email);
        await this.phoneNumber.fill(userTestData.PhoneNumber);

        await this.genderDropDownMenu.click();

        if(userTestData.Gender == "Male"){
            await this.genderMaleDropDownItem.click();
        }
                
        await this.healthCardTypeDropDownMenu.click();
        if(userTestData.HealthCardType=="Manitoba"){
            await this.healthCardTypeManitobaItem.click();
        } 
        await this.healthCardNumber.click();
        await this.healthCardNumber.fill('564265193');
        
        await this.managingOrganizationDropDown.click();
        await this.walmartPharmaAsManagingOrganizationDropDownItem.click();
    }

    async clickSaveButton(){
        await this.saveButton.click();
    }

    async clickCancelButton(){
        await this.cancelButton.click();
        await this.sureToCloseYesButton.click();
    }

    async clickOverrideButton(){
        await this.overrideButton.click();
    }

    async isSaveButtonEnabled(){
        return await this.saveButton.isEnabled();
    }

    async clearMandatoryFieldFirstName(){
        await this.firstNameTextBox.clear();
    }

    async clearMandatoryFieldLastName(){
        await this.lastNameTextBox.clear();    
    }

    async clearMandatoryFieldBirthDate(){
        await this.clearBirthdayCircleButton.click();   
    }

    async clearMandatoryFieldGender(){
        await this.genderDropDownMenu.clear();    
    }

    async clearMandatoryFieldHealthCardType(){
        await this.clearHealthCardTypeCircleButton.hover();
        await this.clearHealthCardTypeCircleButton.click();
    }

    async clearMandatoryFieldHealthCardNumber(){
        await this.healthCardNumber.clear();    
    }

    async clearMandatoryFieldManagingOrganization(){
        await this.managingOrganizationDropDown.clear();    
    }
   
}
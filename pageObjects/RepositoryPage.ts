import { expect, Page, type Locator } from "@playwright/test";

export class RepositoryPage{

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

    constructor (page: Page){
        this.repositoryLink = page.locator('a', { hasText: 'Repository' });        
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
        this.saveButton = page.locator('span').filter({ hasText: 'Save' }).first();
    }

    async navigateRepositoryPage(){
        await this.repositoryLink.click();
    }


   
}
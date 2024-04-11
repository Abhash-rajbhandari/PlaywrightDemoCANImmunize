import { expect, Page, type Locator } from "@playwright/test";

export class PatientsDetailsPage{

    readonly page: Page;
    readonly firstNameTableData: Locator;
    readonly lastNameTableData: Locator;
    readonly preferredNameTableData: Locator;
    readonly pronounTableData: Locator;
    readonly dateOfBirthTableData: Locator;
    readonly genderTableData: Locator;
    readonly healthCardNumberTableData: Locator;
    readonly emailIdTableData: Locator;
    readonly phoneNumberTableData: Locator;
    readonly managingOrganizationTableData: Locator;
    readonly deletePatientButton: Locator;
    readonly patientFullName: Locator;
    readonly editPatientInfoButton: Locator;

    constructor (page: Page){

        this.firstNameTableData = this. page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).locator('td').nth(0);
        this.lastNameTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Last Name', {exact: true})}).locator('td').nth(1);
        this.preferredNameTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Preferred Name', {exact: true})}).locator('td').nth(2);
        this.pronounTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Pronoun', {exact: true})}).locator('td').nth(2);
        this.dateOfBirthTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Date of Birth', {exact: true})}).locator('td').nth(0);
        this.genderTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Gender', {exact: true})}).locator('td').nth(1);
        this.healthCardNumberTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Health Card Number', {exact: true})}).locator('td').nth(0);
        this.emailIdTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Email', {exact: true})}).locator('td').nth(1);
        this.phoneNumberTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Phone', {exact: true})}).locator('td').nth(2);
        this.managingOrganizationTableData = this.page.getByRole('row').filter({has: page.locator('th').getByText('Managing Organization', {exact: true})}).locator('td').nth(1);
        this.deletePatientButton = this.page.getByRole('button', { name: 'delete Delete' });    
        this.patientFullName = this.page.locator('h2');
        this.editPatientInfoButton = this.page.getByRole('button', { name: 'edit Edit' });


        //By using Class Name
        // let fromClasName = await page.locator(`//*[@class='ant-descriptions-item-content cy-patientManagingOrg']`).textContent();

        //Merging ClassName with Row number
        //let FirstnameByMerging = await page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).locator(`//*[@class='ant-descriptions-item-content cy-patientManagingOrg']`).textContent();

        //Grabbing the entire row and then asserting
        // let entireRow = await page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).textContent();
    
    }

    async deletePatient(){

    }

    async getFullNameInPatientDetailsPage(){
        return await this.patientFullName.textContent();
    }

    async isEditButtonVisible(){
        return await this.editPatientInfoButton.isVisible();
    }

    async isDeleteButtonVisible(){
        return await this.deletePatientButton.isVisible();
    }

    async getFirstNameInPatientTable(){
        return await this.firstNameTableData.textContent();
    }

    async getLastNameInPatientTable(){
        return await this.lastNameTableData.textContent();
    }

    async getPreferredNameInPatientTable(){
        return await this.preferredNameTableData.textContent();
    }

    async getPronounInPatientTable(){
        return await this.pronounTableData.textContent();
    }

    async getDateOfBirthInPatientTable(){
        return await this.dateOfBirthTableData.textContent();
    }

    async getGenderInPatientTable(){
        return await this.genderTableData.textContent();
    }

    async getHealthCardNumberInPatientTable(){
        return await this.healthCardNumberTableData.textContent();
    }

    async getEmailIdInPatientTable(){
        return await this.emailIdTableData.textContent();
    }

    async getPhoneNumberInPatientTable(){
        return await this.phoneNumberTableData.textContent();
    }

    async getManagingOrganizationInPatientTable(){
        return await this.managingOrganizationTableData.textContent();
    }


        // await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('First Name', {exact: true})}).locator('td').nth(0).textContent()
        //   ).toEqual('');
          
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Last Name', {exact: true})}).locator('td').nth(1).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Preferred Name', {exact: true})}).locator('td').nth(2).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Date of Birth', {exact: true})}).locator('td').nth(0).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Gender', {exact: true})}).locator('td').nth(1).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Pronoun', {exact: true})}).locator('td').nth(2).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Health Card Number', {exact: true})}).locator('td').nth(0).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Email', {exact: true})}).locator('td').nth(1).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Phone', {exact: true})}).locator('td').nth(2).textContent()
        //   ).toEqual('');
      
        //   await expect(
        //     page.getByRole('row').filter({has: page.locator('th').getByText('Managing Organization', {exact: true})}).locator('td').nth(1).textContent()
        //   ).toEqual('');

    


    
}
import { expect, Page, type Locator } from "@playwright/test";


export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly continueButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.email = page.getByLabel('Email address');
        this.password = page.getByLabel('Password');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async navigate(){
        await this.page.goto('/');
    }

    async login(userName, password){
        await this.email.click();
        await this.email.fill(userName);
        await this.password.click();
        await this.password.fill(password);
        await this.continueButton.click();
    }
}
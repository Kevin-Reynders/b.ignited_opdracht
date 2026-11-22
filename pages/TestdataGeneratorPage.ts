import { Page, Locator } from '@playwright/test';

export class TestdataGeneratorPage {
    readonly page: Page;

    readonly numberplateGenerator: Locator;
    readonly numberplateGeneratorDescriptionSmall: Locator;
    readonly numberplateGeneratorDescriptionLarge: Locator;
    readonly numberplateGeneratorDescriptionReadMoreOrLess: Locator;
    readonly generateDealer: Locator;
    readonly generateAmount: Locator;
    readonly automateButton: Locator;
    readonly generateButton: Locator;
    readonly generatedData: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberplateGenerator = page.getByRole('button', { name: 'plates Belgische Nummerplaten' });
        this.numberplateGeneratorDescriptionSmall = page.locator('#plates-read-less-content');
        this.numberplateGeneratorDescriptionLarge = page.locator('#plates-read-more-content');
        this.numberplateGeneratorDescriptionReadMoreOrLess = page.locator('#plates-read-more-button');
        this.generateDealer = page.getByRole('combobox', { name: 'dealers' });
        this.generateAmount = page.getByRole('spinbutton', { name: 'amount' });
        this.automateButton = page.locator('#plates-automate-button');
        this.generateButton = page.locator('#plates-generate-button');
        this.generatedData = page.locator('#plates-result-box');
    }

    async goto() {
        await this.page.goto('https://testdatagenerator.bignited.be/');
    }

    async generateNumberplate() {
        await this.generateButton.click();
    }

    async getGeneratedData() {
        return await this.generatedData.textContent();
    }
}

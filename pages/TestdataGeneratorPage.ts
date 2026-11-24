import { Page, Locator, expect } from '@playwright/test';

export class TestdataGeneratorPage {
    readonly page: Page;

    //The whole page is a testdatagenerator, I could make it more specific for the exercise here, but that would make it less reusable, unless I make a base page class, which I don't want to do for now.
    readonly numberplateGenerator: Locator;
    readonly numberplateGeneratorTitle: Locator;
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
        this.numberplateGeneratorTitle = page.locator('#plates-header');
        this.numberplateGeneratorDescriptionSmall = page.locator('#plates-read-less-content');
        this.numberplateGeneratorDescriptionLarge = page.locator('#plates-read-more-content');
        this.numberplateGeneratorDescriptionReadMoreOrLess = page.locator('#plates-read-more-button');
        this.generateDealer = page.getByRole('combobox', { name: 'dealers' });
        this.generateAmount = page.locator('#plates-amount');
        this.automateButton = page.locator('#plates-automate-button');
        this.generateButton = page.locator('#plates-generate-button');
        this.generatedData = page.locator('#plates-result');
    }

    async goto() {
        await this.page.goto('https://testdatagenerator.bignited.be/');
    }

    async openNumberplateGenerator() {
        await this.numberplateGeneratorTitle.scrollIntoViewIfNeeded();
        await this.numberplateGeneratorTitle.click();
        //await expect(this.numberplateGeneratorTitle).toBeVisible();
        this.numberplateGeneratorTitle.waitFor({ state: 'visible' });
        await expect(this.numberplateGenerator).toHaveAttribute('aria-expanded', 'true');
    }

    async generateNumberplate() {
        await this.generateButton.click();
    }

    async getGeneratedData(): Promise<string[]> {
        return await this.generatedData.locator('p').allTextContents();
    }
}

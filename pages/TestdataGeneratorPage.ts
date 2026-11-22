import { Page, Locator } from '@playwright/test';

export class TestdataGeneratorPage {
    readonly page: Page;

    readonly numberplateGenerator: Locator;
    readonly generateDealer: Locator;
    readonly generateAmount: Locator;
    readonly generateButton: Locator;
    readonly generatedData: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberplateGenerator = page.locator('');
        this.generateDealer = page.locator('');
        this.generateAmount = page.locator('');
        this.generateButton = page.locator('');
        this.generatedData = page.locator('');
    }

    async goto() {
        await this.page.goto('/');
    }

    async generateNumberplate() {
        await this.generateButton.click();
    }

    async getGeneratedData() {
        return await this.generatedData.textContent();
    }
}

import  { test, expect} from '@playwright/test';
import { TestdataGeneratorPage } from '../pages/TestdataGeneratorPage';

test.describe('Belgian Numberplate Generator', () => {
    let testdataGeneratorPage: TestdataGeneratorPage;

    test.beforeEach(async ({ page }) => {
        testdataGeneratorPage = new TestdataGeneratorPage(page);
        await testdataGeneratorPage.goto();
    });

    test('should generate a numberplate', async ({ page }) => {
        await expect(testdataGeneratorPage.numberplateGenerator).toBeVisible();
        await testdataGeneratorPage.numberplateGenerator.scrollIntoViewIfNeeded();
        await testdataGeneratorPage.numberplateGenerator.click();
        await expect (testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toBeVisible();
        await testdataGeneratorPage.generateNumberplate();
        const generatedData = await testdataGeneratorPage.getGeneratedData();
        expect(generatedData).not.toBeNull();
        expect(generatedData).toMatch(/^[0-9][-][A-Z]{3}[-][0-9]{3}$/); // Example standard numberplate format: 1-ABC-123
        console.log(`Generated numberplate: ${generatedData}`);
    });


    /*
    Welke testen moeten er nog bijkomen?
        Checken of de verwachte generator ook fatsoenlijk er staat (knoppen, textboxen, etc.)
        Verschillende formaten (oude nummerplaat, speciale nummerplaat, etc.)
        Genereren van meerdere nummerplaten achter elkaar
        --> check of de gegenereerde nummerplaten uniek zijn
    */

});
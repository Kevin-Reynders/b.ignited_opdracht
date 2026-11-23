import { test, expect } from '@playwright/test';
import { TestdataGeneratorPage } from '../pages/TestdataGeneratorPage';

test.describe('Belgian Numberplate Generator', () => {
    let testdataGeneratorPage: TestdataGeneratorPage;

    test.beforeEach(async ({ page }) => {
        testdataGeneratorPage = new TestdataGeneratorPage(page);
        await testdataGeneratorPage.goto();
        await testdataGeneratorPage.openNumberplateGenerator();
    });

    //The tests below expect the numberplate generator to expect the current format of numberplate, so not selecting a dealer
    test('Generate a valid numberplate', async () => {
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toBeVisible();
        await testdataGeneratorPage.generateNumberplate();
        await expect(testdataGeneratorPage.generatedData).toBeVisible();
        const generatedNumberplates = await testdataGeneratorPage.getGeneratedData();
        expect(generatedNumberplates).toHaveLength(1);
        const generatedNumberplate = generatedNumberplates[0];
        expect(generatedNumberplate).not.toBeNull();
        expect(generatedNumberplate).toMatch(/^[0-9][-][A-Z]{3}[-][0-9]{3}$/); // Example standard numberplate format: 1-ABC-123
        console.log(`Generated numberplate: ${generatedNumberplate}`);
    });

    test('Generate multiple numberplates and check them against each other', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();

        const totalNumberplatesToGenerate = 10; //Number of numberplates to generate

        await testdataGeneratorPage.generateAmount.fill(totalNumberplatesToGenerate.toString());
        await testdataGeneratorPage.generateNumberplate();
        await expect(testdataGeneratorPage.generatedData).toBeVisible();

        const generatedNumberplates = await testdataGeneratorPage.getGeneratedData();
        console.log(`Generated numberplates: ${generatedNumberplates}`);

        expect(generatedNumberplates).toHaveLength(totalNumberplatesToGenerate);

        for (let i = 0; i < totalNumberplatesToGenerate; i++) {
            expect(generatedNumberplates[i]).not.toBeNull();
            expect(generatedNumberplates[i]).toMatch(/^[0-9][-][A-Z]{3}[-][0-9]{3}$/);
        }
        // Check for uniqueness
        const uniqueNumberplates = new Set(generatedNumberplates);
        expect(uniqueNumberplates.size).toBe(generatedNumberplates.length);
    });



    /*
    Welke testen moeten er nog bijkomen?
        Checken of de verwachte generator ook fatsoenlijk er staat (knoppen, textboxen, etc.)
        Verschillende formaten (oude nummerplaat, speciale nummerplaat, etc.)
    */

});
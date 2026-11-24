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

    test('Generate several numberplates in a row and check them against each other', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();

        const plate = testdataGeneratorPage.generatedData.locator('p');
        const total = 5; //Number of numberplates to generate
        const generatedNumberplates: string[] = [];
        let previous = '';

        for (let i = 0; i < total; i++) {
            await testdataGeneratorPage.generateNumberplate();

            await expect(plate).toHaveCount(1); // Ensure only one numberplate is generated at a time
            await expect(plate).toHaveText(/^[0-9][-][A-Z]{3}[-][0-9]{3}$/); 

            if (previous) {
                await expect(plate).not.toHaveText(previous); // Check for uniqueness against previous numberplate
            }

            const numberplate = (await plate.textContent())!.trim();
            console.log(`Generated numberplate ${i + 1}: ${numberplate}`);

            expect(generatedNumberplates).not.toContain(numberplate); // Check for uniqueness against previously generated numberplate
            generatedNumberplates.push(numberplate);
            previous = numberplate;
        }

    });

    test('Generate multiple numberplates at once and check them against each other', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();

        const total = 10; //Number of numberplates to generate

        await testdataGeneratorPage.generateAmount.fill(total.toString());
        await testdataGeneratorPage.generateNumberplate();
        await expect(testdataGeneratorPage.generatedData).toBeVisible();

        const generatedNumberplates = await testdataGeneratorPage.getGeneratedData();
        console.log(`Generated numberplates: ${generatedNumberplates}`);

        expect(generatedNumberplates).toHaveLength(total);

        for (let i = 0; i < total; i++) {
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
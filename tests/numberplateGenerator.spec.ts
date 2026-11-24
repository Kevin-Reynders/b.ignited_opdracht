import { test, expect } from '@playwright/test';
import { TestdataGeneratorPage } from '../pages/TestdataGeneratorPage';
import { PlateType } from '../utils/plate-types';
import { PlateFormat } from '../utils/plate-format';

test.describe('Belgian Numberplate Generator Positive Scenarios', () => {
    let testdataGeneratorPage: TestdataGeneratorPage;

    test.beforeEach(async ({ page }) => {
        testdataGeneratorPage = new TestdataGeneratorPage(page);
        await testdataGeneratorPage.goto();
        await testdataGeneratorPage.openNumberplateGenerator();
    });

    //The tests below expect the numberplate generator to expect the current format of numberplate, so not selecting a dealer
    test('Check if the description is visible and toggleable', async () => {
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toBeVisible();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionLarge).toBeHidden();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toHaveText('This action returns Belgian license plates.');
        testdataGeneratorPage.numberplateGeneratorDescriptionReadMoreOrLess.click();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toBeVisible();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionLarge).toBeVisible();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionLarge).toContainText('The Belgian License Plate generator');
        testdataGeneratorPage.numberplateGeneratorDescriptionReadMoreOrLess.click();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionSmall).toBeVisible();
        await expect(testdataGeneratorPage.numberplateGeneratorDescriptionLarge).toBeHidden();
    });
    
    test('Generate a valid numberplate', async () => {
        await testdataGeneratorPage.generateNumberplate();
        await expect(testdataGeneratorPage.generatedData).toBeVisible();
        const generatedNumberplates = await testdataGeneratorPage.getGeneratedData();
        expect(generatedNumberplates).toHaveLength(1);
        const generatedNumberplate = generatedNumberplates[0];
        expect(generatedNumberplate).not.toBeNull();
        expect(generatedNumberplate).toMatch(/^[0-7][-][A-Z]{3}[-][0-9]{3}$/); // Example standard numberplate format: 1-ABC-123
        //expect(generatedNumberplate).toMatch(PlateFormat['2010-present']); Using the regex directly for now
        console.log(`Generated numberplate: ${generatedNumberplate}`);
    });

    test('Generate several numberplates individually in a row and check them against each other', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();

        const plate = testdataGeneratorPage.generatedData.locator('p');
        const total = 5; //Number of numberplates to generate
        const generatedNumberplates: string[] = [];
        let previous = '';

        for (let i = 0; i < total; i++) {
            await testdataGeneratorPage.generateNumberplate();

            await expect(plate).toHaveCount(1); // Ensure only one numberplate is generated at a time
            await expect(plate).toHaveText(/^[0-7][-][A-Z]{3}[-][0-9]{3}$/); 

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
            expect(generatedNumberplates[i]).toMatch(PlateFormat['2010-present']); // Check against the expected format for current numberplates
        }
        // Check for uniqueness
        const uniqueNumberplates = new Set(generatedNumberplates);
        expect(uniqueNumberplates.size).toBe(generatedNumberplates.length);
    });

    test('Generate a diplomatic numberplate', async () => {
        await expect(testdataGeneratorPage.generateDealer).toBeVisible();
        await testdataGeneratorPage.selectPlateType(PlateType.DIPLOMAT);
        await testdataGeneratorPage.generateNumberplate();
        await expect(testdataGeneratorPage.generatedData).toBeVisible();
        const generatedNumberplates = await testdataGeneratorPage.getGeneratedData();
        expect(generatedNumberplates).toHaveLength(1);
        const generatedNumberplate = generatedNumberplates[0];
        expect(generatedNumberplate).not.toBeNull();
        expect(generatedNumberplate).toMatch(PlateFormat.diplomat); // Check against the expected format for diplomatic plates
        //expect(generatedNumberplate).toMatch(/^[C][D][-][A-Z]{2}[0-9]{3}$/);
        console.log(`Generated diplomatic numberplate: ${generatedNumberplate}`);
        });
});

/*
    Welke testen moeten er nog bijkomen?
        Checken of de verwachte generator ook fatsoenlijk er staat (knoppen, textboxen, etc.)
        Verschillende formaten (oude nummerplaat, speciale nummerplaat, etc.)
    */

test.describe('Belgian Numberplate Generator Negative Scenarios', () => {
    let testdataGeneratorPage: TestdataGeneratorPage;

    test.beforeEach(async ({ page }) => {
        testdataGeneratorPage = new TestdataGeneratorPage(page);
        await testdataGeneratorPage.goto();
        await testdataGeneratorPage.openNumberplateGenerator();
    });

    test('Show a warning when trying to generate with an out of range amounts', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();
        const invalidAmounts = ['0', '-1', '101', '1000']; 
        /*
        1.5 is valid, but responds like 1, it should be rejected as it needs to be a whole natural number or given a different warning
        */

        for (const value of invalidAmounts) {
            await test.step(`Testing invalid amount: ${value}`, async () => {
                await testdataGeneratorPage.generateAmount.fill(value);
                await testdataGeneratorPage.automateButton.isDisabled();
                await testdataGeneratorPage.generateButton.isDisabled();
                await expect(testdataGeneratorPage.alert.filter({ hasText: 'Values must be between 1 and 100.' })).toBeVisible();
                await expect(testdataGeneratorPage.alert).toHaveText('Values must be between 1 and 100.');
            });
        }
    });

    test('Amount field does not accept a non-numeric value', async () => {
        await expect(testdataGeneratorPage.generateAmount).toBeVisible();
        const invalidInputs = ['abc', '!', '?', '@', '$', '%', '&']; //Non-numeric and special characters

        for (const input of invalidInputs) {
            await test.step(`Testing invalid input: ${input}`, async () => {
                await expect(testdataGeneratorPage.generateAmount.fill(input)).rejects.toThrow(/Cannot type text into input\[type=number\]/); // Expect an error when trying to fill a non-numeric value
            });
        }
    });

});
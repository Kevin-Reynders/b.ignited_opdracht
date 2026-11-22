import  { test, expect} from '@playwright/test';
import { TestdataGeneratorPage } from '../pages/TestdataGeneratorPage';

test.describe('Belgian Numberplate Generator', () => {
    let testdataGeneratorPage: TestdataGeneratorPage;

    test.beforeEach(async ({ page }) => {
        testdataGeneratorPage = new TestdataGeneratorPage(page);
        await testdataGeneratorPage.goto();
    });

    test('should generate a numberplate', async () => {
        await testdataGeneratorPage.generateNumberplate();
        const generatedData = await testdataGeneratorPage.getGeneratedData();
        expect(generatedData).not.toBeNull();
        expect(generatedData).toMatch(/^[0-9][-][A-Z]{3}[-][0-9]{3}$/); // Example standard numberplate format: 1-ABC-123
    });

});
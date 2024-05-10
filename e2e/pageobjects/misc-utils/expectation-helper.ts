import allureReporter from '@wdio/allure-reporter'
import { AlertHelper } from '../html/alert-helper.ts';
import { CheckboxHelper } from '../html/checkbox-helper.ts';
import { ElementHelper } from '../html/element-helper.ts';
import { PageHelper } from '../html/page-helper.ts';
import { WaitHelper } from '../html/wait-helper.ts';
import { ValidationsHelper } from './validation-helper.ts';
import { TextBoxHelper } from '../html/textbox-helper.ts';

export class ExpectationHelper {
    static async verifyAlertMessageAbsent() {
        const alertMessage = ValidationsHelper.getAbsentValidation(ValidationsHelper.types.alert);
       allureReporter.addStep('Sub-Verifiation - '+ alertMessage);
        await expect(await AlertHelper.isAlertPresent())
            .toBe(false);
    }

    static async verifyAlertMessage(message: string) {
        const alertMessage = ValidationsHelper.getAlertHasMessage(message);
       allureReporter.addStep('Sub-Verifiation - '+ alertMessage);
        await expect(await AlertHelper.getAlertText())
            .toBe(message);
    }

    /**
     * Verify whether an element is displayed or not
     * @param targetElement
     */
    static async verifyDisplayedStatus(targetElement: string, elementName?: string, timeoutValue=5000) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getDisplayedValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        let status = true;
        try {
            await WaitHelper.waitForElementToBeDisplayed(targetElement, name, timeoutValue);
        } catch (e) {
            status = false;
        }
        await expect(status).toBe(true);
    }

        
    
    
    /**
     * Verify whether an element is present or not
     * @param targetElement
     */
    static async verifyPresentStatus(targetElement: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getPresentValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(await WaitHelper.waitForElementToBePresent(targetElement, name))
            .toBe(true);
    }

    /**
     * Verify whether an element is enable or not
     * @param targetElement
     */
    static async verifyElementEnable(targetElement: string, timeDuration: any, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getEnabledValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        return await WaitHelper.waitForElementEnabled(targetElement, name, timeDuration);
       
    }

    /**
     * Verify whether an element is clickable or not
     * @param targetElement
     */
    static async verifyElementClickable(targetElement: string, timeDuration: any, elementName?: string) {
        const alertMessage = ValidationsHelper.getElementClickAbleValidation("name");
       allureReporter.addStep('Sub-Verifiation - '+ alertMessage);
        return await WaitHelper.waitForElementClickable(targetElement, elementName);       
    }

    /**
     * Verify element is not displayed
     * @param targetElement
     */
    static async verifyNotDisplayedStatus(targetElement: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getNotDisplayedValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        const exp = await WaitHelper.waitForElementToBePresent(targetElement, name)
        await expect(exp).toBe(false);
        return exp;
    }

    /**
     * Verify if checkbox is checked
     * @param targetElement
     */
    static async verifyCheckboxIsChecked(targetElement: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getNotDisplayedValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        const checkBoxStatus = await CheckboxHelper.isCheckboxChecked(targetElement, name);
        await expect(checkBoxStatus).toBe(true);
    }

    /**
     * Verify whether an element is removed from the page
     * @param targetElement
     */
    static async verifyRemovedStatus(targetElement: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const message = ValidationsHelper.getNotDisplayedValidation(name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(await WaitHelper.waitForElementToBePresent(targetElement, name))
            .toBe(false);
    }

    /**
     * Verify that TextBox contains {expected} text
     * @param targetElement
     * @param expected
     */
    static async verifyTextBoxContains(targetElement: string, expected: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const actual = await $(targetElement).getText();
        const message = ValidationsHelper.getStringToContain(name,
            actual, expected);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actual).toContain(expected);
    }

    static async verifyTextBoxValueNotEqualTo(targetElement: string, notExpected: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const actual = await $(targetElement).getText();
        const message = ValidationsHelper.getFieldAttributeNotContainsValidation(name,
            actual, notExpected);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actual).not.toContain(notExpected);
    }

    static async verifyTextContains(targetElement: string, expectedText: string, elementName?: string) {
        const name = await ElementHelper.resolveName(targetElement, elementName);
        const actualText = await ElementHelper.getText(targetElement);
        const message = ValidationsHelper.getStringToContain(name,
            actualText, expectedText);

       allureReporter.addStep('Sub-Verifiation - '+ message);
    }

    static async verifyTextBoxHasValue(targetElement: string, expectedText: string, elementName?: string) {
        await expect(await TextBoxHelper.hasValue(targetElement, expectedText))
        .toBe(true);
       allureReporter.addStep('Sub-Verifiation - '+ `Element Value ${elementName} has value ${expectedText}`);
    }

    static async verifyLengthBelow60(length: number) {
        const message = ValidationsHelper.verifyLengthBelow60(length);
        let val;
        if (length < 60) {
            val =  true;
        } else {
            val =  false;
        }
       allureReporter.addStep('Sub-Verifiation - '+ message);
    }

    static async verifyValueGraterThan(name: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getGreaterThanValidation(actualValue, expectedValue, name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toBeGreaterThan(expectedValue);
    }

    static async verifyValueLessOrEqualTo(name: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getLessThanOrEqualToValidation(actualValue,
            expectedValue, name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toBeLessThanOrEqual(expectedValue);
    }

    /**
     * Verify that value is less than the other value
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueLessThan(actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getLessThanValidation(actualValue, expectedValue);
       allureReporter.addStep('Sub-Verifiation - '+ `${actualValue} should be less than ${expectedValue} value`);
        await expect(actualValue).toBeLessThan(expectedValue);
    }

    /**
     * Verify that value is greater than or equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueGreaterOrEqualTo(name: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue,
            expectedValue, name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toBeGreaterThanOrEqual(expectedValue);
    }

    static async verifyValueEqualTo(name: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getFieldEqualValidation(name,
            String(actualValue), String(expectedValue));
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toEqual(expectedValue);
    }

    static async verifyNumberEqualTo(target: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getFieldEqualValidation(target,
            String(actualValue), String(expectedValue));
       allureReporter.addStep('Sub-Verifiation - '+ message);
    }

    static async verifyNumberEqualToHard(target: string, actualValue: number, expectedValue: number) {
        const message = ValidationsHelper.getFieldEqualValidation(target,
            String(actualValue), String(expectedValue));
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toEqual(expectedValue);
    }

    /**
     * Verify that value is not equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyValueNotEqualTo(name: string, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldNotEqualValidation(name,
            actualValue, expectedValue);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).not.toEqual(expectedValue);
    }

    /**
     * Verify that string value is equal to other value
     * @param targetElement
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueEqualTo(name: string, actualValue: string,
                                          expectedValue: string) {
        const message = ValidationsHelper.getFieldEqualValidation(name, actualValue, expectedValue);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toEqual(expectedValue);
    }

    static async verifyStringValueContain(actualValue: string, expectedValue: string, elmName: string) {
        const message = ValidationsHelper.getFieldContainsValidation(actualValue, expectedValue, elmName);
       allureReporter.addStep('Sub-Verifiation - '+ message);
    }

    static async verifyStringValueContainHard(actualValue: string, expectedValue: string, elmName: string) {
        const message = ValidationsHelper.getFieldContainsValidation(actualValue, expectedValue, elmName);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toContain(expectedValue);
    }

    /**
     * Verify that string value to not contain the other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueNotContain(name: string, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldNotContainsValidation(actualValue, expectedValue, name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).not.toContain(expectedValue);
    }

    /**
     * Verify that string value is not equal to other value
     * @param target
     * @param actualValue
     * @param expectedValue
     */
    static async verifyStringValueNotEqualTo(name: string, actualValue: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldNotEqualValidation(name, actualValue, expectedValue);
       allureReporter.addStep('Sub-Verifiation - '+ `${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toBe(expectedValue);
    }

    /**
     * Verify that CSS value is equal to expected Value
     * @param target
     * @param attribute
     * @param expectedValue
     */
    static async verifyCssAttributeValue(target: string, name: string, attribute: string, expectedValue: string) {
        const message = ValidationsHelper.getFieldAttributeValidation(name, attribute, expectedValue);

        const actualValue = await PageHelper.getCssValue(target, attribute, name);
       allureReporter.addStep('Sub-Verifiation - '+ message);
        await expect(actualValue).toEqual(expectedValue);
    }

}

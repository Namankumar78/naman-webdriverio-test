import { ElementHelper } from './element-helper.ts';
import allureReporter from '@wdio/allure-reporter'
import { WaitHelper } from './wait-helper.ts';

export class TextBoxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} target
     */
    static async clearText(target: string) {
        await $(target).clearValue();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} target for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    static async sendKeys(target: string, value: string, sendEnter = false, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
       allureReporter.addStep(`Sub-Step - Send keys ${value} to ${name}`);
        await WaitHelper.waitForElementToBeDisplayed(target, elmName);
        await this.clearText(target);

        // On IE, text is sometimes not well sent, this is a workaround
        await $(target).setValue(value);
        if (sendEnter) {
            await browser.keys("\uE007");
        }
    }

    static async hasValue(target: string, text: string) {
        await WaitHelper.waitForElementToBeDisplayed(target);
        const value = await $(target).getValue();
        const final =  value.trim();
        return final === text
    }

    /**
     * Checks whether an input box has particular value or not
     * @param target
     * @param text
     */
}

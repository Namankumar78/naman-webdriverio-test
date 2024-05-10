import { ElementType } from '../misc-utils/element-type.ts';

import { CoreConstants } from './core-constants.ts';
import { TextBoxHelper } from './textbox-helper.ts';
import { WaitHelper } from './wait-helper.ts';
import allureReporter from '@wdio/allure-reporter'

const { DEFAULT_TIMEOUT, TIMEOUTS } = CoreConstants;

export class ElementHelper {

    /**
     * Move mouse with Action class
     * @param target
     */
    static async actionMouseMove(target: string, elmName?: string) {
       const name = await this.resolveName(target, elmName);
      allureReporter.addStep(`Sub-Step - MouseMove '${name}' with Action class`);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        return await $(target).moveTo;
    }

    /**
     * Sendkeys with Action class
     * @param key
     */
    static async actionSendKeys(key: string) {
      allureReporter.addStep(`Sub-Step - Sendkeys '${key}' with Action class`);
        return await browser.keys([key])
    }

    /**
     * Perform 'DoubleClick' operation with Action class
     * @param target
     */
    static async actionDoubleClick(target: string, elmName?: string) {
        const name = await this.resolveName(target, elmName);
      allureReporter.addStep(`Sub-Step - DoubleClick '${name}' with Action class`);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        return await $(target).doubleClick();
    }

    /**
     * Perform 'Click' operation with Action class
     * @param target
     */
    static async actionClick(target: string, elmName?: string) {
        const name = await this.resolveName(target, elmName);
      allureReporter.addStep(`Sub-Step - Click '${name}' with Action class`);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        return await browser.$(target).click();
    }

    /**
     * Get text
     * @param elem
     */
    static async getText(elem: string) {
        await WaitHelper.waitForElementToBeDisplayed(elem);
        let text = await $(elem).getText();
        text = text.trim();
      allureReporter.addStep(`Sub-Step - Received text: '${text}'`);
        return text;
    }

    /**
     * Click 'Button'
     * It logs X button is clicked using subStep
     * @param targetElement
     */
    static async clickButton(targetElement: string, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
        await this.click(targetElement, name, ElementType.Button);
    }

    /**
     * Click 'Link' using JS
     * It logs X link is clicked using subStep
     * @param targetElement
     */
    static async clickLink(targetElement: string, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
        await this.click(targetElement, name, ElementType.Link);
    }

    /**
     * Click 'Checkbox' using JS
     * It logs X checkbox is clicked using subStep
     * @param targetElement
     */
    static async clickCheckbox(targetElement: string, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
        await this.click(targetElement, name, ElementType.Checkbox);
    }

    /**
     * Click 'RadioButton' using JS
     * It logs X radio-button is clicked using subStep
     * @param targetElement
     */
    static async clickRadioButton(targetElement: string, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
        await this.click(targetElement, name, ElementType.RadioButton);
    }

    /**
     * Refresh page and click button
     * @param targetElement
     */
    static async refreshAndClickButton(targetElement: string, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
        await browser.refresh();
        await this.click(targetElement, name, ElementType.Button);
    }

    /**
     * Wait and click
     * @param targetElement
     * @param wait
     */
    static async waitAndClickButton(targetElement: string, elmName?: string, wait = TIMEOUTS.xs) {
        const name = await this.resolveName(targetElement, elmName);
        await WaitHelper.waitForElementToBeDisplayed(targetElement, name);
        await WaitHelper.sleep(wait);
            await this.click(targetElement, name, ElementType.Button);
    }

    /**
     * Perform 'MouseMoveAndClick' operation with Action class
     * @param target
     */
    static async actionMouseMoveAndClick(target: string, elmName?: string) {
        const name = await this.resolveName(target, elmName);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        await browser.$(target).moveTo();
        await browser.$(target).click();
    }

    /**
     * Perform 'MouseMoveAndClick' operation with Displayed wait using Action class
     * @param target
     */
    static async actionClickWithWait(target: string, elmName?: string) {
        const name = await this.resolveName(target, elmName);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        await this.actionMouseMoveAndClick(target, name);
    }

    /**
     * Perform click
     * @param targetElement
     * @param eType
     */
    private static async click(targetElement: string, eType: any, elmName?: string) {
        const name = await this.resolveName(targetElement, elmName);
       allureReporter.addStep(`Sub-Step - Click '${name}' ${eType}`);
        await WaitHelper.waitForElementToBeClickable(targetElement, name);
        return await $(targetElement).click();
    }

    static async resolveName(element: string, elmName?: string) {
        let name;
        try {
            if (elmName) {
            name = elmName;
        } else {
            name = await $(element).getText()
            console.log("Name of element - " + name )
        }
        return name;
    }
        catch {
            name = "Element"
            console.log("Unable to get the name")
            return name;
        }

      }

}

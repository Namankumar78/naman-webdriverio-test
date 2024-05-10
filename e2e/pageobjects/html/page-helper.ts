import { ElementHelper } from './element-helper.ts';
import allureReporter from '@wdio/allure-reporter'
import { AlertHelper } from './alert-helper.ts';
import { PageHelperExtension } from './page-helper-extension.ts';
import { WaitHelper } from './wait-helper.ts';

export class PageHelper extends PageHelperExtension {

    /**
     * Get all browser window handles
     */
    static async getAllWindowHandles() {
        return await browser.getWindowHandles();
    }

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async switchToNewTabIfAvailable(windowNumber = 1) {
        const handles = await this.getAllWindowHandles();
        const newWindowHandle = handles[windowNumber]; // this is your new window
        if (newWindowHandle) {
            await browser.switchWindow(newWindowHandle);
        }
    }

    /**
     * Refresh a page
     * handles javascript alert if pops up on performing refresh action
     * @param dismissAlert
     */
    public static async refreshPage(dismissAlert = true) {
        try {
            await browser.refresh();
            if (dismissAlert) {
                await AlertHelper.dismissAlertIfExists();
            }
        } catch (e) {
            if (e instanceof Error) {
                allureReporter.addStep(e.message);
            }
        }
        await WaitHelper.WaitForPageStabilize();
    }

    /**
     * Restarts and maximise browser
     *
     */
    public static async restartAndMaximizeBrowser() {
        try {
           allureReporter.addStep('Sub-Step - Restart browser');
            await browser.reloadSession();
            await PageHelper.maximizeBrowser();
        } catch (e) {
            if (e instanceof Error) {
            allureReporter.addStep(e.message);
        }
        }
    }

    /**
     * Click on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async click(element: string, elmName?: string) {
        const name = await ElementHelper.resolveName(element, elmName);
        await WaitHelper.waitForElementToBeDisplayed(element, name, 5000);
        allureReporter.addStep(`Sub-Step - Click on ${name}`);
        return await $(element).click();
    }

    static async clickifPresent(element: string, elmName?: string) {
        const name = await ElementHelper.resolveName(element, elmName);
        try {
            allureReporter.addStep(`Sub-Step - Click on ${name} if present`);
            await WaitHelper.waitForElementToBeDisplayed(element, name, 5000);
            return await $(element).click();
        } catch (e) {
            if (e instanceof Error) {
                console.log('------------------------------->' + e.message)
                allureReporter.addStep(e.message);
            }
        }
    }

    /**
     * DblClick on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async doubleClick(element: string, elmName?: string) {
        const name = await ElementHelper.resolveName(element, elmName);
       allureReporter.addStep(`Sub-Step - Double click on ${name}`);
        await $(element).doubleClick();
    }
    /**
    * Gets the text value of an element.
    *
    * @param {string} selector - The CSS selector of the element to retrieve the text value from.
    * @param {string} name - A descriptive name for the element.
    * @returns {Promise<string>} The text value of the element as a string.
    */
    static async getText(selector: string, name: string): Promise<string> {
       allureReporter.addStep(`Sub-Step - Get text value from element: ${name}`);
        await WaitHelper.WaitForPageStabilize();
        const elem = await browser.$(selector);
        return await elem.getText();
    }

    /**
    * Gets the value of an element.
    *
    * @param {string} selector - The CSS selector of the element to retrieve the text value from.
    * @param {string} name - A descriptive name for the element.
    * @returns {Promise<string>} The text value of the element as a string.
    */
    static async getValue(selector: string, name: string): Promise<string> {
       allureReporter.addStep(`Sub-Step - Get text value from element: ${name}`);
        await WaitHelper.WaitForPageStabilize();
        const elem = await browser.$(selector);
        return await elem.getValue();
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    static async currentUrl() {
        return browser.getUrl();
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    static async goToUrl(url: string) {
        return browser.url(url);
    }
    
    /**
     * Get page title
     */
   public static async getTitle() {
        return await browser.getTitle();
    } 

    /**
     * Scroll to the element
     * @param target
     */
    public static async scrollToElement(target: string, elmName: string) {
       allureReporter.addStep(`Sub-Step - Scroll to ${elmName}`);
        return await $(target).scrollIntoView();
    }

    /**
     * Scroll and click on the element
     * @param target
     */
    public static async scrollToElementAndClick(target: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
       allureReporter.addStep(`Sub-Step - Scroll to ${name}`);
        await this.scrollToElement(target, name);
       allureReporter.addStep(`Sub-Step - Click on ${name}`);
        await this.click(target, name);
    }

    /**
     * Scroll and click twice on the element
     * @param target
     */
    public static async scrollToElementAndClickTwice(target: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
       allureReporter.addStep(`Sub-Step - Scroll to ${name}`);
        await this.scrollToElement(target, name);
       allureReporter.addStep(`Sub-Step - Click on ${name}`);
        await this.click(target, name);
       allureReporter.addStep(`Sub-Step - Click again on ${name}`);
        await this.click(target, name);
    }

    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} target
     * @param {string} attribute
     * @returns {string} attribute value
     */
    public static async getCssValue(target: string, attribute: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        const attributeValue = await (await $(target)).getCSSProperty(attribute);
        return attributeValue;
    }

    /**
     * Get all browser windows count
     */
    public static async getWindowCount() {
        const handles = await browser.getWindowHandles();
        return handles.length;
    }

    /**
     * Switch to browser tab by index
     * @param tabNumber
     */
    public static async switchToTab(tabNumber: number) {
        const handles = await browser.getWindowHandles();
        await browser.switchWindow(handles[0]);
    }

    /**
     * Close browser tab
     */
    public static async closeTab() {
        await browser.closeWindow;
    }

    /**
     * Verify if list's contents are equal
     * @param sourceList
     * @param destinationList
     */
    public static async verifyIfListContentsAreEqual(sourceList: any[], destinationList: any[]) {
        let isEquals = true;
        for (let i = 0; i < sourceList.length; i++) {
            if (!sourceList[i] === (destinationList[i])) {
                isEquals = false;
                break;
            }
        }
        return isEquals;
    }

    /**
     * Get tag name of the element
     * @param target
     */
    public static async getTagName(target: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        return await $(target).getTagName();
    }

    public static async getCurrentUrl() {
        return await browser.getUrl();
    }
}

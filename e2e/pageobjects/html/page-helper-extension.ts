import { ElementHelper } from './element-helper.ts';
import { Constants } from '../misc-utils/constants.ts';
import { WaitHelper } from './wait-helper.ts';

import allureReporter from '@wdio/allure-reporter'

export class PageHelperExtension {

    /**
     * Iterates over all the iFrame-elements passed
     * @param targets
     */
    static async switchToiFrames(target: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
           allureReporter.addStep(`Sub-Step - Switch to iframe: '${name}' by locator: ${target}`);
            await WaitHelper.waitForElementToBePresent(target, name);
            const iframe =  $(target) 
            iframe.scrollIntoView();
            await browser.switchToFrame(iframe);
    
    };

    /**
     * Perform Right Click
     * @param target
     */
    static async rightClick(target: string, elmName?: string) {
        const name = await ElementHelper.resolveName(target, elmName);
       allureReporter.addStep('Sub-Step - Perform "Right" click on '+ name);
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        await browser.$(target).moveTo();
        await $(target).click({ button: 'right' });
    };

    /**
     * Maximize browser
     */
    public static async maximizeBrowser() {
        try {
            await  browser.maximizeWindow()
        } catch (e) {
            // catch error if window cannot be maximised
        }
    };

    /**
     * This function closes current tab of browser
     * @returns {Promise<void>}
     */
    public static async closeCurrentTab() {
        await browser.executeAsync(Constants.jsScripts.windowClose);
    };

    /**
     * This method can execute 'fn' multiple times based on the {maxCount} argument
     * If any exception is thrown during execution of 'fn', then current page would be
     * refreshed and same function would be called unless maxCount value is reached
     * @param {Function} fn
     * @param {boolean} refresh
     * @param {number} maxCount
     * @returns {Promise<any>}
     */

}

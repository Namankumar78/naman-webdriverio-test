import { CoreConstants } from './core-constants.ts';
import { WaitHelper } from './wait-helper.ts';

const { DEFAULT_TIMEOUT, TIMEOUTS } = CoreConstants;
/**
 * Alert helper for general utility
 */
export class AlertHelper {

    /**
     * Accept javascript's alert
     */
    public static async acceptAlert() {
        const isAlertOpen = await browser.isAlertOpen(); //get the status of alert open or not
        if (isAlertOpen) {
            const alertText = await browser.getAlertText(); //get the alert text
            await browser.acceptAlert(); //accepts the alert popup
        }
    }

    /**
     * Cancel javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async cancelAlert(timeout: number = DEFAULT_TIMEOUT,
                                    message: string = 'Alert is not present') {
        const isAlertOpen = await browser.isAlertOpen(); //get the status of alert open or not
            if (isAlertOpen) {
                const alertText = await browser.getAlertText(); //get the alert text
                await browser.dismissAlert(); //accepts the alert popup
        }
    }

    /**
     * Handles anonymous alerts on navigating to different pages
     * @returns {Promise<void>}
     */
    public static async acceptAlertIfExists() {
        try {
            await WaitHelper.sleep(TIMEOUTS.xs);
            await browser.acceptAlert();
        } catch (e) {
            // handle alert error here
        }
    }

    /**
     * Dismiss javascript's alert if exists
     */
    public static async dismissAlertIfExists() {
        try {
            await WaitHelper.sleep(TIMEOUTS.xs);
            await browser.dismissAlert();
        } catch (e) {
        }
    }

    /**
     * Get javascript's alert text
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async getAlertText(timeout: number = DEFAULT_TIMEOUT,
                                     message: string = 'Alert text could not be retrieved') {
        return await browser.getAlertText();
    }

    /**
     * Check if alert is present
     */
    public static async isAlertPresent() {
        return await browser.isAlertOpen();
    }
}

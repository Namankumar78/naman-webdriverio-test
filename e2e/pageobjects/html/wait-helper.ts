import allureReporter from '@wdio/allure-reporter'
import { CoreConstants } from './core-constants.ts';

const { TIMEOUTS } = CoreConstants;
const timeDuration = {
  "veryShort": 2000,
  "short": 5000,
  "medium": 10000,
  "long": 15000,
  "veryLong": 20000,
  "extraLong": 30000,
  "largest": 45000,
}

export class WaitHelper {
    private selector: string;

    constructor(selector: string) {
        this.selector = selector;
      }

    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    async waitForIsShown(isShown = true): Promise<boolean | void> {
        return $(this.selector).waitForDisplayed({
          reverse: !isShown,
        });
      }

    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeDisplayed(element: string, elmName?: string,
        timeoutValue = timeDuration.veryLong, message = 'Element should be visible') {
          const name = elmName ? elmName : 'Element';
        try {
            await $(element).waitForDisplayed({ timeout: timeoutValue, timeoutMsg: message});
            allureReporter.addStep(`Sub-Step - Element '${name}' is displayed`);
            return true;
          } catch (error) {
            throw new Error(`Element with selector ${name} was not displayed`);
          }
    }
    
    static async elementIsDisplayedBool(element: string, name: string,
      timeoutValue = timeDuration.veryShort, message = 'Element should be visible') {
      try {
          allureReporter.addStep(`Sub-Step - Wait for element '${name}' to be displayed`);
          await $(element).waitForDisplayed({ timeout: timeoutValue, timeoutMsg: message});
          allureReporter.addStep(`Sub-Step - Element '${name}' is displayed`);
          return true;
        } catch (error) {
          allureReporter.addStep(`Sub-Step - Element '${name}' is not displayed`);
          return false;
        }
  }

    static async elementToBeDisplayedNoWait(element: string, elmName?: string) {
        const name = elmName ? elmName : 'Element';
          allureReporter.addStep(`Sub-Step - Wait for element '${name}' to be displayed`);
          if (await $(element).isDisplayed()) {
            return true;
          } else return false;
  }

  
    static async waitForElementEnabled(element: string, elmName?: string, timeoutValue=timeDuration.medium) {
      const name = elmName ? elmName : 'Element';
      try {
        await $(element).waitForDisplayed({ timeout: timeoutValue });
        if (await $(element).isDisplayed()) {
          return true;
        };
      } catch (error) {
       allureReporter.addStep("element not Enable");
        return false
      }
    }

  static async waitForElementClickable(element: string, elmName?: string, timeoutValue=timeDuration.short) {
    const name = elmName ? elmName : 'Element';
    try {
      await $(element).waitForDisplayed({ timeout: timeoutValue });
      if (await $(element).waitForClickable()) {
        return true;
      };
    } catch (error) {
     allureReporter.addStep("element not Clickable");
      return false
    }
   }

    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBePresent(element: string, elmName?: string, message = 'Element should be visible') {
      const name = elmName ? elmName : 'Element';
        try {
          await $(element).waitForDisplayed({ timeout: timeDuration.medium });
          if (await $(element).waitForExist({ timeout: timeDuration.medium, timeoutMsg: message })) {
            return true;
          };
        } catch (error) {
         allureReporter.addStep("element not Present");
          return false
        }
        
    }

    static async WaitForPageStabilize() {
        await WaitHelper.waitForPageToStable();
        await WaitHelper.sleepForTwoSeconds();
    }

    /**
     * Wait till complete page loading
     */
    static async waitForPageToStable() {
        browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
              timeout: 60 * 1000, // 60 seconds
              timeoutMsg: 'Message on failure'
            }
          ).catch(function(err){
            if (err instanceof Error) {
              allureReporter.addStep(err.message);
          }
          });;
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeClickable(element: string, elmName?: string, timeout = TIMEOUTS.l, message = 'Element not clickable') {
        try {
            $(element).waitForClickable({ timeout: 3000, timeoutMsg: message });
        } catch (e) {
        }
    }


    /**
     * Schedules a command to make the driver sleep for the given amount of time.
     */
    static async sleep(sleepTime = TIMEOUTS.xxs) {
        /* tslint:disable-next-line:no-browser-sleep */
        await browser.pause(sleepTime); // providing definition to sleep method
    }

    static async sleepForTwoSeconds(sleepTime = TIMEOUTS.xs) {
        /* tslint:disable-next-line:no-browser-sleep */
        await browser.pause(sleepTime); // providing definition to sleep method
    }
}

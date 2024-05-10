import { ElementHelper } from './element-helper.ts';
import { WaitHelper } from './wait-helper.ts';

export class CheckboxHelper {

    /**
     * Mark checkbox if element is not checked already
     * @param target
     * @param markChecked
     */
    static async markCheckbox(target: string, markChecked: boolean, elmName?: string, ) {
        const name = await ElementHelper.resolveName(target, elmName);
        await WaitHelper.waitForElementToBeClickable(target, name);
        const isSelected = await $(target).isSelected();
        if (isSelected !== markChecked) {
            await $(target).click();
        }
        return;
    }

    /**
     * Check if given element is checked
     * @param target
     */
    static async isCheckboxChecked(target: string, name: string) {
        await WaitHelper.waitForElementToBeDisplayed(target, name);
        return $(target).isSelected();
    }
}

// Helper class needs to interact with elements outside po file
/* tslint:disable:no-element-outside-page-class */
export class DropDownHelper {

    static getXPathForOptionValue(optionVal: string) {
        return `//option[normalize-space(.)="${optionVal}"]`;
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

}

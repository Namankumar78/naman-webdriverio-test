
import { config } from '../../../wdio.conf.ts';
import { PageHelper } from "../html/page-helper.ts";
import CommonPage  from './common-page.ts';
import CommonPageConstant from './common-page.constant.ts';
import { ExpectationHelper } from '../misc-utils/expectation-helper.ts';

export class CommonPageHelper {

    private readonly constant = CommonPageConstant.constant;

    static async open () {
        return browser.url( config.baseUrl );
    }

    public async clickOnLogout () {
        await PageHelper.click(CommonPage.logout, this.constant.logout);
    }

    public async verifyUserLogedOut () {
        await ExpectationHelper.verifyDisplayedStatus(CommonPage.login, this.constant.login);
    }

    public async clickOnCart () {
        await PageHelper.click(CommonPage.cart, this.constant.cart);
    }
}

export default new CommonPageHelper();

import { PageHelper } from "../html/page-helper.ts";
import HomePageConstant from "./home-page.constant.ts"
import { ExpectationHelper } from "../misc-utils/expectation-helper.ts";
import { WaitHelper } from "../html/wait-helper.ts";
import HomePage from "./home-page.ts";
import CommonPageConstant from "../common-page/common-page.constant.ts";
import CommonPage from "../common-page/common-page.ts";

class HomePageHelper {

    private readonly constant = HomePageConstant.constant;
    private readonly data = CommonPageConstant.data;

    public async verifyHomePage () {
        await WaitHelper.WaitForPageStabilize();
        await WaitHelper.waitForElementToBeDisplayed(CommonPage.logout);
        const title = await PageHelper.getText(CommonPage.logout, CommonPageConstant.constant.logout);
        await ExpectationHelper.verifyStringValueEqualTo(CommonPageConstant.constant.logout, title, CommonPageConstant.constant.logout);
    }

    public async searchAndSelectTheProduct() {
        let con = await WaitHelper.elementIsDisplayedBool(HomePage.product, this.data.product);
        while (!con) {
            await PageHelper.scrollToElementAndClick(HomePage.next, this.constant.next);
            con = await WaitHelper.elementIsDisplayedBool(HomePage.product, this.data.product);
        }
        await PageHelper.click(HomePage.product, this.data.product);
    }

}

export default new HomePageHelper();

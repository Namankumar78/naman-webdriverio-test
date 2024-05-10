import { CommonPageHelper } from "../common-page/common-page.helper.ts";
import { PageHelper } from "../html/page-helper.ts";
import { TextBoxHelper } from "../html/textbox-helper.ts";
import { WaitHelper } from "../html/wait-helper.ts";
import LoginPage  from "./login-page.ts";
import LoginPageConstant from "./login-page.constant.ts"
import { CommonPageConstant } from "../common-page/common-page.constant.ts";
import { ExpectationHelper } from "../misc-utils/expectation-helper.ts";

class LoginPageHelper {

    private readonly constant = LoginPageConstant.constant;
    private readonly form = LoginPage.loginForm;

    public async loginToApp (username: any, password: any) {
            await PageHelper.click(LoginPage.loginNavigationTab, this.constant.loginNavigationTab);
            await TextBoxHelper.sendKeys(this.form.username, username, false, this.constant.username);
            await TextBoxHelper.sendKeys(this.form.password, password, false, this.constant.password);
            await PageHelper.click(this.form.login, this.constant.login)
    }

    public async verifyLoginPage () {

        await WaitHelper.WaitForPageStabilize();
            await WaitHelper.waitForElementToBeDisplayed(LoginPage.loginNavigationTab);
            const title = await PageHelper.getText(LoginPage.loginNavigationTab, this.constant.loginNavigationTab);
            await ExpectationHelper.verifyStringValueEqualTo(this.constant.login, title, this.constant.login);

    }

    public async navigateToLoginPage () {
        await PageHelper.maximizeBrowser();
        await CommonPageHelper.open();
    }
}

export default new LoginPageHelper();

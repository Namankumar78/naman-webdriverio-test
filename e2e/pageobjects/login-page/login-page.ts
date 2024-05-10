import LoginPageConstant from "./login-page.constant.ts"
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    private readonly attr = LoginPageConstant.attributes;

    public get loginForm() {
        return {
            username: this.attr.id.username,
            password: this.attr.id.password,
            login: this.attr.xpath.login,
        };
    }

    public get loginNavigationTab() {
        return  this.attr.id.loginNavigationTab;
    };

}

export default new LoginPage();
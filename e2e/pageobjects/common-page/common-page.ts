import CommonPageConstant from "./common-page.constant.ts"
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CommonPage {
    private readonly attr = CommonPageConstant.attributes;

    public get home() {
        return  this.attr.id.home;
    };

    public get logout() {
        return  this.attr.id.logout;
    };

    public get login() {
        return  this.attr.id.login;
    };

    public get cart() {
        return  this.attr.id.cart;
    };
}

export default new CommonPage();
import HomePageConstant from "./home-page.constant.ts"
import CommonPageConstant from "../common-page/common-page.constant.ts";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage {
    private readonly attr = HomePageConstant.attributes;

    public get home() {
        return  this.attr.id.home;
    };

    public get product() {
        return  this.attr.xpath.product;
    };

    public get next() {
        return  this.attr.id.next;
    };

    public get logout() {
        return  CommonPageConstant.attributes.id.logout;
    };
}

export default new HomePage();
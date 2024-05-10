import { PageHelper } from "../html/page-helper.ts";
import ProductPageConstant from "./product-page.constant.ts"
import { ExpectationHelper } from "../misc-utils/expectation-helper.ts";
import { WaitHelper } from "../html/wait-helper.ts";
import ProductPage from "./product-page.ts";
import CommonPageConstant from "../common-page/common-page.constant.ts";
import { AlertHelper } from "../html/alert-helper.ts";

class ProductPageHelper {

    private readonly constant = ProductPageConstant.constant;

    public async verifyProductPage() {
        await WaitHelper.waitForPageToStable();
        const name = await PageHelper.getText(ProductPage.name, this.constant.name);
        const price = await PageHelper.getText(ProductPage.price, this.constant.price);
        await ExpectationHelper.verifyStringValueEqualTo(this.constant.name, name, CommonPageConstant.data.product);
        await ExpectationHelper.verifyStringValueEqualTo(this.constant.price, price, CommonPageConstant.data.price);
    }

    public async clickOnCartButton() {
        await PageHelper.click(ProductPage.cart, this.constant.cart);
        await AlertHelper.acceptAlertIfExists();
    }

}

export default new ProductPageHelper();

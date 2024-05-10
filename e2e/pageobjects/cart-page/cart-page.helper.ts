import { PageHelper } from "../html/page-helper.ts";
import CartPageConstant from "./cart-page.constant.ts"
import { ExpectationHelper } from "../misc-utils/expectation-helper.ts";
import CartPage from "./cart-page.ts";
import CommonPageConstant from "../common-page/common-page.constant.ts";
import { TextBoxHelper } from "../html/textbox-helper.ts";
import cartPage from "./cart-page.ts";

class CartPageHelper {

    private readonly constant = CartPageConstant.constant;
    private readonly data = CommonPageConstant.data;

    public async verifyCartPage() {
        const name = await PageHelper.getText(CartPage.name, this.constant.name);
        const price = await PageHelper.getText(CartPage.price, this.constant.price);
        await ExpectationHelper.verifyStringValueEqualTo(this.constant.name, name, this.data.product);
        await ExpectationHelper.verifyStringValueEqualTo(this.constant.price, price, this.data.cartPrice);
    }

    public async clickOnPlaceOrderButton() {
        await PageHelper.click(CartPage.placeOrder, this.constant.placeOrder);
    }

    public async clickOnCloseButton() {
        await PageHelper.scrollToElementAndClick(CartPage.closeButton, this.constant.close);
    }

    public async clickOnDelete() {
        await PageHelper.click(CartPage.delete, this.constant.delete);
    }

    public async fillPlaceOrderForm() {
        await TextBoxHelper.sendKeys(cartPage.buyerName, this.data.buyerName, false, this.constant.buyerName);
        await TextBoxHelper.sendKeys(cartPage.card, this.data.card, false, this.constant.card);
        await TextBoxHelper.sendKeys(cartPage.city, this.data.city, false, this.constant.city);
        await TextBoxHelper.sendKeys(cartPage.country, this.data.country, false, this.constant.country);
        await TextBoxHelper.sendKeys(cartPage.month, this.data.month, false, this.constant.month);
        await TextBoxHelper.sendKeys(cartPage.year, this.data.year, false, this.constant.year);
    }

    public async verifyFillPlaceOrderFormValue() {
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.buyerName, this.data.buyerName, this.constant.buyerName);
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.card, this.data.card, this.constant.card);
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.city, this.data.city, this.constant.city);
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.country, this.data.country, this.constant.country);
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.month, this.data.month, this.constant.month);
        await ExpectationHelper.verifyTextBoxHasValue(cartPage.year, this.data.year, this.constant.year);
    }

}

export default new CartPageHelper();

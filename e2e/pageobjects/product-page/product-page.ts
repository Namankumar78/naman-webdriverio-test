import ProductPageConstant from "./product-page.constant.ts"
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage {
    private readonly attr = ProductPageConstant.attributes;

    public get name() {
        return  this.attr.css.name;
    }; 

    public get price() {
        return  this.attr.css.price;
    }; 

    public get cart() {
        return  this.attr.xpath.cart;
    }; 
}

export default new ProductPage();
import CartPageConstant from "./cart-page.constant.ts"
/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage {
    private readonly attr = CartPageConstant.attributes;

    public get name() {
        return  this.attr.css.name;
    }; 

    public get price() {
        return  this.attr.css.price;
    }; 

    public get placeOrder() {
        return  this.attr.css.placeOrder;
    }; 

    public get buyerName() {
        return  this.attr.id.buyerName;
    }; 

    public get closeButton() {
        return  this.attr.xpath.closeButton;
    }; 

    public get delete() {
        return  this.attr.xpath.delete;
    }; 

    public get card() {
        return  this.attr.id.card;
    }; 

    public get city() {
        return  this.attr.id.city;
    }; 

    public get country() {
        return  this.attr.id.country;
    }; 

    public get month() {
        return  this.attr.id.month;
    }; 

    public get year() {
        return  this.attr.id.year;
    }; 
}

export default new CartPage();
class ProductPageConstant {

    public readonly constant = Object.freeze({
        name: 'Name',
        price: 'Price',
        cart: 'Cart',
    });

    public readonly attributes = Object.freeze({
        css: {
            name: '[class="name"]',
            price: '[class="price-container"]',
        },
        xpath: {
            cart: './/*[contains(@class,"btn-success")]',
        },
    });
}

export default new ProductPageConstant();
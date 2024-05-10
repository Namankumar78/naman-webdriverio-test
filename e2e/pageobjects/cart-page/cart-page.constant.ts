class CartPageConstant {

    public readonly constant = Object.freeze({
        name: 'Name',
        price: 'Price',
        cart: 'Cart',
        buyerName: 'Buyer Name',
        placeOrder: 'Place Order',
        country: 'Country',
        city: 'City',
        card: 'Card',
        month: 'Month',
        delete: 'delete',
        year: 'Year',
        close: 'Close'
    });

    public readonly attributes = Object.freeze({
        css: {
            name: '(.//*[@class="success"]//td)[2]',
            price: '(.//*[@class="success"]//td)[3]',
            placeOrder: '[class="btn btn-success"]',
        },
        id: {
            buyerName: '#name',
            country: '#country',
            city: '#city',
            card: '#card',
            month: '#month',
            year: '#year',
        },
        xpath: {
            closeButton: '//*[@id="orderModal"]//*[text()="Close"]',
            delete: "(.//*[text()='Delete'])[1]"
        },
    });
}

export default new CartPageConstant();


export class CommonPageConstant {

    public readonly data = Object.freeze({
        userName: 'kumarnaman92@outlook.com',
        password: '123456789naman@',
        product: 'MacBook Pro',
        price: '$1100 *includes tax',
        cartPrice: '1100',
        buyerName: 'Naman Kumar',
        country: 'India',
        city: 'Delhi',
        card: '411111111111111',
        month: '2',
        year: '2027',
    });

    public readonly constant = Object.freeze({
        home: 'Home',
        logout: 'Log out',
        cart: 'Cart',
        login: 'login'
    });

    public readonly attributes = Object.freeze({
        id: {
            home: '[class="nav-item active"] a',
            logout: '#logout2',
            login: '#login2',
            cart: '#cartur',
        },
        css: {
        },
    });
}

export default new CommonPageConstant();
import CommonPageConstant from "../common-page/common-page.constant.ts";

class HomePageConstant {

    public readonly constant = Object.freeze({
        home: 'Home',
        next: 'next',
    });

    public readonly attributes = Object.freeze({
        id: {
            home: '[class="nav-item active"] a',
            next: '#next2'
        },
        xpath: {
            product: `.//*[text()="${CommonPageConstant.data.product}"]`,
        },
    });
}

export default new HomePageConstant();
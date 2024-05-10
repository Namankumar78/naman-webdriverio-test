import ProductPageHelper from '../pageobjects/product-page/product-page.helper.ts';
import HomePageHelper from '../pageobjects/home-page/home-page.helper.ts';
import LoginPageHelper  from '../pageobjects/login-page/login-page.helper.ts';
import CommonPageConstant from '../pageobjects/common-page/common-page.constant.ts';
import { addStep } from '@wdio/allure-reporter';
import CommonPageHelper from '../pageobjects/common-page/common-page.helper.ts';
import CartPageHelper from '../pageobjects/cart-page/cart-page.helper.ts';

describe('Validate the add to cart functionality', () => {

    beforeAll(async () => {

        addStep("Step - 1");
        addStep("Precondition >> Navigate to the login page");
        await LoginPageHelper.navigateToLoginPage();

      });

        it('User should be able to login with valid credentials', async () => {

            addStep("Step - 2");
            addStep("Step >> Login to the application");
            await LoginPageHelper.loginToApp(CommonPageConstant.data.userName, CommonPageConstant.data.password);

            addStep("Verification >> verify the Home page");
            await HomePageHelper.verifyHomePage();

        });

        it('User should be able to Search and select the product and navigate to the product page', async () => {
        
            addStep("Step - 3");
            addStep("Step >> Search and Select the product from the home page");
            await HomePageHelper.searchAndSelectTheProduct();

            addStep("Verification >> Verify the Product page");
            await ProductPageHelper.verifyProductPage();
        
        });
    
        it('User should be able to add product to the cart', async () => {
           
            addStep("Step - 4");
            addStep("Step >> Click on cart button");
            await ProductPageHelper.clickOnCartButton();

            addStep("Step - 5");
            addStep("Step >> Navigate to the cart Page");
            await CommonPageHelper.clickOnCart();

            addStep("Verification >> Product added to the cart");
            await CartPageHelper.verifyCartPage();

        })
    
        it('User should be able to fill the place order form', async () => {

            addStep("Step - 6");
            addStep("Step >> Clicck on Please Order button");
            await CartPageHelper.clickOnPlaceOrderButton();

            addStep("Step - 7");
            addStep("Step >> Fill the place order form");
            await CartPageHelper.fillPlaceOrderForm();

            addStep("Verification >> Verify the place order form value");
            await CartPageHelper.verifyFillPlaceOrderFormValue();

        });

    afterAll(async () => {

        addStep("Postcondition >> User should be able to Logout");

        addStep("Step - 8");
        addStep("Step >> Click on Close Button");
        await CartPageHelper.clickOnCloseButton();
        
        addStep("Step - 9");
        addStep("Step >> Click on Delete Button");
        await CartPageHelper.clickOnDelete();
        
        addStep("Step - 10");
        addStep("Step >>Click on Logout Button");
        await CommonPageHelper.clickOnLogout();

        addStep("Verification >> Verify User Logout SuccesFully");
        await CommonPageHelper.verifyUserLogedOut();

    });
});


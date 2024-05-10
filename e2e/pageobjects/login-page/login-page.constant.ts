class LoginPageConstant {

    public readonly constant = Object.freeze({
        username: 'User Name',
        password: 'Password',
        loginNavigationTab: 'Navigation Login tab',
        login: 'Log In',
    });

    public readonly attributes = Object.freeze({
        id: {
            username: '#loginusername',
            password: '#loginpassword',
            loginNavigationTab: '#login2',
        },
        css: {
        },
        xpath: {
            login: ".//button[text()='Log in']",
        },
    });
}

export default new LoginPageConstant();
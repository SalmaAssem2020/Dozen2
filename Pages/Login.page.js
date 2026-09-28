const { test } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;

        this.userName = '#Username';
        this.userPassword = '#Password';
        this.loginButton = '.btn-primary';
    }

    async Login(userName, password) {
        await this.page.type(this.userName, userName);
        await this.page.type(this.userPassword, password);
        await this.page.click(this.loginButton);
    }


}

module.exports = LoginPage;
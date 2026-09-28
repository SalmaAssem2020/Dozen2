const { test } = require('@playwright/test');

class CDLoginPage {

    constructor(page) {
        this.page = page;
        this.azureUserName = '#i0116';
        this.azureNext = '#idSIButton9';
        this.azureUserPassword = '#i0118';
        this.azureLoginButton = '#idSIButton9';
        this.openIdUserName = '[placeholder="yours\\@example\\.com"]';
        this.openIdUserPassword = '[placeholder="your password"]';
        this.openIdLoginButton = '.auth0-lock-submit';
    }

    async LoginWithAzure(userName, password) {
        //This a function to login in Dozen CD
        await this.page.waitForTimeout(3000);
        await this.page.type(this.azureUserName, userName);
        await this.page.click(this.azureNext);
        await this.page.type(this.azureUserPassword, password);
        await this.page.click(this.azureLoginButton);
        //  await this.page.click(this.loginButton);
    }

    async LoginWithOpenId(userName, password) {
        //This a function to login in Dozen CD
        await this.page.waitForTimeout(3000);
        await this.page.type(this.openIdUserName, userName);
        await this.page.waitForTimeout(1000);
        await this.page.type(this.openIdUserPassword, password);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.openIdLoginButton);
    }


}

module.exports = CDLoginPage;
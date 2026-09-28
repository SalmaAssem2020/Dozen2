const { test } = require('@playwright/test');

class CDHomePage {

    constructor(page, context) {
        //locators
        this.page = page;
        this.context = context;
        this.flyoutMenuButton = '//div[contains(@x-init,"Auto Flyout Menu")]//button';
        this.flyoutMenu = '//div[contains(text(),"Automation Section")]//parent::div[@class="dozen-mobile-megamen-flyout-menu"]';
        this.flyoutHomePageButton = '//div[contains(text(),"Automation Section")]//parent::div[@class="dozen-mobile-megamen-flyout-menu"]//a[text()="Home"]';
        this.flyoutTwitterButton = '//div[contains(text(),"Automation Section")]//parent::div[@class="dozen-mobile-megamen-flyout-menu"]//a[text()="Twitter"]';
        this.title = '//title';
        this.sidebarAutoIcon = '//span[text()="Auto"]';
        this.sidebarMenu = '//div[contains(text(),"Auto Section")]/parent::div';
        this.sidebarHomeButton = '//div[contains(text(),"Auto Section")]/parent::div//a[text()="Home"]';
        this.sidebarTwitterButton = '//div[contains(text(),"Auto Section")]/parent::div//a[text()="Twitter"]';
    }

    async clickOnFlyoutMenuButton() {
        await this.page.waitForSelector(this.flyoutMenuButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.flyoutMenuButton);
        await this.page.waitForTimeout(2000);
    }

    async clickOnExternalLink(link) {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.page.click(link) // Opens a new tab
        ])
        await newPage.waitForLoadState();
        let newURL = await newPage.url();
        return newURL;
    }

    async isMenuClosed(menuLocator) {
        await this.page.locator(menuLocator);
        let styleValue = await this.page.getAttribute(menuLocator, 'style');
        if (styleValue.includes('display: none;')) {
            return true;
        } else {
            return false;
        }
    }

    async clickOnInternalLink(myLocator) {

        await this.page.click(myLocator);
        let url = await this.page.url();
        return url;
    }

    async clickOnSidebarMenuButton() {
        await this.page.waitForSelector(this.sidebarAutoIcon, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.sidebarAutoIcon);
        await this.page.waitForTimeout(2000);
    }

}
module.exports = CDHomePage;
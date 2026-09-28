const { test } = require('@playwright/test');

class CDMegaMenuPage {

    constructor(page, context) {
        //locators
        this.page = page;
        this.context = context;
        this.automationButton = '//button[contains(text(),"Automation Header")]';
        this.automationItemsContainer = '//a[text()="Automation - About Us"]/ancestor::div[@x-ref="panel"]';
        this.internalLink1 = '//div[contains(@class,"megamen-items-container-sublevel")]//a[text()="Automation - About Us"]';
        this.externalLink1 = '//div[contains(@class,"megamen-items-container-sublevel")]//a[text()="Automation - Google"]';
        this.internalLink2 = '//div[contains(@class,"megamen-items-container-sublevel")]//a[text()="Automation - Partners"]';
        this.externalLink2 = '//div[contains(@class,"megamen-items-container-sublevel")]//a[text()="Automation - Facebook"]';
    }

    async ClickOnAutomationButton() {
        await this.page.waitForSelector(this.automationButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.automationButton);
    }

    async ValidateIsAutomationContainerExists() {
        //let container = this.page.locator(this.firstMegaMenuItemsContainer);
        let styles = await this.page.getAttribute(this.automationItemsContainer, 'style');
        let stylesArray = await styles.split(";");
        for (let i = 0; i < stylesArray.length; i++) {
            if (stylesArray[i] == "display: none") {
                return false;
            }
        }
        return true;

    }
    async ValidateInternalLinksNavigation(link) {

        let hrefLink = await this.page.getAttribute(link, 'href')
        await this.page.click(link);
        return hrefLink;
    }

    async ValidateExternalNavigation(link) {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.page.click(link) // Opens a new tab
        ])
        await newPage.waitForLoadState();
        let newURL = await newPage.url();
        return newURL;
    }


    async ValidateUrlChange(link) {

        await this.page.click(link);
        let url = await this.page.url();
        return url;



    }
}
module.exports = CDMegaMenuPage;
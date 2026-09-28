const { test, expect } = require('@playwright/test');



class HorizonPage {

    constructor(page) {
        this.page = page;

        this.siteTree = '//h5[@title="Site tree"]';

        this.newButton = '//*[contains(text(), "Create new")]';
        this.listingPage = '//button[text() = " Listing Page"]';
        this.pageTextbox = '//span[@contenteditable="true"]';

        this.contentItem = '//a[@class="breadcrumb-home-icon"]/span';
        this.Details = 'div.ng-spd-accordion-header-content';
        this.itemPath = '//p[contains(@title, "/sitecore/content/DoZen")]';
        this.publishItemButton = '//button[contains(text(), "Publish item") and @_nghost-hrz-c37]';


        this.gridLayout = '//div[contains(@class, "content") and text() = "Grid layout"]';
        this.size = '//div[descendant::div[contains(text(), "Size")] and @class="editing-control" and not (@hidden)]//button[@class="ng-spd-droplist-toggle outlined"]';
        this.BGFit = '//div[descendant::div[contains(text(), "BG Fit")] and @class="editing-control" and not (@hidden)]//button[@class="ng-spd-droplist-toggle outlined"]';

    }

    async CreateNewListingPage(Title) {
        await this.page.click(this.newButton);
        await this.page.click(this.listingPage);
        await this.page.type(this.pageTextbox, Title);
        await this.page.click(this.siteTree);
    }

    async expandSection(section) {
        //Wait for Section to be displayed
        let divSection = `//button[descendant::div[text() = '${section}']]`;
        await this.page.waitForSelector(divSection, { waitFor: "visible", timeout: 8000 });

        let sectionExpandButton = `//button[descendant::div[text() = '${section}']]//i[@class = "spd spd-arrow-down"]`;
        let x = await this.page.$$(`//button[descendant::div[text() = '${section}']]//i[@class = "spd spd-arrow-down"]`);
        if (x.length > 0)
            await this.page.click(sectionExpandButton);

    }

    async selectSize(size) {
        await this.expandSection('Grid layout');

        await this.page.click(this.size);

        this.sizeToSelect = `//ng-spd-droplist-item[descendant::div[@title='${size}']]`;
        await this.page.click(this.sizeToSelect);
    }

    async selectBGFit(BGFit) {
        await this.expandSection('Styling');
        await this.page.click(this.BGFit);

        this.BGFitToSelect = `//ng-spd-droplist-item[descendant::div[@title='${BGFit}']]`;
        await this.page.click(this.BGFitToSelect);
    }

    async selectFrame(divToSelect) {
        let frame = await (await this.page.$('iframe')).contentFrame();
        await frame.waitForSelector(divToSelect, { waitFor: "visible", timeout: 20000 });
        await frame.click(divToSelect);
    }

    async getItemPathForCD() {
        await this.page.waitForSelector(this.Details, { waitFor: "visible", timeout: 20000 });
        await this.page.click(this.Details);
        await this.page.waitForSelector(this.itemPath, { waitFor: "visible", timeout: 20000 });
        let fullPath = await this.page.$eval(this.itemPath, el => el.title);
        var splitedStrings = fullPath.split('/Home/');
        return splitedStrings[1];
    }

    async publishButton() {
        await this.page.click(this.publishItemButton);
        await this.page.waitForSelector(this.publishItemButton, { timeout: 7000 });
        await this.page.waitForTimeout(1000);
    }

}

module.exports = HorizonPage;
const { test } = require('@playwright/test');

class CDLanguageSwitcherComponent {

    constructor(page, context) {
        //locators
        this.page = page;
        this.context = context;
        this.flyoutmenu = '//div[contains(@x-init,"Auto Flyout Menu")]';
        this.languageSwitcher = "//div[contains(@x-init,'Auto Flyout Menu')]/following-sibling::div//div[contains(@class,'lang')]/parent::div[@class='dozen-mobile-megamen-flyout-menu-item dz-flyout-megamenu-item']"
        this.spanishButton = '//div[contains(@x-init,"Auto Flyout Menu")]/following-sibling::div//ul/li[@data-language-code="es"]';
        this.englishButton = '//div[contains(@x-init,"Auto Flyout Menu")]/following-sibling::div//ul/li[@data-language-code="en"]';
        this.arabicButton = '//div[contains(@x-init,"Auto Flyout Menu")]/following-sibling::div//ul/li[@data-language-code="ar"]';
        this.firstTile = "(//div[contains(@class,'dozen-tile-component')])[1]"
    }

    async ClickOnAutomationFlyoutButton() {
        await this.page.waitForSelector(this.flyoutmenu, { waitFor: "visible", timeout: 80000 });
        await this.page.click(this.flyoutmenu);
    }

    async ClickSpanishLanguage(){
        await this.page.waitForSelector(this.spanishButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.spanishButton);
    }

    async ClickEnglishLanguage(){
        await this.page.waitForSelector(this.englishButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.englishButton);
    }

    async ClickArabicLanguage(){
        await this.page.waitForSelector(this.arabicButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.arabicButton);
    }
}
module.exports = CDLanguageSwitcherComponent;
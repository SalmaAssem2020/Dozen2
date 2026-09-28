const { test } = require('@playwright/test');

class CDQuickAppsPage {

    constructor(page, context) {
        //locators
        this.page = page;
        this.context = context;
        this.quickAppsChildrenList = '//h3[text()="Automation Children List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]';
        this.quickAppsSpecificList = '//h3[text()="Automation Specific List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]';
        this.quickAppsQueryList = '//h3[text()="Automation Query List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]';
        this.quickAppsSearchScopeList = '//h3[text()="Automation Search Scope List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]';
        this.personalizeButtonInChildrenList = '//h3[text()="Automation Children List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]//div[@class="quick-apps__item quick-apps__item--personalize"]';
        this.noFavAppsMsg = '(//div[@class="fav-container quick-apps_no-data"]//p)[1]';
        this.closeButtonInPersonalizePopup = '//h2[@id="modal-title-2"]/following-sibling::button[@class="close close-btn"]';
        this.personalizePopup = '(//div[@class="dozen-modal-alpine_modal-dialog"])[2]';
        this.searchInput = '//div[@aria-labelledby="modal-title-2"]//input[@class="form-control input-field"]';
        this.searchBody = '//div[@aria-labelledby="modal-title-2"]//div[@class="search-body"]//span[@class="quick-apps__item-text"]';
        this.favIconForFirstApp = '(//div[@aria-labelledby="modal-title-2"]//div[@class="search-body"]//i)[1]';
        this.deleteIconForFirstApp = '(//div[@aria-labelledby="modal-title-2"]//div[@class="fav-container"]//i)[1]';
        this.favAppsInPersonalizePopup = '//div[@aria-labelledby="modal-title-2"]//div[@class="fav-container"]//span[@class="quick-apps__item-text"]';
        this.calculatorApssInChildrenList = '//h3[text()="Automation Children List"]/ancestor::div[contains(@class,"dozen-quick-apps__toolbar-heading-label")]//span[text()="Calculator1"]';
        this.searchBoxInCategoriesList = '//h2[text()="Automation Categories List"]/parent::div//input[@class="form-control input-field"]';
        this.quickAppsTitleInCategoriesList = '//h2[text()="Automation Categories List"]/parent::div//span[@class="quick-apps__item-text"]';
        this.categoriesTitle = '//h2[text()="Automation Categories List"]/parent::div//a[contains(@class,"block quick-apps__category-title has-children category")]';
        this.automationCategoriesSearchContainer = '//h2[text()="Automation Categories List"]/parent::div//a[text()=" Automation Category1"]/parent::div/parent::div';
    }

    async clickOnPersonalizeButtonForChildrenList() {
        await this.page.waitForSelector(this.personalizeButtonInChildrenList, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.personalizeButtonInChildrenList);
        await this.page.waitForTimeout(2000);
    }

    async closePersonalizePopupForChildrenList() {
        await this.page.waitForSelector(this.closeButtonInPersonalizePopup, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.closeButtonInPersonalizePopup);
        await this.page.waitForTimeout(2000);
    }

    async searchForApp(searchValue) {
        await this.page.waitForSelector(this.searchInput, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.searchInput);
        await this.page.type(this.searchInput, searchValue);
        await this.page.waitForTimeout(1000);
        let elements = await this.page.$$(this.searchBody);
        if (elements.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async addQuickAppToFavorites(appName) {
        await this.page.click(`//div[@class="search-container"]//span[text()="${appName}"]`);
        await this.page.click(this.favIconForFirstApp, { force: true });
        let elements = await this.page.$$(this.favAppsInPersonalizePopup);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                let val = await elements[i].innerText();
                if (val.includes(appName)) {
                    return true;
                }
            }
        }
        return false;
    }

    async deleteQuickAppFromFavorites(appName) {
        await this.page.waitForTimeout(1000);
        await this.page.click(`//div[@class="fav-container"]//span[text()="${appName}"]`);
        await this.page.click(this.deleteIconForFirstApp, { force: true });
        let elements = await this.page.$$(this.favAppsInPersonalizePopup);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                let val = await elements[i].innerText();
                if (val.includes(appName)) {
                    return false;
                }
            }
        }
        return true;
    }

    async reloadThePage() {

        await Promise.all([
            page.waitForNavigation(),
            page.locator(this.closeButtonInPersonalizePopup).click()
        ]);
    }

    async searchForAppInCategoriesList(searchValue) {
        let result = false;
        await this.page.waitForSelector(this.searchBoxInCategoriesList, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.searchBoxInCategoriesList);
        await this.page.type(this.searchBoxInCategoriesList, searchValue);
        await this.page.waitForTimeout(1000);
        let elements = await this.page.$$(this.quickAppsTitleInCategoriesList);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                let value = await elements[i].innerText();
                if (!value.includes(searchValue)) {
                    return false;
                } else {
                    result = true;
                }
            }
        }
        return result;
    }

    async searchForCaregoryInCategoriesList(searchValue) {
        let result = false;
        await this.page.type(this.searchBoxInCategoriesList, searchValue);
        await this.page.waitForTimeout(2000);
        let elements = await this.page.$$(this.categoriesTitle);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                let value = await elements[i].innerText();
                let className = await this.page.getAttribute('(' + this.categoriesTitle + `//i)[${i + 1}]`, 'class');
                let isIconExpanded = className.includes('fa-chevron-up');
                if (!value.includes(searchValue) || isIconExpanded == false) {
                    return false;
                } else {
                    result = true;
                }
            }
        }
        return result;
    }

    async clickOnCategories(isExpand) {
        let elements = await this.page.$$(this.categoriesTitle);
        let isIconExpanded = false;
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                //let icon = await this.page.locator('(' + this.categoriesTitle + `//i)[${i + 1}]`);
                await this.page.click('(' + this.categoriesTitle + `//i)[${i + 1}]`);
                let className = await this.page.getAttribute('(' + this.categoriesTitle + `//i)[${i + 1}]`, 'class');
                if (isExpand == true) {
                    isIconExpanded = className.includes('fa-chevron-up');
                } else {
                    isIconExpanded = className.includes('fa-chevron-down');
                }
            }
            return isIconExpanded;
        }
        return true;

    }

    async isPersonalizePopupClosed(){
        let styleValue = await this.page.getAttribute(this.personalizePopup, 'style');
        if (styleValue.includes('display: none;')) {
            return true;
        } else {
            return false;
        }
    }


}
module.exports = CDQuickAppsPage;
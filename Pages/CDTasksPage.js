const { test } = require('@playwright/test');

class CDTasksPage {

    constructor(page, context) {
        //locators
        this.page = page;
        this.context = context;
        this.tasks = '//div[@class="dz-apps-container dozen-app-elevation dozen-app-rounded "]';
        this.searchbox = '//input[@class="dz-advsearchbox-input"]';

    }

    async searchForTask(searchValue) {
        let result = false;
        await this.page.waitForSelector(this.searchbox, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.searchbox);
        await this.page.type(this.searchbox, searchValue);
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

}
module.exports = CDTasksPage;
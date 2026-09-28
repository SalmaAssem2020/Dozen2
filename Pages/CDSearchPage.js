const { test, expect } = require('@playwright/test');
const Environment = require('../Data/Environment');

class CDSearchPage {

    constructor(page) {
        this.page = page;
        this.searchICon = '//a[contains(@class,"dozen-mobile-megamen-show-search show-search")]';
        //this.searchBox = '.dozen-desktop-megamen-flex .row';
        this.searchInbut = "//div[@class='dozen-desktop-megamen-flex search-desktop']//input[@class='search-box-input tt-input']";
        this.topSearchInput = "//div[contains(@class,'search-desktop')]//input[@class='search-box-input tt-input']";
        //'(//input[@class="search-box-input tt-hint"])[2]';
        this.closeHideSearchBox = '.dozen-mobile-megamen-hide-search svg';
        this.sortList = '//select[@id="flatSortingList"]';
        this.publishDates = '//li//span[@class="dz-publish-date-text dz-text"]//span';
        this.titles = '//li//h3[@class="dz-title"]';
        this.cardType = '//span[@class="dz-content-type-text dz-text"]';
        this.featuredInput = '//p[@data-facetvalue="Featured"]//input';
        this.mandatoryReadingInput = '//p[@data-facetvalue="Mandatory%20Reading"]//input';
        this.newInput = '//p[@data-facetvalue="New"]/input';
        this.pinIcon = '//span[@class="dz-pinas-text dz-text"]';
        this.activity = '//span[@class="dz-content-type-text dz-text"]';
        this.publishDateFromInput = '//h4[contains(text(),"Published Date")]/parent::div/parent::div//div[@class="from-date"]//input';
        this.publishDateToInput = '//h4[contains(text(),"Published Date")]/parent::div/parent::div//div[@class="to-date"]//input';
        this.startDateInput = '//h4[contains(text(),"Start Date")]/parent::div/parent::div//div[@class="from-date"]//input';
        this.endDateInput = '//h4[contains(text(),"End Date")]/parent::div/parent::div//div[@class="to-date"]//input';
        this.month = '.ui-datepicker-month';
        this.year = '.ui-datepicker-year';
        this.cardsPublishDates = '//span[@class="dz-publish-date-text dz-text"]//span';
        this.eventTab = '//p[@data-facetvalue="Event"]';
        this.searchResults = "//div[contains(@class,'dozen-default-search-results')]";
        this.searchHeader = "//div[@class='dz-page-header-title']";
    }

    async ClickOnSearchIcon() {
        await this.page.waitForSelector(this.searchICon, { waitFor: "visible", timeout: 3000 });
        await this.page.click(this.searchICon);
    }

    async SearchFor(searchData) {
        await this.page.waitForSelector(this.topSearchInput, { waitFor: "visible", timeout: 3000 });
        await this.page.fill(this.topSearchInput, searchData);
        //await this.page.waitForSelector(`text=${searchData}[1]`, { waitFor: "visible", timeout: 3000 });
        await this.page.locator(`text=${searchData}`).nth(1).click();
    }

    async ClearSearchBox() {
        await this.page.fill(this.searchInbut, '');
        await this.page.locator(searchInbut).press('Enter');
    }

    async OpenDeafultSearchPage() {
        await this.page.goto(`${Environment.CDURL}Search`, { waitUntil: 'networkidle' });
        //await expect(this.page.locator(this.searchHeader)).toBeVisible();
        await this.page.waitForSelector(this.searchInbut, { waitFor: "visible", timeout: 20000 });

    }

    async OpenSearchPageFor(searchData) {
        await this.page.goto(`${Environment.CDURL}Search#dozen-search-center_e=0&dozen-search-center_q=${searchData}`, { waitUntil: 'networkidle' });

    }

    async HideSearchBox() {
        await this.page.click(this.closeHideSearchBox);
    }

    async CheckSearchResult(title) {
        await this.waitLoading();
        await this.page.waitForTimeout(1000);
        let elements = await this.page.$$('//div[contains(@class,"dozen-card")]//h3');
        //await this.page.locator('//div[contains(@class,"dozen-card")]//h3');
        let isTrue = false;
        console.log(elements.length);
        for (let i = 0; i < elements.length; i++) {
            let innerVal = await elements[i].innerText();
            console.log(innerVal);
            if (!innerVal == title) {
                return false;
            } else {
                isTrue = true;
            }
        }

        return isTrue;
    }

    async ValidateIsTheFirstThreeCardsContains(data) {
        let elements = await this.page.$$(`//li//*[contains(text(),"${data}")]`);
        let result = true;
        for (let i = 0; i < 3; i++) {
            let innerVal = await elements[i].innerText();
            result = innerVal.includes(data);

            if (result == false) {
                return false;
            }
        }
        return result;
    }

    async SortBy(option) {
        let myList = await this.page.locator(this.sortList);
        await myList.selectOption(option);
        await this.waitLoading();
    }

    async ValidateSortByNewest() {
        let elements = await this.page.$$(`//li//*[contains(text(),"${data}")]`);
        let result = false;
        for (let i = 0; i < 3; i++) {
            let innerVal = await elements[i].innerText();
            result = innerVal.includes(data);
            if (result == false) {
                return false;
            }
        }
        return result;
    }

    async IsSortedAscending() {
        let locators = await this.page.$$(this.titles);
        let elements = [];
        //  let elements = await this.page.$$eval(this.titles, el => el.innerText);
        for (let i = 0; i < locators.length; i++) {
            await elements.push(locators[i]);
        }
        let sortedList = elements.sort();
        let result = false;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == sortedList[i]) {
                result = true;
            } else {
                return false;
            }
        }
        return result;
    }


    async IsSortedDescending() {
        let locators = await this.page.$$(this.titles);
        let elements = [];
        //  let elements = await this.page.$$eval(this.titles, el => el.innerText);
        for (let i = 0; i < locators.length; i++) {
            elements.push(locators[i]);
        }
        let sortedList = elements.reverse();
        let result = false;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == sortedList[i]) {
                result = true;
            } else {
                return false;
            }
        }
        return result;
    }

    async ValidateTabContent(tabName) {
        let tab = `//p[@data-facetvalue="${tabName}"]`;
        let isDisplayed = await this.page.locator(tab).isVisible();
        let result = false;
        if (isDisplayed) {
            await this.page.click(tab);
            await this.waitLoading();
            let types = await this.page.$$(this.cardType);
            for (let i = 0; i < types.length; i++) {
                let type = await types[i].innerText();
                if (type == tabName) {
                    result = true;
                } else {
                    return false;
                }
            }
            return result;
        } else {
            return true;
        }
    }

    async ClickOnFeaturedButton() {
        await this.waitLoading();
        await this.page.waitForSelector(this.featuredInput, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.featuredInput);
    }

    async ClickOnMandatoryReadingButton() {
        await this.waitLoading();
        //await this.page.waitForSelector(this.mandatoryReadingInput, { waitFor: "attached", timeout: 8000 });
        await this.page.waitForSelector(this.mandatoryReadingInput, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.mandatoryReadingInput);
        //this.page.locator(this.mandatoryReadingInput).click();
        //this.page.click(this.mandatoryReadingInput);
    }

    async ClickOnNewButton() {
        await this.waitLoading();
        //await this.page.waitForSelector(this.newInput, { waitFor: "visible", timeout: 8000 });
        //await this.page.locator(this.newInput).check();

        await this.page.waitForSelector(this.newInput, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.newInput);
        //await this.page.waitForSelector
        //this.page.click(this.newInput);
    }

    async waitLoading() {

        const locator = this.page.locator(this.searchResults);
        await this.page.waitForSelector(this.searchResults, { waitFor: "visible", timeout: 10000 });
        await this.page.waitForTimeout(1000);
        await expect(locator).not.toHaveClass(/loading-in-progress/, { timeout: 20000 });

    }

    async ValidatePinIconsInTheFirstPage(iconName) {
        this.waitLoading();
        let pinIcons = await this.page.$$(this.pinIcon);
        let test=false;
        for (let i = 0; i < pinIcons.length; i++) {
            let icon = await pinIcons[i].innerText();
            if (!icon.includes(iconName)) {
                return false;
            }
            test = true;
        }
        return test;
    }

    async ValidatePersonActivityInTheFirstPage(activityName) {
        let activityNameWithoutSpace = activityName.trim();
        activityNameWithoutSpace = activityName.replace(' ', '%20');
        let locatororOfCheckbox = '//p[@data-facetvalue=\"' + activityNameWithoutSpace + '\"]//input';

        await this.page.waitForSelector(locatororOfCheckbox, { waitFor: "visible", timeout: 10000 });
        await this.page.click(locatororOfCheckbox);

        await this.waitLoading();

        let activities = await this.page.$$(this.activity);
        if(activities.length==0){
            return false;
        }
        for (let i = 0; i < activities.length; i++) {
            if (i => 10) {
                break;
            }
            let activity = await activities[i].innerText();
            if (activity != activityName) {
                return false;
            }
        }
        return true;
    }

    async selectPublishDateRange(fromDate, toDate) {

        let fromArray = fromDate.split("-");
        let toArray = toDate.split("-");

        //click on the from button
        await this.page.click(this.CheckSearchResult.publishDateFromInput);
        //select the month
        await this.page.selectOption(this.month, fromArray[1]);
        //select the year
        await this.page.selectOption(this.year, fromArray[2]);
        //select the day
        await this.page.locator(`a:has-text("${fromArray[0]}")`).click();

        //click on to button
        await this.page.click(this.CheckSearchResult.publishDateToInput);
        //select the month
        await this.page.selectOption(this.month, toArray[1]);
        //select the year
        await this.page.selectOption(this.year, toArray[2]);
        //select the day
        await this.page.locator(`a:has-text("${toArray[0]}")`).click();
    }

    async ValidateCardsPublishDate() {
        let publishDates = await this.page.$$(this.cardsPublishDates);
        let datesArray = [];
        for (let i = 0; i < publishDates.length; i++) {
            let xpathValue = `(${this.cardsPublishDates})[${i + 1}]`;
            let d = await this.page.getAttribute(xpathValue, 'dozen-date-iso');
            d = d.substring(0, 8);
            let year = d.substring(0, 4);
            let month = d.substring(4, 6);
            let day = d.substring(6, 8);
            let date = new Date(year + "/" + month + "/" + day);
            datesArray.push(date);
        }
        return datesArray;
    }


    async IsCardsSortedByNewest() {
        let dates = await this.ValidateCardsPublishDate();
        for (let i = 0; i < dates.length; i++) {
            if (dates[i] < dates[i + 1]) {
                return false;
            }
        }
        return true;
    }

    async setPublishDate(fromDate, toDate) {
        let fromDateArray = await fromDate.split('/');
        let toDateArray = await toDate.split('/');
        //click on "From" input
        await this.page.click(this.publishDateFromInput);
        //select the month
        await this.page.selectOption(this.month, { label: `${fromDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${fromDateArray[2]}` });

        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${fromDateArray[0]}"]`).click();

        await this.waitLoading();

        //Click on "To" input
        await this.page.click(this.publishDateToInput);

        //await this.page.click(this.month);
        //select the month
        await this.page.selectOption(this.month, { label: `${toDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${toDateArray[2]}` });
        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${toDateArray[0]}"]`).click();

        await this.waitLoading();

    }


    async SetStartDate(startDate) {
        let startDateArray = await startDate.split('/');
        //click on "From" input
        await this.page.click(this.startDateInput);
        //select the month
        await this.page.selectOption(this.month, { label: `${startDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${startDateArray[2]}` });

        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${startDateArray[0]}"]`).click();

        await this.waitLoading();
    }

    async SetEndDate(endDate) {
        let endDateArray = await endDate.split('/');
        //click on "To" input
        await this.page.click(this.endDateInput);
        //select the month
        await this.page.selectOption(this.month, { label: `${endDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${endDateArray[2]}` });

        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${endDateArray[0]}"]`).click();

        await this.waitLoading();
    }

    async IsCardsBetweenDates(fromDate, toDate) {
        let startDate;
        let endDate;
        let dates = await this.ValidateCardsPublishDate();
        if (startDate != null) {
            startDate = new Date(fromDate);
        }
        if (endDate != null) {
            let endDate = new Date(toDate);
        }
        for (let i = 0; i < dates.length; i++) {
            if (startDate != null && dates[i] < startDate) {
                return false;
            }
            if (endDate != null && dates[i] > endDate) {
                return false;
            }
        }
        return true;
    }

    async ClickOnEventsTab() {
        await this.page.click(this.eventTab);
    }

}

module.exports = CDSearchPage;
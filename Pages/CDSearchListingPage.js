const { test, expect } = require('@playwright/test');
const Environment = require('../Data/Environment');

class CDSearchListingPage {

    constructor(page) {
        this.page = page;
        this.searchFilterIcon = '//div[@class="dozen-search-filter"]';
        this.searchContentFilter = '//div[@class="dozen-search-filter-area dozen-search-side-filter"]';
        this.sortResultsIcon = '//select[@id="flatSortingList"]';
        this.searchICon = '//a[contains(@class,"dozen-mobile-megamen-show-search show-search")]';
        this.cardType = '//span[@class="dz-content-type-text dz-text"]';
       this.sortList = '//select[@id="flatSortingList"]';
        this.selectCategory = '(//select[@class="facet-dropdown-select"])[1]';
        this.selectPinnedAs = '(//select[@class="facet-dropdown-select"])[2]';
        this.selectTags = '(//select[@class="facet-dropdown-select"])[3]';
        this.searchInbut = '(//input[@class="search-box-input tt-input"])[3]';
        this.cardType = '//span[@class="dz-content-type-text dz-text"]';
        this.iconyellow = '//span[@class="dz-pinas-text dz-text"]'
        this.startDateFromInput = '//h4[contains(text(),"Start Date")]/parent::div/parent::div//div[@class="from-date"]//input';
        this.startDateToInput = '//h4[contains(text(),"Start Date")]/parent::div/parent::div//div[@class="to-date"]//input';
        this.endDateFromInput = '//h4[contains(text(),"End Date")]/parent::div/parent::div//div[@class="from-date"]//input';
        this.endDateToInput = '//h4[contains(text(),"End Date")]/parent::div/parent::div//div[@class="to-date"]//input';
        this.month = '.ui-datepicker-month';
        this.year = '.ui-datepicker-year';
       this.cardsEndDates = "//span[@class='dz-text']/span[2]";
       this.cardsStartDates = "//span[@class='dz-text']/span[1]";
        this.cardsPublishDatesNewest = '//span[@class="dz-publish-date-text dz-text"]//span';
        this.publishDateFromInput = '//h4[contains(text(),"Published Date")]/parent::div/parent::div//div[@class="from-date"]//input';
        this.publishDateToInput = '//h4[contains(text(),"Published Date")]/parent::div/parent::div//div[@class="to-date"]//input';

        this.eventTab = '//p[@data-facetvalue="Event"]';
        this.searchResults = "//div[contains(@class,'dozen-default-search-results')]";
        this.searchHeader = "//div[@class='dz-page-header-title']";
        this.titles = '//li//h3[@class="dz-title"]';
        this.filter='//button[@class="dozen-search-filter-button"]';
    }
    async OpenEventsPage() {
        await this.page.goto(`${Environment.CDURL}en/DZ3-Release-3/Monica-Modules/Events`, { waitUntil: 'networkidle' });
         await this.page.waitForSelector(this.searchInbut, { waitFor: "visible", timeout: 20000 });

    }

    async OpenFilterButton() {
        
         await this.page.waitForSelector(this.filter, { waitFor: "visible", timeout: 20000 });
         await this.page.click(this.filter);

    }

    async OpenCategory() {

        await this.page.waitForSelector(this.selectCategory, { waitFor: "visible", timeout: 8000 });
        const selectCategoryelement = await this.page.locator(this.selectCategory);
        await selectCategoryelement.selectOption({ index: 1 }); 
        await this.page.waitForTimeout(5000);


    }
    async OpenPinnedAs_Featured() {

        await this.page.waitForSelector(this.selectPinnedAs, { waitFor: "visible", timeout: 8000 });
        const selectPinnedAselement = await this.page.locator(this.selectPinnedAs);
        await selectPinnedAselement.selectOption({ index: 1 });
        await this.page.reload();


    }
    async OpenPinnedAs_Mandatory_Reading() {

        await this.page.waitForSelector(this.selectPinnedAs, { waitFor: "visible", timeout: 8000 });
        const selectPinnedAselement = await this.page.locator(this.selectPinnedAs);
        await selectPinnedAselement.selectOption({ index: 2 });
        await this.page.reload();
        await this.page.waitForTimeout(3000);

        


    }
    async OpenTagged() {

        await this.page.waitForSelector(this.selectTags, { waitFor: "visible", timeout: 8000 });
        const selectTagselement = await this.page.locator(this.selectTags);
        await selectTagselement.selectOption({ value: 'Fady Tag 1 (2)' });


    }
    async WaitFor(time) {
        await this.page.waitForTimeout(time);
    }
    async ValidateTabContent(tabName) {
        let tab = `//p[@data-facetvalue="${tabName}"]`;
        let isDisplayed = await this.page.locator(tab).isVisible();
        let result = false;
        if (isDisplayed) {
            await this.page.click(tab);
            await this.page.waitForTimeout(2000);
            let types = await this.page.$$(this.cardType);

            if(types.length==0)
                return false;

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

    async ValidatePinIconsInTheFirstPage(iconName) {
        let pinIcons = await this.page.$$(this.cardType);

        if(pinIcons.length==0)
                return false;
        for (let i = 0; i < pinIcons.length; i++) {
            let icon = await pinIcons[i].innerText();
            //print(icon);
            if (!icon.includes(iconName)) {
                return false;
            }
        }
        return true;
    }
    async setStartDate(fromDate, toDate) {
        let fromDateArray = await fromDate.split('/');
        let toDateArray = await toDate.split('/');
        //click on "From" input
        await this.page.click(this.startDateFromInput);
        //select the month
        await this.page.selectOption(this.month, { label: `${fromDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${fromDateArray[2]}` });

        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${fromDateArray[0]}"]`).click();

        await this.page.waitForTimeout(3000);

        //Click on "To" input
        await this.page.click(this.startDateToInput);

        //await this.page.click(this.month);
        //select the month
        await this.page.selectOption(this.month, { label: `${toDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${toDateArray[2]}` });
        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${toDateArray[0]}"]`).click();

        await this.page.waitForTimeout(5000);

    }
    async setEndDate(fromDate, toDate) {
        let fromDateArray = await fromDate.split('/');
        let toDateArray = await toDate.split('/');
        //click on "From" input
        await this.page.click(this.endDateFromInput);
        //select the month
        await this.page.selectOption(this.month, { label: `${fromDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${fromDateArray[2]}` });

        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${fromDateArray[0]}"]`).click();

        await this.page.waitForTimeout(3000);

        //Click on "To" input
        await this.page.click(this.endDateToInput);

        //await this.page.click(this.month);
        //select the month
        await this.page.selectOption(this.month, { label: `${toDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${toDateArray[2]}` });
        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${toDateArray[0]}"]`).click();

        await this.page.waitForTimeout(5000);

    }
    async ValidateIcons(iconName) {
        let pinIcons = await this.page.$$(this.iconyellow);
        if(pinIcons.length==0)
                return false;
        for (let i = 0; i < pinIcons.length; i++) {
            let icon = await pinIcons[i].innerText();
            //print(icon);
            if (!icon.includes(iconName)) {
                return false;
            }
        }
        return true;
    }
    async ValidateCardsPublishDate(type) {
        await this.WaitFor(5000);
        let publishDates;
        if(type=='start'){
            publishDates = await this.page.$$(this.cardsStartDates);
        }else if(type=='end'){
            publishDates = await this.page.$$(this.cardsEndDates);
        }else if(type == 'publish') {
            publishDates = await this.page.$$(this.cardsPublishDatesNewest);
        }
        
        let datesArray = [];
        if(publishDates.length==0)
                return false;
        for (let i = 0; i < publishDates.length; i++) {
            let xpathValue;
        if(type=='start'){
            
            xpathValue = `(${this.cardsStartDates})[${i + 1}]`;
        }else if(type=='end'){
            xpathValue = `(${this.cardsEndDates})[${i + 1}]`;
        }else if(type=='publish'){
            xpathValue = `(${this.cardsPublishDatesNewest})[${i + 1}]`;
        }
            
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
    async ValidateCardsPublishDateNewest() {
        let publishDates = await this.page.$$(this.cardsPublishDatesNewest);
        let datesArray = [];
        if(publishDates.length==0)
                return false;
        for (let i = 0; i < publishDates.length; i++) {
            let xpathValue = `(${this.cardsPublishDatesNewest})[${i + 1}]`;
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

        await this.page.waitForTimeout(3000);

        //Click on "To" input
        await this.page.click(this.publishDateToInput);

        //await this.page.click(this.month);
        //select the month
        await this.page.selectOption(this.month, { label: `${toDateArray[1]}` });
        //select the year
        await this.page.selectOption(this.year, { label: `${toDateArray[2]}` });
        //select the day
        await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${toDateArray[0]}"]`).click();

        await this.page.waitForTimeout(5000);
        await this.page.reload();

    }

    async IsCardsSortedByNewest() {
        let dates = await this.ValidateCardsPublishDateNewest();
        if(dates.length==0)
                return false;
        for (let i = 0; i < dates.length; i++) {
            if (dates[i] < dates[i + 1]) {
                return false;
            }
        }
        return true;
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
        if(locators.length==0)
                return false;
        for (let i = 0; i < locators.length; i++) {
            await elements.push(locators[i]);
        }
        let sortedList = elements.sort();
        let result = false;
        if(elements.length==0)
                return false;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == sortedList[i]) {
                result = true;
            } else {
                return false;
            }
        }
        return result;
    }

    
    async selectPublishDateRange(fromDate, toDate) {

        let fromArray = fromDate.split("-");
        let toArray = toDate.split("-");

        //click on the from button
        await this.page.click(this.CheckSearchResult.startDateFromInput);
        //select the month
        await this.page.selectOption(this.month, fromArray[1]);
        //select the year
        await this.page.selectOption(this.year, fromArray[2]);
        //select the day
        await this.page.locator(`a:has-text("${fromArray[0]}")`).click();

        //click on to button
        await this.page.click(this.CheckSearchResult.startDateToInput);
        //select the month
        await this.page.selectOption(this.month, toArray[1]);
        //select the year
        await this.page.selectOption(this.year, toArray[2]);
        //select the day
        await this.page.locator(`a:has-text("${toArray[0]}")`).click();
    }

    

    async IsCardsBetweenDates(type,fromDate, toDate) {
        let startDate;
        let endDate;
        let dates = await this.ValidateCardsPublishDate(type);
        if (startDate == null) {
            startDate = new Date(fromDate);
        }
        if (endDate == null) {
            endDate = new Date(toDate);
        }
        if(dates.length==0)
                return false;
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
    async SortBy(option) {
        let myList = await this.page.locator(this.sortList);
        await myList.selectOption(option);
        this.page.waitForTimeout(5000);
       await this.page.reload();
      
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
        if(locators.length==0)
                return false;
        for (let i = 0; i < locators.length; i++) {
            await elements.push(locators[i]);
        }
        let sortedList = elements.sort();
        let result = false;
        if(elements.length==0)
                return false;
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
        if(locators.length==0)
                return false;
        for (let i = 0; i < locators.length; i++) {
            await elements.push(locators[i]);
        }
        let sortedList = elements.reverse();
        let result = false;
        if(elements.length==0)
                return false;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == sortedList[i]) {
                result = true;
            } else {
                return false;
            }
        }
        return result;
    }

}

module.exports = CDSearchListingPage;
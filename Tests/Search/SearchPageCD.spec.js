// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const jsonUtils = require('../../utils/jsonUtils');
// const CDSearchPage = require('../../Pages/CDSearchPage');
// const CDLoginPage = require('../../Pages/CDLogin.page');
// const Environment = require('../../Data/Environment');
// const { title } = require('process');
// var xlsx = require('node-xlsx').default;

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let searchPage;

// test.describe.parallel('Search Tests', () => {
//   test.beforeAll(async () => {

//     //getting CD state to pass to the new browsers
//     CDState = JSON.parse(fs.readFileSync('CDstate.json'));
//   })

//   test.beforeEach(async () => {

//     //start browsers with the correct states for CM and CD
//     browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
//     cdContext = await browser.newContext({ viewport: null, storageState: CDState });

//     cdPage = await cdContext.newPage();
//     searchPage = new CDSearchPage(cdPage);
//     await cdPage.goto(`${Environment.CDURL}`, {timeout:70000});

//   })

//   test('Validate Search icon and search box content', async () => {

//     test.setTimeout(2000000);
//     let icon = await cdPage.locator(searchPage.searchICon);
//     expect(await icon.screenshot()).toMatchSnapshot('searchIcon.png');

//     searchPage.ClickOnSearchIcon();
//     let searchInbut = cdPage.locator(searchPage.searchInbut);
//     let closeSearchBox = cdPage.locator(searchPage.closeHideSearchBox);

//     await expect(searchInbut).toBeVisible();
//     await expect(closeSearchBox).toBeVisible();

//     await searchPage.HideSearchBox();
//     await expect(closeSearchBox).toBeHidden();
//   })

//   test('Search by [AutomationPageOneQ]', async () => {

//     let searchData = 'AutomationPageOneQ';
//     test.setTimeout(2000000);
//     await searchPage.ClickOnSearchIcon();
//     await searchPage.SearchFor(searchData);
//     await searchPage.waitLoading();
//     let result = await searchPage.CheckSearchResult(searchData);
//     expect(result).toBe(true);
//   })

//   //test('Validate Search tabs', async()=>{
//   //    await searchPage.OpenDeafultSearchPage();
//   //
//   //})

//   test('Validate sort by [Relevance]', async () => {
//     let searchData = "Automation";
//     test.setTimeout(2000000);
//     await searchPage.OpenSearchPageFor(searchData);
//     await searchPage.waitLoading();
//     let result = await searchPage.ValidateIsTheFirstThreeCardsContains(searchData);
//     expect(result).toBe(true);
//   })

//   test('Validate sort by [Newest first]', async () => {
//     let searchData = "Automation";
//     let option = "Newest first"
//     test.setTimeout(2000000);
//     await searchPage.OpenSearchPageFor(searchData);
//     await searchPage.waitLoading();
//     await searchPage.SortBy(option);
//     let result = await searchPage.IsCardsSortedByNewest();
//     expect(result).toBe(true);
//   })


//   test('Validate sort by [Title A-Z]', async () => {
//     let searchData = "Automation";
//     let option = "Title A-Z";
//     test.setTimeout(2000000);
//     await searchPage.OpenSearchPageFor(searchData);
//     await searchPage.SortBy(option);
//     let result = await searchPage.IsSortedAscending();
//     expect(result).toBe(true);
//   })

//   test('Validate sort by [Title Z-A]', async () => {
//     let searchData = "Automation";
//     let option = "Title Z-A";
//     test.setTimeout(2000000);
//     await searchPage.OpenSearchPageFor(searchData);
//     await searchPage.SortBy(option);
//     let result = await searchPage.IsSortedDescending();
//     expect(result).toBe(true);
//   })

//   test('Validate filter by categories', async () => {
//     let searchData = "Automation";
//     test.setTimeout(2000000);
//     await searchPage.OpenSearchPageFor(searchData);
//     let result = await searchPage.ValidateTabContent("Announcement");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Article");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Blog");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Event");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Link");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Page");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Person");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Quote");
//     expect(result).toBe(true);
//     result = await searchPage.ValidateTabContent("Townhall");
//     expect(result).toBe(true);
//   })


//   test('Validate pin as [Featured]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.ClickOnFeaturedButton();
//     await searchPage.waitLoading();
//     let result = await searchPage.ValidatePinIconsInTheFirstPage("Featured");
//     expect(result).toBe(true);
//   })

//   test('Validate pin as [Mandatory Reading]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.waitLoading();
//     await searchPage.ClickOnMandatoryReadingButton();
//     await searchPage.waitLoading();
//     let result = await searchPage.ValidatePinIconsInTheFirstPage("Mandatory Reading");
//     expect(result).toBe(true);
//   })

//   test('Validate pin as [New]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.waitLoading();
//     await searchPage.ClickOnNewButton();
//     await searchPage.waitLoading();
//     let result = await searchPage.ValidatePinIconsInTheFirstPage("New");
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Birthday]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Birthday');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Farewell]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Farewell');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Inside Story]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Inside Story');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [New Hire]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('New Hire');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Promotion]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Promotion');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Quote]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Quote');
//     expect(result).toBe(true);
//   })

//   test('Validate Person Activity [Recognition]', async () => {
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     let result = await searchPage.ValidatePersonActivityInTheFirstPage('Recognition');
//     expect(result).toBe(true);
//   })

//   test('Validate filter by Publish Date', async () => {
//     let fromDate = "1/May/2022";
//     let toDate = "22/May/2022";
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.setPublishDate(fromDate, toDate);
//     let result = await searchPage.IsCardsBetweenDates(fromDate, toDate);
//     expect(result).toBe(true);
//   })

//   test('Validate filter events by "Start date" Date', async () => {
//     let startDate = "1/May/2022";
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.ClickOnEventsTab();
//     await searchPage.SetStartDate(startDate);
//     let result = await searchPage.IsCardsBetweenDates(startDate, null);
//     expect(result).toBe(true);
//   })

//   test('Validate filter events by "End date" Date', async () => {
//     let endDate = "22/May/2022";
//     test.setTimeout(2000000);
//     await searchPage.OpenDeafultSearchPage();
//     await searchPage.ClickOnEventsTab();
//     await searchPage.SetEndDate(endDate);
//     let result = await searchPage.IsCardsBetweenDates(null, endDate);
//     expect(result).toBe(true);
//   })

//   test.afterEach(async () => {
//     await browser.close();
//   })
// })
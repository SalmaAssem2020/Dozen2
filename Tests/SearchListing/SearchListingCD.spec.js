// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const jsonUtils = require('../../utils/jsonUtils');
// CDSearchListingPage = require('../../Pages/CDSearchListingPage');
// const Environment = require('../../Data/Environment');
// const CDLoginPage = require('../../Pages/CDLogin.page');
// const { title } = require('process');
// var xlsx = require('node-xlsx').default;

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let searchListingPage;
// let cDSearchListingPage;

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
//     cDSearchListingPage = new CDSearchListingPage(cdPage);
//    // await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);

//   })

//   test('Validate Events-Horizontal [Category=Event]', async () => {
//    // test.setTimeout(200000);
//    await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//     await cDSearchListingPage.OpenCategory();
//     let result = await cDSearchListingPage.ValidatePinIconsInTheFirstPage("Event");
//     expect(result).toBe(true);
//   })
//   test('Validate Events-Collapsed [Category=Event]', async () => {
//     // test.setTimeout(200000);
//    await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed`);
//    cDSearchListingPage.OpenFilterButton();
//      await cDSearchListingPage.OpenCategory();
//      let result = await cDSearchListingPage.ValidatePinIconsInTheFirstPage("Event");
//      expect(result).toBe(true);
//    })
//    test('Validate News-Horizontal pin as [Category=Announcement]', async () => {
//     // test.setTimeout(200000);
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Horizontal#e=0`);
//      await cDSearchListingPage.OpenCategory();
//      let result = await cDSearchListingPage.ValidatePinIconsInTheFirstPage("Announcement");
//      expect(result).toBe(true);
//    })
//    test('Validate News-Collapsed pin as [Category]', async () => {
//     // test.setTimeout(200000);
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Collapsed#e=0`);
//     await cDSearchListingPage.OpenFilterButton();
//      await cDSearchListingPage.OpenCategory();
//      let result = await cDSearchListingPage.ValidatePinIconsInTheFirstPage("Announcement");
//      expect(result).toBe(true);
//    })
//    test('Validate News-Horizontal filter by Publish Date', async () => {
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Horizontal#e=0`);
//     let fromDate = "6/Mar/2022";
//     let toDate = "27/Mar/2022";
//     test.setTimeout(200000);
//     await cDSearchListingPage.setPublishDate(fromDate, toDate);
//     let result = await cDSearchListingPage.IsCardsBetweenDates('publish',fromDate, toDate);
//     expect(result).toBe(true);
//   })
//   test('Validate News-Collapsed filter by Publish Date', async () => {
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Collapsed#e=0`);
//     await cDSearchListingPage.OpenFilterButton();
//     let fromDate = "1/Mar/2022";
//     let toDate = "22/Mar/2022";
//     test.setTimeout(200000);
//     await cDSearchListingPage.setPublishDate(fromDate, toDate);
//     let result = await cDSearchListingPage.IsCardsBetweenDates('publish',fromDate, toDate);
//     expect(result).toBe(true);
//   })
//   test('Validate Events-Horizontal pinned as [Mandatory]', async () => {
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//     test.setTimeout(200000);
//     await cDSearchListingPage.OpenPinnedAs_Mandatory_Reading();
//     //await cDSearchListingPage.WaitFor(5000);
//     let result = await cDSearchListingPage.ValidateIcons("Mandatory Reading");
//     expect(result).toBe(true);
//   })
//   test('Validate Events-Collapsed pinned as [Mandatory]', async () => {
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed`);
//     cDSearchListingPage.OpenFilterButton();
//     test.setTimeout(200000);
//     await cDSearchListingPage.OpenPinnedAs_Mandatory_Reading();
//    // await cDSearchListingPage.WaitFor(10000);
//     let result = await cDSearchListingPage.ValidateIcons("Mandatory Reading");
//     expect(result).toBe(true);
//   })
//   test('Validate Events-Horizontal pinned as [Featured]', async () => {
//     test.setTimeout(200000);
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//     await cDSearchListingPage.OpenPinnedAs_Featured();
//     await cDSearchListingPage.WaitFor(5000);
//     let result = await cDSearchListingPage.ValidateIcons("Featured");
//     expect(result).toBe(true);
//   })
//   test('Validate Events-Collapsed pinned as [Featured]', async () => {
//     test.setTimeout(200000);
//     await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed`);
//     await cDSearchListingPage.OpenFilterButton();
//     await cDSearchListingPage.OpenPinnedAs_Featured();
//     await cDSearchListingPage.WaitFor(10000);
//     let result = await cDSearchListingPage.ValidateIcons("Featured");
//     expect(result).toBe(true);
//   })
// //   test('Validate pinned as [Tagged]', async () => {
// //     test.setTimeout(200000);
// //     //await searchListingPage.OpenDeafultSearchListingPage();
// //     await cDSearchListingPage.OpenTagged();
// //     await cDSearchListingPage.WaitFor(10000);
// //     let result = await cDSearchListingPage.ValidateIcons("Featured");
// //     expect(result).toBe(true);
// //   })
// test('Validate Search icon and search filter content', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-collapsed#e=0`)
//   test.setTimeout(200000);
//   let icon = await cdPage.locator(cDSearchListingPage.searchFilterIcon);
//   expect(await icon.screenshot()).toMatchSnapshot('searchFilterIcon.png');
// })
// test('Validate Search Events-collapsed filter content', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-collapsed#e=0`)
//   await cDSearchListingPage.OpenFilterButton();
//   await cDSearchListingPage.WaitFor(5000);
//   let icon = await cdPage.locator(cDSearchListingPage.searchContentFilter);
//   expect(await icon.screenshot()).toMatchSnapshot('searchEventsCollapsedFilterIcon.png');
// })
// test('Validate Search Events-Horizontal filter content', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`)
//   await cDSearchListingPage.WaitFor(5000);
//   let icon = await cdPage.locator(cDSearchListingPage.searchContentFilter);
//   expect(await icon.screenshot()).toMatchSnapshot('searchEventsHorizontalFilterIcon.png');
// })
// test('Validate Search Sort Results Icon', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`)
//   await cDSearchListingPage.WaitFor(5000);
//   let icon = await cdPage.locator(cDSearchListingPage.sortResultsIcon);
//   expect(await icon.screenshot()).toMatchSnapshot('searchEventsHorizontalSortResultsIcon.png');
// })
// test('Validate Search News-Collapsed Filter Icon', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-collapsed#e=0`)
//   await cDSearchListingPage.OpenFilterButton();
//   await cDSearchListingPage.WaitFor(5000);
//   let icon = await cdPage.locator(cDSearchListingPage.searchContentFilter);
//   expect(await icon.screenshot()).toMatchSnapshot('searchNewsCollapsedFilterIcon.png');
// })
// test('Validate Search News-Horizontal Filter Icon', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-horizontal#e=0`)
//   await cDSearchListingPage.WaitFor(5000);
//   let icon = await cdPage.locator(cDSearchListingPage.searchContentFilter);
//   expect(await icon.screenshot()).toMatchSnapshot('searchNewsHorizontalFilterIcon.png');
// })
// test ('Validate Events-Collapsed filter by Start Date', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-collapsed#e=0`);
// cDSearchListingPage.OpenFilterButton();
//   let fromDate = "1/May/2022";
//   let toDate = "22/May/2022";
//   test.setTimeout(200000);
//   await cDSearchListingPage.setStartDate(fromDate , toDate);
//   let result = await cDSearchListingPage.IsCardsBetweenDates('start',fromDate, toDate);
//   expect(result).toBe(true);
// })
// test ('Validate Events-Horizontal filter by Start Date', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);

//   let fromDate = "15/Mar/2022";
//   let toDate = "25/Mar/2022";
//   test.setTimeout(200000);
//   await cDSearchListingPage.setStartDate(fromDate , toDate);
//   let result = await cDSearchListingPage.IsCardsBetweenDates('start',fromDate, toDate);
//   expect(result).toBe(true);
// })
// test ('Validate Events Horizontal filter by End Date', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//   let fromDate = "15/Mar/2022";
//   let toDate = "25/Mar/2022";
//   test.setTimeout(200000);
//   await cDSearchListingPage.setEndDate(fromDate , toDate);
//   let result = await cDSearchListingPage.IsCardsBetweenDates('end',fromDate, toDate);
//   expect(result).toBe(true);
// })
// test ('Validate Events Collapsed filter by End Date', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed#e=0`);
//   await cDSearchListingPage.OpenFilterButton();
//   let fromDate = "1/May/2022";
//   let toDate = "22/May/2022";
//   test.setTimeout(200000);
//   await cDSearchListingPage.setEndDate(fromDate , toDate);
//   let result = await cDSearchListingPage.IsCardsBetweenDates('end',fromDate, toDate);
//   expect(result).toBe(true);
// })

// test('Validate Events Horizontal sort by [Title Z-A]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//  let option = "Title Z-A";
//   test.setTimeout(200000);
//  await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedDescending();
//  expect(result).toBe(true);
// })
// test('Validate Events Collapsed sort by [Title Z-A]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed#e=0`);
  
//  let option = "Title Z-A";
//   test.setTimeout(200000);
//  await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedDescending();
//  expect(result).toBe(true);
// })
// test('Validate News Collapsed sort by [Title Z-A]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Collapsed#e=0`);
  
//  let option = "Title Z-A";
//   test.setTimeout(200000);
//  await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedDescending();
//  expect(result).toBe(true);
// })
// test('Validate News Horizontal sort by [Title Z-A]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Horizontal#e=0`);
  
//  let option = "Title Z-A";
//   test.setTimeout(200000);
//  await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedDescending();
//  expect(result).toBe(true);
// })
// /*test('Validate sort by [Relevance]', async () => {
//  // let searchData = "Automation";
//  await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//   test.setTimeout(200000);
//   await searchPage.OpenSearchPageFor(searchData);
//   let result = await searchPage.ValidateIsTheFirstThreeCardsContains(searchData);
//   expect(result).toBe(true);
// })
// /*/
// test ('Validate Events Horizontal sort by [Newest first]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//   let option = "Newest First"
//   test.setTimeout(200000);
//    await cDSearchListingPage.SortBy(option);
//    let result = await cDSearchListingPage.IsCardsSortedByNewest();
//   expect(result).toBe(true);
// })
// test ('Validate Events Collapsed sort by [Newest first]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed`);
//   let option = "Newest First"
//   test.setTimeout(200000);
//    await cDSearchListingPage.SortBy(option);
//    let result = await cDSearchListingPage.IsCardsSortedByNewest();
//   expect(result).toBe(true);
// })
// test ('Validate News Collapsed sort by [Newest first]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Collapsed`);
//   let option = "Newest First"
//   test.setTimeout(200000);
//    await cDSearchListingPage.SortBy(option);
//    await cDSearchListingPage.WaitFor(5000);
//    let result = await cDSearchListingPage.IsCardsSortedByNewest();
//   expect(result).toBe(true);
// })
// test ('Validate News Horizontal sort by [Newest first]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-horizontal`);
//   let option = "Newest First"
//   test.setTimeout(200000);
//    await cDSearchListingPage.SortBy(option);
//    await cDSearchListingPage.WaitFor(5000);
//    let result = await cDSearchListingPage.IsCardsSortedByNewest();
//   expect(result).toBe(true);
// })


// test('Validate Events Horizontal sort by [Title A-Z]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events#e=0`);
//   let option = "Title A-Z";
//   test.setTimeout(200000);
//   await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedAscending();
//   expect(result).toBe(true);
// })
// test('Validate Events Collapsed sort by [Title A-Z]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/Events-Collapsed`);
//   let option = "Title A-Z";
//   test.setTimeout(200000);
//   await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedAscending();
//   expect(result).toBe(true);
// })
// test('Validate News Collapsed sort by [Title A-Z]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Collapsed`);
//   let option = "Title A-Z";
//   test.setTimeout(200000);
//   await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedAscending();
//   expect(result).toBe(true);
// })
// test('Validate News Horizontal sort by [Title A-Z]', async () => {
//   await cdPage.goto(`${Environment.CDURL}/DZ3-Release-3/Monica-Modules/News-Horizontal`);
//   let option = "Title A-Z";
//   test.setTimeout(200000);
//   await cDSearchListingPage.SortBy(option);
//   await cDSearchListingPage.WaitFor(5000);
//   let result = await cDSearchListingPage.IsSortedAscending();
//   expect(result).toBe(true);
// })
//   test.afterEach(async () => {
//     await browser.close();
//   })
// })
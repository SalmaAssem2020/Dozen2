// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const CDHomePage = require('../../Pages/CDHomePage');
// const Environment = require('../../Data/Environment');
// const { title } = require('process');

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let envURL = Environment.CDURL.substr(0, Environment.CDURL.length - 1);

// test.describe.parallel('Flyout CD Tests', () => {
//   test.beforeAll(async () => {

//     //getting CD state to pass to the new browsers
//     CDState = JSON.parse(fs.readFileSync('CDstate.json'));

//   })

//   test.beforeEach(async () => {

//     //start browsers with the correct states for CM and CD
//     browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
//     cdContext = await browser.newContext({ viewport: null, storageState: CDState });

//     cdPage = await cdContext.newPage();
//     homePage = new CDHomePage(cdPage, cdContext);
//     await cdPage.goto(`${envURL}/Automation/AutomationQuickAppsPage`, { waitUntil: 'networkidle' });

//   })

//   test('Validate Flyout Content', async () => {

//     await homePage.clickOnFlyoutMenuButton();
//     let flyout = await cdPage.locator(homePage.flyoutMenu);
//     expect(await flyout.screenshot()).toMatchSnapshot('FlyoutMenuContainer.png');

//   })

//   test('Validate Open and close flyout menu', async () => {
//     await homePage.clickOnFlyoutMenuButton();
//     expect(await cdPage.locator(homePage.flyoutMenu)).toBeVisible();

//     await homePage.clickOnFlyoutMenuButton();
//     let result = await homePage.isMenuClosed(homePage.flyoutMenu);
//     expect(result).toBeTruthy();

//   })

//   test('Validate navigate to internal link in flyout menu', async () => {
//     await homePage.clickOnFlyoutMenuButton();
//     let newURL = await homePage.clickOnInternalLink(homePage.flyoutHomePageButton);
//     await expect(newURL).toContain(`${envURL}/`);

//   })

//   test('Validate navigate to Twitter [External link] in flyout menu', async () => {
//     await homePage.clickOnFlyoutMenuButton();
//     let newURL = await homePage.clickOnExternalLink(homePage.flyoutTwitterButton);
//     await expect(newURL).toContain('https://twitter.com/');
//   })


//   test.afterEach(async () => {
//     await browser.close();
//   })

// })
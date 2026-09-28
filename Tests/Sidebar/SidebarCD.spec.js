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

// test.describe.parallel('Sidebar CD Tests', () => {
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

//   test('Validate Sidebar Content', async () => {

//     await homePage.clickOnSidebarMenuButton();
//     let sidebar = await cdPage.locator(homePage.sidebarMenu);
//     expect(await sidebar.screenshot()).toMatchSnapshot('SidebarMenuContainer.png');

//   })

//   test('Validate Open and close Sidebar menu', async () => {
//     await homePage.clickOnSidebarMenuButton();
//     expect(await cdPage.locator(homePage.sidebarMenu)).toBeVisible();

//     await homePage.clickOnSidebarMenuButton();
//     let result = await homePage.isMenuClosed(homePage.sidebarMenu);
//     expect(result).toBeTruthy();

//   })

//   test('Validate navigate to internal link in sidebar menu', async () => {
//     await homePage.clickOnSidebarMenuButton();
//     let newURL = await homePage.clickOnInternalLink(homePage.sidebarHomeButton);
//     await expect(newURL).toContain(`${envURL}/`);

//   })

//   test('Validate navigate to Twitter [External link] in sidebar menu', async () => {
//     await homePage.clickOnSidebarMenuButton();
//     let newURL = await homePage.clickOnExternalLink(homePage.sidebarTwitterButton);
//     await expect(newURL).toContain('https://twitter.com/');
//   })


//   test('Validate open flyout icon with link', async () => {
    
//   })


//   test.afterEach(async () => {
//     await browser.close();
//   })

// })
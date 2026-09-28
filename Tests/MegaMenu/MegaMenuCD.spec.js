// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const jsonUtils = require('../../utils/jsonUtils');
// const CDMegaMenuPage = require('../../Pages/CDMegaMenuPage');
// const CDLoginPage = require('../../Pages/CDLogin.page');
// const Environment = require('../../Data/Environment');
// const { title } = require('process');
// var xlsx = require('node-xlsx').default;

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let megaMenuPage;
// let envURL = Environment.CDURL;

// test.describe.parallel('Mega Menu component CD Tests', () => {
//   test.beforeAll(async () => {

//     //getting CD state to pass to the new browsers
//     CDState = JSON.parse(fs.readFileSync('CDstate.json'));

//   })

//   test.beforeEach(async () => {

//     //start browsers with the correct states for CM and CD
//     test.setTimeout(60000);
//     browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
//     cdContext = await browser.newContext({ viewport: null, storageState: CDState });

//     cdPage = await cdContext.newPage();
//     megaMenuPage = new CDMegaMenuPage(cdPage, cdContext);
//     await cdPage.goto(`${envURL}`, { waitUntil: 'networkidle' });

//   })

//   test('Validate that mega menu is clickable', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let result = await megaMenuPage.ValidateIsAutomationContainerExists();
//     expect(result).toBeTruthy();

//   })

//   test('Validate visual testing for the mega menu', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let megaMenuHeader = await cdPage.locator(megaMenuPage.automationItemsContainer);
//     expect(await megaMenuHeader.screenshot()).toMatchSnapshot('MegaMenu.png');

//   })

//   test('Validate internal Featured item navigate to correct page', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let headerLink = await megaMenuPage.ValidateInternalLinksNavigation(megaMenuPage.internalLink1);
//     await expect(cdPage).toHaveURL(`${envURL.substr(0, envURL.length - 1)}${headerLink}`);

//   })

//   test('Validate External Featured item navigate to a new tab', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let headerLink = await megaMenuPage.ValidateExternalNavigation(megaMenuPage.externalLink1);
//     await expect(headerLink).toContain('https://www.google.com/');
//     //await expect(cdPage).toHaveURL(`${headerLink}`);

//   })

//   test('Validate internal Navigation item navigate to correct page', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let headerLink = await megaMenuPage.ValidateInternalLinksNavigation(megaMenuPage.internalLink2);
//     await expect(cdPage).toHaveURL(`${envURL.substr(0, envURL.length - 1)}${headerLink}`);

//   })
//   test('Validate External Navigation item navigate to a new URL', async () => {
//     test.setTimeout(60000);
//     await megaMenuPage.ClickOnAutomationButton();
//     let currentUrl = await megaMenuPage.ValidateUrlChange(megaMenuPage.externalLink2);
//     await expect(currentUrl).toContain('https://www.facebook.com/');
//     //await expect(cdPage).toHaveURL(`${headerLink}`);

//   })




//   test.afterEach(async () => {
//     await browser.close();
//   })

// })
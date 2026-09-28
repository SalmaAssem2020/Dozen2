// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const jsonUtils = require('../../utils/jsonUtils');
// const CDLanguageSwitcherPage = require('../../Pages/CDLanguageSwitcherComponent.js');
// const CDLoginPage = require('../../Pages/CDLogin.page');
// const Environment = require('../../Data/Environment');
// const { title } = require('process');
// var xlsx = require('node-xlsx').default;

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let languageSwitcherPage;
// let envURL = Environment.CDURL;

// test.describe.parallel('Language Switcher component CD Tests', () => {
//   test.beforeAll(async () => {

//     //getting CD state to pass to the new browsers
//     CDState = JSON.parse(fs.readFileSync('CDstate.json'));

//   })

//   test.beforeEach(async () => {

//     //start browsers with the correct states for CM and CD
//     test.setTimeout(600000);
//     browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
//     cdContext = await browser.newContext({ viewport: {width:1366,height:768}, storageState: CDState });

//     cdPage = await cdContext.newPage();
//     languageSwitcherPage = new CDLanguageSwitcherPage(cdPage, cdContext);
//     await cdPage.goto(`${envURL}`, { waitUntil: 'networkidle' , timeout:900000});

//   })

//   test('Validate visual testing for the language Switcher', async () => {
//     test.setTimeout(100000);
//     await languageSwitcherPage.ClickOnAutomationFlyoutButton();
//     let languageSwitcherHeader = await cdPage.locator(languageSwitcherPage.languageSwitcher);
//     expect(await languageSwitcherHeader.screenshot()).toMatchSnapshot('LanguageSwitcher.png');

//   })

//   test('Validate visual testing for the english and arabic content', async () => {
//     test.setTimeout(90000);
//     await cdPage.goto(`${envURL}arabic`, { waitUntil: 'networkidle' ,timeout:90000});
//     let firstTile = await cdPage.locator(languageSwitcherPage.firstTile);
//     expect.soft(await firstTile.screenshot()).toMatchSnapshot('First Tile in English.png');
//     await languageSwitcherPage.ClickOnAutomationFlyoutButton();
//     await languageSwitcherPage.ClickArabicLanguage();
//     await cdPage.waitForLoadState('networkidle'); 
//     expect(await firstTile.screenshot()).toMatchSnapshot('First Tile in Arabic.png');
//   })



//   test.afterEach(async () => {
//     await browser.close();
//   })

// })
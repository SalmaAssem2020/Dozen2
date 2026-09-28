const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');
const HorizonPage = require('../../Pages/Horizon.page');
const Environment = require('../../Data/Environment');
const jsonUtils = require('../../utils/jsonUtils');
var xlsx = require('node-xlsx').default;
const { google } = require("googleapis");
const { kMaxLength } = require('buffer');
const scripts = require('../../Setup/Scripts/script.js')

let horizonPage;
let cmPage;
let cdPage;
let cdContext;
let cmContext;
let browser;
let itemPathForCD;
let CMState;
let CDState;
let stylesClasses = null;
let variantClasses = null;
let gridLayoutClass = null;

//const iPhone = devices['iPhone 6'];
//let pageData = await jsonUtils.ConvertGoogleSheetToJson('Tile Sheet', '!A1:N');

test.describe.parallel('Listing Page CD Tests', async () => {
  console.log(process.env.TileDataSource);
  
  let pageData = [1,2,3];
 
  
 // process.env.TileDataSource = JSON.stringify(TilteDataSource);

  test.beforeAll(async () => {

    pageData = jsonUtils.ConvertToJson(process.env.TileDataSource);
    process.env.initialPagesLength = pageData.length;

    //getting CD and CM states to pass to the new browsers
    CDState = JSON.parse(fs.readFileSync('CDstate.json'));

  })

  test.beforeEach(async () => {

    //start browsers with the correct states for CM and CD
    browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    cdContext = await browser.newContext({ viewport: {width:1366,height:768}, storageState: CDState });
    //cdContext2 = await browser.newContext({viewport:{width:360,height:780},storageState:CDState});
    //cdContext3 = await browser.newContext({viewport:{width:834,height:1194},storageState:CDState});
    cdPage = await cdContext.newPage();


  })


  //pageData.length
  for (let i = 1; i <process.env.initialPagesLength; i++) {
    if (pageData[i]['TestCase ID'] == '') {
      break;
    }
    test(`CD_${i}`, async () => {
    //test(`CD_${data['TestCase ID']}`, async () => {
      let data = pageData[i];
      

      let divAreaToCompare = `//div[@id='${data['Page Name']}${data['TestCase ID']}']`;
      divAreaToCompare = divAreaToCompare.split(' ').join('_');
  
      test.setTimeout(120000);
      await cdPage.goto(`${Environment.CDURL}Auto/${data['Page Name']}`, { waitUntil: 'networkidle' ,timeout:90000});

      if (data['Styles Classes'] != null) {
        stylesClasses = await jsonUtils.returnEntryValuesSplittedBySpace(data['Styles Classes']);
      }

      if (data['Variant Class']) {
        variantClasses = data['Variant Class'];
      }

      gridLayoutClass = data['GridLayoutClass'];

      let areaToCompare = await cdPage.locator(divAreaToCompare);

      //get the class name from the html
      let componentHeaderClass = await areaToCompare.getAttribute('class');

      //assert if the div class contains the style classes
      if (stylesClasses != null) {
        let ss = stylesClasses.length;
        for (let i = 0; i < stylesClasses.length; i++) {
          expect(componentHeaderClass).toContain(stylesClasses[i]);
        }
      }

      //assert if the div class contains the variant classes
      if (variantClasses != null) {
        let ss = variantClasses.length;
        for (let i = 0; i < 1; i++) {
          expect(componentHeaderClass).toContain(variantClasses[i]);
        }
      }

      //assert if the div class contains the grid layout class
      if (gridLayoutClass != null) {
        expect(componentHeaderClass).toContain(gridLayoutClass);
      }
      await expect.soft(3).toBe(4);
      //Apply visual testing for desktop
      await expect.soft((await areaToCompare.screenshot())).toMatchSnapshot(`CD_Desktop_${data['TestCase ID']}.png`);

      //change the viewport to be mobile
      cdPage.setViewportSize({
        width: 360,
        height: 780,
      });
      //Apply visual testing for mobile
      await expect.soft(await areaToCompare.screenshot()).toMatchSnapshot(`CD_Mobile_${data['TestCase ID']}.png`);

      //change the viewport to be ipad
      cdPage.setViewportSize({width:834,height:1194});
      //Apply visual testing for ipad
      await expect(await areaToCompare.screenshot()).toMatchSnapshot(`CD_IPad_${data['TestCase ID']}.png`);
      


    })
  }

  test.afterEach(async () => {
    await browser.close();
  })
})

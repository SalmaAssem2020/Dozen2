// const {test, expect, chromium} = require ('@playwright/test');
// const fs = require('fs');
// const HorizonPage = require('../../Pages/Horizon.page');
// const LaunchPadPage = require('../../Pages/LaunchPad.page');
// const jsonUtils = require ('../../utils/jsonUtils');

// let launchPadPage;
// let horizonPage;
// let cmPage;
// let cmContext;
// let browser;
// let CMState;

// test.describe.parallel('Listing Page CM Tests', () =>{
//   let pageData =   jsonUtils.covertExcelWithHeaderToJson('Automation Sheet', 'Tile Sheet');
  
//   test.beforeAll(async () => {

//     //getting CM states to pass to the new browsers
//      CMState = JSON.parse(fs.readFileSync('state.json'));

//   })

//   test.beforeEach(async () => {
     
//     //start browsers with the correct states for CM and CD
//     browser = await chromium.launch({headless: false, args: ['--start-maximized']});
//     cmContext = await browser.newContext({viewport: null, storageState: CMState});
      
//     cmPage = await cmContext.newPage();
      
//     horizonPage = new HorizonPage(cmPage);

//     await cmPage.waitForTimeout(1000);
    
//     var selector = '//*[@class="dots"]';
//     await Promise.all([
//       await cmPage.waitForSelector(selector, {state: "hidden"}),
//       await cmPage.goto(`https://dz3qaah.dozen.ai/composer/pages/editor?sc_itemid=49260863-b591-41e9-933b-0bd525da3a5d&sc_lang=en&sc_site=DoZenDigitalWorkplace`)
//     ]);
//    })


//     for (let i = 1; i < pageData.data.length; i++)
//     {
//       let data = pageData.data[i];
//       let stylesClasses = jsonUtils.returnEntryValuesSplittedByComma(data['Styles Classes']);
//       let divAreaToCompare = `//div[contains(@class, 'component dozen-component dozen-tile')][${i}]`;
       
//         test(`CM_${data['TestCase ID']}`, async () => {
//           //Get the element to apply visual testing on
//           await cmPage.waitForSelector('iframe', {timeout: 7000});
//           let frame = await (await cmPage.$('iframe')).contentFrame();
//           let areaToCompare = await frame.locator(divAreaToCompare);

//           //Apply visual testing
//           expect(await areaToCompare.screenshot()).toMatchSnapshot(`CM_${data['TestCase ID']}.png`);

//           //Check the class name in html
//           let componentHeaderClass = await areaToCompare.getAttribute('class');
         
//           for(let i = 0; i < stylesClasses.length; i++)
//             expect(componentHeaderClass).toContain(stylesClasses[i]);
//         })
//     }

//     test.afterEach(async () => {
//       await browser.close();
//     })
// })

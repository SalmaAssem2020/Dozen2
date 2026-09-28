// const {test, expect, chromium} = require ('@playwright/test');
// const fs = require('fs');
// const HorizonPage = require('../../Pages/Horizon.page');
// const LaunchPadPage = require('../../Pages/LaunchPad.page');
// const LoginPage = require ('../../Pages/Login.page');
// const DataSource = require ('../../Data/DataSource');
// const jsonUtils = require ('../../utils/jsonUtils2');
// var xlsx = require('node-xlsx').default;

// let launchPadPage;
// let horizonPage;
// let cmPage;
// let cdPage;
// let cdContext;
// let cmContext;
// let browser;
// let itemPathForCD;
// let divAreaToSelect = `div.dozen-component-title`;
// let divAreaToCompare = `//div[contains(@class, 'component dozen-component dozen-listing')]`;

// test.describe('Component2 Tests', () =>{
//   let pageData =   jsonUtils.covertExcelWithHeaderToJson('Automation Sheet', 'Tile Sheet');
//   //let pageIds =  jsonUtils.covertExcelWithHeaderToJson('DozenTests', 'PagesIds');
//  // let pageId =   jsonUtils.returnJsonElementByEntryValue(pageIds, 'PageType', 'Listing Page');
    
//   test.beforeEach(async () => {
     
//     //getting CD and CM states to pass to the new browsers
//    // const CDState = JSON.parse(fs.readFileSync('CDstate.json'));
//     const CMState = JSON.parse(fs.readFileSync('state.json'));
    
//     //start browsers with the correct states for CM and CD
//     browser = await chromium.launch({headless: true, args: ['--start-maximized']});
//     //cdContext = await browser.newContext({viewport: null, storageState: CDState});
//     cmContext = await browser.newContext({viewport: null, storageState: CMState});
      
//     //cdPage = await cdContext.newPage();
//     cmPage = await cmContext.newPage();
      
//     launchPadPage = new LaunchPadPage(cmPage);
//     horizonPage = new HorizonPage(cmPage);

//     await cmPage.waitForTimeout(1000);
//     //await cmPage.goto(`https://dz3qaah.dozen.ai/composer/pages/editor?sc_itemid=49260863-b591-41e9-933b-0bd525da3a5d&sc_lang=en&sc_site=DoZenDigitalWorkplace`);
//     var selector = '//*[@class="dots"]';
//     await Promise.all([
//     await cmPage.waitForSelector(selector, {state: "hidden"}),
//     await cmPage.goto(`https://dz3qaah.dozen.ai/composer/pages/editor?sc_itemid=49260863-b591-41e9-933b-0bd525da3a5d&sc_lang=en&sc_site=DoZenDigitalWorkplace`)
    
//     ]);
//     //itemPathForCD = await horizonPage.getItemPathForCD();
//     //await cdPage.goto(`https://dz3qacd.dozen.ai/${itemPathForCD}`);
//   })


//     for (let i = 1; i < pageData.data.length; i++)
//     {
//       let data = pageData.data[i];
//       let stylesClasses = jsonUtils.returnEntryValuesSplittedByComma(data['Styles Classes']);
//       let divAreaToCompare = `//div[contains(@class, 'component dozen-component dozen-tile')][${i}]`;
//       console.log(data['TestCase ID']);
       
//         test(`CM_${data['TestCase ID']}`, async () => {
        
//          // itemPathForCD = await horizonPage.getItemPathForCD();
    
//           //Select Size
//           //await horizonPage.selectSize(`${data['Grid Size']}`);

//          // await cmPage.waitForTimeout(2000);

//           //Get the element to apply visual testing on
//           var s = 'iframe';
//           await cmPage.waitForSelector(s, {timeout: 7000});
//           let frame = await (await cmPage.$('iframe')).contentFrame();
//           let areaToCompare = await frame.locator(divAreaToCompare);

//           //Publish the item
//           //await horizonPage.publishButton();

//           //Apply visual testing
//           expect(await areaToCompare.screenshot()).toMatchSnapshot(`CM_${data['TestCase ID']}.png`);

//           //Check the class name in html
//           let componentHeaderClass = await areaToCompare.getAttribute('class');
         
//           for(let i = 0; i < stylesClasses.length; i++)
//             expect(componentHeaderClass).toContain(stylesClasses[i]);
//         })

//        /* test(`CD_${data['TestCase ID']}`, async () => {
//           //Access CD with the correct item path
//           await cdPage.reload({waitUntil: 'networkidle'});
//           var selector = '//*[@class="dots"]';
//           await cdPage.waitForSelector(selector, {state: "hidden"});

//           let areaToCompare = await cdPage.locator(divAreaToCompare);

//            //Check the class name in html
//            let componentHeaderClass = await areaToCompare.getAttribute('class');
           
//            for(let i = 0; i < stylesClasses.length; i++)
//             expect(componentHeaderClass).toContain(stylesClasses[i]);
          
//           //Apply visual testing
//           expect(await areaToCompare.screenshot()).toMatchSnapshot(`CD_${data['TestCase ID']}.png`);

    
//         })*/
//     }
// })

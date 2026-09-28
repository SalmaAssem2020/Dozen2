var xlsx = require('node-xlsx').default;
const fs = require('fs');

module.exports = {
    async renameKey(obj, oldKey, newKey)  {
        obj[`${newKey}`] = obj[oldKey];
        delete obj[oldKey];
    },
     covertExcelWithHeaderToJson(fileName, sheetName){
        let fileJsonObj = xlsx.parse(fs.readFileSync(`D:/Playwright/Dozen/DataSource/${fileName}.xlsx`));
        let sheetJsonObj = fileJsonObj.find(item=>item.name==`${sheetName}`);


        let headerArr = sheetJsonObj.data[0];

        delete sheetJsonObj.data[0];
        
        for(let i = 1; i < sheetJsonObj.data.length; i++)
        {
            for(let j = 0; j < headerArr.length; j++)
            {
               module.exports.renameKey(sheetJsonObj.data[i], j, headerArr[j]);
              
            }
        }
        return sheetJsonObj;
    },
    async covertExcelWithoutHeaderToJson(fileName, sheetName) {
        let fileJsonObj = xlsx.parse(fs.readFileSync(`D:/Playwright/Dozen/DataSource/${fileName}.xlsx`));
        let sheetJsonObj = fileJsonObj.find(item=>item.name==`${sheetName}`);
        return sheetJsonObj;
    },
    async returnEntryValuesSplittedByComma(entryValue) {

       var result = entryValue.split(",");
       return result;
    }
};
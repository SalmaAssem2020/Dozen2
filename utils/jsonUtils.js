//using google apis
const { google } = require("googleapis");

var xlsx = require('node-xlsx').default;
const fs = require('fs');
const Environment = require ('../Data/Environment');
const data = require ('../Data/Data');

module.exports = {
    renameKey:  (obj, oldKey, newKey) => {
        obj[`${newKey}`] = obj[oldKey];
        delete obj[oldKey];
    },
    covertExcelWithHeaderToJson:  (fileName, sheetName) => {
        let fileJsonObj = xlsx.parse(fs.readFileSync(`./DataSource/${fileName}.xlsx`));
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
    covertExcelWithoutHeaderToJson:  (fileName, sheetName) => {
        let fileJsonObj = xlsx.parse(fs.readFileSync(`D:/Playwright/Dozen/DataSource/${fileName}.xlsx`));
        let sheetJsonObj = fileJsonObj.find(item=>item.name==`${sheetName}`);
        return sheetJsonObj;
    },
    returnJsonElementByEntryValue:  (jsonObject, entryKey, entryValue) => {

        for(let i = 1; i < jsonObject.data.length; i++)
        {
            if(jsonObject.data[i][`${entryKey}`] == entryValue)
            {
                return jsonObject.data[i];
            }
        }
    },
    returnJsonElementByEntryValue:  (jsonObject, entryKey, entryValue, ) => {

        for(let i = 1; i < jsonObject.data.length; i++)
        {
            if(jsonObject.data[i][`${entryKey}`] == entryValue)
            {
                return jsonObject.data[i];
            }
        }
    },
    
    returnEntryValuesSplittedByComma:  async (entryValue) =>  {

        var result = entryValue.split(",");
        return result;
     },

     returnEntryValuesSplittedBySpace:  async (entryValue) =>  {

        var result = entryValue.split(" ");
        return result;
     },

     ConvertGoogleSheetToJson: async (sheetName, myRange) => {

        const auth = await new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        
        // Create client instance for auth
        const client = await auth.getClient();

        // Instance of Google Sheets API
        const googleSheets = await google.sheets({ version: "v4", auth: client });

        const spreadsheetId = await "1EUHLLjTCX8KG5c-0CLwuMG3eyjiDCb0HtqZY4wClMO8";

        // Read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `${sheetName}${myRange}`,
        });

        return getRows;
     },

     ConvertToJson:  (getRows) => {
         
        let sheetJsonObj =  JSON.parse(getRows).data.values;

        let headerArr = sheetJsonObj[0];

        delete sheetJsonObj[0];
        
        for(let i = 1; i < sheetJsonObj.length; i++)
        {
            for(let j = 0; j < headerArr.length; j++)
            {
               module.exports.renameKey(sheetJsonObj[i], j, headerArr[j]);
              
            }
        }
        return sheetJsonObj;


     }


};
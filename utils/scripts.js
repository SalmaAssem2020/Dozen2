var xlsx = require('node-xlsx').default;
const fs = require('fs');

module.exports = {
    addPageScript:  (pageName) => {
       let script = `# The root path where you would like your page(s) to be created
       $pagePath="master:\content\DoZen\DoZenDigitalWorkplace\Home"
       # The page name
       $pageName="${pageName}"
       # The ID of the component you want
       $renderingID="{A08BBC17-D81E-4251-8108-8F13010B6EDF}" 
       # location of the datasource
       $datasourceLocation="/sitecore/content/DoZen/DoZenDigitalWorkplace/Data/Site Content Components Folder/Tile"
       
       ################ Start of the function ####################################
       # append the page path to the page name and validate if it exists
       $fullpath=$pagePath+"\"+$pageName
       $pageExists = Test-Path -Path  $fullpath
               
       if(!$pageExists)
       {
           # if page doesn't exist create it with the base type "Page"
           $createdItem = New-Item -Path $pagePath -Name $pageName -Type "/sitecore/templates/Project/DoZen/Page"
       }
       else
       {
           # if already exists add it to the variable to be used
           $createdItem = Get-Item -Path $fullpath
       }
       # get all child styles from the digital workplace (we can add grid layouts and variants as well if you want)
       $childStyles= Get-ChildItem -Path "master:\content\DoZen\DoZenDigitalWorkplace\Presentation\Styles" -Recurse
       
       
       foreach ( $childItem in $childStyles )
       {
          # for each style check if the rendering we're using is in the allowed renderings
           $stringItems= $childItem["Allowed Renderings"]  
           if ($stringItems.Contains($renderingID)) { 
               # Find the rendering item and convert to a rendering
               $renderingItem = Get-Item -Database "master" -Path "master:" -ID $renderingID  | New-Rendering -Placeholder "main"
              
               # Add the rendering to the item
                Add-Rendering -Item $createdItem -PlaceHolder "main" -Instance $renderingItem -Parameter @{ "Styles" = $childItem.ID.Guid } -DataSource $datasourceLocation  -FinalLayout
         
           }
           
       }`;

       return script;
    },
    covertExcelWithHeaderToJson:  (fileName, sheetName) => {
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
     }
};
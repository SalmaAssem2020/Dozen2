const { google } = require("googleapis");
const jsonUtils = require('../../utils/jsonUtils');
const fs = require('fs');

async function readSheet() {
    const TilteDataSource = await jsonUtils.ConvertGoogleSheetToJson('Tile Sheet', '!A1:N');
    process.env.TileDataSource = JSON.stringify(TilteDataSource);
    
    }

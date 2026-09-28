const { chromium } = require('playwright');
const CMLoginPage = require('../Pages/Login.page');
const CDLoginPage = require('../Pages/CDLogin.page');
const PowerShellPage = require('../Pages/PowerShell.page');
const Users = require('../Data/Users');
const Environment = require('../Data/Environment');
const data = require('../Data/Data');
const { google } = require("googleapis");
const jsonUtils = require('../utils/jsonUtils');
const fs = require('fs');
const scripts = require('../utils/scripts');

module.exports = async config => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: false });
  const cmPage = await browser.newPage();
  const cdPage = await browser.newPage();

  const cmLoginPage = new CMLoginPage(cmPage);
  const cdLoginPage = new CDLoginPage(cdPage);
  const cmPowerShellPage = new PowerShellPage(cmPage);

  //await cmPage.goto(Environment.CMURL);
  //await cmLoginPage.Login(Environment.CMUsername, Environment.CMPassword);
  //await cmPage.waitForNavigation();

  await cdPage.goto(baseURL);
   //await cdLoginPage.LoginWithOpenId('adelev@dozen.openid', 'Xyz78901');
  await cdLoginPage.LoginWithAzure(Environment.CDUsername, Environment.CDPassword);


  await cdPage.waitForNavigation();

  //await cmPage.context().storageState({ path: 'state.json' });
  await cdPage.context().storageState({ path: 'CDstate.json' });


  await browser.close();

 
};
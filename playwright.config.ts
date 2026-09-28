import { PlaywrightTestConfig } from '@playwright/test';
import jsonUtils from './utils/jsonUtils';
const Environment = require('./Data/Environment');

process.env.initialPagesLength = '3';
const config = {  
  globalSetup: require.resolve('./Setup/global-setup'),
  workers: process.env.CI ? 1 : 2,
use: {
    baseURL: Environment.CDURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 12000 * 1000
  },

  reporter: [
    ['line'], 
    ['experimental-allure-playwright']
  ],
};


export default config;
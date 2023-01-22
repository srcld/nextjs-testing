const puppeteer = require('puppeteer');
const utils = require('./src/utils');
const {getTest} = require("./src/tests/inventory");
const log = require('./src/log').log;
const table = require('./src/log').table;
require('dotenv').config();

const {TARGET, USERNAME, PASSWORD} = process.env;

const wait = utils.wait;

(async () => {
    log('STARTING puppeteer');
    const browser = await puppeteer.launch();

    log('OPENING new browser page');
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    })

    log('OPENING target');
    await page.goto(TARGET);
    await wait(2500)

    log('FETCHING TEST SPECS');
    let {test, params} = getTest();
    params.user = USERNAME;
    params.pass = PASSWORD;

    log('RUNNING tests');
    const results = await page.evaluate(test, params);
    await wait(1500);

    log('TAKING screenshot');
    await page.screenshot({path: 'screenshot.png'});
    log('FINISHING');
    await browser.close();
    log('-----------------');
    log('TEST RESULTS');
    table(results);
})();
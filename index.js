const puppeteer = require('puppeteer');
const utils = require('./src/utils');
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

    // TODO this function should take USERNAME PASSWORD as parameters
    // ADD USERNAME,PASSWORD manually for now
    const loginTest = function () {
        const results = [];
        results.push('EXT found')
        const components = window.Ext.ComponentQuery.query('bpcLogin')
        if (components.length) {

            results.push('LOGIN cmp found')
            const usernameField = components[0].down('field[name=username]')
            const passwordField = components[0].down('field[name=password]')
            if (usernameField && passwordField) {
                results.push('Fields found');
                usernameField.setValue('FILLME-USERNAME');
                passwordField.setValue('FILLME-USERNAME');

                window.Ext.ComponentQuery.query('authdialog')[0].down('button[hidden=false]').click()
            } else {
                results.push('Fields not found');
            }
        }
        return results;
    }

    log('RUNNING tests');
    const results = await page.evaluate(loginTest);
    await wait(1500);

    log('TAKING screenshot');
    await page.screenshot({path: 'screenshot.png'});
    log('FINISHING');
    await browser.close();
    log('-----------------');
    log('TEST RESULTS');
    table(results);
})();
const puppeteer = require('puppeteer');
const {saveAsPdf} = require('./applications/screenshot-service');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 800,
        height: 600,
        deviceScaleFactor: 1,
    });

    await page.goto("https://google.com", {
        waitUntil: "networkidle2",
    });

    await saveAsPdf(page, "google");

    await browser.close();
})();